# Section emphasis and story discussion

16 November 2026. The author asked to use Meditimer's typography and green
section as a reference for one project-specific colour emphasis, then discuss
how Swiggy's opening leads through the sections.

## Applied visual trial

The inspected reference is `/work/medicine-app`, specifically its Dose records
section. At 1440px, it uses DM Sans at 17px/28.05px for prose, weight 450 for
headings, and a full-width #3d7653 surface around the dose-status comparison.
Its normal section headings are 50.4px; the highlighted heading is 57.6px.
These are observed rendering values, not research about reader preferences.

Swiggy previously used 18px/33.3px story prose and 46px weight-400 stage
headings. It now uses 17px/28.9px story prose and a responsive 32–54px,
weight-450 stage hierarchy. Existing paragraph measures, native line composition
and the compact hero remain in place. One final word group in Research is kept
together after the font-size change.

The Insights stage has one full-width vermilion surface using the existing
#cf3518 accent. Its paragraphs and original evidence/workspace composition
explain the central judgement problem. The refund-cost example returns to a
neutral surface. The reading column and bottom-left index keep their positions;
individual index rows change contrast as the accent passes behind them. Other
cases retain their default navigation behaviour.

The reference transfer is the use of a continuous surface to emphasize a
consequential idea and its artifact. In Swiggy, the relevant original material
is the evidence viewer, party records and the documented rejection of an
authenticity score. This is a stronger candidate for emphasis than an isolated
cost-allocation example. The trade-off is a long coloured section, especially
on phones. It is an art-direction trial, not a measured improvement in reading.
Acceptance checks cover one accent, text/index contrast at section boundaries,
responsive overflow, typography and source access.

The production build, lint, TypeScript and whitespace checks pass. The case,
layer, vector and typography browser suites pass without runtime errors.
Typography checks all four versions and five scenarios at fourteen widths,
plus 320px and 390px without JavaScript, with no single-word paragraph endings.
Accent prose contrast is 4.75:1. Index rows retain at least 4.68:1 contrast at
twelve mixed-surface boundary positions. The complete hero remains inside the
first fold at eight viewport sizes. Desktop and phone renders were inspected;
screenshots remain outside Git under `/workspace/swiggy-accent-final`.

## Content proposal for discussion

The visual changes do not establish a new historical account. The opening and
section sequence below are proposed editorial revisions for the author to
discuss. In response to the opening question, the author confirmed that the
idea began with supporting faster agent decisions after a bot handover,
informed by secondary research on fake refund claims and ambiguous cases.
The agent should have the information and means to identify causes and draw
their own conclusions. No personal support incident is claimed.

Suggested opening:

> Agent Desk is a chat interface and dashboard for Swiggy's customer-support
> agents. I designed it to help agents investigate complaints and reach informed
> decisions faster when a bot cannot resolve the case. The workspace brings
> together the conversation, order records and relevant checks, giving the
> agent information to assess possible refund fraud, investigate conflicting
> accounts and decide how to respond.

This makes the task, object and judgement purpose clear before process. The
scope statement establishes the five fictional scenarios. Faster handling is
expressed as an aim, with an evaluation plan still needed.

| Part | Question it should answer | Existing material to use |
| --- | --- | --- |
| Opening | What did I design, for whom and why? | Workspace, concise purpose, contribution and concept status |
| Research | What makes a complaint hard to judge? | Secondary reports of refund abuse and evidence-quality problems, public refund terms, cross-platform guidance and the scoped expert call; separate assumed operating rules |
| Insights | What should an agent see before judging a claim? | Evidence source/time, party records, totals alongside history counts and the rejected authenticity score |
| Concept | How did those implications shape the workspace? | Information architecture, three-column arrangement, real version changes and Hold relocation |
| Design | How does a case develop as the agent investigates? | One wrong-item example across evidence, party contact and a reasoned response; other scenarios show different uncertainties |
| Outcome | What did the prototype reveal and what needs revision? | Partial-combo refund amount, truncated draft and hidden checks; sixteen open heuristic findings and proposed agent evaluation |

The current prose repeatedly qualifies evidence and uses abstract headings.
The next editorial pass should keep limitations where they affect a specific
claim, use headings that name the content, and connect each visual to the
decision it helps the reader inspect. Neither a new origin story nor measured
speed, fraud or decision-quality results are supported by the supplied record.
