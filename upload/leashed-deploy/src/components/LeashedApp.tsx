"use client";

import {FormEvent, useCallback, useEffect, useMemo, useState} from "react";
import {lmsApi} from "@/lib/api";
import type {Bootstrap, LearnerState, Module, Pathway} from "@/lib/types";
import {LessonExperience} from "@/components/LessonExperience";
import {AdminStudio} from "@/components/AdminStudio";
import {DailyLearningRuntime} from "@/components/DailyLearningRuntime";
import {CompletionGate} from "@/components/CompletionGate";
import {FocusedLearningPlayer} from "@/components/FocusedLearningPlayer";
import {MockedDashboard} from "@/components/MockedDashboard";
import {MockedLearningCanvas} from "@/components/MockedLearningCanvas";

type Route = "home" | "catalog" | "classroom" | "progress" | "admin";
type EnrollDraft = {
  step: number;
  pathCode: string;
  pace: string;
  goal: string;
  experience: string;
};
type ChatMessage = {role: "learner" | "professor"; content: string};

const initialEnrollment: EnrollDraft = {
  step: 1,
  pathCode: "",
  pace: "guided",
  goal: "",
  experience: "New to professional pet care"
};

export function LeashedApp() {
  const [data, setData] = useState<Bootstrap | null>(null);
  const [route, setRoute] = useState<Route>("home");
  const [pathCode, setPathCode] = useState("");
  const [moduleCode, setModuleCode] = useState("");
  const [enrollment, setEnrollment] = useState<EnrollDraft | null>(null);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");
  const [accessOpen, setAccessOpen] = useState(false);

  useEffect(() => {
    lmsApi.bootstrap().then(setData).catch((error) => setToast(error.message));
  }, []);

  const notify = useCallback((message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2400);
  }, []);

  if (!data) {
    return (
      <main className="loading">
        <div><span className="spinner"/><p>Preparing your Leashed classroom…</p></div>
      </main>
    );
  }

  const enrolled = data.state.enrollments.map((item) => item.path_code);
  const paths = data.curriculum.paths;
  const selectedPath = paths.find((path) => path.code === pathCode);

  function navigate(next: Route) {
    setRoute(next);
    setSearch("");
    window.scrollTo({top: 0});
  }

  function openPath(code: string) {
    setPathCode(code);
    setRoute("catalog");
    window.scrollTo({top: 0});
  }

  function continuePath(code: string) {
    setPathCode(code);
    setModuleCode(data!.state.summaries[code]?.currentModule || paths.find((p) => p.code === code)!.modules[0].code);
    setRoute("classroom");
  }

  function updateState(state: LearnerState) {
    setData((current) => current ? {...current, state} : current);
  }

  const searchHits = search.trim().length < 2 ? [] : paths.flatMap((path) => {
    const query = search.toLowerCase();
    const hits: Array<{type: string; title: string; subtitle: string; path: string; module?: string}> = [];
    if (`${path.code} ${path.title} ${path.description}`.toLowerCase().includes(query)) {
      hits.push({type: "Path", title: `${path.code} · ${path.title}`, subtitle: path.credential, path: path.code});
    }
    path.modules.forEach((module) => {
      if (`${module.code} ${module.title} ${module.description}`.toLowerCase().includes(query)) {
        hits.push({type: "Module", title: `${module.code} · ${module.title}`, subtitle: path.title, path: path.code, module: module.code});
      }
    });
    return hits;
  }).slice(0, 20);

  return (
    <>
      <Header
        route={route}
        learnerName={data.learner.name}
        search={search}
        setSearch={setSearch}
        navigate={navigate}
        openAccess={() => setAccessOpen(true)}
      />
      {searchHits.length > 0 && (
        <div className="search-results">
          {searchHits.map((hit) => (
            <button
              className="search-hit"
              key={`${hit.path}-${hit.module || "path"}`}
              onClick={() => {
                setSearch("");
                if (hit.module && enrolled.includes(hit.path)) {
                  setPathCode(hit.path);
                  setModuleCode(hit.module);
                  setRoute("classroom");
                } else {
                  openPath(hit.path);
                }
              }}
            >
              <strong>{hit.title}</strong>
              <small>{hit.type} · {hit.subtitle}</small>
            </button>
          ))}
        </div>
      )}

      {route === "home" && (
        <HomePage
          data={data}
          enrolled={enrolled}
          openPath={openPath}
          continuePath={continuePath}
          openEnrollment={(code = "") => setEnrollment({...initialEnrollment, pathCode: code})}
          navigate={navigate}
        />
      )}
      {route === "catalog" && (
        <CatalogPage
          data={data}
          selectedPath={selectedPath}
          enrolled={enrolled}
          openPath={openPath}
          clearPath={() => setPathCode("")}
          continuePath={continuePath}
          openEnrollment={(code = "") => setEnrollment({...initialEnrollment, pathCode: code})}
        />
      )}
      {route === "classroom" && (
        <ClassroomPage
          data={data}
          pathCode={pathCode}
          moduleCode={moduleCode}
          setPathCode={setPathCode}
          setModuleCode={setModuleCode}
          updateState={updateState}
          notify={notify}
          backHome={() => navigate("home")}
          openEnrollment={() => setEnrollment({...initialEnrollment})}
        />
      )}
      {route === "progress" && (
        <ProgressPage
          data={data}
          continuePath={continuePath}
          openPath={openPath}
          openEnrollment={() => setEnrollment({...initialEnrollment})}
        />
      )}
      {route === "admin" && <AdminStudio notify={notify}/>}

      {accessOpen && (
        <AccessPortal
          learnerName={data.learner.name}
          close={() => setAccessOpen(false)}
          enterLearner={() => { setAccessOpen(false); navigate(data.state.enrollments.length ? "classroom" : "home"); }}
          enterAdmin={() => { setAccessOpen(false); navigate("admin"); }}
        />
      )}
      {enrollment && (
        <EnrollmentModal
          draft={enrollment}
          setDraft={setEnrollment}
          paths={paths}
          close={() => setEnrollment(null)}
          onComplete={async (draft) => {
            const state = await lmsApi.enroll({
              pathCode: draft.pathCode,
              pace: draft.pace,
              goal: draft.goal,
              experience: draft.experience
            });
            updateState(state);
            setEnrollment(null);
            setPathCode(draft.pathCode);
            setModuleCode(state.summaries[draft.pathCode].currentModule);
            setRoute("classroom");
            notify("Enrollment complete — welcome to Leashed");
          }}
        />
      )}
      <div id="toast" className={toast ? "show" : ""}>{toast}</div>
    </>
  );
}

