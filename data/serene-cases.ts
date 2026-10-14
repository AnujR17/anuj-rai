export type CaseTheme =
  | "himalayan"
  | "medicine"
  | "toki"
  | "physical"
  | "orbit";
export type SereneCase = {
  slug: string;
  title: string;
  headline: string;
  theme: CaseTheme;
  category: string;
  intro: string;
  role: string;
  status: string;
  sceneCaption: string;
  question: string;
  context: string[];
  decisions: { title: string; text: string }[];
  studyIntro: string;
  reflection: string[];
  detail: string;
  links: { label: string; href: string }[];
};
export const sereneCases: SereneCase[] = [
  {
    slug: "two-wheeler-dashboard",
    title: "Himalayan 450",
    headline: "A small circle. A lot to make clear.",
    theme: "himalayan",
    category: "Interface study / Browser simulation",
    intro:
      "Exploring what a motorcycle display shows, what stays in place, and what changes when the bike’s state changes.",
    role: "Interface concept and browser prototype; implementation assisted by GitHub Copilot",
    status: "Independent educational concept",
    sceneCaption:
      "Original dashboard export composited into a Himalayan 450 cockpit photograph. Photo by Ajay Ananth / Motofoodie. Unaffiliated with Royal Enfield.",
    question: "What stays visible when the state changes?",
    context: [
      "A circular display gives every element a limited amount of space. Speed, gear, RPM and warnings need to share it without becoming one undifferentiated list.",
      "The original interface export and browser simulation provide two ways to inspect the work: a stable layout, and an interface responding to input. The survey provides related rider preferences, rather than a performance test of this design.",
    ],
    decisions: [
      {
        title: "Keep a stable centre",
        text: "The speed reading occupies the centre of the original layout. Gear has its own area, while the RPM scale follows the upper edge. This makes the hierarchy visible before any controls are used.",
      },
      {
        title: "Examine a change",
        text: "The source prototype exposes ignition, throttle, brake, gear and mode controls. A state can be inspected repeatedly instead of being represented by one polished still.",
      },
      {
        title: "Separate preference from proof",
        text: "The two-wheeler survey considers readability and feature priorities across vehicle types. It offers questions for the interface; it does not establish glance time, sunlight legibility or safety.",
      },
    ],
    studyIntro:
      "Change the simulated speed and mode. The housing keeps the interface in context; the close-up makes the small display easier to inspect.",
    reflection: [
      "The export establishes the visual direction. The runnable prototype establishes that display behaviour can be inspected in a browser.",
      "Readability in sunlight, vibration, simultaneous warnings and riding use remain untested here. The portfolio study below is reconstructed; the original prototype is linked separately.",
    ],
    detail:
      "The original project README credits GitHub Copilot assistance. The circular hardware and Royal Enfield context are inherited references. The cockpit photograph is presentation context, not footage of this concept running on a motorcycle.",
    links: [
      { label: "Original prototype", href: "https://himalayan450.vercel.app" },
      {
        label: "Source & implementation credits",
        href: "https://github.com/AnujR17/Himalayan450",
      },
      {
        label: "Two-wheeler survey",
        href: "https://bike-dashboard-analysis.vercel.app",
      },
    ],
  },
  {
    slug: "medicine-app",
    title: "Medicine app",
    headline: "A dose recorded. A little less uncertainty.",
    theme: "medicine",
    category: "Independent interface design / Medicine routines",
    intro:
      "A medicine-taker interface and a caregiver view, designed around what happened and what still needs attention.",
    role: "Independent app/interface work; distinct from the physical group concept",
    status: "Figma interfaces; browser interaction study",
    sceneCaption:
      "Original Figma interfaces rebuilt from their design structure and assets, presented in phone mockups. Sample names and medicine details belong to the prototype.",
    question: "Who needs to know what happened next?",
    context: [
      "The medicine-taker screen brings the next dose and a recording action into the same view. The caregiver screen shows the day’s progress and a missed-dose state.",
      "These views serve different responsibilities. One person records an action; another needs a readable account of that record. The interface should make the difference between a record and an assumption clear.",
    ],
    decisions: [
      {
        title: "Make the next action visible",
        text: "The current dose receives a prominent card and a “Mark as taken” action. Morning, afternoon and night give the day structure without requiring a visit to a calendar.",
      },
      {
        title: "Give the caregiver context",
        text: "The caregiver view pairs overall progress with dose-specific information. A missed record has its own state and an available call action in the design.",
      },
      {
        title: "Show uncertainty explicitly",
        text: "The portfolio interaction study explores a pending-sync state. It keeps an unconfirmed update distinct from a completed record; it is a demonstration of that question, not evidence of a deployed sync system.",
      },
    ],
    studyIntro:
      "Try recording a dose, then simulate a pending update. The two illustrative phones let you inspect the difference between a person’s record and a shared confirmation.",
    reflection: [
      "The original screens establish the interface direction and the two roles. The browser study makes confirmation and connection uncertainty available to examine.",
      "This does not establish medicine adherence, clinical benefit or a production reminder service. The interaction uses sample content and stores no health information.",
    ],
    detail:
      "The independent app and physical Meditimer are separate projects. The survey’s 52 responses describe overlapping caregiver and senior response paths; those responses must not be presented as usability testing of this app. No measured clinical or behavioural outcome is claimed.",
    links: [
      {
        label: "Original Figma interface",
        href: "https://www.figma.com/design/on1gbKHkUo4CLZ38uCiSza/?node-id=797-3727",
      },
      {
        label: "Caregiver interface",
        href: "https://www.figma.com/design/on1gbKHkUo4CLZ38uCiSza/?node-id=826-1236",
      },
    ],
  },
  {
    slug: "toki",
    title: "Toki",
    headline: "A place for the thing you’re doing now.",
    theme: "toki",
    category: "Connected object / Focus and feedback",
    intro:
      "Exploring a desk-scale companion for tasks and time, across a physical object and connected interfaces.",
    role: "Connected-object exploration; concept, software and device work documented in the project source",
    status: "Ongoing prototype and connection experiments",
    sceneCaption:
      "Original Toki concept visualization from the project’s Figma file. A visualization of the intended object, not a photograph of a built integrated device.",
    question: "Can a task feel present without becoming another interruption?",
    context: [
      "Toki puts tasks and time into a desk-object concept. Its screen and control suggest a smaller interaction than returning to a full workspace on a phone or computer.",
      "The project repository contains firmware, a mobile companion and a web connection lab. Those materials show implementation work, while the integration and physical experience need to be evaluated separately.",
    ],
    decisions: [
      {
        title: "Give the task a place",
        text: "The concept visualization brings a short task list and a physical control onto the object. The form gives the interaction an everyday desk context.",
      },
      {
        title: "Make time inspectable",
        text: "The browser study below keeps the current duration, running state and pause action visible. It offers a concrete way to discuss feedback without claiming the physical device behaves identically.",
      },
      {
        title: "Keep connection work legible",
        text: "The repository separates link probes and recovery documentation from the intended experience. A successful connection experiment is a useful implementation step, not proof of a finished integrated product.",
      },
    ],
    studyIntro:
      "Start, pause and reset the illustrative timer. Previewing fifteen minutes lets you inspect a later state without waiting.",
    reflection: [
      "The source establishes software and firmware exploration. The concept image communicates the intended desk context.",
      "This portfolio timer is a browser study. It cannot establish the hardware’s timing, reliability, ergonomics or effects on focus.",
    ],
    detail:
      "Toki’s source includes staged development, connection probes and recovery notes. These distinguish the connection lab from the integrated object. The individual split of any collaborative design work should remain attributed in project source rather than being inferred from a repository owner.",
    links: [
      {
        label: "Source & development stages",
        href: "https://github.com/AnujR17/toki",
      },
      {
        label: "Original concept visualization",
        href: "https://www.figma.com/design/ixlPXmsuwf48nzujHHUV4T/?node-id=380-368",
      },
    ],
  },
  {
    slug: "medtimer",
    title: "Physical Meditimer",
    headline: "The reminder is also an object.",
    theme: "physical",
    category: "Physical medicine-management concept / Group project",
    intro:
      "A physical concept exploring the relationship between reminders, medicine storage and an existing daily routine.",
    role: "Problem framing and concept rationale; teammates contributed mockups and documentation",
    status: "Group concept; physical model",
    sceneCaption:
      "Original physical Meditimer model from the project Figma file. This project is separate from the independent medicine app.",
    question: "How does an object communicate what needs attention?",
    context: [
      "A physical medicine-management concept has to communicate through the object: where medicine is kept, when attention is needed, and what a person can do next.",
      "My contribution in this group project was problem framing and the concept rationale. Teammates contributed mockups and documentation. The physical model provides an artifact to discuss; it does not establish a working medical product.",
    ],
    decisions: [
      {
        title: "Start with the surrounding routine",
        text: "The framing asks how the product fits the activity around a reminder. The object and the moment of use need to be considered together.",
      },
      {
        title: "Make the concept tangible",
        text: "The original model lets the form and arrangement be examined beyond a screen flow. It is a concept artifact, rather than evidence that dispensing or sensing works.",
      },
      {
        title: "Separate signal and confirmation",
        text: "The illustrative study distinguishes a reminder, an acknowledgement and the next dose. It gives the communication question a visible sequence without attributing unverified hardware behaviour to the model.",
      },
    ],
    studyIntro:
      "Select a stage to compare how the reminder and feedback might be expressed. This is an illustrative concept sequence, not an original hardware recording.",
    reflection: [
      "The framing and physical model establish the concept’s direction and the group’s artifact. My role is credited separately from the team’s presentation work.",
      "Hardware function, response timing, safe storage and everyday use are not validated here. No participant quote, usability improvement or medicine outcome is claimed.",
    ],
    detail:
      "The independent medicine app has its own interface, implementation and ownership. Survey analysis supports questions about the context; it should not be reused as a test of this physical concept. The model remains a concept artifact.",
    links: [
      {
        label: "Original physical artifact",
        href: "https://www.figma.com/design/n7STT935qXcNGC5x49AcNm/?node-id=155-38",
      },
      { label: "Independent medicine app case", href: "/work/medicine-app/" },
    ],
  },
  {
    slug: "india-in-orbit",
    title: "India in Orbit",
    headline: "A way into an invisible system.",
    theme: "orbit",
    category: "Information design / Interactive web experience",
    intro:
      "An explorable introduction to satellites: what they do, where they orbit, and how they connect to everyday life.",
    role: "Interactive web project; source, methodology and credits linked below",
    status: "Working web experience",
    sceneCaption:
      "Captured opening of the original India in Orbit website, presented inside a laptop mockup.",
    question: "Where do you begin with something you can’t see?",
    context: [
      "The working website moves from everyday uses of satellites into orbital regimes and mission history. Familiar activities offer a way into a technical subject.",
      "Its implementation brings together a scroll-led narrative, rendered scenes, mission milestones and an orbit explorer. The case looks at the interaction structure that is visible in that experience.",
    ],
    decisions: [
      {
        title: "Begin with a familiar use",
        text: "Communication, navigation and observation connect the subject to activities a visitor already understands. The technical structure comes after that point of entry.",
      },
      {
        title: "Offer a path and room to explore",
        text: "A narrative gives the experience a reading order. The orbit explorer provides another way to investigate the system beyond following the page.",
      },
      {
        title: "Keep representation distinct from data",
        text: "The source contains satellite data and propagation logic alongside illustrative scenes. Those layers need their own provenance and accuracy checks; a rendered orbit is not evidence of live tracking.",
      },
    ],
    studyIntro:
      "Start with a familiar satellite use and see one relevant orbital context. This simplified study explains a relationship; open the original project for its full explorer.",
    reflection: [
      "The live site establishes an implemented experience, and the source makes the presentation and data layers available to inspect.",
      "This does not establish comprehension or scientific accuracy. Visitor testing, accessible alternatives to 3D and source review remain separate questions.",
    ],
    detail:
      "The diagram here is explanatory and is not to scale. It makes no live-position claim. The original project’s methodology, data and credits should be read alongside its propagation code. Source behaviour alone cannot establish the original author’s design intent or a measured learning outcome.",
    links: [
      {
        label: "Explore the original website",
        href: "https://india-in-orbit.vercel.app",
      },
      {
        label: "Source, methodology & credits",
        href: "https://github.com/AnujR17/india-in-orbit",
      },
    ],
  },
];
