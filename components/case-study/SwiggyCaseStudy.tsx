import Image from "next/image";
import Link from "next/link";
import { swiggyProject as project, swiggyScenarios, swiggyFindings } from "@/data/swiggy-case-study";
import evidenceFilm from "@/public/portfolio/swiggy/motion/evidence.json";
import partiesFilm from "@/public/portfolio/swiggy/motion/parties.json";
import decisionFilm from "@/public/portfolio/swiggy/motion/decision.json";
import { CaseStudyNav } from "./CaseStudyNav";
import { CaseNumbers } from "./CaseNumbers";
import { ProjectArtwork } from "./ProjectArtwork";
import { SwiggyEvolution } from "./SwiggyEvolution";
import { PolicyBoundary, FitComparison, InvestigationModel, EffortChart, FindingsChart, DecisionBoundaries } from "./SwiggyGraphics";
import styles from "./case-study.module.css";
import swiggy from "./swiggy-case-study.module.css";

const films = { evidence: evidenceFilm, parties: partiesFilm, decision: decisionFilm };
function Explainer({ id, title, description }: { id: keyof typeof films; title: string; description: string }) {
  return <div className={swiggy.explainer}>
    <h3>{title}</h3><p id={`${id}-film-description`}>{description}</p>
    <video className={swiggy.film} controls playsInline preload="none" poster={`/portfolio/swiggy/motion/${id}.png`} aria-label={`${title}: text-guided screen recording`} aria-describedby={`${id}-film-description`}><source src={`/portfolio/swiggy/motion/${id}.mp4`} type="video/mp4" /><a href={`/portfolio/swiggy/motion/${id}.gif`}>Open the animated explanation</a></video>
    <div className={swiggy.filmLinks}><a className={styles.textLink} href={`/portfolio/swiggy/motion/${id}.gif`} download>Download animated GIF</a><details><summary>Read the explanation</summary><ol>{films[id].chapters.map(chapter => <li key={chapter.title}><strong>{chapter.title}</strong><p>{chapter.detail}</p></li>)}</ol></details></div>
  </div>;
}
function Crop({ file, alt, width, height }: { file: string; alt: string; width: number; height: number }) {
  return <a className={swiggy.crop} href={`/portfolio/swiggy/evolution/${file}.png`} aria-label={`Open full-size detail: ${alt}`}><Image src={`/portfolio/swiggy/evolution/${file}.png`} width={width} height={height} alt={alt} sizes="(max-width: 700px) 90vw, 750px" /></a>;
}

