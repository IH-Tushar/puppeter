const puppeteer = require('puppeteer');

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: false });
    
  console.log('Opening new page...');
  const page = await browser.newPage();
    
  console.log('Navigating to Google...');
  await page.goto('https://www.google.com');

  const searchQuery = 'Tushar';
    
  console.log('Waiting for search box to load...');
  await page.waitForSelector('input[name="q"]', { visible: true });
    
  console.log('Typing search query...');
  await page.type('input[name="q"]', searchQuery);
    
  console.log('Pressing Enter...');
  await page.keyboard.press('Enter');

  console.log('Waiting for results...');
  await page.waitForSelector('h3', { timeout: 6000 });

  console.log('Extracting results...');
  const results = await page.evaluate(() => {
    const titles = Array.from(document.querySelectorAll('h3')).map(h3 => h3.innerText);
    return titles;
  });

  console.log('Search results:', results);

  console.log('Closing browser...');
  await browser.close();
})();
