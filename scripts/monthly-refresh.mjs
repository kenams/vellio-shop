// Refresh mensuel automatique du catalogue Vellio — best-sellers Amazon.
//
// Tourne en local (Task Scheduler Windows), jamais sur un serveur cloud,
// car Amazon bloque le scraping automatisé depuis les IP datacenter
// (vérifié le 2026-08-04). Utilise un profil Chrome DÉDIÉ et ISOLÉ
// (jamais le profil personnel de Kenams) pour ne jamais bloquer son
// navigateur pendant l'exécution.
//
// Setup unique requis (une seule fois, pas à chaque run) :
//   1. node scripts/monthly-refresh.mjs --setup
//   2. Se connecter à amazon.fr avec kenams42@gmail.com dans la fenêtre
//      qui s'ouvre, puis fermer la fenêtre.
//   3. Programmer la tâche : scripts/install-monthly-task.ps1
//
// Ensuite ça tourne seul, 1x/mois, sans aucune action.

import { chromium } from "playwright";
import { PrismaClient } from "@prisma/client";
import { execSync } from "child_process";
import { readFileSync, existsSync, unlinkSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.join(__dirname, "..");
const PROFILE_DIR = path.join(process.env.USERPROFILE || "C:\\Users\\kenam", ".vellio-scraper-profile");
const TAG = "vellio42-21";
const amz = (asin) => `https://www.amazon.fr/dp/${asin}?tag=${TAG}`;

const CATEGORY_PAGES = [
  { url: "https://www.amazon.fr/gp/bestsellers/electronics", category: "tech-gadgets" },
  { url: "https://www.amazon.fr/gp/bestsellers/beauty", category: "beaute-soins" },
  { url: "https://www.amazon.fr/gp/bestsellers/sports", category: "sport-fitness" },
];

function extractProductData() {
  const scripts = [...document.querySelectorAll("script")].map((s) => s.textContent).filter((t) => t && t.includes("colorImages"));
  let images = [];
  if (scripts.length) {
    const m = scripts[0].match(/'colorImages':\s*(\{.*?\}),\s*'colorToAsin/s) || scripts[0].match(/"colorImages":\s*(\{.*?\}),\s*"colorToAsin/s);
    if (m) {
      try {
        const d = JSON.parse(m[1].replace(/'/g, '"'));
        images = (d.initial || []).map((i) => i.hiRes || i.large);
      } catch { /* ignore malformed gallery data */ }
    }
  }
  const bullets = [...document.querySelectorAll("#feature-bullets li")].map((el) => el.textContent.trim()).filter(Boolean);
  const title = document.getElementById("productTitle")?.textContent.trim();
  const price = document.querySelector(".a-price .a-offscreen")?.textContent.trim();
  return { title, price, images: [...new Set(images)].slice(0, 6), bullets: bullets.slice(0, 4) };
}

// Hors-sujet pour une boutique tech/beaut\u00e9/sport \u2014 trouv\u00e9 lors du premier
// run de test (2026-08-04) : cartes \u00e0 collectionner, anti-moustique, etc.
// se sont gliss\u00e9s dans les classements "meilleures ventes" g\u00e9n\u00e9riques.
const OFF_TOPIC_KEYWORDS = [
  "sticker", "panini", "coupe du monde", "carte \u00e0 collectionner",
  "insect", "anti-moustique", "r\u00e9pulsif", "moustique",
];

function isOnTopic(title) {
  const lower = title.toLowerCase();
  return !OFF_TOPIC_KEYWORDS.some((kw) => lower.includes(kw));
}

// Le titre Amazon complet sert de nom produit tel quel (tronqu\u00e9) \u2014
// d\u00e9couper sur la virgule/tiret produisait parfois juste la marque seule
// ("Rimmel", "Maybelline New York") quand le titre commen\u00e7ait par une
// simple liste de mots-cl\u00e9s SEO. On garde le titre r\u00e9el, plus fiable.
function slugify(text) {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 60);
}

function parsePrice(str) {
  if (!str) return null;
  const n = parseFloat(str.replace(/[^\d,]/g, "").replace(",", "."));
  return Number.isFinite(n) ? n : null;
}

async function urlOk(url) {
  try { const res = await fetch(url, { method: "HEAD" }); return res.ok; } catch { return false; }
}

// Task Scheduler n'a pas les variables de dev locales — on récupère la
// connexion DB de prod via Vercel CLI (déjà authentifié sur cette
// machine), jamais depuis un fichier .env, jamais laissée sur disque.
function loadDbCredentials() {
  const tmpFile = path.join(__dirname, ".vellio-refresh-env-tmp");
  try {
    // execSync (pas execFileSync) car npx.cmd sur Windows a besoin d'un
    // vrai shell pour être résolu correctement. Aucune entrée utilisateur
    // dans la commande — tmpFile vient uniquement de __dirname.
    execSync(`npx vercel env pull "${tmpFile}" --environment=production --yes`, {
      cwd: PROJECT_ROOT,
      stdio: "pipe",
    });
    const content = readFileSync(tmpFile, "utf8");
    const match = content.match(/^DATABASE_POSTGRES_PRISMA_URL="?(.*?)"?$/m);
    if (match) {
      process.env.DATABASE_POSTGRES_PRISMA_URL = match[1];
      process.env.DATABASE_URL_UNPOOLED = match[1];
    }
  } finally {
    if (existsSync(tmpFile)) unlinkSync(tmpFile);
  }
}

async function main() {
  const setupMode = process.argv.includes("--setup");
  if (!setupMode) loadDbCredentials();

  const context = await chromium.launchPersistentContext(PROFILE_DIR, {
    headless: !setupMode,
    viewport: { width: 1400, height: 900 },
  });

  if (setupMode) {
    const page = await context.newPage();
    await page.goto("https://www.amazon.fr/gp/sign-in.html");
    console.log("Connecte-toi avec kenams42@gmail.com, puis ferme cette fenêtre.");
    console.log("Cette fenêtre attend indéfiniment — ferme-la manuellement une fois connecté.");
    await new Promise(() => {}); // reste ouvert jusqu'à fermeture manuelle
    return;
  }

  const prisma = new PrismaClient();
  const existingSlugs = new Set((await prisma.product.findMany({ select: { slug: true } })).map((p) => p.slug));
  const existingAsins = new Set(
    (await prisma.product.findMany({ select: { affiliateUrl: true } }))
      .map((p) => p.affiliateUrl?.match(/\/dp\/([A-Z0-9]{10})/)?.[1])
      .filter(Boolean)
  );

  const page = await context.newPage();
  let added = 0;
  const MAX_NEW = 15;

  for (const { url, category } of CATEGORY_PAGES) {
    if (added >= MAX_NEW) break;
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 }).catch(() => {});
    const asins = await page.evaluate(() => {
      const links = [...document.querySelectorAll('a.a-link-normal[href*="/dp/"]')];
      return [...new Set(links.map((a) => a.getAttribute("href")?.match(/\/dp\/([A-Z0-9]{10})/)?.[1]).filter(Boolean))];
    }).catch(() => []);

    const newAsins = asins.filter((a) => !existingAsins.has(a)).slice(0, 6);

    for (const asin of newAsins) {
      if (added >= MAX_NEW) break;
      try {
        await page.goto(`https://www.amazon.fr/dp/${asin}`, { waitUntil: "domcontentloaded", timeout: 20000 });
        const data = await page.evaluate(extractProductData).catch(() => null);
        if (!data || !data.title || !data.images?.length) continue;
        if (!isOnTopic(data.title)) { console.log(`  SKIP (hors-sujet): ${data.title.slice(0, 50)}`); continue; }

        // Titre complet (pas juste le premier segment avant virgule/tiret,
        // qui donnait parfois juste la marque seule sur certains titres SEO).
        const slug = slugify(data.title.slice(0, 80)) || asin.toLowerCase();
        if (existingSlugs.has(slug)) continue;

        const price = parsePrice(data.price);
        if (!price) continue;

        const validImages = [];
        for (const imgUrl of data.images) {
          if (await urlOk(imgUrl)) validImages.push(imgUrl);
        }
        if (validImages.length < 2) continue;

        const cat = await prisma.category.findUnique({ where: { slug: category } });
        if (!cat) continue;

        await prisma.product.create({
          data: {
            name: data.title.slice(0, 120),
            slug,
            shortDescription: data.bullets[0]?.slice(0, 150) || data.title.slice(0, 100),
            description: `<p>${data.bullets.slice(0, 2).join(" ")}</p>`,
            price,
            comparePrice: Math.round(price * 1.25 * 100) / 100,
            cost: price * 0.5,
            stock: 100,
            categoryId: cat.id,
            published: true,
            featured: false,
            trendScore: 75,
            affiliateUrl: amz(asin),
            benefits: data.bullets.slice(0, 4).map((b) => b.slice(0, 80)),
            images: { create: validImages.map((u, i) => ({ url: u, position: i, alt: `${data.title.slice(0, 60)} — vue ${i + 1}` })) },
          },
        });

        existingSlugs.add(slug);
        existingAsins.add(asin);
        added++;
        console.log(`  OK ${slug} (${price}€)`);
      } catch (err) {
        console.log(`  SKIP ${asin}: ${err.message.slice(0, 80)}`);
      }
    }
  }

  console.log(`\nRefresh terminé : ${added} nouveaux produits ajoutés.`);
  await prisma.$disconnect();
  await context.close();
}

main().catch((err) => {
  console.error("[monthly-refresh] Erreur fatale:", err);
  process.exit(1);
});
