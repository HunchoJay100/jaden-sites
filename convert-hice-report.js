const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  const filePath = path.resolve('/Users/jadenflynn/Downloads/Hice_Budget_Report.html');
  await page.goto('file://' + filePath, { waitUntil: 'networkidle0' });
  
  await page.pdf({
    path: '/Users/jadenflynn/Downloads/Hice_Budget_Report.pdf',
    format: 'Letter',
    printBackground: true,
    margin: { top: '0.5in', right: '0.5in', bottom: '0.5in', left: '0.5in' }
  });
  
  console.log('PDF saved to ~/Downloads/Hice_Budget_Report.pdf');
  await browser.close();
})();
