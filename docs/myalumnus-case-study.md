# MyAlumnus portfolio case study

## Branch and scope

Work on `case-study/myalumnus`, created from `code/portfolio` at `83395fef92826d33ee2b237a4f1f824acb447aa7`. The current user's request for a new branch supersedes the earlier branch-specific instruction. Do not merge without explicit approval.

Route: `/work/myalumnus`. The project is linked from the homepage's featured selector and the Work index. Existing project pages remain on their established renderer; MyAlumnus has its own editorial component and scoped CSS.

## Editorial direction

Use the existing warm off-white, stone text, restrained rust accent, Inter typography, asymmetric layouts, direct navigation, and real artifacts. The live `main` branch retains an older construction entrance and placeholder projects. The newer `code/portfolio` branch supplies the current evidence guidelines, genuine media, and mobile navigation, so it is the base for this change.

Organise the material as a readable decision narrative rather than thirteen equally weighted process sections:

1. Context, individual contribution, and a real product screen.
2. The observed gate problem.
3. Research that sharpened the brief, including limitations.
4. Product decisions and their tradeoffs.
5. An interactive viewer for five actual interface states.
6. The shared guard/admin workflow and design-system considerations.
7. Testing, reported failures, outcome, and concrete pilot questions.

This is a complete first draft. Personal learnings have not been invented. The current page does not claim institutional adoption or measured campus impact.

## Contribution confirmed by the user

The user explicitly described MyAlumnus as a collaboration and their contribution as decision-making, concept refinement, research, and UI. The handoff identifies Sukhmanpreet Singh Saini as project owner; the application repository is under `sukhman0402/myalumnus`. Do not attribute every implementation feature or all fieldwork to Anuj Rai.

## Evidence consulted

The user supplied `MyAlumnus-handoff-2026-10-09-part1-docs-app-screens.zip`, `part2-design-finals.zip`, and `part3-process-archive.zip`. Local combined source:

`/workspace/project-review/myalumnus/MyAlumnus-handoff-2026-10-09/`

Key documents:

- `00-START-HERE.md`: inventory, reported historical deployment state, open work.
- `01-project-docs/planning/01-product-concept-v2.md`: corrected current product model; host-first escalation supersedes admin-first descriptions.
- `01-project-docs/research/11-interviews-primary-research.md`: three alumni and one guard; leading-question and transcription caveats.
- `01-project-docs/research/13-contextual-inquiry-working.md`: one gate entry observed, interruptions, no measured duration; admin-office conversation primarily reported evidence.
- `01-project-docs/research/27-problem-statement-case-study-final.md`: refined information-at-the-gate problem.
- `01-project-docs/research/72-think-aloud-case-study-final.md` and `73-usability-report-case-study-final.md`: one guard, five tasks, four completions, silent approval failure, after-session narration checked against audit trail, no observed admin session.
- `01-project-docs/research/77-design-system-case-study-final.md`: token continuity, decision labels/colours, text enlargement, Hindi/native-review limits.

Original screenshots from `03-final-screens/` were copied, without alteration, to `public/portfolio/myalumnus/`. Eight selected screens show fictional Sample University data. Every published image is used by the page. Raw interviews, personal contact information from the internal documents, database exports, and the full source archives remain outside the public repository.

The inspected application GitHub commit was `5955e1e1d16564f6374467b8384c12e577108116`. The live demo's sign-in page was reachable; authenticated workflows and database state were not revalidated here. Current behaviour may differ from the dated screenshot set.

## Claim boundaries

- Findings in the page are attributed to supplied research/reports. The portfolio-page checks do not reproduce or validate application findings.
- 15 seconds / 3 taps describes a single task in the supplied session account, not an average or benchmark.
- 4 of 5 is described as a qualitative result from one guard, never as a general success rate.
- Simulation reductions are omitted from outcome claims; they were model estimates on an evaluation build.
- Expert/AI-assisted evaluation is distinguished from observed participant research.
- Photo mismatch after host confirmation and silent approval failure remain unresolved in the supplied version; fixes are future recommendations.
- The prepared 3-guard/2-admin pilot is future work, not completed recruitment.
- Evaluation-only fixes, dropped Material 3 styling, and older admin-first flows are excluded from descriptions of the current interface.

## Validation

Completed on 9 October 2026:

- Production build passed with real font downloads and static generation of `/work/myalumnus`.
- Full repository lint and TypeScript passed; Git whitespace check passed.
- Production Chromium checked homepage, Work, MyAlumnus, Himalayan 450, and India in Orbit at 1280, 768, 390, and 320px: 20 route/width combinations returned HTTP 200 with one h1, visible navigation, and no horizontal overflow.
- Five screenshot tabs, visible image loading, full-size destinations, arrow/Home/End keyboard selection, metadata, contribution text, section anchor, and source disclosure passed.
- Featured-project switching and case-study navigation passed, including overflow checks after switching at 390 and 320px.
- Reduced-motion rendering, unknown-project 404, and readable server-rendered case-study content without JavaScript passed. The default screen and full-size links remain available without JavaScript; switching requires JavaScript.
- No browser runtime exceptions occurred. Desktop and mobile screenshots were reviewed.

These checks concern the portfolio page, not the underlying MyAlumnus app or its unresolved findings. No merge or production deployment was performed as part of the implementation.
