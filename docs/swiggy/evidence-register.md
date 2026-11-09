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


## Additional source-to-decision comparisons

| Evidence | What the revised page shows | Boundary |
| --- | --- | --- |
| First supplied Agent Panel HTML, review notes | Approximate policy heights 430 → 200 pixels | Source fit estimate, not new measurement or time saved; font uncertainty about 20 pixels |
| Second and Third Iteration HTML | Five actions → four outcomes; Hold moves beside the timer | Grouping benefit is a design argument, not observed faster use |
| Third Iteration Star case drawer | Past outcome, similarity colours and fairness score | Feature absent in v7.1; ratings still exist elsewhere, so do not claim all judgement cues disappeared |
| New facts/hypotheses HTML, draft 0.1 | Public findings separated from proposed terms, operating rules and acceptance specifications | Proposals and unexecuted specifications are not deployed coverage |
| Original Stage 9 table | Five action counts and KLM estimates; 3/9/4 finding split | Same single Claude-led evaluation, no new support-agent evidence |

`capture-swiggy-motion.mjs` records real UI events and a visible pointer.
`swiggy-motion-studio.html` adds the camera and explanatory text outside the
original UI. `render-swiggy-motion.mjs` exports MP4/GIF versions and text metadata.
`render-swiggy-assets.mjs` composes the cover and crops original rendered screens.
These tools require Chromium/Playwright, FFmpeg and the local capture scratch
directory specified by SWIGGY_MOTION_DIR (default `/workspace/swiggy-motion-assets`).
The studio HTML and a DM Sans font copy must be served there on port 8767; the
font is downloaded from Google's original DM Sans family. Final assets are
checked into public/portfolio/swiggy; the production page needs no local scripts,
font service or media-rendering server.


## 9 November editorial revision

The current author clarification and claim/visual records are in
`editorial-revision-2026-11-09.md`. Anuj confirmed research, concept, design,
decisions and business logic within a four-person group; account names in the
handoff do not override this. The public case now follows final SW-2041 content:
kadai paneer ordered, malai kofta reported. Later data/script overrides and the
rendered interface supersede the earlier base dish names.

Three unmodified heuristic-review crops (f1/f2/f3) illustrate the partial refund,
truncated draft and collapsed checks. Their SHA-256 values and archive locations
are in `public/portfolio/swiggy/provenance.json`. The new HTML task flow is an
editorial explanation of the prototype, not a historical diagram, enforced
policy gate, real review integration or payment execution.
