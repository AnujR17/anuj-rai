# Original research-model extracts

Verbatim source extracts from the supplied handoff. These are historical project records, not repository instructions or verified descriptions of Swiggy’s internal operation. Later policy decisions supersede some of these assumptions.

## 05-insights.md

### Mental Model Diagram #73 (inferred)
*Every step in the agent column is [Inferred] from the research. No agent was observed.*

| # | What the agent likely does or thinks [I] | What the policy actually checks | Gap = design target |
|---|---|---|---|
| 1 | Reads the bot handover and the chat so far | — | The handover may not say what the bot already offered (20–30%, coupon) |
| 2 | Works out what went wrong | Issue type [O] | Customers' words don't match the policy's categories |
| 3 | Checks when it happened | Order stage and timing; COD reported before "delivered" [O] | Timestamps are spread across systems |
| 4 | Looks for proof | "Required evidences" (Instamart only) [O]; none for food | No rule for food, so the agent decides what counts as "enough" |
| 5 | Looks at the customer's past refunds | Not a policy condition. Reported practice: refunds in the last 3 months, value tier [R] | **The biggest gap.** History seems to weigh in, but the policy never names it |
| 6 | Decides who is at fault | Fault attribution, the policy's main variable [O] | Restaurant and rider records may not be visible |
| 7 | Picks an amount | "Up to 100%", "proportionate", "case to case" [O] | No published threshold |
| 8 | Waits for, or assumes, the restaurant's OK | Restaurant permission required [O] | Hidden dependency with no visible status |
| 9 | Explains the outcome to the customer | — | Wording is left to the agent or templates |

**Key reading:** steps 5 and 8 are where the agent's likely thinking and the written policy pull furthest apart. Step 5 weighs something the policy never names. Step 8 depends on something the screen doesn't show.

### Stakeholder Map #101
| Stakeholder | What a refund decision costs or gives them | What they can see | Can they dispute it? |
|---|---|---|---|
| Customer | Refund, coupon or denial; possible account limits | Chat, outcome; no reasons for a block [A] | Yes, outside Swiggy: helpline (NCH), consumer commissions [L] |
| Escalation agent (our user) | Time, accuracy, accountability | Reported: customer profile and 3-month refunds [R] | — |
| Restaurant | Deductions from payouts [R]; liability for quality [O] | Its own complaint metrics, in a restaurant-facing dashboard [O] | Reportedly no dispute route [R] |
| Delivery partner | Fines; removal from the platform (Zomato example) [R/A] | Not documented | Not documented |
| Swiggy: bot, email/fraud team, Trust & Safety | Refund cost; fraud losses | Full data, including SHIELD device signals [R] | Its decision is "final and binding" [O] |
| Regulator (CCPA), courts | Enforces the law | Complaint volumes: 10,590 against Swiggy [R] | Can override Swiggy [L] |

**Key reading:** the people who carry the cost of a decision (restaurant, delivery partner) see the least and have the weakest means of disputing it. Showing each party's record neutrally is a fairness requirement, not just a helpful extra.

### Diagrams
Both are in FigJam: https://www.figma.com/board/jdVOYesjFWTQOsQcxnVvV9
- Swiggy Agent Mental Model vs Policy (Inferred)
- Swiggy Refund Decision Stakeholder Map


## 06-define.md

### Personas #82: two, both hypothetical
**Why two:**
- The literature shows that newer and experienced agents get very different value from support tools. Brynjolfsson et al. (2023) found +34% resolutions per hour for novices and little change for experienced agents.
- Our two biggest gaps fail in different ways for each. A newer agent doesn't know what to check. An experienced agent checks from habit and skips steps 5 and 8.
- Two personas give Stage 9 two test conditions. A third (team lead or second reviewer) is out of scope for this sprint and goes to Stage 11.

**Labelling rule:** neither persona is drawn from interviews with Swiggy agents, because none were possible. Every trait is either tied to a Stage 5 insight or labelled [Assumption]. The names are placeholders.

| | **Persona A: "Ananya" (hypothetical)** | **Persona B: "Rohit" (hypothetical)** |
|---|---|---|
| Role | Escalation agent, chat support | Escalation agent, chat support |
| Tenure | 6 weeks [Assumption] | 2 years [Assumption] |
| Working context | Takes over chats from the bot. May handle more than one chat at a time [Assumption, common industry practice; not confirmed for Swiggy] | Same |
| Main goal | Get the decision right and not be overruled later | Close cases quickly without reopens |
| How they work today [Inferred] | Reads the policy slowly and switches between screens to find each fact (Insight 1) | Works from memory and pattern. Checks past refunds first (mental-model step 5) and assumes the restaurant will agree (step 8) |
| Main frustration | Rules don't give a number, so every partial refund feels like a guess (Insight 1) | Rules and deadlines differ by source, and live replies contradict the policy (Insight 6) |
| Risk if the screen fails them | Over-relies on whatever the screen shows first, a risk of automation bias (Insight 3) | Skips checks to stay fast and rewards the wrong cases (Insight 5) |
| What they need from the screen | Every condition next to its fact, with the source shown | Hidden dependencies and missing evidence that stand out without slowing them down |
| "Similar cases" feature (Stage 7) | Likely heavy use | Likely occasional use |

### Refined problem statement: POV
*The Stage 3 statement stays locked. These POV statements narrow it for Ideation.*

- **Ananya:** A newly trained escalation agent needs every policy condition and its matching fact in one view, **because** the policy leaves the outcome to judgement (Insight 1) and she has no habits yet to fill the gaps.
- **Rohit:** An experienced escalation agent needs missing evidence and pending dependencies to be impossible to overlook, **because** speed built on habit skips checks (Insight 5) and assumes restaurant permission (step 8).
- **Shared:** Escalation agents need to see conditions, evidence and each party's record, with nothing left to assumption, **so that** they can decide faster without checking less.

