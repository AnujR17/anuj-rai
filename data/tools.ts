export type Tool = { name: string; icon: string };
export type ToolGroup = { id: string; title: string; wide?: boolean; tools: Tool[] };

export const toolGroups: ToolGroup[] = [
  { id: "design", title: "Design", tools: [{ name: "Figma", icon: "figma" }] },
  { id: "assistance", title: "AI assistance", tools: [
    { name: "ChatGPT", icon: "chatgpt" },
    { name: "GitHub Copilot", icon: "githubcopilot" },
  ] },
  { id: "development", title: "Development", wide: true, tools: [
    { name: "HTML", icon: "html5" }, { name: "CSS", icon: "css" },
    { name: "JavaScript", icon: "javascript" }, { name: "TypeScript", icon: "typescript" },
    { name: "React", icon: "react" }, { name: "React Native", icon: "react" },
    { name: "Expo", icon: "expo" }, { name: "Tailwind CSS", icon: "tailwindcss" },
    { name: "Node.js", icon: "nodedotjs" }, { name: "Git", icon: "git" },
    { name: "GitHub", icon: "github" },
  ] },
  { id: "physical", title: "Physical computing", tools: [
    { name: "Arduino IDE", icon: "arduino" }, { name: "ESP32", icon: "espressif" },
  ] },
  { id: "data", title: "Data", tools: [{ name: "Python", icon: "python" }] },
];
