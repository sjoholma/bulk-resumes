const puppeteer = require('puppeteer');
const read = require('read-yaml');
const fs = require('fs');

const args = process.argv.slice(2);

const yaml = read.sync(args[0]);

fs.writeFile(`${args[1]}.js`, `const skillsJson = '${JSON.stringify(yaml.skills)}'`, () => {});

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`file://${args[1]}.html`, { waitUntil: 'networkidle2' });
  await page.pdf({ path: `${args[1]}.pdf`, width: '550px', height: '260px' });

  await browser.close();
})();
