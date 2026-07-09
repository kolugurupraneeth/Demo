#!/usr/bin/env node
/**
 * run-demo/driver.mjs
 *
 * Launches a local HTTP server for the KJB Solutions static site,
 * then drives it with Playwright (headless Chromium).
 *
 * Usage (from repo root):
 *   node .claude/skills/run-demo/driver.mjs [command]
 *
 * Commands:
 *   smoke      (default) — verify all key behaviors, exit 0/1
 *   screenshot — take a full-page screenshot → ./run-demo-screenshot.png
 *   verify     — alias for smoke, more verbose
 *
 * Requirements:
 *   - playwright npm package (auto-installed in /tmp if missing)
 *   - python3 (for the HTTP server)
 *   - No build step — site is a single index.html
 */

import { spawn, execSync } from 'node:child_process';
import { createServer } from 'node:net';
import { existsSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir   = dirname(fileURLToPath(import.meta.url));
const ROOT    = resolve(__dir, '../../..');   // repo root
const PORT    = 8997;
const BASE    = `http://localhost:${PORT}`;
const SHOT    = resolve(ROOT, 'run-demo-screenshot.png');
const command = process.argv[2] ?? 'smoke';

// ── Playwright bootstrap ──────────────────────────────────────────
let playwright;
async function loadPlaywright() {
  if (playwright) return playwright;
  // Try local first, then /tmp (where we install it)
  for (const path of ['playwright', '/tmp/node_modules/playwright/index.mjs']) {
    try {
      playwright = await import(path);
      if (playwright?.chromium?.launch) return playwright;
    } catch { /* try next */ }
  }
  // Not found — install to /tmp and import
  console.log('[driver] playwright not found — installing to /tmp …');
  execSync('npm install playwright', { cwd: '/tmp', stdio: 'inherit' });
  execSync('npx playwright install chromium', { cwd: '/tmp', stdio: 'inherit' });
  playwright = await import('/tmp/node_modules/playwright/index.mjs');
  return playwright;
}

// ── HTTP server ───────────────────────────────────────────────────
function isFree(port) {
  return new Promise(res => {
    const s = createServer().listen(port, () => { s.close(); res(true); }).on('error', () => res(false));
  });
}

async function startServer() {
  const free = await isFree(PORT);
  if (!free) { console.log(`[driver] port ${PORT} already in use — assuming server is running`); return null; }
  const srv = spawn('python3', ['-m', 'http.server', String(PORT)], { cwd: ROOT, stdio: 'ignore', detached: true });
  srv.unref();
  await new Promise(r => setTimeout(r, 600));
  console.log(`[driver] HTTP server started on ${BASE}`);
  return srv;
}

// ── Smoke / verify ────────────────────────────────────────────────
async function runSmoke(page, verbose = false) {
  const log = (...a) => verbose && console.log(...a);
  const results = [];
  const pass = (name, val) => { results.push({ name, ok: true,  val }); log(`  ✅ ${name}: ${val}`); };
  const fail = (name, val) => { results.push({ name, ok: false, val }); console.log(`  ❌ ${name}: ${val}`); };

  const errors = [];
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', e => errors.push(e.message));

  // 1. Page loads
  const res = await page.goto(`${BASE}/index.html`, { waitUntil: 'networkidle', timeout: 15000 });
  res.status() === 200 ? pass('HTTP status', 200) : fail('HTTP status', res.status());

  // 2. Title
  const title = await page.title();
  title.includes('KJB Solutions') ? pass('title', title) : fail('title', title);

  // 3. Hero heading
  const h1 = (await page.locator('h1').innerText()).trim().replace(/\s+/g, ' ');
  h1.length > 0 ? pass('hero h1', h1) : fail('hero h1', 'empty');

  // 4. Hero slide active & has background
  const bgImg = await page.locator('.hero-slide.active').evaluate(
    el => getComputedStyle(el).backgroundImage
  );
  bgImg.startsWith('url') ? pass('hero slide bg', 'url present') : fail('hero slide bg', bgImg);

  // 5. Logo swap: white logo on transparent header
  const whiteVis = await page.locator('.logo-white').isVisible();
  const colorVis = await page.locator('.logo-color').isVisible();
  (whiteVis && !colorVis) ? pass('white logo pre-scroll', true) : fail('white logo pre-scroll', `white=${whiteVis} color=${colorVis}`);

  // 6. Header scrolled state
  await page.evaluate(() => window.scrollTo(0, 200));
  await page.waitForTimeout(400);
  const hClass = await page.locator('#site-header').getAttribute('class');
  hClass.includes('scrolled') ? pass('header scrolled class', true) : fail('header scrolled class', hClass);

  // 7. Color logo appears after scroll
  const colorVisAfter = await page.locator('.logo-color').isVisible();
  colorVisAfter ? pass('color logo post-scroll', true) : fail('color logo post-scroll', false);

  // 8. Scroll reveal on service cards
  await page.locator('#services').scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);
  const svcCls = await page.locator('.svc-card').first().getAttribute('class');
  svcCls.includes('in-view') ? pass('service card reveal', true) : fail('service card reveal', svcCls);

  // 9. Content counts
  const svcCount   = await page.locator('.svc-card').count();
  const statCount  = await page.locator('.stat-block').count();
  const phoneCount = await page.locator('a[href*="tel:"]').count();
  const emailCount = await page.locator('a[href*="mailto:"]').count();
  svcCount  === 3 ? pass('service cards',  3) : fail('service cards',  svcCount);
  statCount === 4 ? pass('stat blocks',    4) : fail('stat blocks',    statCount);
  phoneCount >= 1 ? pass('phone links', phoneCount) : fail('phone links', phoneCount);
  emailCount >= 2 ? pass('email links', emailCount) : fail('email links', emailCount);

  // 10. Mobile nav
  await page.setViewportSize({ width: 375, height: 812 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(200);
  const hamburgerVis = await page.locator('#nav-toggle').isVisible();
  hamburgerVis ? pass('hamburger on mobile', true) : fail('hamburger on mobile', false);

  await page.locator('#nav-toggle').click();
  await page.waitForTimeout(300);
  const navOpenClass = await page.locator('#nav-list').getAttribute('class');
  navOpenClass.includes('open') ? pass('nav opens on toggle', true) : fail('nav opens on toggle', navOpenClass);

  await page.keyboard.press('Escape');
  await page.waitForTimeout(250);
  const navAfterEsc = await page.locator('#nav-list').getAttribute('class');
  !navAfterEsc.includes('open') ? pass('nav closes on Escape', true) : fail('nav closes on Escape', navAfterEsc);

  // 11. Dot navigation
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(200);
  await page.locator('.hero-dot[data-slide="2"]').click();
  await page.waitForTimeout(350);
  const activeSlide = await page.locator('.hero-dot.active').getAttribute('data-slide');
  activeSlide === '2' ? pass('dot nav to slide 2', true) : fail('dot nav to slide 2', activeSlide);

  // 12. Console errors
  errors.length === 0 ? pass('console errors', 'none') : fail('console errors', JSON.stringify(errors));

  return results;
}

// ── Commands ──────────────────────────────────────────────────────
async function main() {
  const srv = await startServer();

  const { chromium } = await loadPlaywright();
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page    = await context.newPage();

  try {
    if (command === 'screenshot') {
      // ── screenshot command ──────────────────────────────────────
      console.log('[driver] navigating …');
      await page.goto(`${BASE}/index.html`, { waitUntil: 'networkidle', timeout: 15000 });
      await page.waitForTimeout(800);
      await page.screenshot({ path: SHOT, fullPage: false });
      console.log(`[driver] screenshot saved → ${SHOT}`);

    } else {
      // ── smoke / verify command ──────────────────────────────────
      const verbose = command === 'verify';
      console.log(`[driver] running ${command} checks …`);
      const results = await runSmoke(page, verbose);
      const failed  = results.filter(r => !r.ok);
      const passed  = results.filter(r => r.ok);

      console.log(`\n[driver] ${passed.length}/${results.length} checks passed`);

      if (failed.length > 0) {
        console.log('[driver] FAILED checks:');
        failed.forEach(r => console.log(`  ❌ ${r.name}: ${r.val}`));
        process.exitCode = 1;
      } else {
        console.log('[driver] ✅ all checks passed');
      }
    }
  } finally {
    await browser.close();
    if (srv) srv.kill();
  }
}

main().catch(e => { console.error('[driver] FATAL:', e.message); process.exit(1); });
