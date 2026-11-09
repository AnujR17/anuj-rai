# Applied refinement plan for Anuj's portfolio

Applied with this skill on 9 November 2026, using current repository content and the reference review. This is a concrete editorial and production draft, not a claim that the live cases have been changed or their original studies revalidated. The eight selected projects keep their order and routes. Three supporting research cases remain accessible through their existing URLs.

## Priorities

First preserve contribution, sample, version and implementation status. Then replace repeated explanation with a consequential choice and an inspectable artifact. Finally adjust composition where that choice is difficult to see. More text, more screenshots and a larger method list are not objectives.

The present pages already contain useful restraint. Editing should retain it without making each paragraph end in a disclaimer. The principal opportunities are a clearer distinction between sections, better evidence-to-decision proximity, and state sequences that show what happens when information is incomplete.

## 1. Meditimer app

**Argument:** Recording a dose and interpreting someone else's record are different tasks. The caregiver needs to distinguish an update from an unanswered question.

**Reference transfer:** Elizabeth's Student Progress case, its teacher views and filter revisions, shows how the same underlying information must answer different questions. Neha's Jifflenow information model explains a product through its unit of action. The useful resemblance is role and information structure. Neither reference supplies evidence about medication behavior.

**Section jobs:** Research establishes the related survey's scope and the two perspectives. Insights explains what a daily total leaves unknown. Concept explains the choice of different entry views. Design shows a specific medicine, its recording action, and the caregiver's available follow-up. Outcome states the actual app output and the next comprehension check. Remove repeated explanations of the same two-role distinction from successive stages.

**Visual sequence:** Preserve the restored Capture, Review and Routine opening. Preserve the green dose-record scene and paired interfaces. Use actual setup screens to explain how a routine is entered. Keep the original-interface viewer. Do not add a new caption layer, redraw the devices, or imply that a portfolio demonstration proves live synchronization.

**Ready-to-review copy replacement for Insights:**

> The caregiver view combines a daily total with individual dose records. The total gives an overview; the records show which medicine needs a closer look. A dose marked as taken records an update from the person using the app. An empty record leaves the caregiver without that update. The call action provides a way to ask what happened.

**Source and limit:** `data/projects.ts`, `medicine-app` Insights and Design; original role-specific screens; `docs/medicine-case-restoration.md`. This describes represented information and actions. It does not establish ingestion, successful notification delivery, account synchronization or improved adherence.

**Implementation:** Review `MedicineCaseStudy.tsx` and `MedicineInteractions.tsx` before editing data: the specialized renderer owns visible content and scenes. Update only matching text locations. Preserve the fixed mockup exports and their proportions.

**Acceptance:** Every apparent dose state corresponds to the actual screen or a clearly identified proposed explanation. The reader can identify what the caregiver knows and what remains unknown. A future comprehension test should ask what the record means and what action the participant would take, without presuming an answer or a health benefit.

## 2. Swiggy agent workflow

**Branch update, 9 November:** This initial plan used main. The existing `case-study/swiggy-agent-desk` branch has since been inspected and contains v7.1, original wireframes, recordings and a heuristic evaluation. Read `docs/swiggy/case-study-context.md` and its evidence register before editing. Those records supersede the developing-study status and missing-screen statements below. They also document a user-authorized exception for explanatory film text and meaningful diagram labels. Preserve unresolved individual contribution and actual team credits. The implemented refinement follows SW-2041 using existing artifacts; it does not modify the prototype or claim the recorded findings are fixed.

**Argument:** A support suggestion should expose the report, supporting evidence, applicable policy and unresolved information before an agent acts.

**Reference transfer:** Neha's [247].ai handoff section identifies what transfers between actors. Sukhman's MyJio conversation states expose a specific support problem and a human-help path. Nicole's AI summaries case connects summary content to access to the underlying material. These are relevant to the relationship between a suggestion and an accountable decision.

