# Persona portraits and layout

16 November 2026. The author requested images and a more designed persona
presentation that fits the existing case layout and theme.

Ananya and Rohit now have generated portrait illustrations in charcoal and
graphite, with a restrained vermilion clothing detail and transparent edges.
These are new presentation assets for the existing personas. Their roles,
experience, goals, risks and screen requirements are preserved. The research
and assumption basis remains in the single introduction; the heading remains
“Agent personas”. The portraits are identified as illustrations in alt text
and in Sources and credits. Sources and SHA-256 values are recorded in the
public provenance file.

The two closed text panels have been replaced by wider, open profiles within
the existing reading column. On desktop, the portraits alternate left/right;
larger names, a prominent goal and paired risk/requirement fields establish
the hierarchy. A fine rule separates the profiles. The portrait alone uses
the existing pale-paper surface, so this does not add another coloured case
section.

Tablet and phone layouts pair the portrait with the identity and place the
longer description fields below at the full reading width. Phone fields stack
in reading order. The images retain their full source with contain fitting,
and Next Image serves responsive versions. The original 1122×1402 RGBA PNGs
remain unchanged in `public/portfolio/swiggy/personas`. Original generated files
remain outside Git in `/workspace/generated_images`.

The `#agent-personas` anchor opens this part of the case directly. The title,
hero, bottom-left index, research artifacts, mockup recordings and single
vermilion emphasis remain in place.


Production build, ESLint, TypeScript and whitespace checks pass. The existing
case suite passes at five widths, including source images, native media,
keyboard/no-JavaScript access and 25 shared/Meditimer index positions. Portrait
checks pass at 1440, 1024, 768, 700, 390 and 320 pixels: both images load, retain
contain fitting, stay inside the reading column and introduce no horizontal
overflow. Both also load with JavaScript disabled. All 120 audited paragraphs
and metadata blocks retain no single-word final line across fourteen widths,
including the 320px and 390px no-JavaScript cases. No runtime errors were
recorded. Desktop and phone compositions were visually inspected. Results are
in `persona-verification.json`, `verification.json` and
`typography-verification.json`; screenshots remain outside Git under
`/workspace/swiggy-persona-final`.
