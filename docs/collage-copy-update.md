# Homepage copy and project collage

User direction confirmed 16 October 2026
Read `compact-layout-update.md` for the later user-requested changes to geometry, visible work heading, scale, question copy, skills, cursor and footer
Branch: `concept/diagonal-intro`

## Copy

Use the supplied homepage copy in `data/home.ts`
Keep the three project descriptions, all question paragraphs and the three-paragraph About teaser
The expanded About page retains the user's longer personal account
The shared contact section uses the supplied invitation and Get in touch link
The root metadata uses the supplied meta description

The current supplied project descriptors explicitly include middle-dot separators and italic formatting
The contact link explicitly includes a single right arrow
These are narrow exceptions for this supplied copy, not permission to introduce decorative labels or arrows elsewhere

## Hero

The header shows Anuj at the upper left and Work, About and Resume at the upper right
The hero types orange Hello with a writing cursor, holds it briefly, erases it, and types the final People, patterns, and the little things sentence in the same space
The final phrase keeps little things smaller on the text baseline
The cursor follows the active character and remains at the end
The sequence runs once, with the introduction appearing after the headline
The full final heading stays available to screen readers without character-by-character announcements
Without JavaScript or with reduced motion, show the final sentence and introduction immediately
Never put project imagery or eye illustrations in the hero

## Collages

Use the same project-preview interaction on the homepage and Work index
The homepage shows Meditimer, Himalayan 450 and Toki
The Work index retains all five main cases
The active preview becomes a large square while neighboring previews shrink and sit at different heights
Keep rounded edges and the original artifact colors
The Selected work section label is an accessible region name, not a visible bottom-left heading

Hover or focus previews a project
Clicking or tapping its image also selects it
The project title and View case study link open the case
Arrow keys, Home and End move among previews
Buttons expose their selected state and identify the controlled description
The active description uses the supplied copy
Titles remain direct links, and all descriptions are available without JavaScript
Reduced motion switches the layout without animated movement

The questions also give more room to the open answer, keeping native hover, touch and keyboard control
Their full supplied paragraphs appear above the question prompt
The global footer and case-study content remain unchanged

## Validation

Production build, full lint, TypeScript and Git whitespace checks pass
Chromium checked the homepage and five-project Work collage at 1440, 1024, 768, 390 and 320 pixels
The checks cover Hello typing, erasure and replacement, the moving cursor, complete final text and a single accessible heading
Hover remains stable under a stationary pointer, and project selection works with click, touch, arrow keys, Home and End
The selected image is square and larger than the other previews
The gallery keeps a stable height while switching projects
Checks also cover loaded images, horizontal overflow, full supplied descriptions, header identity, meta description, contact link and the absence of a visible work heading
Without JavaScript, every description and case link remains available
Reduced motion skips the typing sequence and animated layout changes
The existing case-study pages, About, Contact and Resume remain reachable on a narrow phone viewport
No browser runtime exceptions were observed
