import Image from "next/image";
import research from "@/data/swiggy-research.json";
import { SwiggyVector } from "./SwiggyVector";
import styles from "./swiggy-case-study.module.css";

export function SwiggyResearchEvidence() {
  return <section className={styles.researchStudy} data-research-evidence aria-labelledby="research-evidence-title">
    <h3 id="research-evidence-title">What the sources established</h3>
    <div className={styles.researchFindings}>
      <div><h4>Public rules and operating gaps</h4><p>The refund and merchant terms I reviewed describe complaint types, responsibilities and merchant permission for a refund. They did not establish a general food-order photo standard, an individual agent’s approval limit or the internal review screen.</p></div>
      <div><h4>Photo quality and refund errors</h4><p>In an AWS case study, Supr Daily, a grocery service in the Swiggy group, linked incorrect refunds to poor or missing delivery photos. This made evidence quality and origin relevant to the design.</p></div>
      <div><h4>An expert perspective on decision effort</h4><p>A ten-minute call with a customer-service expert at American Express focused on how screen information helps an agent reach a decision in less time. I used that perspective to focus on finding and connecting information during the&nbsp;investigation.</p></div>
    </div>
    <div className={styles.researchSourceLinks}><a href="https://www.swiggy.com/refund-policy">Swiggy refund policy</a><a href="https://partner.swiggy.com/food/tnc/sellertnc">Swiggy merchant terms</a><a href="https://aws.amazon.com/solutions/case-studies/suprdaily-case-study/">AWS: Supr Daily</a></div>
  </section>;
}

export function SwiggyResearchPriorities() {
  return <section className={styles.researchStudy} data-research-synthesis aria-labelledby="research-priorities-title">
    <h3 id="research-priorities-title">Priorities carried into the design</h3>
    <dl className={styles.synthesisList}>
      <div><dt>Evidence with its origin and timing</dt><dd>The agent needs to inspect what was submitted and what is missing. A photo score would obscure the record they need to judge.</dd></div>
      <div><dt>History kept separate from the current claim</dt><dd>Past refunds can provide context, but they are not a published refund condition. The agent needs comparable records and still has to assess the current complaint.</dd></div>
      <div><dt>Responsibility alongside the customer’s remedy</dt><dd>A refund affects the customer, restaurant, rider and platform. The design needs their records and a visible cost allocation, while the agent chooses the response.</dd></div>
    </dl>
  </section>;
}

export function SwiggyAssumptions() {
  return <div className={styles.researchStudy} data-research-artifact="assumptions">
    <h3>Working assumptions</h3>
    <p>Public terms could inform the design, but they could not supply an internal agent handbook. I made the operating assumptions explicit so the scenarios had a consistent basis.</p>
    <dl className={styles.assumptionList}>
      {research.assumptions.map(item => <div key={item.title}><dt>{item.title}</dt><dd>{item.choice}</dd><dd>{item.consequence}</dd></div>)}
    </dl>
    <details className={styles.researchDisclosure}>
      <summary>Four policy choices carried into the prototype</summary>
      <p>These choices are documented in the 17–18 October decision record. They describe this concept’s business logic.</p>
      <dl className={styles.policyChoices}>{research.policyChoices.map(([title, detail]) => <div key={title}><dt>{title}</dt><dd>{detail}</dd></div>)}</dl>
    </details>
  </div>;
}

export function SwiggyPersonas() {
  return <div id="agent-personas" className={styles.researchStudy} data-research-artifact="personas">
    <h3>Agent personas</h3>
    <p>I used two agent personas to explore different information needs. Ananya represents an agent learning the review process; Rohit represents an experienced agent working quickly. I developed both profiles from the research and project&nbsp;assumptions.</p>
    <div className={styles.personaPair}>
      {research.personas.map(persona => <section className={styles.persona} key={persona.name} aria-label={`${persona.name}, ${persona.role.toLowerCase()}`}>
        <div className={styles.personaPortrait} data-persona-portrait={persona.name}><Image src={persona.portrait} alt={`Representative portrait for ${persona.name}`} fill sizes="(max-width: 700px) 30vw, (max-width: 1100px) 24vw, 340px" /></div>
        <div className={styles.personaBody}>
          <div className={styles.personaHeading}><h4>{persona.name}</h4><p className={styles.personaRole}>{persona.role}</p><p className={styles.personaExperience}>{persona.experience}</p></div>
          <dl><div className={styles.personaGoal}><dt>Goal</dt><dd>{persona.goal}</dd></div><div><dt>Risk to design for</dt><dd>{persona.risk}</dd></div><div><dt>What the screen needs to show</dt><dd>{persona.need}</dd></div></dl>
        </div>
      </section>)}
    </div>
    <p>The profiles gave me two requirements to work with: guidance for an agent still learning what to check, and visible gaps for an agent moving quickly through a familiar case.</p>
  </div>;
}

