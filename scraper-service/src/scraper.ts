import { chromium, type Browser } from "playwright";

export interface ScrapedProduct {
  name: string;
  description: string;
  price: number;
  comparePrice?: number;
  images: string[];
  sourceUrl: string;
  tags: string[];
}

let browser: Browser | null = null;

async function getBrowser(): Promise<Browser> {
  if (!browser || !browser.isConnected()) {
    browser = await chromium.launch({
      headless: true,
      executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
    });
  }
  return browser;
}

export async function scrapeAliExpressProduct(url: string): Promise<ScrapedProduct | null> {
  const b = await getBrowser();
  const ctx = await b.newContext({
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0.0.0 Safari/537.36",
    locale: "fr-FR",
  });
  const page = await ctx.newPage();

  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForTimeout(2500);

    const name = await page.evaluate(() => {
      const el = document.querySelector("h1[data-pl='product-title']") ||
                 document.querySelector(".product-title-text") ||
                 document.querySelector("h1");
      return el?.textContent?.trim() ?? "";
    });

    if (!name) {
      console.warn("No product name found at", url);
      return null;
    }

    const prices = await page.evaluate(() => {
      const priceEl = document.querySelector("[class*='price--current']") ||
                      document.querySelector(".product-price-value");
      const compEl  = document.querySelector("[class*='price--original']") ||
                      document.querySelector(".product-price-original");
      const parse = (s: string | null) =>
        s ? parseFloat(s.replace(/[^0-9.,]/g, "").replace(",", ".")) : 0;
      return { price: parse(priceEl?.textContent ?? ""), comparePrice: parse(compEl?.textContent ?? "") };
    });

    const images = await page.evaluate((): string[] => {
      const imgs: Set<string> = new Set();
      document.querySelectorAll("[class*='image-thumb'] img, [class*='slider'] img").forEach(el => {
        const src = (el as HTMLImageElement).src;
        if (src && src.startsWith("https") && !src.includes("icon") && !src.includes("logo")) {
          const clean = src.replace(/_\d+x\d+\./, "_800x800.").split("?")[0];
          imgs.add(clean);
        }
      });
      return [...imgs].slice(0, 5);
    });

    const description = await page.evaluate(() => {
      const el = document.querySelector("[class*='description']") ||
                 document.querySelector("#product-description");
      return el?.textContent?.trim().slice(0, 500) ?? "";
    });

    const tags = await page.evaluate(() => {
      const els = document.querySelectorAll("[class*='breadcrumb'] a, [class*='category'] a");
      return [...els].map(e => e.textContent?.trim() ?? "").filter(Boolean).slice(0, 6);
    });

    return {
      name,
      description,
      price: prices.price || 19.99,
      comparePrice: prices.comparePrice > prices.price ? prices.comparePrice : undefined,
      images: images.filter(u => u.startsWith("https")),
      sourceUrl: url,
      tags,
    };
  } catch (err) {
    console.error("Scrape error:", url, err);
    return null;
  } finally {
    await ctx.close();
  }
}

export async function closeBrowser() {
  if (browser) {
    await browser.close();
    browser = null;
  }
}
