"use client";

import {useState} from "react";
import {lmsApi} from "@/lib/api";
import type {LessonContent} from "@/lib/types";

export function CourseArchitect({
  moduleCode, onDraft, notify
}: {
  moduleCode: string;
  onDraft: (content: LessonContent) => void;
  notify: (message: string) => void;
}) {
  const [brief, setBrief] = useState("");
  const [operation, setOperation] = useState("strengthen_lesson");
  const [busy, setBusy] = useState(false);

  return (
    <section className="course-architect">
      <div className="architect-head">
        <span className="architect-mark">✦</span>
        <div><strong>AI Course Architect</strong><small>Build with the AI. Publish with human accountability.</small></div>
        <span className="pill">DRAFT ONLY</span>
      </div>
      <div className="architect-body">
        <select value={operation} onChange={(event) => setOperation(event.target.value)}>
          <option value="strengthen_lesson">Strengthen lesson sequence</option>
          <option value="generate_practice">Generate adaptive practice</option>
          <option value="assessment_alignment">Align assessments to evidence</option>
          <option value="accessibility_pass">Run accessibility pass</option>
        </select>
        <textarea value={brief} onChange={(event) => setBrief(event.target.value)} placeholder={`Tell the architect what ${moduleCode} must accomplish, what learners struggle with, or what workplace evidence matters…`}/>
        <button className="btn primary" disabled={busy || brief.trim().length < 15} onClick={async () => {
          setBusy(true);
          try {
            const result = await lmsApi.architectDraft({moduleCode, operation, brief});
            onDraft(result.content);
            setBrief("");
            notify(`AI architect created governed draft v${result.version}`);
          } catch (error) {
            notify((error as Error).message);
          } finally { setBusy(false); }
        }}>{busy ? "Building governed draft…" : "Build draft with AI"}</button>
      </div>
      <div className="architect-guards"><span>✓ Approved source map</span><span>✓ No invented locators</span><span>✓ Never auto-publishes</span></div>
    </section>
  );
}