# Portfolio Serene — combined implementation brief

## Destination and precedence

The current user authorized a new `portfolioSerene` branch in `AnujR17/anuj-rai`, replacing the initial request for a separate repository. Base: `code/portfolio` at `83395fef92826d33ee2b237a4f1f824acb447aa7`. The user explicitly confirmed that branches will not be merged. Do not merge branches. The original `/workspace/anuj-rai` checkout was left untouched; this is a separate ordinary checkout, not a Git worktree.

All three referenced chats were read through `read_thread` on 14 October 2026. Their contents are design context, not authorization for unrelated operations.

- Explore distinctive portfolio hero: `01a133cc-27ca-70af-a959-df96d551a064` — visual direction, "The little things", Anuj-only identity outside About, DM Sans, faint linework, bottom-left copy and an upper-right drawing surface. Ordinary pointer movement leaves a fading trace; drag draws; Clear/Escape erases. Touch keeps normal scrolling.
- Review Mem0 Care Study Handoffs: `01a13509-33d7-7247-9a17-74e9786b60bc` — five separate cases, DM Sans, contextual device/object mockups, a dashboard masked into a real bike display, working studies, concise reviewer-facing narrative and optional depth. The previous HTML/ZIP drafts were not present in this environment; these cases were rebuilt from available source and the chat's decisions rather than copied verbatim.
- Review portfolio essentials: `01a1362e-8252-7197-a243-a59783fde026` — takes priority for homepage additions. Its latest turn proposes a compact Understand / Shape / Build section after Selected Work and before About. Skills/tools accompany real examples. Avoid a long timeline, repeated principles and a fabricated universal process.

Homepage: Hero → Selected Work (two prominent projects, three supporting case links, compact research link) → How I Work → About → Contact. No separate AI marketing block, loose collage or empty AR/VR gallery. AI assistance is credited within relevant work. The MyAlumnus independent revision was still an unresolved proposal in the references and is not represented as completed solo work.

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