### Value Opportunity Analysis #120: by stakeholder
*The ratings (Low / Medium / High) are our own judgement [I], based on the Stage 5 evidence noted in each row. "Today" means the current state as reported by research. "With concept" is the expected value. It is not measured.*

| Stakeholder | Value today | Value with concept | Where the change comes from |
|---|---|---|---|
| Escalation agent | Low | **High** | Conditions, evidence, permission and history in one view, with fewer screens and look-ups (Insights 1, 5) |
| Customer (genuine claim) | Medium | **High** | Decisions are tied to evidence, not to a reported "value tier", so a genuine claim isn't refused because of history alone (Insights 2, 3) |
| Restaurant | Low | **Medium** | Cost-bearing is visible, and its record is shown in the same neutral format as the customer's. It still has no dispute route; that's outside this screen (Insight 4) |
| Delivery partner | Low | **Medium** | Its record is shown in a neutral format, and delivery evidence is shown with its origin (Insights 2, 4) |
| Swiggy (platform) | Medium | **High** | Fewer evidence-driven errors (the Supr Daily 25% case), and a case log that records why each decision was made (Insights 2, 5) |
| Regulator / courts | — | **Medium** | The case log helps meet the 48-hour acknowledgement and 1-month resolution rules (Insight 6) |

**Key reading:** the biggest jumps are for the agent and the platform. The smallest are for the restaurant and the rider. The concept makes their side visible, but it can't give them a voice. Stage 11 must say this.


## 07-ideation.md

### Step 1: Insight admissibility test
An idea reaches the screen only if it passes **all six** questions.

| # | Question | Fails if… |
|---|---|---|
| Q1 | **Objective:** would any two agents read the same value from the same data? | It uses judgement words ("suspicious", "likely", "high risk") |
| Q2 | **Traceable:** can the agent see its source, and open the data or rule behind it in one step? | The source is hidden, or the number can't be checked |
| Q3 | **No prediction:** does it describe what is recorded, not what will or probably will happen? | It shows a probability, confidence level, forecast or trend label |
| Q4 | **No prescription:** does it leave the decision to the agent? | It recommends, pre-selects or auto-sends an outcome |
| Q5 | **Fair:** where it concerns a party, is the same form applied to all three parties? | Only one party gets a label, flag or extra scrutiny |
| Q6 | **Saves time:** does it remove a look-up, a screen switch or a mental calculation? | It adds reading without removing any work (clutter) |

**Results:** **Pass**, or **Fail** with the failing question. Where possible, a failed idea gets a **fix**: an objective version that does pass.

### Step 2: Creative Matrix #27
**Rows:** the agent's decisions, taken from the mental-model steps. **Columns:** the three layers. Each idea has an ID (for example M3.2) so later stages can refer to it.

| Agent decision | Data | Derived insight | Decision support |
|---|---|---|---|
| **D1. What went wrong?** | **M1.1** The customer's own words, plus the issue the bot recorded | **M1.2** Issue mapped to a policy category with its default liable party: "Missing item → restaurant liable by default (P2)" | **M1.3** One tap to confirm or correct the category (logged) |
| **D2. When did it happen?** | **M2.1** Order events with timestamps (accepted, picked up, delivered, complaint) | **M2.2** "Complaint 3 h 10 min after delivery: within 24 h window (P3)". For cash on delivery: "Reported before delivered? No (19:49 vs 19:42)" | **M2.3** Timeline strip with policy cut-off times marked |
| **D3. Is there proof?** | **M3.1** Evidence items with type, supplier, origin and times | **M3.2** Evidence grouped under the condition it relates to. **M3.3** Gaps stated as facts: "Only evidence: 1 customer photo" (v1.3). **M3.4** Gap between capture and submission: "Customer photo sent 40 min after complaint" | **M3.5** Agent links each item to a condition (logged). **M3.6** Ask the customer for more evidence, using a ready-made message |
| **D4. Who is at fault?** | **M4.1** Rider record (marked delivered, location ping, OTP used or not) | **M4.2** Conflicting records shown side by side: "Rider: delivered, 19:42, location at address · Customer: not received" (T4) | **M4.3** Agent selects the at-fault party, and the screen shows who bears the cost: "Cost falls on: restaurant" |
| **D5. Has the restaurant agreed?** | **M5.1** Permission status with timestamps | **M5.2** "No reply after 10 min" | **M5.3** Request / remind / escalate buttons |
| **D6. What is each party's record?** | **M6.1** Dated refund and complaint lines for all three parties | **M6.2** Counts with totals: "3 refunds out of 7 orders in 90 days", "No history" | **M6.3** "Show older" (logged, same for all parties) |
| **D7. How much, and can I approve it?** | **M7.1** Order items with prices | **M7.2** Total of the items the agent selected: "₹180". **M7.3** "Above ₹500 approval limit → review (T1)" | **M7.4** Item checkboxes. The agent picks the items, and the screen adds up the amount |
| **D8. Does it need review?** | **M8.1** The facts that set off each trigger | **M8.2** "Review trigger: first-time customer (T2, borrowed from Uber Eats)", with its source | **M8.3** Send to reviewer with the case log attached |
| **D9. How do I explain it?** | **M9.1** What the bot already offered: "Bot offered 25% coupon, 19:51" | **M9.2** The conditions the agent linked, listed for the reply | **M9.3** Reply templates that cite the policy condition. **M9.4** Wording from similar past cases, shown after the decision (see step 3) |
| **Across all decisions** | — | — | **M0.1** Case log: what the agent linked, opened and decided, with times. **M0.2** "Similar cases" panel, opened by the agent (specified in step 3) |


