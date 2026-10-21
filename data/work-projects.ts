import type { Project } from "./case-study";

// The eight projects in the final Work study. Supporting research keeps its URLs.
export const workProjectSlugs = [
  "medicine-app", "swiggy-agent-workflow", "two-wheeler-dashboard", "toki",
  "india-in-orbit", "gandhinagar-roundabouts", "medtimer", "myalumnus",
] as const;

export const additionalProjects: Project[] = [
  {
    slug: "swiggy-agent-workflow",
    title: "Swiggy agent workflow",
    headline: "Policy and evidence in a support decision",
    summary: "I’m developing a proposed support workspace that brings ticket information, relevant policies and available evidence into an agent’s decision process.",
    brief: "Explore a customer-support workspace through five or six support scenarios, including missing-item and wrong-item complaints.",
    problem: "An agent needs to relate a complaint to the information and policy available for that ticket. Missing evidence and unclear next steps need to remain visible while the agent decides what to do.",
    contribution: "Developing the scenarios, researching policy and preparing interface screens",
    stages: {
      research: [{ title: "Policy research", paragraphs: ["I’m examining support policies alongside the information an agent would need for different complaints. Missing-item and wrong-item tickets are two of the scenarios being developed.", "The work is still in development. The current material defines questions for the workspace; it does not represent observed agent behaviour or a completed research study."] }],
      insights: [{ title: "Information for a decision", paragraphs: ["The proposed workspace needs to distinguish what the customer reports, what the available evidence supports and what a policy permits. Keeping those separate gives the design a clearer basis for handling incomplete information."] }],
      concept: [{ title: "Ticket, evidence and policy", paragraphs: ["I’m bringing those three parts into one working view. The aim is to make the next action understandable without asking the agent to treat a suggestion as a confirmed answer."] }],
      design: [{ title: "Support scenarios", paragraphs: ["Five or six scenarios are being prepared to examine the interface. Each should show the ticket, the relevant information, what remains uncertain and the action available to the agent.", "The workspace shown in this portfolio is a composition study. Final application screens and their interaction states are still being developed."] }],
      outcome: [{ title: "Work in progress", paragraphs: ["The current output is a developing policy and scenario study. The next step is to complete the screens and walk through the support decisions with people familiar with the work.", "Faster decisions are a proposed benefit to evaluate. No reduction in handling time or improvement in support outcomes is claimed."] }],
    },
    note: "Independent design exploration, unaffiliated with Swiggy. Policy research and interface development are ongoing. The portfolio visual is a composition study, not a screenshot of a released support product.",
  },
  {
    slug: "myalumnus",
    title: "My Alumnus",
    headline: "Visitor information at the campus gate",
    summary: "My Alumnus gives a guard a record to check, a way to handle an uncertain visit and a decision the campus can review. My contribution covered decision-making, concept refinement, research and UI.",
    brief: "Develop a campus visitor-verification workflow with guard and admin views, including search, holds, entry decisions and exit tracking.",
    problem: "Recognition can depend on who is on duty. When a returning visitor is unfamiliar, the guard needs usable information at the gate and a clear next step if a host cannot confirm the visit.",
    contribution: "Decision-making, concept refinement, research and UI, collaborating with project owner Sukhmanpreet Singh Saini",
    image: { src: "/portfolio/myalumnus/guard-ipad.png", alt: "Original My Alumnus visitor record on iPad with fictional Sample University data", width: 1180, height: 820, caption: "Original final screen from the 9 October 2026 MyAlumnus handoff" },
    live: "https://myalumnus.vercel.app",
    liveLabel: "Open My Alumnus",
    source: "https://github.com/sukhman0402/myalumnus",
    stages: {
      research: [{ title: "The gate study", paragraphs: ["The supplied project research includes interviews with three alumni and one guard, one entry observed at the gate and an admin-office conversation. Alumni described explaining their connection again when guards changed.", "In the observed entry, an unanswered admin call was followed by confirmation from a professor. Other visitors interrupted the exchange; total waiting time was not measured. These are small qualitative inputs, with leading-question and reported-account limitations."] }],
      insights: [{ title: "Recognition across shifts", paragraphs: ["The initial idea was to digitise entry. The research sharpened that brief: a record is useful only if the guard can use it when deciding. Searchable names, photos, programmes and batches carry information across shifts.", "A hold also needs a contact, deadline and next step. Recording entry, exit and leaving before a decision gives the institution a more complete account than treating every unresolved visit as a denial."] }],
      concept: [{ title: "Host-first confirmation", paragraphs: ["The visitor gives their name rather than needing an alumnus-facing app or a prepared pass. The guard searches the institution’s record, checks it and acts. This depends on the institution keeping those records current.", "The current flow calls the host first, then escalates to an admin if confirmation fails or the campus time limit expires. A host can confirm an expected visit; a call alone cannot establish identity."] }],
      design: [{ title: "Guard and admin views", paragraphs: ["Search leads to a visitor record and an explicit Approve, Deny or Hold action. Duplicate names, close spellings and uncertain visits have their own paths. The guard and admin work from the same records so escalation carries its context.", "The guard’s Home shows people inside, expected visitors and holds. The admin sees the escalation queue and history. Decision labels accompany colour, while a large photo and prominent controls support the gate interaction."], figures: [
        { src: "/portfolio/myalumnus/guard-home.png", alt: "Original guard Home showing search, people inside and visitors on hold", width: 1280, height: 879, caption: "Original final screen with fictional sample data" },
        { src: "/portfolio/myalumnus/hold-host.png", alt: "Original hold workflow with host contact and escalation context", width: 1280, height: 1052, caption: "Original final screen with fictional sample data" },
      ] }],
      outcome: [{ title: "Testing and next steps", paragraphs: ["The collaboration produced a working guard and admin demo. In the supplied report, one working guard completed four of five tasks. One approval was not saved and showed no error. This is a specific qualitative finding, not a general success rate.", "The next version needs visible confirmation and error recovery for decisions, a corrected default hold reason and a clear photo-mismatch rule. A gate pilot with guards and admins remains future work; no campus-wide safety or queue improvement is claimed."] }],
    },
    note: "Collaboration with Sukhmanpreet Singh Saini, project owner. My contribution was decision-making, concept refinement, research and UI. Original screens and findings come from the 9 October 2026 handoff, with fictional Sample University data. Implementation of every feature is not attributed to me. The application may have changed since these captures.",
  },
];

