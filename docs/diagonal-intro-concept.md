# Portfolio template

Branch: `concept/diagonal-intro`

Read [the standing rules](portfolio-rules.md) before editing
The hero must be text-only and separate from the work
The earlier interpretation allowing project images in the hero was an assistant mistake
That interpretation has been removed from the repository and the private Design Practice plugin

## Page order

1. The earlier bottom-left introduction and right-hand text, with no eyes or project imagery
2. Selected work in a separate rounded-image grid
3. Personal questions with hover, tap and keyboard responses
4. A short About me section
5. A dark Contact me section with side icons and copy at the bottom right

The original global footer remains separate

## Selected work

[Todor Dimov](https://www.todordimov.com/) is the reference for the work presentation
The layout uses a larger leading image beside two smaller images on desktop
Tablet and mobile layouts reorganize the same content into fewer columns
Images have rounded edges and a small hover scale
There is no pinned horizontal scrolling scene, custom cursor, numbered badge or extra annotation
Only the project title accompanies each image

The current project images are temporary content from Anuj's existing portfolio
Replace the images and project entries in `data/home.ts`
No reference-site imagery is shipped

## Personal sections

The questions retain their offset typography and native details interaction
Their answers use concrete examples from the existing projects and interests
A short bio follows them, with verified education and design interests

Contact me is the main action in the dark closing section
The heading and email open the verified email address
The side icons use the existing GitHub profile and email destination
No unprovided social profiles have been invented
The GitHub mark is the brand SVG from the Simple Icons repository
The contact copy is placed at the bottom right

## Files

| File | Purpose |
| --- | --- |
| `app/page.tsx` | Page order, text-only hero and short bio |
| `app/page.module.css` | Hero and bio layout |
| `data/home.ts` | Introductory copy, project content and question answers |
| `components/concept/SelectedWork.tsx` | Separate work grid |
| `components/concept/SelectedWork.module.css` | Image sizes, rounded edges and responsive columns |
| `components/concept/PersonalQuestions.tsx` | Hover, tap and keyboard questions |
| `components/concept/ContactSection.tsx` | Dark contact section and verified destinations |
| `components/concept/ContactSection.module.css` | Contact emphasis, side icons and lower-right copy |

DM Sans and the existing palette are retained
The eye components and the merged hero/work walkthrough have been removed
Do not merge without explicit user approval

## Validation

Production build, full lint, TypeScript and Git whitespace checks pass
Chromium checked the homepage at 1440, 1024, 768, 390 and 320 pixels
The hero has no project media and Selected work begins after the first screen at these sizes
All three project images load, their rounded edges remain visible, and the page has no horizontal overflow
Question interactions work with mouse hover, touch and keyboard
The content and native question controls also work without JavaScript
The Work, About, Contact and three linked project routes return successfully and fit a narrow phone viewport
The global footer source and styles were not changed in this revision
