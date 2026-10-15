"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export function DashboardDemo() {
  const [speed, setSpeed] = useState(42);
  const [mode, setMode] = useState("Eco");
  const [zoom, setZoom] = useState(false);
  return (
    <div className={`dashboard-demo ${zoom ? "zoomed" : ""}`}>
      <div className="cockpit-static">
        <Image
          src="/portfolio/cockpit.jpg"
          alt="Himalayan 450 cockpit, with a browser study composited into its circular display"
          width={1024}
          height={768}
        />
        <div className="cluster-mask live-cluster">
          <span>{mode}</span>
          <div className="rpm">
            <i style={{ transform: `rotate(${speed * 1.4 - 85}deg)` }} />
          </div>
          <strong>{speed.toString().padStart(2, "0")}</strong>
          <small>km/h</small>
          <div className="cluster-bottom">
            <b>{speed === 0 ? "N" : Math.min(6, Math.floor(speed / 22) + 1)}</b>
            <span>FUEL ▰▰▰</span>
          </div>
        </div>
      </div>
      <div className="demo-controls">
        <label>
          Speed <output>{speed} km/h</output>
          <input
            aria-label="Simulated speed"
            type="range"
            min="0"
            max="140"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
          />
        </label>
        <div className="segmented" aria-label="Riding mode">
          {["Eco", "Performance", "Rain"].map((m) => (
            <button
              type="button"
              key={m}
              aria-pressed={m === mode}
              onClick={() => setMode(m)}
            >
              {m}
            </button>
          ))}
        </div>
        <button
          className="text-button"
          type="button"
          onClick={() => setZoom(!zoom)}
          aria-pressed={zoom}
        >
          {zoom ? "Show cockpit" : "Enlarge display"} ↗
        </button>
      </div>
      <p className="caption">
        Reconstructed browser interaction study. Simulated values; no connection
        to a motorcycle. Cockpit photo:{" "}
        <a href="https://i0.wp.com/motofoodie.in/wp-content/uploads/2024/02/Crisp-Circular-TFT-dash-console-in-Analog-mode-of-the-2024-Royal-Enfield-Himalayan-450.jpg?resize=1024%2C768&amp;ssl=1">
          Ajay Ananth / Motofoodie
        </a>
        .
      </p>
    </div>
  );
}

export function MedicineDemo() {
  const [taken, setTaken] = useState(false);
  const [pending, setPending] = useState(false);
  return (
    <div className="medicine-demo">
      <div className="demo-phone">
        <div className="phone-notch" />
        <span className="eyebrow">Medicine taker · illustrative state</span>
        <h3>Today, at a glance.</h3>
        <div className="progress-note">
          {taken ? "4 of 5 recorded" : "3 of 5 recorded"}
          <small>Today’s progress</small>
        </div>
        <div className="dose">
          <span>Afternoon · 1:30 PM</span>
          <h4>Metformin</h4>
          <small>500mg tablet · sample content</small>
          <button
            type="button"
            onClick={() => {
              setTaken(!taken);
              setPending(false);
            }}
          >
            {taken ? "Undo record" : "Mark as taken"}
          </button>
        </div>
      </div>
      <div className="sync-path" aria-hidden="true">
        →
      </div>
      <div className="demo-phone caregiver-demo">
        <div className="phone-notch" />
        <span className="eyebrow">Caregiver · illustrative state</span>
        <h3>A shared view.</h3>
        <div
          className={`shared-state ${pending ? "pending" : ""}`}
          role="status"
        >
          <span>
            {pending
              ? "Waiting for sync"
              : taken
                ? "Recorded as taken"
                : "Not yet recorded"}
          </span>
          <p>
            {pending
              ? "The latest update is unconfirmed."
              : taken
                ? "The medicine taker recorded this dose."
                : "No dose record has arrived yet."}
          </p>
        </div>
        <button
          type="button"
          className="text-button"
          aria-pressed={pending}
          onClick={() => setPending(!pending)}
        >
          {pending ? "Restore connection" : "Simulate pending sync"}
        </button>
      </div>
      <p className="caption">
        A portfolio study of confirmation and uncertainty, using sample data.
        Recording a dose is a self-report.
      </p>
    </div>
  );
}

