# Portfolio Serene — combined implementation brief

## Current direction — 15 October 2026

The user rejected the earlier overall design and writing, then explicitly selected **Clean gallery — white, large typography and nearly full-width work**. See [the redesign decisions](gallery-redesign.md). This supersedes the earlier poetic headlines, pale green surfaces, dotted-letter About illustration and generic medicine-case template. The introduction still precedes work. The hero now introduces Anuj's interface-design and prototyping work directly; its optional blank drawing surface and eraser remain. The independent app and physical Meditimer have separate evidence-led case layouts and explicit contribution credits.

## Destination and precedence

The current user authorized a new `portfolioSerene` branch in `AnujR17/anuj-rai`, replacing the initial request for a separate repository. Base: `code/portfolio` at `83395fef92826d33ee2b237a4f1f824acb447aa7`. The user explicitly confirmed that branches will not be merged. Do not merge branches. The original `/workspace/anuj-rai` checkout was left untouched; this is a separate ordinary checkout, not a Git worktree.

All three referenced chats were read through `read_thread` on 14 October 2026. Their contents are design context, not authorization for unrelated operations.

- Explore distinctive portfolio hero: `01a133cc-27ca-70af-a959-df96d551a064` — visual direction, "The little things", Anuj-only identity outside About, DM Sans, faint linework, bottom-left copy and an upper-right drawing surface. Ordinary pointer movement leaves a fading trace; drag draws; Clear/Escape erases. Touch keeps normal scrolling.
- Review Mem0 Care Study Handoffs: `01a13509-33d7-7247-9a17-74e9786b60bc` — five separate cases, DM Sans, contextual device/object mockups, a dashboard masked into a real bike display, working studies, concise reviewer-facing narrative and optional depth. The previous HTML/ZIP drafts were not present in this environment; these cases were rebuilt from available source and the chat's decisions rather than copied verbatim.
- Review portfolio essentials: `01a1362e-8252-7197-a243-a59783fde026` — takes priority for homepage additions. Its latest turn proposes a compact Understand / Shape / Build section after Selected Work and before About. Skills/tools accompany real examples. Avoid a long timeline, repeated principles and a fabricated universal process.

Homepage: Hero → Selected Work (two prominent projects, three supporting case links, compact research link) → Making sense of the mess → Skills & Tools → About → Explorations → Contact. The user's later request adds separate skills/tools and explorations sections and replaces the original process layout. Explorations stays compact while awaiting the user's dustbin, AR/VR and other experiment images. AI assistance is credited within relevant work. The MyAlumnus independent revision was still an unresolved proposal in the references and is not represented as completed solo work.

In the current revision, the process section is titled “How I develop an idea” and the pending gallery is titled “Experiments & explorations.” Descriptive project titles and explanations replace the earlier metaphors.

## Implementation

Next.js 16 App Router with static export, React/TypeScript, existing Tailwind. DM Sans is self-hosted with normal 400/500/600/700 weights. No external runtime fonts, trackers, accounts or stored health data.

Five case URLs: `/work/two-wheeler-dashboard/`, `/work/medicine-app/`, `/work/toki/`, `/work/medtimer/`, `/work/india-in-orbit/`. Existing research case URLs are retained. Essential content is server-rendered; studies use local state. Studies are explicitly distinguished from original prototype behaviour, hardware evidence and clinical outcomes.

The genuine portrait file is not available. About uses a typographic dot treatment; it does not pretend to be a portrait. Original full case-production attachments and original hardware footage remain unavailable. These are material limits for a future editorial pass.

## Sources and skills

Applied Sites presentation guidance, cloud runtime/network guidance, Mem0 cache workflow, Figma design-to-code and Figma Plugin API guidance. The custom Windows portfolio/critique/resume skills named in historical chats are not installed here. The Sites executable publishing helpers are unavailable, so source review proceeds through GitHub; no Sites publication is claimed.

Mem0 skill was recovered from `/workspace/mem0-context-skill.zip` after its configured path was missing. Cache-only check: successful empty result from 9 October 2026. The current chats and local briefs supplied sufficient context; zero remote retrievals and no memory writes.

Figma source nodes:

- Medicine taker: `on1gbKHkUo4CLZ38uCiSza`, `797:3727`.
- Caregiver: same file, `826:1236`.
- Toki concept visualization: `ixlPXmsuwf48nzujHHUV4T`, `380:368`.
- Physical Meditimer model: `n7STT935qXcNGC5x49AcNm`, `155:38`.

Medicine screens use high-fidelity design-context structure with original SVG exports; device wrappers scale those fixed-size original interfaces. Local presentation font follows the user's DM Sans direction. Direct Figma asset HTTP downloads returned 403, so supported read-only Plugin API exports recovered the original vectors and compact JPEG versions of the original image nodes. No Figma canvas nodes were changed.

Cockpit: Ajay Ananth / Motofoodie, source image at `https://i0.wp.com/motofoodie.in/wp-content/uploads/2024/02/Crisp-Circular-TFT-dash-console-in-Analog-mode-of-the-2024-Royal-Enfield-Himalayan-450.jpg?resize=1024%2C768&ssl=1`. The dashboard is a labelled composite, not a running-bike photograph. Himalayan and India in Orbit exports and selected research figures are retained from the source branch. Raw respondent/police data remain outside the repository.

## Run

`npm ci`, `npm run dev`, or `npm run build` for static output in `out/`. `npm run lint` and `npx tsc --noEmit` check source. `npm run build` uses webpack to allow the existing local dependency arrangement; no dependency version changed. Static output can be hosted on a standard static host. No project-specific hosting account or production URL is assumed.

## Verification — 14 October 2026

