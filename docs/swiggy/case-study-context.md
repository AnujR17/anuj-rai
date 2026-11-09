# Swiggy case study continuation

Latest author framing: read `project-intent.md`. The case is about a chat
interface and dashboard supporting an agent's judgement, including fraud
assessment. Five scenarios explore alternative directions. A recorded refund
path is an example, not the whole purpose or a prescribed outcome. Predicted
quality/efficiency benefits remain distinct from demonstrated prototype states.

Request dated 8 November 2026. Repository: AnujR17/anuj-rai. New branch:
`case-study/swiggy-agent-desk`, based on production main at
`b6448c95bf3e8a31d16b31512bec4b5161e86457`.

## Context retained from this chat

The portfolio targets interaction, digital product and UX roles. Its eight Work
projects, order and finite scrolling interaction remain unchanged. Work uses
16:9 banners, a bottom-left title, smaller names beside the images, a fully
positioned first cover, a three-second autoplay hold and hover pause. Wheel,
trackpad, keyboard and touch input work across the viewport; Work itself cannot
scroll down to the footer. These preferences are already implemented in main.

Preserve DM Sans, the warm paper background, vermilion accent, shared heading
scale and dark Contact/footer. No decorative annotations, captions, arrows,
subscripts, dots, em dashes or poetic copy. Original prototype imagery keeps
its actual typography and source content. Do not redraw the prototype in the
portfolio's visual language.

The case uses the existing Research, Insights, Concept, Design and Outcome
structure. The supplied 13-stage write-up is evidence, not a mandate to replace
the selected portfolio layout. Its overview, brief and problem precede the
five stages; definition/ideation inform Concept; testing, limitations and future
scope belong in Outcome. The personal learning draft is not published as Anuj's
own account.

## Source of truth

Both uploaded copies of `Swiggy-Agent-Desk-Handoff-2026-11-08.zip` have SHA-256:
`e1dbc72830d1903d12f16c601a141da0e47d37d011c9e0d8f914881b67662a2f`.
The second copy contains no changes. The complete archive is retained outside
Git in the task workspace. Only the selected public prototype, rulebook, process
images and new recordings belong in this branch.

The final visual/interaction reference is `05_final-prototype/app`, Agent Desk
v7.1, dated 7 November. Figma stops at 3 November. Original CSS, JavaScript and
photos are copied unchanged into `public/portfolio/swiggy/prototype`. Hosting
changes are limited to a standards-mode UTF-8 HTML wrapper and local copies of
the original Inter 400/500/600 fonts. `provenance.json` stores hashes and sources.

Public case: `/work/swiggy-agent-workflow`.
Explained local demo: `/work/swiggy-agent-workflow/prototype`.
Original standalone app: `/portfolio/swiggy/prototype/index.html`.

## Evidence and authorship

On 9 November the user confirmed Anuj's ownership and contribution: research,
originating the idea, design, decisions and base business logic within a
four-person group. Sukhmanpreet's and Akshat's names in the archive derive from
their Claude accounts and do not establish exclusive ownership. This author
clarification supersedes the earlier unresolved-credit inference. Write the
confirmed work in Anuj's voice, with a brief four-person group acknowledgement;
do not invent a task split or call group work solo. This question is resolved.
See `editorial-revision-2026-11-09.md` for the current case structure and checks.

One ten-minute call with an Amex expert is real but outside food delivery.
The supplemental interview is simulated. Personas and the mental model are
inferred. The customer audit included fabricated claims and contradictory
accounts of genuine claims. Report the ethical and evidential limitations;
do not generalise its small sample or repeat the method.

All prototype data/replies are fictional. Photos were generated with Figma AI.
Calls, refunds and reports are simulations. The concept is unaffiliated with
Swiggy. Do not conflate the user's live portfolio deployment with a real Swiggy
production integration.

## Reconciled conflicts

The 14–18 October decisions supersede frozen policy v1.3. P3 moves upstream;
P7/P8, including the earlier ₹500 approval limit, were deliberately removed.
The supplied evaluation's F4 asks to restore older rules and must remain
identified as a version disagreement. Do not restore them or present them as
actual Swiggy policy. Restaurant permission changes to tie-up refund terms.

Frozen scenario numbering conflicts with the final ticket set. The case uses
the real ticket IDs and issue types; it does not claim full frozen-scenario
coverage. The quality-complaint recording follows the evaluated deny path;
the separate report/flag action is not claimed to be in that recording.