**Section jobs:** Research states that this is a developing policy/scenario study. Insights identifies the distinction between reported and supported facts. Concept defines the workspace's information groups. Design follows one missing-item or wrong-item scenario. Outcome records what has actually been produced and what must be reviewed with experienced support staff.

**Visual sequence:** Choose one scenario already supported by source material. Show the ticket, available evidence and policy together, followed by the allowed action. Include an incomplete-evidence state only as a proposed scenario until it has an actual implemented screen. The existing composition cover cannot substitute for a product walkthrough.

**Production specification:** For each scenario record the customer's statement, known facts, missing facts, policy source/version, suggested action, who confirms it and recovery if it fails. Redact personal data in genuine examples. Any new illustrative ticket must remain identified as a scenario in the normal story.

**Implementation:** `data/work-projects.ts`, slug `swiggy-agent-workflow`; actual application screens are missing from the current case. Keep the existing Work cover until a real replacement is available.

**Acceptance:** A reader can distinguish a fact, policy and suggestion without relying on color. The page never describes scenario construction as field research or a proposed speed benefit as a measured result. Avoid copying MyJio's emotion control unless the support task actually justifies it.

## 3. Himalayan 450

**Argument:** The circular display must be inspectable while values and warnings change, rather than assessed only as a static composition.

**Reference transfer:** Sukhman's Drive Wise separates broader research, concept logic and a working demonstration. Drew's Admin Mobile case uses specific tasks and changing information to explain a constrained screen. Elizabeth's iterations support comparison only when genuine versions exist.

**Section jobs:** Research presents the mixed two-wheeler survey as context. Insights identifies competition between readings. Concept explains the circular arrangement and space constraint once. Design shows controlled state changes. Outcome distinguishes the browser demonstration from riding evaluation. The current Insights, Concept and first Design block repeat the stable-hierarchy argument; replace the Design repetition with observable controls and states.

**Visual sequence:** Keep `/portfolio/research/bike-feature-priorities.png` with Research and `/portfolio/himalayan-dashboard.png` as the design context. Capture two states from the current prototype using repeatable inputs, preserving scale. Explain the actual changed reading or warning in normal prose. Do not create an invented rejected dashboard for a before/after panel.

**Ready-to-review Design replacement:**

> Speed occupies the centre, RPM follows the upper edge, and gear and warning indicators have separate positions. The browser prototype provides ignition, throttle, brake, gear and indicator controls. Eco, Performance and Rain modes add states that a viewer can inspect through keyboard or on-screen inputs.
>
> These controls let the same change be repeated and the resulting display compared. The next review should examine which readings compete when a warning appears, then test legibility under riding conditions.

**Source and limit:** `data/projects.ts`, `two-wheeler-dashboard` Concept, Design and Outcome; original export and linked prototype. The first paragraph consolidates existing recorded behavior. The second specifies future evaluation, not completed tests or a claim of reduced glance time. Before publication exercise the named controls against the current deployed version.

**Implementation:** `data/projects.ts`; review the display-heading overrides in `data/work-projects.ts`. New state captures belong with their provenance in project assets. No shared renderer change is necessary unless an actual comparison control is chosen.

**Acceptance:** Each of the three middle stages contributes new information. The survey does not appear to validate the specific layout. The case retains the original design/implementation-assistance credits. Original alternatives and the selection rationale remain a precise evidence request, not fabricated history.

## 4. Toki

**Argument:** Phone edits, device actions and connection changes must not leave the current task ambiguous.

**Reference transfer:** Neha's role/time-horizon explanation maps well to phone planning versus the object's current task. Drew's stale-data and recovery decisions show how exceptional states can explain design judgment. Sukhman's BINA build account shows why physical timing deserves explicit documentation.

**Section jobs:** Research identifies the synchronization and completion questions investigated through implementation. Insights distinguishes elapsed time from completion. Concept explains the four-task queue and user control. Design follows the actual synchronization boundary and gestures. Outcome names app/firmware progress and physical acceptance still required.

