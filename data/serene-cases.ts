export type CaseTheme = "himalayan" | "medicine" | "toki" | "physical" | "orbit";
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
  decisions: { title: string; evidence: string; text: string; tradeoff: string }[];
  studyTitle: string;
  studyIntro: string;
  studyTask: string;
  studyNotice: string;
  result: { title: string; delivered: string; next: string };
  detail: string;
  links: { label: string; href: string }[];
};

export const sereneCases: SereneCase[] = [
  {
    "slug": "two-wheeler-dashboard",
    "title": "Himalayan 450",
    "headline": "A small circle. A lot to make clear.",
    "theme": "himalayan",
    "category": "Interface study / Browser simulation",
    "intro": "A circular motorcycle interface explored through its information hierarchy and changing states, from the original screen to a working browser prototype.",
    "role": "Interface concept and browser prototype; implementation assisted by GitHub Copilot",
    "status": "Independent educational concept",
    "sceneCaption": "Original dashboard export composited into a Himalayan 450 cockpit photograph. Photo by Ajay Ananth / Motofoodie. Unaffiliated with Royal Enfield.",
    "question": "What stays visible when the state changes?",
    "context": [
      "Speed, gear, RPM, fuel and warnings share a small circular surface. The useful question is what stays easy to locate when those signals change or compete for attention.",
      "The work has two complementary artifacts: the original interface export shows the composition, while the source prototype exposes changes in speed, gear, indicators and riding mode. Together they make the hierarchy available to examine beyond a single still."
    ],
    "decisions": [
      {
        "title": "Give the eye a place to return",
        "evidence": "Original interface export",
        "text": "Speed occupies the centre in the largest type. RPM follows the upper arc, while gear and fuel sit in separate regions. The composition gives each kind of reading a recognizable location.",
        "tradeoff": "The perimeter is still shared space. Multiple warnings could compete with the smaller supporting readings."
      },
      {
        "title": "Examine the transition, not only the screen",
        "evidence": "Controls in the source browser prototype",
        "text": "Ignition, throttle, brake, gear and mode controls make a changing state inspectable. A viewer can repeat an input and compare what changes with what stays in place.",
        "tradeoff": "A browser makes comparison convenient, but its controls and viewing conditions differ from a motorcycle."
      },
      {
        "title": "Keep the basics in the conversation",
        "evidence": "Separate two-wheeler survey report",
        "text": "The survey’s feature priorities put fuel and speed above additional features. That creates a concrete question for the layout: what happens to those readings when navigation or mode controls demand space?",
        "tradeoff": "Reported preferences across two-wheeler types cannot validate this particular display’s legibility."
      }
    ],
    "studyIntro": "Use the reconstructed study to compare a steady layout with changing values. Open the original prototype separately to inspect its fuller set of controls.",
    "detail": "The original project README credits GitHub Copilot assistance. The circular hardware and Royal Enfield context are inherited references. The cockpit photograph is presentation context, not footage of this concept running on a motorcycle.",
    "links": [
      {
        "label": "Original prototype",
        "href": "https://himalayan450.vercel.app"
      },
      {
        "label": "Source & implementation credits",
        "href": "https://github.com/AnujR17/Himalayan450"
      },
      {
        "label": "Two-wheeler survey",
        "href": "https://bike-dashboard-analysis.vercel.app"
      }
    ],
    "studyTitle": "Change the state. Keep your bearings.",
    "studyTask": "Enlarge the display, move the speed to zero, then choose another riding mode.",
    "studyNotice": "Which readings change, and can you still locate speed, gear and fuel without searching?",
    "result": {
      "title": "A display that can be examined in motion.",
      "delivered": "An original interface export and a runnable browser prototype make both visual hierarchy and changing states available to inspect. The cockpit composite presents the scale and context; the close-up supports closer reading.",
      "next": "Compare a navigation cue and simultaneous warnings under controlled viewing conditions. Sunlight, vibration and use while riding remain separate evaluation questions."
    }
  },
  {
    "slug": "medicine-app",
    "title": "Medicine app",
    "headline": "Medicine app: daily records and a caregiver view.",
    "theme": "medicine",
    "category": "Independent interface design / Medicine routines",
    "intro": "Two views of the same routine: a medicine taker records a dose, while a caregiver needs a clear account of confirmed and unconfirmed updates.",
    "role": "Independent app/interface work; distinct from the physical group concept",
    "status": "Figma interfaces; browser interaction study",
    "sceneCaption": "Original Figma interfaces rebuilt from their design structure and assets, presented in phone mockups. Sample names and medicine details belong to the prototype.",
    "question": "Who needs to know what happened next?",
    "context": [
      "A dose reminder is one moment in a longer interaction. After it appears, the person needs a clear recording action; a caregiver needs to understand the resulting record without guessing what happened.",
      "The original Figma screens give these responsibilities different views. The medicine taker sees the next dose and the day’s routine. The caregiver sees overall progress alongside a dose-specific missed-record state."
    ],
    "decisions": [
      {
        "title": "Put the dose and action together",
        "evidence": "Original medicine-taker Figma screen",
        "text": "The current dose has a prominent card with a “Mark as taken” action. Morning, afternoon and night organize the day, keeping the immediate task visible without opening a calendar.",
        "tradeoff": "A simple daily overview still needs to remain understandable when prescriptions or schedules become more complex."
      },
      {
        "title": "Give a caregiver context, not just an alert",
        "evidence": "Original caregiver Figma screen",
        "text": "Day-level progress sits alongside dose-specific information and an available call action. The caregiver can see what needs attention before deciding whether to follow up.",
        "tradeoff": "An absent record leaves uncertainty. It should not automatically be interpreted as proof that a dose was missed."
      },
      {
        "title": "Distinguish a record from a shared confirmation",
        "evidence": "Portfolio study extending the original screens",
        "text": "The illustrative pending-sync state keeps an unconfirmed update distinct from a confirmed shared record. It makes connection uncertainty visible rather than silently treating it as success.",
        "tradeoff": "This state is a new explanatory study, not evidence of a deployed synchronization or reminder service."
      }
    ],
    "studyIntro": "The original designs appear above. This separate browser study isolates one interaction: how recording and confirmation appear to the two people involved.",
    "detail": "The independent app and physical Meditimer are separate projects. The survey’s 52 responses describe overlapping caregiver and senior response paths; those responses must not be presented as usability testing of this app. No measured clinical or behavioural outcome is claimed.",
    "links": [
      {
        "label": "Original Figma interface",
        "href": "https://www.figma.com/design/on1gbKHkUo4CLZ38uCiSza/?node-id=797-3727"
      },
      {
        "label": "Caregiver interface",
        "href": "https://www.figma.com/design/on1gbKHkUo4CLZ38uCiSza/?node-id=826-1236"
      }
    ],
    "studyTitle": "One action. Two perspectives.",
    "studyTask": "Record the sample dose, then simulate a pending update on the caregiver’s view.",
    "studyNotice": "A local record and a confirmed shared update are different states. Neither verifies that medicine was actually taken.",
    "result": {
      "title": "A clearer account of what is known.",
      "delivered": "The original medicine-taker and caregiver interfaces show complementary responsibilities. The local browser study adds a concrete way to inspect recorded, unrecorded and unconfirmed states.",
      "next": "Evaluate whether each person can distinguish “not recorded,” “recorded” and “waiting for confirmation,” including what they would do next when an update is delayed."
    }
  },
  {
    "slug": "toki",
    "title": "Toki",
    "headline": "A place for the thing you’re doing now.",
    "theme": "toki",
    "category": "Connected object / Focus and feedback",
    "intro": "A desk-object concept for making the current task and time visible, with connection experiments that explore how the intended object could work.",
    "role": "Connected-object exploration; concept, software and device work documented in the project source",
    "status": "Ongoing prototype and connection experiments",
    "sceneCaption": "Original Toki concept visualization from the project’s Figma file. A visualization of the intended object, not a photograph of a built integrated device.",
    "question": "Can a task feel present without becoming another interruption?",
    "context": [
      "Toki asks whether a smaller interaction can keep a task present without sending someone back into a full phone or computer workspace. The concept places a short task list and a physical control on a desk-scale object.",
      "The concept image communicates the intended experience. Firmware, a mobile companion and connection-lab material document implementation exploration. The relationship between those pieces is part of the work; a connected component alone is not the finished object."
    ],
    "decisions": [
      {
        "title": "Give the task a physical place",
        "evidence": "Original Toki concept visualization",
        "text": "A compact display and nearby control bring the interaction into the desk environment. The concept makes the current task visible outside a larger digital workspace.",
        "tradeoff": "A visible object could also become another interruption. The form alone cannot establish an effect on focus."
      },
      {
        "title": "Make a session’s state easy to read",
        "evidence": "Illustrative portfolio timer",
        "text": "The browser study places remaining time, running state and pause action together. It separates “ready,” “in progress” and “complete” so the feedback can be examined as a sequence.",
        "tradeoff": "A readable browser timer does not establish the hardware’s timing, tactile feedback or reliability."
      },
      {
        "title": "Treat connection as a design dependency",
        "evidence": "Source connection probes and recovery notes",
        "text": "Link experiments and recovery documentation expose what has to work before the intended object can be evaluated as a whole. They give integration work a concrete scope.",
        "tradeoff": "Progress on an individual link is useful evidence of making, while an integrated physical demonstration remains a separate milestone."
      }
    ],
    "studyIntro": "An illustrative device housing makes the timer’s state changes easy to examine. It remains separate from the original object visualization and physical implementation.",
    "detail": "Toki’s source includes staged development, connection probes and recovery notes. These distinguish the connection lab from the integrated object. The individual split of any collaborative design work should remain attributed in project source rather than being inferred from a repository owner.",
    "links": [
      {
        "label": "Source & development stages",
        "href": "https://github.com/AnujR17/toki"
      },
      {
        "label": "Original concept visualization",
        "href": "https://www.figma.com/design/ixlPXmsuwf48nzujHHUV4T/?node-id=380-368"
      }
    ],
    "studyTitle": "Make time visible without waiting.",
    "studyTask": "Start the timer, preview fifteen minutes, then pause and reset it.",
    "studyNotice": "Can you tell at a glance whether the session is running, paused or complete?",
    "result": {
      "title": "A concept with visible implementation questions.",
      "delivered": "The original visualization communicates the desk context, while software, firmware and connection experiments document the making. The portfolio timer isolates one feedback question in a browser.",
      "next": "Demonstrate a real input-to-feedback sequence on the object, then examine control feel, legibility, connection recovery and whether its presence supports the task."
    }
  },
  {
    "slug": "medtimer",
    "title": "Physical Meditimer",
    "headline": "Physical Meditimer: storage and reminders.",
    "theme": "physical",
    "category": "Physical medicine-management concept / Group project",
    "intro": "A group medicine-management concept that treats storage, a reminder and the surrounding daily activity as parts of one interaction.",
    "role": "Problem framing and concept rationale; teammates contributed mockups and documentation",
    "status": "Group concept; physical model",
    "sceneCaption": "Original physical Meditimer model from the project Figma file. This project is separate from the independent medicine app.",
    "question": "How does an object communicate what needs attention?",
    "context": [
      "A physical reminder lives somewhere, alongside other objects and activities. Its meaning depends on where medicines are kept, when the signal arrives and what a person can do in response.",
      "My contribution was the problem framing and concept rationale. Teammates contributed mockups and documentation. The original physical model makes the concept tangible; it is separate from my independent medicine app."
    ],
    "decisions": [
      {
        "title": "Frame the moment around the reminder",
        "evidence": "Problem framing and concept rationale",
        "text": "The concept considers the object and the activity around it together. The question extends beyond producing an alert to whether a person can recognize and act on it in their routine.",
        "tradeoff": "A familiar placement for one household may be inconvenient in another. Fit needs to be examined in context."
      },
      {
        "title": "Use the model to discuss the form",
        "evidence": "Original physical concept artifact",
        "text": "The physical model gives the group a way to examine arrangement and communicate the idea beyond a flat screen. It provides a shared reference for discussing the product.",
        "tradeoff": "A model can communicate form without demonstrating sensing, dispensing, safe storage or working electronics."
      },
      {
        "title": "Separate a signal from its acknowledgement",
        "evidence": "Illustrative portfolio feedback sequence",
        "text": "Reminder, acknowledgement and next-dose states let the communication question be examined step by step. Each state should mean something different to the person using the object.",
        "tradeoff": "Acknowledging a signal is not confirmation that medicine was taken. The sequence is explanatory, rather than recorded hardware behaviour."
      }
    ],
    "studyIntro": "This separate concept sequence makes the reminder’s communication states visible. The original group artifact appears above; the study does not operate physical hardware.",
    "detail": "The independent medicine app has its own interface, implementation and ownership. Survey analysis supports questions about the context; it should not be reused as a test of this physical concept. The model remains a concept artifact.",
    "links": [
      {
        "label": "Original physical artifact",
        "href": "https://www.figma.com/design/n7STT935qXcNGC5x49AcNm/?node-id=155-38"
      },
      {
        "label": "Independent medicine app case",
        "href": "/work/medicine-app/"
      }
    ],
    "studyTitle": "What does each signal mean?",
    "studyTask": "Compare the reminder, acknowledgement and next-dose states.",
    "studyNotice": "Does the feedback make it clear what changed, what was recorded and what needs attention next?",
    "result": {
      "title": "A tangible concept and a focused framing question.",
      "delivered": "The group produced a physical concept artifact. My contribution was its problem frame and rationale, with teammates responsible for mockups and documentation. The portfolio sequence explains one possible feedback relationship.",
      "next": "Use the original model to examine placement, recognition and acknowledgement in a real routine. Evaluate any proposed hardware function separately before making claims about product performance."
    }
  },
  {
    "slug": "india-in-orbit",
    "title": "India in Orbit",
    "headline": "A way into an invisible system.",
    "theme": "orbit",
    "category": "Information design / Interactive web experience",
    "intro": "An interactive introduction to satellites that starts with everyday relevance, then opens into orbital regimes, mission history and a place to explore.",
    "role": "Interactive web project; source, methodology and credits linked below",
    "status": "Working web experience",
    "sceneCaption": "Captured opening of the original India in Orbit website, presented inside a laptop mockup.",
    "question": "Where do you begin with something you can’t see?",
    "context": [
      "An orbital system can be difficult to approach without a reason to care about it. Communication, navigation and observation give visitors familiar activities to connect to the subject.",
      "The working website combines a scroll-led narrative with rendered scenes, mission milestones and an orbit explorer. It offers a reading path for an introduction and room to follow a question through the larger system."
    ],
    "decisions": [
      {
        "title": "Start from a use, then explain the system",
        "evidence": "Implemented website content sequence",
        "text": "Everyday satellite roles introduce the subject before orbital regimes and mission history. The sequence supplies context for the technical structure rather than making terminology the first task.",
        "tradeoff": "A familiar example simplifies the subject. It needs a route into deeper explanations rather than becoming the whole account."
      },
      {
        "title": "Combine a guided path with exploration",
        "evidence": "Narrative sections and orbit explorer",
        "text": "The narrative gives material a readable order. The explorer allows a different engagement: investigating a relationship beyond following the page from top to bottom.",
        "tradeoff": "Moving between explanation and exploration creates a navigation question: will the visitor know what each view represents and where to go next?"
      },
      {
        "title": "Explain what the representation stands for",
        "evidence": "Rendered scenes, data and propagation code",
        "text": "Illustrative scenes and data-driven views make different claims. Keeping their purpose and sources explicit helps a visitor understand whether they are seeing an explanation or a calculated representation.",
        "tradeoff": "A convincing rendered view can imply precision. Its appearance alone cannot establish live tracking or scientific accuracy."
      }
    ],
    "studyIntro": "This simplified explanation connects a familiar use to one relevant orbital context. The full narrative, methodology and explorer remain in the original website.",
    "detail": "The diagram here is explanatory and is not to scale. It makes no live-position claim. The original project’s methodology, data and credits should be read alongside its propagation code. Source behaviour alone cannot establish the original author’s design intent or a measured learning outcome.",
    "links": [
      {
        "label": "Explore the original website",
        "href": "https://india-in-orbit.vercel.app"
      },
      {
        "label": "Source, methodology & credits",
        "href": "https://github.com/AnujR17/india-in-orbit"
      }
    ],
    "studyTitle": "Start with a use. Find an orbital context.",
    "studyTask": "Switch between navigation, Earth observation and communication.",
    "studyNotice": "How does the explanation change with the use? The diagram shows a relationship, not live satellite positions or distances to scale.",
    "result": {
      "title": "An implemented way into a technical subject.",
      "delivered": "A working website brings together everyday satellite roles, a narrative, mission material and an orbit explorer. Its source makes the presentation and data layers available to inspect.",
      "next": "Ask visitors to explain the connection between a satellite’s role and its orbital context, then use any confusion to evaluate the sequence, navigation and accessible alternatives to rendered scenes."
    }
  }
];
