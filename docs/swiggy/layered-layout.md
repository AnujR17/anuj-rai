# Layered case presentation

9 November 2026. This revision responds to the request for visual depth, a
first-screen title and hero, and a clearer introduction and contribution.
It changes the portfolio presentation, not the original Agent Desk prototype.

The opening now describes the actual object: a chat interface and dashboard
for customer-support agents, explored through five order disputes. The brief
states the agent's task; the challenge explains why competing accounts need
investigation. The contribution uses the author's confirmed account: concept,
business logic, policy research, dashboard and chat interaction design. The
four-person group acknowledgement remains in Sources and credits.

## Composition and source material

- The first-screen composition places the unchanged wrong-item workspace in a
  laptop, with the original evidence-viewer detail in front. Both are linked:
  the laptop opens the explained prototype and the detail opens its source PNG.
  A bounded grid reserves space for All work and the complete project title.
  On tall phones the artwork's height is constrained by its width, keeping the
  photo detail attached to the laptop rather than stranded below it.
- The Insights composition combines the original evidence-viewer workspace
  capture with the original rider trip record. Their overlap connects the
  whole case to an individual source. The rider detail masks the source PNG's
  empty lower area; the complete original remains a native image link.
- Each iteration uses its genuine active source in front of two decorative
  copies of other supplied versions. These background copies are hidden from
  assistive technology; the selected source and its explanation retain the
  existing tab order and full-size link. The stack is a navigation treatment,
  not a matched before/after comparison or a new historical artifact.
- The evidence and party-contact passages use alternating writing/mockup
  compositions on wide screens, then stack in reading order on narrower ones.
  The final decision passage uses the existing ink colour and a larger device
  scene. Controls retain visible focus, readable contrast and source access.
- The three heuristic finding crops remain unchanged, with restrained rotation
  on desktop and an unrotated phone presentation.

CSS scroll timelines move only the workspace and rider planes by a few pixels.
Reduced motion disables these translations and the version transition. Writing
does not move. Unsupported browsers show the same sources in static layers.
No new JavaScript dependency or global style was added.

The existing MP4s and device-composed GIFs are unchanged. Their physical mockups,
controls, complete source proportions and no-autoplay behavior are retained.
The new article layouts sit outside those downloadable compositions.

## Reference transfer and cost

The earlier inspected reference study remains the basis for pacing:
[Bettina Bergendahl's Malu](https://bettinabergendahl.com/work/malu-recipe-meal-planning-app),
particularly its early product presentation and task-led interface sections,
and [Drew Hansen's Annual Inventory](https://drewhansen.design/work/sams-club/),
particularly its overview and optional explorations. The visible mechanisms
are large product compositions interspersed with specific decision accounts,
and optional depth beyond the main narrative. The inferred value here is a
clearer difference between context, investigation, iteration and decision.

The new overlapping details are an adaptation using Anuj's existing source
files, not a claim that those references use this exact composition. The cost
is less apparent UI scale and partial overlap. Full-size original links,
fullscreen footage, mobile stacking and a static fallback keep the detail
available. The active wireframe is never obscured by its background copies.

## Verification

`scripts/verify-swiggy-layers.mjs` checks the complete laptop, evidence detail
and title at eight desktop, phone and landscape viewports. It also checks
overlap, native source access, keyboard focus, four responsive layer widths,
scroll-linked motion, reduced motion, ink-control contrast and no-JavaScript
access. Results are recorded in `layers-verification.json`.

The existing general and device suites continue to cover stage navigation,
original asset hashes, the prototype, all eight recordings, scenario/version
tabs, playback, fullscreen and no-JavaScript media controls. Browser checks
establish presentation and interaction behavior, not improved agent performance.

The final production build, full lint, TypeScript and whitespace checks passed.
All three browser suites passed without runtime errors. The title and complete
hero fit at 1440×900, 1366×768, 1280×720, 1024×768, 390×844, 375×667, 320×568
and 844×390. The light decision controls have a measured contrast ratio of
13.13:1 against the ink surface. Desktop and phone screenshots were visually
inspected, including the opening, contribution, layered source record,
wireframe stack, alternating compositions and dark decision scene. Final
screenshots remain in `/workspace/swiggy-final-layer-review` and
`/workspace/swiggy-final-review`.
