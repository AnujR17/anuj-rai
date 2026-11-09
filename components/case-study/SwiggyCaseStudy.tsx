import Image from "next/image";
import Link from "next/link";
import { swiggyProject as project, swiggyScenarios, swiggyFindings } from "@/data/swiggy-case-study";
import evidenceFilm from "@/public/portfolio/swiggy/motion/evidence.json";
import partiesFilm from "@/public/portfolio/swiggy/motion/parties.json";
import decisionFilm from "@/public/portfolio/swiggy/motion/decision.json";
import { CaseStudyNav } from "./CaseStudyNav";
import { ProjectArtwork } from "./ProjectArtwork";
import { SwiggyEvolution } from "./SwiggyEvolution";
import { SwiggyFlow } from "./SwiggyFlow";
import { EffortChart } from "./SwiggyGraphics";
import styles from "./case-study.module.css";
import swiggy from "./swiggy-case-study.module.css";

const films = { evidence: evidenceFilm, parties: partiesFilm, decision: decisionFilm };
function Explainer({ id, title, children }: { id: keyof typeof films; title: string; children: React.ReactNode }) {
  return <div className={swiggy.explainer}>
    <h3>{title}</h3><div id={id + "-film-description"}>{children}</div>
    <video className={swiggy.film} controls playsInline preload="none" poster={"/portfolio/swiggy/motion/" + id + ".png"} aria-label={title + ": screen recording"} aria-describedby={id + "-film-description"}>
      <source src={"/portfolio/swiggy/motion/" + id + ".mp4"} type="video/mp4" />
      <a href={"/portfolio/swiggy/motion/" + id + ".gif"}>Open the animated explanation</a>
    </video>
    <div className={swiggy.filmLinks}>
      <a className={styles.textLink} href={"/portfolio/swiggy/motion/" + id + ".gif"} download>Download GIF</a>
      <details><summary>Read the steps</summary><ol>{films[id].chapters.map(chapter => <li key={chapter.title}><strong>{chapter.title}</strong><p>{chapter.detail}</p></li>)}</ol></details>
    </div>
  </div>;
}
function Crop({ file, alt, width, height }: { file: string; alt: string; width: number; height: number }) {
  return <a className={swiggy.crop} href={"/portfolio/swiggy/evolution/" + file + ".png"} aria-label={"Open full-size detail: " + alt}><Image unoptimized src={"/portfolio/swiggy/evolution/" + file + ".png"} width={width} height={height} alt={alt} sizes="(max-width: 700px) 90vw, 980px" /></a>;
}