export function SwiggyCaseStudy() {
  return <article className={`${styles.caseStudy} ${swiggy.case}`}>
    <header className={styles.hero}>
      <Link href="/work" className={styles.textLink}>All work</Link>
      <div className={styles.heroArtwork} data-project-artwork={project.slug}><ProjectArtwork project={project} priority /></div>
      <h1>{project.title}</h1>
    </header>
    <div className={`${styles.overview} ${swiggy.overview}`}>
      <p className={styles.introduction}>One case, three parties, a human decision. Agent Desk brings the order, conversation and evidence together so the agent can investigate before choosing an outcome.</p>
      <dl className={styles.details}><div><dt>Deliverable</dt><dd>Agent Desk v7.1<br />Five playable tickets and a design rulebook</dd></div><div><dt>Project credits</dt><dd>Sukhmanpreet Singh Saini, project owner<br />Akshat, research collaborator<br />AI assistance in prototyping and evaluation</dd></div></dl>
      <div className={styles.framing}><div><h2>Project brief</h2><p>{project.brief}</p></div><div><h2>Problem statement</h2><p>{project.problem}</p></div></div>
      <div className={swiggy.actions}><Link href="/work/swiggy-agent-workflow/prototype" className={styles.textLink}>Try the prototype</Link><a href="/portfolio/swiggy/design-rulebook-v7.1.pdf" className={styles.textLink}>Read the design rulebook</a></div>
      <p className={swiggy.context}>Independent concept, unaffiliated with Swiggy. Ticket data and replies are fictional; evidence photos were generated with Figma AI. No support agents tested this version.</p>
      <CaseNumbers slug={project.slug} />
    </div>
    <div className={styles.readingLayout}>
      <CaseStudyNav />
      <div className={styles.story}>
        <section id="research" className={styles.stage} aria-labelledby="research-title">
          <h2 id="research-title">Know what is public. Mark what is assumed.</h2>
          <div className={styles.stageContent}>
            <p className={swiggy.lead}>Swiggy’s public terms describe parts of a refund decision. They do not reveal the agent screen, approval limits or private operating process. The design therefore needs a boundary between a source and a project rule.</p>
            <PolicyBoundary />
            <div className={swiggy.sourceExample}><div><h3>Published wording</h3><p>Merchant permission is required in the available refund wording.</p></div><div><h3>Project hypothesis</h3><p>A standing restaurant agreement, a ₹250 cap or a platform-funded exception is not established by that clause.</p></div></div>
            <p className={swiggy.context}>Counts above describe the newly supplied policy draft, not features implemented in v7.1. Its 28 issue families cannot establish “80% coverage” without complaint volumes; its 14 acceptance specifications have not been executed.</p>
            <details className={swiggy.report}><summary>Research inputs, source limits and ethics</summary><p>The research includes public policies, cross-platform comparisons, one ten-minute call with an American Express customer-service expert outside food delivery, and a separately labelled simulated interview. There was no access to Swiggy agents, internal policy or real case data. Personas and the agent mental model are inferred.</p><p>Akshat’s customer-side audit included fabricated complaints. The accounts disagree about genuine claims, and whether fabricated refunds were returned is not recorded. This ethically problematic method is disclosed, not repeated or used to infer a general success rate.</p><p>Published, Law, Borrowed, Reported, Owner, Hypothetical and Inferred distinguish source types. A competitor’s real practice remains a hypothesis when adopted into this project. “Escalation agent” is the project’s term, not a verified Swiggy job title.</p></details>
          </div>
        </section>
        <section id="insights" className={styles.stage} aria-labelledby="insights-title">
          <h2 id="insights-title">Make investigation easier without deciding for the agent</h2>
          <div className={styles.stageContent}>
            <InvestigationModel />
            <div className={swiggy.visualReading}><div><h3>Evidence needs context, not a trust label</h3><p>Origin, time and an explicit Agree or Disagree observation give the agent something inspectable. A photo-authenticity score would turn uncertainty into a verdict.</p><p>The intended benefit is less searching for the record’s context. Whether agents interpret it correctly still needs testing.</p></div><Crop file="evidence-detail" width={720} height={500} alt="Original evidence viewer showing source, submission timing and agent observation controls" /></div>
            <div className={swiggy.visualReading}><div><h3>History is background, not a condition</h3><p>Iteration 3 moves all three parties’ counts to the top of Insights. That makes the comparison easier to find, while keeping it separate from policy.</p><p>The final interface still repeats history and uses inconsistent count orders. Visibility improved as a layout choice; consistency remains an evaluation finding.</p></div><Crop file="context-v3" width={440} height={560} alt="Third iteration with party records above Subject and policy conditions" /></div>
          </div>
        </section>
        <section id="concept" className={styles.stage} aria-labelledby="concept-title">
          <h2 id="concept-title">How the workspace changed</h2>
          <div className={styles.stageContent}>
            <p className={swiggy.lead}>Compare the three supplied wireframes with the final prototype. The fictional sample data changes between versions. These are interface comparisons, not before-and-after performance tests.</p>
            <details className={swiggy.report}><summary>Why three columns instead of a condition-led panel?</summary><div className={swiggy.layoutAlternatives}><div><h3>Three visible groups</h3><div className={swiggy.threeColumns}><span>Case</span><span>Conversation</span><span>Insights</span></div><p>The owner preferred three visible groups. This preserves their separation, but a condition and its evidence can still require cross-referencing.</p></div><div><h3>Condition-led panel</h3><div className={swiggy.twoColumns}><span>Conversation</span><span>Condition<br />Evidence<br />Action</span></div><p>The documented alternative puts evidence beside each condition, but the insight layer is less distinct as a column. The source recommended it; the owner preferred three columns. Neither layout won a comparative user test.</p></div></div></details>
            <SwiggyEvolution />
            <div className={swiggy.decisionStudy}><h3>Keep Hold out of the remedy choice</h3><p>Iteration 2 puts Hold alongside four outcomes. Iteration 3 moves it beside the conversation timer. The decision row goes from five controls to four, while the hold action remains available in its task context.</p><div className={swiggy.comparisonPair}><div><h4>Iteration 2: five actions</h4><Crop file="decision-v2" width={440} height={100} alt="Second iteration decision row with Full refund, Partial, Deny, Send to review and On hold" /></div><div><h4>Iteration 3: four outcomes</h4><Crop file="decision-v3" width={440} height={100} alt="Third iteration decision row with four outcomes after On hold moved to the conversation header" /></div></div><p className={swiggy.context}>The benefit is clearer grouping of conversation state and remedy. Fewer controls in this row do not prove fewer clicks or faster handling.</p></div>
            <div className={swiggy.decisionStudy}><h3>Reclaim height, then check what became harder to see</h3><FitComparison /><p>The first attachment documents a policy-row fit test: source and evidence details move behind a row, leaving more room for the case. The trade-off becomes important later: v7.1 collapses the checks, and the evaluation finds unmet or unknown conditions too easy to miss.</p></div>
            <div className={swiggy.visualReading}><div><h3>Remove an answer the agent might copy</h3><p>Iteration 3’s Star case shows a past refund, party similarity colours and a fairness score. It is absent from v7.1.</p><p>Removing it removes those precedent cues, but also removes a reference aid for newer agents. This is a design trade-off, not a demonstrated reduction in automation bias. Coloured rider and restaurant ratings still remain elsewhere and are flagged in the evaluation.</p></div><Crop file="star-detail" width={510} height={770} alt="Original third-iteration Star case showing a previous outcome and fairness score" /></div>
          </div>
        </section>
        <section id="design" className={styles.stage} aria-labelledby="design-title">
          <h2 id="design-title">See the decisions in the interface</h2>
          <div className={styles.stageContent}>
            <p className={swiggy.lead}>Continuous recordings follow actual prototype input. Close-ups and changing text explain the interaction; camera movement is editorial. Play is optional, and each film has a text version and animated GIF.</p>
            <Explainer id="evidence" title="Review evidence before choosing fault" description="Open both photos, inspect origin and time, and record an observation. Evidence status changes while fault and outcome remain unselected." />
            <Explainer id="parties" title="Investigate the other parties without leaving the case" description="Move between restaurant and rider records, return to the customer, and put the conversation on hold beside its timer." />
            <Explainer id="decision" title="Choose, explain and record" description="The agent chooses fault and action first. That choice creates a draft, followed by a message, reason and confirmation. This records a simulated action; it does not execute a payment." />
            <details className={swiggy.report}><summary>Open all five complete ticket references</summary><p>The original step-paced references retain the full paths. They are scripted demonstrations, not user-test recordings or handling-time measurements.</p>{swiggyScenarios.map(scenario => <details className={swiggy.scenario} key={scenario.id}><summary>{scenario.title}<span>{scenario.ticket}</span></summary><p id={`${scenario.id}-description`}>{scenario.focus}</p><video className={swiggy.recording} controls playsInline preload="none" poster={`/portfolio/swiggy/media/${scenario.id}.png`} aria-label={`${scenario.title}: complete scripted ticket path`} aria-describedby={`${scenario.id}-description`}><source src={`/portfolio/swiggy/media/${scenario.id}.mp4`} type="video/mp4" /></video><a className={styles.textLink} href={`/portfolio/swiggy/media/${scenario.id}.gif`} download>Download reference GIF</a></details>)}</details>
            <details className={swiggy.report}><summary>Compare the visual system candidates</summary><p>These original 21 October captures apply Atlas and Kirridesk to the same working case. Atlas was selected: Inter, neutral surfaces and a near-black action colour. Later reviews standardised 30 × 30 icon hit areas, current-value-first dropdowns and party-contact panels. The selection is a documented design choice, not a user-test result.</p><div className={swiggy.comparisonPair}>{["atlas", "kirridesk"].map(name => <div key={name}><h4>{name === "atlas" ? "Atlas" : "Kirridesk"}</h4><a href={`/portfolio/swiggy/process/${name}.jpg`}><Image src={`/portfolio/swiggy/process/${name}.jpg`} width={1440} height={900} alt={`Original ${name} design-system candidate on the wrong-item case`} sizes="(max-width: 700px) 90vw, 500px" /></a></div>)}</div></details>
            <div className={swiggy.decisionStudy}><h3>One screen does not make these the same decision</h3><DecisionBoundaries /><p>The new policy draft separates remedy, authority, execution and liability. v7.1 demonstrates a choice and case record, not a completed operational system. A fault selection does not authorize a rider deduction, and an approved refund does not prove credit.</p></div>
            <details className={swiggy.report}><summary>Policy, data and implementation assumptions</summary><p>The 14–18 October decisions supersede frozen v1.3: P3 moves upstream; P7/P8, including the earlier ₹500 limit, are removed; live permission becomes tie-up terms. Proposed funding above terms is a project inference, not verified Swiggy practice. The new draft does not silently replace those implemented rules.</p><p>Photos come only from the claimant; the rider and restaurant cannot dispute the decision in this concept. Rider-app records, planned times, thresholds and script outcomes are hypothetical. Fault and action are clickable before every check is complete; this is not an enforced policy gate.</p><p>Agent Desk v7.1 is the final screen reference. Figma stops at 3 November and omits the 4–7 November changes. The interface uses its original Inter typography; the portfolio uses DM Sans. The Design Rulebook documents the actual visual and interaction system.</p></details>
          </div>
        </section>
        <section id="outcome" className={styles.stage} aria-labelledby="outcome-title">
          <h2 id="outcome-title">What it delivers, and where it falls short</h2>
          <div className={styles.stageContent}>
            <div className={swiggy.deliveryFacts}><div><strong>5</strong><span>Playable cases</span><p>Evidence, party context, choice, explanation and closure.</p></div><div><strong>16</strong><span>Recorded findings</span><p>A concrete revision backlog rather than a claim of success.</p></div></div>
            <h3 className={swiggy.graphTitle}>The effort that was actually recorded</h3><EffortChart />
            <p>The original counts range from 17 to 21 actions to Confirm. KLM estimates model pointing, clicking, typing and mental steps. They exclude reading and waiting; they do not show faster decisions against Swiggy’s current tool.</p>
            <details className={swiggy.report}><summary>How to read the effort estimates</summary><p>The supplied walkthrough used 1.3 seconds per point-and-click action, 0.28 seconds per digit, 0.4 seconds each way for hand movement and 1.35 seconds per mental step. For example, SW-2041’s 21 actions and ten mental steps yield about 41 seconds. These are modelled estimates, not observed agent task times or the duration of the edited films.</p></details>
            <h3 className={swiggy.graphTitle}>The evaluation found hidden facts and rigid controls</h3><FindingsChart />
            <div className={swiggy.majorFindings}><div><h3>Partial refunds need an amount</h3><p>The control refunds the full price of affected items, even when only part of a combo is missing. A blank, capped amount field is the proposed fix.</p></div><div><h3>Drafts need room to be read</h3><p>The generated decision explanation exceeds its one-line field. A growing reply box would make review possible before Send.</p></div><div><h3>Unknown conditions need to stay visible</h3><p>Collapsed checks conceal what is not met or unknown. Those rows should remain available without another click.</p></div></div>
            <details className={swiggy.report}><summary>Read all 16 findings and proposed changes</summary><div className={swiggy.tableScroll}><table><thead><tr><th scope="col">Finding</th><th scope="col">Observed problem</th><th scope="col">Proposed next step</th></tr></thead><tbody>{swiggyFindings.map(([id, severity, finding, next]) => <tr key={id}><th scope="row">{id}<span>{severity}</span></th><td>{finding}</td><td>{next}</td></tr>)}</tbody></table></div><p>F4 revisits older conditions deliberately removed or moved upstream. Reconcile the evaluation with the final policy before changing the interface. The findings remain recorded, not fixed.</p></details>
            <div className={swiggy.decisionStudy}><h3>How it fares against its own intent</h3><div className={swiggy.scorecard}><div><h4>Human choice</h4><p>Fault and action start empty; drafts follow the agent’s selection.</p><span>Present in the prototype</span></div><div><h4>Traceable evidence</h4><p>Photo source and time are visible, but the AI summary cannot open its bot transcript.</p><span>Partly achieved</span></div><div><h4>Neutral context</h4><p>All three parties have records, but count order, repeated history and coloured ratings remain problems.</p><span>Needs revision</span></div></div></div>
            <p>Claude performed the supplied heuristic evaluation and assisted in building the prototype. No agents or peers used it, so faster, more accurate or fairer decisions are not established. The next study should compare equivalent cases with agents and measure lookups, conditions checked, draft edits, decision time and rework together.</p>
            <div className={styles.sources}><h3>Sources and credits</h3><p>The 8 November handoff supplies the project record. The three newly supplied HTML wireframes and separate policy draft inform the visual comparison. Project owner: Sukhmanpreet Singh Saini. Research: Akshat. AI assistance: prototype construction and heuristic evaluation. Individual portfolio contribution is still being confirmed.</p><div className={styles.sourceLinks}><Link href="/work/swiggy-agent-workflow/prototype">Try the concept prototype</Link><a href="https://claude.ai/artifact/KtfMHuEqRS3cjPEU9LJ8qV">Original Agent Desk v7.1</a><a href="/portfolio/swiggy/design-rulebook-v7.1.pdf">Design Rulebook v7.1</a><a href="https://www.figma.com/design/GzgfjrlKX8fQURtcMgAYfN">Figma frames, through 3 November</a><a href="https://www.swiggy.com/refund-policy">Swiggy Refund Policy</a><a href="https://www.swiggy.com/terms-and-conditions">Swiggy Terms of Use</a><a href="https://partner.swiggy.com/food/tnc/sellertnc">Swiggy Seller Terms</a><a href="https://aws.amazon.com/solutions/case-studies/suprdaily-case-study/">AWS Supr Daily case study</a></div></div>
          </div>
        </section>
      </div>
    </div>
    <div className={styles.caseEnd}><Link href="/work" className={styles.textLink}>All work</Link><Link href="/work/two-wheeler-dashboard" className={styles.nextCase}>Next project<span>Himalayan 450</span></Link></div>
  </article>;
}
