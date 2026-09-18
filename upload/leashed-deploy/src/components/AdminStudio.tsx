"use client";

import {useEffect, useMemo, useState} from "react";
import {lmsApi} from "@/lib/api";
import type {AdminDashboard, LessonContent, SchoolRuntime} from "@/lib/types";
import {SchoolControlPlane} from "@/components/SchoolControlPlane";
import {RuntimeReviewQueue} from "@/components/RuntimeReviewQueue";
import {CourseArchitect} from "@/components/CourseArchitect";

type AdminSection = "overview" | "schools" | "curriculum" | "learners" | "educators" | "assessment" | "credentials" | "families" | "impact" | "policy";

const ADMIN_NAV: Array<{id: AdminSection; label: string; icon: string}> = [
  {id:"overview",label:"Command center",icon:"⌂"},
  {id:"schools",label:"Schools & programs",icon:"▦"},
  {id:"curriculum",label:"Curriculum studio",icon:"✦"},
  {id:"learners",label:"Learner success",icon:"◎"},
  {id:"educators",label:"Educators & review",icon:"◇"},
  {id:"assessment",label:"Testing & evidence",icon:"✓"},
  {id:"credentials",label:"Credentials",icon:"◆"},
  {id:"families",label:"Families",icon:"○"},
  {id:"impact",label:"Outcomes & public reports",icon:"↗"},
  {id:"policy",label:"Policy & audit",icon:"≡"},
];

