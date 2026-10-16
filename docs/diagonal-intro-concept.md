# Visual walkthrough

Current branch: `concept/diagonal-intro`

Read [the confirmed portfolio rules](portfolio-rules.md) before editing
The latest user request replaces the eye illustration and the static project grid with a wide visual walkthrough
The user explicitly did not request removing colour or redesigning the footer
Those earlier assumptions have been corrected in the repository and Design Practice plugin version 0.1.2

## Composition

The opening places Anuj Rai at the lower left with his role in normal body text
Original project imagery occupies the right-hand side and extends beyond the viewport
Scrolling moves the imagery horizontally while the identity gives way to the title Selected work at the lower left
Three pieces are curated into this sequence: Himalayan 450, India in Orbit, and the Gandhinagar roundabout study
Their unequal widths and vertical positions create a two- or three-column reading across the screen

The gallery is followed by three differently positioned questions about design, prototyping and current interests
Hovering opens an answer and changes the question's typography and colour
The same answers open with a tap or keyboard activation
The footer's prior spacing, text size and link layout are retained

## Interaction

Desktop uses a sticky viewport with normal page scrolling mapped to horizontal gallery travel
A spring smooths project movement
Native Previous, Next project and All work controls remain available
Keyboard focus brings the focused project into view
The gallery region also supports Left, Right, Home and End keys

Touch, smaller viewports, reduced-motion mode and JavaScript-disabled browsing use a native horizontally scrollable gallery
Reduced-motion mode removes the sticky scroll sequence and animated hover movement
The personal questions use native details and summary elements so they remain operable without JavaScript
No custom cursor, eye illustration, annotations, caption labels, numbered badges, decorative arrows or dot markers are added

## Editing

| File | Purpose |
| --- | --- |
| `data/home.ts` | Curated project images, titles and personal question content |
| `components/concept/VisualWalkthrough.tsx` | Scrolling, spring motion and gallery controls |
| `components/concept/Walkthrough.module.css` | Wide composition, image surfaces and responsive gallery |
| `components/concept/PersonalQuestions.tsx` | Native question interactions |
| `components/concept/PersonalQuestions.module.css` | Offset typography and hover treatment |
| `app/globals.css` | Existing palette, shared navigation and footer |
| `app/layout.tsx` | DM Sans loading |

## Reference principles

[Tacto](https://tacto-inc.com/index.html) informed the lower-left identity, wide spacing and typographic question navigation
Its page and question hover treatment were captured and inspected
[Sogeking](https://dribbble.com/shots/27782025-Sogeking-Creative-Agency-Portfolio-Landing-Page) informed the strong typographic scale and concentrated colour
Horizontal photography portfolios informed the partial next-image reveal and unequal project widths
The Pinterest search itself was unavailable, so no particular Pinterest composition is claimed as a source
Only Anuj's existing project images are shipped

Do not merge without explicit user approval

## Verification

Production build, TypeScript, lint and whitespace checks pass
Chromium checks cover 1920, 1440, 1024, 768, 390 and 320px layouts
The identity-to-work transition, spring movement, all three project reveals, gallery controls, keyboard navigation, mobile scrolling, question hover and tap behaviour, reduced-motion fallback and native no-JavaScript questions were checked
Hovering questions does not move the footer
The eye illustration is absent and the previous footer text size is restored
Representative work, about, contact and project routes return successfully
These are implementation checks, not portfolio usability research
