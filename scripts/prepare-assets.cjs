const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');
const root = path.resolve(__dirname, '..');
const assets = path.join(root, 'assets');
fs.mkdirSync(assets, { recursive: true });
const iconSvg = fs.readFileSync(path.join(root, 'icon.svg'));
(async () => {
  const iconPng = await sharp(iconSvg).resize(1024, 1024).png().toBuffer();
  await sharp(iconPng).png().toFile(path.join(assets, 'icon.png'));
  const splashLogo = await sharp(iconPng).resize(900, 900).png().toBuffer();
  await sharp({
    create: {
      width: 2732,
      height: 2732,
      channels: 4,
      background: '#081323'
    }
  }).composite([{ input: splashLogo, gravity: 'centre' }]).png().toFile(path.join(assets, 'splash.png'));
  console.log('Prepared icon.png and splash.png for Capacitor Assets.');
})().catch(error => { console.error(error); process.exit(1); });