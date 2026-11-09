import type { Project } from "./case-study";

export const swiggyProject: Project = {
  slug: "swiggy-agent-workflow",
  title: "Swiggy Agent Desk",
  headline: "A workspace for the decisions a bot hands over",
  summary: "Agent Desk is a chat interface and dashboard for Swiggy’s customer-support agents. Across five order disputes, I explored how the workspace could help them assess evidence, investigate possible fraud and reach a decision they can explain to the customer.",
  brief: "Help a trained support agent investigate order complaints and possible fraud while keeping control of the final decision.",
  problem: "When a customer, restaurant and rider give different accounts of an order, the agent needs to investigate the disagreement before choosing a remedy. Bringing those records into the conversation could reduce searching and support a better-informed decision.",
  contribution: "I developed the concept and business logic, researched support policies, and designed the dashboard and chat interactions.",
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
  { id: "wrong-item", setup: "Siddharth ordered kadai paneer and says he received malai kofta. His photos and the restaurant’s packing record give the agent two accounts to work through.", ticket: "SW-2041", title: "Wrong item", question: "Do the photos show a different dish, and does the restaurant’s account support that?", check: "Two photos, their origin and timing, the order and the restaurant’s response.", alternatives: "The restaurant can acknowledge a bag swap or dispute the complaint. The agent can question either account, choose a remedy or pass the disagreement on for review.", focus: "This recording follows photo review and restaurant contact through a full refund. It demonstrates one route through the case.", actions: 21, estimate: 41 },
  { id: "missing-item", setup: "Ananya says the vadas are missing from her combo. The bag arrived stapled shut, and the photo shows an empty compartment with oil stains.", ticket: "SW-2070", title: "Missing item", question: "Was part of the combo left out, and what would a proportionate refund cover?", check: "The compartment photo, the sealed-bag account, packing records and restaurant clarification.", alternatives: "A packing mistake and a disputed claim both remain possible within the scenario. The agent has to weigh the restaurant’s response against what the customer has supplied.", focus: "This recording follows a partial refund and exposes the control’s inability to refund only part of a combo.", actions: 20, estimate: 38 },
  { id: "not-delivered", setup: "Pooja’s order is marked delivered, but she has not received the food. The delivery note and the rider’s account become important to understanding where it went.", ticket: "SW-2063", title: "Not delivered", question: "Does marked delivered mean the order reached the person or place the customer requested?", check: "Delivery instructions, location and status records, the customer’s account and the rider’s account.", alternatives: "The rider-chat branches describe a bag left outside or a handover to security following the delivery note. Those are different situations to investigate, even though both began with the same delivery status.", focus: "This recording examines conflicting records without photo evidence and sends the case to review.", actions: 17, estimate: 32 },
  { id: "quality-complaint", setup: "A quality complaint arrives with limited visual evidence and a difficult conversation. The agent still has to assess the order while deciding whether conduct needs a separate report.", ticket: "SW-2091", title: "Quality complaint", question: "What supports the food-quality complaint, and does conduct need a separate report?", check: "The submitted image, complaint timing, payment conditions and the conversation.", alternatives: "Reporting behaviour and deciding the refund are separate actions. The scenario leaves both with the agent, rather than using the tone of the conversation to settle the complaint.", focus: "This recording follows the evaluated denial and closing exchange. It does not demonstrate the separate report action.", actions: 17, estimate: 33 },
  { id: "late-delivery", setup: "Karan’s food arrived 35 minutes late and cold. The rider describes heavy traffic and a road closure, including a call to warn the customer about the delay.", ticket: "SW-2078", title: "Late delivery", question: "Where did the delay occur, what caused it and what remedy fits the complaint?", check: "Promised and actual times, trip events, the rider’s explanation and the customer’s report of cold food.", alternatives: "The delay is established; responsibility and the remedy still need a decision. The late-delivery record does not automatically put the rider at fault.", focus: "This recording follows trip review and rider contact through a partial refund with an agent-entered ₹50 coupon.", actions: 21, estimate: 42 },
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