export function TokiDemo() {
  const [seconds, setSeconds] = useState(1800);
  const [running, setRunning] = useState(false);
  const [started, setStarted] = useState(false);
  const toggleTimer = () => {
    if (seconds === 0) return;
    setStarted(true);
    setRunning(!running);
  };
  useEffect(() => {
    if (!running) return;
    const timer = setInterval(
      () =>
        setSeconds((v) => {
          if (v <= 1) {
            setRunning(false);
            return 0;
          }
          return v - 1;
        }),
      1000,
    );
    return () => clearInterval(timer);
  }, [running]);
  return (
    <div className="toki-demo">
      <div className="toki-object">
        <div className="pen-slot" />
        <div className="toki-face" role="group" aria-label="Timer state">
          <span>One thing at a time</span>
          <strong>
            {String(Math.floor(seconds / 60)).padStart(2, "0")}:
            {String(seconds % 60).padStart(2, "0")}
          </strong>
          <small>
            {seconds === 0
              ? "Session complete"
              : running
                ? "In progress"
                : started
                  ? "Paused"
                  : "Ready when you are"}
          </small>
        </div>
        <button
          type="button"
          className="knob"
          aria-label={running ? "Pause timer" : started ? "Resume timer" : "Start timer"}
          aria-pressed={running}
          disabled={seconds === 0}
          onClick={toggleTimer}
        >
          <span />
        </button>
      </div>
      <div className="demo-actions">
        <button type="button" onClick={toggleTimer} disabled={seconds === 0}>
          {running ? "Pause" : started && seconds > 0 ? "Resume" : "Start"}
        </button>
        <button
          type="button"
          onClick={() => {
            setStarted(true);
            if (seconds <= 900) setRunning(false);
            setSeconds((v) => Math.max(0, v - 900));
          }}
        >
          Preview +15 minutes
        </button>
        <button
          type="button"
          onClick={() => {
            setRunning(false);
            setStarted(false);
            setSeconds(1800);
          }}
        >
          Reset
        </button>
      </div>
      <p className="caption">
        Browser timer study in an illustrative device housing. It does not
        control or verify physical hardware.
      </p>
    </div>
  );
}

export function OrbitDemo() {
  const [active, setActive] = useState(0);
  const items = [
    {
      name: "Navigation",
      orbit: "Medium Earth orbit",
      why: "Positioning depends on signals from multiple satellites.",
      radius: 100,
    },
    {
      name: "Earth observation",
      orbit: "Low Earth orbit",
      why: "A closer view supports imagery of Earth’s surface.",
      radius: 65,
    },
    {
      name: "Communication",
      orbit: "Geostationary orbit",
      why: "A satellite can remain over the same part of Earth.",
      radius: 135,
    },
  ];
  const item = items[active];
  return (
    <div className="orbit-study">
      <div className="orbital-model" aria-hidden="true">
        <div className="earth" />
        <div
          className="orbit-ring"
          style={{ width: item.radius * 2, height: item.radius * 2 }}
        >
          <i />
        </div>
      </div>
      <div>
        <span className="eyebrow">Start with something familiar</span>
        <div className="orbit-options">
          {items.map((i, n) => (
            <button
              type="button"
              key={i.name}
              aria-pressed={active === n}
              onClick={() => setActive(n)}
            >
              {i.name}
            </button>
          ))}
        </div>
        <div role="status">
          <h3>{item.orbit}</h3>
          <p>{item.why}</p>
        </div>
        <p className="caption">
          Simplified explanatory study. Distances, satellites and Earth are not
          to scale; this is not live tracking.
        </p>
      </div>
    </div>
  );
}

export function PhysicalDemo() {
  const [index, setIndex] = useState(0);
  const labels = ["Reminder", "Acknowledge", "Next dose"];
  return (
    <div className="physical-demo">
      <div className="physical-object">
        <span className={`dose-light state-${index}`} aria-hidden="true" />
        <div className="physical-lid">
          <span>Morning</span>
          <strong>
            {index === 0 ? "Dose due" : index === 1 ? "Acknowledged" : "Next: 1:30"}
          </strong>
        </div>
        <div className="compartments">
          {["M", "A", "N"].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>
      <div className="demo-actions">
        {labels.map((label, n) => (
          <button
            type="button"
            key={label}
            aria-pressed={n === index}
            onClick={() => setIndex(n)}
          >
            {label}
          </button>
        ))}
      </div>
      <p className="caption">
        Illustrative feedback sequence for discussing the concept. This is not a
        hardware demonstration or a medical recommendation.
      </p>
    </div>
  );
}
