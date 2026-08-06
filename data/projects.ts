export interface Project {
  slug: string;
  title: string;
  observation: string;
  summary: string;
  type: string;
  year: string;
  roles: {
    led: string[];
    explored: string[];
  };
  overview: string;
  research: string[];
  design: string[];
  outcomes: string[];
}

export const projects: Project[] = [
  {
    slug: "medtimer",
    title: "Medtimer",
    observation: "Most medication reminders assume the problem is forgetting. It isn't. The problem is that the reminder doesn't fit the routine.",
    summary: "A medicine management system for senior citizens in India, designed around the rhythms people already have rather than the schedules doctors prescribe.",
    type: "Field Research, Interaction Design",
    year: "2024",
    roles: {
      led: ["Field Research", "Interaction Design", "Prototyping"],
      explored: ["Concept Ideation"],
    },
    overview: "Medication non-adherence among Indian seniors is rarely about forgetting. It's about pill organizers that don't match meal times, labels too small to read, and digital reminders that interrupt rather than assist. Medtimer started with sitting in living rooms and watching how people actually manage their medication, then working backwards from those routines.",
    research: [
      "Sat with five families in Vadodara to observe daily medication routines. The most common failure point wasn't memory. It was the gap between when the reminder went off and when the person could actually take the pill.",
      "Mapped existing routines against prescribed schedules. In every case, the prescribed timing conflicted with at least one daily habit, usually meals or prayer.",
    ],
    design: [
      "Abandoned the standard reminder model. Instead, anchored medication prompts to existing daily rituals the person already follows.",
      "Reduced the interface to a single screen with three states: morning, afternoon, night. No settings, no calendars, no feature density.",
      "Tested physical prototypes (paper mockups placed next to actual pill organizers) before building any digital interface.",
    ],
    outcomes: [
      "An interface that aligns with routine rather than competing with it.",
      "Participants in testing sessions stopped asking 'how do I use this' and started asking 'can I keep this.'"
    ]
  },
  {
    slug: "two-wheeler-dashboard",
    title: "Two-Wheeler Dashboard",
    observation: "Riders in India glance at their dashboard for less than half a second. Most dashboard designs assume they're looking for at least two.",
    summary: "Redesigning the digital cluster for two-wheelers to survive real riding conditions: vibration, glare, single-hand operation, and the constant pull of a phone mounted on the handlebar.",
    type: "Interface Design, Field Observation",
    year: "2023",
    roles: {
      led: ["Mixed-Method Research", "UI Design"],
      explored: ["Gesture Interaction"],
    },
    overview: "Two-wheeler dashboards in India are designed in studios with controlled lighting and stable surfaces. Riders use them on potholed roads at 60 km/h in direct sunlight. This project started with riding through Spiti Valley and documenting every moment a rider looked away from the road, then redesigning the dashboard to eliminate as many of those moments as possible.",
    research: [
      "Rode through Spiti Valley documenting when and why riders glanced at the dashboard. Navigation was the primary trigger, followed by speed, then fuel. Everything else was ignored.",
      "Surveyed 50+ riders. 73% had a phone mounted on the handlebar. The dashboard had become secondary to the phone, mostly because the phone showed maps.",
    ],
    design: [
      "Established a strict visual hierarchy: navigation cues visible at arm's length, speed readable in peripheral vision, everything else accessible but not competing.",
      "Tested contrast and type sizes in direct sunlight and shade. Increased minimum type size by 40% from industry standard.",
      "Explored gesture-based mode switching so riders never need to take a hand off the handlebar to change display modes.",
    ],
    outcomes: [
      "A dashboard layout that adapts to riding context and reduces glance time.",
      "Gesture concepts that keep both hands on the handlebar during mode changes."
    ]
  }
];
