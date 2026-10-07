# Project sources and evidence update

Reviewed 7 October 2026. Continue only on `code/portfolio`. Never merge without explicit approval.

## What is accessible

The supplied **Research-Report (2).pdf** was read across all 29 pages. Its title is *What Actually Blocks the Circle: A Field Study of Gandhinagar Roundabouts*, authored by Anuj Rai. The newly supplied traffic files and medicine CSV were inspected read-only. Raw datasets and the full report remain outside the public repository; only selected report figures and aggregate findings are used.

The Library folder `chatgpt-library-folder://6ac62373a1b08191a975706ee2144c99/` cannot be listed by available tools. Do not claim to have read other Library documents.

No Figma connector/tool is exposed. Direct requests to the folder, Himalayan file, and Meditimer file returned `Tunnel connection failed: 403 Forbidden`. Other supplied links were recorded rather than repeatedly fetched from the blocked host. Frame contents remain uninspected.

| Figma source | Status |
| --- | --- |
| [Folder/team](https://www.figma.com/files/folder/666889167) | Direct access blocked. |
| [Himalayan 450 copy](https://www.figma.com/design/stbydRyEdkNF6VCYqpcDcY/Himalayan-450--Copy-) | Direct access blocked; repository image available. |
| [Meditimer copy](https://www.figma.com/design/on1gbKHkUo4CLZ38uCiSza/Meditimer--Copy-) | Direct access blocked; app/physical scope cannot be inferred from title. |
| [Phygital Products group copy](https://www.figma.com/design/ixlPXmsuwf48nzujHHUV4T/Phygital-Products-group--Copy-) | Link recorded; frames unavailable. |
| [Community case-study copy](https://www.figma.com/design/65AFivzpsLBkgNlhu77Gyh/UI-UX-Case-Study--Community---Copy-) | Establish original contribution versus template content before attribution. |
| [Phygital Products](https://www.figma.com/design/H97r8j6xZtSco5KoC87neC/Phygital-Products) | Link recorded; frames unavailable. |
| [Multi-Agent Chatbot](https://www.figma.com/design/UzjklV3YBeGpS5AZIh2L3u/Multi-Agent-Chatbot) | Link recorded; no screens or implementation inspected. |

Figma screen/PDF exports attached here can supply the missing visual evidence. Keep proxy settings and TLS verification intact.

## Dataset checks

### Traffic records

Each station has an original Gujarati XLSX, translated XLSX, and translated CSV. The translated CSV rows match the corresponding translated spreadsheet rows. Original/translated versions have equal nonempty row counts. This checks export integrity, not translation accuracy.

| Station | Nonempty spreadsheet rows | Header rows | Record rows |
| --- | --- | --- | --- |
| Sector-21 | 98 | 0 | 98 |
| Sector-7 | 87 | 0 | 87 |
| Infocity | 114 | 1 | 113 |
| Total | 299 | 1 | **298** |

Sector-7 and Sector-21 start with actual records, so a default CSV reader that consumes the first row as column names loses one record per file. Infocity has a real header, which must be excluded from its record count. The report's Infocity total of 114 includes that header. Its combined 299 is therefore 298 record rows in these supplied files.

There are no exact duplicate rows within each station's translated records. The identifier parser matches all Sector-7/21 rows and 111 of the 113 Infocity rows; the other two need manual identifier review. Do not call the combined row count a verified count of unique accidents. Registered cases also do not establish all crashes or exposure-adjusted risk.

Fatality, serious-injury, hit-and-run, and hourly-risk percentages in the report have not been revalidated. They require documented coding against the original text, clear denominators, distinction between event and registration dates, and consideration of reporting bias. Those percentages are not used as portfolio outcomes.

### Medicine survey

The provided Google Forms CSV contains **52 responses and 43 columns**, consistent with the repository's saved notebook output. Normalizing the caregiver role label produces 48 caregiver-path responses and 7 senior-path responses; **3 people appear in both paths**. These are not 55 independent respondents.

Independent checks on nonblank caregiver-path answers:

| Item | Answers selecting it | Nonblank answers | Share |
| --- | --- | --- | --- |
| Smartphone use | 34 | 45 | 75.56% |
| Preferred voice reminder | 21 | 46 | 45.65% |
| Current fixed routine | 25 | 46 | 54.35% |
| Preferred portable organiser | 18 | 46 | 39.13% |

The rounded smartphone, voice, and portable-organiser figures agree with the presentation. Denominators differ because questions have missing answers. Caregiver accounts are proxies; direct senior accounts form a small subset. City-tier groups are analyst-defined. Purchase preferences and correlations do not establish adoption, causes, or medical efficacy.

## Project selection

| Project | Placement | Evidence it can show now |
| --- | --- | --- |
| Himalayan 450 | Selected work | Interface export, changing states, runnable browser concept; general survey context linked separately. |
| India in Orbit | Selected work | Information design and interactive web implementation. |
| Gandhinagar roundabouts | Featured research case | Field investigation, reframing, communication tradeoffs, and qualitative feedback. |
| Medicine Storage and Reminder | Supporting research | Survey cleaning, reminder preferences, and product questions. This repository is not the independent app. |
| Consumer Experience | Supporting analysis | User's analysis of a supplied retail-research dataset. |
| Skidge | Learning project | Graduate-data exploration and reflection on constructed measures. |
| Intelligent Waste Disposal Systems | Workbench | Responsive-object firmware; physical demonstration still needed. |
| Physical Meditimer | Group concept brief | User's problem framing/rationale; teammate mockups/documentation require attribution. |
| Independent medicine app | Awaiting actual app artifacts | Keep separate from survey analysis and the physical concept. |
| Toki | Ongoing workbench | Current BLE connection lab, rather than a verified integrated device. |
| AR/VR | About interest, pending actual explorations | No invented prototype or project title. |

Select main cases by strength of evidence. Do not promote every analysis to a flagship project simply to increase the count.

## Research method and ownership notes

### Roundabout study

Section 10 of the report describes a two-day poster pilot shown on phones to students, commuters, and officers. Earlier sections describe evaluation as planned. Follow the specific pilot account without implying that a campaign was deployed.

The report calls this A/B testing, but does not supply randomized allocation, participant counts, comparable exposure, or measured driving/congestion outcomes. Present it as qualitative comparison and feedback. Observational findings do not isolate one cause of all congestion. The feedback about signal reliability and livelihood pressure usefully challenges a communication-only solution.

### Consumer Experience: retain with a narrower claim

The user clarified that a dataset was supplied and they were asked to analyse it. Credit the analysis, not recruitment or publication. Publication status is unknown.

GitHub contains charts, a report site, and notebook outputs sufficient for an honest portfolio description. Its tree contains no raw workbook. The notebook reads `CONSUME_EXPERIENCE_IN_RETAIL_ENVIRONMENT_Responses.xlsx` and reports 154 rows. Its embedded HTML tables contain previews and summaries, not a complete 154-response table. Recalculation and full reconciliation still require the original workbook; saved notebook output is not an independently reproduced result.

Specific inconsistencies and limitations:

- README demographics give 56.5% female, while presentation/notebook tables give 96/154 (62.3%).
- README CFA values are CFI 0.875 / RMSEA 0.077; notebook cell 67 reports CFI 0.6627 / RMSEA 0.0917 on 150 observations. Successful estimation does not confirm model adequacy.
- Visual-merchandising alpha is about 0.684, labelled questionable in the notebook; broad claims that every scale is validated are too strong.
- Classifying constructed cluster labels using the same variables does not independently establish universal customer types. Survey associations and mediation models do not establish causal sales effects.

Do not discard automatically. Descriptive analysis and resolving these issues can show judgment. A new store-services or checkout concept could be developed as a **hypothesis-led extension**, clearly distinguished from observed journeys and evaluated outcomes. Never invent participant quotes, publication, recruitment, or successful redesign results.

### Skidge

The notebook references `Engineer Grad Prof. Outcomes Analysis.csv` and `marketing_sample_for_indeed_co_in-indeed_co_in_job_data__20211001_20211231__30k_data.ldjson`. A comment mentions replacing a Kaggle download with a local file, but no dataset owner/URL was found. Filenames are leads, not verified citations or licenses.

The notebook uses both a salary-derived binary label and an analyst-weighted skills score. Cell 9 predicts the score from inputs used to construct it. High fit to that construction does not independently validate employability. Scaling before the split also needs review.

Cell 7 adds random perturbations and clips p-values “for realism.” Preserve actual statistical outputs instead. Benchmarks and scale interpretation need justification. Keep accuracy figures and broad hiring claims out of portfolio outcomes until resolved. The included GPA/salary chart is a descriptive artifact, not an individual assessment tool.

### BikeDashboardAnalysis

The user excluded GT650. No GT650/Continental-specific section was found in the two inspected report files; none is included. The general report describes 194 two-wheeler respondents, not a Himalayan-only evaluation. Its feature-priority chart provides sample self-reports, not validation of the concept or reduced glance time.

## How to present AR/VR

Use what exists. Each exploration should show:

1. One interaction question: selecting, navigating, recognizing an affordance, or understanding feedback.
2. A 20–40 second walkthrough and two or three stills showing input, action, and response.
3. Personal contribution: built prototype, adapted tutorial, group contribution, or critique of an experience tried.
4. One observed limitation, learning, or iteration, with platform/device context where relevant.
5. Honest status and a normal video/still fallback for any optional live WebXR experience.

If there is only an interest, the About paragraph is sufficient. If an experience was tried, a concise interaction critique can show judgment without claiming authorship. No fictional AR/VR case has been added while project details are pending.

## Artifact provenance

Figures were copied/extracted unchanged. Case pages link full-size versions. The complete datasets were not copied into the website.

| Asset under `public/portfolio/research` | Source |
| --- | --- |
| `gandhinagar-field.jpg` | Supplied PDF, page 6, image 0. |
| `gandhinagar-flow-map.jpg` | Supplied PDF, page 10, image 7. |
| `poster-regret.jpg` | Supplied PDF, page 21, image 18; campaign mockup. |
| `poster-accountability.jpg` | Supplied PDF, page 21, image 19; campaign mockup. |
| `medicine-reminder-fit.png` | Medicine repository, `assets/charts/reminder-fit.png`. |
| `consumer-attribute-ranking.png` | Consumer repository, `figures/phase6_importance_ranking.png`. |
| `skidge-gpa-salary.png` | Skidge repository, `analysis/analysis-images/04_gpa_vs_salary.png`. |
| `bike-feature-priorities.png` | Original embedded image in bike-analysis `index.html`, alt `Feature Importance Rankings`. |

The supplied PDF SHA-256 is `818747e993eea9e83ea4d51d757bcc81fe2258441cb7f1509ee551f2e044ee46`. Inspected repository tree identifiers are saved in the local source-review metadata. Source repositories and attached documents were not modified.

## Validation

Production build, full lint, TypeScript, and Git whitespace checks passed. Chromium checked twelve pages at 1280, 768, 390, and 320px (48 combinations), including image loading, section-anchor navigation, keyboard project switching, no-JavaScript content, reduced motion, unknown-project 404, and GT650 exclusion. After the raw-data updates, eight additional checks covered the two changed case pages at the same widths and asserted the corrected record count and medicine denominators. No runtime exceptions or horizontal overflow occurred. Respondent email addresses were checked against public text and were not included.
