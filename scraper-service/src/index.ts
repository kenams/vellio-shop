import "dotenv/config";
import express from "express";
import { scrapeAliExpressProduct, closeBrowser } from "./scraper";
import { uploadImage } from "./cloudinary";

const app = express();
app.use(express.json());

const SECRET = process.env.SCRAPER_SECRET || "vellio-scraper-2026";
const PORT = parseInt(process.env.PORT || "3001", 10);

function auth(req: express.Request, res: express.Response, next: express.NextFunction) {
  const key = req.headers["x-scraper-secret"] || req.query.secret;
  if (key !== SECRET) {
    res.status(401).json({ error: "unauthorized" });
    return;
  }
  next();
}

// GET /health
app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "vellio-scraper", ts: new Date().toISOString() });
});

// POST /scrape
// Body: { url: string, slug: string, uploadToCloudinary?: boolean }
app.post("/scrape", auth, async (req, res) => {
  const { url, slug, uploadToCloudinary = true } = req.body as {
    url: string;
    slug: string;
    uploadToCloudinary?: boolean;
  };

  if (!url || !slug) {
    res.status(400).json({ error: "url and slug are required" });
    return;
  }

  try {
    const product = await scrapeAliExpressProduct(url);
    if (!product) {
      res.status(422).json({ error: "scrape failed — no product data extracted" });
      return;
    }

    let finalImages = product.images;
    if (uploadToCloudinary && product.images.length > 0) {
      const uploaded: string[] = [];
      for (let i = 0; i < product.images.length; i++) {
        const cdnUrl = await uploadImage(product.images[i], `${slug}-${i}`);
        uploaded.push(cdnUrl || product.images[i]);
      }
      finalImages = uploaded;
    }

    res.json({ ...product, images: finalImages });
  } catch (err) {
    console.error("Route /scrape error:", err);
    res.status(500).json({ error: "internal server error" });
  }
});

// POST /scrape-batch
// Body: { items: Array<{ url: string; slug: string }>, uploadToCloudinary?: boolean }
app.post("/scrape-batch", auth, async (req, res) => {
  const { items, uploadToCloudinary = true } = req.body as {
    items: Array<{ url: string; slug: string }>;
    uploadToCloudinary?: boolean;
  };

  if (!Array.isArray(items) || items.length === 0) {
    res.status(400).json({ error: "items array required" });
    return;
  }

  const results = [];
  for (const { url, slug } of items.slice(0, 10)) {
    const product = await scrapeAliExpressProduct(url);
    if (!product) { results.push({ slug, error: "scrape failed" }); continue; }

    let finalImages = product.images;
    if (uploadToCloudinary && product.images.length > 0) {
      const uploaded: string[] = [];
      for (let i = 0; i < product.images.length; i++) {
        const cdnUrl = await uploadImage(product.images[i], `${slug}-${i}`);
        uploaded.push(cdnUrl || product.images[i]);
      }
      finalImages = uploaded;
    }

    results.push({ ...product, images: finalImages });
  }

  res.json({ count: results.length, results });
});

const server = app.listen(PORT, () => {
  console.log(`Vellio scraper service running on port ${PORT}`);
});

process.on("SIGTERM", async () => {
  await closeBrowser();
  server.close();
});
