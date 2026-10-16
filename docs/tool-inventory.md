# Grouped tool inventory

Latest user direction on 16 October 2026
Use compact monochrome icons grouped by category, with Design and AI assistance first
Keep the heading Tools I use
Show names, categories and applicable Currently exploring status on hover, keyboard focus or tap
This explicitly supersedes the earlier no-tooltip instruction for this inventory
Do not add permanent labels, captions, pill filters, skill bars or proficiency ratings
Keep project work more prominent than the inventory

## Current list

- Design: Figma, Framer, Adobe Illustrator, Axure RP
- AI assistance: Codex, ChatGPT, DeepSeek, Cline, Meshy AI, Claude, Cursor
- Development: JavaScript, TypeScript, React, React Native, Expo, Tailwind CSS, Git, GitHub
- 3D, AR & spatial: Blender, Unity + XR Interaction Toolkit, Lens Studio
- Physical computing: Arduino IDE, ESP32
- Data & backend: MySQL, Supabase, Node.js, Express.js

The user removed FigJam, Sketch, InVision, Visual Studio Code, HTML, CSS, BigQuery, Apache Spark and Postman
They explicitly requested Codex and Supabase and invited a few relevant AI additions
Claude and Cursor were added as proposed tools to explore, not as claims of established experience
No statement about employer demand is inferred from inclusion

## Exploration status

Keep each tool within its category rather than repeating icons in a separate Currently exploring row
Show Currently exploring in the hover details for Claude, Cursor, Blender, Unity + XR Interaction Toolkit, Lens Studio, React Native, Expo and ESP32
The existing exploration list supplies the other entries; the additional AI tools are proposed exploration
Do not infer equal proficiency or specific project usage

## Implementation

Edit categories and exploration flags in data/tools.ts
Tools I use stays at the bottom-left corner
The inventory is a compact column at the far right, with a maximum width of 480px
Category labels sit above the icons and align right
Each icon row aligns to the same right edge, including wrapped final rows
Keep the large gap between the title and the right-side inventory
On phones preserve right-aligned icon groups with the title below at the left
Marks are local SVGs with provenance in public/icons/tools/README.md
React Native uses React's mark; ESP32 uses Espressif and XR Interaction Toolkit shares Unity's mark
Icon buttons have complete accessible names
A small shared hover label provides tool name, category and applicable exploration status
Use content-sized width capped at 176px, 7px by 9px padding, a 12px name and 11px supporting text
Keep it close to the icon without an arrow or a large card treatment
Position it within the viewport, allow moving the pointer into it, and dismiss it with Escape or an outside click
Tap toggles it on touch screens
The icon buttons retain visible keyboard focus and a minimum 44px target

The Tools title aligns with the final icon row in the desktop side-by-side layout
Do not use fixed pixel offsets or clip the inventory to a viewport height
On narrow screens content stacks with the title below it