export function AdminStudio({notify}: {notify: (message: string) => void}) {
  const [dashboard, setDashboard] = useState<AdminDashboard | null>(null);
  const [selectedCode, setSelectedCode] = useState("");
  const [content, setContent] = useState<LessonContent | null>(null);
  const [query, setQuery] = useState("");
  const [cohostOpen, setCohostOpen] = useState(false);
  const [cohost, setCohost] = useState({name: "", email: "", role: "co_instructor"});
  const [section, setSection] = useState<AdminSection>("overview");

  const refresh = () => lmsApi.adminDashboard().then(setDashboard).catch((error) => notify(error.message));
  useEffect(() => {
    void refresh();
  }, []);

  useEffect(() => {
    if (!selectedCode) return;
    lmsApi.adminContent(selectedCode).then(setContent).catch((error) => notify(error.message));
  }, [selectedCode, notify]);

  const modules = useMemo(() => {
    if (!dashboard) return [];
    const needle = query.toLowerCase();
    return dashboard.modules.filter((item) => `${item.moduleCode} ${item.title} ${item.pathCode}`.toLowerCase().includes(needle));
  }, [dashboard, query]);

  if (!dashboard) return <div className="page loading">Loading Leashed school network…</div>;

  if (section !== "curriculum") {
    return (
      <div className="admin-shell light-admin">
        <AdminNavigation section={section} setSection={setSection} policy={dashboard.publicationPolicy}/>
        <AdminWorkspace section={section} setSection={setSection} dashboard={dashboard} notify={notify}/>
      </div>
    );
  }

  return (
    <div className="admin-shell light-admin">
      <AdminNavigation section={section} setSection={setSection} policy={dashboard.publicationPolicy}/>
      <main className="admin-main">
        <header className="admin-head">
          <div><button className="back-workspace" onClick={() => setSection("overview")}>← Command center</button><span className="eyebrow green">Curriculum operating system</span><h1>Curriculum studio</h1><p>Build once, govern centrally, and deliver through either learning contract.</p></div>
          <button className="btn primary" onClick={() => setCohostOpen(true)}>+ Invite cohost</button>
        </header>

        <SchoolControlPlane notify={notify}/>
        <RuntimeReviewQueue notify={notify}/>

        <div className="admin-stats">
          <Stat value={dashboard.stats.pathways} label="Integrated paths"/>
          <Stat value={dashboard.stats.coursePlacements} label="Course placements"/>
          <Stat value={dashboard.stats.uniqueModules} label="Unique lesson drafts"/>
          <Stat value={dashboard.stats.publishedOverrides} label="Published edits"/>
          <Stat value={dashboard.stats.pendingReviews} label="Review queue"/>
        </div>

        <section className="author-layout">
          <aside className="course-browser">
            <div className="browser-head"><h2>Courses and modules</h2><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search 212 modules…"/></div>
            <div className="browser-list">
              {modules.map((module) => (
                <button className={selectedCode === module.moduleCode ? "active" : ""} key={module.moduleCode} onClick={() => setSelectedCode(module.moduleCode)}>
                  <span className="source-id">{module.pathCode}</span>
                  <span><strong>{module.moduleCode} · {module.title}</strong><small>{module.track} · {module.status}</small></span>
                </button>
              ))}
            </div>
          </aside>
          <section className="author-editor">
            {!content ? (
              <div className="empty"><h2>Select a module to author</h2><p>Edit approved teaching blocks, citations, media placements, assessments, assignments, timers, and proctoring.</p></div>
            ) : (
              <>
                <div className="editor-toolbar">
                  <div><span className={`status-dot ${content.status}`}/><strong>{content.moduleCode}</strong><small>v{content.version} · {content.status}</small></div>
                  <div><button className="btn secondary" onClick={async () => { await lmsApi.saveLesson(content.moduleCode, content, false); notify("Draft version saved"); refresh(); }}>Save draft</button><button className="btn primary" onClick={async () => { const result = await lmsApi.saveLesson(content.moduleCode, content, true); setContent(result.content); notify("Human-approved lesson published"); refresh(); }}>Review & publish</button></div>
                </div>
                <div className="editor-body">
                  <CourseArchitect moduleCode={content.moduleCode} onDraft={setContent} notify={notify}/>
                  <label className="field">Lesson title<input value={content.title} onChange={(event) => setContent({...content, title: event.target.value})}/></label>
                  <label className="field">Summary<textarea value={content.summary} onChange={(event) => setContent({...content, summary: event.target.value})}/></label>

                  <h3>Teaching blocks</h3>
                  {content.phases.map((phase, index) => (
                    <div className="block-editor" key={`${phase.kind}-${index}`}>
                      <span className="drag">⠿</span>
                      <div><div className="inline-fields"><input value={phase.title} onChange={(event) => {
                        const phases = [...content.phases]; phases[index] = {...phase, title: event.target.value}; setContent({...content, phases});
                      }}/><input type="number" value={phase.minutes} onChange={(event) => {
                        const phases = [...content.phases]; phases[index] = {...phase, minutes: Number(event.target.value)}; setContent({...content, phases});
                      }}/></div><textarea value={phase.body} onChange={(event) => {
                        const phases = [...content.phases]; phases[index] = {...phase, body: event.target.value}; setContent({...content, phases});
                      }}/></div>
                    </div>
                  ))}

                  <h3>Media</h3>
                  <div className="asset-editor">
                    <label className="upload-drop">▶<strong>Add lesson video</strong><small>MP4, WebM or MOV · 100 MB maximum · captions required</small><input type="file" accept="video/mp4,video/webm,video/quicktime" onChange={async (event) => {
                      const file = event.target.files?.[0];
                      if (!file) return;
                      try {
                        const asset = await lmsApi.uploadMedia(content.moduleCode, "video", file);
                        setContent({...content, video: {...content.video, url: asset.url, status: "ready"}});
                        notify(`Uploaded ${asset.fileName}`);
                      } catch (error) { notify((error as Error).message); }
                    }}/></label>
                    <label className="upload-drop">▧<strong>Add image</strong><small>JPG, PNG, WebP or GIF · descriptive alt text required</small><input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={async (event) => {
                      const file = event.target.files?.[0];
                      if (!file) return;
                      try {
                        const asset = await lmsApi.uploadMedia(content.moduleCode, "image", file);
                        const images = [...content.imagePlaceholders];
                        images[0] = {...images[0], url: asset.url, status: "ready"};
                        setContent({...content, imagePlaceholders: images});
                        notify(`Uploaded ${asset.fileName}`);
                      } catch (error) { notify((error as Error).message); }
                    }}/></label>
                  </div>
                  <label className="field">Video URL<input value={content.video.url} onChange={(event) => setContent({...content, video: {...content.video, url: event.target.value, status: event.target.value ? "ready" : "placeholder"}})} placeholder="https://…"/></label>
                  <label className="field">Image descriptive brief<textarea value={content.imagePlaceholders[0]?.description || ""} onChange={(event) => {
                    const images = [...content.imagePlaceholders]; images[0] = {...images[0], description: event.target.value}; setContent({...content, imagePlaceholders: images});
                  }}/></label>

                  <h3>Citations</h3>
                  <div className="citation-list">{content.citations.map((citation, index) => <div className="citation" key={citation.id}><span className="source-id">{citation.id}</span><div><strong>{citation.title}</strong><input value={citation.locator} onChange={(event) => {
                    const citations = [...content.citations]; citations[index] = {...citation, locator: event.target.value}; setContent({...content, citations});
                  }}/></div></div>)}</div>

                  <h3>Assessment and timing</h3>
                  <div className="settings-grid">
                    <label>Quiz passing score<input type="number" value={content.quiz.passingScore} onChange={(event) => setContent({...content, quiz: {...content.quiz, passingScore: Number(event.target.value)}})}/></label>
                    <label>Quiz timer (minutes)<input type="number" value={content.quiz.timeLimitMinutes} onChange={(event) => setContent({...content, quiz: {...content.quiz, timeLimitMinutes: Number(event.target.value)}})}/></label>
                    <label>Assignment due (hours)<input type="number" value={content.assignment.dueOffsetHours} onChange={(event) => setContent({...content, assignment: {...content.assignment, dueOffsetHours: Number(event.target.value)}})}/></label>
                    <label>Exam proctoring<select value={content.exam.proctored ? "on" : "off"} onChange={(event) => setContent({...content, exam: {...content.exam, proctored: event.target.value === "on"}})}><option value="on">Required</option><option value="off">Standard</option></select></label>
                  </div>
                  <div className="human-gate">✓ AI can draft questions and teaching blocks. A human author must verify sources and publish.</div>
                </div>
              </>
            )}
          </section>
        </section>

        <section className="cohost-table">
          <div className="section-head"><div><h2>Cohost tools</h2><p>Share authoring, review, grading, and live-session responsibilities.</p></div><button className="btn secondary" onClick={() => setCohostOpen(true)}>Invite co-instructor</button></div>
          {dashboard.cohosts.length === 0 ? <div className="empty">No cohosts invited yet.</div> : dashboard.cohosts.map((person) => <div className="cohost-row" key={person.id}><span className="avatar">{person.name[0]}</span><span><strong>{person.name}</strong><small>{person.email}</small></span><span className="pill">{person.role.replaceAll("_"," ")}</span><span className="pill">{person.status}</span><button className="link-btn">Manage</button></div>)}
        </section>
      </main>

      {cohostOpen && (
        <div className="modal-backdrop">
          <section className="modal small-modal">
            <div className="modal-head"><div><span className="eyebrow green">Cohost tools</span><h2>Invite a co-instructor</h2></div><button className="close" onClick={() => setCohostOpen(false)}>×</button></div>
            <div className="modal-body form-grid">
              <label className="field">Name<input value={cohost.name} onChange={(event) => setCohost({...cohost, name: event.target.value})}/></label>
              <label className="field">Email<input type="email" value={cohost.email} onChange={(event) => setCohost({...cohost, email: event.target.value})}/></label>
              <label className="field">Role<select value={cohost.role} onChange={(event) => setCohost({...cohost, role: event.target.value})}><option value="co_instructor">Co-instructor</option><option value="content_reviewer">Content reviewer</option><option value="grader">Grader</option><option value="live_session_host">Live session host</option></select></label>
              <div className="permission-grid">{["Author content","Review drafts","Grade submissions","Host live sessions"].map((item) => <label className="check" key={item}><input type="checkbox" defaultChecked/>{item}</label>)}</div>
            </div>
            <div className="modal-foot"><button className="btn ghost" onClick={() => setCohostOpen(false)}>Cancel</button><button className="btn primary" disabled={!cohost.name || !cohost.email} onClick={async () => { await lmsApi.addCohost({...cohost, permissions: ["author","review","grade","host"]}); setCohostOpen(false); setCohost({name:"",email:"",role:"co_instructor"}); notify("Cohost invitation created"); refresh(); }}>Send invite</button></div>
          </section>
        </div>
      )}
    </div>
  );
}


