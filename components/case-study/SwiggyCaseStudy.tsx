import Image from "next/image";
import Link from "next/link";
import { swiggyProject as project, swiggyFindings } from "@/data/swiggy-case-study";
import { CaseStudyNav } from "./CaseStudyNav";
import { DeviceFrame } from "./DeviceFrame";
import { DeviceMotion } from "./DeviceMotion";
import { SwiggyEvolution } from "./SwiggyEvolution";
import { SwiggyScenarios } from "./SwiggyScenarios";
import { SwiggyFlow } from "./SwiggyFlow";
import { EffortChart } from "./SwiggyGraphics";
import styles from "./case-study.module.css";
import swiggy from "./swiggy-case-study.module.css";

const filmSteps = {
  evidence: ["Open the customer’s photos from the case.", "Read the source and submission time beside each image.", "Record Agree or Disagree for each photo, then return to the conversation."],
  parties: ["Open the restaurant’s records, then the rider’s trip details.", "Return to the customer within the same case.", "Use Hold to record who the agent is waiting for."],
  decision: ["Choose Restaurant and Full refund for this recorded branch.", "Review and send the explanation, then select a reason.", "Confirm to add the decision to the case record."],
};
function Explainer({ id, title, children }: { id: keyof typeof filmSteps; title: string; children: React.ReactNode }) {
  return <div className={swiggy.explainer}>
    <h3>{title}</h3>{children}
    <DeviceMotion id={id} label={title} src={"/portfolio/swiggy/device/" + id + ".mp4"} poster={"/portfolio/swiggy/device/" + id + ".png"} gif={"/portfolio/swiggy/device/" + id + "-mockup.gif"} variant={id === "parties" ? "desktop" : "laptop"} tone={id === "decision" ? "ink" : "paper"} />
    <details className={swiggy.motionSteps}><summary>Read the interaction</summary><ol>{filmSteps[id].map(step => <li key={step}>{step}</li>)}</ol></details>
  </div>;
}
function Crop({ file, alt, width, height }: { file: string; alt: string; width: number; height: number }) {
  return <a className={swiggy.crop} href={"/portfolio/swiggy/evolution/" + file + ".png"} aria-label={"Open full-size detail: " + alt}><Image unoptimized src={"/portfolio/swiggy/evolution/" + file + ".png"} width={width} height={height} alt={alt} sizes="(max-width: 700px) 90vw, 980px" /></a>;
}

