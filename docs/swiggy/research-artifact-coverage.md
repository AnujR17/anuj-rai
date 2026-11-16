# Research artifact coverage

Latest presentation correction, 16 November: the section is titled “Agent
personas”. Its introduction explains once that the profiles were developed from
research and project assumptions. Tenure appears as profile context, and
repeated “hypothetical” wording is removed from the public case, including
accessible names and rule descriptions. Working rules remain identifiable as
project choices. The source extracts below preserve their original wording.

16 November 2026. The author corrected the omission of assumptions, personas
and maps from the case-study outline. The previous edit condensed away actual
project work. The guidance against generic process filler did not justify that
omission. This pass restores the supplied work and explains its connection to
the interface within the existing five-stage layout.

## Sources and placement

Paths below are relative to the supplied 8 November handoff unless specified.
The original extracts are retained in `source-records/research-models-2026-10.md`.

| Artifact | Source and status | Public placement and purpose |
| --- | --- | --- |
| Operating assumptions | Frozen v1.3, later v2/v2.1 policy decisions, final engine; project choices | Research: records/contact access, photo condition, standing terms/cost and upstream checks. Explain what the prototype assumes |
| Four conscious policy choices | 17–18 October handover and decision log | Research disclosure: refunds above terms, customer call, combined record and photo condition. Keep the project model distinct from public policy |
| Ananya and Rohit | Stage 6 Define; two hypothetical personas; names/tenures are placeholders | Research: goals, risks and information requirements for newer/experienced agents. Portraits added later are presentation illustrations; no invented quotation or observed-behaviour claim |
| Nine-step mental model | Stage 5 Insights and FigJam `jdVOYesjFWTQOsQcxnVvV9`, root `0:1`; inferred | Research: readable responsive SVG, full nine-row table and original board overview/link. Explain history-as-context and the early agreement dependency |
| Stakeholder map | Same Stage 5/board; research synthesis with reported/inferred relationships | Research: readable responsive SVG showing agent, customer, restaurant, rider, platform and external recourse. Explain comparable records and remedy/cost separation |
| Value Opportunity Analysis | Stage 6; subjective Low/Medium/High ratings | Research disclosure: all six stakeholder rows, explicitly early judgements and expected value rather than a measured before/after |
| Three-layer model | Stage 6; data, derived insight, decision support | Concept: connect photo provenance, history counts and agent choices to the information model |
| Six admissibility questions | Stage 7 Ideation; selection criteria | Concept disclosure: objective, traceable, no prediction, no prescription, comparable party treatment, reduced lookup work |
| Creative matrix | Stage 7; early design ideas | Concept disclosure: all nine questions plus shared tools, paraphrased from the source. Identify the claim clock, permission and approval-limit ideas that later changed |
| Five scenario flows | `10_user-flows/flow-*.png`, exports from 17 October | Design: original images inside scrollable native disclosures, first open, with full-size access. Different sample dishes, amounts and old branches are identified |
| Information architecture, versions and Hold relocation | Existing prototype/wireframes | Concept, retained after the restored reasoning. Actual source images and four-version viewer remain available |
| Working interaction and review | v7.1, existing captures and heuristic results | Design/Outcome, retained. Eight mockup recordings and sixteen unresolved findings remain distinguishable from user-test outcomes |

## Evidence boundaries

The inferred mental model and personas were not observed Swiggy agent research.
The original model's live restaurant-permission step belongs to its early
version; the later concept uses standing terms. Removing P8 from the condition
list is distinct from the remaining hypothetical T1 high-value review trigger.
The stakeholder map does not establish current Swiggy integrations or dispute
routes in the prototype. The early value ratings are not a measured baseline.

The handoff's method ledger explicitly replaced an empathy map with a
stakeholder map because agent feelings were unavailable. No empathy map,
observed journey or service blueprint was fabricated to fill the page.

The FigJam root was read through the Figma connector: structured text/nodes,
relationships and its returned board overview were inspected. The responsive
mental-model/stakeholder SVGs are new reading layouts of that source. The
original overview image returned by `get_figjam` is hosted locally, unmodified.
A separate high-resolution screenshot URL was provided, but its download met a
proxy 403; it was not retried through another route. The live board link remains
available. The five flow PNGs are byte-for-byte copies of the supplied exports.

`public/portfolio/swiggy/provenance.json` records sources and SHA-256 values for
the six original images and four new SVGs. `data/swiggy-research.json` contains
the displayed summaries; it is not a new research dataset.

## Editorial and visual checks

Each restored artifact has a reader question, evidence status and design
implication. The narrative moves from the investigation and explicit working
assumptions through agent differences and decision relationships to screen
selection, layout, flows and implementation. Longer source tables use native
disclosures; the personas, maps and their main implications remain visible.

The compact hero, Meditimer-informed typography, single vermilion Insights
section, bottom-left stage labels, original UI/media and footer are preserved.
No extra case stages or project pages were added. The local editorial skill and
acceptance review now explicitly require an artifact inventory before a case is
condensed, so supplied work is not silently removed to meet a word target.


## Verification

Production build, ESLint, TypeScript and whitespace checks pass. The case,
vector, layer and typography browser suites pass without runtime errors.
Checks include the restored artifact contents and original-source hashes,
keyboard/native full-size access to all five flows, the nine-row mental model,
six-row value analysis and ten-row creative matrix. Native disclosures and the
flow images remain usable without JavaScript. The five vector studies have ten
standalone artboards with embedded DM Sans, intact proportions and no clipped
text. All 120 audited paragraphs/metadata blocks have no single-word final line
at fourteen widths; 320px and 390px no-JavaScript versions pass too. The compact
hero still fits eight viewports. Screenshots are retained outside Git under
`/workspace/swiggy-research-final` and `/workspace/swiggy-research-review`.
