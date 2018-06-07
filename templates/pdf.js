const puppeteer = require('puppeteer');
const read = require('read-yaml');
const fs = require('fs');

const args = process.argv.slice(2);

const yaml = read.sync(args[0]);

fs.writeFile(args[1], `skillsJson = \'${JSON.stringify(yaml.skills)}\'`, function(err) {});

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(args[2], {waitUntil: 'networkidle2'});
  await page.pdf({path: args[3], width: '550px', height: '260px'});

  await browser.close();
})();