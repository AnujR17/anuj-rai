export const medicineScreens = [
  {
    "id": "capture",
    "title": "Capture",
    "reason": "The capture screen starts with a prescription image. It introduces the setup task; this screen alone does not establish accurate prescription recognition.",
    "src": "/portfolio/screens/capture.png",
    "mockup": "/portfolio/screens/capture-mockup.png",
    "width": 840,
    "height": 1780,
    "sourceWidth": 402,
    "sourceHeight": 874
  },
  {
    "id": "review",
    "title": "Review",
    "reason": "Review exposes the medicine name, frequency, times, note and stock before Continue. This gives the person a place to check the details before they become part of a routine.",
    "src": "/portfolio/screens/review.png",
    "mockup": "/portfolio/screens/review-mockup.png",
    "width": 840,
    "height": 1780,
    "sourceWidth": 402,
    "sourceHeight": 874
  },
  {
    "id": "routine",
    "title": "Routine",
    "reason": "Routine brings the saved medicine and schedule together. The sequence ends with information the person can inspect before returning to daily recording.",
    "src": "/portfolio/screens/routine.png",
    "mockup": "/portfolio/screens/routine-mockup.png",
    "width": 840,
    "height": 1780,
    "sourceWidth": 402,
    "sourceHeight": 874
  },
  {
    "id": "medicine",
    "title": "Medicine-taker interface",
    "reason": "The current dose and its recording action",
    "src": "/portfolio/screens/medicine.png",
    "mockup": "/portfolio/screens/medicine-mockup.png",
    "width": 840,
    "height": 2130,
    "sourceWidth": 410,
    "sourceHeight": 1071
  },
  {
    "id": "caregiver",
    "title": "Caregiver interface",
    "reason": "The daily record and the caregiver\u2019s follow-up actions",
    "src": "/portfolio/screens/caregiver.png",
    "mockup": "/portfolio/screens/caregiver-mockup.png",
    "width": 840,
    "height": 1814,
    "sourceWidth": 408,
    "sourceHeight": 904
  }
] as const;

export const setupScreens = medicineScreens.slice(0, 3);
export const originalInterfaces = medicineScreens.slice(3);
export type MedicineScreen = (typeof medicineScreens)[number];
