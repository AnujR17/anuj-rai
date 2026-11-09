import type { Project } from "./case-study";

export const swiggyProject: Project = {
  slug: "swiggy-agent-workflow",
  title: "Swiggy agent workflow",
  headline: "A companion to the support agent’s judgement",
  summary: "Agent Desk is a chat interface and dashboard for Swiggy’s customer-support agents. I designed it to help them investigate complaints, assess possible fraud and make informed decisions when a conversation needs human judgement.",
  brief: "Bring the conversation, order, evidence, party records and relevant policy into one workspace. Help a trained agent make better decisions, with less searching and quicker handling where possible.",
  problem: "A customer’s claim, a photo and a delivery record can disagree. The agent has to distinguish genuine service failures from possible abuse while keeping the conversation moving. I explored that judgement through five scenarios with different evidence, responses and possible decisions.",
  contribution: "Research, concept, interaction and visual design, design decisions and the underlying business logic. Developed with a four-person group.",
  image: { src: "/portfolio/swiggy/cover.png", alt: "Agent Desk cover composed from the original workspace and a close-up of its evidence viewer", width: 1600, height: 900, caption: "Original interface captures composed with scripts/render-swiggy-assets.mjs. Fictional ticket data; evidence photos generated with Figma AI." },
  live: "/work/swiggy-agent-workflow/prototype",
  liveLabel: "Try the five-ticket prototype",
  source: "https://www.figma.com/design/GzgfjrlKX8fQURtcMgAYfN",
  resources: [{ label: "Design Rulebook v7.1", href: "/portfolio/swiggy/design-rulebook-v7.1.pdf" }],
  stages: {
    research: [{ title: "Designing from public evidence", paragraphs: ["The research combines public policy, a single ten-minute call with a customer-service expert outside food delivery, and a separately labelled simulated interview. There was no access to Swiggy agents, internal policies or real case data."] }],
    insights: [{ title: "Make the evidence visible", paragraphs: ["Policy conditions, recorded facts and decision support need different roles. Party history supplies context, not a score. Missing evidence must remain visible rather than becoming an accusation."] }],
    concept: [{ title: "The agent keeps the judgement", paragraphs: ["The workspace connects case records, live conversation and policy checks. The agent can question evidence, contact the parties, revise a check and choose a remedy or further review. Possible fraud is an investigation question; the interface does not label a claim fraudulent."] }],
    design: [{ title: "Five investigations with alternative directions", paragraphs: ["Five scenarios explore different complaints and uncertainties. The prototype contains scripted conversation branches and agent-selected outcomes; it is not an unrestricted conversation engine. Agent Desk v7.1 is the final visual reference; Figma stops before the 4–7 November review changes."] }],
    outcome: [{ title: "What the walkthrough established", paragraphs: ["A Claude-led heuristic evaluation recorded 16 findings, including three major problems. It was not a user test. Action counts and Keystroke-Level Model estimates do not establish faster decisions, and the findings remain unresolved."] }],
  },
  note: "Independent concept, unaffiliated with Swiggy. Anuj Rai: research, concept, design, decisions and business logic, developed with a four-person group including Sukhmanpreet Singh Saini and Akshat. Claude assisted prototype construction and performed the documented heuristic evaluation. Ticket data and replies are fictional; evidence photos were generated with Figma AI.",
};

export const swiggyScenarios = [
  { id: "wrong-item", ticket: "SW-2041", title: "Wrong item", question: "Do the photos show a different dish, and does the restaurant’s account support that?", check: "Two photos, their origin and timing, the order and the restaurant’s response.", alternatives: "The scripted branches include an admitted bag swap, a restaurant denial and photos the agent disagrees with. The agent still chooses the remedy or review.", focus: "This recording follows photo review and restaurant contact through a full refund. It demonstrates one route through the case.", actions: 21, estimate: 41 },
  { id: "missing-item", ticket: "SW-2070", title: "Missing item", question: "Was part of the combo left out, and what would a proportionate refund cover?", check: "The compartment photo, the sealed-bag account, packing records and restaurant clarification.", alternatives: "The restaurant can acknowledge the missing vadas or maintain that the combo was packed in full. The agent weighs those accounts before deciding.", focus: "This recording follows a partial refund and exposes the control’s inability to refund only part of a combo.", actions: 20, estimate: 38 },
  { id: "not-delivered", ticket: "SW-2063", title: "Not delivered", question: "Does marked delivered mean the order reached the person or place the customer requested?", check: "Delivery instructions, location and status records, the customer’s account and the rider’s account.", alternatives: "Rider-chat branches distinguish a bag left outside from a handover to security following the delivery note. The agent can choose a remedy or send conflicting records for review.", focus: "This recording examines conflicting records without photo evidence and sends the case to review.", actions: 17, estimate: 32 },
  { id: "quality-complaint", ticket: "SW-2091", title: "Quality complaint", question: "What supports the food-quality complaint, and does conduct need a separate report?", check: "The submitted image, complaint timing, payment conditions and the conversation.", alternatives: "The agent can record a remedy decision and report conduct separately. Customer behaviour and whether a refund is supported are distinct questions.", focus: "This recording follows the evaluated denial and closing exchange. It does not demonstrate the separate report action.", actions: 17, estimate: 33 },
  { id: "late-delivery", ticket: "SW-2078", title: "Late delivery", question: "Where did the delay occur, what caused it and what remedy fits the complaint?", check: "Promised and actual times, trip events, the rider’s explanation and the customer’s report of cold food.", alternatives: "The scripted account describes traffic and a road closure. The agent chooses fault and an action; a late order does not automatically assign fault to the rider.", focus: "This recording follows trip review and rider contact through a partial refund with an agent-entered ₹50 coupon.", actions: 21, estimate: 42 },
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
