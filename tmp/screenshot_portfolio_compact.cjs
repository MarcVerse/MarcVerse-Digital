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
  
  // Scroll to ensure section is visible
  const section = await page.$('#featured-work');
  if (section) {
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
  }
  
  await page.screenshot({ path: 'tmp/portfolio_compact.png' });
  console.log('compact portfolio screenshot saved');
  
  console.log('=== CONSOLE ERRORS ===');
  consoleErrors.forEach(e => console.log(e));
  
  await browser.close();
})();
