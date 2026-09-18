"use client";

import {useEffect, useState} from "react";
import {lmsApi} from "@/lib/api";
import type {SchoolRuntime} from "@/lib/types";

export function RuntimeReviewQueue({notify}: {notify: (message: string) => void}) {
  const [runtime, setRuntime] = useState<SchoolRuntime | null>(null);

  const load = async () => setRuntime(await lmsApi.adminRuntime());
  useEffect(() => { void load().catch((error) => notify(error.message)); }, []);

  if (!runtime) return null;

  return (
    <section className="review-queue">
      <span className="eyebrow green">Low-cost human verification</span>
      <h3>Exception review—not constant cohosting</h3>
      <p>AI handles daily instruction. People enter only when evidence, written assessment, safety or conduct needs judgment.</p>
      <div className="review-columns">
        <div className="review-column">
          <h4>Evidence review · {runtime.reviewSubmissions.length}</h4>
          {runtime.reviewSubmissions.length === 0 && <div className="empty-review">No evidence waiting.</div>}
          {runtime.reviewSubmissions.map((item) => (
            <div className="review-item" key={item.id}>
              <div><strong>{item.module_code} · {item.original_name}</strong><small>{item.ai_review_status.replaceAll("_", " ")} · {Math.round(item.size_bytes / 1024)} KB</small></div>
              <div className="review-actions">
                <button onClick={async () => { await lmsApi.reviewEvidence(item.id, "revision_required"); notify("Revision requested"); await load(); }}>Revise</button>
                <button className="approve" onClick={async () => { await lmsApi.reviewEvidence(item.id, "approved"); notify("Evidence approved"); await load(); }}>Approve</button>
              </div>
            </div>
          ))}
        </div>
        <div className="review-column">
          <h4>Written assessment review · {runtime.reviewAssessments.length}</h4>
          {runtime.reviewAssessments.length === 0 && <div className="empty-review">No written responses waiting.</div>}
          {runtime.reviewAssessments.map((item) => (
            <div className="review-item" key={`${item.user_id}-${item.module_code}-${item.assessment_type}`}>
              <div><strong>{item.module_code} · {item.assessment_type}</strong><small>Objective score {item.score}% · written verification required</small></div>
              <div className="review-actions">
                <button onClick={async () => { await lmsApi.reviewAssessment({userId:item.user_id,moduleCode:item.module_code,assessmentType:item.assessment_type,decision:"revision_required"}); notify("Assessment revision requested"); await load(); }}>Revise</button>
                <button className="approve" onClick={async () => { await lmsApi.reviewAssessment({userId:item.user_id,moduleCode:item.module_code,assessmentType:item.assessment_type,decision:"passed"}); notify("Assessment verified"); await load(); }}>Verify</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}