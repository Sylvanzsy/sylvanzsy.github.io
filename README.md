# Saiyang Zhang — Academic Portfolio

Personal portfolio website for Saiyang Zhang, PhD Candidate in Theoretical & Computational Astrophysics at the University of Texas at Austin.

**Live site:** https://sylvanzsy.github.io/

## Stack

- [Next.js 16](https://nextjs.org) (App Router, static export)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [next-themes](https://github.com/pacocoursey/next-themes) — dark/light mode

## Sections

- **Hero** — name, title, CITA fellowship badge, profile links
- **About** — bio, research interests, education, awards, photo gallery
- **Research** — 3 research areas with detail pages (`/research/pbh`, `/research/dark-stars`, `/research/particle-dm`)
- **Publications** — filterable/sortable list with ATel collapsible section
- **Talks** — invited talks, contributed talks/seminars, posters
- **Contact** — email, office, social links

## Content

All site content lives in `/content/*.json` — edit those files to update publications, talks, bio, etc. without touching component code.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment

Automatically deployed to GitHub Pages via GitHub Actions on every push to `main`. The workflow builds a static export (`/out`) and uploads it as a Pages artifact.

To update the site: commit changes and push to `main`.
