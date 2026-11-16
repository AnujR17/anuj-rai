# From a reference detail to an implementation

Use this procedure whenever proposing a borrowed pattern. The output is a concrete decision, not a moodboard label.

## Record the transfer

For each important pattern record:

1. Source page and exact section or state.
2. What is directly visible or stated.
3. What reading or interaction problem it appears to address. Mark this as interpretation unless the author states the reason.
4. Its cost: reading effort, hidden content, interaction dependency, screen space, maintenance or accessibility.
5. The corresponding problem in Anuj's case.
6. The actual source material available for that adaptation.
7. The concrete content/layout/behavior change.
8. A check that would establish whether the change works as intended.

If steps 5 and 6 are missing, do not import the pattern. Similar colors, industries or device shapes are insufficient resemblance.

## Page and paragraph construction

The opening should establish the object, task and contribution before expecting a reader to care about process. A useful paragraph normally adds one of: context, evidence, interpretation, choice, behavior or result. Two successive paragraphs performing the same job need a reason to coexist.

Write section openings around the particular question. Keep method names subordinate to what was investigated. End a decision passage with the consequence visible in the artifact; avoid a slogan that repeats the heading. Use a finding and its implication in connected prose, without manufacturing a neat chronological process.

Check referents: words such as “this,” “system,” “experience,” “clarity” and “trust” should refer to an identifiable object, state or decision. Explain mechanisms: what information becomes available, what action changes, what uncertainty remains? Use the swap test: if another project title fits the paragraph unchanged, it probably needs concrete content.

## Visual construction

| Pattern | When useful | Build requirement | Failure to avoid |
| --- | --- | --- | --- |
| Product opening | Establish what exists | One genuine visual with status and short introduction in normal text | Hero-scale decoration that postpones understanding |
| Role comparison | Different actors use related information | Comparable states; clear role headings; explain different actions | Two unrelated screenshots described as a shared flow |
| Version comparison | A real choice or revision | Same scale/context, original versions, selection reason | Invented before state or an implied measured improvement |
| Task sequence | State or time matters | Start, action, feedback, next state, relevant exception | A gallery of screens with no causal relationship |
| Evidence beside decision | A finding changed the work | Relevant extract/chart and exact consequence nearby | A research image far from the claim it supposedly supports |
| Small system model | Relationships explain the interface | Real entities, information exchanged, boundaries and failure states | Diagram complexity used as a proxy for thinking |
| Physical operation | Handling and timing matter | Actual object, scale/context, input and response | Rendered motion presented as hardware verification |
| Optional detail | Source material exceeds the main argument | Descriptive control, keyboard/touch access, explicit expanded state | Hiding the conclusion, status or ownership |
| Outcome comparison | Evaluated change exists | Measure, baseline, sample, method, time and attribution | Counts of screens or features passed off as impact |

Place the explanatory paragraph near the visual that supports it. Under Anuj's rules, that paragraph remains part of the normal story, not an image caption or marginal note. Preserve original labels inside source artifacts. Use alt text for meaning and interaction controls for access.

## Hierarchy and pacing

Use the existing tokens first. Give evidence enough width to read. A whole-screen view establishes context; a separate detail can expose a consequential control. Put genuine alternatives at comparable scale. Alternate prose and evidence according to the argument, rather than mechanically alternating colors or cards.

Headings, whitespace and grouping should communicate the structure before decoration does. A large number deserves emphasis only when it changes the reader's understanding; include its scope in adjacent readable content or an accessible disclosure. Do not enlarge dates, file sizes or screen counts merely to create a metric row.

On a phone, stack comparisons in the same meaningful order, preserve their labels, and offer full-size viewing for dense originals. Avoid reducing a desktop matrix into unreadable text. A narrow version may summarize the decisive comparison and retain access to the full artifact. Keep stage navigation short enough to permit entry into the story.

## Interaction specification

For each interactive visual specify its initial state, trigger, feedback, destination/state change, recovery, keyboard behavior, touch behavior and static fallback. A recording needs deliberate playback and a useful poster frame. A comparison needs an understandable selected state. A disclosure needs an accessible name and expanded state. A full-size viewer needs a close control, focus management and return to its trigger.

Motion should explain a transition or response. Do not animate metrics in a way that leaves misleading intermediate values in screenshots or assistive output. Do not make autoplay the only way to see a critical state. Preserve the existing reduced-motion and no-JavaScript behavior.

## Implementation in this repository

- `data/projects.ts`, `data/work-projects.ts`, and `data/research-projects.ts` hold case text and evidence references. `data/work-projects.ts` also supplies display headings that can override the longer block titles; review both when changing heading meaning.
- `data/case-study.ts` defines the content model. Preserve stage IDs and URLs. Its image `caption` field stores provenance; it is not permission to render a caption.
- `app/work/[slug]/page.tsx` and `components/case-study/` render shared cases. Find the actual renderer before changing a component or assuming a data field is visible.
- Meditimer has a restored specialized presentation. Read its restoration brief and actual component before modifying it. Keep fixed raster device mockups and original artboard proportions.
- `components/case-study/ProjectArtwork.tsx` and the banner exporter affect Work imagery. A case text change does not require regenerating covers. Changed cover source imagery does.

For a text-only refinement, check facts, display headings, repetition and rendered line lengths. For behavior/layout changes, exercise affected states at desktop and phone widths, keyboard and reduced motion. Run the relevant repository checks. Record unverified external-demo behavior separately from the portfolio page's behavior.

## Completion gates

Do not call a transfer ready until it has a source, a reason relevant to Anuj, usable material, an implementation target and an acceptance check. Do not call a case complete while an invented fact supplies a missing connection. A deliberate omission with a documented reason is better evidence of editorial judgment than a compulsory section filled with abstractions.