**Visual sequence:** Use the existing concept image only as a concept visualization. Add current app views and a documented state sequence: idle queue, middle-tap start, phone edit while running, pause or completion, eligible synchronization. Show physical footage only when actual integrated hardware is available. A new diagram may explain documented behavior but must not impersonate a historical research artifact.

**Ready-to-review Design opening:**

> The phone holds the full task list; Toki presents one task at a time from a queue of four. Changes made on the phone while a task is running wait until pause or completion. A middle tap starts tracking, a middle hold completes the task and a left hold pauses it. Time passing does not complete the task.

**Source and limit:** `data/projects.ts`, `toki` Concept and Design, summarizing the documented implementation. Recheck current app/firmware versions before publishing. The motor remains inactive pending a position-reference strategy; a successful build does not establish physical operation.

**Implementation:** `data/projects.ts`, with current project repository evidence linked from the case. Specify state captures before adding gallery components.

**Acceptance:** The reader understands what happens to an edit during a running task. A future integrated demonstration must include reconnection and retained queue state. Do not imply that minimizing a queue improves concentration without evaluation.

## 5. India in Orbit

**Argument:** Each visualization should answer a question that the preceding content gives the visitor a reason to ask.

**Reference transfer:** Sukhman's SDG case explicitly relates dial, line chart and map to different questions. Its distinction between official, derived and missing data is useful for orbit representations. Bettina's task-by-task pacing helps a long visual experience remain understandable.

**Section jobs:** Research introduces the subject matter and source context. Insights identifies the need to connect everyday uses with orbital detail. Concept explains reading sequence versus exploration. Design demonstrates one real transition and one actual explorer control. Outcome states the live output and the unanswered learning question.

**Visual sequence:** Preserve the opening capture `/portfolio/india-in-orbit.png`. Add an existing application section, a mission-history view and one meaningful explorer state. For each, record the question answered and whether the representation is illustrative or driven by data. Show one changed control at a time so the effect can be understood. This is a capture brief; those additional images have not been produced in this skill task.

**Implementation:** `data/projects.ts`, slug `india-in-orbit`; source website and repository linked there. Validate current data definitions and freshness before writing exact technical claims. Preserve Dr Anupam Rana's guidance and source/asset assistance credits.

**Acceptance:** The reader can explain why the three representations differ. A live 3D scene is not presented as proof of scientific accuracy or improved learning. Dense controls remain accessible on a phone and through a non-3D alternative when implemented.

## 6. Gandhinagar roundabouts

**Argument:** Fieldwork complicated the initial explanation of congestion and changed the role communication could reasonably play.

**Reference transfer:** Moritz's reflection revisits an initial solution commitment. Elizabeth connects unexpected observations to changed direction. Neha's CMF teaching case asks whether a brief, selected artifact and conclusion actually support the same argument.

**Section jobs:** Research distinguishes observations, conversations and police records. Insights uses the overlapping approaches to explain the reframing. Concept compares the actual communication directions. Design shows the real poster examples and their qualitative review. Outcome explains why posters are only supporting interventions.

**Visual sequence:** Field photograph, original flow map, two genuine poster concepts. The map establishes a movement problem; the posters establish communication exploration. Keep the original labels and annotations in the report images intact. Do not add decorative arrows or remove research labels to imitate the site's typography rules.

**Implementation:** `data/research-projects.ts`; assets `gandhinagar-field.jpg`, `gandhinagar-flow-map.jpg`, `poster-regret.jpg` and `poster-accountability.jpg` under `/portfolio/research/`.

**Acceptance:** The story makes the change in understanding explicit. Its 298 record rows are not described as unique crashes. Phone-based qualitative poster feedback is not called a randomized A/B test or deployed safety intervention. The proposed delivery-time extension remains future work.

## 7. Physical Meditimer

**Argument:** The arrangement of storage, display and tray should be understood through handling and the action following a reminder.

**Reference transfer:** Sukhman's BINA sensor-placement and build-failure sections explain a physical choice through cause and consequence. Neha's CMF case distinguishes a convincing render from a material sample. Borrow that distinction, not the bin's capabilities or research claims.

