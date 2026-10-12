# Anuj Rai — interaction design & making

A portfolio across digital products, information, and physical computing.

The current `design/skein` direction uses one sans-serif family, direct language, large project imagery, and open sections. A sculptural bundle of six independent filaments gives the introduction a material presence.

![Portfolio direction](docs/previews/skein.png)

## Interaction

Scroll through the opening, click or tap the sculpture, or pull it horizontally. Enter and Space work too. The strands loosen into separate sweeps and can be gathered again. There are no visible sliders, legends, or annotations around the artwork. Motion stops at rest and respects reduced-motion preferences.

![Thread sculpture](docs/previews/unwind.gif)

The live artwork uses a lazily loaded 3D renderer and GPU morph targets. Its complete static SVG remains available without JavaScript or WebGL. The drawing is an original procedural illustration, not documentation of a physical project.

## Run locally

```sh
npm ci
npm run dev
```

For production:

```sh
npm run build
npm run start
```

## Structure

- [Homepage](app/page.tsx) and [composition styles](app/studio.module.css).
- [Accessible interaction and fallback](components/portfolio/ThreadStudy.tsx).
- [Deterministic strand geometry](components/portfolio/skein-geometry.ts).
- [Live sculptural renderer](components/portfolio/SkeinRenderer.ts).
- [Art direction and evidence boundaries](docs/thread-direction.md).
- [Browser review results](docs/previews/verification.json).

Original project media and the existing case routes remain available. The independent medicine-care app and physical group Meditimer remain separate. No metrics, testimonials, or missing project artifacts have been invented.

The branch is for review and has not been merged into main.
