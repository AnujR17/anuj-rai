# Skein — portfolio direction

Implemented from Anuj's supplied visual reference and clarified request on 12 October 2026. Work lives on `design/skein`, created through the connected AnujR17 GitHub account. New commits use the verified repository-local identity Anuj Rai <anujrai1701@gmail.com>.

## Art direction

A gathered skein gives the opening its tension. Separate lengths of filament cross in a raised central cluster; a few continue to pins and loose ends. Directional lighting, cast shadows, highlights, and restrained grain give the browser-rendered illustration a material reading. This is an original procedural SVG illustration, not a photograph or a flattened hero image.

The palette combines chalk white, ink blue, pale blue-grey, and burnt orange. Color has specific roles: orange makes an active loose end visible, blue adds depth to the material and About panel, and lighter gallery surfaces keep real project media readable. The layout follows the reference's sectional pacing rather than the previous tall, sparse two-column homepage.

Selected Work presents three existing artifacts: the original Himalayan dashboard export, the live India in Orbit capture, and roundabout field photography. The physical/computational experiments remain smaller, source-linked entries. The notebook scene uses a map from the actual roundabout study beneath an illustrative book. It is an art-directed browser illustration, not documentation of a physical notebook.

About and Notes have different material treatments. Their strands are independent of the hero and each other. Contact gets one open curve; there is no uninterrupted line connecting every project or section. All existing case routes remain reachable.

## Interaction

`components/portfolio/ThreadStudy.tsx` keeps the artwork independent of the content layout.

- Eleven cords are generated from fixed, deterministic parameters; there is no render-time randomness or hydration-dependent composition.
- A native range control lets a visitor pull the skein open on touch, pointer, and keyboard.
- A button opens or gathers it again. Individual cords loosen with small phase differences rather than transforming as one rigid object.
- Three pinned endpoints remain fixed. Free ends travel into a more deliberate arrangement of separate open paths.
- Shadows reduce as the raised cluster settles closer to its surface.
- Ambient movement is slight, can be paused, and stops offscreen or in a hidden tab.
- Reduced motion keeps the resting drawing still and makes requested opening/gathering immediate.
- The complete drawing and page content exist in server-rendered HTML without JavaScript.

The movement is an illustrative geometric model; it is not a claim of mechanically accurate cord simulation.

## Content

The headline is grounded in the supplied reference. The introduction says plainly what Anuj designs and builds. The independent medicine-care app remains separate from physical group Meditimer. Newly drafted Notes are tied to actual project questions rather than invented research or outcomes. Sample project names in the reference were not substituted for available evidence.

The existing cached mem0 context was reused. No additional remote retrieval or memory write was needed.

## Review and publication

Production build, TypeScript, lint, and Git whitespace checks are required. Browser checks cover all thirteen routes at 1440, 768, 390, and 320px, including unwinding/gathering, fixed pins, keyboard slider input, pause/resume, offscreen suspension, reduced-motion input, focus navigation, research disclosure, 404 behavior, and static content without JavaScript.

Review artifacts live outside the repository under `/workspace/skein-review`. The user authorized creating and pushing this branch through AnujR17. No merge into main is authorized.
