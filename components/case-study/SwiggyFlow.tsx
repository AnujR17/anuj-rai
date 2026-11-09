import styles from "./swiggy-case-study.module.css";

/** A case-study explanation of the scripted flow, not a historical research artifact. */
export function SwiggyFlow() {
  return <div className={styles.taskFlow} aria-label="Agent Desk investigation and decision flow">
    <div className={styles.flowEntry}><h3>Bot hands over the complaint</h3><p>Read the customer’s message, the issue type and the bot’s previous offer.</p></div>
    <div className={styles.flowInvestigation}>
      <h3>Investigate, then revisit as new information arrives</h3>
      <div className={styles.flowSources}>
        <div><h4>Customer</h4><p>Complaint, photos and clarification</p></div>
        <div><h4>Order</h4><p>Items, payment and delivery events</p></div>
        <div><h4>Restaurant or rider</h4><p>Records, conversation and call transcript</p></div>
      </div>
      <p className={styles.flowCheck}>Check the relevant policy alongside those records</p>
    </div>
    <div className={styles.flowBranches} aria-label="Alternative decision paths">
      <div><h3>Choose a remedy</h3><p>Full refund, partial refund or deny</p><p>Choose fault and an action, explain it to the customer, then select a reason and Confirm.</p></div>
      <span className={styles.flowOr}>or</span>
      <div><h3>Send for review</h3><p>Use the review route when the case needs another decision.</p><p>The prototype records the handoff; it does not include the reviewer’s workspace.</p></div>
    </div>
    <div className={styles.flowEnd}><h3>Record and close</h3><p>The decision and conversation remain in the audit trail.</p></div>
    <aside className={styles.flowHold}><h4>Need more information?</h4><p>Return to the evidence, ask another question or hold while waiting for a party. The agent can revise a check before recording the decision.</p></aside>
  </div>;
}
