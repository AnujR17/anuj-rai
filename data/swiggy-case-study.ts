import type { Project } from "./case-study";

export const swiggyProject: Project = {
  slug: "swiggy-agent-workflow",
  title: "Swiggy agent workflow",
  headline: "Investigating a refund while the conversation stays live",
  summary: "A customer says the wrong dish arrived. The support agent has to check the order, inspect the photos and hear from the restaurant while keeping the conversation going. Agent Desk brings that investigation into one workspace.",
  brief: "Design the workspace an agent uses after a bot hands over an order complaint, from the first message through investigation, a decision and closure.",
  problem: "A photo, a delivery record and a restaurant’s account can tell different stories. The agent needs to compare them, find the relevant policy and explain what happens next. The prototype explores that task across five fictional complaints.",
  contribution: "Research, concept, interaction and visual design, design decisions and the underlying business logic. Developed with a four-person group.",
  image: { src: "/portfolio/swiggy/cover.png", alt: "Agent Desk cover composed from the original workspace and a close-up of its evidence viewer", width: 1600, height: 900, caption: "Original interface captures composed with scripts/render-swiggy-assets.mjs. Fictional ticket data; evidence photos generated with Figma AI." },
  live: "/work/swiggy-agent-workflow/prototype",
  liveLabel: "Try the five-ticket prototype",
  source: "https://www.figma.com/design/GzgfjrlKX8fQURtcMgAYfN",
  resources: [{ label: "Design Rulebook v7.1", href: "/portfolio/swiggy/design-rulebook-v7.1.pdf" }],
  stages: {
    research: [{ title: "Designing from public evidence", paragraphs: ["The research combines public policy, a single ten-minute call with a customer-service expert outside food delivery, and a separately labelled simulated interview. There was no access to Swiggy agents, internal policies or real case data."] }],
    insights: [{ title: "Make the evidence visible", paragraphs: ["Policy conditions, recorded facts and decision support need different roles. Party history supplies context, not a score. Missing evidence must remain visible rather than becoming an accusation."] }],
    concept: [{ title: "Support the decision, never make it", paragraphs: ["A three-column workspace keeps the case, conversation and insights distinct. Fault and outcome stay unselected until the agent acts. Published rules, borrowed rules and project assumptions remain distinguishable."] }],
    design: [{ title: "From handover to a recorded decision", paragraphs: ["Five scripted tickets support evidence review, party contact, policy checks, decision messages, confirmation and closure. The coded Agent Desk v7.1 prototype is the final visual reference; Figma stops before the 4–7 November review changes."] }],
    outcome: [{ title: "What the walkthrough established", paragraphs: ["A Claude-led heuristic evaluation recorded 16 findings, including three major problems. It was not a user test. Action counts and Keystroke-Level Model estimates do not establish faster decisions, and the findings remain unresolved."] }],
  },
  note: "Independent concept, unaffiliated with Swiggy. Anuj Rai: research, concept, design, decisions and business logic, developed with a four-person group including Sukhmanpreet Singh Saini and Akshat. Claude assisted prototype construction and performed the documented heuristic evaluation. Ticket data and replies are fictional; evidence photos were generated with Figma AI.",
};

export const swiggyScenarios = [
  { id: "wrong-item", ticket: "SW-2041", title: "Wrong item", focus: "Review two customer photos and contact the restaurant before choosing a full refund.", actions: 21, estimate: 41 },
  { id: "missing-item", ticket: "SW-2070", title: "Missing item", focus: "Investigate a missing part of a combo. The walkthrough exposes the partial-refund control’s inability to refund only part of an item.", actions: 20, estimate: 38 },
  { id: "not-delivered", ticket: "SW-2063", title: "Not delivered", focus: "Inspect conflicting customer and delivery records without photo evidence, then send the case to review.", actions: 17, estimate: 32 },
  { id: "quality-complaint", ticket: "SW-2091", title: "Quality complaint", focus: "Check a cash-on-delivery complaint, record the decision and complete the scripted closing exchange. Reporting is a separate agent action.", actions: 17, estimate: 33 },
  { id: "late-delivery", ticket: "SW-2078", title: "Late delivery", focus: "Inspect the trip log and contact the rider before a partial refund with an agent-entered ₹50 coupon.", actions: 21, estimate: 42 },
] as const;

export const swiggyFindings = [
  ["F1", "Major", "Partial refunds use the full price of selected items; there is no part-item amount field.", "Add an empty amount field, capped by the selected items. Do not suggest an amount."],
  ["F2", "Major", "The decision draft exceeds the single-line reply box.", "Let the box grow so the agent can review the entire draft before sending."],
  ["F3", "Major", "Collapsed policy checks hide unmet conditions and review triggers.", "Keep unmet and unknown rows visible without another click."],
  ["F4", "Minor, disputed", "The evaluation flags missing claim-window and approval-limit rules from an older policy version.", "Reconcile versions first: the 14–17 October decisions intentionally moved P3 upstream and removed P7/P8. Do not restore a ₹500 threshold as a real Swiggy rule."],
  ["F5", "Minor", "Queue priority marks have no stated rule.", "Define and expose the basis for priority, or remove the mark."],
  ["F6", "Minor", "Coloured rider and restaurant ratings can imply a judgement.", "Use neutral ink and examine whether ratings belong in a case decision at all."],
  ["F7", "Minor", "The AI handover summary cannot be traced to an openable bot transcript.", "Make the underlying conversation accessible."],
  ["F8", "Minor", "Party-history counts use different orders and omit their time window.", "Use the same count format and an explicit period for all three parties."],
  ["F9", "Minor", "The gap between complaint and photo submission requires calculation.", "State the elapsed time as a neutral fact."],
  ["F10", "Minor", "The cost split appears only after an action is chosen.", "Make the working liability basis visible during investigation."],
  ["F11", "Minor", "Conflicting records remain in different tabs.", "Bring both records into a single comparison without suggesting fault."],
  ["F12", "Minor", "The total delivery delay must be assembled from trip steps.", "State the difference between promised and actual delivery time."],
  ["F13", "Cosmetic", "Delay colours use hypothetical planned times that are not shown.", "Expose the reference time and use neutral presentation."],
  ["F14", "Cosmetic", "The cost line contains internal policy-version wording.", "Replace it with plain wording that still identifies a working assumption."],
  ["F15", "Cosmetic", "History counts repeat in two columns.", "Keep one source of the summary."],
  ["F16", "Cosmetic", "The absence of photo evidence is explained only in a tooltip.", "Write ‘No photo’ directly in the evidence area."],
] as const;
