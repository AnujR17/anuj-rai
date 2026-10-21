import type { Project } from "@/data/case-study";

export const researchProjects: Project[] = [
  {
    "slug": "gandhinagar-roundabouts",
    "title": "Gandhinagar roundabout study",
    "summary": "I studied how vehicles enter and move through Gandhinagar’s roundabouts, then explored road-communication concepts. The fieldwork and feedback pushed the project beyond treating congestion as an awareness problem alone.",
    "image": {
      "src": "/portfolio/research/gandhinagar-field.jpg",
      "alt": "Mixed traffic at Reliance Circle, with a truck, cars, two-wheelers, and a service-road entry.",
      "width": 825,
      "height": 460,
      "caption": "Field photograph reproduced from the research report, page 6."
    },
    "note": "Fieldwork, analysis and communication concepts by Anuj Rai. Original photographs, map and poster concepts come from the 29-page research report. Poster feedback was qualitative; no campaign was deployed as part of the documented study.",
    "headline": "How vehicles enter and move through Gandhinagar’s roundabouts",
    "brief": "Investigate movement at selected Gandhinagar roundabouts, use field and traffic-record material to understand the situation, and develop communication concepts that can be discussed with road users and traffic police.",
    "problem": "Service-road entries, overlapping approaches and unclear signals leave drivers, pedestrians and traffic police negotiating movement at busy junctions. A useful intervention needs to address the decisions people actually face at those points.",
    "contribution": "Conducted the field study, analysed traffic records and developed communication concepts",
    "stages": {
      "research": [
        {
          "title": "Look beyond the vehicles waiting in the circle",
          "paragraphs": [
            "I visited during peak and non-peak periods, spoke with traffic police, and had short interactions with road users and local guards. I considered those accounts alongside accident records and planning material.",
            "The observation covered service-road merges, wrong-side entries, responses to police hand signals, heavy vehicles and pedestrians navigating occupied footpaths. The question became how those movements interact, rather than how much space parked vehicles occupy.",
            "The available station files contain 98 Sector-21 records, 87 Sector-7 records and 113 Infocity records after excluding its header. The total is 298 record rows. Those records provide context, but they do not measure traffic exposure or capture every crash."
          ]
        }
      ],
      "insights": [
        {
          "title": "The entry changes what happens inside",
          "paragraphs": [
            "The field account describes vehicles bypassing queues along service roads and merging sharply into the circle. One entry could encourage others to follow. Meanwhile, drivers and officers continued negotiating movement through manual regulation.",
            "The annotated map helped make those overlapping approaches visible. It brought the point of entry into the design discussion, alongside signals and enforcement. A message placed somewhere around the junction would need to relate to a real decision, not simply repeat that people should follow rules."
          ],
          "figures": [
            {
              "src": "/portfolio/research/gandhinagar-flow-map.jpg",
              "alt": "Annotated Reliance Chowkdi map tracing overlapping approaches from Sargasan, Kudasan, the commercial area, and GIFT City, including service-road movements.",
              "width": 931,
              "height": 646,
              "caption": "Traffic-flow annotation reproduced from the report, page 10. A field interpretation, not a measured traffic-flow model."
            }
          ]
        }
      ],
      "concept": [
        {
          "title": "Examine what a message asks someone to do",
          "paragraphs": [
            "I explored emotional accountability and informational guidance as different approaches to road communication. One draws attention to consequences; the other tries to support a decision at the junction.",
            "The comparison also raised a question of credibility. A message that implies surveillance asks people to believe a system exists. Its wording and imagery need to be considered alongside the actual conditions of the road."
          ]
        }
      ],
      "design": [
        {
          "title": "Use the concepts to discuss tone and credibility",
          "paragraphs": [
            "The report describes a two-day pilot in which digital poster mockups were shown on phones to students, commuters and traffic police. This provided qualitative reactions to the concepts before any suggestion of a roadside deployment.",
            "The examples below explore regret and public accountability. The fallen motorcycle places attention on consequences, while the simulated roadside screen makes accountability public. The screen belongs to the campaign concept; it was not an installed surveillance system."
          ],
          "figures": [
            {
              "src": "/portfolio/research/poster-regret.jpg",
              "alt": "Regret-based campaign mockup showing a fallen motorcycle with the message: To save a few seconds, they lost hours.",
              "width": 1440,
              "height": 1024,
              "caption": "Regret-based poster mockup, report page 21."
            },
            {
              "src": "/portfolio/research/poster-accountability.jpg",
              "alt": "Accountability-themed campaign mockup with a simulated roadside screen and the message: Some mistakes don't stay private.",
              "width": 1034,
              "height": 736,
              "caption": "Accountability-themed mockup, report page 21. The pictured screen is part of the concept."
            }
          ]
        }
      ],
      "outcome": [
        {
          "title": "The feedback changed the role of communication",
          "paragraphs": [
            "Reflective messages received more favourable reactions from some respondents and officers. Shame-based concepts raised concerns about discomfort, hostility and credibility if no camera actually existed.",
            "A delivery rider’s feedback also challenged the idea that awareness alone was enough: livelihood pressure could outweigh the message. Reliable signals and consistent enforcement remained important across the feedback. Communication became a supporting intervention rather than the proposed answer to the whole junction."
          ]
        },
        {
          "title": "What I would examine next",
          "paragraphs": [
            "The project produced a field account, an annotated map and communication concepts informed by qualitative reactions. The report calls the pilot A/B testing, but does not document randomized allocation, participant counts or measured changes in driving.",
            "The next question is whether clear guidance at the point of entry, supported by reliable traffic management, changes decisions in practice. That needs a field evaluation designed around actual movement, not just reactions to a poster."
          ]
        }
      ]
    }
  },
  {
    "slug": "medicine-storage-research",
    "title": "Medicine, storage, and reminders",
    "summary": "I analysed medicine-routine survey responses to compare how people currently manage storage and reminders with the support they would prefer. The most useful result was a set of product questions grounded in those differences.",
    "image": {
      "src": "/portfolio/research/medicine-reminder-fit.png",
      "alt": "Survey chart comparing existing reminder habits with preferred styles, including fixed routines, caregiver reminders, voice reminders, alarms, and notifications.",
      "width": 2367,
      "height": 1369,
      "caption": "Original reminder-fit chart from the Medicine Storage and Reminder analysis."
    },
    "live": "https://medicine-storage-and-reminder.vercel.app",
    "liveLabel": "Read the research presentation",
    "source": "https://github.com/AnujR17/Medicine-Storage-and-Reminder",
    "note": "Exploratory Google Forms survey analysis. The report, notebook and charts belong to this research project, which is separate from the Meditimer app and physical Meditimer concept.",
    "headline": "Comparing medicine routines with reminder preferences",
    "brief": "Analyse responses about medicine storage, timing and reminders, then identify practical directions for further product exploration.",
    "problem": "A storage or reminder product needs to fit existing routines and device familiarity. Caregiver accounts can help describe those routines, but they are different from a person describing their own medicine use.",
    "contribution": "Analysed the medicine-routine survey responses and presented findings about storage and reminder preferences",
    "stages": {
      "research": [
        {
          "title": "Keep the two response paths distinct",
          "paragraphs": [
            "The CSV contains 52 responses across 43 columns. There are 48 caregiver-path responses and 7 self-managed senior-path responses, with 3 people using both paths. I treated them as two perspectives within the same sample, not 55 independent participants.",
            "The questions cover current storage, timing difficulties, device familiarity, reminder preferences, product formats and price expectations. Together, they let me compare what people already do with the support they say they would choose.",
            "That distinction matters when reading caregiver answers. A caregiver’s account can describe support and concerns around a routine, while a direct senior response speaks from a different position."
          ]
        }
      ],
      "insights": [
        {
          "title": "A preference is more useful when compared with a habit",
          "paragraphs": [
            "Among 46 nonblank caregiver-path answers about preferred reminders, 21 selected voice. For current reminder habits, 25 of 46 selected a fixed routine. These responses suggest exploring how a new reminder might fit around a routine that already exists.",
            "The counts also need their denominators. Not everyone answered every question, so comparing percentages without the number of answers can make two findings appear more directly comparable than they are."
          ]
        }
      ],
      "concept": [
        {
          "title": "Explore support without replacing the whole routine",
          "paragraphs": [
            "The direction favours familiar storage and flexible reminder behaviour. Voice is one option to prototype, alongside control over when and how a reminder appears.",
            "The question I would carry into product work is how someone could adjust that support without learning a complicated new system. Choosing voice in a survey identifies an option worth trying; it does not tell us how a voice reminder should sound or behave in a household."
          ]
        }
      ],
      "design": [
        {
          "title": "Make current and preferred support visible together",
          "paragraphs": [
            "The notebook standardizes city names and multi-select responses for comparison. The city-tier groups are analyst-defined, and the small direct senior-response subset needs to remain visible when interpreting a comparison.",
            "The research presentation brings existing habits and preferred reminder styles together in the same chart. That gives the reader a way to examine a possible fit, rather than reading a preferred feature as a complete product brief."
          ]
        }
      ],
      "outcome": [
        {
          "title": "A research direction to prototype",
          "paragraphs": [
            "The analysis produced a research presentation and a set of questions about storage familiarity, reminder choice and control. It gives further design work a more specific starting point than simply adding an alarm.",
            "The next step is to try a reminder within an actual medicine routine and examine recognition, timing and response. The survey does not establish adoption, medical benefit or a causal relationship between preferences and behaviour. Those require different evidence."
          ]
        }
      ]
    }
  },
  {
    "slug": "consumer-experience",
    "title": "Consumer experience in retail",
    "summary": "I analysed a supplied retail-research dataset to examine what respondents value in a store. The descriptive ranking brought practical facilities into focus alongside the visual experience.",
    "image": {
      "src": "/portfolio/research/consumer-attribute-ranking.png",
      "alt": "Repository chart ranking store attributes, with cleanliness, parking, and digital payment above promotional attributes in this sample.",
      "width": 3559,
      "height": 2955,
      "caption": "Original descriptive ranking from the Consumer Experience repository."
    },
    "live": "https://consumer-experience.vercel.app",
    "liveLabel": "Read the analysis site",
    "source": "https://github.com/AnujR17/Consumer-Experience",
    "note": "Analysis of a supplied retail-research dataset. I contributed the analysis and presentation, not recruitment. The linked report and notebooks retain the detailed methods and outputs.",
    "headline": "What shoppers value in a store",
    "brief": "Analyse a supplied dataset covering store attributes and visual merchandising, and examine descriptive patterns alongside exploratory statistical models.",
    "problem": "A store experience includes facilities, payment, checkout and visual presentation. The analysis asks which attributes matter to this sample and how far the available responses can support a design decision.",
    "contribution": "Analysed a supplied research dataset using descriptive rankings and exploratory statistical methods",
    "stages": {
      "research": [
        {
          "title": "Understand what the dataset can answer",
          "paragraphs": [
            "The notebook and presentation report 154 responses, with questions about store attributes and visual merchandising. I worked with this supplied dataset as an analysis task; collecting the responses was outside my contribution.",
            "I looked at descriptive ratings alongside reliability checks, factor analysis, association tests and clustering. These methods ask different questions, so their results need to be interpreted separately rather than combined into one claim about customer experience."
          ]
        }
      ],
      "insights": [
        {
          "title": "Practical facilities deserve attention",
          "paragraphs": [
            "The descriptive ranking places cleanliness, parking and digital payment above several promotional attributes in this sample. That gives the analysis a concrete design question: are the practical parts of a visit getting enough attention alongside its visual presentation?",
            "An importance rating does not explain an entire shopping journey. It can direct attention to a part of the experience, but it does not establish where a shopper encountered difficulty or what caused a purchase."
          ]
        }
      ],
      "concept": [
        {
          "title": "Turn the ranking into a question for a store visit",
          "paragraphs": [
            "The direction I would examine is making facilities, payment and checkout support easy to understand before adding a more elaborate visual experience. The ranking gives a reason to investigate those basics.",
            "That is a hypothesis for further research, not an implemented retail redesign. A useful next study would connect the rated attributes to what people actually notice, look for and do during a visit."
          ]
        }
      ],
      "design": [
        {
          "title": "Lead with the descriptive comparison",
          "paragraphs": [
            "The ranking chart provides a direct entry into the analysis. It lets someone compare the attributes before encountering the more technical factor and cluster models.",
            "The notebooks contain the deeper analysis, including reliability checks and association tests. Keeping the descriptive view understandable matters because a reader should be able to see the original question without first having to interpret every statistical output."
          ]
        }
      ],
      "outcome": [
        {
          "title": "Separate a useful finding from a stronger claim",
          "paragraphs": [
            "The descriptive ranking is the clearest result in this version. Model-fit figures differ between the summary and notebook, so stronger factor and segmentation claims remain unresolved.",
            "The work demonstrates analysis and a way to identify questions for a store or service study. It does not establish universal shopper segments or a causal effect on sales. I would strengthen it by reconciling the model outputs and examining the practical priorities in an actual store journey."
          ]
        }
      ]
    }
  },
  {
    "slug": "skidge",
    "title": "Skidge / graduate outcomes",
    "summary": "Skidge explores graduate profiles, skills, starting salaries and job-demand material. Working through the analysis brought a basic question into focus: what does a readiness score actually measure?",
    "image": {
      "src": "/portfolio/research/skidge-gpa-salary.png",
      "alt": "Repository scatter plot showing a broad range of starting salaries across college GPA values, with a small number of high-salary outliers.",
      "width": 1482,
      "height": 1030,
      "caption": "Original GPA and starting-salary plot from Skidge’s analysis folder."
    },
    "live": "https://skidge.vercel.app",
    "liveLabel": "Open the project report",
    "source": "https://github.com/AnujR17/Skidge",
    "note": "Exploratory graduate-data analysis and web report. Constructed scores describe the analysis approach; they are not individual hiring recommendations or a validated employment assessment.",
    "headline": "Examining graduate profiles, skills and starting salaries",
    "brief": "Explore graduate and job-demand data, compare descriptive relationships, and examine how different definitions of readiness change the interpretation.",
    "problem": "Salary-derived labels and weighted skills scores measure different things. If either is treated as a validated measure of employability, the conclusion can go further than the data supports.",
    "contribution": "Explored graduate and job-demand data through notebooks, charts and a web report",
    "stages": {
      "research": [
        {
          "title": "Look at the spread before reducing it to a score",
          "paragraphs": [
            "The project examines academic scores, skills, graduate salaries and job-demand material through notebooks, charts and a web report. The GPA and salary plot provides a starting point because it shows variation across the sample.",
            "A broad salary spread raises further questions about the variables and their definitions. It does not, on its own, show that GPA is irrelevant or that another single score can explain a graduate’s suitability for work."
          ]
        }
      ],
      "insights": [
        {
          "title": "Two definitions can produce two different answers",
          "paragraphs": [
            "The notebook uses a salary-derived label and an analyst-weighted skills score in different analyses. One is based on a recorded outcome; the other is a constructed combination of inputs. They should not be treated as interchangeable measures of readiness.",
            "There is a further problem when a model predicts a score from the same inputs used to construct it. A close match may show that the model reproduces the formula. It does not independently establish that the score measures performance at work."
          ]
        }
      ],
      "concept": [
        {
          "title": "Keep the measure attached to the claim",
          "paragraphs": [
            "The useful direction is to make the definition of a target explicit before interpreting a model result. What went into the score, what was used to predict it and what would count as independent evidence need separate answers.",
            "This changes the design question too. A score intended to inform a personal decision needs a much stronger explanation than a chart used to explore a dataset. The report remains an exploration of the latter."
          ]
        }
      ],
      "design": [
        {
          "title": "Show variation without assigning a verdict",
          "paragraphs": [
            "The GPA and starting-salary plot shows the spread of salaries across academic scores, including a small number of high-salary outliers. It gives the reader a view of the distribution before any score is introduced.",
            "The notebooks and web report provide further ways to examine the analysis. The chart is a descriptive view of the data; it is not an assessment of the person represented by an individual point."
          ]
        }
      ],
      "outcome": [
        {
          "title": "A clearer standard for the next analysis",
          "paragraphs": [
            "The most useful lesson from this project is to examine the target as carefully as the model. A result can look convincing while answering a narrower question than the one the project started with.",
            "I would strengthen the next version by making dataset provenance and target definitions explicit, preserving unaltered statistical outputs and using an independent basis for any predictive claim. This version remains a learning project rather than a validated employment assessment system."
          ]
        }
      ]
    }
  }
];