function AdminNavigation({
  section, setSection, policy
}: {
  section: AdminSection;
  setSection: (section: AdminSection) => void;
  policy: string;
}) {
  return (
    <aside className="admin-sidebar intentional-nav">
      <div className="admin-brand">
        <span className="brand-mark">L</span>
        <div><strong>Leashed</strong><small>Vocational school network</small></div>
      </div>
      <p className="nav-kicker">OPERATE</p>
      {ADMIN_NAV.map((item) => (
        <button className={section === item.id ? "active" : ""} key={item.id} onClick={() => setSection(item.id)}>
          <span>{item.icon}</span>{item.label}
        </button>
      ))}
      <div className="admin-policy"><strong>One operating promise</strong><p>{policy}</p></div>
    </aside>
  );
}

function AdminWorkspace({
  section, setSection, dashboard, notify
}: {
  section: AdminSection;
  setSection: (section: AdminSection) => void;
  dashboard: AdminDashboard;
  notify: (message: string) => void;
}) {
  const [runtime, setRuntime] = useState<SchoolRuntime | null>(null);
  useEffect(() => {
    lmsApi.adminRuntime().then(setRuntime).catch((error) => notify(error.message));
  }, [notify]);

  if (section === "overview") {
    return (
      <main className="admin-main stakeholder-workspace">
        <WorkspaceHeader eyebrow="Leashed school operating system" title="Teach the work. Prove the skill. Open the door." subtitle="One connected system turns approved vocational knowledge into daily AI-led instruction, verified evidence, portable credentials, and public outcomes."/>
        <section className="product-thesis">
          <div><span>THE PRODUCT</span><h2>Not another LMS. A vocational school operating system.</h2><p>Leashed gives a school the curriculum engine, AI professor, evidence system, human exception layer, credential record, family visibility, and outcome reporting required to run affordable skills education.</p></div>
          <button className="btn primary" onClick={() => setSection("curriculum")}>Build the learning system →</button>
        </section>
        <div className="operating-loop">
          {[
            ["1","AUTHOR","Approved experts and the AI Course Architect build source-grounded learning."],
            ["2","TEACH","The AI professor runs each learner’s day under published school policy."],
            ["3","PROVE","Learners submit observable work; testing and evidence gates protect rigor."],
            ["4","VERIFY","People review exceptions—not every instructional minute."],
            ["5","CREDENTIAL","Verified skills become portable records and completion credentials."],
            ["6","REPORT","Schools and public partners see access, progress, quality, and outcomes."],
          ].map(([n,title,copy]) => <article key={n}><span>{n}</span><strong>{title}</strong><p>{copy}</p></article>)}
        </div>
        <div className="workspace-grid">
          <RoleCard title="School operator" promise="Launch and govern programs without assembling seven disconnected tools." action="Open schools" onClick={() => setSection("schools")} stats={`${dashboard.stats.pathways} live pathways`}/>
          <RoleCard title="Curriculum administrator" promise="Control everything the learner and professor can see, teach, ask, grade, and unlock." action="Open curriculum" onClick={() => setSection("curriculum")} stats={`${dashboard.stats.uniqueModules} reusable modules`}/>
          <RoleCard title="Educator" promise="Review judgment, safety, and evidence exceptions while AI handles daily repetition." action="Open educator desk" onClick={() => setSection("educators")} stats={`${runtime?.stats.pendingEvidence || 0} evidence reviews`}/>
          <RoleCard title="Testing authority" promise="Trace every assessment to approved outcomes and preserve an auditable decision." action="Open testing" onClick={() => setSection("assessment")} stats={`${runtime?.stats.pendingAssessmentReviews || 0} written reviews`}/>
          <RoleCard title="Family or supporter" promise="See attendance, momentum, milestones, and support needs without exposing private instruction." action="Open family view" onClick={() => setSection("families")} stats="Consent-controlled"/>
          <RoleCard title="Government or funder" promise="Measure seats, hours, completions, equity, credentials, and outcomes—not chat volume." action="Open public outcomes" onClick={() => setSection("impact")} stats="Aggregate reporting"/>
        </div>
      </main>
    );
  }

  if (section === "schools") {
    return (
      <main className="admin-main stakeholder-workspace">
        <WorkspaceHeader eyebrow="School operations" title="Schools, programs, cohorts, and delivery" subtitle="A school launches a governed program, enrolls a cohort, chooses a delivery contract, and monitors intervention—not individual chat threads."/>
        <JourneyRail steps={["Create school","Choose pathways","Set policy","Open cohort","Enroll learners","Operate learning days","Verify outcomes"]}/>
        <div className="workspace-grid three">
          <MetricCard value="1" label="School in this environment" detail="Leashed Learning Academy"/>
          <MetricCard value={String(dashboard.stats.pathways)} label="Active pathways" detail="Shared governed curriculum"/>
          <MetricCard value="2" label="Delivery contracts" detail="Self-paced assistant or paced professor"/>
        </div>
        <section className="surface-panel">
          <PanelTitle title="Program portfolio" copy="Each pathway inherits published curriculum, assessment, credential, and reporting rules."/>
          {["SIT · Professional Pet Sitter","CAT · Professional Cat Groomer","DB · Dog Bather / Animal Care Assistant","PDT · Professional Dog Trainer","PDG · Professional Dog Groomer","CPP · Complete Professional Pet Care"].map((item, index) => (
            <div className="operations-row" key={item}><span className="program-orb">{index+1}</span><strong>{item}</strong><span>Admissions open</span><span>AI delivery ready</span><button onClick={() => setSection("curriculum")}>Manage</button></div>
          ))}
        </section>
      </main>
    );
  }

  if (section === "learners") {
    return (
      <main className="admin-main stakeholder-workspace">
        <WorkspaceHeader eyebrow="Learner success" title="Every learner has a next best action" subtitle="Progress combines time, mastery, evidence, wellbeing, attendance, and credential requirements—not page views."/>
        <JourneyRail steps={["Welcome","Assess readiness","Set daily mission","Teach & adapt","Practice","Prove mastery","Earn credential","Transition to work"]}/>
        <div className="workspace-grid three">
          <MetricCard value={String(runtime?.sessions.length || 0)} label="Learning-day records" detail="Timestamped sessions"/>
          <MetricCard value={String(runtime?.stats.submissions || 0)} label="Evidence submissions" detail="Verification tracked"/>
          <MetricCard value={String(runtime?.stats.incidents || 0)} label="Conduct interventions" detail="Respectful-learning policy"/>
        </div>
        <CapabilityMap title="Learner success signals" items={["Daily readiness and sentiment","Instructional minutes and breaks","Mastery attempts and reteaching","Assignment evidence","Assessment status","Accessibility accommodations","Support escalation","Credential readiness"]}/>
      </main>
    );
  }

  if (section === "educators") {
    return (
      <main className="admin-main stakeholder-workspace">
        <WorkspaceHeader eyebrow="Educator desk" title="Humans handle judgment. AI handles repetition." subtitle="Educators approve sources, calibrate standards, review edge cases, support learners, and intervene where professional judgment matters."/>
        <JourneyRail steps={["Review exceptions","Inspect source trail","Assess evidence","Coach or return","Verify competency","Improve curriculum"]}/>
        <RuntimeReviewQueue notify={notify}/>
        <CapabilityMap title="Educator controls" items={["Evidence review","Written-response verification","Safety signoff","Rubric calibration","Learner intervention","Professor conversation audit","Curriculum feedback","Accommodation decisions"]}/>
      </main>
    );
  }

  if (section === "assessment") {
    return (
      <main className="admin-main stakeholder-workspace">
        <WorkspaceHeader eyebrow="Assessment integrity" title="Testing proves decisions, not memory tricks" subtitle="Question banks, practical evidence, proctor events, written judgment, and human verification flow into one auditable grade decision."/>
        <JourneyRail steps={["Map outcome","Author item","Validate source","Deliver securely","Score objective work","Review judgment","Release result"]}/>
        <RuntimeReviewQueue notify={notify}/>
        <CapabilityMap title="Assessment system" items={["Outcome-to-item map","Adaptive practice","Timed quizzes","Module exams","Practical evidence","Retake policy","Accommodations","Proctor event ledger","Moderation and appeals","Grade release"]}/>
      </main>
    );
  }

  if (section === "credentials") {
    return (
      <main className="admin-main stakeholder-workspace">
        <WorkspaceHeader eyebrow="Skills and credentials" title="A credential is the visible edge of verified evidence" subtitle="Leashed records what the learner can do, who or what verified it, which standard governed it, and how the result can be checked."/>
        <JourneyRail steps={["Complete requirements","Verify evidence","Approve skills","Issue credential","Share safely","Verify publicly","Connect to opportunity"]}/>
        <div className="credential-preview"><span className="brand-mark">L</span><div><small>LEASHED VERIFIED</small><h2>Professional Pet Care Credential</h2><p>Identity · skills · evidence · issuer · policy version · issue date · verification record</p></div><strong>READY WHEN VERIFIED</strong></div>
        <CapabilityMap title="Credential record" items={["Stackable skills","Certificates and diplomas","Evidence lineage","Revocation status","Public verification link","Learner-controlled sharing","Employer view","Renewal requirements"]}/>
      </main>
    );
  }

  if (section === "families") {
    return (
      <main className="admin-main stakeholder-workspace">
        <WorkspaceHeader eyebrow="Family and supporter view" title="Useful visibility without surveillance" subtitle="With learner consent, supporters see schedule, attendance, milestones, upcoming evidence, celebrations, and requests for help—not private coaching conversations."/>
        <JourneyRail steps={["Learner grants access","Supporter accepts","See weekly rhythm","Celebrate progress","Respond to support need","Prepare for completion"]}/>
        <section className="family-card">
          <div><span className="family-avatar">MS</span><div><strong>Morgan’s weekly learning</strong><small>Shared with consent · private conversations hidden</small></div></div>
          <div className="family-week"><span><strong>4</strong> learning days</span><span><strong>18.5h</strong> verified time</span><span><strong>3</strong> milestones</span><span><strong>1</strong> upcoming assignment</span></div>
          <div className="celebration">A moment to celebrate: Morgan demonstrated safe client handoff reasoning this week.</div>
        </section>
        <CapabilityMap title="Supporter boundaries" items={["Consent and revocation","Attendance summary","Milestones","Upcoming commitments","Celebrations","Support requests","No private chat access","Age-appropriate controls"]}/>
      </main>
    );
  }

  if (section === "impact") {
    return (
      <main className="admin-main stakeholder-workspace">
        <WorkspaceHeader eyebrow="Public outcomes" title="Fund access and outcomes—not software activity" subtitle="Government, funders, and workforce partners receive aggregate, privacy-protected evidence of reach, instructional delivery, completion quality, credentials, and transition outcomes."/>
        <div className="workspace-grid three">
          <MetricCard value="6" label="Vocational pathways" detail="From entry certificate to advanced diploma"/>
          <MetricCard value="656" label="Mapped placements" detail="Versioned curriculum lineage"/>
          <MetricCard value="100%" label="Completion gate coverage" detail="Time + mastery + evidence + assessment"/>
        </div>
        <CapabilityMap title="Public accountability" items={["Enrollment and access","Verified instructional hours","Persistence and completion","Credential attainment","Accommodation usage","Equity cuts","Cost per completion","Employment or business launch","Provider quality","Audit exports"]}/>
        <section className="surface-panel public-contract"><PanelTitle title="Data contract" copy="Individual coaching remains private. Public reporting uses minimum-cell thresholds, aggregate measures, policy versions, and traceable definitions."/></section>
      </main>
    );
  }

  if (section === "policy") {
    return (
      <main className="admin-main stakeholder-workspace">
        <WorkspaceHeader eyebrow="Policy and audit" title="The school’s rules must be executable" subtitle="Published policy controls what the professor can do, what learners must prove, when people intervene, and what the record means."/>
        <SchoolControlPlane notify={notify}/>
      </main>
    );
  }

  return null;
}

