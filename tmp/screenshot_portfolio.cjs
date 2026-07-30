const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  
  await page.goto('http://127.0.0.1:3000/#featured-work', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(3000);
  
  await page.screenshot({ path: 'tmp/portfolio_categories.png' });
  console.log('categories screenshot saved');
  
  // Check Website Design & Development tab
  const webTab = await page.locator('#featured-work button:has-text("Website Design")').first();
  if (webTab) {
    await webTab.click();
    await page.waitForTimeout(800);
    await page.screenshot({ path: 'tmp/portfolio_web_category.png' });
    console.log('website category screenshot saved');
  }
  
  // Switch to Brand Identity
  const brandTab = await page.locator('#featured-work button:has-text("Brand Identity")').first();
  if (brandTab) {
    await brandTab.click();
    await page.waitForTimeout(800);
    await page.screenshot({ path: 'tmp/portfolio_brand_category.png' });
    console.log('brand category screenshot saved');
  }
  
  console.log('=== CONSOLE ERRORS ===');
  consoleErrors.forEach(e => console.log(e));
  
  await browser.close();
})();