export function SwiggyCaseStudy() {
  return <article className={styles.caseStudy + " " + swiggy.case}>
    <header className={styles.hero}>
      <Link href="/work" className={styles.textLink}>All work</Link>
      <div className={styles.heroArtwork + " " + swiggy.heroDevice} data-project-artwork={project.slug}>
        <DeviceFrame><Link href="/work/swiggy-agent-workflow/prototype" aria-label="Open the Agent Desk prototype"><Image unoptimized src="/portfolio/swiggy/media/wrong-item.png" width={1440} height={900} alt="Agent Desk’s wrong-item conversation, presented in a laptop mockup" preload sizes="(max-width: 700px) 90vw, 850px" /></Link></DeviceFrame>
      </div>
      <h1>{project.title}</h1>
    </header>
    <div className={styles.overview + " " + swiggy.overview}>
      <p className={styles.introduction}>{project.summary}</p>
      <dl className={styles.details}>
        <div><dt>Project</dt><dd>Support-tool concept<br />Five fictional cases</dd></div>
        <div><dt>My role</dt><dd>{project.contribution}</dd></div>
      </dl>
      <div className={styles.framing}><div><h2>Project brief</h2><p>{project.brief}</p></div><div><h2>The challenge</h2><p>{project.problem}</p></div></div>
      <div className={swiggy.actions}><Link href="/work/swiggy-agent-workflow/prototype" className={styles.textLink}>Try Agent Desk</Link><a href="/portfolio/swiggy/design-rulebook-v7.1.pdf" className={styles.textLink}>Design rulebook</a></div>
      <p className={swiggy.context}>An independent concept, unaffiliated with Swiggy.</p>
    </div>
    <div className={styles.readingLayout}>
      <CaseStudyNav />
      <div className={styles.story}>
        <section id="research" className={styles.stage} aria-labelledby="research-title">
          <h2 id="research-title">What a refund decision depends on</h2>
          <div className={styles.stageContent + " " + swiggy.narrative}>
            <p>I began with the parts of support I could examine: public policies, other platforms’ refund guidance and our group’s research into decision support. A short call with an American Express customer-service expert added an operational perspective: the screen needs to make evidence easy to take in while the agent works.</p>
            <p>Swiggy’s public refund terms require merchant permission, but leave the internal approval process unspecified. That gap affected the design. The early wireframes requested permission during the case; later versions used standing restaurant terms. I treated those terms as a project assumption and documented them separately from published policy.</p>
            <p>Fraud assessment brought another difficulty. A refund history or a late photo might be worth investigating, yet neither explains what happened to this order. I wanted the agent to see where a record came from, compare it with other accounts and ask the next useful question.</p>
            <details className={swiggy.report}><summary>Research and source notes</summary><p>The research record includes public policy, cross-platform comparisons, literature, one ten-minute call with an American Express customer-service expert and a separately labelled simulated interview. Swiggy agents and internal operating data were unavailable to us. The simulated interview supplied secondary material, not participant evidence.</p><p>Akshat’s customer-side audit included fabricated complaints. The accounts disagree about later genuine claims, and whether the refunds were returned is unrecorded. That account remains in the source record; it is not used to estimate fraud prevalence.</p><div className={styles.sourceLinks}><a href="https://www.swiggy.com/refund-policy">Swiggy Cancellation and Refund Policy</a><a href="https://www.swiggy.com/terms-and-conditions">Swiggy Terms of Use</a><a href="https://partner.swiggy.com/food/tnc/sellertnc">Swiggy Seller Terms</a></div></details>
          </div>
        </section>
        <section id="insights" className={styles.stage} aria-labelledby="insights-title">
          <h2 id="insights-title">One order, three accounts</h2>
          <div className={styles.stageContent + " " + swiggy.narrative}>
            <p>The customer describes what arrived. The restaurant has a packing record. The rider has a trip record. I brought those accounts into a shared case, with the live conversation between the order details and the policy checks.</p>
            <p>The agent can move between the parties, inspect a source, change a check and choose how to proceed. That is the role I wanted for the system: a companion to the investigation, with the judgement still belonging to the person handling it.</p>
            <div className={swiggy.staticDevice}><DeviceFrame variant="desktop"><a href="/portfolio/swiggy/evolution/evidence-clean.png" aria-label="Inspect the original workspace at full size"><Image unoptimized src="/portfolio/swiggy/evolution/evidence-clean.png" width={1440} height={900} alt="Original Agent Desk interface with order information, customer conversation and policy checks in three columns" sizes="(max-width: 700px) 90vw, 1000px" /></a></DeviceFrame></div>
            <details className={swiggy.report}><summary>The layout choice</summary><p>I chose three columns to give the conversation a stable place while the agent investigates. A condition-led alternative put evidence beside each policy condition. It would keep a condition and its evidence together, while making the separate information groups less distinct. The three-column choice still needs a comparative user review.</p><div className={swiggy.layoutAlternatives}><div><h3>Selected layout</h3><div className={swiggy.threeColumns}><span>Case</span><span>Conversation</span><span>Checks and decision</span></div></div><div><h3>Condition-led alternative</h3><div className={swiggy.twoColumns}><span>Conversation</span><span>Condition<br />Evidence<br />Action</span></div></div></div></details>
          </div>
        </section>
        <section id="concept" className={styles.stage} aria-labelledby="concept-title">
          <h2 id="concept-title">Making room for the conversation</h2>
          <div className={styles.stageContent + " " + swiggy.narrative}>
            <p>The early wireframes repeated permission and history in several places. Working through the screens meant deciding what needed to stay in view and what the agent could open when it became relevant.</p>
            <SwiggyEvolution />
            <div className={swiggy.decisionStudy}>
              <h3>Moving Hold to the conversation</h3>
              <p>Hold originally sat beside the refund choices. Moving it to the chat timer separated waiting for someone from deciding what the customer should receive. The agent could pause the conversation without committing to an outcome.</p>
              <div className={swiggy.comparisonPair}><div><h4>Second iteration</h4><Crop file="decision-v2" width={440} height={100} alt="Original second-iteration action row including On hold" /></div><div><h4>Third iteration</h4><Crop file="decision-v3" width={440} height={100} alt="Original third-iteration action row after Hold moved to the chat timer" /></div></div>
            </div>
            <details className={swiggy.report}><summary>The dashboard and earlier explorations</summary><p>My Workspace keeps Assigned, On hold, Shelved and Closed cases together. Opening a ticket moves the agent into its conversation. The performance values in this screen are fictional sample data.</p><div className={swiggy.staticDevice}><DeviceFrame><a href="/portfolio/swiggy/process/workspace.png"><Image unoptimized src="/portfolio/swiggy/process/workspace.png" width={1440} height={900} alt="Original Agent Desk dashboard with fictional queue and performance values" sizes="(max-width: 700px) 90vw, 980px" /></a></DeviceFrame></div><p>The third wireframe also included a Star case with a previous outcome and a fairness score. That reference aid is absent from v7.1. Coloured party ratings remain, and the review flags the judgement they could imply.</p><Crop file="star-detail" width={510} height={770} alt="Original third-iteration Star case with a previous refund and fairness score" /></details>
          </div>
        </section>
        <section id="design" className={styles.stage} aria-labelledby="design-title">
          <h2 id="design-title">Five conversations to work through</h2>
          <div className={styles.stageContent + " " + swiggy.narrative}>
            <p>A wrong dish, a missing item and a delivery dispute ask different things of an agent. I built five scenarios around those differences, leaving room for the investigation to change as a party responds or the evidence is questioned.</p>
            <SwiggyScenarios />
            <p>The recordings follow one route through each case. The prototype uses scripted branches to explore alternative accounts; the agent chooses the final action. Ticket data and replies are fictional; evidence photos were generated with Figma AI. Calls and refunds are simulated.</p>
            <details className={swiggy.report}><summary>See the investigation flow</summary><SwiggyFlow /></details>
            <div className={swiggy.interactionSequence}>
              <Explainer id="evidence" title="Review the photo in context"><p>I kept the image’s source and submission time inside the viewer, beside Agree and Disagree. The agent can inspect both photos and record an observation before returning to the customer.</p></Explainer>
              <Explainer id="parties" title="Keep the contact inside the case"><p>Restaurant and rider records open within the same complaint. The agent can inspect a trip, return to the customer and hold the conversation while waiting for someone else.</p></Explainer>
              <Explainer id="decision" title="Keep the reason with the decision"><p>In this wrong-item branch, the restaurant admits a bag swap. Selecting Restaurant and Full refund creates an editable explanation. The agent sends it, chooses a reason and confirms, leaving a record of the decision.</p></Explainer>
            </div>
            <details className={swiggy.report}><summary>Compare Atlas and Kirridesk</summary><p>I compared both visual systems on the same case and carried Atlas forward: Inter, neutral surfaces and near-black actions. Later reviews refined the spacing, dropdown order and icon states.</p><div className={swiggy.comparisonPair}>{["atlas", "kirridesk"].map(name => <div key={name}><h4>{name === "atlas" ? "Atlas" : "Kirridesk"}</h4><a href={"/portfolio/swiggy/process/" + name + ".jpg"}><Image unoptimized src={"/portfolio/swiggy/process/" + name + ".jpg"} width={1440} height={900} alt={"Original " + name + " candidate on the wrong-item case"} sizes="(max-width: 700px) 90vw, 500px" /></a></div>)}</div></details>
          </div>
        </section>
        <section id="outcome" className={styles.stage} aria-labelledby="outcome-title">
          <h2 id="outcome-title">What the working prototype made visible</h2>
          <div className={styles.stageContent + " " + swiggy.narrative}>
            <p>The prototype took the design through investigation, contact, a decision and closure. A heuristic review then found sixteen issues. Three exposed places where the controls fell short of the decisions the scenarios asked the agent to make.</p>
            <div className={swiggy.findingStories}>
              <div><div><h3>Refunding part of a combo</h3><p>The agent can choose Partial, but the control still refunds the whole ₹220 combo. For missing vadas, it needs a separate amount field for the affected portion.</p></div><a href="/portfolio/swiggy/findings/partial.png" aria-label="Open the original partial-refund finding"><Image unoptimized src="/portfolio/swiggy/findings/partial.png" width={440} height={260} alt="Original review crop: Partial selected without a refund-amount field" sizes="(max-width: 700px) 85vw, 440px" /></a></div>
              <div><div><h3>Reading the message before sending it</h3><p>The decision draft outgrows its one-line input. I would let the box expand so the agent can review the full explanation before sending.</p></div><a href="/portfolio/swiggy/findings/draft.png" aria-label="Open the original message-draft finding"><Image unoptimized src="/portfolio/swiggy/findings/draft.png" width={572} height={65} alt="Original review crop: a decision draft truncated by the one-line reply box" sizes="(max-width: 700px) 85vw, 572px" /></a></div>
              <div><div><h3>Seeing the checks that need attention</h3><p>Collapsing the checks saves space, but conceals unmet and unknown conditions. Those rows need to stay visible during the decision.</p></div><a href="/portfolio/swiggy/findings/checks.png" aria-label="Open the original collapsed-checks finding"><Image unoptimized src="/portfolio/swiggy/findings/checks.png" width={440} height={220} alt="Original review crop: policy checks collapsed beneath history counts" sizes="(max-width: 700px) 85vw, 440px" /></a></div>
            </div>
            <p>These would be my first revisions before putting the prototype in front of trained agents. I want to see which records they consult, when they question a claim and whether the explanation reflects their own reasoning. Faster handling would matter only alongside complete checks and sound decisions on genuine and potentially misleading claims.</p>
            <p>The findings are still open. Claude assisted prototype construction and performed the documented heuristic review; no agents tested this version. We also lack a baseline for Swiggy’s current tool, so any quality or efficiency gain remains a prediction to evaluate.</p>
            <details className={swiggy.report}><summary>Read all 16 findings and proposed changes</summary><div className={swiggy.tableScroll}><table><thead><tr><th scope="col">Finding</th><th scope="col">Observed problem</th><th scope="col">Proposed next step</th></tr></thead><tbody>{swiggyFindings.map(([id, severity, finding, next]) => <tr key={id}><th scope="row">{id}<span>{severity}</span></th><td>{finding}</td><td>{next}</td></tr>)}</tbody></table></div><p>F4 refers to older policy conditions later moved upstream or removed. That version disagreement needs to be reconciled before a revision.</p></details>
            <details className={swiggy.report}><summary>Effort estimates and the next evaluation</summary><EffortChart /><p>The walkthrough’s 17–21 actions and KLM estimates exclude reading and waiting. A future comparison could present the same synthetic records separately and inside Agent Desk, testing the value of connected context. That study condition would not represent Swiggy’s current workflow.</p><p>I would consider time to decision alongside missed checks, unsupported fraud conclusions, reasons recorded and cases reopened. The current prototype also lacks a full reviewer workspace, a route for restaurants and riders to dispute decisions, and access to the bot transcript behind the handover summary.</p></details>
            <div className={styles.sources}><h3>Sources and credits</h3><p>Developed within a four-person group including Sukhmanpreet Singh Saini and Akshat. My work covered research, the concept, design and business logic. Claude assisted implementation and the documented review. The original prototype is the final screen reference; Figma stops before its 4–7 November updates.</p><div className={styles.sourceLinks}><Link href="/work/swiggy-agent-workflow/prototype">Try Agent Desk</Link><a href="/portfolio/swiggy/design-rulebook-v7.1.pdf">Design Rulebook v7.1</a><a href="https://www.figma.com/design/GzgfjrlKX8fQURtcMgAYfN">Figma design</a><a href="https://claude.ai/artifact/KtfMHuEqRS3cjPEU9LJ8qV">Original Agent Desk v7.1</a></div></div>
          </div>
        </section>
      </div>
    </div>
    <div className={styles.caseEnd}><Link href="/work" className={styles.textLink}>All work</Link><Link href="/work/two-wheeler-dashboard" className={styles.nextCase}>Next project<span>Himalayan 450</span></Link></div>
  </article>;
}
