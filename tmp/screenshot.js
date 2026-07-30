const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto('http://127.0.0.1:3000/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(4000);
  
  const img = await page.$('#featured-work img');
  console.log('img exists:', !!img);
  if (img) {
    const bbox = await img.boundingBox();
    console.log('img bbox:', bbox);
    const svg = await img.evaluate(el => el.src);
    console.log('img src:', svg);
  }
  
  const container = await page.$('#featured-work');
  if (container) {
    await container.screenshot({ path: 'tmp/featured_work_section.png' });
    console.log('screenshot saved to tmp/featured_work_section.png');
  }
  
  await browser.close();
})();
