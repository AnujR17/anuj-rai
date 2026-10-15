# Anuj Rai portfolio concept

A Next.js 16 portfolio template with an introduction at the bottom left, interactive eyes at the top right, an about section, and two curated project previews.

The working concept is on `concept/diagonal-intro`. See [the concept notes](docs/diagonal-intro-concept.md) for the design rationale, reference links, interactions, and editing map. This branch retains verified content and original media from `code/portfolio`. It has not been merged or deployed by this task.

Read [the standing design rules](docs/portfolio-rules.md) before editing
DM Sans is required throughout the portfolio

## Run locally

```bash
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). Edit `data/home.ts` for homepage copy and projects, and `app/page.module.css` for the composition. Existing case studies live under `/work`.

## Check

```bash
npm run lint
npm run build
npx tsc --noEmit
```

The build downloads DM Sans from Google Fonts. The eyes require no additional dependency or external asset. Never merge a portfolio branch without the user's explicit approval.
