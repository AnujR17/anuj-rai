# Diagonal introduction concept

Working template on `concept/diagonal-intro`, created at the user's request on 16 October 2026. It starts from local `code/portfolio` commit `83395fe` to retain original project images, corrected project claims, and working contact details. The previous visual direction is replaced on the homepage. The existing Work, About, Resume, Contact, and case-study routes remain available.

This is a proposal for iteration, not an approved final portfolio. Do not merge without explicit user approval.

## Composition

The introduction anchors the bottom left. A pair of cobalt eyes provides a smaller visual counterweight in the top right. The short introductory paragraph sits below the eyes, giving a reading path from name, to personality, to context. On narrow screens the eyes stay to the right, followed by the name and introduction in normal document order.

The opening contains no project card, carousel, or prototype. An about section establishes the person before two project previews. The rest of the work is one click away rather than becoming a homepage catalogue.

Three top-right treatments were considered:

| Treatment | Benefit | Trade-off |
| --- | --- | --- |
| A short text note | Quiet and easy to maintain | Adds little personality and competes with the introduction |
| An abstract object | Strong visual weight | Needs a reason to belong to this particular portfolio |
| A pair of eyes, implemented here | A small, understandable response to the visitor; connects with interaction design | Could feel too playful; scale, shape, and presence are still open for review |

The blue, type scale, and eye treatment are design hypotheses. The useful review is whether the name is the primary text, whether the open space feels intentional, and whether the eyes add character without delaying navigation. These have not been tested with portfolio visitors.

## Reference principles

- [Sogeking by Bayu Aji Sadewa / Korsa](https://dribbble.com/shots/27782025-Sogeking-Creative-Agency-Portfolio-Landing-Page): open canvas, strong type, and a concentrated electric-blue visual accent. The eyes and composition here are original code; reference artwork is not shipped.
- [Tacto](https://tacto-inc.com/index.html): sparse navigation, typography anchored low in the opening, and introduction before the work. Page content and CSS were inspected; the live animation was not captured successfully in this environment.
- The supplied Pinterest search could not be read. No specific Pinterest design is attributed or reproduced.

## What to edit

| File | Purpose |
| --- | --- |
| `data/home.ts` | Introductory copy, interests, and the two curated project previews |
| `app/page.tsx` | Section order and homepage markup |
| `app/page.module.css` | Diagonal composition, spacing, responsive type, and project surfaces |
| `components/concept/CuriousEyes.tsx` | Pointer response, blink action, and motion preference handling |
| `components/concept/CuriousEyes.module.css` | Eye shape, pupils, and blue treatment |
| `app/globals.css` | Shared paper/accent colours, navigation, and footer |
| `data/contact.ts` | Existing verified email and GitHub profile |

The eyes inherit `--concept-accent`. The homepage defines it locally, and the shared shell defines the same default. Change both for a portfolio-wide colour revision. Removing `CuriousEyes` leaves the introduction and navigation usable; the right-hand area can take a different visual later.

## Interaction and accessibility

Pointer movement changes only pupil positions, with bounded travel and one animation frame per update. Tracking stops when the eyes leave the viewport. Click, tap, Enter, or Space produces one short blink; there is no automatic blink loop. Touch uses the blink action without requiring hover. The system's reduced-motion preference stops tracking and blinking and removes the decorative button from keyboard interaction. Core content, navigation, and anchor links work without JavaScript. The eye interaction is optional.

The introduction and about section precede all work in the document. A skip link, native links and buttons, visible keyboard focus, and labelled navigation remain available. Shared navigation includes Work, About, Resume, and Contact on mobile.

## Checks

Production build, repository lint, TypeScript, and Git whitespace checks pass. Chromium checks cover the homepage at 1440, 1024, 768, 390, and 320px, representative existing routes at 320px, loaded images, horizontal overflow, navigation visibility, pointer response, keyboard blinking and reset, reduced motion, and core content without JavaScript. Final targeted checks also cover touch input and reduced-motion button disabling. These are implementation checks, not usability research or validation of project outcomes.

## Next review

Review the eye size and shape, the name's scale, and how much of the short introduction belongs in the opening. Change one of those at a time before expanding the work section. The existing project descriptions distinguish interface concepts, browser simulations, and implemented web projects; keep those distinctions when replacing copy or assets.