function WorkspaceHeader({eyebrow,title,subtitle}:{eyebrow:string;title:string;subtitle:string}) {
  return <header className="workspace-header"><span className="eyebrow green">{eyebrow}</span><h1>{title}</h1><p>{subtitle}</p></header>;
}
function JourneyRail({steps}:{steps:string[]}) {
  return <section className="journey-rail">{steps.map((step,index)=><div key={step}><span>{index+1}</span><strong>{step}</strong></div>)}</section>;
}
function RoleCard({title,promise,action,onClick,stats}:{title:string;promise:string;action:string;onClick:()=>void;stats:string}) {
  return <article className="role-card"><small>{stats}</small><h3>{title}</h3><p>{promise}</p><button onClick={onClick}>{action} →</button></article>;
}
function MetricCard({value,label,detail}:{value:string;label:string;detail:string}) {
  return <article className="metric-card"><strong>{value}</strong><h3>{label}</h3><p>{detail}</p></article>;
}
function CapabilityMap({title,items}:{title:string;items:string[]}) {
  return <section className="surface-panel capability-panel"><PanelTitle title={title} copy="The connected capabilities for this workspace."/><div>{items.map(item=><span key={item}>✓ {item}</span>)}</div></section>;
}
function PanelTitle({title,copy}:{title:string;copy:string}) {
  return <div className="panel-title"><h2>{title}</h2><p>{copy}</p></div>;
}

function Stat({value, label}: {value: number; label: string}) {
  return <div className="admin-stat"><strong>{value.toLocaleString()}</strong><span>{label}</span></div>;
}