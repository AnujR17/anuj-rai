# Grouped tool inventory

User direction on 16 October 2026
Use a compact monochrome inventory grouped by category, with Design and AI assistance first
Keep the heading Tools I use and retain a distinct Currently exploring group
Do not use skill bars, proficiency ratings, pill filters or arbitrary target counts
Keep the project work more prominent than the inventory
Use recognizable brand marks and normal tool names, not icons for design methods

## Current list

The user explicitly requested adding the tools in their supplied prompt to begin with
That instruction supersedes the earlier request to confirm each additional tool before inclusion
The inventory shows breadth without assigning proficiency or making claims about particular project usage

- Design: Figma, FigJam, Framer, Adobe Illustrator, Sketch, InVision, Axure RP
- AI assistance: ChatGPT, DeepSeek, Cline, Meshy AI
- Development: Visual Studio Code, HTML, CSS, JavaScript, TypeScript, React, React Native, Tailwind CSS, Git, GitHub, Expo
- 3D, AR & spatial: Blender, Unity, Lens Studio
- Physical computing: Arduino IDE, ESP32
- Data & backend: MySQL, BigQuery, Apache Spark, Node.js, Express.js, Postman
- Currently exploring: Unity + XR Interaction Toolkit, Blender, Lens Studio, React Native + Expo, ESP32

TypeScript remains from the existing inventory
Meshy AI appears under AI assistance and Unity under Spatial rather than duplicating them in other main categories
Currently exploring deliberately identifies tools the user is developing further

## Implementation

Edit categories and tools in data/tools.ts
Each category has a consistent heading column and an adaptive icon grid to its right on desktop
Smaller screens put the category heading above a compact icon grid
Currently exploring has its own row with additional space above
Marks are local SVGs with provenance in public/icons/tools/README.md
FigJam uses the shared Figma mark, React Native uses React and ESP32 uses Espressif
The user subsequently requested icons only
Remove visible tool names and retain names as image alt text for screen readers
Do not add captions, tooltips or name badges
Keep the category headings and Currently exploring

The Tools title aligns with the final icon row in the desktop side-by-side layout
Do not emulate alignment with fixed pixel offsets or clip inventory to a viewport height
On narrow screens content stacks with the title below it
