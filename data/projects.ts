export interface Project {
  slug: string;
  title: string;
  summary: string;
  type: string;
  year: string;
  roles: {
    led: string[];
    contributed: string[];
    team: string[];
  };
  overview: string;
  problem: string;
  context: string;
  research: string;
  insights: string[];
  designDecisions: string[];
  iterations: string;
  solution: string;
  outcome: string;
  reflection: string;
  accentColor: string;
}

export const projects: Project[] = [
  {
    slug: "royal-enfield-himalayan",
    title: "Royal Enfield Himalayan Dashboard",
    summary: "Designing the digital experience for an adventure motorcycle.",
    type: "Digital Product Design",
    year: "2024",
    roles: {
      led: ["UX Architecture", "Interaction Design"],
      contributed: ["User Research", "Prototyping"],
      team: ["Industrial Design Team", "Engineering"],
    },
    overview: "[Placeholder] A comprehensive overview of the digital dashboard design for the new Royal Enfield Himalayan...",
    problem: "[Placeholder] Adventure riders need critical information at a glance without losing focus on treacherous terrain.",
    context: "[Placeholder] The motorcycle industry is shifting towards connected digital clusters...",
    research: "[Placeholder] Conducted field studies with 40+ adventure riders in Spiti Valley...",
    insights: [
      "Glare visibility is the #1 pain point.",
      "Riders prefer physical controls over touch for safety.",
    ],
    designDecisions: [
      "High-contrast day/night mode UI.",
      "Joystick-navigable interface.",
    ],
    iterations: "[Placeholder] 3 major iterations focusing on information density vs readability...",
    solution: "[Placeholder] A circular digital cluster featuring turn-by-turn navigation and vital stats...",
    outcome: "[Placeholder] Deployed to production, receiving positive reviews for legibility.",
    reflection: "[Placeholder] Designing for extreme environments requires prioritizing legibility over aesthetics.",
    accentColor: "bg-zinc-800 text-zinc-100",
  }
];

const otherProjectTitles = [
  "Intelligent Waste Disposal System",
  "India in Orbit",
  "Meditimer App",
  "Meditimer Product Strategy",
];

otherProjectTitles.forEach((title) => {
  const slug = title.toLowerCase().replace(/\s+/g, '-');
  projects.push({
    slug,
    title,
    summary: "A brief summary of this placeholder project exploring complex systems.",
    type: "Case Study",
    year: "2023",
    roles: {
      led: ["Role 1"],
      contributed: ["Role 2"],
      team: ["Team members"],
    },
    overview: "[Placeholder] An overview of the project and its goals.",
    problem: "[Placeholder] The core problem that needed solving.",
    context: "[Placeholder] The background and constraints.",
    research: "[Placeholder] Methods and findings.",
    insights: ["[Placeholder] Insight 1", "[Placeholder] Insight 2"],
    designDecisions: ["[Placeholder] Decision 1", "[Placeholder] Decision 2"],
    iterations: "[Placeholder] The process of refining the design.",
    solution: "[Placeholder] The final proposed solution.",
    outcome: "[Placeholder] Results and metrics.",
    reflection: "[Placeholder] Lessons learned.",
    accentColor: "bg-zinc-900 text-zinc-300",
  });
});
