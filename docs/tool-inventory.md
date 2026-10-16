# Grouped tool inventory

User direction on 16 October 2026
Use a compact monochrome inventory grouped by category, with Design and AI assistance first
Keep the heading Tools I use and retain a distinct Currently exploring group
Do not use skill bars, proficiency ratings, pill filters or arbitrary target counts
Keep the project work more prominent than the inventory
Use recognizable original brand marks and normal tool names, not icons for design methods

## Included evidence

- Figma: original linked medicine, physical product and Toki artifacts
- ChatGPT: the user's ongoing design and implementation workflow in this conversation
- GitHub Copilot: credited in the Himalayan 450 source documentation
- HTML, CSS, JavaScript, TypeScript and React: frontend work and project implementations
- React Native and Expo: the current Toki README explicitly identifies the app and framework
- Node.js: the Toki build documentation specifies its runtime
- Tailwind CSS: the resume's frontend-development account
- Git and GitHub: the project source and version-control workflow
- Arduino IDE and ESP32: Toki build documentation and physical prototyping work
- Python: the research notebook analyses
- Currently exploring: AR and VR, as supplied in the user's About/question copy

The user supplied a broader proposal with conditional additions
A clarification was requested about tools actually used versus being explored
Unconfirmed applications are not shown as demonstrated experience
Do not infer use of the Framer design application from the framer-motion dependency
Do not infer use of Jupyter's application from a notebook file format alone
Blender, Unity, Lens Studio, the additional design/AI tools and proposed database platforms can be added when confirmed

## Implementation

Edit categories and tools in data/tools.ts
The component reads that inventory; the layout adapts without needing a new component for each category
Monochrome marks are local SVGs from pinned Simple Icons versions, with provenance recorded in public/icons/tools/README.md
React Native uses the React mark; ESP32 uses the Espressif mark
The labels sit beside the icons as primary tool names
