# Compact hero and paragraph composition

16 November 2026. The user asked for a smaller hero with its complete title and
image in one fold, and cleaner paragraph wrapping without isolated endings or
uneven word spacing.

The Swiggy hero now caps its height at 740 pixels on desktop and 640 on phones,
while retaining the viewport-height constraint on shorter screens. The whole
laptop/evidence composition scales together to 86% on desktop and 90% on phones.
The title has a smaller responsive scale and stays on one line down to 320
pixels. Original source proportions, overlaps, full-size links and the
bottom-left section index remain intact.

Paragraphs use native pretty wrapping, normal word spacing and a 64ch maximum
reading measure within the story. The larger introduction uses 44ch. Short
desktop narrative paragraphs balance their lines, as do headings. Alignment
stays unchanged; body prose is left aligned and the existing functional flow
keeps its centred groups. Nothing is justified or spaced out to fill a line.

Small closing word groups in the role, challenge and two scenario descriptions
use nonbreaking spaces where native wrapping still left a single word. The
challenge's compound adjective uses a nonbreaking hyphen. Scope now says
“Five scenarios”. The review-flow sentence is reworded without changing its
meaning, and a few short flow phrases stay together. No project facts or
outcomes have been added.

`verify-swiggy-typography.mjs` measures actual word fragments using DOM ranges
after fonts load. It visits all four iteration tabs and five scenario tabs,
opens supporting disclosures, checks line endings and word gaps, and verifies
the single-line title and absence of horizontal overflow. Fragment rectangles
are measured separately so a word broken at a hyphen is not mistaken for an
empty portion of a later line.

The final audit checks 76 distinct paragraphs/metadata blocks at 1600, 1440,
1366, 1280, 1100, 1024, 900, 768, 700, 430, 390, 375, 360 and 320 pixels. No
multi-line paragraph ends with a single word. Maximum measured inter-word gap
is 0.266em, with no justified paragraph. The 390- and 320-pixel no-JavaScript
versions also pass with all versions/scenarios visible. These are rendered
Chromium measurements, supplemented by visual inspection of the text; they are
not a universal measure of typographic quality across every browser.

The existing layer suite passes the complete title, laptop and evidence detail
at eight desktop/phone/landscape sizes. The general case suite also passes at
five widths, including 25 shared/Meditimer index positions, source/media
access, the original prototype hashes and keyboard/native fallback behavior.
Production build, ESLint, TypeScript and whitespace checks pass. No browser
runtime errors were recorded.

Results are in `typography-verification.json`, `layers-verification.json` and
`verification.json`. Screenshots remain outside Git in
`/workspace/swiggy-type-final` and `/workspace/swiggy-typography-review`.
