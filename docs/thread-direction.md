# Skein — portfolio direction

Work lives on `design/skein`, pushed through the AnujR17 GitHub account. Commits use Anuj Rai <anujrai1701@gmail.com>. Main is unchanged.

## Reading order and typography

The October refinement opens the homepage into six full-width sections: the introduction, selected project stories, a personal perspective, the workbench, working notes, and contact. Individual projects have large media and a readable explanation of their question. About, Notes, the workbench, and Contact no longer share paired panels.

Inter handles navigation, descriptions, and clear structural headings. Instrument Serif supplies real italic forms for the expressive phrases. Larger sizes, comfortable leading, fewer competing elements, and deliberate space carry the hierarchy. There are no decorative section numbers, superscripts, subscripts, or labels floating over the artwork. The Notes page's former numbering was removed too. Normal names and interaction controls remain readable.

The palette uses chalk, cobalt, ink blue, pale blue, muted green, and small orange accents. Project images retain their own colors. There is no uninterrupted cord stitching together the page.

## Portfolio references examined

- [Rauno Freiberg's Craft](https://rauno.me/craft): an interaction-focused collection that includes production work, prototypes, and smaller studies. This informed giving the workbench a distinct, honest place alongside developed projects.
- [Maggie Appleton](https://maggieappleton.com/): notes and essays are separate ways to enter her thinking. This informed the visible working-notes section, grounded in Anuj's actual project questions.
- [Adham Dannaway](https://www.adhamdannaway.com/): his introduction makes both design and development legible. This informed explaining Anuj's movement between questioning and building without borrowing his split-face treatment.

These are editorial references, not templates or copied layouts.

## Artwork and motion

The raised, tangled composition remains an original procedural illustration. The server-rendered SVG supplies a complete static fallback; a responsive Canvas renderer draws the live movement with the same geometry. Eleven independent strands have directional shadows and highlights. All pins have been removed. Every endpoint is free to travel.

The open composition consists of deliberately placed cubic gestures: loose turns, open loops, and longer sweeps rather than a fan of parallel lines. Individual cords release with phase differences and a small travelling displacement. Shadows soften as they settle. The geometric model is illustrative, not a physical simulation of length-conserving cord.

Resting and open sample points are computed once. Live paths are drawn to a Canvas surface instead of repainting eleven individual SVG blur filters; paired translucent strokes soften the shadows. The backing resolution follows the display density, capped at 2×, and resizes with its container. Active interpolation draws on animation frames; quiet ambient motion draws less often. The range, unfold/gather button, and horizontal dragging on the artwork all drive the same continuous progress. Reversing direction starts from the current geometry. Vertical touch scrolling is retained.

Motion can be paused, stops offscreen and in hidden tabs, and cancels on cleanup. Reduced motion keeps the drawing still and makes requested changes immediate. Native range input supplies the keyboard and assistive-technology interaction. The fallback artwork and content are server-rendered; the drawing remains visible without JavaScript or a 2D canvas context.

## Evidence and tone

Selected work uses the original Himalayan dashboard export, the India in Orbit website capture, and roundabout field photography. Descriptions explain a project's question rather than claim unmeasured outcomes. The independent medicine-care app remains distinct from the physical group Meditimer. The workbench identifies in-progress work and links to available source or a relevant note. Missing portraits, hardware photography, testimonials, and project metrics have not been invented.

Existing fresh mem0 context was reused without a remote retrieval or memory write.

## Review

Production build, lint, TypeScript, and whitespace checks accompany browser review. Review covers thirteen routes at four widths, open/gather, free endpoints, direct dragging, keyboard input, pause/resume, offscreen and hidden-tab suspension, reduced motion, navigation and note anchors, 404s, static content without JavaScript, and absence of decorative numbering or superscript/subscript elements.

Review artifacts live under `/workspace/skein-review`, with selected screenshots, motion preview, and actual verification results copied into `docs/previews`. No merge into main is authorized.
