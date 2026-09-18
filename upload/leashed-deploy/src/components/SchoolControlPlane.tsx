"use client";

import {useEffect, useState} from "react";
import {lmsApi} from "@/lib/api";
import type {SchoolPolicy, SchoolRuntime} from "@/lib/types";

export function SchoolControlPlane({notify}: {notify: (message: string) => void}) {
  const [runtime, setRuntime] = useState<SchoolRuntime | null>(null);
  const [policy, setPolicy] = useState<SchoolPolicy | null>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const value = await lmsApi.adminRuntime();
    setRuntime(value);
    setPolicy(value.policy);
  };

  useEffect(() => { void load().catch((error) => notify(error.message)); }, []);

  if (!runtime || !policy) return <section className="control-plane loading-panel">Loading school control plane…</section>;

  const setDay = (key: keyof SchoolPolicy["day"], value: number | boolean) =>
    setPolicy({...policy, day: {...policy.day, [key]: value}});
  const setMastery = (key: keyof SchoolPolicy["mastery"], value: number | boolean) =>
    setPolicy({...policy, mastery: {...policy.mastery, [key]: value}});
  const setMode = (key: "self_paced" | "paced_professor", enabled: boolean) =>
    setPolicy({...policy, deliveryModes: {...policy.deliveryModes, [key]: {...policy.deliveryModes[key], enabled}}});

  return (
    <section className="control-plane">
      <div className="control-head">
        <div>
          <span className="eyebrow green">School operating system · policy v{policy.version}</span>
          <h2>AI Professor Control Plane</h2>
          <p>Published controls govern Professor Luna and the learner day. Curriculum drafts never leak into delivery.</p>
        </div>
        <button className="btn primary" disabled={saving} onClick={async () => {
          setSaving(true);
          try {
            const result = await lmsApi.saveSchoolPolicy(policy);
            setPolicy(result.policy);
            notify(`School policy v${result.version} published`);
            await load();
          } finally { setSaving(false); }
        }}>{saving ? "Publishing…" : "Publish school policy"}</button>
      </div>

      <div className="control-stats">
        <span><strong>{runtime.stats.timelineEvents}</strong> audit events</span>
        <span><strong>{runtime.stats.submissions}</strong> submissions</span>
        <span><strong>{runtime.sessions.filter((item) => item.status === "active" || item.status === "break").length}</strong> active days</span>
        <span><strong>{runtime.stats.incidents}</strong> conduct incidents</span>
      </div>

      <div className="control-grid">
        <article>
          <h3>Two delivery contracts</h3>
          {(["self_paced", "paced_professor"] as const).map((key) => (
            <label className="policy-toggle" key={key}>
              <input type="checkbox" checked={policy.deliveryModes[key].enabled} onChange={(event) => setMode(key, event.target.checked)}/>
              <span><strong>{policy.deliveryModes[key].label}</strong><small>{policy.deliveryModes[key].description}</small></span>
            </label>
          ))}
        </article>

        <article>
          <h3>Learning-day limits</h3>
          <div className="policy-fields">
            <label>Day window (hours)<input type="number" min="1" max="12" value={policy.day.dayWindowHours} onChange={(event) => setDay("dayWindowHours", Number(event.target.value))}/></label>
            <label>Learning maximum (minutes)<input type="number" min="30" max="600" value={policy.day.maxLearningMinutes} onChange={(event) => setDay("maxLearningMinutes", Number(event.target.value))}/></label>
          </div>
          <label className="policy-toggle"><input type="checkbox" checked={policy.day.textLocksAtClose} onChange={(event) => setDay("textLocksAtClose", event.target.checked)}/><span><strong>Lock professor input at close</strong><small>Only a new learning day reopens instruction.</small></span></label>
          <label className="policy-toggle"><input type="checkbox" checked={policy.day.neverEndMidLesson} onChange={(event) => setDay("neverEndMidLesson", event.target.checked)}/><span><strong>Never auto-end mid-lesson</strong><small>Learner may close; professor waits for a safe boundary.</small></span></label>
        </article>

        <article>
          <h3>Mastery contract</h3>
          <div className="policy-fields">
            <label>Passing score<input type="number" min="1" max="100" value={policy.mastery.passingScore} onChange={(event) => setMastery("passingScore", Number(event.target.value))}/></label>
            <label>Escalate after attempts<input type="number" min="1" max="10" value={policy.mastery.maxAttemptsBeforeEscalation} onChange={(event) => setMastery("maxAttemptsBeforeEscalation", Number(event.target.value))}/></label>
          </div>
          <label className="policy-toggle"><input type="checkbox" checked={policy.mastery.neverRevealAnswers} onChange={(event) => setMastery("neverRevealAnswers", event.target.checked)}/><span><strong>Never reveal assessment answers</strong><small>Reframe → cite → reteach → re-present.</small></span></label>
          <label className="policy-toggle"><input type="checkbox" checked={policy.mastery.blockOnUnsatisfactoryAnswer} onChange={(event) => setMastery("blockOnUnsatisfactoryAnswer", event.target.checked)}/><span><strong>Block advancement until mastery</strong><small>Progress is earned, not clicked.</small></span></label>
        </article>

        <article>
          <h3>Required daily breaks</h3>
          <div className="break-policy">
            {policy.day.breaks.map((item) => (
              <div key={item.id}><strong>{item.label}</strong><span>After {item.afterLearningMinutes} learning min</span><em>{item.durationMinutes} min</em></div>
            ))}
          </div>
        </article>
      </div>

      <PolicyMatrix policy={policy} setPolicy={setPolicy}/>

      <div className="governance-strip">
        <span>✓ Published content only</span><span>✓ Human verification before credit</span>
        <span>✓ Assignment opening gate</span><span>✓ Timestamped learning ledger</span>
        <span>✓ Abuse and attack controls</span><span>✓ Accessibility accommodations</span>
      </div>
    </section>
  );
}

function PolicyMatrix({
  policy, setPolicy
}: {
  policy: SchoolPolicy;
  setPolicy: (policy: SchoolPolicy) => void;
}) {
  const groups: Array<{
    title: string;
    key: "openingRoutine" | "evidence" | "capabilities" | "publishing";
    values: Record<string, boolean>;
  }> = [
    {title: "Opening routine", key: "openingRoutine", values: policy.openingRoutine},
    {title: "Evidence and verification", key: "evidence", values: policy.evidence},
    {title: "AI professor capabilities", key: "capabilities", values: policy.capabilities},
    {title: "Publishing governance", key: "publishing", values: policy.publishing},
  ];
  return (
    <div className="policy-matrix">
      <h3>Professor and school rule matrix</h3>
      {groups.map((group) => (
        <div key={group.key}>
          <small>{group.title}</small>
          <div className="policy-chips">
            {Object.entries(group.values).map(([key, value]) => (
              <button className={value ? "on" : "off"} key={key} onClick={() => {
                setPolicy({...policy, [group.key]: {...policy[group.key], [key]: !value}});
              }}>{value ? "✓" : "○"} {key.replaceAll(/([A-Z])/g, " $1").toLowerCase()}</button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}