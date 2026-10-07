import type { Project } from "@/data/projects";

export const researchProjects: Project[] = [
  {
    slug: "gandhinagar-roundabouts",
    title: "What actually blocks the circle?",
    type: "Field research / Communication concepts",
    summary: "A field study of Gandhinagar roundabouts, exploring how service-road entries, unclear signals, and everyday decisions interact.",
    image: {
      src: "/portfolio/research/gandhinagar-field.jpg",
      alt: "Mixed traffic at Reliance Circle, with a truck, cars, two-wheelers, and a service-road entry.",
      width: 825,
      height: 460,
      caption: "Field photograph reproduced from the research report, page 6.",
    },
    sections: [
      {
        title: "The starting assumption",
        paragraphs: [
          "Parking disorder was a recurring explanation in the secondary material. This study asked what was happening at the junctions themselves: where did movement break down, and what were people responding to?",
          "The focus included Reliance Chowkdi, Raksha Shakti Circle, and CH-0, with GH-0 used as an additional observation site.",
        ],
      },
      {
        title: "Looking at the whole interaction",
        paragraphs: [
          "The report combines visits during peak and non-peak periods, contextual interviews with traffic police, short interactions with road users and local guards, and secondary accident and planning material.",
          "Observation covered service-road merges, wrong-side entries, responses to police hand signals, heavy vehicles, and pedestrians navigating occupied footpaths. This widened the question beyond parked vehicles alone.",
          "The supplied accident-record files contain 98 Sector-21 rows, 87 Sector-7 rows, and 113 Infocity rows after excluding its header: 298 record rows in total. These are recorded cases, not a measure of traffic exposure or a complete count of all crashes.",
        ],
      },
      {
        title: "The decision at the edge",
        paragraphs: [
          "The field account describes vehicles bypassing queues along service roads and merging sharply into the circle. One entry could invite others to follow, while manual regulation required drivers and officers to keep negotiating movement.",
          "The annotated map made those overlapping approaches visible. It shifted the design focus toward guidance at merge points, alongside the operation of signals and enforcement, rather than assuming that a poster or extra road width could solve the system.",
        ],
        figures: [{
          src: "/portfolio/research/gandhinagar-flow-map.jpg",
          alt: "Annotated Reliance Chowkdi map tracing overlapping approaches from Sargasan, Kudasan, the commercial area, and GIFT City, including service-road movements.",
          width: 931,
          height: 646,
          caption: "Traffic-flow annotation reproduced from the report, page 10. A field interpretation, not a measured traffic-flow model.",
        }],
      },
      {
        title: "Exploring the tone of a message",
        paragraphs: [
          "The communication concepts explored emotional accountability and informational guidance. The report describes a two-day pilot in which digital poster mockups were shown on mobile devices to students, commuters, and traffic police.",
          "The examples below show two emotional approaches: reflection on consequences and public accountability. They are campaign mockups, not evidence that a campaign or surveillance system was deployed.",
        ],
        figures: [
          {
            src: "/portfolio/research/poster-regret.jpg",
            alt: "Regret-based campaign mockup showing a fallen motorcycle with the message: To save a few seconds, they lost hours.",
            width: 1440,
            height: 1024,
            caption: "Regret-based poster mockup, report page 21.",
          },
          {
            src: "/portfolio/research/poster-accountability.jpg",
            alt: "Accountability-themed campaign mockup with a simulated roadside screen and the message: Some mistakes don't stay private.",
            width: 1034,
            height: 736,
            caption: "Accountability-themed mockup, report page 21. The pictured screen is part of the concept.",
          },
        ],
      },
      {
        title: "What the feedback challenged",
        paragraphs: [
          "The reported feedback made tone a tradeoff. Reflective messages were viewed more favourably by some respondents and officers, while shame-based concepts prompted concerns about discomfort, hostility, and credibility if no camera actually existed.",
          "A delivery rider’s feedback also challenged the assumption that awareness was enough: livelihood pressure could outweigh a message. Across the feedback, functional signals and consistent enforcement remained important. Communication became a supporting intervention rather than a standalone answer.",
        ],
      },
      {
        title: "What can be concluded",
        paragraphs: [
          "The study documents an observational account, communication concepts, and qualitative reactions. Although the report calls the pilot A/B testing, it does not document a randomized allocation, participant counts, or measured changes in driving or congestion.",
          "The next question is whether clear guidance at the point of entry, supported by reliable traffic management, changes decisions in practice. That would require an appropriately designed field evaluation.",
        ],
      },
    ],
    note: "Source: Anuj Rai’s supplied 29-page research report. Findings describe the observed sites and reported feedback; no causal reduction in congestion or accidents is claimed.",
  },
  {
    slug: "medicine-storage-research",
    title: "Medicine, storage, and reminders",
    type: "Survey analysis / Research presentation",
    summary: "Exploring how medicine routines, existing storage, and reminder preferences can inform a practical product direction.",
    image: {
      src: "/portfolio/research/medicine-reminder-fit.png",
      alt: "Survey chart comparing existing reminder habits with preferred styles, including fixed routines, caregiver reminders, voice reminders, alarms, and notifications.",
      width: 2367,
      height: 1369,
      caption: "Original reminder-fit chart from the Medicine Storage and Reminder analysis.",
    },
    live: "https://medicine-storage-and-reminder.vercel.app",
    liveLabel: "Read the research presentation",
    source: "https://github.com/AnujR17/Medicine-Storage-and-Reminder",
    sections: [
      {
        title: "Two perspectives on a routine",
        paragraphs: [
          "The supplied CSV contains 52 responses. There are 48 caregiver-path responses and 7 self-managed senior-path responses, with 3 people using both paths. These perspectives should not be added together as independent participants.",
          "The survey was conducted using Google Forms. The analysis covers current medicine storage, timing difficulties, device familiarity, reminder preferences, product formats, and price expectations.",
        ],
      },
      {
        title: "Turning responses into questions",
        paragraphs: [
          "Comparing current habits with preferred reminders raises a useful design question: how could support fit an existing routine without requiring a person to adopt a complicated new system?",
          "Among the 46 nonblank caregiver-path answers to the preferred-reminder question, 21 selected voice reminders. That supports exploring voice as an option while keeping control and other reminder styles available.",
          "The report’s direction favours familiar storage and flexible reminder behaviour. Voice is one option to explore, alongside control over when and how a reminder appears. A stated preference is a starting point for a prototype, not proof that a particular product will work.",
        ],
      },
      {
        title: "Keeping interpretation grounded",
        paragraphs: [
          "City names and multi-select responses are standardized in the notebook. City tiers are analyst-defined comparison groups, not official classifications; the direct senior-response subset is small.",
          "The report is exploratory. Correlations do not establish causes, and purchase intention does not demonstrate adoption. This survey-analysis project is separate from the physical Meditimer concept and the independent medicine app.",
        ],
      },
    ],
    note: "Exploratory survey analysis. Caregiver proxy answers and direct senior answers provide different kinds of evidence; no health outcome or product efficacy is claimed.",
  },
  {
    slug: "consumer-experience",
    title: "Consumer experience in retail",
    type: "Survey analysis / Research exploration",
    summary: "Examining store attributes and visual merchandising through survey responses, descriptive analysis, and exploratory segmentation.",
    image: {
      src: "/portfolio/research/consumer-attribute-ranking.png",
      alt: "Repository chart ranking store attributes, with cleanliness, parking, and digital payment above promotional attributes in this sample.",
      width: 3559,
      height: 2955,
      caption: "Original descriptive ranking from the Consumer Experience repository.",
    },
    live: "https://consumer-experience.vercel.app",
    liveLabel: "Read the analysis site",
    source: "https://github.com/AnujR17/Consumer-Experience",
    sections: [
      {
        title: "My contribution",
        paragraphs: [
          "I was given a research dataset and asked to analyse it. My contribution here is the analysis of supplied responses, rather than collecting the survey or establishing that the research was published.",
        ],
      },
      {
        title: "The research question",
        paragraphs: [
          "What do respondents value in a store, and how do those preferences relate to the visual experience? The notebook and presentation report a sample of 154 responses, with store-attribute and visual-merchandising questions.",
          "The work includes descriptive rankings, reliability checks, factor analysis, association tests, and clustering. The chart provides an entry into the descriptive findings rather than a claim about all retail shoppers.",
        ],
      },
      {
        title: "From a ranking to a design hypothesis",
        paragraphs: [
          "In the repository’s descriptive ranking, practical basics sit above several promotional attributes. A useful design hypothesis is to make facilities, payment, and checkout support easy to understand before relying on a more elaborate visual experience.",
          "Testing that hypothesis would require examining an actual store or service journey. Survey importance ratings do not establish what causes a purchase or how much a redesign would improve it.",
        ],
      },
      {
        title: "An exploratory result",
        paragraphs: [
          "The factor and cluster models are exploratory. The project summary and notebook contain differences that need reconciliation before stronger claims about validated factors, representative segments, or causal effects are made.",
          "The study is useful as an analysis exercise and a source of design questions. It does not establish that the same segments will recur in another population or that visual merchandising caused a measured sales change.",
        ],
      },
    ],
    note: "Exploratory survey study. Descriptive findings are presented as sample-specific; disputed model metrics and broad validation claims are not used as portfolio outcomes.",
  },
  {
    slug: "skidge",
    title: "Skidge — graduate outcomes",
    type: "Data analysis / Learning project",
    summary: "An exploration of graduate profiles, starting salaries, skills, and job-demand data, with a focus on how the definition of a measure shapes its interpretation.",
    image: {
      src: "/portfolio/research/skidge-gpa-salary.png",
      alt: "Repository scatter plot showing a broad range of starting salaries across college GPA values, with a small number of high-salary outliers.",
      width: 1482,
      height: 1030,
      caption: "Original GPA and starting-salary plot from Skidge’s analysis folder.",
    },
    live: "https://skidge.vercel.app",
    liveLabel: "Open the project report",
    source: "https://github.com/AnujR17/Skidge",
    sections: [
      {
        title: "A question about assessment",
        paragraphs: [
          "The project explores relationships among academic scores, skills, graduate salaries, and job-demand material. The scatter plot makes variation visible rather than reducing every graduate to a single academic score.",
          "That is an invitation to examine the dataset and its measures. It is not evidence that GPA is irrelevant or that a new score can determine an individual’s suitability for a job.",
        ],
      },
      {
        title: "What does readiness mean?",
        paragraphs: [
          "The notebook uses both a salary-derived label and an analyst-weighted skills score in different analyses. These are constructed proxies, not independent measures of performance at work.",
          "Predicting a score from the same inputs used to construct it can show that a model reproduces the formula. It does not independently validate employability. The proxy, benchmark, and evaluation need to be kept separate.",
        ],
      },
      {
        title: "What I would strengthen next",
        paragraphs: [
          "The next iteration should make dataset provenance and the definition of every target explicit, preserve unaltered statistical outputs, and distinguish descriptive relationships from predictive claims.",
          "This is presented as a learning project. Model-accuracy figures and assertions about hiring validity are not used as proof of a successful employment assessment system.",
        ],
      },
    ],
    note: "Exploratory analysis, not an employment assessment product. Constructed scores and sample relationships should not be interpreted as individual hiring recommendations.",
  },
];
