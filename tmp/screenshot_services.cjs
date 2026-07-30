const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  
  await page.goto('http://127.0.0.1:3000/#services', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(3000);
  
  await page.screenshot({ path: 'tmp/services_cards.png' });
  console.log('cards screenshot saved');
  
  // Click first service card
  const card = await page.$('#services button');
  if (card) {
    await card.click();
    await page.waitForTimeout(700);
    await page.screenshot({ path: 'tmp/services_flyout.png' });
    console.log('flyout screenshot saved');
  }
  
  console.log('=== CONSOLE ERRORS ===');
  consoleErrors.forEach(e => console.log(e));
  
  await browser.close();
})();
