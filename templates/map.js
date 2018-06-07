const puppeteer = require('puppeteer');

(async () => {
    var args = process.argv.slice(2);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(args[0], {waitUntil: 'networkidle2'});
  await page.pdf({path: args[1], width: '550px', height: '260px'});

  await browser.close();
})();