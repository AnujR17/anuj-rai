# Anuj Rai portfolio concept

A Next.js 16 portfolio template with a bottom-left introduction, a wide scrolling gallery of three curated projects, and personal questions with hover and tap responses.

The working concept is on `concept/diagonal-intro`. See [the concept notes](docs/diagonal-intro-concept.md) for the design rationale, reference links, interactions, and editing map. This branch retains verified content and original media from `code/portfolio`. It has not been merged or deployed by this task.

Read [the standing design rules](docs/portfolio-rules.md) before editing
DM Sans is required throughout the portfolio

## Run locally

```bash
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). Edit `data/home.ts` for homepage copy and projects, and `components/concept/Walkthrough.module.css` for the composition. Existing case studies live under `/work`.

## Check

```bash
npm run lint
npm run build
npx tsc --noEmit
```

The build downloads DM Sans from Google Fonts. The walkthrough uses the existing Framer Motion dependency and original project images. Never merge a portfolio branch without the user's explicit approval.
