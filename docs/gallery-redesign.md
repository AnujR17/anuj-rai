# Clean gallery revision — 15 October 2026

The user rejected the previous homepage and medicine case studies, both visually and in their writing. That rejection supersedes the earlier poetic headlines and pale green page treatment. They selected **Clean gallery — white, large typography and nearly full-width work** from three alternatives. The introduction must still precede project work. Work remains on `portfolioSerene`, authored by `AnujR17`; no branches are merged.

## Critique and content audit

The exported pages showed repeated pale green surfaces, small project images, vague headlines and a large process illustration that competed with project evidence. The app case showed the two interfaces at the start but discussed their decisions mainly in a generic three-column text grid. The physical case used the same story template despite having a different contribution and a different type of artifact. Repeated scope warnings occupied the narrative where a clear explanation of a decision was needed.

This is an artifact review, not user testing. The user's rejection is the evidence about preference.

## Alternatives considered

| Direction                | Reading model                                                                    | Trade-off                                                                                                                    |
| ------------------------ | -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Warm editorial           | Text-led stories, cream paper, small coloured annotations                        | Offers a personal voice, but retains an illustrated presentation the user may dislike.                                       |
| Clean gallery — selected | Introduction, large project artifacts, short captions, evidence beside decisions | Makes the work easy to scan; needs strong source imagery and plain writing because decoration cannot carry the presentation. |
| Playful studio           | More colour, scattered experiments and conspicuous drawing                       | Develops the scribble idea further, but could compete with the cases and repeat the rejected playful treatment.              |

## Decisions and acceptance criteria

| Need                                       | Principle or method                         | Choice                                                                                                              | Trade-off / check                                                                                |
| ------------------------------------------ | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Understand Anuj before browsing work       | Content hierarchy; plain language           | Introduce Anuj, interface design and prototyping before project images.                                             | Less abstract personality in the headline; first viewport must make the role clear.              |
| Inspect the work quickly                   | Visual hierarchy; scale; grid systems       | Stack two nearly full-width featured projects, followed by three supporting cases.                                  | More vertical scrolling; project title, scope and link must stay next to each image.             |
| Understand the app's decisions             | Evidence mapping; proximity                 | Show each original screen alongside the decision it illustrates.                                                    | Screens recur as evidence rather than adding unsupported project artifacts.                      |
| Understand the physical contribution       | Scope definition; attribution               | Lead with the group model; state Anuj's framing/rationale contribution and teammate roles.                          | A model cannot supply hardware validation; retain that limit beside the artifact and in sources. |
| Keep demonstration and original work clear | Progressive disclosure; source traceability | Put original artifacts first and label later portfolio studies separately. Keep full scope in expandable sources.   | Interactive studies remain illustrative; no invented interviews, outcomes or validation.         |
| Keep the earlier drawing interaction       | Reversibility; reduced motion               | Retain a blank hero drawing surface, eraser and transfer into the process illustration; quiet monochrome treatment. | It is optional and must not obstruct text selection, keyboard use or touch scrolling.            |
| Keep future explorations available         | Honest empty states                         | Retain a compact experiments section until the user supplies dustbin / AR / VR images.                              | No gallery images or project evidence are fabricated.                                            |

Applied the design-practice skill, its vocabulary and portfolio rules, Sites presentation guidance, and the Mem0 cache workflow. The cached Mem0 search remains a successful empty result; the current request and local evidence supplied the needed context, so no remote retrieval or memory write was made. The retained Next.js static site continues to use GitHub/Vercel; no unrelated Sites project is created.

## Verification

Production export, full ESLint, TypeScript and whitespace checks pass. Chromium checked ten routes at 320, 390, 768, 1024, 1440 and 1920 pixels (60 route/width combinations), including image loading, a single page heading and document overflow. The first review found a minimum-width constraint in the supporting-project gallery; it was corrected and all combinations passed. Drawing transfer and erasing, process stages, medicine recording and pending sync, keyboard activation, physical feedback selection, timer pause/completion/reset, source-note disclosure, reduced motion and essential content without JavaScript passed. No browser runtime exceptions occurred. This is implementation QA, not usability or clinical validation. Actual screenshots are saved outside Git in `/workspace/serene-gallery-review`.

A newer same-branch case-study revision (`5fc0c1f`) was found during publication. Its evidence/tradeoff fields, source links, other cases, guided study tasks, timer recovery and acknowledgement wording are preserved. The medicine layouts include those tradeoffs, tasks, and delivered-work summaries. The local redesign commit is replayed after that revision; no branch merge or forced update is used.