export function SwiggyMentalModel() {
  return <div className={styles.researchStudy} data-research-artifact="mental-model">
    <h3>The agent’s mental model</h3>
    <p>I mapped nine questions an agent might work through, from reading the bot handover to explaining a response. This was an inferred model built from the research. It helped identify gaps to design for.</p>
    <SwiggyVector id="mental-model" />
    <p>Two tensions stood out: past refunds could influence judgement without being a published refund condition, and restaurant agreement could become an invisible dependency. Later versions replaced the live permission step with standing refund terms.</p>
    <details className={styles.researchDisclosure}>
      <summary>Read the nine-question model and original board</summary>
      <p>The table summarises the early mental-model work. Its policy column records that working interpretation; it is not a description of Swiggy’s internal screen or the final prototype.</p>
      <div className={styles.researchTable} role="region" aria-label="Nine-question mental model, horizontally scrollable" tabIndex={0}><table aria-label="Inferred agent mental model"><thead><tr><th>Agent’s question</th><th>Early policy reading</th><th>Design implication</th></tr></thead><tbody>{research.mentalModel.map(row => <tr key={row[0]}>{row.map((value, i) => i === 0 ? <th scope="row" key={i}>{value}</th> : <td key={i}>{value}</td>)}</tr>)}</tbody></table></div>
      <a href="https://www.figma.com/board/jdVOYesjFWTQOsQcxnVvV9" className={styles.researchLink}>Open the original mental-model and stakeholder board</a>
      <a href="/portfolio/swiggy/research/original-board-overview.png" className={styles.originalBoard}><Image unoptimized src="/portfolio/swiggy/research/original-board-overview.png" alt="Overview of the original FigJam board, containing the inferred mental model, policy comparison, stakeholder map and early user flow" width={1024} height={159} sizes="(max-width: 700px) 90vw, 980px" /></a>
    </details>
  </div>;
}

export function SwiggyStakeholders() {
  return <div className={styles.researchStudy} data-research-artifact="stakeholder-map">
    <h3>Who is affected by the decision</h3>
    <p>The stakeholder map connected the agent’s decision to the customer, restaurant, rider and platform. It made the distinction between the customer’s remedy and who might bear its cost important to the design.</p>
    <SwiggyVector id="stakeholders" />
    <p>I carried that into comparable party records and a visible cost split. The wider map also includes platform review and external grievance routes; those services sit beyond this workspace.</p>
    <details className={styles.researchDisclosure}>
      <summary>Stakeholder value hypotheses</summary>
      <p>The Define work rated potential value for each stakeholder. These Low, Medium and High ratings were design judgements about the reported context and expected concept, with no measured baseline or achieved result.</p>
      <div className={styles.researchTable} role="region" aria-label="Stakeholder value hypotheses, horizontally scrollable" tabIndex={0}><table aria-label="Early stakeholder value hypotheses"><thead><tr><th>Stakeholder</th><th>Early rating</th><th>Expected with concept</th><th>Intended change</th></tr></thead><tbody>{research.valueHypotheses.map(row => <tr key={row[0]}>{row.map((value, i) => i === 0 ? <th scope="row" key={i}>{value}</th> : <td key={i}>{value}</td>)}</tr>)}</tbody></table></div>
    </details>
  </div>;
}

export function SwiggyDesignCriteria() {
  return <div className={styles.researchStudy} data-research-artifact="design-criteria">
    <h3>Choosing what belongs on the screen</h3>
    <p>I separated recorded data, traceable comparisons and tools for the agent’s actions. A photo’s source belongs to the first layer; a history count with its total belongs to the second; choosing fault and editing a response belong to the third.</p>
    <dl className={styles.layerModel}><div><dt>Data</dt><dd>What was recorded, with its source and time.</dd></div><div><dt>Derived insight</dt><dd>What can be grouped, counted or compared against a rule.</dd></div><div><dt>Decision support</dt><dd>What helps the agent act and record a reason.</dd></div></dl>
    <p>The idea matrix applied those layers to the agent’s questions. It helped distinguish useful context from a score or suggested outcome that could steer the decision.</p>
    <h4 className={styles.criteriaHeading}>What earned a place on the screen</h4>
    <ol className={styles.selectionChecks}>{research.criteria.map(criterion => <li key={criterion}>{criterion}</li>)}</ol>
    <details className={styles.researchDisclosure}>
      <summary>The early idea matrix</summary>
      <p>The early creative matrix covers nine questions and shared tools. It includes a claim clock, live restaurant permission and an approval-limit check that later changed or were removed. The wireframes and final prototype show how the ideas developed.</p>
      <div className={styles.researchTable} role="region" aria-label="Early creative matrix, horizontally scrollable" tabIndex={0}><table aria-label="Early creative matrix"><thead><tr><th>Question</th><th>Data</th><th>Comparison</th><th>Support idea</th></tr></thead><tbody>{research.ideaMatrix.map(row => <tr key={row[0]}>{row.map((value, i) => i === 0 ? <th scope="row" key={i}>{value}</th> : <td key={i}>{value}</td>)}</tr>)}</tbody></table></div>
    </details>
  </div>;
}

export function SwiggyOriginalFlows() {
  return <div className={styles.researchStudy} data-research-artifact="original-flows">
    <h3>The original scenario flows</h3>
    <p>These five flowcharts were exported on 17 October, before the final interface. They show a scripted route, other decision branches and places to return for more information. Dishes, amounts and some rules changed later; the recordings below show the final version.</p>
    {research.flows.map(flow => <details className={styles.researchDisclosure + " " + styles.originalFlow} key={flow.id}>
      <summary>{flow.label}</summary><p>{flow.summary}</p>
      <div className={styles.originalFlowViewport} role="region" aria-label={`${flow.label} original flowchart, scroll to inspect`} tabIndex={0}><Image unoptimized src={`/portfolio/swiggy/research/${flow.file}`} alt={`Original 17 October ${flow.label.toLowerCase()} flowchart, with the scripted path and alternative agent decisions`} width={flow.width} height={flow.height} sizes="960px" /></div>
      <a className={styles.researchLink} href={`/portfolio/swiggy/research/${flow.file}`}>Open original flow at full size</a>
    </details>)}
  </div>;
}
