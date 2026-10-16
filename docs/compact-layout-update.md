# Compact homepage layout

Latest user direction on 16 October 2026
Branch: `concept/diagonal-intro`
This direction takes precedence over earlier layout details in collage-copy-update.md

## Hero

Keep the Hello-to-headline typing sequence and its writing marker
Make the larger headline text bolder, keeping little things smaller on the baseline
Headline sits at bottom left, introduction at bottom right on desktop
Use smaller typography overall and an adaptive mobile layout
No project imagery and no eyes in the hero

The user explicitly requested a geometry experiment in the empty area
Place a compact 56 px control at the top right of the hero, reduced to 48 px on phones
The user explicitly rejected the initial large central placement
Use concentric circular guides and a point that changes on click or tap to a line, triangle, square and regular polygons through twelve sides before returning to the point
Keep the experiment keyboard accessible and respect reduced motion
The geometry is an intentional exception to the former text-only hero requirement and the ban on decorative dots within this experiment
Add a geometric desktop cursor while preserving text selection and native touch behavior

## Selected work

Show Selected work explicitly on the left, gallery on the right in the same section row
Do not place headings or other content above or overlapping the gallery
Reduce preview sizes and type so the section fits within a screen fold at normal desktop and phone sizes
Retain the expanding rounded squares, hover, tap and keyboard selection, case links and existing project media
The three homepage projects remain Meditimer, Himalayan 450 and Toki
The Work index keeps all five main projects
Without JavaScript every case description remains readable, so the static fallback can exceed one fold

## Questions and skills

Use short single-paragraph question answers rather than the former multiple-paragraph copy
Question prompts use three lines, with the existing staggered arrangement and hover/tap control
Do not append unrelated navigation links to the answers
Add a distinct Skills and tools section immediately below, followed by About me
Use skills evidenced by existing work and the tools already listed on the preceding project-serene implementation
No proficiency ratings, annotations, numbered badges or invented tools

## Contact and footer

The user explicitly requested removing the white footer
Place its copyright, About, Contact and GitHub links inside the dark contact section
Use one shared dark contact footer across routes, without duplicate contact sections on Home and About
Keep the side social icons, email link, bottom-right invitation and Contact me emphasis

## Verified implementation

Production build, full lint, TypeScript and Git whitespace checks pass
Chromium checked the homepage at 1440x900, 1366x768, 1280x720, 1024x768, 768x1024, 390x844 and 320x568
The hero ends at the first viewport boundary and Selected work fits within each checked viewport
After the final spacing refinement, the narrowest case is about 561 px high in a 568 px viewport
The final geometry control measures 56 px on desktop and 48 px on phones and is positioned at the hero's upper right
All twelve geometry states, wraparound, touch, Enter, Space, arrow keys and reset controls were checked
Project previews retain hover, touch and keyboard selection, rounded square expansion and direct case links
Reduced motion and the JavaScript-free content fallback remain readable
All five main case routes, the Work index, About, Resume and Contact still load without horizontal overflow
Each route has one dark contact footer, with no separate white footer
No browser runtime or console errors were observed in the interaction checks
