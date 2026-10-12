# Portfolio direction — interaction and material

Work lives on `design/skein`, pushed through AnujR17. New commits use Anuj Rai <anujrai1701@gmail.com>. Main remains unchanged.

## The current direction

Anuj rejected the prior typeface, italic treatment, poetic copy, illustration, open-strand arrangement, and visible slider/control strip. The revision treats those as one composition problem.

DM Sans is the single visible type family, with normal styles and firmer heading weights. There are no italic display phrases, decorative numbers, superscripts, subscripts, or annotations around the artwork. Short, direct language explains Anuj's practice; real project names carry the work. Decorative line drawings have been removed from About, Notes, Contact, Resume, and Work.

The opening reads “Designing how things respond.” Its introduction explains the combination of interaction design, computer science, digital products, information, and physical computing. The six full-width sections are introduction, selected work, personal perspective, the workbench, working notes, and contact. Large original project media remains central.

The palette combines near-white, pale green, charcoal, copper, small blue accents in the sculpture, and the original colors of project media. Typography and space establish hierarchy without labels sitting over images or an explanatory control panel.

## The sculpture

Six independent filaments form a compact, raised skein. They are original procedural curves, not a photograph, project artifact, or an imported model. Tube geometry, directional light, material highlights, and actual cast shadows give the live version volume. The floor receives shadows and lets the page's surface color show through.

Each filament has a deterministic gathered and released shape. Equal-topology position and normal attributes supply GPU morph targets, avoiding per-frame geometry reconstruction. Release is staggered slightly by strand. The open composition is a set of longer, spaced sweeps with distinct directions, rather than a collection of floating calligraphic loops. No endpoints are pinned. The movement is an illustrative morph, not a length-conserving physical simulation.

The 3D module is dynamically imported when the artwork enters the viewport. The static SVG is server-rendered and remains usable without WebGL or JavaScript. Live resolution follows the display density with a cap; the camera and surface resize with the container. Geometry, materials, shadow resources, renderer, observers, and listeners are released on unmount.

## Interaction

The illustration is a native button with an accessible action name. There is no visible slider, legend, subtitle, pause strip, or unfolding button beside it.

- Scrolling through the opening gradually releases the skein.
- Clicking, tapping, Enter, or Space opens or gathers it.
- Horizontal dragging gives direct control; vertical touch scrolling is retained.
- Pointer movement gives a small change in perspective and settles back on leaving.
- Manual interaction takes priority over scroll-derived progress.
- Frames run only while a requested change is settling. There is no perpetual ambient loop.
- Rendering suspends offscreen and in hidden documents.
- Reduced motion makes requested changes immediate and removes perspective movement.
- Context loss shows the SVG fallback; restoration redraws the live surface.

## Evidence and tone

Selected projects retain the original Himalayan display, India in Orbit capture, and roundabout field photograph. Descriptions explain visible work and its question without unmeasured outcomes. The independent medicine-care app remains separate from the physical group Meditimer. Workbench descriptions identify ongoing work. Missing portraits, hardware photography, testimonials, and project metrics have not been invented.

Fresh mem0 context was reused; no additional retrieval or memory write was needed.

## Review

Production build, TypeScript, lint, and whitespace checks accompany real browser review. Review covers routes and responsive widths, native-button keyboard interaction, direct drag and reversal, scroll-driven release, reduced motion, visibility suspension, resize, fallback content, navigation, 404s, and absence of obsolete controls and decorative typography.

Review artifacts live under `/workspace/sculpture-review`, with selected results copied into `docs/previews`. Pushing the review branch does not authorize merging into main.
