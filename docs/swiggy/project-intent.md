# Swiggy Agent Desk: author-confirmed intent

Confirmed by Anuj in this chat on 9 November 2026. This is the project purpose to
preserve during editorial work; a recorded demonstration is only one example.

Agent Desk is a chat interface and dashboard for Swiggy's customer-support
agents. It supports the judgement needed when bot-led support cannot resolve a
case. Its primary aim is to help trained agents make better-informed decisions.
Quicker handling is a possible benefit, through easier navigation and less work
finding and connecting information.

Fraud assessment is part of that purpose. Agents need to assess potentially
misleading or fraudulent refund claims alongside genuine service failures. The
workspace should make relevant evidence, contradictions, policies and party
records easier to examine, without choosing an outcome on the agent's behalf.

Five extensive scenarios explore how conversations and investigations can move
in different directions as evidence is interpreted, parties respond and the
agent decides what to investigate or do next. They should not be written as five
prescribed outcomes or as a single happy path. The system is intended as the
agent's companion, with autonomy retained by the agent.

## Intent, present implementation and evaluation

- The intended exploration is open-ended. The current prototype implements
  limited scripted branches and agent-selected actions. It does not provide an
  unrestricted conversation engine or a fraud classifier.
- The wrong-item demo includes agreement/disagreement on photos, corresponding
  scripted restaurant responses and freely chosen outcomes. Its branch logic
  is a scenario mechanism, not a model of how real restaurants would respond.
- No internal Swiggy agent-workflow or performance dataset is available. Do not
  invent today's interface, research findings or a before/after improvement.
- Predicted effects can be explained through mechanisms: fewer lookups,
  connected context and earlier recognition of gaps or contradictions. Keep
  those as hypotheses, distinct from observed or measured results.
- A future comparison against separately presented synthetic records could test
  the value of bringing information together. It would be an experimental study
  condition, not a representation of Swiggy's actual current practice.
- Evaluate possible speed gains alongside investigation completeness, reasons
  recorded, handling of misleading claims, false suspicion of genuine claims
  and rework. Neither fast closure nor a denial alone demonstrates good fraud
  assessment.

Contribution and group acknowledgement remain as confirmed in
`case-study-context.md`; no new attribution question is created by this note.