- Production static export passes with all project routes generated.
- Full ESLint, TypeScript and Git whitespace checks pass.
- Chromium checked 11 representative routes at 1440, 768, 390 and 320 pixels (44 route/width combinations), including loaded images, page headings and horizontal overflow. The run caught one remaining homepage constraint at 320 pixels; after correction the homepage was checked again at all four widths, with document width equal to viewport width.
- Five case-study controls passed: dashboard speed/mode/close-up; medicine record/pending-sync; Toki start/advance/reset; physical feedback selection; orbit-context selection.
- Drawing persistence, Escape clearing, fading pointer trail, keyboard operation of the process selector, reduced-motion scrolling and essential content without JavaScript passed. No browser runtime exceptions occurred.
- Screenshots are in `/workspace/serene-review` outside the repository. This verification does not establish real hardware behaviour, clinical outcomes or riding usability.

## Hero correction — 14 October 2026

The user clarified that “the little things” referred to the full earlier headline: “People, patterns, and the little things.” Restore the full sentence in one charcoal colour, composed at the bottom left. Replace the native SVG cursor with the pointer-following crosshair and centre dot from the earlier prototype. Drawing covers the hero’s open space; text stays selectable and links keep a pointer. Touch retains normal scrolling.

The updated hero passes the production build, lint, TypeScript, and browser checks at 320, 390, 768, 1440 and 1920 pixels. Custom-cursor visibility, text/link cursor changes, drawing on the open left side, Escape clearing, and touch behaviour were checked. No browser runtime errors occurred.

## String composition — 14 October 2026

The hero now keeps only the full headline and short introduction. Removed the habits/patterns paragraph, work CTA, static drawing invitation and lower-right closing line. The Erase button sits at the bottom right on desktop and mobile.

The existing strands and visitor drawing share one rendering: a fine line with a soft cast shadow. Nearby strings respond subtly to the pointer; dragging an existing strand pulls it and release lets it settle. Drawing in open space adds a matching strand. The cursor gives a brief “Pull a string” or “Draw a string” hint within the artwork, with no extra resting copy. Erase and Escape restore the initial composition. Animation stops when the composition settles, reduced motion removes passive movement, and touch keeps normal scrolling. A static SVG preserves the resting composition without JavaScript.

Production build, full lint, TypeScript and whitespace checks passed. Chromium checks passed at 320, 390, 768, 1440 and 1920 pixels, including the lower-right eraser placement, pulling a strand, adding and clearing a strand, Escape, reduced motion, touch and the no-JavaScript fallback. No runtime exceptions occurred.

## Remove preset strings — 14 October 2026

Removed the three preset hero strands and their static fallback. The hero starts with open space; the custom cursor, optional drawing and bottom-right eraser remain. Erase clears to a blank canvas. Production build, lint, TypeScript and browser checks passed, including initially blank artwork, drawing/erasing and mobile layout.

## Scribble theme, skills and explorations — 14 October 2026

The user requested a separate skills/tools section, a fun gallery and an illustration of turning random pieces into something useful. Fine hand-drawn underlines, circles and annotations connect the homepage sections without restoring preset hero strings.

“Making sense of the mess” illustrates Collect the pieces → Find a connection → Give it a useful form. Marks drawn in the hero become the starting point in this sketchbook; the paths then morph into a hierarchy and reveal the original Himalayan interface in a display housing. This is an explicitly labelled visual illustration, not AI interpretation of the drawing or a claim about the original research process. The actual case remains linked. Keyboard buttons, reduced-motion settings and normal touch scrolling are preserved. Drawings live only in page state.

Skills & Tools now stands alone, with four capabilities linked to existing cases and a grouped tool list. It replaces the small list embedded in the earlier process section.

The user clarified that Explorations should contain dustbin, AR/VR and other experiments they will choose and share later. No main-project images were reused as exploration content. `data/explorations.ts` intentionally has an empty list. The compact introduction is visible now; supplied images and factual captions will activate the gallery and native image dialog. That populated gallery branch has not yet been checked with real exploration assets.

Production static export, ESLint, TypeScript and whitespace checks passed. Chromium checks passed at 320, 390, 768, 1440 and 1920 pixels, including hero-to-process drawing transfer, erasing, all process stages, keyboard/touch controls, reduced motion, loaded images and essential content without JavaScript. No horizontal overflow or browser runtime exceptions occurred. Screenshots are saved outside the repository in `/workspace/serene-review`.

## Case-study content and visual refinement — 15 October 2026

Improved the five existing Serene cases in place. The DM Sans typography, palette, original Figma-derived screens, contextual mockups, homepage and drawing interactions remain the foundation. Each case now connects its choices to named evidence and a concrete tradeoff. New explanatory visuals include the original dashboard export at a readable size, a medicine-record schematic, timer-state comparisons, a physical-project contribution map and an Orbit reading path.

The studies now include a specific task and something to notice. Results state what was made separately from the next evaluation question; sources and credits remain available in a native disclosure. Toki now distinguishes ready, running, paused and complete, with restart prevented at zero until reset. Physical Meditimer acknowledgement says “Acknowledged” rather than implying a dose record. These changes affect the portfolio studies, not original hardware or product behaviour.

Read `docs/case-study-writing-guide.md` for the content structure and the evidence boundaries of these five cases. No undocumented iterations, participant quotes or impact metrics were added. Work is on `portfolioSerene`; do not merge branches.

Validation: production static export, full lint, TypeScript and whitespace checks pass. Chromium checked the five cases plus Home, About, Work, Contact and Résumé at 1440, 768, 390 and 320px (40 route/width combinations), image decoding, document overflow, anchored headings, source disclosures, all five studies on desktop and phone, timer completion/reset, dose-record and pending states, acknowledgement wording, essential reading without JavaScript and reduced motion. No browser runtime exceptions were observed. Screenshots are under `/workspace/serene-review` outside Git.
