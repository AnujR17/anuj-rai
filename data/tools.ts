export type Tool = { name: string; icon: string };
export type ToolGroup = { id: string; title: string; tools: Tool[] };

export const toolGroups: ToolGroup[] = [
  { id: "design", title: "Design", tools: [
    { name: "Figma", icon: "figma" }, { name: "FigJam", icon: "figma" },
    { name: "Framer", icon: "framer" }, { name: "Adobe Illustrator", icon: "adobeillustrator" },
    { name: "Sketch", icon: "sketch" }, { name: "InVision", icon: "invision" },
    { name: "Axure RP", icon: "axurerp" },
  ] },
  { id: "assistance", title: "AI assistance", tools: [
    { name: "ChatGPT", icon: "chatgpt" },
    { name: "DeepSeek", icon: "deepseek" }, { name: "Cline", icon: "cline" },
    { name: "Meshy AI", icon: "meshy" },
  ] },
  { id: "development", title: "Development", tools: [
    { name: "Visual Studio Code", icon: "visualstudiocode" },
    { name: "HTML", icon: "html5" }, { name: "CSS", icon: "css" },
    { name: "JavaScript", icon: "javascript" }, { name: "TypeScript", icon: "typescript" },
    { name: "React", icon: "react" }, { name: "React Native", icon: "react" },
    { name: "Expo", icon: "expo" }, { name: "Tailwind CSS", icon: "tailwindcss" },
    { name: "Git", icon: "git" },
    { name: "GitHub", icon: "github" },
  ] },
  { id: "spatial", title: "3D, AR & spatial", tools: [
    { name: "Blender", icon: "blender" }, { name: "Unity", icon: "unity" },
    { name: "Lens Studio", icon: "lensstudio" },
  ] },
  { id: "physical", title: "Physical computing", tools: [
    { name: "Arduino IDE", icon: "arduino" }, { name: "ESP32", icon: "espressif" },
  ] },
  { id: "data", title: "Data & backend", tools: [
    { name: "MySQL", icon: "mysql" }, { name: "BigQuery", icon: "googlebigquery" },
    { name: "Apache Spark", icon: "apachespark" }, { name: "Node.js", icon: "nodedotjs" },
    { name: "Express.js", icon: "express" }, { name: "Postman", icon: "postman" },
  ] },
];

export const exploringTools: Tool[] = [
  { name: "Unity + XR Interaction Toolkit", icon: "unity" },
  { name: "Blender", icon: "blender" }, { name: "Lens Studio", icon: "lensstudio" },
  { name: "React Native + Expo", icon: "react" }, { name: "ESP32", icon: "espressif" },
];
