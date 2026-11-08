# Swiggy evidence register

All archive paths below are relative to the supplied 8 November handoff. Public
copy is a synthesis of those sources, not an independent field study.

| Page material | Source | Interpretation |
| --- | --- | --- |
| Brief, human handover, three affected parties | `01_case-study/stages/01-overview.md` through `03-problem.md` | Self-initiated concept; no access to internal screens |
| Expert call, simulated interview, audit limitations | `01_case-study/stages/04-research.md`, `02_research/akshat-swiggy-handoff-notes.md` | One outside-domain call; simulated material is separate; contradictory audit accounts are not generalised |
| Facts, comparisons, decision support | `05-insights.md`, `06-define.md`, `07-ideation.md` | The three-layer model and six admissibility questions are design rules, not proven agent behaviour |
| Layout choice | `07-ideation.md`, step 5 | Layout B recommended in source; owner selected A by preference. Do not report B as implemented |
| Current policy | `DECISION-LOG.md` sections C–E, `06_change-logs/01-swiggy-handover-2026-10-18.md`, final `data.js`/`engine.js` | Later decisions override frozen v1.3; F4 is a policy-version disagreement |
| Candidate comparisons | `09_earlier-prototypes/design-system-comparison/` | Original Atlas and Kirridesk captures; no new before/after result invented |
| Final screen and review history | `08-design.md`, `06_change-logs/06`–`13`, `05_final-prototype/app` | 7 November prototype is newer than 3 November Figma |
| Rulebook | `04_design-system-and-rulebook/Design Rulebook v7.1.pdf` | Archived specification; later decision rows included; not Swiggy's internal policy handbook |
| Sixteen findings, action counts, KLM estimates | `09-testing.md`, `08_testing-heuristic-evaluation/results.json`, `measures.json` | Claude-led heuristic review, not user testing; counts belong to original walkthrough |
| Outcomes, limits, future work | `10-outcome.md`–`12-limitations.md`, `OPEN-ITEMS-AND-RISKS.md` | Working artifact, no measured speed/fairness gains; findings unresolved |
| Learnings | `13-learnings.md` | AI-written draft awaiting owner editing; not used as a personal statement |

The public bibliography links the original prototype, dated Figma frames,
rulebook and public policy/secondary sources. The dates above identify the
historical research record, not a claim that every external source has been
re-verified at publication time.

## Media production

`scripts/capture-swiggy.mjs` adapts the supplied heuristic walkthrough to operate
the unchanged application through visible browser clicks. It follows each of
the five fictional tickets to closure and saves a screenshot after each step.
The MP4 and GIF exports are edited to a readable step cadence; they do not
represent task durations. MP4 controls permit pause, replay and fullscreen.
The page never autoplays motion. Every GIF has a direct download link.

Rebuild against a running local app:

```sh
SWIGGY_CAPTURE_DIR=/workspace/swiggy-recordings node scripts/capture-swiggy.mjs
WORK_BANNER_SLUG=swiggy-agent-workflow node scripts/export-work-banners.mjs
```

`SWIGGY_PROTOTYPE_URL` can select the local static prototype on another port.
`CHROMIUM_PATH` can override the installed browser path. Playwright and FFmpeg
are required. Original screenshot frames and detailed capture logs stay outside
Git; reviewed media hashes and the compact verification record are retained.
