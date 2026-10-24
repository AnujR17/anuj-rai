# Portfolio template

Read [the latest supplied copy and collage brief](collage-copy-update.md) first
The earlier iteration below is historical where it differs

Branch: `concept/diagonal-intro`

Read [the standing rules](portfolio-rules.md) before editing

## Current homepage direction

The user requested Tacto’s character-by-character entrance for the hero and section headings
The hero reads “Hello,” followed by “People, patterns, and the little things.”
The overall type is smaller than the previous name-led hero
“Little things” is smaller on the normal text baseline
A short introduction describes Anuj as an interaction designer and explains the work plainly
The hero contains only text and remains separate from the work

The header has exactly Work, About and Resume, placed at the upper right
The current vermilion accent is `#cf3518`, replacing blue
The existing paper background, DM Sans and global footer layout remain
The requested final period in the hero headline is an explicit exception to the heading punctuation rule

## Section composition

The order stays hero, Selected work, questions, About me and dark Contact me
Place context above each homepage section’s title and anchor the title at the bottom left
Hero copy follows its heading as the user requested
Project titles sit below their images on the left
Question answers appear above their prompts, keeping native hover, touch and keyboard behaviour
About me puts the short bio above and to the right of its title
Contact me anchors its heading below the email and social icons, with contact copy at the lower right on desktop
On a phone, contact copy sits above the bottom-left title
The global footer stays separate

## Selected work

The homepage previews Meditimer app, Himalayan 450 and Toki
India in Orbit and roundabouts do not appear in the homepage previews
All five main cases remain on the Work page with the agreed five-stage structure
The work grid follows the larger-first-image proportions of the Todor Dimov reference
Images retain rounded edges and adapt to fewer columns at smaller widths
The original medicine-taker and caregiver interfaces appear together
Project images and content are unchanged source material, with source records retained in the case-study data

## Motion and interaction

Tacto’s `typewriter` implementation was inspected read-only
The portfolio uses its own implementation
Headings appear character by character once on entering the viewport
The hero copy enters after the headline, with a short eased movement
Work cards enter with small staggered delays; their text is not typed
About and contact context use the same restrained entrance
The work images have a small hover response and visible keyboard focus
There are no looping headlines, custom cursors or scroll locks

Text remains in the document throughout the entrance to reserve its layout and prevent shifts
Screen readers receive the whole phrase, not character-by-character announcements
Without JavaScript, all text and work remain visible
Reduced motion shows content immediately and removes the new movement
Focusing a link reveals its parent content immediately

## Editing

| File | Purpose |
| --- | --- |
| `app/page.tsx` | Hero, page order and short bio |
| `app/page.module.css` | Hero type and lower-left About title |
| `data/home.ts` | Introduction, homepage project titles and questions |
| `components/motion/Entrance.tsx` | Viewport-triggered type and ease entrances |
| `components/motion/Entrance.module.css` | Timing, readable fallback and reduced motion |
| `components/concept/SelectedWork.tsx` | Selected projects and section title |
| `components/concept/SelectedWork.module.css` | Rounded previews and lower-left title |
| `components/concept/PersonalQuestions.module.css` | Context above question prompts |
| `components/concept/ContactSection.tsx` | Contact action, email and side social icons |
| `components/layout/Navbar.tsx` | Three primary links |

Never merge without explicit user approval

## Personal About copy

The user supplied their own motivation and interests for this iteration
Interaction design connects how a product is made, perceived and used, including where someone begins, how it feels and how it responds
Making and shaping a product is a way to communicate an idea through its form and behaviour
Over the past year, Anuj has been experimenting with IoT, microcontrollers and embedded systems, with the playful goal of making everyday tasks require less effort
He would like to share and eventually scale something useful from that work
Badminton and following Barça late at night are personal interests
The homepage uses a short version and the About page expands it through staggered, unequal text blocks
The copy is in `data/about.ts`
Do not replace these details with generic design philosophy or invented hobbies
Pinterest search showed a sign-in screen; no Pinterest design or media was used

## Validation

Production build, full lint, TypeScript and Git whitespace checks pass
The homepage was checked at 1440, 1024, 768, 390 and 320 pixels
Checks cover progressive hero and work-heading typing, completion, no replay on scroll-back, reserved text layout, reduced motion, no-JavaScript content and hover, touch and keyboard questions
All three project previews load and the hero contains no project imagery
Section titles remain at the lower left at all checked sizes
The accent contrast against the paper background is approximately 4.68 to 1
About and shared-navigation checks cover 24 route and width combinations across About, Work, Resume, Contact, Meditimer app and Toki
The About page also remains readable without JavaScript
The global footer markup and case-study content were unchanged
