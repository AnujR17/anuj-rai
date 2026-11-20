export type MedicineScreen = {
  id: string;
  title: string;
  reason: string;
  mockup: string;
  source: string;
  figma: string;
  alt: string;
};

export const setupScreens: MedicineScreen[] = [
  {
    id: "scan",
    title: "Scan",
    reason: "A sample prescription starts the proposed setup, with an option to upload an image.",
    mockup: "/portfolio/meditimer-case/scan.webp",
    source: "/portfolio/meditimer-case/scan-screen.png",
    figma: "https://www.figma.com/design/on1gbKHkUo4CLZ38uCiSza/?node-id=3137-596",
    alt: "Meditimer prescription capture screen with a sample prescription in the camera frame",
  },
  {
    id: "review",
    title: "Review",
    reason: "Medicine names, strength, frequency and notes are presented for review before the routine is saved.",
    mockup: "/portfolio/meditimer-case/review.webp",
    source: "/portfolio/meditimer-case/review-screen.png",
    figma: "https://www.figma.com/design/on1gbKHkUo4CLZ38uCiSza/?node-id=3137-674",
    alt: "Medicine review screen showing frequency, timing, notes and stock for a sample medicine",
  },
  {
    id: "reminders",
    title: "Reminders",
    reason: "The person can check the proposed reminder times before confirming the schedule.",
    mockup: "/portfolio/meditimer-case/reminders.webp",
    source: "/portfolio/meditimer-case/reminders-screen.png",
    figma: "https://www.figma.com/design/on1gbKHkUo4CLZ38uCiSza/?node-id=3131-340",
    alt: "Reminder review screen with proposed times for a sample medicine routine",
  },
];

export const personalScreen: MedicineScreen = {
  id: "reminder",
  title: "Taking medicine",
  reason: "A reminder keeps the recording action close to the dose.",
  mockup: "/portfolio/meditimer-case/reminder.webp",
  source: "/portfolio/meditimer-case/reminder.webp",
  figma: "https://www.figma.com/design/on1gbKHkUo4CLZ38uCiSza/?node-id=3131-496",
  alt: "A medicine reminder with a mark as taken action",
};

export const caregiverScreen: MedicineScreen = {
  id: "history",
  title: "Supporting someone",
  reason: "A caregiver can read the available record before deciding to check in.",
  mockup: "/portfolio/meditimer-case/history.webp",
  source: "/portfolio/meditimer-case/history.webp",
  figma: "https://www.figma.com/design/on1gbKHkUo4CLZ38uCiSza/?node-id=3121-219",
  alt: "Caregiver history showing taken, missed, partial and no-update examples, with a call action",
};
