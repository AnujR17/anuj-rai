# Case-study system

Confirmed 16 October 2026

## Main cases

Keep the five main projects from `portfolioSerene`, commit `b1faef20a5c726d8c747cf39743cb201a503e1d6`

1. Meditimer app: `/work/medicine-app`
2. Himalayan 450: `/work/two-wheeler-dashboard`
3. Physical Meditimer: `/work/medtimer`
4. Toki: `/work/toki`
5. India in Orbit: `/work/india-in-orbit`

Work remains on `concept/diagonal-intro`
The reference branch was read for its projects and original artifacts
No branch was merged and the homepage composition was not changed
Research projects remain separate from the five main cases

## Overview

Show the project name, a concise specific headline and a short introduction
Follow with Project brief, Problem statement, Duration and My contribution
The brief states the assignment or ambition
The problem identifies the specific difficulty or opportunity and who it affects
Contribution describes actual ownership with specific verbs
Use accurate counts only when they explain the scope

The user confirmed three-week projects and individual work except physical Meditimer
For physical Meditimer, Anuj developed the concept, functions and interactions, considered human factors and ergonomics, and conducted field research
Teammates contributed mockups and documentation
Keep the app and physical product separate
Do not infer the app's implementation details or hardware behaviour from a screen or model
Unconfirmed research-project durations are omitted rather than estimated

## Five stages

Every case uses these stages in this order

| Stage | Content |
| --- | --- |
| Research | What was investigated and the material used |
| Insights | What the evidence means and what needs attention |
| Concept | The direction, reasoning and relevant tradeoffs |
| Design | The actual interfaces, physical form, interaction and implementation |
| Outcome | What was produced, what is established and the next useful question |

Do not repeat the problem statement in Research or the brief in Concept
Use subsections only when they advance the specific project story
Do not invent interviews, alternatives, iterations or evaluations to fill a stage
Concept and Design can describe an analysis approach for research projects
Outcome can explain a concept, prototype, analysis or unfinished question

## Sources

Original medicine-taker and caregiver components and their SVG assets were recovered from the reference branch
They retain the original screen structure and use DM Sans for this portfolio
The Toki visualization and physical Meditimer model were recovered unchanged
Full provenance remains in image records and Sources and credits
No image captions, annotations, stage numbers or decorative arrows are added

Toki's README, `docs/EXPERIENCE.md` and `docs/TOKI_V3.md` were reread on 16 October 2026
They now describe app 1.2 and firmware 3.0.8, a four-task queue and explicit completion with elapsed time
The older connection-only description and countdown portfolio study do not describe the current build
Physical acceptance and a signed app build remain pending
Do not claim verified focus gains, audible output or integrated hardware performance from compilation

## Editing

- `data/case-study.ts` defines the shared stage names and content model
- `data/projects.ts` contains the five main cases in the agreed order
- `data/research-projects.ts` contains four supporting research cases
- `app/work/[slug]/page.tsx` renders every case using the same structure
- `components/case-study/ProjectVisual.tsx` renders original artifacts
- `components/case-study/case-study.module.css` controls the responsive reading layout

Before adding detail, obtain the actual source or the author's account
The app's research process, design alternatives, implementation state and testing need specific documentation
Physical Meditimer's field methods and findings need the original account before adding participant counts or observations
The existing screens, model and working code do not establish user outcomes

## Validation

Production build, full lint, TypeScript and whitespace checks pass
Chromium checks cover all nine cases and the Work index at 1440, 768, 390 and 320 pixels
The checks cover the five stage links and headings, overview fields, confirmed main-project durations, image loading, narrow layouts and anchor positions below the sticky navigation
Essential case content and stage navigation work without JavaScript, including keyboard activation
Unknown project routes return 404
The homepage, global palette, DM Sans setup and footer are unchanged
