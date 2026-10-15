import Image from "next/image";
import Link from "next/link";
import MedicineScreen from "./MedicineScreen";
import CaregiverScreen from "./CaregiverScreen";
import { MedicineDemo, PhysicalDemo } from "./Studies";
import type { SereneCase } from "@/data/serene-cases";

function OriginalPhone({ caregiver = false }: { caregiver?: boolean }) {
  return (
    <div
      className="evidence-phone"
      role="img"
      aria-label={
        caregiver
          ? "Original caregiver screen showing daily progress, dose states and a call action"
          : "Original medicine-taker screen showing a current dose, recording action and daily schedule"
      }
    >
      <div className="phone-ui" aria-hidden="true">
        {caregiver ? <CaregiverScreen /> : <MedicineScreen />}
      </div>
    </div>
  );
}

function CaseSources({ project }: { project: SereneCase }) {
  return (
    <details className="gallery-sources">
      <summary>Sources, contribution & project scope</summary>
      <p>{project.detail}</p>
      <div>
        {project.links.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label} ↗
          </a>
        ))}
      </div>
    </details>
  );
}

export function MedicineCaseStudy({
  project,
  physical = false,
}: {
  project: SereneCase;
  physical?: boolean;
}) {
  const title = physical ? "Physical Meditimer." : "Medicine app.";
  return (
    <article
      className={`medicine-case-v2 ${physical ? "physical-case-v2" : ""}`}
    >
      <header className="gallery-case-opening gallery-pad">
        <Link className="gallery-breadcrumb" href="/work/">
          ← All work
        </Link>
        <div className="gallery-case-title">
          <p className="gallery-index">
            {physical
              ? "Physical product concept / Group project"
              : "Interface design / Independent project"}
          </p>
          <h1>{title}</h1>
        </div>
        <div className="gallery-case-intro">
          <p>
            {physical
              ? "Exploring medicine storage and reminders as part of a daily routine."
              : "A daily medicine record, with a separate view for caregivers."}
          </p>
          <dl>
            <div>
              <dt>My role</dt>
              <dd>
                {physical
                  ? "Problem framing & concept rationale"
                  : "App interface design"}
              </dd>
            </div>
            <div>
              <dt>Project output</dt>
              <dd>
                {physical
                  ? "Group concept & physical model"
                  : "Figma interface screens"}
              </dd>
            </div>
            <div>
              <dt>On this page</dt>
              <dd>
                {physical
                  ? "Original model & feedback illustration"
                  : "Original screens & an interaction study"}
              </dd>
            </div>
          </dl>
        </div>
      </header>

      <figure className="gallery-case-cover">
        {physical ? (
          <div className="physical-cover">
            <Image
              src="/portfolio/physical.jpg"
              alt="Original Meditimer model with an upper storage compartment, display and lower tray"
              width={500}
              height={744}
              preload
            />
            <div>
              <span className="gallery-index">The group’s physical model</span>
              <p>
                Storage.
                <br />
                Reminder.
                <br />
                Daily routine.
              </p>
            </div>
          </div>
        ) : (
          <div className="medicine-cover">
            <div>
              <OriginalPhone />
              <span>01 / Medicine taker</span>
            </div>
            <div>
              <OriginalPhone caregiver />
              <span>02 / Caregiver</span>
            </div>
          </div>
        )}
        <figcaption>
          {physical
            ? "Original physical model. My contribution was problem framing and concept rationale; teammates contributed mockups and documentation."
            : "The original medicine-taker and caregiver interfaces, presented at the same scale. Names and medicine details are sample content."}
        </figcaption>
      </figure>

      <div className="gallery-case-body gallery-pad">
        <nav className="gallery-chapters" aria-label="Case study chapters">
          <span className="gallery-index">In this case study</span>
          <a href="#overview">01 / The brief</a>
          <a href="#decisions">02 / Design decisions</a>
          <a href="#study">03 / Interaction study</a>
          <a href="#reflection">04 / Next questions</a>
        </nav>
        <div className="gallery-case-content">
          <section id="overview" className="gallery-case-section">
            <p className="gallery-index">01 / The brief</p>
            <h2>
              {physical
                ? "Consider the routine around the reminder."
                : "Two people need different information."}
            </h2>
            <p className="gallery-body-lead">
              {physical
                ? "A reminder is one moment in a longer activity: keeping medicine somewhere, noticing when it needs attention and responding."
                : "The person taking medicine needs to see the next dose and record it. A caregiver needs to understand what has been recorded and what may need attention."}
            </p>
            <p>
              {physical
                ? "The concept brings storage and reminders into one physical object. My work focused on framing that relationship and explaining the rationale. The group’s model makes the idea tangible enough to discuss its form and arrangement."
                : "I designed separate interfaces for those responsibilities. The medicine-taker screen centres on a dose and its recording action. The caregiver screen summarises the day and makes a missed record visible."}
            </p>
            <div className="case-brief-pair">
              <div>
                <span>{physical ? "Design question" : "Medicine taker"}</span>
                <p>
                  {physical
                    ? "Where is medicine kept, and how does the object ask for attention?"
                    : "What do I need to take next, and how do I record it?"}
                </p>
              </div>
              <div>
                <span>{physical ? "My contribution" : "Caregiver"}</span>
                <p>
                  {physical
                    ? "Problem framing and the reasoning behind the concept."
                    : "What has been recorded, and where should I follow up?"}
                </p>
              </div>
            </div>
          </section>

          <section id="decisions" className="gallery-case-section">
            <p className="gallery-index">02 / Design decisions</p>
            <h2>
              {physical
                ? "Examine the object in context."
                : "Different roles. Different priorities."}
            </h2>
            {physical ? (
              <>
                <figure className="physical-evidence">
                  <Image
                    src="/portfolio/physical.jpg"
                    alt="Full view of the original physical Meditimer model"
                    width={500}
                    height={744}
                  />
                  <figcaption>
                    The model provides a view of the proposed form and layout.
                    It does not demonstrate dispensing, sensing or reminder
                    hardware.
                  </figcaption>
                </figure>
                <div className="physical-decision-list">
                  <div>
                    <span>01</span>
                    <div>
                      <h3>Bring storage into the question.</h3>
                      <p>
                        The framing considers where medicine is kept alongside
                        how a reminder is communicated. This keeps the
                        surrounding activity part of the concept.
                      </p>
                      <p className="gallery-tradeoff">
                        <strong>Tradeoff</strong>
                        {project.decisions[0].tradeoff}
                      </p>
                    </div>
                  </div>
                  <div>
                    <span>02</span>
                    <div>
                      <h3>Use the model to discuss arrangement.</h3>
                      <p>
                        The physical artifact gives the group a common reference
                        for compartments, the display area and the object’s
                        overall form.
                      </p>
                      <p className="gallery-tradeoff">
                        <strong>Tradeoff</strong>
                        {project.decisions[1].tradeoff}
                      </p>
                    </div>
                  </div>
                  <div>
                    <span>03</span>
                    <div>
                      <h3>Examine feedback separately.</h3>
                      <p>
                        A reminder, an acknowledgement and the next dose are
                        different states. The illustration below makes that
                        communication sequence available to inspect.
                      </p>
                      <p className="gallery-tradeoff">
                        <strong>Tradeoff</strong>
                        {project.decisions[2].tradeoff}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="gallery-decision-evidence">
                  <figure>
                    <OriginalPhone />
                    <figcaption>
                      Medicine-taker screen / original interface
                    </figcaption>
                  </figure>
                  <div>
                    <span className="gallery-index">Decision 01</span>
                    <h3>Keep the next dose and its action together.</h3>
                    <p>
                      The current dose has a prominent card and a “Mark as
                      taken” action. The day’s morning, afternoon and night
                      sections remain in view.
                    </p>
                    <p>
                      This makes the immediate action part of the daily
                      schedule, instead of sending someone to a separate screen
                      to record it.
                    </p>
                    <p className="gallery-tradeoff">
                      <strong>Tradeoff</strong>
                      {project.decisions[0].tradeoff}
                    </p>
                    <div className="decision-sequence">
                      <span>Current dose</span>
                      <span aria-hidden="true">→</span>
                      <span>Record</span>
                      <span aria-hidden="true">→</span>
                      <span>Daily progress</span>
                    </div>
                  </div>
                </div>
                <div className="gallery-decision-evidence decision-reverse">
                  <figure>
                    <OriginalPhone caregiver />
                    <figcaption>
                      Caregiver screen / original interface
                    </figcaption>
                  </figure>
                  <div>
                    <span className="gallery-index">Decision 02</span>
                    <h3>Give the caregiver context for following up.</h3>
                    <p>
                      Overall progress provides a summary, while dose-level
                      states show what has and hasn’t been recorded. A call
                      action sits alongside the person’s details.
                    </p>
                    <p>
                      The view supports a different responsibility: reviewing
                      the record and deciding whether to get in touch.
                    </p>
                    <p className="gallery-tradeoff">
                      <strong>Tradeoff</strong>
                      {project.decisions[1].tradeoff}
                    </p>
                    <div className="decision-sequence">
                      <span>Review progress</span>
                      <span aria-hidden="true">→</span>
                      <span>Find a missed record</span>
                      <span aria-hidden="true">→</span>
                      <span>Follow up</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </section>

          <section
            id="study"
            className="gallery-case-section gallery-interaction-study"
          >
            <p className="gallery-index">03 / Additional interaction study</p>
            <h2>
              {physical
                ? "Compare three feedback states."
                : "Keep an unconfirmed update visible."}
            </h2>
            <div className="gallery-study-guidance">
              <div>
                <h3>Try this</h3>
                <p>{project.studyTask}</p>
              </div>
              <div>
                <h3>Look for</h3>
                <p>{project.studyNotice}</p>
              </div>
            </div>
            <p className="gallery-study-note">
              {physical
                ? "A browser illustration created for this portfolio. It is separate from the physical model and does not demonstrate its hardware."
                : "A browser study created for this portfolio, using sample data. It extends the question beyond the original Figma screens; it is not a deployed reminder or sync service."}
            </p>
            {physical ? <PhysicalDemo /> : <MedicineDemo />}
          </section>

          <section id="reflection" className="gallery-case-section">
            <p className="gallery-index">04 / Next questions</p>
            <h2>What I would examine next.</h2>
            <p>{project.result.delivered}</p>
            <ol className="gallery-next-questions">
              {(physical
                ? [
                    "Can someone identify the right compartment and respond to a reminder?",
                    "How do controls, storage and feedback fit a real daily routine?",
                    "What happens when power, sensing or a reminder fails?",
                  ]
                : [
                    "Can someone find the next dose and understand the recording action?",
                    "Does a caregiver distinguish a missing record from a confirmed missed dose?",
                    "How should pending updates, corrections and accidental records be handled?",
                  ]
              ).map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ol>
            <p className="gallery-scope-note">
              {physical
                ? "Current status: group concept and physical model. Hardware performance and everyday use have not been validated here."
                : "Current status: interface screens and a portfolio interaction study. No clinical or medicine-adherence outcome is claimed."}
            </p>
            <CaseSources project={project} />
          </section>
        </div>
      </div>
      <div className="gallery-case-bottom gallery-pad">
        <Link href="/work/">← All projects</Link>
        <Link href={physical ? "/work/medicine-app/" : "/work/medtimer/"}>
          {physical ? "Independent medicine app" : "Physical Meditimer concept"}{" "}
          <span>↗</span>
        </Link>
      </div>
    </article>
  );
}
