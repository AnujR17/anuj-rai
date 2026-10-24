export type Tool = { name: string; icon: string; exploring?: boolean };
export type ToolGroup = { id: string; title: string; tools: Tool[] };

export const toolGroups: ToolGroup[] = [
  { id: "design", title: "Design", tools: [
    { name: "Figma", icon: "figma" }, { name: "Framer", icon: "framer" },
    { name: "Adobe Illustrator", icon: "adobeillustrator" }, { name: "Axure RP", icon: "axurerp" },
  ] },
  { id: "assistance", title: "AI assistance", tools: [
    { name: "Codex", icon: "codex" }, { name: "ChatGPT", icon: "chatgpt" },
    { name: "DeepSeek", icon: "deepseek" }, { name: "Cline", icon: "cline" },
    { name: "Meshy AI", icon: "meshy" },
    { name: "Claude", icon: "claude", exploring: true },
    { name: "Cursor", icon: "cursor", exploring: true },
  ] },
  { id: "development", title: "Development", tools: [
    { name: "JavaScript", icon: "javascript" }, { name: "TypeScript", icon: "typescript" },
    { name: "React", icon: "react" }, { name: "React Native", icon: "react", exploring: true },
    { name: "Expo", icon: "expo", exploring: true }, { name: "Tailwind CSS", icon: "tailwindcss" },
    { name: "Git", icon: "git" }, { name: "GitHub", icon: "github" },
  ] },
  { id: "spatial", title: "3D, AR & spatial", tools: [
    { name: "Blender", icon: "blender", exploring: true },
    { name: "Unity + XR Interaction Toolkit", icon: "unity", exploring: true },
    { name: "Lens Studio", icon: "lensstudio", exploring: true },
  ] },
  { id: "physical", title: "Physical computing", tools: [
    { name: "Arduino IDE", icon: "arduino" }, { name: "ESP32", icon: "espressif", exploring: true },
  ] },
  { id: "data", title: "Data & backend", tools: [
    { name: "MySQL", icon: "mysql" }, { name: "Supabase", icon: "supabase" },
    { name: "Node.js", icon: "nodedotjs" }, { name: "Express.js", icon: "express" },
  ] },
];
