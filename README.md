# Anuj Rai portfolio template

Working branch: `concept/diagonal-intro`

A text-only hero, an expanding project collage, personal questions, a short bio and a dark contact section

Read [the standing rules](docs/portfolio-rules.md) and [template notes](docs/diagonal-intro-concept.md) before editing
The hero must never contain work or project images
Use DM Sans and direct copy

## Run locally

```bash
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000)
Change introductory text, homepage project selections and question copy in `data/home.ts`
Personal About copy is in `data/about.ts`
The hero replaces an orange Hello with the final headline, keeping a writing cursor
Project collages expand the selected preview with mouse, touch and keyboard control
Read [the current collage brief](docs/collage-copy-update.md) for supplied copy and fallback behaviour
Case studies remain under `/work`
Read [the case-study system](docs/case-study-system.md) before editing project content
The five main cases use a shared overview and Research, Insights, Concept, Design, Outcome structure

## Checks

```bash
npm run lint
npm run build
npx tsc --noEmit
```

The build downloads DM Sans from Google Fonts
Never merge a portfolio branch without the user's explicit approval
