# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Overview

Static website rebuild of **KJB Solutions** (kjbsolution.com) — a veteran-owned IT consulting firm delivering program management, software development, and infrastructure solutions to the federal government (primary client: VA).

The site is a **Vite 5 + React 18** SPA (no TypeScript, CSS Modules per component). Dev: `npm run dev` → http://localhost:5173. Build: `npm run build` → `dist/`.

## Source Material

All brand assets have been copied to `public/assets/`:
- `logo-color.png`, `logo-white.png`
- `hero-1.jpg` through `hero-4.jpg`
- `icon-program-mgmt.png`, `icon-software-dev.png`, `icon-infrastructure.png`
- `handshake.jpg`

Original WordPress site scrape lives at `reference/original-site/` for copy and content reference. Original HTML: `reference/original-site/index.html`.

## Architecture

**Component tree:** Nav → Hero → Services → WhyKJB → Credentials → CareersCallout → Contact → Footer  
All in `src/components/<Name>/<Name>.jsx` + `<Name>.module.css`.

Shared utilities: `src/hooks/useScrolled.js`, `src/hooks/useIntersection.js`, `src/components/Reveal/Reveal.jsx`.

## Brand

| Token | Value | Notes |
|---|---|---|
| Navy | `#002a5c` | Primary background, headings |
| Crimson | `#961f21` | Accent, hover states |
| Orange | `#e88800` | CTAs, highlights |
| Sky Blue | `#58c7dd` | Legacy button color |

Fonts: **Exo 2** (headings, nav) · **Open Sans** (body) — both from Google Fonts, already in brand.

## Key Content

**Services**: Program Management, Software Development, Infrastructure & Consulting  
**Nav**: Home · Solutions (dropdown) · Clients · Careers · About Us (dropdown: Partners, Past Projects) · Contact  
**Contact**: 571-277-3586 · kbjsolutions@kjbsolution.com  
**Social**: LinkedIn, Facebook, Twitter

## Architecture

Global tokens in `src/index.css`. CSS Modules per component. Vanilla JS hooks — no component libraries, no Tailwind.

## FrontendCraft Agent

This repo uses the **impeccable** skill (`.claude/skills/impeccable/`). All design and build work should run through it. Entry point for context: `node .claude/skills/impeccable/scripts/context.mjs`.

Route requests through the right command:
- Build a feature → `/impeccable craft [feature]`
- Design direction → `/impeccable shape [feature]`
- Polish → `/impeccable polish [target]`
- Animate → `/impeccable animate [target]`
- Mobile fix → `/impeccable adapt [target]`
- Production hardening → `/impeccable harden [target]`