export function SwiggyCaseStudy() {
  return <article className={styles.caseStudy + " " + swiggy.case}>
    <header className={styles.hero}>
      <Link href="/work" className={styles.textLink}>All work</Link>
      <div className={styles.heroArtwork} data-project-artwork={project.slug}><ProjectArtwork project={project} priority /></div>
      <h1>{project.title}</h1>
    </header>
    <div className={styles.overview + " " + swiggy.overview}>
      <p className={styles.introduction}>{project.summary}</p>
      <dl className={styles.details}>
        <div><dt>The prototype</dt><dd>Agent Desk v7.1<br />Five playable support cases</dd></div>
        <div><dt>My contribution</dt><dd>{project.contribution}</dd></div>
      </dl>
      <div className={styles.framing}><div><h2>Project brief</h2><p>{project.brief}</p></div><div><h2>Problem statement</h2><p>{project.problem}</p></div></div>
      <div className={swiggy.actions}><Link href="/work/swiggy-agent-workflow/prototype" className={styles.textLink}>Try Agent Desk</Link><a href="/portfolio/swiggy/design-rulebook-v7.1.pdf" className={styles.textLink}>Design rulebook</a></div>
      <p className={swiggy.context}>Independent concept, unaffiliated with Swiggy. The tickets and conversations are fictional; evidence photos were generated with Figma AI.</p>
    </div>
    <div className={styles.readingLayout}>
      <CaseStudyNav />
      <div className={styles.story}>
        <section id="research" className={styles.stage} aria-labelledby="research-title">
          <h2 id="research-title">What does the agent need to check?</h2>
          <div className={styles.stageContent}>
            <p className={swiggy.lead}>I started with refund and dispute review because one complaint can involve three different accounts: the customer’s, the restaurant’s and the rider’s. The agent has to relate those accounts to the same order.</p>
            <p>I researched public policies and support tools, alongside our group’s research. A ten-minute call with an American Express customer-service expert reinforced the need to make evidence easy to take in during a live conversation. We had no access to Swiggy agents or their internal screens.</p>
            <div className={swiggy.researchRows}>
              <div><h3>Policy</h3><p>Swiggy’s public refund wording requires merchant permission. It leaves the internal approval process unspecified. I used a labelled working policy to make the prototype playable.</p></div>
              <div><h3>Evidence</h3><p>A photo needs its origin and submission time. The design keeps those facts with the image, so the agent can inspect what was actually supplied.</p></div>
              <div><h3>Party records</h3><p>Customer, restaurant and rider history sit within the current case. The complaint still needs to be investigated on its own evidence.</p></div>
            </div>
            <details className={swiggy.report}><summary>Research sources and limits</summary><p>The source record combines Swiggy’s public terms, comparisons with Uber Eats and DoorDash, literature, one outside-domain expert call and a separately labelled simulated interview. The simulated material is secondary research, not a conversation with a real participant.</p><p>Akshat’s customer-side audit included fabricated complaints. Its accounts disagree about later genuine claims, and whether the refunds were returned is unrecorded. I have kept that account in the research record without using it to estimate how often refunds are mishandled.</p><p>The public terms do not reveal Swiggy’s current agent workflow. The restaurant caps, evidence requirements and operational thresholds used here are project assumptions or adapted rules. The case does not present them as Swiggy’s internal policy.</p><div className={styles.sourceLinks}><a href="https://www.swiggy.com/refund-policy">Swiggy Cancellation and Refund Policy</a><a href="https://www.swiggy.com/terms-and-conditions">Swiggy Terms of Use</a><a href="https://partner.swiggy.com/food/tnc/sellertnc">Swiggy Seller Terms</a></div></details>
          </div>
        </section>
        <section id="insights" className={styles.stage} aria-labelledby="insights-title">
          <h2 id="insights-title">The conversation cannot stop for the investigation</h2>
          <div className={styles.stageContent}>
            <p className={swiggy.lead}>I organised the workspace around the order: case information on the left, the live conversation in the middle, and policy checks with the decision on the right. Restaurant and rider conversations stay inside that case.</p>
            <Crop file="evidence-clean" width={1440} height={900} alt="Original SW-2041 workspace: order and evidence on the left, live customer chat in the middle, history, policy and decision on the right" />
            <p className={swiggy.afterVisual}>That separation gives each area a job, but it also puts some evidence and its policy check in different columns. The condition-led alternative kept those closer together. I carried the three-column direction forward; the extra cross-referencing remains a trade-off to test.</p>
            <details className={swiggy.report}><summary>Compare the two layout directions</summary><div className={swiggy.layoutAlternatives}><div><h3>Three columns, selected</h3><div className={swiggy.threeColumns}><span>Case</span><span>Conversation</span><span>Checks and decision</span></div><p>Separate places for investigation, communication and the decision. Some facts need to be related across columns.</p></div><div><h3>Condition-led alternative</h3><div className={swiggy.twoColumns}><span>Conversation</span><span>Condition<br />Evidence<br />Action</span></div><p>Evidence sits with its condition. The source recommended this direction; the three-column layout was selected by preference, without a comparative user test.</p></div></div></details>
          </div>
        </section>
        <section id="concept" className={styles.stage} aria-labelledby="concept-title">
          <h2 id="concept-title">What changed between the wireframes</h2>
          <div className={styles.stageContent}>
            <p>I used the wireframes to work through how much information fits while the chat stays usable. Compare the original versions below. Their sample data changes; the comparison shows layout and interaction changes.</p>
            <SwiggyEvolution />
            <div className={swiggy.decisionStudy}>
              <h3>Hold is a pause, not a refund outcome</h3>
              <p>In the second iteration, Hold competes with Full refund, Partial, Deny and Send to review. In the third, it moves beside the conversation timer. The agent can wait for a restaurant or rider without treating that pause as the remedy.</p>
              <div className={swiggy.comparisonPair}><div><h4>Second iteration</h4><Crop file="decision-v2" width={440} height={100} alt="Original second-iteration row: four remedy choices plus On hold" /></div><div><h4>Third iteration</h4><Crop file="decision-v3" width={440} height={100} alt="Original third-iteration row: four remedy choices after Hold moved beside the timer" /></div></div>
            </div>
            <details className={swiggy.report}><summary>Two choices that still need scrutiny</summary><h3>Compact checks can conceal a problem</h3><p>The first wireframe’s fit notes estimate that policy rows shrank from about 430 to 200 pixels. Later, checks start collapsed. That buys room for the conversation but hides unknown and unmet conditions, which became a major evaluation finding.</p><h3>A past answer can become the next answer</h3><p>The third iteration includes a Star case with a previous outcome, similarity colours and a fairness score. It is absent from v7.1. The final design still uses coloured rider and restaurant ratings, so the risk of influencing the agent’s judgement is not fully resolved.</p><Crop file="star-detail" width={510} height={770} alt="Original third-iteration Star case with previous refund, similarity colours and fairness score" /></details>
          </div>
        </section>
        <section id="design" className={styles.stage} aria-labelledby="design-title">
          <h2 id="design-title">From a wrong dish to a recorded decision</h2>
          <div className={styles.stageContent}>
            <p className={swiggy.lead}>In SW-2041, Siddharth ordered kadai paneer and says malai kofta arrived. I used this case to connect evidence review, restaurant contact and the final explanation.</p>
            <SwiggyFlow />
            <p className={swiggy.context}>This map explains the scripted investigation. The prototype lets the agent choose an action before completing every check. Calls, refunds and review handoffs are simulated.</p>
            <Explainer id="evidence" title="Inspect what the customer sent"><p>Open the two photos, inspect their source and time, then record Agree or Disagree. Those controls capture the agent’s observation. Fault and remedy remain unselected.</p></Explainer>
            <Explainer id="parties" title="Inspect the restaurant and rider records"><p>The restaurant and rider tabs expose their records within SW-2041. Returning to the customer keeps the same complaint open. Hold records who the agent is waiting for beside the timer, leaving the refund choice available for later.</p></Explainer>
            <Explainer id="decision" title="Explain the choice before confirming"><p>In the full scripted investigation, the restaurant confirms a bag swap. Choosing Restaurant and Full refund then loads an editable explanation. The clip follows the agent sending it, selecting a reason and confirming. The complete ticket recording below continues through closing messages.</p></Explainer>
            <p className={swiggy.context}>These are recordings of the working fictional prototype, edited with close-ups and explanatory text. Playback is optional; the steps are also available as text.</p>
            <details className={swiggy.report}><summary>Watch all five ticket paths</summary><p>The other cases exercise a missing combo item, conflicting delivery records, a quality complaint and late delivery. Each recording follows a scripted path through the original prototype.</p>{swiggyScenarios.map(scenario => <details className={swiggy.scenario} key={scenario.id}><summary>{scenario.title}<span>{scenario.ticket}</span></summary><p id={scenario.id + "-description"}>{scenario.focus}</p><video className={swiggy.recording} controls playsInline preload="none" poster={"/portfolio/swiggy/media/" + scenario.id + ".png"} aria-label={scenario.title + ": complete scripted ticket path"} aria-describedby={scenario.id + "-description"}><source src={"/portfolio/swiggy/media/" + scenario.id + ".mp4"} type="video/mp4" /></video><a className={styles.textLink} href={"/portfolio/swiggy/media/" + scenario.id + ".gif"} download>Download reference GIF</a></details>)}</details>
            <details className={swiggy.report}><summary>Compare Atlas and Kirridesk</summary><p>I compared the two visual systems on the same working case and carried Atlas forward: Inter, neutral surfaces and near-black actions. The original captures show that choice before the later spacing, dropdown and icon refinements.</p><div className={swiggy.comparisonPair}>{["atlas", "kirridesk"].map(name => <div key={name}><h4>{name === "atlas" ? "Atlas" : "Kirridesk"}</h4><a href={"/portfolio/swiggy/process/" + name + ".jpg"}><Image src={"/portfolio/swiggy/process/" + name + ".jpg"} width={1440} height={900} alt={"Original " + name + " candidate on the wrong-item case"} sizes="(max-width: 700px) 90vw, 500px" /></a></div>)}</div></details>
          </div>
        </section>
        <section id="outcome" className={styles.stage} aria-labelledby="outcome-title">
          <h2 id="outcome-title">What the prototype revealed</h2>
          <div className={styles.stageContent}>
            <p className={swiggy.lead}>Agent Desk v7.1 contains five playable cases and a design rulebook. The documented heuristic review found 16 issues. Three affect the main decision flow.</p>
            <div className={swiggy.findingStories}>
              <div><div><h3>Only the vadas are missing</h3><p>In SW-2070, the customer reports that part of a ₹220 combo is missing. Partial refunds the whole affected item because there is no refund-amount field. The next version needs an empty amount field capped at the item price.</p></div><a href="/portfolio/swiggy/findings/partial.png" aria-label="Open original partial-refund finding at full size"><Image unoptimized src="/portfolio/swiggy/findings/partial.png" width={440} height={260} alt="Original review crop: Partial is selected and ₹220 is shown, with no refund amount input" sizes="(max-width: 700px) 85vw, 440px" /></a></div>
              <div><div><h3>The reply needs room to be read</h3><p>The decision explanation exceeds its one-line field. A growing reply box would let the agent review the message before sending it.</p></div><a href="/portfolio/swiggy/findings/draft.png" aria-label="Open original truncated-draft finding at full size"><Image unoptimized src="/portfolio/swiggy/findings/draft.png" width={572} height={65} alt="Original review crop: decision-message text is truncated inside the one-line reply box" sizes="(max-width: 700px) 85vw, 572px" /></a></div>
              <div><div><h3>The important check is one click away</h3><p>Collapsed policy checks conceal unmet and unknown conditions. Those rows need to remain visible while the agent is deciding.</p></div><a href="/portfolio/swiggy/findings/checks.png" aria-label="Open original collapsed-policy finding at full size"><Image unoptimized src="/portfolio/swiggy/findings/checks.png" width={440} height={220} alt="Original review crop: Policy checks is collapsed beneath the three-party history counts" sizes="(max-width: 700px) 85vw, 440px" /></a></div>
            </div>
            <p>The findings remain unresolved. Claude performed the review and assisted prototype construction; no support agents tested this version. I would revise these three controls before a think-aloud review with agents, then check whether they notice missing evidence, review the drafts and reach a decision without skipping checks.</p>
            <details className={swiggy.report}><summary>Read all 16 findings and proposed changes</summary><div className={swiggy.tableScroll}><table><thead><tr><th scope="col">Finding</th><th scope="col">Observed problem</th><th scope="col">Proposed next step</th></tr></thead><tbody>{swiggyFindings.map(([id, severity, finding, next]) => <tr key={id}><th scope="row">{id}<span>{severity}</span></th><td>{finding}</td><td>{next}</td></tr>)}</tbody></table></div><p>F4 disputes rules from an older policy version. The later decisions moved the claim window upstream and removed P7/P8. That disagreement needs reconciliation before changing the interface.</p></details>
            <details className={swiggy.report}><summary>Action counts and estimated effort</summary><EffortChart /><p>The original walkthrough counted 17–21 actions to Confirm. Its Keystroke-Level Model estimates exclude reading and waiting. There is no measured baseline for Swiggy’s tool, so these figures cannot establish faster handling.</p></details>
            <details className={swiggy.report}><summary>What the prototype leaves open</summary><p>The photo model only includes customer-supplied evidence. Restaurants and riders cannot dispute a decision here. The AI handover summary also lacks access to its underlying bot transcript. Those gaps matter alongside the three major control problems.</p><p>The later policy draft separates remedy, approval authority, payment execution and liability. v7.1 does not implement that full system: confirming a refund records a simulated choice, and selecting fault does not authorize a rider deduction.</p><p>The prototype is the final screen reference. Figma stops at 3 November and omits the 4–7 November changes. Similar-case references, linked condition/evidence highlighting and the full reviewer flow remain unbuilt.</p></details>
            <div className={styles.sources}><h3>Sources and credits</h3><p>{project.note}</p><div className={styles.sourceLinks}><Link href="/work/swiggy-agent-workflow/prototype">Try Agent Desk</Link><a href="/portfolio/swiggy/design-rulebook-v7.1.pdf">Design Rulebook v7.1</a><a href="https://www.figma.com/design/GzgfjrlKX8fQURtcMgAYfN">Figma frames, through 3 November</a><a href="https://claude.ai/artifact/KtfMHuEqRS3cjPEU9LJ8qV">Original Agent Desk v7.1</a></div></div>
          </div>
        </section>
      </div>
    </div>
    <div className={styles.caseEnd}><Link href="/work" className={styles.textLink}>All work</Link><Link href="/work/two-wheeler-dashboard" className={styles.nextCase}>Next project<span>Himalayan 450</span></Link></div>
  </article>;
}
