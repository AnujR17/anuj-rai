export type Exploration = {
  id: string;
  title: string;
  image: { src: string; alt: string; width: number; height: number };
  caption: string;
  credit?: string;
};
// The user will supply dustbin, AR/VR and other exploration images later.
// Add original material here with factual captions and contribution credits.
export const explorations: Exploration[] = [];
