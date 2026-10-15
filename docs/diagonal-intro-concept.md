# Portfolio concept

Current branch: `concept/diagonal-intro`

Read [the confirmed portfolio rules](portfolio-rules.md) before changing the design or copy
The user's correction on 16 October 2026 supersedes the earlier cobalt concept, annotations and writing

## Current implementation

DM Sans is used throughout the site
The introduction remains at the bottom left and the eyes remain at the top right
The interface is neutral black, white and grey
The eye interaction follows the pointer and blinks on click, tap, Enter or Space
Reduced-motion settings stop tracking and blinking

The homepage introduces Anuj, provides an About section, then shows Selected work and Contact
Project links use their actual names
No image captions, miniature category labels, numbered badges, arrow icons, decorative dots, or em dashes are added to the interface
Image provenance remains in the project data and case-study source content
Original project screenshots and research images retain their own contents and colours

## Editing

| File | Purpose |
| --- | --- |
| `data/home.ts` | Homepage introduction and project choices |
| `app/page.tsx` | Section order and homepage content |
| `app/page.module.css` | Composition and responsive layout |
| `components/concept/CuriousEyes.tsx` | Eye interaction |
| `components/concept/CuriousEyes.module.css` | Eye geometry |
| `app/globals.css` | Shared navigation, typography tokens and neutral surfaces |
| `app/layout.tsx` | DM Sans loading |
| `data/contact.ts` | Verified email and GitHub destinations |

## Persistent rules

The user's rules are stored in repository `AGENTS.md` and `docs/portfolio-rules.md`
They are also saved in the private [Design Practice plugin](https://chatgpt.com/plugins/plugins_6ad0a41540788191ae8154e11191c227), version 0.1.1
The plugin skill explicitly loads these requirements for future portfolio work

## References

The original brief supplied [Sogeking](https://dribbble.com/shots/27782025-Sogeking-Creative-Agency-Portfolio-Landing-Page) and [Tacto](https://tacto-inc.com/index.html)
Their open space and asymmetric composition informed the first template
The user's current visual and copy requirements take precedence over those references
The Pinterest search was not accessible

Do not merge without explicit user approval
