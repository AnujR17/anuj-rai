import { researchProjects } from "@/data/research-projects";
import type { Project } from "@/data/case-study";
import { additionalProjects } from "@/data/work-projects";
export type { Project, ProjectImage } from "@/data/case-study";

const tokiConceptImage = {
  "src": "/portfolio/toki.jpg",
  "alt": "Group concept visualization of Toki with a display, three touch controls and a large timer dial",
  "width": 830,
  "height": 830,
  "caption": "Original group visualization from Figma ixlPXmsuwf48nzujHHUV4T, node 380:368"
};

export const mainProjects: Project[] = [
  {
    "slug": "medicine-app",
    "title": "Meditimer app",
    "headline": "Recording a dose and knowing when to follow up",
    "summary": "Meditimer gives the person taking medicine a daily record and gives their caregiver a separate view of the routine. I designed the two interfaces around the different decisions each person needs to make.",
    "brief": "Design a medicine app that supports recording doses throughout the day and gives a caregiver enough context to decide when to check in.",
    "problem": "The person taking medicine needs to see what is due and record an update. The caregiver needs to understand that record without treating every missing update as a missed dose. The same routine needs to make sense from both sides.",
    "duration": "3 weeks",
    "contribution": "Designed and developed the app independently, including the medicine-taker and caregiver interfaces",
    "visual": "medicine",
    "resources": [
      {
        "label": "Medicine-taker interface in Figma",
        "href": "https://www.figma.com/design/on1gbKHkUo4CLZ38uCiSza/?node-id=797-3727"
      },
      {
        "label": "Caregiver interface in Figma",
        "href": "https://www.figma.com/design/on1gbKHkUo4CLZ38uCiSza/?node-id=826-1236"
      }
    ],
    "stages": {
      "research": [
        {
          "title": "Understanding the two sides of a routine",
          "paragraphs": [
            "The related medicine-routine survey looks at storage, timing and reminder preferences through caregiver and direct senior response paths. I used that wider context to think about how support fits into a day, rather than treating another notification as the whole product.",
            "The useful distinction for this app is between doing something and following what someone else has recorded. A person taking medicine needs an immediate action. A caregiver needs context before deciding whether to call or send a reminder.",
            "The survey is a separate research project, linked through the portfolio. It provides background for these questions; the interfaces shown here are the material for examining the app’s actual design."
          ]
        }
      ],
      "insights": [
        {
          "title": "A daily total needs a dose-level explanation",
          "paragraphs": [
            "A progress count can give a quick sense of the day, but it cannot explain which medicine still needs attention. The caregiver view brings the overall record and individual doses together, so the summary has something concrete behind it.",
            "The other distinction is what a record can mean. An update can show that someone marked a dose as taken. An empty record leaves a question open. That affects both the language of the interface and the follow-up it encourages."
          ]
        }
      ],
      "concept": [
        {
          "title": "Give each person a different starting point",
          "paragraphs": [
            "I kept the medicine-taker view focused on the current dose and the caregiver view focused on understanding the day. Both refer to a medicine routine, but they do not need to open with the same information.",
            "This keeps the immediate recording action close to the person doing it, while giving the caregiver a way to move from a summary to a specific concern. Calling remains a direct option when a record alone cannot answer the question."
          ]
        }
      ],
      "design": [
        {
          "title": "Keep the medicine and its action together",
          "paragraphs": [
            "The medicine-taker screen places the current dose beside “Mark as taken”. Morning, afternoon and night organise the rest of the day. The recording action belongs to a specific medicine, rather than a detached confirmation at the top of the page.",
            "That relationship is the part I want the interface to make clear: which dose am I looking at, and which record will this action change? The daily progress remains visible without replacing the individual dose information."
          ]
        },
        {
          "title": "Let a caregiver read before acting",
          "paragraphs": [
            "The caregiver screen combines daily progress, medicine details and a call action. It supports moving from an overview to a dose and then to a conversation if a follow-up is needed.",
            "Sample names and medicine details make the layouts readable as a daily routine. They let the recording action, day-level progress and follow-up controls be considered together."
          ]
        }
      ],
      "outcome": [
        {
          "title": "Two interfaces and a clearer question to test",
          "paragraphs": [
            "I designed and developed this as an individual app project. The original interfaces establish the two perspectives and their main actions; they give me a concrete way to discuss how recording and follow-up should work together.",
            "The next evaluation should follow one dose through an unrecorded state, a recorded state and an update awaiting confirmation. I want to know whether both people understand those differences and choose an appropriate next action. The screens alone do not establish a deployed synchronization service or a change in medicine-taking behaviour."
          ]
        }
      ]
    },
    "note": "Original medicine-taker and caregiver interfaces, linked below. This independent app is separate from the physical Meditimer group project and the medicine-routine survey."
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
    "summary": "Toki explores how digital task management can extend into the physical workspace through a connected desk companion. It pairs a mobile app for organising tasks with an e-paper device that keeps the current task visible, with physical controls to track time and mark work complete.",
    "brief": "Explore the design of a phygital product by studying a chosen domain and brand. Identify opportunities through user research, product benchmarking, and an understanding of the brand's design language.\n\nTranslate these findings into a product concept that integrates physical form, digital interaction, and embedded electronics, supported by an aesthetic mockup and functional proof of concept.",
    "problem": "While digital productivity tools help people capture and organise tasks, those tasks often slip out of sight once the app is closed. After an interruption, resuming work can mean returning to the same phone where notifications, messages, and other distractions compete for attention.\n\nThe challenge lies in maintaining task visibility and continuity without introducing additional distractions into the workspace.",
    "duration": "1 Month",
    "contribution": "Interaction Designer",
    "caseOverview": {
      "details": [
        {
          "label": "Discipline",
          "value": "Phygital Product Design  "
        },
        {
          "label": "Role",
          "value": "Interaction Designer  "
        },
        {
          "label": "Domain",
          "value": "Productivity  "
        },
        {
          "label": "Duration",
          "value": "1 Month  "
        },
        {
          "label": "Tools & Technologies",
          "value": "Figma, React Native, Expo, ESP32, Arduino IDE, 3D Printing"
        }
      ],
      "solution": "Toki reframes the to-do list as a series of intentional work sessions. Rather than managing everything at once, users prioritise a task, allocate time to it, and maintain a clear sense of progress as they work.\n\nThe experience establishes a simple rhythm between planning, acting, and returning, making time more perceptible while keeping the pace and completion of work in the user's control."
    },
    "image": tokiConceptImage,
    "source": "https://github.com/AnujR17/toki",
    "resources": [
      {
        "label": "Watch the assembled prototype",
        "href": "/portfolio/toki/device-demo.mp4"
      },
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
          "title": "Understanding how people plan, work, and return",
          "paragraphs": [
            "The research focused on activities that require sustained attention at a desk, such as studying, writing, and project work. It examined how people organise what they need to do, manage their time, and resume an activity after an interruption.",
            "An exploratory survey of 35 respondents was supported by a study of existing productivity tools and MUJI's approach to product form and interaction."
          ]
        },
        {
          "title": "What we wanted to understand",
          "paragraphs": [
            "Three questions guided the investigation:"
          ],
          "steps": [
            "How do people keep track of activities they intend to finish?",
            "What competes for their attention, and what happens when they return after an interruption?",
            "Which methods and objects already help them manage their activities and time?"
          ]
        },
        {
          "title": "Surveying existing working habits",
          "paragraphs": [
            "The Google Forms questionnaire combined agreement ratings, multiple-choice questions and an optional written response to examine planning preferences, distractions, working routines and interruption recovery. Respondents included students and people in office, hybrid, remote and other circumstances.",
            "Twenty respondents reported difficulty getting back to focused work after an interruption. Twenty-six selected phone or social media use among their distractions. For task organisation, fourteen primarily used physical methods, twelve used physical and digital methods equally, six primarily used digital methods, and three selected neither listed approach.",
            "The survey describes what respondents reported, not observed working behaviour or proof that a physical device improves attention."
          ],
          "surveyResults": true
        },
        {
          "title": "Context from published research",
          "paragraphs": [
            "I reviewed these two studies while preparing this case study.",
            "Research on interrupted tasks offers additional context for the difficulty of resuming an activity. Trafton and colleagues (2003) examined how preparing to resume a suspended goal can affect returning to a task. Stothart and colleagues (2015) found that receiving phone notifications disrupted performance in an attention-demanding experiment even when participants did not interact with the phone.",
            "These studies help situate the survey responses, but neither tests Toki or demonstrates that an always-visible task is an effective intervention."
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
          "title": "Examining existing approaches",
          "paragraphs": [
            "The parallel product study examined different ways of organising activities, representing time, and interacting with information.",
            "Written lists and planners provide a persistent reference for unfinished activities. Visual timers make the passage of time easier to observe, while physical time trackers introduce tangible actions into the process. Digital planning tools offer greater flexibility in organising and updating information.",
            "The comparison considered what remains visible during an activity, how time is communicated, and what interactions are required to move between planning and carrying out work."
          ],
          "patterns": [
            {
              "label": "Written list",
              "sequence": "Write a task, leave it visible, revisit it or mark it done."
            },
            {
              "label": "Visual timer",
              "sequence": "Set a duration, glance at the remaining time, then reset."
            },
            {
              "label": "Physical tracker",
              "sequence": "Move the object, log an activity, then change or stop the session."
            },
            {
              "label": "Digital planner",
              "sequence": "Capture an activity, organise it, then update it."
            }
          ]
        },
        {
          "title": "Understanding MUJI's design language",
          "paragraphs": [
            "MUJI's product philosophy informed a study of how everyday objects communicate their purpose through form, material, and interaction.",
            "Appliances designed by Naoto Fukasawa, along with MUJI's clocks and desk accessories, provided references for examining softened geometric forms, restrained control layouts, surface finishes, and familiar methods of interaction.",
            "The study looked beyond visual simplicity to understand how individual details serve a practical purpose. Rounded surfaces, control placement, and the integration of functional elements were examined as part of the object's use, rather than decoration alone."
          ],
          "links": [
            {
              "label": "MUJI and Naoto Fukasawa",
              "href": "https://www.muji.com/ph/flagship/huaihai755/archive/fukazawa.html"
            },
            {
              "label": "MUJI appliance design references",
              "href": "https://randomwire.com/muji-appliances-by-naoto-fukasawa/"
            }
          ]
        }
      ],
      "insights": [
        {
          "title": "Getting back was its own problem",
          "paragraphs": [
            "Nine of the 18 people who found it easy to start work still said it was difficult to regain focus after an interruption. That shifted our attention to what people see when they come back to the desk.",
            "The phone was also a common source of distraction. We used it for writing and ordering tasks, then put the actions needed during work on Toki."
          ]
        }
      ],
      "concept": [
        {
          "title": "One task on the display, time on the dial",
          "paragraphs": [
            "Our early concept put a list, ambient sound and reminders on the desk. I narrowed the interaction to one selected task and a dial for the time you want to spend on it.",
            "The MUJI reference shaped how much we asked of the object. You choose a task with the touch controls, then set a duration with the dial. When the countdown reaches zero, you can keep working and mark the task done when you’re ready."
          ],
          "figures": [
            tokiConceptImage,
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
          "title": "The printed enclosure",
          "paragraphs": [
            "The rounded shell puts the e-paper and three touch points on the face. The port, switch and speaker grille sit on the side. We printed the case and cover as two pieces."
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
        },
        {
          "title": "From the phone to the desk",
          "paragraphs": [
            "In the connected build, the phone holds drafts and the full list. Toki receives the first four unfinished tasks when the device is connected and idle."
          ],
          "steps": [
            "Write and order tasks in the Android app.",
            "Use the outer touch controls to browse the four-task queue.",
            "Tap the middle control to start tracking time. Hold it to mark the task done.",
            "See time spent and completed tasks in Activity."
          ],
          "figures": [
            {
              "src": "/portfolio/toki/device.webp",
              "alt": "Assembled Toki prototype showing a selected task on its e-paper screen, above three touch controls",
              "width": 480,
              "height": 456,
              "caption": "Still from the supplied video of the assembled Toki prototype"
            }
          ]
        },
        {
          "title": "What the electronics changed",
          "paragraphs": [
            "The e-paper can take around 20 seconds to refresh. The firmware handles Bluetooth separately so sync can complete while the screen catches up. The working build tracks elapsed time. The countdown dial stays inactive until the motor has a reliable zero position."
          ]
        }
      ],
      "outcome": [
        {
          "title": "A working desk prototype",
          "paragraphs": [
            "The prototype video shows a touch changing which task is displayed. At the bench, a wireless firmware update completed, Bluetooth reconnected after reboot and all three stored tasks were still there."
          ]
        },
        {
          "title": "What I’d test next",
          "paragraphs": [
            "Give someone a task, interrupt them, and see what they do when they return. I’d compare Toki with the note, app or timer they already use to find out whether keeping the task visible makes it easier to pick up."
          ]
        }
      ]
    },
    "note": "Group project by Anshu Kumar, Anuj Rai and Kalyani Agarwal, guided by Umang Shah. The opening artwork is the original concept rendering. The enclosure photo and the later device footage document the physical build."
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
