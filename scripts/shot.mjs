// Usage: node scripts/shot.mjs <path> <outPrefix> [cssSelector]
// Screenshots http://localhost:3100<path> at 1440x900 and 390x844 (fold and full page, or one element).
import { chromium } from '@playwright/test';
let [, , path = '/', out = 'shot', sel] = process.argv;
// Git Bash rewrites "/x" into "C:/Program Files/Git/x"; undo that.
if (/^[A-Za-z]:/.test(path)) path = path.replace(/^[A-Za-z]:\/Program Files\/Git/, '') || '/';
if (!path.startsWith('/')) path = '/' + path;
const b = await chromium.launch();
for (const [w, h, tag] of [[1440, 900, 'desktop'], [390, 844, 'mobile']]) {
  const p = await b.newPage({ viewport: { width: w, height: h } });
  await p.goto(`http://localhost:3100${path}`, { waitUntil: 'load', timeout: 60000 });
  await p.waitForTimeout(800);
  if (sel) { await p.locator(sel).first().screenshot({ path: `${out}-${tag}.png` }); }
  else { await p.screenshot({ path: `${out}-${tag}-fold.png` }); await p.screenshot({ path: `${out}-${tag}-full.png`, fullPage: true }); }
  await p.close();
}
await b.close();
console.log('ok');
