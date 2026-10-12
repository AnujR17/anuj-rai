# Anuj Rai — interaction design & making

A portfolio exploring screens, code, physical objects, and the space between them.

The `design/skein` direction gives each project space to tell its story. Large original project media leads into a personal perspective, a workbench for ongoing experiments, working notes, and a conversation. Inter and Instrument Serif establish a clear, expressive hierarchy; chalk, cobalt, ink blue, and green give the page different rhythms.

![Portfolio direction](docs/previews/skein.png)

## Try the movement

Drag horizontally on the skein, use the native range control, or choose “Let it unfold.” The tangled strands open into separate loops and sweeping gestures; “Gather again” brings them back. There are no pins or artwork annotations. Keyboard and reduced-motion interactions are supported.

![Pull-driven unwinding](docs/previews/unwind.gif)

## Run locally

Use Node.js and npm, then:

```sh
npm ci
npm run dev
```

For the production version:

```sh
npm run build
npm run start
```

## Structure

- [Homepage](app/page.tsx) and [its composition styles](app/studio.module.css).
- [Skein drawing and interaction](components/portfolio/ThreadStudy.tsx).
- [Art direction, portfolio references, and evidence boundaries](docs/thread-direction.md).
- Work and existing case studies use available original project media.
- About, Notes, Resume, and Contact remain direct destinations.

The independent medicine-care app and physical group Meditimer remain separate projects. Smaller experiments retain their current status. Project outcomes, testimonials, portraits, and missing artifacts have not been invented.

## Verification

See [the browser verification results](docs/previews/verification.json). Review covers thirteen routes at 1440, 768, 390, and 320px, plus motion controls, direct dragging, keyboard input, reduced motion, visibility suspension, navigation, research disclosure, 404s, and static content without JavaScript. Superscript/subscript elements and decorative numbering are checked across routes.

The branch is for review and has not been merged into main.
