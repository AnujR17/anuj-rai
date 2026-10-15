import Image from "next/image";
import type { CaseTheme } from "@/data/serene-cases";

export function CaseEvidence({ theme }: { theme: CaseTheme }) {
  if (theme === "himalayan") return (
    <figure className="serene-case-evidence dashboard-evidence">
      <a href="/portfolio/himalayan-dashboard.png" aria-label="View the original dashboard export at full size">
        <Image src="/portfolio/himalayan-dashboard.png" alt="Original dashboard: large central speed reading, RPM along the upper edge, gear to the right and warnings below." width={385} height={385} sizes="(max-width: 700px) 70vw, 330px" />
      </a>
      <div><p className="eyebrow">The original interface, up close</p><h3>One boundary.<br />Different kinds of attention.</h3><dl><div><dt>Centre</dt><dd>The primary speed reading.</dd></div><div><dt>Perimeter</dt><dd>RPM, gear and fuel in recognizable regions.</dd></div><div><dt>Lower band</dt><dd>Warning symbols sharing a compact space.</dd></div></dl></div>
      <figcaption className="caption">Original project export, shown separately from the reconstructed study. <a href="/portfolio/himalayan-dashboard.png">View full size ↗</a></figcaption>
    </figure>
  );

  if (theme === "medicine") return (
    <figure className="serene-case-evidence record-evidence">
      <p className="eyebrow">The distinction behind the two views</p><h3>A record is what the interface knows.</h3>
      <ol className="record-sequence"><li><span>Medicine taker</span><strong>Record the dose</strong><p>A person reports an action.</p></li><li><span>Sharing the update</span><strong>Confirm or wait</strong><p>A delayed update remains unconfirmed.</p></li><li><span>Caregiver</span><strong>Read the shared state</strong><p>A record provides context for follow-up.</p></li></ol>
      <figcaption className="caption">A schematic of the confirmation question. The two roles come from the original designs; pending sync is explored in the separate browser study.</figcaption>
    </figure>
  );

  if (theme === "toki") return (
    <figure className="serene-case-evidence timer-evidence">
      <p className="eyebrow">The feedback question</p><h3>The time matters. So does the state.</h3>
      <ol className="timer-state-sequence"><li><span className="timer-state-mark" aria-hidden="true">○</span><h4>Ready</h4><p>Show the session duration and a clear start action.</p></li><li><span className="timer-state-mark" aria-hidden="true">◉</span><h4>In progress</h4><p>Keep remaining time visible and make pausing available.</p></li><li><span className="timer-state-mark" aria-hidden="true">Ⅱ</span><h4>Paused</h4><p>Preserve the time while making the stopped state clear.</p></li><li><span className="timer-state-mark" aria-hidden="true">✓</span><h4>Complete</h4><p>Distinguish finishing from pausing or being ready.</p></li></ol>
      <figcaption className="caption">States to inspect in the illustrative timer below. This diagram describes the portfolio study, not verified physical-device behaviour.</figcaption>
    </figure>
  );

  if (theme === "physical") return (
    <figure className="serene-case-evidence contribution-evidence">
      <p className="eyebrow">A shared concept, clear contributions</p><h3>Framing gives the model a question.</h3>
      <div className="contribution-pair"><div><span>My contribution</span><h4>Problem framing<br />&amp; concept rationale</h4><p>What the object addresses and how it could fit the surrounding routine.</p></div><div><span>Teammates’ contribution</span><h4>Mockups<br />&amp; documentation</h4><p>The group’s visual and documented expression of the concept.</p></div></div>
      <figcaption className="caption">Contribution map for the physical group project. The independent medicine app and the survey analysis remain separate pieces of work.</figcaption>
    </figure>
  );

  return (
    <figure className="serene-case-evidence orbit-evidence">
      <p className="eyebrow">The website’s information structure</p><h3>A familiar use opens a larger system.</h3>
      <ol className="orbit-reading-path"><li><span>Why it matters</span><h4>Everyday uses</h4><p>Communication, navigation and observation.</p></li><li><span>How it fits together</span><h4>Orbits &amp; missions</h4><p>The technical structure and its history.</p></li><li><span>Follow a question</span><h4>The explorer</h4><p>A different way into the relationships.</p></li></ol>
      <figcaption className="caption">A schematic reading of the implemented experience, not an original wireframe or a record of past design iterations.</figcaption>
    </figure>
  );
}
