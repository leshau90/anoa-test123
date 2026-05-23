import { chromium, firefox, webkit } from '@playwright/test';
import { execSync } from 'child_process';
import { existsSync, mkdirSync } from 'fs';
import { resolve } from 'path';

const BROWSER = process.argv[2] || 'firefox';
const OUT_DIR = 'screenshots';

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR);

// Start serve on a random-ish port
const PORT = 4321;
const server = execSync(`pnpm exec serve -l ${PORT} -s . &`, { shell: true });

// Give serve a moment to start
await new Promise(r => setTimeout(r, 1500));

const launchers = { firefox, webkit };
const launch = launchers[BROWSER];
if (!launch) {
  console.error(`Unknown browser "${BROWSER}". Use: firefox | webkit`);
  process.exit(1);
}

const browser = await launch.launch();
const context = await browser.newContext();

const pages = [
  { path: '/', name: 'home' },
  { path: '/tentang.html', name: 'tentang' },
  { path: '/program.html', name: 'program' },
  { path: '/kontak.html', name: 'kontak' },
];

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet',  width: 768,  height: 1024 },
  { name: 'mobile',  width: 390,  height: 844 },
];

for (const vp of viewports) {
  for (const pg of pages) {
    const page = await context.newPage();
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto(`http://localhost:${PORT}${pg.path}`, { waitUntil: 'networkidle' });
    const file = `${OUT_DIR}/${BROWSER}-${pg.name}-${vp.name}-${vp.width}x${vp.height}.png`;
    await page.screenshot({ path: file, fullPage: true });
    console.log(`Saved: ${file}`);
    await page.close();
  }
}

await browser.close();
execSync(`pkill -f "serve -l ${PORT}" || true`, { shell: true });
console.log('Done.');
