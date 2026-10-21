const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');
const root = path.resolve(__dirname, '..');
const assets = path.join(root, 'assets');
fs.mkdirSync(assets, { recursive: true });
const iconSvg = fs.readFileSync(path.join(root, 'icon.svg'));
const splashSvg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="2732" height="2732" viewBox="0 0 512 512"><rect width="512" height="512" fill="#081323"/><circle cx="256" cy="256" r="190" fill="#0b2a58"/><image href="data:image/svg+xml;base64,${iconSvg.toString('base64')}" width="512" height="512"/></svg>`);
(async () => {
  await sharp(iconSvg).resize(1024, 1024).png().toFile(path.join(assets, 'icon.png'));
  await sharp(splashSvg).resize(2732, 2732).png().toFile(path.join(assets, 'splash.png'));
  console.log('Prepared icon.png and splash.png for Capacitor Assets.');
})().catch(error => { console.error(error); process.exit(1); });