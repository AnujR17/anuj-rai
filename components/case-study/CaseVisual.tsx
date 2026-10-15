import { ArrowDown, ArrowRight } from "lucide-react";
import type { CaseVisual as VisualType } from "@/data/projects";

const paths = [
  { title: "Everyday uses", question: "Why does it matter?", detail: "Communication, navigation, and observation." },
  { title: "Orbital regimes", question: "Where does it happen?", detail: "A technical structure for the familiar uses." },
  { title: "Mission history", question: "How did it develop?", detail: "Milestones connect the system to its story." },
  { title: "Orbit explorer", question: "What can I investigate?", detail: "A space for following a question through the system." },
];

export function CaseVisual({ type }: { type: VisualType }) {
  if (type === "orbit-path") return (
    <figure className="case-visual orbit-path">
      <div className="orbit-path-heading"><span className="orbit-mark" aria-hidden="true">◎</span><div><p className="case-visual-label">The information structure</p><h3>From a familiar use to a larger system.</h3></div></div>
      <ol>{paths.map((step, index) => <li key={step.title}><span className="path-index">0{index + 1}</span><p>{step.question}</p><h4>{step.title}</h4><span>{step.detail}</span>{index < paths.length - 1 && <ArrowRight size={18} aria-hidden="true" />}</li>)}</ol>
      <figcaption>A schematic reading of the website’s content. Open the live experience to explore its interactions.</figcaption>
    </figure>
  );

  if (type === "message-tradeoff") return (
    <figure className="case-visual message-tradeoff">
      <p className="case-visual-label">What the qualitative feedback changed</p>
      <div className="message-comparison">
        <div><span>Reflection on consequences</span><h3>Invite reconsideration.</h3><p>Some respondents and officers viewed reflective messaging more favourably.</p><p><strong>Design implication:</strong> explore a tone that encourages reflection.</p></div>
        <div><span>Public accountability</span><h3>Consider the cost of exposure.</h3><p>Shame-based concepts raised concerns about discomfort, hostility, and credibility.</p><p><strong>Design implication:</strong> question whether the message builds trust.</p></div>
      </div>
      <figcaption>Reported reactions to mockups. The comparison does not establish changes in driving behaviour or congestion.</figcaption>
    </figure>
  );

  if (type === "medicine-signals") return (
    <figure className="case-visual medicine-signals">
      <div className="case-visual-heading"><p className="case-visual-label">Caregiver-path responses</p><h3>Support that starts with existing habits.</h3><p>Each bar answers a different question; these are not exclusive categories.</p></div>
      <ul>{[
        { label: "Currently use a fixed routine", count: 25 },
        { label: "Prefer voice reminders", count: 21 },
        { label: "Prefer a portable organiser", count: 18 },
      ].map(item => <li key={item.label}><div><span>{item.label}</span><strong>{item.count}<span> / 46 answers</span></strong></div><div className="signal-track" aria-hidden="true"><span style={{ width: `${item.count / 46 * 100}%` }} /></div></li>)}</ul>
      <figcaption>46 nonblank caregiver-path answers for each of these questions. Different questions can describe the same respondent. Source: supplied medicine survey and <a href="https://medicine-storage-and-reminder.vercel.app">research presentation</a>.</figcaption>
    </figure>
  );

  if (type === "contributions") return (
    <figure className="case-visual contribution-map">
      <div className="case-visual-heading"><p className="case-visual-label">A shared project, distinct contributions</p><h3>Framing → concept → communication.</h3></div>
      <div className="contribution-columns"><div><span>My contribution</span><h4>Problem framing<br />&amp; rationale</h4><p>The question the concept addresses and the reasoning behind it.</p></div><ArrowRight aria-hidden="true" /><div><span>Teammates’ contribution</span><h4>Mockups<br />&amp; documentation</h4><p>The group’s visual and documented expression of the concept.</p></div></div>
      <figcaption>A contribution map for the physical group concept. The independent medicine app is separate work.</figcaption>
    </figure>
  );

  if (type === "retail-hypothesis") return (
    <figure className="case-visual reasoning-path">
      <p className="case-visual-label">From evidence to a question</p>
      <ol>
        <li><span>Observed in the ranking</span><h3>Practical basics come first.</h3><p>Cleanliness, parking, and digital payment rank above several promotional attributes.</p></li>
        <li><span>Design hypothesis</span><h3>Make the essentials easy to find.</h3><p>Investigate how facilities, payment, and checkout support appear in a store journey.</p></li>
        <li><span>Evaluation still needed</span><h3>Does that help in context?</h3><p>Observe real tasks before claiming that a service change improves the experience.</p></li>
      </ol>
      <figcaption>The hypothesis is a proposed extension of the analysis, not an evaluated retail redesign.</figcaption>
    </figure>
  );

  if (type === "score-definition") return (
    <figure className="case-visual score-definition">
      <p className="case-visual-label">What a model result can establish</p>
      <div className="score-equation"><div><span>Selected inputs</span><h3>Skills &amp; weights</h3></div><ArrowDown aria-hidden="true" /><div><span>Constructed target</span><h3>A weighted score</h3></div><ArrowDown aria-hidden="true" /><div><span>Predict from the same inputs</span><h3>Reproducing the formula</h3></div></div>
      <figcaption>Agreement with a constructed target does not independently establish readiness for work. An external outcome and a justified evaluation are separate requirements.</figcaption>
    </figure>
  );

  return null;
}
