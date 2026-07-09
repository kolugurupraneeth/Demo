# Deployment Guide

Three options — fastest first.

---

## Option 1: Vercel (Recommended — free, instant)

1. Push this repo to GitHub if you haven't already
2. Go to [vercel.com](https://vercel.com) → sign in with GitHub → **Add New Project**
3. Import the `Demo` repo
4. Vercel auto-detects Vite — leave all settings as-is, click **Deploy**
5. Live URL in ~60 seconds (e.g. `kjb-solutions.vercel.app`)

Every future `git push` redeploys automatically.

**Custom domain:** Settings → Domains → add `kjbsolution.com` → follow DNS instructions.

---

## Option 2: Netlify (also free, also one-click)

1. Push repo to GitHub
2. Go to [netlify.com](https://netlify.com) → **Add new site → Import from Git**
3. Pick your repo
4. Build command: `npm run build` — Publish directory: `dist`
5. Click **Deploy site**

Done. Auto-redeploys on every push.

---

## Option 3: Manual ZIP deploy (no Git required)

Build locally and upload the output folder anywhere.

```bash
# In the project root
npm run build
```

This creates a `dist/` folder with everything needed — pure HTML, CSS, and JS.

### Upload options:

**Netlify Drop (fastest manual)**
1. Run `npm run build`
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
3. Drag and drop the `dist/` folder onto the page
4. Instantly live — no account required

**AWS S3 + CloudFront**
1. Create an S3 bucket → enable "Static website hosting"
2. Upload contents of `dist/` (not the folder itself, the files inside)
3. Set bucket policy to public read
4. Optionally add CloudFront in front for HTTPS + CDN

**Any static host (Render, GitHub Pages, etc.)**
- Build command: `npm run build`
- Output directory: `dist`

---

## What `npm run build` produces

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js    (~54 KB gzip)
│   └── index-[hash].css   (~5.5 KB gzip)
└── assets/                (images, logos, hero photos)
```

No server required — it's a static site. Any host that serves files works.
