const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const out = path.join(root, 'www');
fs.mkdirSync(out, { recursive: true });
for (const file of ['index.html', 'sw.js', 'manifest.webmanifest', 'icon.svg']) {
  fs.copyFileSync(path.join(root, file), path.join(out, file));
}
console.log('Prepared Aev Battle web assets in www/.');