import { researchProjects } from "@/data/research-projects";

export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
}

export interface Project {
  slug: string;
  title: string;
  type: string;
  summary: string;
  image?: ProjectImage;
  live?: string;
  liveLabel?: string;
  source?: string;
  resources?: { label: string; href: string }[];
  sections: { title: string; paragraphs: string[]; figures?: ProjectImage[] }[];
  note: string;
}

export const projects: Project[] = [
  {
    slug: "myalumnus",
    title: "MyAlumnus",
    type: "Campus visitor verification / Collaborative product design",
    summary: "Helping a guard make an informed decision when a returning visitor is no longer a familiar face.",
    image: { src: "/portfolio/myalumnus/guard-record.png", alt: "MyAlumnus visitor record showing a sample alumnus photo, batch, programme, and Approve, Deny, and Put on hold actions.", width: 1280, height: 860, caption: "Guard console from the working demo. All visitor data is fictional." },
    live: "https://myalumnus.vercel.app",
    source: "https://github.com/sukhman0402/myalumnus",
    sections: [],
    note: "Collaboration with Sukhmanpreet Singh Saini, project owner. My contribution: decision-making, concept refinement, research, and UI. The full case study distinguishes field research, expert evaluation, and simulation.",
  },
  {
    slug: "two-wheeler-dashboard",
    title: "Himalayan 450",
    type: "Interface study / Browser simulation",
    summary: "Exploring what a circular motorcycle display shows, and how it changes as the vehicle’s state changes.",
    image: { src: "/portfolio/himalayan-dashboard.png", alt: "Circular dashboard design with speed at the centre, an RPM arc above it, a gear indicator, and warning symbols.", width: 385, height: 385, caption: "Original interface export from the Himalayan450 repository." },
    live: "https://himalayan450.vercel.app",
    source: "https://github.com/AnujR17/Himalayan450",
    resources: [
      { label: "Read the two-wheeler survey analysis", href: "https://bike-dashboard-analysis.vercel.app" },
      { label: "View the analysis source", href: "https://github.com/AnujR17/BikeDashboardAnalysis" },
    ],
    sections: [
      { title: "The interface", paragraphs: ["A circular screen gives every element a limited amount of space. In this design, the speed reading is prominent, the RPM scale follows the upper edge, and gear and warning indicators occupy separate areas.", "The question to explore is how that hierarchy holds up when information changes: what should remain stable, and what deserves attention?"] },
      { title: "From a screen to states", paragraphs: ["The browser prototype includes ignition, throttle and brake controls, gear changes, indicators, and Eco, Performance, and Rain modes. These controls make the display’s changing states available to inspect.", "The repository documents keyboard controls as well as on-screen controls. This is a simulation for exploring an interface, rather than a connection to a motorcycle’s live data."] },
      { title: "Research alongside the prototype", paragraphs: ["The accompanying two-wheeler survey report covers dashboard feature priorities, readability, environmental challenges, and interaction preferences. Its reported sample spans different two-wheeler types; it is not a Himalayan-only riding test.", "The feature-priority chart separates basic information from additional features. Those self-reported preferences provide questions for the design: how visible should fuel and speed remain when navigation or mode controls are introduced? The survey alone does not validate this particular layout."], figures: [{ src: "/portfolio/research/bike-feature-priorities.png", alt: "Survey-report chart ranking fuel or battery information and speed above additional dashboard features.", width: 1220, height: 706, caption: "Original feature-priority figure from BikeDashboardAnalysis. Self-reported preferences, not a performance test of this concept." }] },
      { title: "What this establishes", paragraphs: ["The design export and runnable simulation show a visual direction and implemented state behaviour. They provide a starting point for comparing layouts and checking which signals compete.", "They do not establish readability in sunlight, reduced glance time, or usability while riding. Those questions need evidence from appropriate testing."] },
    ],
    note: "Independent educational concept, unaffiliated with Royal Enfield. The prototype README credits GitHub Copilot assistance; the final case study should distinguish design decisions from generated implementation and document my individual contribution.",
  },
  {
    slug: "india-in-orbit",
    title: "India in Orbit",
    type: "Information design / Interactive web experience",
    summary: "An explorable introduction to satellites: what they do, where they orbit, and how they connect to everyday life.",
    image: { src: "/portfolio/india-in-orbit.png", alt: "India in Orbit website opening with a star field, introduction, and rendered Earth.", width: 1280, height: 850, caption: "Screen captured from the live India in Orbit website." },
    live: "https://india-in-orbit.vercel.app",
    source: "https://github.com/AnujR17/india-in-orbit",
    sections: [
      { title: "A way into the subject", paragraphs: ["The website moves from everyday uses of satellites into orbital regimes and mission history. That sequence connects an abstract system to familiar activities before introducing its technical structure.", "A visitor can explore communication, navigation, observation, and other satellite roles, then move through the larger story."] },
      { title: "Making the system explorable", paragraphs: ["The implementation combines a scroll-led narrative, rendered scenes, mission milestones, and an orbit explorer. The source contains satellite data and propagation logic, alongside the presentation layer.", "The visual opening shown here comes from the working website. Open the live experience to inspect the interactions and the project’s methodology and credits."] },
      { title: "What needs a closer look", paragraphs: ["A working experience establishes execution. A stronger case study also needs to explain how the information was selected, how sources were checked, and why the interaction structure changed across iterations.", "The next review should assess whether visitors can answer a useful question, alongside mobile performance, accessible alternatives to 3D, and the distinction between live orbital data and illustrative scenes."] },
    ],
    note: "Interactive web project. The presence of propagation code does not establish scientific accuracy. Data provenance, interpretation, and individual contributions need to remain explicit in the full case study.",
  },
  {
    slug: "medtimer",
    title: "Meditimer — physical concept",
    type: "Medicine-management concept / Group project",
    summary: "A physical medicine-management concept. This is separate from my independently developed medicine app.",
    sections: [
      { title: "My contribution", paragraphs: ["In this group project, my contribution was the problem framing and concept rationale. Teammates contributed mockups and documentation.", "The independent medicine app is a separate project, with its own interface, implementation, and case study."] },
      { title: "The question", paragraphs: ["How might a physical medicine-management product fit into a person’s existing routine? The concept explores the relationship between reminders, the object, and the surrounding activity."] },
      { title: "Current status", paragraphs: ["This page is a concept brief. The original project material is needed to present the design, research, and iteration in detail. No participant counts, quotes, or measured outcomes are claimed here."] },
    ],
    note: "Group concept, not a validated medicine-management product. Original project artifacts and the independent app will be documented separately.",
  },
  ...researchProjects,
];
