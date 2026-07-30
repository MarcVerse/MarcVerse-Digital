const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  
  await page.goto('http://127.0.0.1:3000/#testimonials', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(6000);
  
  const container = await page.$('#testimonials');
  if (container) {
    await container.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1500);
    await container.screenshot({ path: 'tmp/testimonials_section.png' });
    console.log('screenshot saved to tmp/testimonials_section.png');
  }
  
  const img = await page.$('#testimonials img');
  console.log('img exists:', !!img);
  if (img) {
    const bbox = await img.boundingBox();
    console.log('img bbox:', bbox);
  }
  
  console.log('=== CONSOLE ERRORS ===');
  consoleErrors.forEach(e => console.log(e));
  
  await browser.close();
})();
