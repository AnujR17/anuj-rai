export type MedicineDeviceImage = {
  mockup: string;
  alt: string;
  width?: number;
  height?: number;
};

export type MedicineScreen = MedicineDeviceImage & {
  id: string;
  title: string;
  reason: string;
  source: string;
  figma: string;
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

export const personalRoutine: MedicineDeviceImage = {
  mockup: "/portfolio/screens/medicine-mockup.png",
  alt: "Personal routine with upcoming doses, progress for the day and an action to mark a dose as taken",
  width: 840,
  height: 2130,
};

export const caregiverRoutine: MedicineDeviceImage = {
  mockup: "/portfolio/screens/caregiver-mockup.png",
  alt: "Caregiver routine with recorded doses and options to call or send a reminder",
  width: 840,
  height: 1814,
};

export const historyExamples: (MedicineDeviceImage & { title: string })[] = [
  {
    title: "Partly recorded",
    mockup: "/portfolio/meditimer-case/history-partial.webp",
    alt: "Original Meditimer caregiver history for a partly recorded day, showing individual doses",
    width: 840,
    height: 1828,
  },
  {
    title: "Taken",
    mockup: "/portfolio/meditimer-case/history-taken.webp",
    alt: "Original Meditimer caregiver history for a day with a dose marked as taken",
    width: 840,
    height: 1828,
  },
];
