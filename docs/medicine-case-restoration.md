# Meditimer restoration and publication

The user explicitly authorized merging concept/diagonal-intro into main on 24 October 2026, after fixing the mockup distortion and restoring the earlier case-study layout
This authorizes this publication; it does not remove the standing approval requirement for later merges

## Restored reference

The source is the final Meditimer prototype in Review AnujRai preview design, chat 01a149ce-a128-76ca-91d2-40b573a96081
Its source markup, styles, interaction code and final README were read from the chat
Restore the Capture, Review and Routine opening, bottom-baseline hero text, continuous left-aligned overview and three scope facts
Research uses the two user views; Insights uses the green dose-record comparison; Concept contains the paired views and information structure; Design contains selectable setup screens and the original-interface viewer; Outcome retains the project status and sources
The index follows the five scenes and changes contrast over the green layer, with a compact selector on phones
Exploration-only layout controls and empty photo slots are omitted from the published page
No new research results or project photographs are invented
The ten other case routes retain their existing content and five-stage navigation
The eight-project Work selection and its uploaded-reference motion remain unchanged

## Static images

Original PNGs remain unmodified in public/portfolio/screens
The missing setup frames were recovered from the same original Figma nodes used in the prototype
provenance.json records each original frame, dimensions and hash
The device shell is baked into each mockup PNG at a fixed design size
The displayed image scales uniformly, preserving the full source artboard, including the longer medicine-taker screen
Never add a responsive CSS border, corner radius or fixed-height clipping shell around these PNGs
The opening remains static until the visitor selects a scene or explicitly starts playback
The native image viewer opens the unmodified source PNG

scripts/export-medicine-mockups.mjs rebuilds the five fixed mockup assets with Playwright and Chromium
The homepage's existing two-phone presentation is a separate static image in medicine-presentation.png, preserving the earlier composition
The work-cover exporter can use that presentation without recursively reading its own output

## Verification

scripts/verify-restored-medicine.mjs checks the restored scenes, native image proportions, absence of CSS device borders, opening and gallery controls, full-size image and structure dialogs, responsive index, source links without JavaScript, and the remaining case routes
Run it against a production server through PORTFOLIO_URL
Screenshots and results are stored outside Git under /workspace/meditimer-review
