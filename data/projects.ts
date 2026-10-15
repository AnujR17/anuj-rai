import { researchProjects } from "@/data/research-projects";

export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
}

export type CaseVisual = "message-tradeoff" | "orbit-path" | "medicine-signals" | "contributions" | "retail-hypothesis" | "score-definition";

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
  overview: { role: string; scope: string; status: string };
  takeaway: string;
  sections: { title: string; paragraphs: string[]; figures?: ProjectImage[]; visual?: CaseVisual }[];
  methods?: string[];
  conclusion: { result: string; next: string };
  note: string;
}

export const projects: Project[] = [
  {
    slug: "two-wheeler-dashboard",
    title: "Himalayan 450",
    type: "Interface study / Browser simulation",
    summary: "What stays visible when a motorcycle display changes state? A circular interface explored through a working browser simulation.",
    overview: {
      role: "Interface exploration and browser prototyping, with GitHub Copilot assistance.",
      scope: "Circular display, information hierarchy, and simulated vehicle states.",
      status: "Educational concept · Runnable simulation",
    },
    takeaway: "A screen is only one moment. The useful design question is what happens when speed, gear, mode, and warnings compete for attention.",
    image: { src: "/portfolio/himalayan-dashboard.png", alt: "Circular dashboard export: central speed reading, RPM arc, gear at the right, fuel at the left, and warning symbols below.", width: 385, height: 385, caption: "Original interface export. The displayed values are illustrative, not live vehicle data." },
    live: "https://himalayan450.vercel.app",
    source: "https://github.com/AnujR17/Himalayan450",
    resources: [
      { label: "Two-wheeler survey analysis", href: "https://bike-dashboard-analysis.vercel.app" },
      { label: "Survey analysis source", href: "https://github.com/AnujR17/BikeDashboardAnalysis" },
    ],
    sections: [
      {
        title: "One circle, several competing signals",
        paragraphs: [
          "The circular boundary narrows the usable space at the edges. The export gives speed the largest type, places RPM around the upper arc, and separates gear, fuel, and warning symbols into smaller regions.",
          "This arrangement creates a clear starting point for inspection: the central reading stays prominent, while supporting information shares the perimeter. The tradeoff is how much attention remains for a warning when several signals appear together.",
        ],
      },
      {
        title: "Make the state change inspectable",
        paragraphs: [
          "The browser prototype extends the screen into ignition, throttle, brake, gear, indicator, and riding-mode states. On-screen and keyboard controls let a viewer change those inputs and inspect the response.",
          "That turns a static layout into something concrete to examine. A useful walkthrough is to switch the ignition on, change a gear, and toggle an indicator: which information moves, and which remains easy to locate? The simulation demonstrates interface behaviour; it is not connected to a motorcycle.",
        ],
      },
      {
        title: "Use research to question the layout",
        paragraphs: [
          "The accompanying survey report ranks basic information such as fuel and speed above additional features. It provides a useful tension for this concept: new navigation or mode controls must still leave those basics easy to find.",
          "The report covers a mixed two-wheeler sample. Its self-reported preferences are context for discussion, rather than a performance evaluation of this circular layout.",
        ],
        figures: [{ src: "/portfolio/research/bike-feature-priorities.png", alt: "Survey-report ranking showing fuel or battery information and speed above additional dashboard features.", width: 1220, height: 706, caption: "Original feature-priority chart from BikeDashboardAnalysis. Preferences reported by the survey sample." }],
      },
    ],
    methods: [
      "Materials: the original dashboard export, the Himalayan450 browser prototype, its documented controls, and the separate two-wheeler survey presentation.",
      "The survey describes 194 respondents across two-wheeler types. It does not establish readability, glance time, or on-bike usability for this concept.",
    ],
    conclusion: {
      result: "A visual hierarchy and a runnable simulation that make changing display states available to inspect.",
      next: "Compare competing warning and navigation states, then evaluate legibility under controlled conditions before drawing conclusions about use while riding.",
    },
    note: "Independent educational concept, unaffiliated with Royal Enfield. Based on the Himalayan 450 display reference; the repository credits GitHub Copilot assistance with implementation.",
  },
  {
    slug: "india-in-orbit",
    title: "India in Orbit",
    type: "Information design / Interactive web experience",
    summary: "Giving an invisible system a way in: from familiar satellite uses to missions, orbital regimes, and an interactive explorer.",
    overview: {
      role: "Design and web development. Guidance credited to Dr. Anupam Rana.",
      scope: "Narrative structure, rendered scenes, mission history, and orbit exploration.",
      status: "Interactive website · Available to explore",
    },
    takeaway: "Everyday uses give the subject a familiar starting point. The explorer then gives visitors a way to investigate its structure.",
    image: { src: "/portfolio/india-in-orbit.png", alt: "India in Orbit opening: a star field, an introduction to India's space programme, and a rendered Earth.", width: 1280, height: 850, caption: "Capture of the working website’s opening. Rendered imagery introduces the subject." },
    live: "https://india-in-orbit.vercel.app",
    liveLabel: "Explore the website",
    source: "https://github.com/AnujR17/india-in-orbit",
    sections: [
      {
        title: "Start with a reason to care",
        paragraphs: [
          "Satellites can feel remote until their everyday roles become visible. The site connects the subject to communication, navigation, and observation before introducing orbital regimes and mission history.",
          "The sequence gives readers context before asking them to interpret a technical system. A familiar use becomes an entry point into the larger story.",
        ],
        visual: "orbit-path",
      },
      {
        title: "Offer a story and a place to explore",
        paragraphs: [
          "The scroll-led narrative provides an order through the material. Mission milestones and the orbit explorer offer a different kind of engagement: looking across the system and following a question.",
          "Combining these modes makes the experience broader than a single visualization. It also creates a design responsibility: visitors need to understand what each view represents, and how it connects to the story they have just read.",
        ],
      },
      {
        title: "Make the representation accountable",
        paragraphs: [
          "The implementation brings together rendered scenes, satellite data, and propagation logic. These serve different purposes: an introductory scene can explain an idea, while a data-driven view makes claims that depend on its inputs and timing.",
          "The project’s methodology and credits belong alongside the experience. The presence of a working visualization alone does not establish scientific accuracy or prove that visitors understand it.",
        ],
      },
    ],
    methods: ["This case describes the implemented narrative, mission material, and explorer. It does not report a visitor study or measured learning outcomes. Data provenance and scene interpretation should be assessed through the live project’s methodology and source."],
    conclusion: {
      result: "A working web experience that combines an introductory narrative with mission history and open exploration.",
      next: "Ask visitors to explain the relationship between a satellite’s use and its orbit; use the difficulties they encounter to evaluate navigation, explanations, and accessible alternatives to rendered scenes.",
    },
    note: "Design and development credited to Anuj Rai, with guidance from Dr. Anupam Rana. Refer to the project’s source and methodology for implementation and data credits.",
  },
  {
    slug: "medtimer",
    title: "Meditimer — physical concept",
    type: "Medicine-management concept / Group project",
    summary: "How could a physical medicine-management product fit a person’s existing routine? A group concept focused on the relationship between an object, a reminder, and daily activity.",
    overview: {
      role: "Problem framing and concept rationale. Teammates contributed mockups and documentation.",
      scope: "Physical medicine-management concept; separate from the independent medicine app.",
      status: "Concept brief · Group work",
    },
    takeaway: "A reminder is part of a larger routine. The design question includes the medicine’s location and what the person is doing when the prompt arrives.",
    sections: [
      {
        title: "Frame the situation around the object",
        paragraphs: [
          "The concept asks how reminder behaviour and physical medicine storage could work together. Considering the object and its surroundings keeps the question connected to daily activity rather than treating the alert as the whole interaction.",
          "This is a framing question for a physical product. It does not establish that a particular schedule, reminder style, or storage format improves medication adherence.",
        ],
      },
      {
        title: "Make the contribution clear",
        paragraphs: [
          "My contribution was the problem framing and rationale for the concept. Teammates created mockups and documentation. Those are distinct contributions within the same group project.",
          "The independently developed medicine app is a separate piece of work. Its interface and implementation are not represented by this concept brief or by the medicine-survey analysis.",
        ],
        visual: "contributions",
      },
    ],
    resources: [{ label: "Explore the separate medicine survey", href: "/work/medicine-storage-research" }],
    conclusion: {
      result: "A problem frame and concept rationale for a physical medicine-management product, developed within a group project.",
      next: "Evaluate how the proposed object fits a real routine, using the group’s original mockups and documenting each contributor’s work. No product or health outcome is established by this brief.",
    },
    note: "This page documents framing and contribution. It does not present a tested physical product or stand in for the independent medicine app.",
  },
  ...researchProjects,
];