Sixteen findings are recorded, not fixed: three major, nine minor and four
cosmetic. Claude performed the heuristic evaluation and also assisted in
prototype construction. There were no agent or peer test sessions. KLM
estimates exclude reading/waiting and do not prove improvement against a
baseline. The final interface still has coloured ratings and hidden policy
checks; do not claim every design principle is perfectly satisfied.

## Section reminder repair

The Meditimer section index sets `position:fixed`, but `.route-entry` previously
retained `translate:0` through animation fill `both`. This creates a containing
block: the index was marked visible while its actual rectangle was above the
viewport (observed at y=-2046 after scrolling to Insights). The entry animation
now uses backwards fill, returning to `translate:none` after entry and restoring
the viewport coordinate system. The shared sticky index is aligned to the
section-bottom inset and updates its active stage on scrolling, resizing,
hash navigation and story-size changes. It remains a native link list without
JavaScript; phone layouts use the existing compact or before-story navigation.

## Review boundary

This task authorizes a new branch, the Swiggy case/media and the missing stage
reminders. It does not authorize merging or production promotion. Do not change
the homepage, Work motion, other case stories or footer as side effects.
Preserve the existing URLs. The Swiggy cover replaces the old composition-only
placeholder with an actual prototype capture; the other seven covers stay as-is.


## Visual storytelling revision, 8 November

The user rejected the first PR draft as too textual and asked for growth from
three newly attached wireframes, graphs, deeper design reasoning, dynamic
text-guided close-up videos and a stronger thumbnail. This explicitly permits
explanatory video text and meaningful diagram labels in this case, superseding
the older no-caption preference for those requested explanatory artifacts.
Decorative annotations and unrelated portfolio changes remain out of scope.

The three HTML wireframes and separate policy draft are preserved verbatim in
`source-records/`. A four-version viewer compares the first wireframe, 14 October
second iteration, 15 October third iteration and 7 November v7.1. Sample data
changes; this is not a matched before/after performance study.

Structural evidence: the first file documents policy-row compaction from about
430 to 200 pixels, with roughly 20-pixel fallback-font uncertainty. Both states
are described in that first file; do not label them v1 versus v2. The v2 action
row has five buttons, while v3 moves Hold to the timer and retains four outcome
buttons. These are screen-structure facts, not a reduction in task time.

The separate policy draft 0.1 contains 12 public findings, 10 proposed terms,
24 operational proposals, 28 issue families, 16 open policy choices and 14
unexecuted acceptance specifications. Do not call those implemented features or
claim 80-percent coverage. It does not replace v7.1's current working rules.

Three new 19–27 second films use continuous prototype captures, actual pointer
movement, editorial camera pans/zooms and changing text. They are not another
user study. Text equivalents, native playback controls and GIF downloads remain
available; no film autoplays. The earlier complete five-ticket references stay
inside a disclosure. The cover is a 1600 by 900 composition of original screen
captures, using the existing ink/paper palette, not a redrawn interface.

## Editorial refinement, 9 November

The user authorized refining Meditimer app and Swiggy on this branch and pushing
here. This does not authorize merging. The portfolio editorial skill is included
and registered in AGENTS.md. Its initial Swiggy assessment predates this branch;
the source records here supersede that developing-project description.

Swiggy now follows SW-2041 through its original evidence, party-contact and
decision films, with an original workspace capture and explicit known/unknown
information. Public policy and actual research inputs precede optional draft
counts. The missing transcript remains an unresolved finding. Prototype files,
media, credits and findings are unchanged. Individual contribution still needs
confirmation; PR #4 remains a draft.

Meditimer now distinguishes the survey's overlapping response paths, original
role examples and proposed dose-status comparison. The original caregiver
screen's Missed wording is explicitly identified as a limitation. The paired
screens use different sample people and are not presented as synchronized data.
Setup explanations describe the actual fields and the existing device imagery
and scene composition are preserved. The dose-status change is announced to
assistive technology. No health or deployed synchronization outcome is claimed.

Validation for this refinement: production build, ESLint, TypeScript and Git
whitespace checks passed. Both existing browser suites passed across five
viewport widths. Meditimer checked 50 image proportions plus controls, dialogs,
navigation and native image access. Swiggy checked all media, prototype source
hashes, keyboard iteration controls, stage navigation and no-JavaScript access.
Neither suite recorded runtime errors. Screenshots and JSON reports are retained
outside Git in `/workspace/editorial-medicine-review` and
`/workspace/editorial-swiggy-review`.
