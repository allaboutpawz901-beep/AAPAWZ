"use client";

import {useEffect, useState} from "react";
import {lmsApi} from "@/lib/api";
import type {CompletionStatus, LearnerState} from "@/lib/types";

export function CompletionGate({
  pathCode, moduleCode, isComplete, hasNext, updateState, goNext, notify
}: {
  pathCode: string;
  moduleCode: string;
  isComplete: boolean;
  hasNext: boolean;
  updateState: (state: LearnerState) => void;
  goNext: () => void;
  notify: (message: string) => void;
}) {
  const [status, setStatus] = useState<CompletionStatus | null>(null);
  const [busy, setBusy] = useState(false);

  const refresh = async () => {
    const value = await lmsApi.completionStatus(pathCode, moduleCode);
    setStatus(value);
  };

  useEffect(() => {
    void refresh().catch((error) => notify(error.message));
  }, [pathCode, moduleCode]);

  if (isComplete) {
    return (
      <section className="completion-gate complete">
        <div><span className="gate-seal">✓</span><div><strong>Module completed</strong><small>The school completion engine approved every requirement.</small></div></div>
        {hasNext && <button className="btn primary" onClick={goNext}>Next module →</button>}
      </section>
    );
  }

  return (
    <section className="completion-gate">
      <div className="completion-head">
        <div><span className="eyebrow green">School-controlled completion</span><h2>Competency—not a completion button</h2><p>The backend evaluates evidence, learning time, mastery and verified assessment results.</p></div>
        <button className="btn secondary" onClick={() => void refresh()}>Refresh requirements</button>
      </div>
      <div className="requirement-grid">
        {status?.requirements.map((item) => (
          <article className={item.met ? "met" : ""} key={item.key}>
            <span>{item.met ? "✓" : "○"}</span>
            <div><strong>{item.label}</strong><small>{item.current === null ? "Not started" : `Current: ${String(item.current)}`}</small></div>
          </article>
        )) || <span>Loading completion contract…</span>}
      </div>
      <button className="btn primary completion-action" disabled={!status?.eligible || busy} onClick={async () => {
        setBusy(true);
        try {
          const state = await lmsApi.progress({pathCode, moduleCode, action: "complete"});
          updateState(state);
          notify("Competency verified — next module unlocked");
        } catch (error) {
          notify((error as Error).message);
          await refresh();
        } finally {
          setBusy(false);
        }
      }}>{status?.eligible ? "Verify completion & unlock next module" : "Complete all requirements to advance"}</button>
    </section>
  );
}