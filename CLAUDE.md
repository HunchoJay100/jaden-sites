# Jaden Sites — Project Instructions

## Frontend Design
- Always invoke the frontend-design skill before writing any frontend code, every session, no exceptions
- Reference `brand_assets/brand-guidelines.md` for colors, typography, and aesthetic direction
- Reference `brand_assets/fd-logo.png` and `brand_assets/fd-logo-wide.png` for logos
- Single-file HTML apps preferred (inline CSS/JS, no frameworks, no build step)
- Dark themes with gold accents (#C5A55A) unless specified otherwise
- Never use generic AI fonts (Inter is OK for body only). Use Orbitron or Space Grotesk for headers.

## Screenshot Workflow
After building or significantly modifying any page:
1. Start a local server: `npx http-server . -p 8080 -s`
2. Use Puppeteer to take screenshots of the page at key sections (hero, mid, footer)
3. Save screenshots to `temp_screenshots/` folder
4. Review each screenshot and compare against the design intent
5. Do a two-pass review: fix issues, screenshot again, verify fixes
6. Delete temp screenshots when done

For animated elements (particle backgrounds, scanning grids, pulsing dots):
- Skip the screenshot comparison — static captures can't represent animations accurately
- Just implement the code and let the user verify visually

## Deployment
- This repo deploys via GitHub Actions → GitHub Pages
- Always test on localhost first
- Only push to GitHub when explicitly told to
- Live URL: hunchojay100.github.io/jaden-sites/

## Safety
- Never commit .env files, API keys, or credentials
- Never force-push to main