**Section jobs:** Research establishes routine and handling context. Insights identifies the action a reminder must lead to. Concept explains the arrangement. Design uses the actual model to examine access, visibility and scale. Outcome records its fidelity and the next handling checks.

**Visual sequence:** Start with the actual model image `/portfolio/physical.jpg`. Use additional original model views only when available and attributable. A useful future operation recording would show access to storage, the display and tray in one sequence. No fabricated electronics demonstration or rendered hand interaction should stand in for that evidence.

**Implementation:** `data/projects.ts`, slug `medtimer`. Preserve Anuj's concept, function, interaction and field contributions separately from teammates' mockup/documentation work. Do not merge this case with the independent app or survey.

**Acceptance:** The reader can tell what the model physically demonstrates. Dispensing, sensing, automation, fabrication credit and medicine-taking benefits require specific evidence before they are added. Keep this project equally substantive rather than treating it as an appendix to the app.

## 8. My Alumnus

**Argument:** A visitor record is useful when it supports a guard's next decision, including an uncertain visit or a decision that failed to save.

**Reference transfer:** Sukhman's main/full case offers a related workflow but also a version and ownership discrepancy. Neha's handoff explanation helps specify which information must persist through escalation. Drew's Admin Mobile recovery account makes a failure state part of the design reasoning.

**Section jobs:** Research attributes the small study to the supplied report. Insights explains continuity across shifts. Concept explains host-first confirmation and its identity limit. Design follows the record through Approve, Deny or Hold. Outcome describes the one-guard task session and failed save before proposing recovery.

**Visual sequence:** Existing `guard-home.png`, `guard-ipad.png` and `hold-host.png` establish search, record and escalation. Keep fictional Sample University data. Do not mix later collaborator screens into the October account without establishing version correspondence. Any new confirmation/error state must be labeled as a proposed revision in the normal story.

**Implementation:** `data/work-projects.ts`, slug `myalumnus`; inspect the compressed task fact and its disclosure as well as the body text. Use `CaseNumbers.tsx` only if its actual rendered behavior requires a change.

**Acceptance:** The visible task fact retains “one guard” context and does not become an 80% success headline. No approval appears saved unless its persistence is confirmed. The contribution statement remains based on confirmed collaboration while the public-account discrepancy is unresolved.

## Supporting research routes

| Case | Relevant reference | Applied editorial action | Necessary boundary |
| --- | --- | --- | --- |
| Medicine, storage, and reminders | Sukhman's physiotherapy report distinguishes cohorts and provenance | Put the current/preferred reminder comparison near the question it answers; keep the two response paths explicit | 52 people, 48 caregiver paths and seven senior paths include three overlaps; question denominators vary |
| Consumer experience | Canteen report explains why particular analyses fit its variables | Lead with the descriptive attribute comparison and the practical store-visit question | Supplied dataset is not personal recruitment; reconcile report/notebook conflicts before promoting statistical results |
| Skidge | SDG source distinctions and research-method restraint | Keep the definition of each score attached to its chart; distinguish observed variables from constructed labels | Resolve synthetic targets, possible leakage and altered statistical output before promoting model metrics |

These cases use `data/research-projects.ts` and their existing charts. They do not need a product-launch narrative or a place in the eight-project Work gallery to demonstrate analytical judgment.

## Review outcome and next implementation pass

The skill has been used here to produce three source-bounded copy drafts, eight concrete story/visual plans and three supporting research applications. These are immediately reviewable editing outputs. No production case files, components or live deployment were changed in this task.

Implement text consolidation first, using the current renderer and display headings. Capture missing real states next. Add a component only when the selected visual cannot be communicated with existing presentation. Verify facts and source correspondence before visual polish, then inspect affected rendering and run the repository's required checks. Missing historical alternatives, collaborator attribution, physical acceptance and measured outcomes remain explicit evidence gaps.
