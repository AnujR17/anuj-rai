export const caseStages = [
  { id: "research", title: "Research" },
  { id: "insights", title: "Insights" },
  { id: "concept", title: "Concept" },
  { id: "design", title: "Design" },
  { id: "outcome", title: "Outcome" },
] as const;

export type StageId = (typeof caseStages)[number]["id"];

export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Provenance for editing and source records, never an image caption */
  caption: string;
}

export interface CaseBlock {
  title?: string;
  paragraphs: string[];
  figures?: ProjectImage[];
}

export interface Project {
  slug: string;
  title: string;
  headline: string;
  summary: string;
  brief: string;
  problem: string;
  duration?: string;
  contribution: string;
  image?: ProjectImage;
  visual?: "medicine";
  live?: string;
  liveLabel?: string;
  source?: string;
  resources?: { label: string; href: string }[];
  stages: Record<StageId, CaseBlock[]>;
  note: string;
}
