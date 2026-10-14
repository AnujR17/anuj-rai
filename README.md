# Portfolio Serene

Anuj’s portfolio: interaction design across interfaces, information and physical objects.

This branch combines the hero direction, five case-study treatments and homepage structure from three referenced design chats. See [the combined implementation brief](docs/portfolio-serene.md) for precedence, source provenance, known gaps and verification.

## Development

```sh
npm ci
npm run dev
```

## Production and checks

```sh
npm run lint
npx tsc --noEmit
npm run build
```

The production build creates static pages in `out/`. DM Sans and project imagery are local assets. The interactive studies use browser-local state and do not connect to medical services or hardware.

Work on `portfolioSerene`. Keep merges subject to the user’s explicit approval.
