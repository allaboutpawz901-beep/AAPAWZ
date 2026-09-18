"use client";

import {useEffect, useMemo, useState} from "react";
import {lmsApi} from "@/lib/api";
import type {LearningSession, SchoolPolicy} from "@/lib/types";

export function DailyLearningRuntime({
  pathCode, moduleCode, learnerName, notify, onGateChange, onRuntimeChange
}: {
  pathCode: string;
  moduleCode: string;
  learnerName: string;
  notify: (message: string) => void;
  onGateChange?: (locked: boolean) => void;
  onRuntimeChange?: () => void;
}) {
  const [policy, setPolicy] = useState<SchoolPolicy | null>(null);
  const [session, setSession] = useState<LearningSession | null>(null);
  const [opening, setOpening] = useState("");
  const [condition, setCondition] = useState("ready");
  const [mode, setMode] = useState<"self_paced" | "paced_professor">("paced_professor");
  const [busy, setBusy] = useState(false);

  const refresh = async () => {
    const value = await lmsApi.currentSession(moduleCode);
    setPolicy(value.policy);
    setSession(value.session);
    onGateChange?.(Boolean(!value.session || value.session.assignmentGate || value.session.status === "ended" || value.session.status === "terminated"));
  };

  useEffect(() => { void refresh().catch((error) => notify(error.message)); }, [moduleCode]);

  useEffect(() => {
    if (!session || session.status === "ended") return;
    const ticker = window.setInterval(() => void refresh(), 60_000);
    return () => window.clearInterval(ticker);
  }, [session?.id, session?.status]);

  const nextBreak = useMemo(() => {
    if (!policy || !session) return null;
    return policy.day.breaks.find((item) => item.afterLearningMinutes > session.learningMinutes) || null;
  }, [policy, session]);

  if (!policy) return <section className="day-runtime loading-panel">Loading learning-day policy…</section>;

  if (!session || session.status === "ended") {
    return (
      <section className="day-runtime day-launch">
        <div>
          <span className="eyebrow green">Daily learning runtime</span>
          <h2>Welcome, {learnerName.split(" ")[0]}. Open today’s learning day.</h2>
          <p>Your choice changes how the school operates—not the competency standard.</p>
        </div>
        <div className="day-launch-grid">
          {(["self_paced", "paced_professor"] as const).filter((key) => policy.deliveryModes[key].enabled).map((key) => (
            <button className={mode === key ? "selected" : ""} key={key} onClick={() => setMode(key)}>
              <strong>{policy.deliveryModes[key].label}</strong>
              <small>{policy.deliveryModes[key].description}</small>
            </button>
          ))}
        </div>
        <label className="condition-field">How are you arriving today?
          <select value={condition} onChange={(event) => setCondition(event.target.value)}>
            <option value="ready">Ready to learn</option><option value="groggy">Groggy / low energy</option>
            <option value="sick">Not feeling well</option><option value="stressed">Stressed or distracted</option>
          </select>
        </label>
        <button className="btn primary" disabled={busy} onClick={async () => {
          setBusy(true);
          try {
            const value = await lmsApi.openSession({pathCode, moduleCode, deliveryMode: mode, learnerCondition: condition});
            setSession(value.session); setPolicy(value.policy); setOpening(value.openingMessage);
            onGateChange?.(value.session.assignmentGate);
            notify("Learning day opened and audit timeline started"); onRuntimeChange?.();
          } finally { setBusy(false); }
        }}>Begin today with Professor Luna</button>
      </section>
    );
  }

  const activeBreak = policy.day.breaks.find((item) => item.id === session.currentBreakId);
  return (
    <section className="day-runtime">
      <div className="day-top">
        <div>
          <span className="live-dot"/> <strong>{session.status === "break" ? "Break in progress" : "Learning day active"}</strong>
          <small>{policy.deliveryModes[session.deliveryMode].label} · opened {new Date(session.openedAt).toLocaleTimeString([], {hour:"numeric", minute:"2-digit"})}</small>
        </div>
        <button className="btn ghost" disabled={busy} onClick={async () => {
          if (!confirm("End today’s learning day? Professor input will lock until the next day is opened.")) return;
          const value = await lmsApi.sessionAction({sessionId: session.id, action: "end_day"});
          setSession(value.session); onGateChange?.(true); notify("Learning day closed and transcript sealed"); onRuntimeChange?.();
        }}>End learning day</button>
      </div>

      {(opening || session.assignmentGate) && (
        <div className={`professor-opening ${session.assignmentGate ? "gate" : ""}`}>
          <span className="prof-avatar">PL</span>
          <div><strong>Professor Luna</strong><p>{opening || "Before we continue, upload the prior learning day’s assignment."}</p></div>
        </div>
      )}

      <div className="day-metrics">
        <div><small>LEARNING TIME</small><strong>{session.learningMinutes} / {policy.day.maxLearningMinutes} min</strong><progress max={policy.day.maxLearningMinutes} value={session.learningMinutes}/></div>
        <div><small>DAILY WINDOW</small><strong>{policy.day.dayWindowHours} hours</strong><span>Maximum six instructional hours</span></div>
        <div><small>NEXT BREAK</small><strong>{activeBreak?.label || nextBreak?.label || "Schedule complete"}</strong><span>{activeBreak ? `${activeBreak.durationMinutes} minutes` : nextBreak ? `at ${nextBreak.afterLearningMinutes} learning min` : "—"}</span></div>
        <div><small>EVIDENCE GATE</small><strong>{session.assignmentGate ? "Upload required" : "Clear"}</strong><span>{session.latestSubmission?.original_name || "Prior work check"}</span></div>
      </div>

      {session.assignmentGate && (
        <label className="assignment-gate">Upload yesterday’s assignment to unlock instruction
          <input type="file" onChange={async (event) => {
            const file = event.target.files?.[0]; if (!file) return;
            await lmsApi.uploadAssignment(moduleCode, session.id, file);
            notify("Assignment received; AI-source and human verification queued");
            await refresh(); onRuntimeChange?.();
          }}/>
        </label>
      )}

      <div className="break-row">
        {policy.day.breaks.map((item) => (
          <button key={item.id} disabled={busy || (session.status === "break" && session.currentBreakId !== item.id)}
            className={session.currentBreakId === item.id ? "active" : ""}
            onClick={async () => {
              setBusy(true);
              try {
                const action = session.status === "break" ? "end_break" : "start_break";
                const value = await lmsApi.sessionAction({sessionId: session.id, action, breakId: item.id});
                setSession(value.session); notify(action === "start_break" ? `${item.durationMinutes}-minute break started` : "Break ended; learning timer resumed"); onRuntimeChange?.();
              } finally { setBusy(false); }
            }}>
            {session.currentBreakId === item.id ? "Resume learning" : `${item.label} · ${item.durationMinutes}m`}
          </button>
        ))}
      </div>

      <details className="timeline-drawer">
        <summary>Session audit timeline · {session.timeline.length} recent events</summary>
        {session.timeline.map((event, index) => (
          <div key={`${event.createdAt}-${index}`}><time>{new Date(event.createdAt).toLocaleTimeString()}</time><strong>{event.eventType.replaceAll("_", " ")}</strong></div>
        ))}
      </details>
    </section>
  );
}