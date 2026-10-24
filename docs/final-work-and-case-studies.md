# Work gallery and shared case studies

Current request: apply the final decisions from the Work and case-study review chats to `concept/diagonal-intro` and publish the result
This brief supersedes the older Work index, category navigation and case overview composition
The homepage's design language, project selection, About and Contact composition remain in place

## Work selection

Show exactly these projects, in order:

1. Meditimer app
2. Swiggy agent workflow
3. Himalayan 450
4. Toki
5. India in Orbit
6. Gandhinagar roundabouts
7. Physical Meditimer
8. My Alumnus

`data/work-projects.ts` owns the selection
The three other research cases keep their direct URLs but do not appear on Work
No Lab, category lists or additional project sections belong on this page

Work stays at bottom left using the homepage title token
Each project has a 1600 by 900 PNG cover
The desktop name follows the banner on its left; the phone name follows above the banner
The current motion follows the uploaded `banners.html` exactly
Covers grow towards the focal point and shrink away from it, with smaller previous and next previews
The large cover is 65 percent of the available gallery width, height constrained as in the reference
The small cover is 52 percent of that large size
Smoothstep interpolates the cover sizes and title crossfades
The focal line is 47 percent of the gallery height
The sequence advances at 0.18 projects per second
Wheel movement eases towards its target with the reference 180ms time constant
Dragging and vertical touch movement follow the pointer directly
Selecting a neighbouring cover brings it into focus; selecting the current cover or its title opens the case
The Work header link returns to the first cover
The first cover is fully positioned on entry
Automatic continuous movement begins after three seconds of viewing time, once the first image and font are ready
Hover pauses the hold and movement, and keyboard focus pauses movement
The sequence is finite and stops at its endpoints
Wheel, trackpad, keyboard and vertical touch gestures work across the screen
The page itself stays fixed, including at the endpoints
The gallery releases all scroll handling when leaving Work
Reduced motion disables autoplay and interpolation
Without JavaScript all eight native case links remain in a normal scrolling page
The footer composition is untouched on the remaining routes

## Shared template

Read `medicine-case-restoration.md` for the newer Meditimer restoration, which supersedes this shared layout for that case
The ten other case routes use the shared renderer, including the three supporting research cases
The opening has an original project visual on the right and the project name at bottom left, matching the homepage title size
The introduction, metadata, brief, problem and story share a consistent left reading alignment
There are no forced line breaks in the prose
The vertical stage index settles near the bottom left on desktop and remains above the story on phones
Research, Insights, Concept, Design and Outcome stay available as navigation stages
Content headings use plain project-specific names without repeating stage labels above them
Numbers form a straight row with native disclosure on hover, tap or keyboard activation
Only supported numbers are shown, with sample and scope explained inside the disclosure

## Original assets and scope

Medicine PNGs were exported from Figma file `on1gbKHkUo4CLZ38uCiSza`, nodes `797:3727` and `826:1236`
They are in `public/portfolio/screens`, with fixed raster device mockups
The original frame sizes are 410 by 1071 and 408 by 904
The taller medicine frame includes content below the navigation; the static mockup preserves the full artboard
The original SVG source components remain available but are no longer used as the displayed medicine interface

My Alumnus images and project evidence were recovered from `case-study/myalumnus` at `35f7fe7f3fcb2b8c122ed770ee45820c9753216d`
No branch was merged to recover them
The three published screens contain fictional Sample University data
Anuj's contribution remains decision-making, concept refinement, research and UI, collaborating with owner Sukhmanpreet Singh Saini
The one-guard test findings are attributed to the supplied project report

Swiggy is still a developing policy and scenario study
Its cover is explicitly a composition study, not an original product screenshot
Do not invent agent research, implementation or performance results

`components/case-study/ProjectArtwork.tsx` composes the original artifacts
`scripts/export-work-banners.mjs` exports these compositions to the eight PNG banners
Regenerate covers after changing their source imagery
Meditimer copies its static medicine-presentation.png master so its restored case layout does not affect the Work cover

## Git identity and deployment

Use the existing GitHub connection as `AnujR17`
Before pushing, verify `gh api user --jq .login` returns `AnujR17`
Do not switch to another account to work around an access error
The local repository author is `AnujR17`, using the confirmed contact email
The publication was prepared on `concept/diagonal-intro`; the user explicitly authorized its merge into main on 24 October 2026
Vercel automatically creates a public branch deployment after a push
The production domain is `anuj-rai.vercel.app`, currently built from main
The standing rule still requires explicit user approval before any merge
No Vercel production credential is currently bound to this environment
A public branch deployment and production promotion are distinct actions

## Verification

Run the existing build, lint, TypeScript and whitespace checks
`scripts/verify-portfolio.mjs` runs browser checks against a running production server
It requires Playwright and Chromium, available in this cloud environment
Set PORTFOLIO_URL, CHROMIUM_PATH and REVIEW_DIR to override its defaults
Checks include every case route, the exact Work selection, responsive alignment, global scrolling, finite endpoints, hover pause, keyboard focus, touch, reduced motion, route cleanup and no-JavaScript access

Page changes ease in with a reduced-motion fallback
The loading indicator appears only while an internal navigation remains pending, without delaying the actual route
Keep the root free of a loading boundary that leaves streamed content hidden when JavaScript is disabled

Initial integration validation: production build, full lint, TypeScript and Git whitespace checks pass
Production Chromium passed 60 route/width combinations across Work and all eleven cases at 1440, 1024, 768, 390 and 320 pixels
Targeted checks passed for global wheel and touch input, keyboard and off-screen focus, finite endpoints, initial hold, hover pause, reduced motion, route cleanup, native no-JavaScript links and disclosures, 404 responses, image loading and shared reading alignment
No browser runtime exceptions were recorded
Final screenshots and the JSON verification report are saved outside the repository in `/workspace/portfolio-review`


## Uploaded motion reference

The current user requested the movement in their uploaded `banners.html`
Its SHA-256 is `45cd77c32b474cd8d332f4b7444b2c1ba366180f9be227c7a9f2be51e2d1961c`
Only the motion, related geometry and interactions are adapted; project data, covers, palette and homepage are preserved
The full standalone HTML is kept outside the repository
`scripts/verify-work-motion.mjs` compares the running Work page with that original file across desktop, tablet and phone widths
Provide the source path through `WORK_REFERENCE_FILE` and the running application through `PORTFOLIO_URL`
It serves only the reference HTML on a temporary local server and removes that server after verification

The uploaded-reference comparison passes 45 scenes and 360 tile comparisons at 1440, 1024, 820, 390 and 320 pixels
The checks compare banner positions, sizes, visibility, selection, label spacing and crossfades against the original HTML
Targeted checks also pass for inactive-cover selection, active-cover navigation, keyboard focus, finite endpoints, the Work-link reset, drag click suppression, global touch, route cleanup, the initial hold, hover pause, autoplay speed, manual easing and native links without JavaScript
No browser runtime exceptions were recorded
