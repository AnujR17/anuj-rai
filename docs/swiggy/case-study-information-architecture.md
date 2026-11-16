# Swiggy case-study information architecture

16 November 2026. This addresses the user's correction about the case study's
reading order and information hierarchy, separately from the product's IA diagram.
The white surface and existing bottom-left stage index remain.

## Reader route

The opening establishes the product, challenge, contribution and scope. A plain
five-link contents list then names the actual chapters. Contents and chapter
headings share one definition, and all links work without JavaScript.

| Stage | Chapter | Reader's question and material |
| --- | --- | --- |
| Research | The agent and the task | Who uses this, what do they need to establish, and what informed the design? Source basis, two personas and inferred mental model |
| Insights | The priorities for the screen | What should the evidence, history and affected parties mean for the interface? Inspectable evidence, history as context, stakeholder map and responsibility |
| Concept | Designing the workspace | How did those priorities become a screen and operating model? Architecture first, then information layers/selection criteria, working rules, cost example, original scenario flows and layout iterations |
| Design | Investigating a complaint | How does the agent actually use it? Wrong-item setup, photo review, party contact, decision/explanation, then five case variations |
| Outcome | Reviewing the prototype | What did the review establish and what needs work? Sixteen findings, the three major issues, next evaluation and source access |

## Hierarchy and grouping

The brief and challenge are front-matter terms in a description list. They no
longer become chapter headings in the document outline. Five topic-specific H2s
name the main story. Artifact groups and decisions use H3. Iteration states,
scenario panels and individual findings use H4 under their group, with H5 only
for the paired versions within the Hold comparison. Group headings use 26–32px
type; individual states use 22px, below the existing 32–54px chapter scale.

The stakeholder map moves to the priorities chapter, where responsibility is
explained. Working assumptions and the cost calculation sit together in the
workspace chapter. Original flows sit with the scenario model before the
interface iterations; all five remain native, inline disclosures with full-size
source access. They start collapsed so a historical flow does not interrupt the
main reading route. Personas and both research maps remain visible.

The working-case chapter no longer switches into historical flowcharts or a
different ticket's business model between its recorded actions. Atlas/Kirridesk
belongs with layout iterations, rather than after the scenario demonstrations.
The four-version comparison, Hold change and visual-system comparison share a
stable "Refining the layout" group. Scenario variants and review findings also
have stable parent headings, instead of presenting every state at the same rank.

No research source, scenario, original graphic, rule, finding or media source was
removed. This is an editorial arrangement, not a claim of a newly established
historical chronology or new research.

## Checks

The structure check follows all five contents links, compares link and destination
titles, checks anchor visibility and reflow at four widths, and expands optional
material to detect skipped heading levels. It checks grouping of original flows,
rules/cost, scenarios and findings, plus native contents and version access.
The existing case and typography checks cover original sources, actual prototype
operation, all paragraph/metadata blocks, stage navigation and no-JavaScript use.

The checks pass at 1440, 768, 390 and 320px, including visible heading-size
differences and all five contents destinations. The full case passes at five
widths with 25 stage-position checks, original hashes and prototype/media/source
access. All 120 paragraph and metadata blocks pass fourteen widths and narrow
no-JavaScript layouts without single-word endings. SVG checks also pass after
their placement changes. Production build, lint, TypeScript and whitespace
checks pass. The iterations, review, contents and architecture compositions were
visually inspected on desktop and phone.
