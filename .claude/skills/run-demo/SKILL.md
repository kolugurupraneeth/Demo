---
name: run-demo
description: Run, launch, screenshot, verify, or smoke-test the KJB Solutions static website (index.html). Use when asked to start, build, run, preview, screenshot, or test the site.
---

# run-demo

Static single-file website (`index.html` at repo root). No build step. Driven by `driver.mjs` in this directory using Playwright headless Chromium + a Python HTTP server.

The driver auto-installs Playwright to `/tmp` on first run if it isn't available.

## Prerequisites

```bash
node --version    # v18+ required
python3 --version # for the HTTP server
```

No `npm install` needed in the repo itself. The driver handles its own Playwright setup.

## Run (agent path)

From the **repo root**:

```bash
# Smoke test — verify 17 key behaviors, exits 0/1
node .claude/skills/run-demo/driver.mjs smoke

# Verbose smoke with per-check output
node .claude/skills/run-demo/driver.mjs verify

# Full-page screenshot → ./run-demo-screenshot.png
node .claude/skills/run-demo/driver.mjs screenshot
```

The driver:
1. Starts `python3 -m http.server 8997` from repo root (skips if port is taken)
2. Opens Playwright headless Chromium at `http://localhost:8997/index.html`
3. Executes the requested command
4. Kills the server and exits

### What `smoke` / `verify` checks

| Check | What it verifies |
|---|---|
| HTTP status | page loads (200) |
| title | contains "KJB Solutions" |
| hero h1 | non-empty heading |
| hero slide bg | active slide has a background-image URL |
| white logo pre-scroll | white logo visible on transparent header |
| header scrolled class | `.scrolled` added after 200px scroll |
| color logo post-scroll | brand logo swaps in after scroll |
| service card reveal | `.in-view` added when card enters viewport |
| service cards count | 3 cards present |
| stat blocks count | 4 stat blocks present |
| phone/email links | contact links in DOM |
| hamburger on mobile | toggle button visible at 375px viewport |
| nav opens on toggle | click adds `.open` class |
| nav closes on Escape | Escape removes `.open` |
| dot nav to slide 2 | clicking slide-2 dot activates it |
| console errors | none |

## Run (human path)

```bash
python3 -m http.server 8000
# → open http://localhost:8000/index.html in a browser
```

## Gotchas

- **Port 8997** is the driver's default. The driver silently reuses it if already in use. Use `lsof -ti:8997 | xargs kill` to clear if the previous run left a server orphaned.
- **Playwright goes to `/tmp`**, not the repo. The `PLAYWRIGHT_BROWSERS_PATH` env var (set automatically by the playwright package) resolves to `~/.cache/ms-playwright`. Chromium is ~93MB and downloads once.
- **`networkidle` wait** is used for page load. On a slow machine or cold python start, bump the `setTimeout(r, 600)` in `startServer()` if checks consistently time out.
- **Slide `data-slide` attribute** is required for the dot-nav probe. If the hero slideshow changes structure, update the selector in `runSmoke`.

## Troubleshooting

| Error | Fix |
|---|---|
| `Cannot find module 'playwright'` | Driver should self-install; if it fails: `npm install playwright` in `/tmp`, then `npx playwright install chromium` |
| `browserType.launch: Executable doesn't exist` | Run `cd /tmp && npx playwright install chromium` |
| `EADDRINUSE 8997` | `lsof -ti:8997 \| xargs kill` |
| `TimeoutError: page.goto timed out` | Python server slow to start — increase `setTimeout` delay in `startServer()` from 600 to 1200 |
