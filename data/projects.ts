import { researchProjects } from "@/data/research-projects";
import type { Project } from "@/data/case-study";
import { additionalProjects } from "@/data/work-projects";
export type { Project, ProjectImage } from "@/data/case-study";

const tokiConceptImage = {
  "src": "/portfolio/toki/desk-render.webp",
  "alt": "Toki concept render showing a focus session display, three touch controls and a countdown dial on a dark desk",
  "width": 1445,
  "height": 1088,
  "caption": "Desk concept render supplied by Anuj Rai for the case study"
};

export const mainProjects: Project[] = [
  {
    "slug": "medicine-app",
    "title": "Meditimer app",
    "headline": "Making medicine routines easier to manage together",
    "summary": "Meditimer brings prescription setup, reminders and shared dose records into one medicine routine.",
    "brief": "Design a medicine routine that a person can manage and share with a caregiver.",
    "problem": "When a dose goes unrecorded, a caregiver lacks the context to decide whether to check in.",
    "duration": "3 weeks",
    "contribution": "Research, information architecture, interaction design and prototyping",
    "visual": "medicine",
    "resources": [
      {
        "label": "Explore the setup screens in Figma",
        "href": "https://www.figma.com/design/on1gbKHkUo4CLZ38uCiSza/?node-id=3137-596"
      },
      {
        "label": "Explore the caregiver history in Figma",
        "href": "https://www.figma.com/design/on1gbKHkUo4CLZ38uCiSza/?node-id=3121-219"
      },
      {
        "label": "View the information architecture in FigJam",
        "href": "https://www.figma.com/board/koDyOWomvBVtTlFdbcpNfD/Meditimer---IA--User-Flow"
      },
      {
        "label": "Device mockup by Mockups Design",
        "href": "https://mockups-design.com/free-iphone-16-mockup/"
      }
    ],
    "stages": {
      "research": [
        {
          "title": "Understanding medicine routines",
          "paragraphs": [
            "I received 24 survey responses and interviewed seven people about medicine routines. Some took part in both.",
            "A separate senior-care survey of 56 respondents helped frame the caregiver perspective.",
            "Families wanted to know when to check in without repeatedly asking about a dose."
          ]
        }
      ],
      "insights": [
        {
          "title": "A record needs to leave room for uncertainty",
          "paragraphs": [
            "A caregiver needs to see what someone recorded for each dose.",
            "An unrecorded dose is still unknown. A missed dose is one the person explicitly marked as missed.",
            "The history shows individual entries so a partly recorded day is visible at a glance."
          ]
        }
      ],
      "concept": [
        {
          "title": "One routine, two perspectives",
          "paragraphs": [
            "One person records what they take. The other uses the shared record to decide when to reach out.",
            "The personal view shows the next dose. The caregiver view pairs the record with a way to call.",
            "Either person can initiate pairing by phone number or contact. Caregiver permissions need further design."
          ]
        }
      ],
      "design": [
        {
          "title": "Record a dose",
          "paragraphs": [
            "The reminder names the medicine and lets the person record that dose."
          ]
        },
        {
          "title": "Check in with care",
          "paragraphs": [
            "A proposed alert after 30 minutes lets a caregiver review the record before calling or sending a reminder."
          ]
        },
        {
          "title": "Remember as-needed medicine",
          "paragraphs": [
            "Log an as-needed medicine and the time it was taken."
          ]
        }
      ],
      "outcome": [
        {
          "title": "What the prototype covers",
          "paragraphs": [
            "The Figma prototype covers prescription setup, daily reminders and caregiver support. Caregiver history is a separate exploration.",
            "Informal exhibition feedback highlighted everyday routines and checking on a parent.",
            "Prescription recognition, live notifications and shared access remain to be built and tested."
          ]
        }
      ]
    },
    "note": "Screen sequences use example medicines and prescriptions. Device mockups are flattened presentation images from Mockups Design."
  },
  {
    "slug": "two-wheeler-dashboard",
    "title": "Himalayan 450",
    "headline": "A circular dashboard for changing riding states",
    "summary": "I designed a Himalayan 450 dashboard concept and built a browser simulation to examine how speed, gears and warnings share a circular display. The layout has to keep making sense as its readings change.",
    "brief": "Create a circular motorcycle dashboard and a controllable browser prototype for inspecting information hierarchy across different vehicle states.",
    "problem": "Speed, gear, RPM, fuel and warnings compete for limited space. A rider needs to find each reading without having to relearn the display when another value or warning changes.",
    "duration": "3 weeks",
    "contribution": "Designed the dashboard interface and developed the browser simulation as an individual project",
    "image": {
      "src": "/portfolio/himalayan-dashboard.png",
      "alt": "Circular dashboard design with speed at the centre, an RPM arc, gear and warning indicators",
      "width": 385,
      "height": 385,
      "caption": "Original interface export from the Himalayan450 repository"
    },
    "live": "https://himalayan450.vercel.app",
    "source": "https://github.com/AnujR17/Himalayan450",
    "resources": [
      {
        "label": "Two-wheeler survey analysis",
        "href": "https://bike-dashboard-analysis.vercel.app"
      }
    ],
    "stages": {
      "research": [
        {
          "title": "Start with the information people look for",
          "paragraphs": [
            "The accompanying two-wheeler survey report covers feature priorities, readability, environmental challenges and interaction preferences. Its sample spans different kinds of two-wheelers, so I treat it as broader dashboard context rather than a Himalayan-only riding study.",
            "The feature-priority chart gives speed and fuel information more weight than additional dashboard features. That makes the practical question more specific: how can those readings remain easy to find when the interface also contains modes, indicators and warnings?",
            "The survey helps frame the hierarchy. The browser prototype gives me a way to examine the design itself, with inputs I can repeat and states I can compare."
          ],
          "figures": [
            {
              "src": "/portfolio/research/bike-feature-priorities.png",
              "alt": "Survey chart ranking fuel or battery information and speed above additional dashboard features",
              "width": 1220,
              "height": 706,
              "caption": "Original feature-priority chart from BikeDashboardAnalysis"
            }
          ]
        }
      ],
      "insights": [
        {
          "title": "A fixed image only shows one combination",
          "paragraphs": [
            "A dashboard export can show where everything belongs, but it cannot show how several changing signals compete for attention. Speed, gear and warnings need to be considered together, rather than judged as separate graphic elements.",
            "I wanted the prototype to make those combinations inspectable. Keeping the locations stable while changing the values makes it easier to see what the composition emphasises and where information starts competing."
          ]
        }
      ],
      "concept": [
        {
          "title": "Use the circle to organise information",
          "paragraphs": [
            "I put speed at the centre, followed the upper edge with RPM and gave gear, fuel and warnings their own regions. The circular format becomes a constraint for organising the display, rather than a reason to make every element follow an arc.",
            "The tradeoff is space. Every additional element has to earn a place without weakening the basic readings. A controllable simulation lets me examine that tradeoff across more than the opening screen."
          ]
        }
      ],
      "design": [
        {
          "title": "Keep the hierarchy recognisable",
          "paragraphs": [
            "Speed uses the largest type and occupies the central area. RPM follows the circular edge. Gear and warning indicators have separate positions, so a change in one reading does not require moving the others.",
            "The hierarchy is intended to survive changing values. This is why the case includes both the original interface export and a runnable prototype: one shows the arrangement, while the other lets someone inspect its behaviour."
          ]
        },
        {
          "title": "Make the state changes repeatable",
          "paragraphs": [
            "The browser prototype includes ignition, throttle and brake controls, gear changes and indicators. Eco, Performance and Rain modes provide further states to inspect. Keyboard and on-screen controls let a viewer repeat an input without needing access to a motorcycle.",
            "Those controls are part of the demonstration. They make the design available for discussion and comparison; they are not a simulation of the full physical experience of riding."
          ]
        }
      ],
      "outcome": [
        {
          "title": "A dashboard that can be inspected in use",
          "paragraphs": [
            "The result is an interface design and an interactive browser prototype, completed as an individual project. I can move beyond asking whether a static dashboard looks balanced and examine what remains prominent as its state changes.",
            "The next comparison should bring warnings and navigation cues into the same viewing task. Sunlight, vibration, glance time and use while riding still need appropriate evaluation. The browser establishes implemented interaction states, not road performance."
          ]
        }
      ]
    },
    "note": "Independent educational concept, unaffiliated with Royal Enfield. The original repository credits GitHub Copilot for implementation assistance. The prototype and accompanying survey analysis are linked below."
  },
  {
    "slug": "medtimer",
    "title": "Physical Meditimer",
    "headline": "Bringing medicine storage and reminders together",
    "summary": "Physical Meditimer is a group product concept for connecting medicine storage with a daily reminder. My work focused on the concept, functions, interactions and physical use, including field research and considerations of human factors and ergonomics.",
    "brief": "Develop a physical medicine-management concept that brings storage and reminders into one object, with attention to placement, access and how someone responds to it.",
    "problem": "A reminder has to relate to where medicine is kept and what a person does next. The signal, storage arrangement and physical interaction need to work together within an existing routine.",
    "duration": "3 weeks",
    "contribution": "Developed the concept, functions and interactions, considered human factors and ergonomics, and conducted field research. Teammates contributed mockups and documentation",
    "image": {
      "src": "/portfolio/physical.jpg",
      "alt": "Original physical Meditimer model with an upper storage compartment, display and lower tray",
      "width": 500,
      "height": 744,
      "caption": "Original group model recovered from portfolioSerene; Figma n7STT935qXcNGC5x49AcNm, node 155:38"
    },
    "resources": [
      {
        "label": "Original physical model in Figma",
        "href": "https://www.figma.com/design/n7STT935qXcNGC5x49AcNm/?node-id=155-38"
      }
    ],
    "stages": {
      "research": [
        {
          "title": "Consider the routine around the object",
          "paragraphs": [
            "I conducted field research for the project alongside the concept and interaction work. My scope included human factors and ergonomics, so the question extended beyond what a reminder should display to how the object would be placed, reached and handled.",
            "The product brings several activities together: keeping medicine somewhere, noticing a signal, accessing the medicine and responding. Thinking through those activities gives the object a role within a routine rather than treating it as a separate alarm.",
            "I treated reach, recognition and response as questions to examine together. An object can be easy to notice and still awkward to access, so the physical arrangement needed attention alongside the reminder’s content."
          ]
        }
      ],
      "insights": [
        {
          "title": "A signal needs a related action",
          "paragraphs": [
            "A reminder can ask for attention, but the person still needs to understand what to do next. Connecting the signal with storage makes the physical arrangement part of the interaction: where someone looks and reaches matters alongside the reminder itself.",
            "There is also a difference between acknowledging a signal and taking medicine. The interaction needs to keep those meanings separate. Acknowledgement may tell the product that someone responded; it cannot establish what happened after that response."
          ]
        }
      ],
      "concept": [
        {
          "title": "Bring the reminder closer to the medicine",
          "paragraphs": [
            "My concept work covered the functions, interactions and physical use of a combined storage and reminder object. I wanted the reminder to relate to the medicine and the action around it, rather than remain a notification detached from the object.",
            "That introduces physical design questions as well as interface questions. The arrangement needs to make access understandable, while the reminder needs a response that people can recognise. The model makes those questions easier to discuss as something with a form and a place."
          ]
        }
      ],
      "design": [
        {
          "title": "Use the model to examine the arrangement",
          "paragraphs": [
            "The group model shows an upper storage area, a display and a lower tray. These elements communicate the intended arrangement beyond a flat screen, giving the concept a physical reference for discussing storage and access.",
            "My contribution was the concept, functions and interactions, with attention to human factors and ergonomics. Teammates contributed the mockups and documentation. Keeping that ownership clear matters because the photographed artifact represents the group’s work.",
            "For a further prototype, I would examine the sequence from noticing the reminder to reaching the medicine and responding. Placement and reach would need to be tried with the object, rather than inferred from the appearance of the model."
          ]
        }
      ],
      "outcome": [
        {
          "title": "A physical concept ready for closer examination",
          "paragraphs": [
            "The project produced a physical concept artifact over three weeks. It gave the group a way to communicate how storage, a display and a tray might belong together, and gave my interaction work a form that could be examined beyond a diagram.",
            "The next step is to try placement, reach, recognition and response within a real medicine routine. The model does not establish dispensing, sensing, comfort or medical performance. This project remains separate from both the Meditimer app and the medicine-routine survey."
          ]
        }
      ]
    },
    "note": "Group product concept. I developed the concept, functions and interactions, considered human factors and ergonomics, and conducted field research. Teammates contributed mockups and documentation. The original model is linked below."
  },
  {
    "slug": "toki",
    "title": "Toki",
    "headline": "What if your to-do list had a place on your desk?",
    "summary": "Toki pairs a mobile task list with an e-paper desk companion that keeps one task visible and provides controls for time tracking and completion.",
    "brief": "Design a phygital product for a chosen domain and brand. Use research and benchmarking to connect physical form, digital interaction and embedded electronics in a mockup and functional proof of concept.",
    "problem": "Tasks slip out of view when a planning app closes. After an interruption, reopening it means returning to the phone and its distractions.",
    "duration": "1 Month",
    "contribution": "Interaction Designer",
    "caseOverview": {
      "details": [
        {
          "label": "Discipline",
          "value": "Phygital Product Design"
        },
        {
          "label": "Role",
          "value": "Interaction Designer"
        },
        {
          "label": "Domain",
          "value": "Productivity"
        },
        {
          "label": "Duration",
          "value": "1 Month"
        },
        {
          "label": "Tools & Technologies",
          "value": "Figma, React Native, Expo, ESP32, Arduino IDE, 3D Printing"
        }
      ],
      "solution": "Plan on the phone, then keep the selected task on the desk. Use Toki to track time and choose when to pause or finish."
    },
    "image": tokiConceptImage,
    "source": "https://github.com/AnujR17/toki",
    "resources": [
      {
        "label": "Original group presentation",
        "href": "https://www.figma.com/design/ixlPXmsuwf48nzujHHUV4T/?node-id=434-98"
      },
      {
        "label": "Starting and restarting survey chart",
        "href": "https://www.figma.com/design/ixlPXmsuwf48nzujHHUV4T/?node-id=380-231"
      },
      {
        "label": "MUJI’s design philosophy",
        "href": "https://www.muji.com/jp/about/en/"
      },
      {
        "label": "MUJI CD player photo crop by Gwern, public domain",
        "href": "https://commons.wikimedia.org/wiki/File:Muji_NYC_inside_CD_players.jpg"
      },
      {
        "label": "MUJI clock photo crop by Gwern, public domain",
        "href": "https://commons.wikimedia.org/wiki/File:Muji_NYC_inside_clocks_2.jpg"
      },
      {
        "label": "App and device interaction documentation",
        "href": "https://github.com/AnujR17/toki/blob/main/docs/EXPERIENCE.md"
      },
      {
        "label": "Wireless update bench test",
        "href": "https://github.com/AnujR17/toki/blob/main/docs/OTA_ASSESSMENT.md"
      }
    ],
    "stages": {
      "research": [
        {
          "title": "Planning and focus at the desk",
          "paragraphs": []
        },
        {
          "title": "Research questions",
          "paragraphs": ["We looked at studying, writing and project work."],
          "steps": [
            "How do people keep track of unfinished work?",
            "What distracts them, and how do they resume?",
            "What helps them manage tasks and time?"
          ]
        },
        {
          "title": "What 35 respondents reported",
          "paragraphs": [
            "Exploratory Google Forms survey with students and workers across office, hybrid and remote settings. It used ratings, multiple-choice questions and an optional written response. Results reflect reported habits."
          ]
        },
        {
          "title": "Published research",
          "paragraphs": [
            "Reviewed for the case study. Trafton et al. studied how preparation can help resume an interrupted task. Stothart et al. found that a phone notification can disrupt attention even without a response."
          ],
          "links": [
            {
              "label": "Trafton et al. (2003)",
              "href": "https://www.sciencedirect.com/science/article/abs/pii/S1071581903000235"
            },
            {
              "label": "Stothart et al. (2015)",
              "href": "https://pubmed.ncbi.nlm.nih.gov/26121498/"
            }
          ]
        },
        {
          "title": "How existing tools work",
          "paragraphs": [
            "We compared what stays visible and what changes as people plan, work and return."
          ]
        },
        {
          "title": "MUJI product references",
          "paragraphs": [
            "We studied familiar controls, shape and finish in Naoto Fukasawa’s MUJI appliances and in MUJI’s clocks and desk accessories."
          ],
          "links": [
            {
              "label": "MUJI and Naoto Fukasawa",
              "href": "https://www.muji.com/ph/flagship/huaihai755/archive/fukazawa.html"
            },
            {
              "label": "MUJI appliance design references",
              "href": "https://randomwire.com/muji-appliances-by-naoto-fukasawa/"
            },
            {
              "label": "MUJI Station Clock",
              "href": "https://www.muji.us/products/station-clock"
            }
          ]
        }
      ],
      "insights": [
        {
          "title": "Keep the task in view",
          "paragraphs": [
            "A note and timer already make a task and its duration visible. Toki explores what happens when a task planned digitally needs to stay in view after the phone is put away."
          ]
        }
      ],
      "concept": [
        {
          "title": "One plan, two surfaces",
          "paragraphs": []
        },
        {
          "title": "Conceptual countdown dial",
          "paragraphs": [
            "The sketch proposes a dial that makes allotted time visible. Finishing the task is a separate decision. The built prototype tracks elapsed time on e-paper."
          ],
          "figures": [
            {
              "src": "/portfolio/toki/sketch.webp",
              "alt": "Original form sketch showing the display, three touch points and a separate dial",
              "width": 961,
              "height": 961,
              "caption": "Original group form sketch from the case study PDF, page 2"
            }
          ]
        }
      ],
      "design": [
        {
          "title": "Plan on the phone",
          "paragraphs": [
            "Write captures tasks offline. Tasks manages order and history. The Device tab handles connection and maintenance."
          ],
          "figures": [
            {
              "src": "/portfolio/toki/app-write.png",
              "alt": "Toki Write screen with Toki Case Study in the writing area and the Add to Tasks button below it",
              "width": 780,
              "height": 1320,
              "caption": "Captured from the running Expo web build of AnujR17/toki at b032909. The capture used browser-only adapters for native services and corrected Web tab-label clipping."
            },
            {
              "src": "/portfolio/toki/app-tasks.png",
              "alt": "Toki Tasks screen with Toki Case Study at the top of the queue, followed by two other example tasks",
              "width": 780,
              "height": 1320,
              "caption": "Captured from the same Expo web build after creating three example tasks through Write."
            }
          ]
        },
        {
          "title": "Work from the desk",
          "paragraphs": [
            "The display shows one task, its position in the queue and session status. E-paper refresh is slow.",
            "Tap left or right to browse. Tap centre to start elapsed time. Hold left to pause or centre to mark the task complete."
          ],
          "figures": [
            {
              "src": "/portfolio/toki/device.webp",
              "alt": "The prototype’s e-paper display showing Toki Case Study and prompting a centre tap to begin",
              "width": 480,
              "height": 456,
              "caption": "Detail from the actual prototype video, with the assembled device visible in Outcome"
            }
          ]
        },
        {
          "title": "Enclosure and electronics",
          "paragraphs": [
            "Rounded edges and front-facing controls translate the MUJI study into a printed enclosure. The circuit drawing shows how the ESP32 connects to the display and controls."
          ],
          "figures": [
            {
              "src": "/portfolio/toki/enclosure.webp",
              "alt": "Empty printed Toki enclosure showing the display opening and side grille",
              "width": 875,
              "height": 691,
              "caption": "Photograph of the original enclosure from the case study PDF, page 3"
            },
            {
              "src": "/portfolio/toki/circuit.webp",
              "alt": "Original circuit drawing connecting the ESP32, display, touch sensors, motor driver and speaker",
              "width": 1200,
              "height": 896,
              "caption": "Group electronics concept drawing from the case study PDF, page 5"
            }
          ]
        }
      ],
      "outcome": [
        {
          "title": "The prototype in use",
          "paragraphs": []
        },
        {
          "title": "What the prototype demonstrates",
          "paragraphs": [
            "The working demo shows a touch changing the task on the e-paper display. A separate bench test verified a wireless update, Bluetooth reconnection after reboot and retention of three tasks. The repository records software build and state checks."
          ],
          "video": {
            "src": "/portfolio/toki/device-demo.mp4",
            "poster": "/portfolio/toki/device.webp",
            "label": "Working Toki prototype changing the task shown on the e-paper display"
          }
        },
        {
          "title": "What still needs testing",
          "paragraphs": [
            "End-to-end hardware and audio still need testing. The motorised dial is inactive pending a reliable position reference. A follow-up test would compare task resumption with Toki and participants’ existing tools."
          ]
        }
      ]
    },
    "note": "Group project by Anshu Kumar, Anuj Rai and Kalyani Agarwal, guided by Umang Shah. The desk render and form sketch show the concept. The prototype still and video document the build."
  },
  {
    "slug": "india-in-orbit",
    "title": "India in Orbit",
    "headline": "From everyday satellite uses to an orbit explorer",
    "summary": "India in Orbit is an interactive website about satellites, their uses and the orbital system. I designed and built a reading sequence that leads from familiar applications into mission history and an explorer.",
    "brief": "Build an explorable introduction to satellites, using familiar applications to give visitors a reason to examine orbital regimes and mission history.",
    "problem": "People encounter the effects of satellites through navigation, communication and observation, but the orbital system itself is difficult to see. The experience needs to connect familiar uses with technical detail without requiring visitors to understand everything at once.",
    "duration": "3 weeks",
    "contribution": "Designed and developed the interactive website, with guidance from Dr Anupam Rana",
    "image": {
      "src": "/portfolio/india-in-orbit.png",
      "alt": "India in Orbit website with a star field, introduction and rendered Earth",
      "width": 1280,
      "height": 850,
      "caption": "Opening captured from the live India in Orbit website"
    },
    "live": "https://india-in-orbit.vercel.app",
    "liveLabel": "Open India in Orbit",
    "source": "https://github.com/AnujR17/india-in-orbit",
    "stages": {
      "research": [
        {
          "title": "Find an entry into a technical subject",
          "paragraphs": [
            "The project brings together satellite roles, orbital regimes and mission history. Communication, navigation and observation provide familiar starting points for a subject whose larger structure is difficult to see directly.",
            "I worked on how that material could become an experience someone can enter and explore. Content order matters here: introducing an orbit before giving it a purpose asks the visitor to understand a technical category without knowing why it matters.",
            "The website’s methodology and credits identify the source and implementation context. They belong alongside the presentation because a rendered scene and a data-driven view can look equally authoritative while serving different purposes."
          ]
        }
      ],
      "insights": [
        {
          "title": "Give the detail a reason to be there",
          "paragraphs": [
            "The implemented sequence introduces what satellites do before asking a visitor to examine orbital structure. This creates a connection between an everyday activity and the more technical material that follows.",
            "A reading sequence and an explorer also serve different needs. One can introduce the subject in an order; the other can let someone stay with a particular question. I wanted the website to support both kinds of attention."
          ]
        }
      ],
      "concept": [
        {
          "title": "Combine a reading path with an explorer",
          "paragraphs": [
            "I combined a scroll-led introduction, mission milestones and an orbit explorer. The introduction establishes context, the milestones place missions in a sequence, and the explorer offers a more direct way into the orbital system.",
            "The purpose of the visual scenes is to support that progression. They give the subject a visible form, while the structure keeps the experience from becoming only something to look at."
          ]
        }
      ],
      "design": [
        {
          "title": "Move from applications to the larger system",
          "paragraphs": [
            "Rendered scenes, satellite roles and mission milestones organise the website. Rather than putting every explanation into the opening, the experience introduces the subject in stages and provides an explorer for closer inspection.",
            "The source includes satellite data and propagation logic alongside the presentation. The opening image shown here is one part of the website; the live version contains the implemented sequence and explorer."
          ]
        },
        {
          "title": "Make the implementation part of the design work",
          "paragraphs": [
            "I designed and developed the website, with guidance from Dr Anupam Rana. Building the experience meant working on how information, rendered scenes and interaction belong together, rather than stopping with a set of screens.",
            "A working scene makes the design available to inspect, but it also raises practical questions about loading, mobile performance and alternative ways to access the content. Those questions belong to the experience just as much as the opening composition."
          ]
        }
      ],
      "outcome": [
        {
          "title": "A live information experience",
          "paragraphs": [
            "The result is a working website with a narrative sequence and an orbit explorer. It demonstrates how I organise a technical subject and carry that structure into an interactive implementation.",
            "The next evaluation should ask whether a visitor can answer a useful satellite question after using it. That review should also check mobile performance, alternatives to 3D, data freshness and the distinction between illustrative scenes and current data. The live build establishes the interaction, not a measured learning outcome or scientific accuracy."
          ]
        }
      ]
    },
    "note": "Designed and developed by Anuj Rai, with guidance from Dr Anupam Rana. The original website and repository retain asset, data and implementation-assistance credits."
  }
];

export const projects: Project[] = [...mainProjects, ...researchProjects, ...additionalProjects];
