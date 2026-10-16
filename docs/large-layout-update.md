# Full browser folds and larger titles

Latest user direction on 16 October 2026
Branch: `concept/diagonal-intro`
This supersedes the compact layout details in compact-layout-update.md

## Section identity

Use full browser-height desktop sections rather than short content-height strips
Section titles are anchored at the bottom left of their own sections
Use one shared large title scale, left inset and bottom inset, independent of the active project
This is a section anchor, not a title fixed to the viewport while scrolling
Increase the hero headline and question prompts as well
Keep DM Sans, the orange accent, direct copy and existing dark contact footer

## Selected work

Reserve the right two-thirds of the desktop content grid for the collage
One project fills its large square; two neighboring previews are smaller and staggered
Titles, supplied descriptors and descriptions appear below each project image on desktop
All three projects remain visible, and the active project expands on hover, focus or tap
Do not cap the large preview to the former 320 px size
Keep Selected work explicitly at the bottom left outside the collage
The selected title's position stays independent of hover selection
Retain existing media, rounded corners, direct project links and keyboard navigation
On phones, keep the gallery above the large bottom-left title and show the selected description at readable sizes
Use a large selected preview above two smaller ones so names such as Himalayan 450 do not break inside words
The Work index retains its five-project preview and active-description variant

## Questions

Restore the earlier staggered layout and two-part question prompts from commit 0462042
The user liked that question layout and rejected its compact replacement
Retain short paragraph answers and native hover, tap and keyboard controls
Use larger prompt typography and full desktop browser height

## Tools

Replace Skills and tools with Tools I use
Show recognizable Figma, React, TypeScript, Arduino and Espressif marks with their names
These were already present in the earlier portfolio tool list; Espressif identifies ESP32 hardware
No proficiency ratings or invented tools
Local SVGs and source/license records live in public/icons/tools

## Hero and pointer

Keep the geometry control in the hero only, at its upper right
Keep the requested 56 px desktop and 48 px phone size
The former SVG scaled outlines almost out of sight; use non-scaling strokes and a visible initial point
The sequence remains point, line, triangle, square and regular polygons through twelve sides
Slow Hello, its hold, erasure and the replacement headline; retain the writing marker
Slow the shared section-title typing slightly too
Use a cursor that changes form over interactive elements and responds to a press
Retain native text selection, native touch pointers, keyboard focus and the default cursor when JavaScript is unavailable
Respect reduced motion

## Browser checks

Production build, full lint, TypeScript and whitespace checks pass
The desktop Selected work section measures exactly one viewport at 1440x900, 1366x768, 1280x720, 1024x768 and 768x1024
Its gallery occupies two-thirds of the available column width
Switching through all three projects preserves the full fold and the title's bottom inset
The selected preview fills a larger square and every desktop project keeps its text below its own image
The title uses the shared scale, about 94 px at a 1440 px viewport
Phone layouts at 390 and 320 px remain readable without horizontal overflow; the narrowest layout can extend vertically rather than shrinking the title
All twelve shape states, mouse and touch activation, image selection, arrow keys, Home and End were checked
The normal hero typing sequence takes over four seconds; reduced motion shows the final copy immediately
The cursor changes form on interactive elements, responds to presses and gives way to native text selection and keyboard navigation
All five tool logos load from local files
The five-project Work index and existing main cases, About, Contact and Resume still load
Static content and the default pointer remain available without JavaScript
No runtime or browser console errors were observed