function Header({
  route, learnerName, search, setSearch, navigate, openAccess
}: {
  route: Route;
  learnerName: string;
  search: string;
  setSearch: (value: string) => void;
  navigate: (route: Route) => void;
  openAccess: () => void;
}) {
  const learnerView = route === "home" || route === "classroom";
  return (
    <header className={`topbar topbar-${route}`}>
      <button className="brand" onClick={() => navigate("home")} aria-label="Leashed home">
        <span className="brand-mark"><i>●</i><i>●</i><i>●</i></span>
        <span><strong>Leashed</strong>{route === "classroom" && <small>Your Goals. Our Support. Infinite Possibilities.</small>}</span>
      </button>
      <nav className={learnerView ? "learner-nav" : ""} aria-label="Main navigation">
        {(["home", "catalog", "classroom", "progress"] as Route[]).map((item) => (
          <button className={route === item ? "active" : ""} key={item} onClick={() => navigate(item)}>
            {item === "home" ? "Dashboard" : item === "catalog" ? "Courses" : item[0].toUpperCase() + item.slice(1)}
          </button>
        ))}
      </nav>
      <div className="top-actions">
        <label className="search">
          <span>⌕</span>
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={route === "classroom" ? "Ask a question, search your course, or tell me what you need" : "Search your courses, assignments, or ask a question…"}/>
        </label>
        {learnerView && <>
          <button className="header-tool" aria-label="Notifications"><span>♟</span><b>3</b><small>Notifications</small></button>
          {route === "home" && <button className="header-tool" aria-label="Messages"><span>✉</span><small>Messages</small></button>}
          {route === "home" && <button className="header-tool" aria-label="Help"><span>♣</span><small>Help</small></button>}
        </>}
        <button className="header-profile" onClick={openAccess}>
          <span className="avatar">{learnerName[0]?.toUpperCase() || "L"}</span>
          <strong>{learnerName.split(" ")[0]} {learnerName.split(" ")[1]?.[0] || ""}.</strong>
          <i>⌄</i>
        </button>
        {route === "classroom" && <div className="header-progress"><b>{Math.max(1, 68)}%</b><span><strong>Progress</strong><small>Level 4</small></span></div>}
        {!learnerView && <button className="login-button" onClick={openAccess}>Log in</button>}
      </div>
    </header>
  );
}

