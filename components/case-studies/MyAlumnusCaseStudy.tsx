import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { MyAlumnusScreens } from "./MyAlumnusScreens";
import styles from "./myalumnus.module.css";

const contents = [
  ["problem", "The gate"], ["research", "What changed"], ["decisions", "Product decisions"],
  ["experience", "The interface"], ["system", "Across consoles"], ["testing", "Testing"], ["next", "What’s next"],
] as const;

export function MyAlumnusCaseStudy() {
  return (
    <article className={styles.article}>
      <div className={styles.topline}><Link href="/work" className="portfolio-link"><ArrowLeft size={16} aria-hidden="true" /> All work</Link><span>Collaborative project · 2026</span></div>
      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className="portfolio-kicker">Campus visitor verification</p>
          <h1>MyAlumnus<span>A familiar face.<br />An unfamiliar guard.</span></h1>
          <p className={styles.dek}>Returning to campus should not mean starting from zero. MyAlumnus gives a guard a record to check, a clear way to handle uncertainty, and a decision the campus can look back on.</p>
          <a href="https://myalumnus.vercel.app" className="portfolio-link">Try the working demo <ArrowUpRight size={17} aria-hidden="true" /></a>
          <p className={styles.demoNote}>Designed for desktop and iPad. The demo uses fictional data.</p>
        </div>
        <figure className={styles.heroFigure}>
          <div className={styles.windowBar}><span>Guard console</span><span>Visitor record</span></div>
          <a href="/portfolio/myalumnus/guard-record.png" aria-label="View the guard visitor record at full size"><Image src="/portfolio/myalumnus/guard-record.png" width={1280} height={860} alt="MyAlumnus guard screen showing a sample alumnus’s photo, programme, batch, and Approve, Deny, and Put on hold actions." preload sizes="(max-width: 800px) 90vw, 720px" /></a>
          <figcaption>The record and the decision, in the same view. <a href="/portfolio/myalumnus/guard-record.png">View full size</a></figcaption>
        </figure>
      </header>

      <dl className={styles.metadata}>
        <div><dt>My contribution</dt><dd>Decision-making, concept refinement, research, and UI</dd></div>
        <div><dt>Collaboration</dt><dd>With Sukhmanpreet Singh Saini<br /><span>Project owner · Application repository</span></dd></div>
        <div><dt>Delivered</dt><dd>Guard + admin consoles<br /><span>Working web demo · Desktop &amp; iPad</span></dd></div>
      </dl>
      <nav className={styles.contents} aria-label="Case study sections">{contents.map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)}</nav>

      <section id="problem" className={styles.section} aria-labelledby="problem-title">
        <div className={styles.sectionHeading}><p className="portfolio-kicker">The problem at the gate</p><h2 id="problem-title">The guard has to decide.<br />The information is elsewhere.</h2></div>
        <div className={styles.body}>
          <p>At the campus studied, recognition often depended on who was on duty. Alumni described having to explain their connection again when guards changed. The guard could call a host, but an unanswered call could leave a genuine visitor waiting.</p>
          <p>The first idea was to digitise entry. Research sharpened that brief: the missing piece was information the guard could use at the moment of a decision.</p>
        </div>
        <div className={styles.observation}>
          <p className="portfolio-kicker">One entry observed at the gate</p>
          <ol className={styles.sequence}>
            <li><span>01</span><strong>An alumna arrives</strong><p>The new guards do not recognise her.</p></li>
            <li><span>02</span><strong>The question moves on</strong><p>The head guard asks them to call the admin.</p></li>
            <li><span>03</span><strong>The admin does not answer</strong><p>A professor eventually confirms the visit.</p></li>
            <li><span>04</span><strong>The entry is written down</strong><p>She fills in a register before going inside.</p></li>
          </ol>
          <p className={styles.small}>From the supplied security-gate field log. Other vehicles and visitors interrupted the entry; total waiting time was not measured.</p>
        </div>
      </section>

      <section id="research" className={styles.section} aria-labelledby="research-title">
        <div className={styles.sectionHeading}><p className="portfolio-kicker">Research → a sharper brief</p><h2 id="research-title">More records would not help<br />if the gate could not use them.</h2></div>
        <div className={styles.body}><p>The project research included interviews with three alumni and one guard, a live entry observed at the gate, and an admin-office conversation. Competitor analysis helped examine visitor-management patterns.</p><p>These were small, qualitative inputs. The admin-office account was reported rather than observed, and some interview questions introduced the concept before asking for a reaction.</p></div>
        <div className={styles.findings}>
          <div><span>01</span><h3>Recognition did not travel across shifts.</h3><p>Alumni recalled easier access with familiar guards. The design needed a searchable name, photo, programme, and batch instead of relying on memory.</p></div>
          <div><span>02</span><h3>Waiting followed the phone chain.</h3><p>Calling someone was already a workaround. A hold needed an explicit contact, deadline, and next step, so uncertainty did not become an invisible queue.</p></div>
          <div><span>03</span><h3>A written entry did not explain the whole visit.</h3><p>The field log reported no exit tracking or routine register review at shift changes. “Inside now”, exits, and a case trail became part of the product.</p></div>
        </div>
        <p className={styles.researchQuestion}>How might a guard verify a returning visitor without depending on personal recognition or a chain of unanswered calls?</p>
      </section>

      <section id="decisions" className={styles.section} aria-labelledby="decisions-title">
        <div className={styles.sectionHeading}><p className="portfolio-kicker">Concept refinement</p><h2 id="decisions-title">Keep the work where<br />the visitor already arrives.</h2></div>
        <div className={styles.body}><p>My contribution focused on decision-making, refining the concept, research, and UI. The decisions below describe the collaboration’s product direction, rather than claiming every feature as my individual work.</p></div>
        <div className={styles.decisions}>
          <div><p className={styles.decisionNumber}>01 / Access</p><h3>No alumnus-facing app.</h3><p>The visitor gives their name; the guard looks up the record. Removing sign-up and digital passes keeps the interaction at the gate, including for visitors who have not prepared in advance.</p><p className={styles.tradeoff}><strong>The dependency:</strong> someone at the institution must keep those records current.</p></div>
          <div><p className={styles.decisionNumber}>02 / Uncertainty</p><h3>Call the host first.</h3><p>The initial concept escalated to an admin first. The built flow lets the guard call the host, then passes the case to an admin if the host cannot confirm or the campus time limit expires.</p><p className={styles.tradeoff}><strong>The boundary:</strong> a host can confirm a visit is expected; a call alone cannot prove the visitor’s identity.</p></div>
          <div><p className={styles.decisionNumber}>03 / Accountability</p><h3>Record what happened next.</h3><p>Approval, denial, exit, and leaving before a decision are distinct outcomes. A visitor who walks away is not counted as a denial, and a held case carries its history into the admin console.</p><p className={styles.tradeoff}><strong>The compromise:</strong> actions identify the gate device and time. The institution still needs a duty roster to identify the guard.</p></div>
        </div>
      </section>

      <section id="experience" className={styles.section} aria-labelledby="experience-title">
        <div className={styles.sectionHeading}><p className="portfolio-kicker">The finished interface</p><h2 id="experience-title">A short path for a clear case.<br />A visible path for an uncertain one.</h2></div>
        <div className={styles.body}><p>Search leads to a record, then a decision. The less routine cases have their own guidance: ask about duplicate names, check close spellings, call a host, or pass the hold on with its context.</p></div>
        <MyAlumnusScreens />
      </section>

      <section id="system" className={styles.section} aria-labelledby="system-title">
        <div className={styles.sectionHeading}><p className="portfolio-kicker">One visit, two perspectives</p><h2 id="system-title">The gate needs the next action.<br />The office needs the whole picture.</h2></div>
        <div className={styles.body}><p>The guard’s Home shows people inside, expected visitors, and holds. The admin sees the escalation queue, pending decisions, and overstay. Both work from the same records, so a handoff does not mean starting the explanation again.</p></div>
        <div className={styles.consolePair}>
          <figure><a href="/portfolio/myalumnus/guard-home.png" aria-label="View guard Home at full size"><Image src="/portfolio/myalumnus/guard-home.png" width={1280} height={879} alt="Guard Home with name search, people inside, expected visitors, and visitors on hold." sizes="(max-width: 700px) 90vw, 540px" /></a><figcaption><strong>At the gate</strong>Search, arrivals, and the people still waiting.</figcaption></figure>
          <figure><a href="/portfolio/myalumnus/admin-dashboard.png" aria-label="View the admin dashboard at full size"><Image src="/portfolio/myalumnus/admin-dashboard.png" width={1280} height={1373} alt="Admin dashboard with an escalation queue, cases awaiting a decision, decided visits, and visitors who have overstayed." sizes="(max-width: 700px) 90vw, 540px" /></a><figcaption><strong>In the office</strong>A queue to act on and a history to review.</figcaption></figure>
        </div>
        <div className={styles.systemDetail}>
          <figure><a href="/portfolio/myalumnus/guard-ipad.png" aria-label="View the iPad record screen at full size"><Image src="/portfolio/myalumnus/guard-ipad.png" width={1180} height={820} alt="MyAlumnus visitor record adapted to iPad landscape, retaining the photo and entry decision buttons." sizes="(max-width: 700px) 90vw, 580px" /></a><figcaption>The same record on iPad landscape. Full screens are available by selecting each image.</figcaption></figure>
          <div><h3>Carry the decisions into the UI.</h3><p>Approve, Deny, and Hold keep their meanings across light and dark themes, with text labels alongside colour. A large verification photo supports comparison; primary decision controls stay prominent.</p><p>The project’s design tokens and component styles carry from mockups into the app. Enlarged text and a sticky decision bar support the gate workflow. English and Hindi are available on the guard console; Hindi still needs a native review.</p></div>
        </div>
      </section>

      <section id="testing" className={styles.section} aria-labelledby="testing-title">
        <div className={styles.sectionHeading}><p className="portfolio-kicker">Testing the decisions</p><h2 id="testing-title">A tap that looked successful<br />was not a saved decision.</h2></div>
        <div className={styles.body}><p>Expert evaluation, walkthroughs, and a scripted simulation informed iterations. A later think-aloud with one working guard exposed a different problem: the interface could appear to have approved a visitor without saving the entry.</p><p>The project owner facilitated five tasks on the live demo, playing visitors and hosts. Four tasks were completed; one approval was not saved and showed no error. The session account was narrated afterwards and checked against the audit trail.</p></div>
        <div className={styles.testResult}><strong>4 of 5</strong><div><h3>Tasks completed in one guard session</h3><p>A qualitative signal to investigate, not a general success rate.</p></div></div>
        <div className={styles.tableWrap}>
          <table className={styles.testingTable}>
            <caption>What the supplied think-aloud report found</caption>
            <thead><tr><th scope="col">Task</th><th scope="col">What happened</th><th scope="col">Design implication</th></tr></thead>
            <tbody>
              <tr><th scope="row">Regular alumnus</th><td>Photo checked; approved in 15 seconds and 3 taps.</td><td>The routine path was usable in this session.</td></tr>
              <tr><th scope="row">Same name</th><td>Batch asked correctly; approval was never saved.</td><td>Every decision needs a visible, reliable result.</td></tr>
              <tr><th scope="row">Misspelt name, no photo</th><td>Host selected and called; held visitor approved.</td><td>The hold path worked, but its default reason was wrong.</td></tr>
              <tr><th scope="row">Mark exit, in Hindi</th><td>Completed unaided; returned to Home.</td><td>Exit feedback helped close the interaction.</td></tr>
              <tr><th scope="row">Photo mismatch, in Hindi</th><td>Approved after a host call.</td><td>Expected visit and verified identity need separate rules.</td></tr>
            </tbody>
          </table>
        </div>
        <aside className={styles.evidenceNote}><h3>What this evidence can support</h3><p>One guard session supports specific qualitative findings. No admin was observed using the console. Three other evaluation methods were expert or model-based, including AI-assisted evaluation; simulated time savings are not measured campus impact. These findings were reported, not fixed in the supplied version.</p></aside>
      </section>

      <section id="next" className={styles.section} aria-labelledby="next-title">
        <div className={styles.sectionHeading}><p className="portfolio-kicker">Outcome &amp; next steps</p><h2 id="next-title">A working product.<br />A pilot still to earn.</h2></div>
        <div className={styles.body}><p>The collaboration produced a working guard and admin demo backed by a shared database. Search, holds, decisions, exit tracking, history, and reports can be explored. That establishes implementation; it does not establish safer access or shorter queues at a real institution.</p><p>The next version should make every decision visibly confirm or fail, correct the default hold reason, and settle the photo-mismatch rule. A real gate pilot with guards and admins would then test the operational assumptions, record quality, and language needs.</p></div>
        <ol className={styles.nextSteps}><li><span>First</span><strong>Make saving unmistakable.</strong><p>A visible pending state, confirmation, and useful error recovery for every decision.</p></li><li><span>Then</span><strong>Define the identity boundary.</strong><p>Agree what additional check is required when the photo and visitor do not match.</p></li><li><span>At the gate</span><strong>Observe both roles in context.</strong><p>Use the prepared pilot plan with three guards and two admins; check records and language with the institution.</p></li></ol>
        <details className={styles.sources}><summary>Sources, credits, and scope</summary><div><p>This case study draws on the MyAlumnus handoff dated 9 October 2026: the corrected product concept, interview and contextual-inquiry records, final screens, think-aloud report, usability report, and design-system documentation. Raw participant records are not published here.</p><p>My contribution: decision-making, concept refinement, research, and UI. Collaborator and project owner: Sukhmanpreet Singh Saini. The application repository is maintained under his account; implementation of every feature is not attributed to me.</p><p>Screens use fictional “Sample University” data. Findings refer to the supplied project version. The application’s current behaviour may change after these captures. Evaluation-only fixes and discarded design trials are excluded from claims about the live product.</p><p><a href="https://github.com/sukhman0402/myalumnus" className="portfolio-link">Application source &amp; credits <ArrowUpRight size={16} aria-hidden="true" /></a></p></div></details>
      </section>
      <footer className={styles.closing}><div><p className="portfolio-kicker">See the decisions in context</p><a href="https://myalumnus.vercel.app" className="portfolio-link">Open MyAlumnus <ArrowUpRight size={18} aria-hidden="true" /></a></div><Link href="/work" className="portfolio-link">Explore more work <ArrowRight size={18} aria-hidden="true" /></Link></footer>
    </article>
  );
}
