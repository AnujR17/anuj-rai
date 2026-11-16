# Swiggy story and vector presentation

15 November 2026. The user asked to preserve the existing bottom-left section
labels and central reading column, refine the content, add accent layers and
use vector diagrams/charts alongside images and GIF-style mockup videos.

## Changes

The shared navigation and layout files are unchanged. The original hero,
workspace composition, wireframe stack, source crops, eight physical mockup
players and downloadable GIFs remain in the Swiggy renderer. The three detailed
interaction clips now precede the five-case selector, avoiding an initial full
walkthrough followed immediately by the same actions explained again.

The prose follows research sources, records and interpretation, information
structure, real iterations, investigation, business logic and unresolved
findings. It does not invent Anuj's personal reason for choosing the layout.
The public description names the selected grouping and its cross-referencing
cost; the alternative remains inspectable. Fraud assessment and agent autonomy
retain their author-confirmed role. No real-world improvement is claimed.

Three vector studies are rendered in the reading column:

| Study | Source and purpose | Treatment |
| --- | --- | --- |
| Information architecture | Current My Workspace tabs and the final case's records, conversation, checks/decision and queue | Newly drawn explanatory hierarchy, not an original research artifact |
| Remedy and cost allocation | Handbook H-07–H-09; final SW-2070 data and `costLine0` | Conditional worked example: agent chooses Restaurant + Full refund; ₹220 + ₹11 GST + ₹35 charges = ₹266, allocated to Swiggy under the assumed No refunds terms |
| Findings by severity | Original heuristic results: three major, nine minor, four cosmetic | Review distribution, not measured user outcomes; all findings remain open |

Each has a desktop and phone SVG, embedded DM Sans, a title/description,
meaningful image alt text, native full-size access and an SVG download. The
phone files rearrange the same information without shrinking a wide chart.
No raster image is embedded in the vectors. The font subsets are reused from
the existing Next build; `render-swiggy-vectors.mjs` can regenerate the assets
after a build. It does not require another font service at runtime.

The architecture uses the existing neutral paper surface. The worked cost
example uses the existing vermilion accent, with paper panels and readable
light prose. The existing final-decision scene remains ink. All surfaces are
inside the original reading column, leaving the bottom-left labels on paper.

The uploaded 38-page Agent Desk Handbook v1.0 is linked inline and in Sources.
It describes policy 2.1 and v7.1; it does not replace the separate visual Design
Rulebook v7.1. Its SHA-256 matches the supplied PDF and the reference site's PDF.

## Reference application

The supplied Sukhman reference's policy/source distinctions, rejected verdict
ideas, genuine layout alternatives and explicit policy assumptions guide the
decision narrative. Its case and linked deep-dive text were examined alongside
the original archive. Its whole layout, section slogans, invented persona
biography and commercial-statistic emphasis are not imported.

The earlier Karolis study supplies the relationship between a specific task,
choice and the adjacent artifact. Here the implementation is an architecture
map beside the selected grouping, original crops beside Hold's relocation,
mockup clips beside evidence/contact/decision passages and a cost example
beside the business-logic explanation. The added cost is page length. Essential
conclusions stay visible, with longer policy/evaluation records optional.

## Verification

Production build, lint, TypeScript and whitespace checks pass. Four browser
suites pass without runtime errors:

- General: five widths, source images/media, original prototype hashes,
  version keyboard navigation, native no-JavaScript access and 25 shared/
  Meditimer index positions.
- Devices: eight framed players, scenario keyboard navigation, playback,
  restart, fullscreen/native controls, off-screen pause and original ratio.
- Layers: hero, complete laptop, evidence detail and title inside one fold at
  eight sizes, plus reduced motion and unchanged source-detail access.
- Vectors: three studies at five widths, responsive source selection, original
  proportions, keyboard links/downloads, six standalone artboards without
  clipped text, embedded fonts, handbook hash and no-JavaScript access.

Accent prose contrast is 4.75:1. The existing ink-scene controls remain 13.13:1.
Desktop and phone vector compositions, source crops and stage-label position
were visually inspected. The original prototype was also opened through normal
UI controls: S8, Restaurant, Full refund. Its visible cost line reads
“₹266 incl. GST and charges · Swiggy ₹266 (restaurant terms: no refunds)”,
matching the example. That check did not run a whole new scenario evaluation.

Results are in `vectors-verification.json`, `verification.json`,
`devices-verification.json` and `layers-verification.json`. Screenshots remain
outside Git in `/workspace/swiggy-content-vectors`, `/workspace/swiggy-content-final`
and `/workspace/swiggy-content-layers`.