export const caseHeadings: Record<string, string[][]> = {
  "medicine-app": [["Medicine routines"], ["Dose records"], ["App structure"], ["Medicine-taker view", "Caregiver view"], ["Prototype and next steps"]],
  "two-wheeler-dashboard": [["Dashboard research"], ["Information hierarchy"], ["Display layout"], ["Dashboard states", "Controls and feedback"], ["Prototype and next steps"]],
  medtimer: [["Field research"], ["Reminders and storage"], ["Product concept"], ["Physical model"], ["Model and next steps"]],
  toki: [["Device constraints"], ["Planning and completion"], ["App and device"], ["Task queue", "Physical controls"], ["Prototype and next steps"]],
  "india-in-orbit": [["Content research"], ["Reading and exploration"], ["Website structure"], ["Satellite information", "Implementation"], ["Website and next steps"]],
  "gandhinagar-roundabouts": [["Field research"], ["Traffic movement"], ["Communication concepts"], ["Poster concepts", "Feedback"], ["Findings and next steps"]],
  "medicine-storage-research": [["Survey responses"], ["Routines and preferences"], ["Reminder support"], ["Survey analysis"], ["Findings and next steps"]],
  "consumer-experience": [["Supplied dataset"], ["Store attributes"], ["Analysis approach"], ["Attribute comparison"], ["Findings and next steps"]],
  skidge: [["Graduate profiles"], ["Outcome measures"], ["Analysis approach"], ["Profile comparison"], ["Findings and next steps"]],
};