function summaryFor(data: Bootstrap, path: Pathway) {
  return data.state.summaries[path.code] || {
    completed: 0, total: path.moduleCount, percent: 0, currentModule: path.modules[0].code
  };
}

function PathCard({
  data, path, enrolled, openPath, continuePath, openEnrollment
}: {
  data: Bootstrap;
  path: Pathway;
  enrolled: boolean;
  openPath: (code: string) => void;
  continuePath: (code: string) => void;
  openEnrollment: (code: string) => void;
}) {
  const progress = summaryFor(data, path);
  return (
    <article className="path-card" style={{"--accent": path.accent} as React.CSSProperties}>
      <span className="path-stripe"/>
      <div className="path-top">
        <span className="code-badge">{path.code}</span>
        <span className="pill">{enrolled ? "ENROLLED" : path.level.toUpperCase()}</span>
      </div>
      <h3>{path.title}</h3>
      <p>{path.description}</p>
      {enrolled && (
        <>
          <div className="progress-track"><span style={{width: `${progress.percent}%`}}/></div>
          <small>{progress.percent}% · {progress.completed} of {progress.total} modules</small>
        </>
      )}
      <div className="meta-row">
        <span>◷ {path.hours.toLocaleString()} hrs</span>
        <span>▦ {path.moduleCount} modules</span>
        <span>◆ Capstone</span>
      </div>
      <div className="card-actions">
        <button className="btn secondary" onClick={() => openPath(path.code)}>View path</button>
        {enrolled
          ? <button className="btn primary" onClick={() => continuePath(path.code)}>Continue</button>
          : <button className="btn primary" onClick={() => openEnrollment(path.code)}>Enroll</button>}
      </div>
    </article>
  );
}

function HomePage({
  data, enrolled, openPath, continuePath, openEnrollment, navigate
}: {
  data: Bootstrap;
  enrolled: string[];
  openPath: (code: string) => void;
  continuePath: (code: string) => void;
  openEnrollment: (code?: string) => void;
  navigate: (route: Route) => void;
}) {
  return (
    <MockedDashboard
      data={data}
      enrolled={enrolled}
      openPath={openPath}
      continuePath={continuePath}
      navigate={(route) => navigate(route)}
      openEnrollment={() => openEnrollment()}
    />
  );
}

function SectionHead({title, subtitle}: {title: string; subtitle: string}) {
  return <div className="section-head"><div><h2>{title}</h2><p>{subtitle}</p></div></div>;
}

