import { chromium } from 'playwright';

const CHROME = String.raw`C:\Program Files\Google\Chrome\Application\chrome.exe`;

const browser = await chromium.launch({
  headless: false, // visible pour bypass bot detection
  executablePath: CHROME,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-blink-features=AutomationControlled']
});

const ctx = await browser.newContext({
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  locale: 'fr-FR',
  viewport: { width: 1280, height: 800 },
  extraHTTPHeaders: { 'Accept-Language': 'fr-FR,fr;q=0.9' }
});

// masquer webdriver
await ctx.addInitScript(() => {
  Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
});

const page = await ctx.newPage();

try {
  await page.goto('https://fr.aliexpress.com/item/1005007443729718.html', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(5000);

  const title = await page.title();
  console.log('Title:', title);

  const h1 = await page.$eval('h1', el => el.textContent.trim()).catch(() => 'no h1');
  console.log('H1:', h1);

  // dump des selectors disponibles
  const selectors = await page.evaluate(() => {
    const all = [...document.querySelectorAll('[class*="price"], [class*="title"], [class*="product"]')];
    return all.slice(0, 5).map(el => ({ tag: el.tagName, cls: el.className.slice(0,60), text: el.textContent.trim().slice(0,80) }));
  });
  console.log('Available elements:', JSON.stringify(selectors, null, 2));

} catch(e) {
  console.error('ERR:', e.message);
}

await browser.close();
