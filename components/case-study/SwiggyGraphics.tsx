import { swiggyScenarios } from "@/data/swiggy-case-study";
import styles from "./swiggy-case-study.module.css";

export function PolicyBoundary() {
  return <div className={styles.policyBoundary} aria-label="Public evidence and hypothetical policy draft">
    <div><strong>12</strong><h3>Documented Swiggy findings</h3><p>Public wording and source boundaries, not access to the internal support system.</p></div>
    <div><strong>10 + 24</strong><h3>Proposed terms and operating rules</h3><p>Project hypotheses. Sixteen policy choices remain open in this separate draft.</p></div>
    <div><strong>28 / 14</strong><h3>Issue families / acceptance specifications</h3><p>Proposed scope and unexecuted checks. These do not establish complaint-volume coverage.</p></div>
  </div>;
}

export function FitComparison() {
  return <div className={styles.fitChart} role="img" aria-label="The first wireframe's documented fit test estimates policy rows reduced from about 430 to 200 pixels, reclaiming about 230 pixels of screen height. This is not a handling-time result.">
    <div><span>Before row compaction</span><div className={styles.barTrack}><div style={{ width: "100%" }} /></div><strong>≈430 px</strong></div>
    <div><span>After row compaction</span><div className={styles.barTrack}><div style={{ width: `${200 / 430 * 100}%` }} /></div><strong>≈200 px</strong></div>
    <p>About 230 px reclaimed in the source’s early fit test. Approximate heights; its font fallback could vary by about 20 px.</p>
  </div>;
}

export function InvestigationModel() {
  return <ol className={styles.investigation} aria-label="Evidence to policy to agent decision">
    <li><span>Read the record</span><strong>Customer photo, origin and time</strong><p>Describe what exists. A submitted photo is not automatically verified.</p></li>
    <li><span>Relate it to a condition</span><strong>Evidence met, not met or unknown</strong><p>The agent records an observation. Its source stays inspectable.</p></li>
    <li><span>Choose and explain</span><strong>Fault, action and reason</strong><p>The agent chooses. A draft follows that choice, rather than choosing for them.</p></li>
  </ol>;
}

export function EffortChart() {
  return <div className={styles.effortChart} aria-label="Recorded walkthrough effort, actions to Confirm and KLM estimates">
    <div className={styles.effortHeader}><span>Ticket</span><span>Actions to Confirm</span><span>KLM estimate</span></div>
    {swiggyScenarios.map(scenario => <div className={styles.effortRow} key={scenario.id}><span>{scenario.title}</span><div><div className={styles.barTrack}><div style={{ width: `${scenario.actions / 25 * 100}%` }} /></div><strong>{scenario.actions}</strong></div><span>≈{scenario.estimate} s</span></div>)}
    <p>Original heuristic walkthrough counts. KLM excludes reading and waiting; there is no measured current-tool baseline.</p>
  </div>;
}

export function FindingsChart() {
  return <div className={styles.findingsChart}>
    <div className={styles.severityBar} role="img" aria-label="Sixteen recorded findings: three major, nine minor, four cosmetic"><span style={{ flex: 3 }} /><span style={{ flex: 9 }} /><span style={{ flex: 4 }} /></div>
    <dl><div><dt>Major</dt><dd>3</dd></div><div><dt>Minor</dt><dd>9</dd></div><div><dt>Cosmetic</dt><dd>4</dd></div></dl>
    <p>Recorded by a single Claude-led heuristic evaluation, not an agent test. F4 includes an unresolved policy-version disagreement.</p>
  </div>;
}

export function DecisionBoundaries() {
  return <div className={styles.boundaries} aria-label="Separate remedy, authorization, execution and liability">
    {[['Remedy', 'What should the customer receive?', 'Agent-selected in v7.1'], ['Authority', 'Who is allowed to approve it?', 'Working project rules'], ['Execution', 'Has money actually moved?', 'Simulated only'], ['Liability', 'Who bears the cost?', 'Inferred project split']].map(([title, question, status]) => <div key={title}><h3>{title}</h3><p>{question}</p><span>{status}</span></div>)}
  </div>;
}
