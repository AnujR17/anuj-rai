import Image from "next/image";
import Link from "next/link";
import { swiggyProject as project, swiggyScenarios, swiggyFindings } from "@/data/swiggy-case-study";
import { CaseStudyNav } from "./CaseStudyNav";
import { CaseNumbers } from "./CaseNumbers";
import { ProjectArtwork } from "./ProjectArtwork";
import styles from "./case-study.module.css";
import swiggy from "./swiggy-case-study.module.css";

function Recording({ id, title }: { id: string; title: string }) {
  return <video className={swiggy.recording} controls playsInline preload="none" poster={`/portfolio/swiggy/media/${id}.png`} aria-label={`${title}: scripted Agent Desk walkthrough`} aria-describedby={`${id}-description`}>
    <source src={`/portfolio/swiggy/media/${id}.mp4`} type="video/mp4" />
    <a href={`/portfolio/swiggy/media/${id}.gif`}>Open the {title.toLowerCase()} GIF</a>
  </video>;
}

export function SwiggyCaseStudy() {
  return <article className={styles.caseStudy}>
    <header className={styles.hero}>
      <Link href="/work" className={styles.textLink}>All work</Link>
      <div className={styles.heroArtwork} data-project-artwork={project.slug}><ProjectArtwork project={project} priority /></div>
      <h1>{project.title}</h1>
    </header>
    <div className={styles.overview}>
      <p className={styles.introduction}>{project.summary}</p>
      <dl className={styles.details}>
        <div><dt>Deliverable</dt><dd>Agent Desk v7.1<br />Coded concept and Design Rulebook</dd></div>
        <div><dt>Project credits</dt><dd>Sukhmanpreet Singh Saini, project owner<br />Akshat, research collaborator<br />AI assistance in prototyping and evaluation</dd></div>
      </dl>
      <div className={styles.framing}>
        <div><h2>Project brief</h2><p>{project.brief}</p></div>
        <div><h2>Problem statement</h2><p>{project.problem}</p></div>
        <div><h2>Project context</h2><p>Independent concept, unaffiliated with Swiggy. “Escalation agent” is the project’s term for the human receiving a bot handover, not a verified Swiggy job title. The final prototype is dated 7 November 2026; its case data, conversations and replies are fictional, and its evidence photos were generated with Figma AI.</p></div>
      </div>
      <div className={swiggy.actions}><Link href="/work/swiggy-agent-workflow/prototype" className={styles.textLink}>Try the prototype</Link><a href="/portfolio/swiggy/design-rulebook-v7.1.pdf" className={styles.textLink}>Read the design rulebook</a></div>
      <CaseNumbers slug={project.slug} />
    </div>
    <div className={styles.readingLayout}>
      <CaseStudyNav />
      <div className={styles.story}>
        <section id="research" className={styles.stage} aria-labelledby="research-title">
          <h2 id="research-title">Designing from public evidence</h2>
          <div className={styles.stageContent}>
            <div className={styles.block}>
              <p>The project had no access to Swiggy support agents, its internal tool, real case data or confidential policy. Public refund and seller terms supplied the starting point. Other platforms’ published rules, reporting and literature on automation bias informed comparisons, without being treated as Swiggy’s internal process.</p>
              <p>A single ten-minute call with an American Express customer-service expert added a perspective from outside food delivery: insights should derive from policy, and information should remove work from a decision. A source-grounded simulated interview supplemented the research. It was not another participant or primary interview.</p>
            </div>
            <div className={styles.block}>
              <h3>Separate a rule from an assumption</h3>
              <p>The research used seven source labels: Published, Law, Borrowed, Reported, Owner, Hypothetical and Inferred. They distinguish a platform statement from an adaptation or project decision. A borrowed threshold cannot become a claim about how Swiggy operates.</p>
              <p>Akshat’s customer-side audit reported fabricated complaints as well as genuine ones. The accounts disagree about how the genuine claims were handled, so they cannot support a success rate or general conclusion about support quality. The fabricated claims were refunded in both accounts; whether that money was returned is not recorded. This ethically problematic method is disclosed as a limitation, not recommended or repeated.</p>
            </div>
          </div>
        </section>
        <section id="insights" className={styles.stage} aria-labelledby="insights-title">
          <h2 id="insights-title">Reduce searching without removing judgement</h2>
          <div className={styles.stageContent}>
            <div className={styles.block}>
              <p>The synthesis separated three things an agent needs: the recorded facts, an objective comparison with a policy condition, and an action the agent can take. A photo’s origin and submission time belong on screen. A label calling the customer suspicious does not.</p>
              <p>History also needs context. Dated counts for a customer, restaurant or rider can be inspected; a single trust score conceals its basis. Showing all three parties matters because the same refund can benefit one party and transfer a cost to another.</p>
            </div>
            <div className={swiggy.principles}>
              <div><h3>Recorded fact</h3><p>What was ordered, what was reported, who supplied the evidence and when.</p></div>
              <div><h3>Objective comparison</h3><p>Which condition the record relates to, and what is met, not met or unknown.</p></div>
              <div><h3>Agent action</h3><p>Investigate, contact a party, choose an outcome and record a reason.</p></div>
            </div>
            <div className={styles.block}><h3>What these insights can establish</h3><p>They define a design direction from mixed evidence. The agent mental model and personas are inferred, not based on observed Swiggy agents. Faster or fairer decisions remain questions for evaluation.</p></div>
          </div>
        </section>
        <section id="concept" className={styles.stage} aria-labelledby="concept-title">
          <h2 id="concept-title">Support the decision, never make it</h2>
          <div className={styles.stageContent}>
            <div className={styles.block}><p>Two arrangements were compared: a three-column workspace and a chat beside a condition-led panel. The condition-led option placed evidence nearer the rule it supported. The project owner chose three columns to keep case information, conversation and derived insights visibly separate. That preference kept a familiar workspace, but required more cross-referencing.</p></div>
            <div className={styles.block}><h3>A test for every proposed insight</h3><p>Six questions governed what could appear: is it objective, traceable, descriptive rather than predictive, free of a prescribed outcome, fair across the parties, and useful enough to remove a lookup or calculation? Fraud scores, “most likely at fault”, suggested amounts and pre-selected outcomes failed that test.</p><p>The agent therefore chooses fault and action. A decision-message draft appears only after that choice, and the agent sends it. An AI handover summary is a separate feature; its inability to open the underlying transcript remains a recorded problem.</p></div>
            <div className={styles.block}><h3>Policies changed with the design</h3><p>The 14–18 October decisions supersede the early frozen policy. The claim window moved upstream, an earlier ₹500 approval limit was removed, and restaurant permission became tie-up refund terms. The final prototype’s data and engine are the reference for what is actually shown.</p><p>Several choices remain project assumptions or deliberate departures from public-policy wording, including the proposed cost split above restaurant terms. They are concept rules, not verified Swiggy practice. Earlier ideas such as similar cases, separate clocks and linked evidence highlighting were specified but were not built.</p></div>
          </div>
        </section>
        <section id="design" className={styles.stage} aria-labelledby="design-title">
          <h2 id="design-title">From handover to a recorded decision</h2>
          <div className={styles.stageContent}>
            <div className={styles.block}><p>The final workspace has a narrow queue rail, case information, a conversation area with customer, rider and restaurant views, and an insights-and-decision column. The evidence viewer records Agree or Disagree. Party contact reveals its chat or transcription panel; policy checks, history and the decision stay available around the conversation.</p><p>Fault and action start empty. Selecting them prepares a customer message. Confirm records the decision and reason; closing messages then complete the case, remove it from the active queue and leave an audit trail. The prototype allows decisions before every check is complete, so this flow should not be read as an enforced policy gate.</p></div>
            <div className={styles.block}><h3>Five paths through the same workspace</h3><p>These recordings were captured by clicking through the supplied prototype. They use edited, step-paced timing and scripted replies, not live calls, payment processing or measured handling time. Play is optional. Each path is also available as a GIF.</p></div>
            {swiggyScenarios.map((scenario, index) => <details className={swiggy.scenario} key={scenario.id} open={index === 0}>
              <summary>{scenario.title}<span>{scenario.ticket}</span></summary>
              <p id={`${scenario.id}-description`}>{scenario.focus}</p>
              <Recording id={scenario.id} title={scenario.title} />
              <a className={styles.textLink} href={`/portfolio/swiggy/media/${scenario.id}.gif`} download>Download GIF</a>
            </details>)}
            <div className={styles.block}><h3>What the review rounds changed</h3><p>Wireframes tested the information fit before the same prototype was compared in Atlas and Kirridesk. These original 21 October captures show the candidate systems; Atlas was selected. The later rounds refined icon hit areas, current-value-first dropdowns, party-contact panels, decision drafts, closing replies and status marks.</p>
              <div className={`${styles.figures} ${styles.pair}`}>{["atlas", "kirridesk"].map(name => <a href={`/portfolio/swiggy/process/${name}.jpg`} key={name} aria-label={`Open original ${name} candidate at full size`}><Image src={`/portfolio/swiggy/process/${name}.jpg`} alt={`Original ${name === "atlas" ? "Atlas" : "Kirridesk"} candidate applied to the same wrong-item chat`} width={1440} height={900} sizes="(max-width: 700px) 90vw, 500px" /></a>)}</div>
              <p>The case study uses captures from Agent Desk v7.1 rather than redrawing its interface. Its Inter typography belongs to the original application; the surrounding portfolio retains DM Sans. The Design Rulebook documents the spacing, typography and interaction rules. Figma contains the 3 November frames but does not include the 4–7 November prototype changes.</p></div>
          </div>
        </section>
        <section id="outcome" className={styles.stage} aria-labelledby="outcome-title">
          <h2 id="outcome-title">A working concept with unresolved findings</h2>
          <div className={styles.stageContent}>
            <div className={styles.block}><p>The deliverable is a coded five-ticket prototype and its design specification. The supplied evaluation was a heuristic walkthrough performed by Claude, which also assisted in building the prototype. It was not a test with agents, peers or an independent human evaluator.</p><p>The report records 16 findings: three major, nine minor and four cosmetic, with none rated as blocking. The three major problems are a partial refund that cannot represent part of an item, a draft too long for its reply box, and collapsed checks that hide unmet or unknown conditions. They remain unfixed in this version.</p></div>
            <details className={swiggy.report}><summary>Read all 16 findings and proposed changes</summary><div className={swiggy.tableScroll}><table><thead><tr><th scope="col">Finding</th><th scope="col">Observed problem</th><th scope="col">Proposed next step</th></tr></thead><tbody>{swiggyFindings.map(([id, severity, finding, next]) => <tr key={id}><th scope="row">{id}<span>{severity}</span></th><td>{finding}</td><td>{next}</td></tr>)}</tbody></table></div></details>
            <div className={styles.block}><h3>Keep estimates separate from results</h3><p>The recorded paths require 17–21 actions to Confirm. The handoff’s Keystroke-Level Model estimates range from 32 to 42 seconds, excluding reading and waiting. These are modelled effort estimates, not observed task times or a reduction against Swiggy’s current tool.</p></div>
            <details className={swiggy.report}><summary>Inspect the recorded effort estimates</summary><div className={swiggy.tableScroll}><table><thead><tr><th scope="col">Ticket</th><th scope="col">Actions to Confirm</th><th scope="col">KLM estimate</th></tr></thead><tbody>{swiggyScenarios.map(s => <tr key={s.id}><th scope="row">{s.ticket}<span>{s.title}</span></th><td>{s.actions}</td><td>About {s.estimate} seconds</td></tr>)}</tbody></table></div><p>The original evaluation used click, key, hand-movement and mental-step constants. Its counts belong to that walkthrough, not the timings of the edited recordings above.</p></details>
            <div className={styles.block}><h3>A policy-version conflict to resolve</h3><p>Finding F4 asks for conditions from the early policy that later decisions intentionally removed or moved upstream. It stays in the record, but restoring those conditions is not an agreed fix. The next evaluation must first reconcile its checklist with the final working policy.</p><p>The same caution applies to the five frozen-scenario labels: the final tickets and earlier scenario descriptions are not fully aligned. This page identifies playable cases by their ticket IDs and actual issue type rather than claiming complete coverage of the original scenario set.</p></div>
            <div className={styles.block}><h3>What needs to happen next</h3><p>Address the three major interaction problems, make conflicting records and missing evidence easier to inspect, and test the revised flow with support agents. A comparison should measure lookups, conditions checked, evidence reviewed, decision time and rework on equivalent cases. Speed alone would reward skipping investigation.</p><p>There is no verified improvement in handling time, accuracy or fairness. The evidence model is asymmetric, with photos supplied only by the claimant; restaurants and riders cannot dispute a decision in this concept.</p></div>
            <div className={styles.sources}>
              <h3>Sources and credits</h3>
              <p>The 8 November handoff supplies the research, decision log, prototype, rulebook and evaluation. It credits Sukhmanpreet Singh Saini as project owner and Akshat for research. Claude assisted prototype construction and performed the heuristic evaluation. Individual portfolio contribution is being confirmed before publication.</p>
              <div className={styles.sourceLinks}>
                <Link href="/work/swiggy-agent-workflow/prototype">Try the locally hosted concept</Link>
                <a href="https://claude.ai/artifact/KtfMHuEqRS3cjPEU9LJ8qV">Original Agent Desk v7.1</a>
                <a href="/portfolio/swiggy/design-rulebook-v7.1.pdf">Design Rulebook v7.1</a>
                <a href="https://www.figma.com/design/GzgfjrlKX8fQURtcMgAYfN">Figma frames, through 3 November</a>
                <a href="https://www.swiggy.com/refund-policy">Swiggy Refund Policy</a>
                <a href="https://www.swiggy.com/terms-and-conditions">Swiggy Terms of Use</a>
                <a href="https://partner.swiggy.com/food/tnc/sellertnc">Swiggy Seller Terms</a>
                <a href="https://aws.amazon.com/solutions/case-studies/suprdaily-case-study/">AWS Supr Daily case study</a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    <div className={styles.caseEnd}><Link href="/work" className={styles.textLink}>All work</Link><Link href="/work/two-wheeler-dashboard" className={styles.nextCase}>Next project<span>Himalayan 450</span></Link></div>
  </article>;
}
