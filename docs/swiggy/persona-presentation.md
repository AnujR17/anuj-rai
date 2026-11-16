# Persona photography and layout

16 November 2026. Ananya and Rohit use natural colour photographs by Pratik
Mohapatra, downloaded from their Unsplash photo pages. The source pages state
that both are free under the Unsplash License. Photographer credit and the two
source links appear in Sources and credits; public provenance records the
source pages, dimensions and SHA-256 hashes.

These are representative photographs for the existing personas. Their roles,
experience, goals, risks and screen requirements are preserved. The research
and assumption basis remains in the single introduction, and the heading is
“Agent personas”. The accessible image names describe representative portraits.

The wider, open profile layout remains in the existing reading column. On
desktop, portraits alternate left/right alongside larger names, a prominent
goal and paired risk/requirement fields. Tablet and phone layouts pair the
portrait with the identity and place the longer fields below. Phone fields
stack in reading order.

The downloaded JPEGs remain unchanged in `public/portfolio/swiggy/personas`.
CSS cover fitting frames each photo at 4:5, with a position selected to keep
the face visible. Next Image serves responsive copies. The `#agent-personas`
anchor opens this part of the case directly.


Production build, lint, TypeScript and whitespace checks pass. Both photographs
load at six desktop/phone widths, stay within the existing layout and work
without JavaScript. No runtime errors were recorded. The existing typography
suite passes all 120 paragraphs/metadata blocks at fourteen widths, including
native 320px and 390px layouts, with no single-word paragraph endings. Portrait
frames were visually inspected. Reports are in `persona-verification.json` and
`typography-verification.json`; screenshots remain outside Git under
`/workspace/swiggy-photo-final`.