function CatalogPage({
  data, selectedPath, enrolled, openPath, clearPath, continuePath, openEnrollment
}: {
  data: Bootstrap;
  selectedPath?: Pathway;
  enrolled: string[];
  openPath: (code: string) => void;
  clearPath: () => void;
  continuePath: (code: string) => void;
  openEnrollment: (code?: string) => void;
}) {
  if (selectedPath) {
    return (
      <div className="page">
        <button className="link-btn" onClick={clearPath}>← All programs</button>
        <section className="path-detail-head">
          <span className="eyebrow">{selectedPath.level} · {selectedPath.code}</span>
          <h1>{selectedPath.title}</h1>
          <p>{selectedPath.description}</p>
          <div className="meta-row light">
            <span>{selectedPath.hours.toLocaleString()} clock hours</span>
            <span>{selectedPath.moduleCount} mapped modules</span>
            <span>{selectedPath.credential}</span>
            <span>≈ {selectedPath.weeksFullTime} weeks full-time</span>
          </div>
          <div className="hero-actions">
            {enrolled.includes(selectedPath.code)
              ? <button className="btn primary" onClick={() => continuePath(selectedPath.code)}>Continue in classroom →</button>
              : <button className="btn primary" onClick={() => openEnrollment(selectedPath.code)}>Enroll in this path →</button>}
          </div>
        </section>
        <SectionHead title="Pedagogical sequence" subtitle="Modules unlock in order: Foundation → Core Skill → Advanced Skill → Capstone."/>
        {selectedPath.levels.map((level, index) => (
          <details className="level" open={index === 0} key={level.name}>
            <summary><span>{index + 1}. {level.name}</span><span>{level.modules.length} modules</span></summary>
            <div className="level-desc">{level.description}</div>
            <div className="table-wrap">
              <table className="module-table">
                <thead><tr><th>Code & module</th><th>Description</th><th>Track</th><th>Hours</th></tr></thead>
                <tbody>
                  {level.modules.map((module) => (
                    <tr key={module.code}>
                      <td><span className="module-title">{module.code}</span><br/>{module.title} {module.safetyCritical && <span className="pill safety">SAFETY</span>}</td>
                      <td className="module-desc">{module.description}</td>
                      <td>{module.track}</td><td>{module.hours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        ))}
        <section className="capstone-card">
          <span className="eyebrow orange">Applied Capstone · {selectedPath.capstone.code}</span>
          <h3>{selectedPath.capstone.title}</h3>
          <p>{selectedPath.capstone.description}</p>
          <h4>Required deliverables</h4>
          <ul>{selectedPath.capstone.deliverables.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="catalog-title">
        <span className="eyebrow green">Integrated Course Catalog</span>
        <h1>Choose your path</h1>
        <p>Six pathways, ordered from focused certificates to complete professional pet-care ownership.</p>
      </div>
      <div className="catalog-layout">
        <aside className="filter-panel">
          <h3>Credential ladder</h3>
          {data.curriculum.credentialLadder.map((step, index) => (
            <div className="filter-option" key={step.level}>
              <span className="ladder-num">{index + 1}</span>
              <div><strong>{step.level}</strong><br/><small>{step.paths.join(", ")}</small></div>
            </div>
          ))}
          <hr/>
          <h3>Completion model</h3>
          {data.curriculum.completionStandard.map((item) => <div className="check" key={item}>✓ <span>{item}</span></div>)}
        </aside>
        <section className="detail-panel">
          <div className="program-list">
            {data.curriculum.paths.map((path) => (
              <button className="program-row" key={path.code} onClick={() => openPath(path.code)}>
                <span className="code-badge" style={{"--accent": path.accent} as React.CSSProperties}>{path.code}</span>
                <span><h3>{path.title}</h3><p>{path.description}</p></span>
                <span className="numbers"><strong>{path.moduleCount}</strong>modules · {path.hours.toLocaleString()} hrs</span>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function ClassroomPage({
  data, pathCode, moduleCode, setPathCode, setModuleCode, updateState, notify, backHome, openEnrollment
}: {
  data: Bootstrap;
  pathCode: string;
  moduleCode: string;
  setPathCode: (code: string) => void;
  setModuleCode: (code: string) => void;
  updateState: (state: LearnerState) => void;
  notify: (message: string) => void;
  backHome: () => void;
  openEnrollment: () => void;
}) {
  const enrolledCodes = data.state.enrollments.map((item) => item.path_code);
  const activeCode = enrolledCodes.includes(pathCode) ? pathCode : enrolledCodes[0];

  if (!activeCode) {
    return <div className="page"><div className="empty"><h2>Your classroom is ready when you are</h2><p>Enroll in a path to enter the first module in pedagogical order.</p><button className="btn primary" onClick={openEnrollment}>Choose a path</button></div></div>;
  }

  const path = data.curriculum.paths.find((item) => item.code === activeCode)!;
  const summary = summaryFor(data, path);
  const activeModuleCode = path.modules.some((item) => item.code === moduleCode) ? moduleCode : summary.currentModule;
  const module = path.modules.find((item) => item.code === activeModuleCode)!;
  const index = path.modules.indexOf(module);
  const isComplete = data.state.progress[module.code]?.status === "completed";

  useEffect(() => {
    setPathCode(activeCode);
    setModuleCode(activeModuleCode);
  }, [activeCode, activeModuleCode, setModuleCode, setPathCode]);

  return (
    <MockedLearningCanvas
      path={path}
      module={module}
      summary={summary}
      progress={data.state.progress}
      initialNote={data.state.notes[module.code] || ""}
      learnerName={data.learner.name}
      isComplete={isComplete}
      hasNext={index < path.modules.length - 1}
      updateState={updateState}
      goNext={() => index < path.modules.length - 1 && setModuleCode(path.modules[index + 1].code)}
      goPrevious={() => index > 0 && setModuleCode(path.modules[index - 1].code)}
      selectModule={setModuleCode}
      backHome={backHome}
      notify={notify}
    />
  );
}

function Objective({number, title, children}: {number: string; title: string; children: React.ReactNode}) {
  return <div className="objective"><span>{number}</span><div><strong>{title}</strong><br/>{children}</div></div>;
}

function ProfessorPanel({module, open, close, locked}: {module: Module; open: boolean; close: () => void; locked: boolean}) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    lmsApi.professorHistory(module.code).then(({messages: history}) => {
      setMessages(history.map((item) => ({role: item.role as "learner" | "professor", content: item.content})));
    }).catch(() => setMessages([]));
  }, [module.code]);

  async function send(message: string, mode = "coach") {
    if (!message.trim() || sending) return;
    setMessages((current) => [...current, {role: "learner", content: message}]);
    setSending(true);
    try {
      const result = await lmsApi.professor({moduleCode: module.code, message, mode});
      setMessages((current) => [...current, {role: "professor", content: result.reply}]);
    } catch (error) {
      setMessages((current) => [...current, {role: "professor", content: (error as Error).message}]);
    } finally {
      setSending(false);
    }
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    const message = input;
    setInput("");
    void send(message);
  }

  return (
    <aside className={`professor ${open ? "open" : ""}`}>
      <div className="prof-head">
        <span className="prof-avatar">PL</span>
        <div><h3>Professor Luna</h3><small>● AI learning coach</small></div>
        <button className="close prof-toggle" onClick={close}>×</button>
      </div>
      <div className="quick-prompts">
        <button disabled={locked} onClick={() => void send("Teach this lesson", "teach")}>Teach this lesson</button>
        <button disabled={locked} onClick={() => void send("Quiz me on this module", "quiz")}>Quiz me</button>
        <button disabled={locked} onClick={() => void send("Give me a hint", "hint")}>Give me a hint</button>
      </div>
      {locked && <div className="professor-lock">Open today’s learning day and clear the assignment gate to speak with Professor Luna.</div>}
      <div className="chat">
        {messages.length === 0 && <div className="message professor-msg"><strong>Welcome to {module.title}.</strong><br/>I can teach, quiz, coach your answer, or help plan the required evidence.</div>}
        {messages.map((message, index) => <div className={`message ${message.role === "learner" ? "learner-msg" : "professor-msg"}`} key={index}>{message.content}</div>)}
        {sending && <div className="message professor-msg">Professor Luna is thinking…</div>}
      </div>
      <form className="chat-form" onSubmit={submit}>
        <textarea disabled={locked} value={input} onChange={(event) => setInput(event.target.value)} placeholder={locked ? "Professor input is locked by school policy" : "Ask Professor Luna or submit your answer…"}/>
        <div><small>{locked ? "Open and clear today’s learning gate" : `Coaching stays tied to ${module.code}`}</small><button className="btn primary" disabled={sending || locked}>Send</button></div>
      </form>
    </aside>
  );
}

function CapstoneStudio({
  data, path, updateState, notify
}: {
  data: Bootstrap;
  path: Pathway;
  updateState: (state: LearnerState) => void;
  notify: (message: string) => void;
}) {
  const completed = new Set(data.state.capstones.filter((item) => item.path_code === path.code && item.completed).map((item) => item.item_index));
  return (
    <section className="lesson-card">
      <span className="eyebrow orange">Capstone Studio</span>
      <h2>{path.capstone.title}</h2><p>{path.capstone.description}</p>
      <h3>Deliverables</h3>
      <div className="checklist">
        {path.capstone.deliverables.map((item, index) => (
          <label className="check" key={item}>
            <input
              type="checkbox"
              checked={completed.has(index)}
              onChange={async (event) => {
                const state = await lmsApi.capstone({pathCode: path.code, itemIndex: index, completed: event.target.checked});
                updateState(state);
                notify("Capstone progress saved");
              }}
            />
            <span>{item}</span>
          </label>
        ))}
      </div>
      <h3>Panel rubric</h3>
      <div className="checklist">{path.capstone.rubric.map((item) => <div className="check" key={item}>◆ <span>{item}</span></div>)}</div>
    </section>
  );
}

function ProgressPage({
  data, continuePath, openPath, openEnrollment
}: {
  data: Bootstrap;
  continuePath: (code: string) => void;
  openPath: (code: string) => void;
  openEnrollment: () => void;
}) {
  const enrolled = data.state.enrollments.map((item) => item.path_code);
  if (!enrolled.length) {
    return <div className="page"><div className="empty"><h2>No progress to show yet</h2><p>Choose a path and complete enrollment to start tracking.</p><button className="btn primary" onClick={openEnrollment}>Enroll now</button></div></div>;
  }
  return (
    <div className="page progress-page">
      <div>
        <section className="progress-hero">
          <span className="eyebrow">Learner Progress</span>
          <h1>{data.learner.name}’s journey</h1>
          <p>Completion is based on mapped modules. Competency also requires evidence, clock hours, rubric approval and capstone completion.</p>
        </section>
        {enrolled.map((code) => {
          const path = data.curriculum.paths.find((item) => item.code === code)!;
          const progress = summaryFor(data, path);
          return (
            <section className="progress-program" key={code}>
              <div className="progress-program-head">
                <div><span className="eyebrow green">{path.code} · {path.level}</span><h3>{path.title}</h3><small>Current: {progress.currentModule}</small></div>
                <span className="big-percent">{progress.percent}%</span>
              </div>
              <div className="progress-track"><span style={{width: `${progress.percent}%`}}/></div>
              {path.levels.map((level) => {
                const complete = level.modules.filter((module) => data.state.progress[module.code]?.status === "completed").length;
                const percent = Math.round(complete / level.modules.length * 100);
                return <div className="level-progress" key={level.name}><strong>{level.name}</strong><div className="progress-track"><span style={{width: `${percent}%`}}/></div><span>{percent}%</span></div>;
              })}
              <div className="card-actions">
                <button className="btn primary" onClick={() => continuePath(code)}>Continue learning</button>
                <button className="btn secondary" onClick={() => openPath(code)}>View syllabus</button>
              </div>
            </section>
          );
        })}
      </div>
      <aside className="progress-side">
        <div className="side-card"><h3>Completion standard</h3><div className="checklist">{data.curriculum.completionStandard.map((item) => <div className="check" key={item}>○ <span>{item}</span></div>)}</div></div>
        <div className="side-card"><h3>Module evidence model</h3><div className="checklist">{data.curriculum.moduleEvidenceModel.map((item) => <div className="check" key={item}>✓ <span>{item}</span></div>)}</div></div>
      </aside>
    </div>
  );
}

function EnrollmentModal({
  draft, setDraft, paths, close, onComplete
}: {
  draft: EnrollDraft;
  setDraft: (draft: EnrollDraft | null) => void;
  paths: Pathway[];
  close: () => void;
  onComplete: (draft: EnrollDraft) => Promise<void>;
}) {
  const [busy, setBusy] = useState(false);
  const path = paths.find((item) => item.code === draft.pathCode);

  return (
    <div className="modal-backdrop">
      <section className="modal" role="dialog" aria-modal="true">
        <div className="modal-head">
          <div><span className="eyebrow green">Enrollment</span><h2>Start your Leashed journey</h2></div>
          <button className="close" onClick={close}>×</button>
        </div>
        <div className="modal-body">
          <div className="steps">{[1, 2, 3].map((step) => <span className={`step ${step <= draft.step ? "done" : ""}`} key={step}/>)}</div>
          {draft.step === 1 && (
            <>
              <h3>Choose your learning path</h3>
              <p>Programs are ordered from focused certificates to the integrated advanced diploma.</p>
              <div className="choice-grid">
                {paths.map((item) => (
                  <button className={`choice ${draft.pathCode === item.code ? "selected" : ""}`} key={item.code} onClick={() => setDraft({...draft, pathCode: item.code})}>
                    <strong>{item.code} · {item.title}</strong>
                    <small>{item.level} · {item.hours.toLocaleString()} hours · {item.moduleCount} modules</small>
                  </button>
                ))}
              </div>
            </>
          )}
          {draft.step === 2 && (
            <>
              <h3>Personalize your learning plan</h3>
              <p>Professor Luna uses this context to frame scenarios and keep learning relevant.</p>
              <div className="form-grid">
                <label className="field">Study pace
                  <select value={draft.pace} onChange={(event) => setDraft({...draft, pace: event.target.value})}>
                    <option value="guided">Guided · recommended sequence</option>
                    <option value="accelerated">Accelerated · intensive</option>
                    <option value="flex">Flexible · self-paced</option>
                  </select>
                </label>
                <label className="field">Your goal
                  <textarea value={draft.goal} onChange={(event) => setDraft({...draft, goal: event.target.value})} placeholder="What do you want this credential to help you achieve?"/>
                </label>
                <label className="field">Experience level
                  <select value={draft.experience} onChange={(event) => setDraft({...draft, experience: event.target.value})}>
                    <option>New to professional pet care</option><option>Some animal-care experience</option><option>Working professional</option><option>Current owner or manager</option>
                  </select>
                </label>
              </div>
            </>
          )}
          {draft.step === 3 && path && (
            <>
              <h3>Ready to begin</h3>
              <p>Enrollment places you in the first required module. Each next module unlocks after the prior one is completed.</p>
              <div className="review">
                <ReviewRow label="Path" value={`${path.code} · ${path.title}`}/>
                <ReviewRow label="Credential" value={path.credential}/>
                <ReviewRow label="Learning plan" value={`${path.moduleCount} modules · ${path.hours.toLocaleString()} hours`}/>
                <ReviewRow label="Capstone" value={path.capstone.title}/>
              </div>
            </>
          )}
        </div>
        <div className="modal-foot">
          <button className="btn ghost" onClick={() => draft.step === 1 ? close() : setDraft({...draft, step: draft.step - 1})}>{draft.step === 1 ? "Cancel" : "Back"}</button>
          <button
            className="btn primary"
            disabled={!draft.pathCode || busy}
            onClick={async () => {
              if (draft.step < 3) return setDraft({...draft, step: draft.step + 1});
              setBusy(true);
              try { await onComplete(draft); } finally { setBusy(false); }
            }}
          >
            {draft.step === 3 ? (busy ? "Enrolling…" : "Enroll & enter classroom") : "Continue"} →
          </button>
        </div>
      </section>
    </div>
  );
}

function AccessPortal({
  learnerName, close, enterLearner, enterAdmin
}: {
  learnerName: string;
  close: () => void;
  enterLearner: () => void;
  enterAdmin: () => void;
}) {
  return (
    <div className="modal-backdrop">
      <section className="modal access-modal" role="dialog" aria-modal="true" aria-label="Leashed login">
        <div className="modal-head">
          <div><span className="eyebrow green">Secure access</span><h2>Welcome to Leashed</h2></div>
          <button className="close" onClick={close}>×</button>
        </div>
        <div className="modal-body">
          <div className="session-identity"><span className="avatar">{learnerName[0]?.toUpperCase() || "L"}</span><div><strong>{learnerName}</strong><small>Current authenticated workspace session</small></div></div>
          <p className="muted">Choose the workspace you need. Production deployments can replace this portal with Auth0, Clerk, Supabase Auth, NextAuth, or the existing Leashed tenant identity.</p>
          <div className="access-grid">
            <button onClick={enterLearner}><span>▤</span><strong>Learner classroom</strong><small>Courses, Professor Luna, assessments, assignments, and progress</small></button>
            <button onClick={enterAdmin}><span>⚙</span><strong>Admin & instructor studio</strong><small>Author courses, publish content, add media, grade, and manage cohosts</small></button>
          </div>
          <div className="auth-notice">Identity is currently supplied by the secure PromptQL visitor session. Standalone email/password or SSO requires an auth-provider connection before public deployment.</div>
        </div>
      </section>
    </div>
  );
}

function ReviewRow({label, value}: {label: string; value: string}) {
  return <div className="review-row"><span>{label}</span><strong>{value}</strong></div>;
}