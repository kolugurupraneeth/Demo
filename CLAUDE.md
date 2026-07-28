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

## Skills

All skills live in `.claude/skills/`. Use the right skill for the task:

### Frontend / Design
- **impeccable** — visual design, polish, animation, layout, and all UX work. Entry: `node .claude/skills/impeccable/scripts/context.mjs`
  - Build feature → `/impeccable craft [feature]`
  - Design direction → `/impeccable shape [feature]`
  - Polish → `/impeccable polish [target]`
  - Animate → `/impeccable animate [target]`
  - Mobile fix → `/impeccable adapt [target]`
  - Production hardening → `/impeccable harden [target]`
- **react-patterns** — hooks discipline, component composition, CSS Modules, Reveal pattern
- **accessibility** — WCAG 2.2 Level AA, ARIA, keyboard nav, color contrast; critical for VA/federal clients

### Build & Deployment
- **vite-patterns** — `vite.config.js`, env vars, plugin setup, build optimization
- **deployment** — Vercel config, serverless functions, env var management, pre-deploy checklist
- **run-demo** — run, screenshot, and smoke-test the site locally

### Quality & Security
- **performance** — Core Web Vitals, bundle size, image optimization, render efficiency
- **security-review** — Claude API key protection, rate limiting, input validation, CSP headers

## Agents

Specialized subagents in `.claude/agents/`:

| Agent | When to invoke |
|-------|---------------|
| `frontend-craft` | All UI design, build, and polish work (uses impeccable skill) |
| `react-reviewer` | After writing or modifying any `.jsx` file |
| `site-verifier` | Confirm the site renders correctly in a browser |
| `fix-it` | Apply minimal safe patches after diagnosis |
| `troubleshoot` | Investigate unknown failures or configuration problems |
