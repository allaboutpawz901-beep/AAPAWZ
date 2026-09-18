"use client";

import {FormEvent, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {CompletionGate} from "@/components/CompletionGate";
import {LessonExperience} from "@/components/LessonExperience";
import {lmsApi} from "@/lib/api";
import type {LearnerState, LearningPlayerState, LessonContent, Module, Pathway, Summary} from "@/lib/types";

type Panel = "lesson" | "notes" | "resources" | "transcript";
type Props = {
  path: Pathway;
  module: Module;
  summary: Summary;
  progress: LearnerState["progress"];
  initialNote: string;
  learnerName: string;
  isComplete: boolean;
  hasNext: boolean;
  updateState: (state: LearnerState) => void;
  goNext: () => void;
  goPrevious: () => void;
  selectModule: (code: string) => void;
  backHome: () => void;
  notify: (message: string) => void;
};

const stageLabel: Record<string, string> = {
  today: "Today",
  learn: "Lesson",
  practice: "Practice",
  assess: "Assess",
  assignment: "Assignment",
  complete: "Complete"
};

export function MockedLearningCanvas({
  path, module, summary, progress, initialNote, learnerName, isComplete, hasNext, updateState,
  goNext, goPrevious, selectModule, backHome, notify
}: Props) {
  const [content, setContent] = useState<LessonContent | null>(null);
  const [player, setPlayer] = useState<LearningPlayerState | null>(null);
  const [chat, setChat] = useState<Array<{role: string; content: string}>>([]);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [panel, setPanel] = useState<Panel>("lesson");
  const [modulesOpen, setModulesOpen] = useState(false);
  const targetHandled = useRef(false);

  const refresh = useCallback(async () => {
    const [lesson, state, history] = await Promise.all([
      lmsApi.content(module.code),
      lmsApi.learningPlayer(path.code, module.code),
      lmsApi.professorHistory(module.code)
    ]);
    setContent(lesson);
    setPlayer(state);
    setChat(history.messages.map((item) => ({role: item.role, content: item.content})));
  }, [module.code, path.code]);

  useEffect(() => {
    setContent(null);
    setPlayer(null);
    setChat([]);
    setPanel("lesson");
    setModulesOpen(false);
    targetHandled.current = false;
    void refresh().catch((error) => notify(error.message));
  }, [refresh, notify]);

  useEffect(() => {
    if (!player || targetHandled.current) return;
    targetHandled.current = true;
    const target = window.sessionStorage.getItem("leashed:canvas-target");
    window.sessionStorage.removeItem("leashed:canvas-target");
    if (!target) return;
    if (target === "notes" || target === "resources" || target === "transcript") setPanel(target);
    else if (target === "courses") setModulesOpen(true);
    else if (target === "professor") {
      document.querySelector(".canvas-professor-panel")?.scrollIntoView({behavior: "smooth", block: "center"});
    } else {
      const stage = target === "lesson" ? "learn" : target;
      const match = player!.stages.find((item) => item.key === stage);
      if (match?.unlocked) void openStage(stage);
      else if (stage !== player.activeStage) notify(`${stageLabel[stage] || "That step"} unlocks after the prior requirement.`);
    }
  }, [player]); // target is consumed once per module load

  const phaseIndex = useMemo(() => {
    if (!content || !player) return 0;
    const next = content.phases.findIndex((_, index) => !player.completedPhases.includes(`phase-${index}`));
    return next < 0 ? Math.max(0, content.phases.length - 1) : next;
  }, [content, player]);

  if (!content || !player) return <main className="spec-canvas-loading">Preparing your complete course content…</main>;

  const phase = content.phases[phaseIndex];
  const moduleIndex = path.modules.findIndex((item) => item.code === module.code);
  const stageIndex = player.stages.findIndex((item) => item.active);
  const activeStage = player.activeStage;
  const lessonPercent = Math.round(player.completedPhases.length / Math.max(1, content.phases.length) * 100);
  const approvedImage = content.imagePlaceholders.find((item) => item.url)?.url;
  const approvedVideo = content.video.url && content.video.status !== "placeholder" ? content.video.url : "";

  async function openStage(stage: string) {
    const match = player!.stages.find((item) => item.key === stage);
    if (match && !match.unlocked) {
      notify(`${match.label} is locked until you complete the prior step.`);
      return;
    }
    setPanel("lesson");
    setBusy(true);
    try {
      setPlayer(await lmsApi.learningPlayerAction({
        pathCode: path.code, moduleCode: module.code, action: "open_stage", stage
      }));
    } catch (error) {
      notify((error as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function startDay() {
    setBusy(true);
    try {
      await lmsApi.openSession({
        pathCode: path.code, moduleCode: module.code,
        deliveryMode: "paced_professor", learnerCondition: "ready"
      });
      const next = await lmsApi.learningPlayer(path.code, module.code);
      setPlayer(next);
      const lesson = next.stages.find((item) => item.key === "learn");
      if (lesson?.unlocked) {
        setPlayer(await lmsApi.learningPlayerAction({
          pathCode: path.code, moduleCode: module.code, action: "open_stage", stage: "learn"
        }));
      }
      notify("Today’s lesson is open");
    } catch (error) {
      notify((error as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function finishActivity() {
    setBusy(true);
    try {
      const next = await lmsApi.learningPlayerAction({
        pathCode: path.code, moduleCode: module.code, action: "complete_phase", phaseIndex
      });
      setPlayer(next);
      notify(next.activeStage === "practice" ? "Lesson complete — practice unlocked" : "Next lesson activity ready");
    } catch (error) {
      notify((error as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function sendProfessor(text: string, mode = "coach") {
    if (!text.trim() || busy) return;
    setChat((current) => [...current, {role: "learner", content: text}]);
    setMessage("");
    setBusy(true);
    try {
      const result = await lmsApi.professor({moduleCode: module.code, message: text, mode});
      setChat((current) => [...current, {role: "professor", content: result.reply}]);
    } catch (error) {
      notify((error as Error).message);
    } finally {
      setBusy(false);
    }
  }

  function submitChat(event: FormEvent) {
    event.preventDefault();
    void sendProfessor(message);
  }

  function workspaceAction(label: string) {
    if (label === "Assignments" || label === "Files & Uploads") void openStage("assignment");
    else if (label === "Quizzes") void openStage("assess");
    else if (label === "Grades") void openStage("complete");
    else if (label === "Calendar") void openStage("today");
    else if (label === "Notes" || label === "Notebook") setPanel("notes");
    else if (label === "Video Controls") setPanel("lesson");
    else document.querySelector(".canvas-professor-panel")?.scrollIntoView({behavior: "smooth", block: "center"});
  }

  return (
    <main className="spec-learning-canvas">
      <section className="canvas-banner">
        <button className="canvas-breadcrumb" onClick={backHome}>‹ Back to dashboard</button>
        <button className="canvas-course-title" onClick={() => setModulesOpen(true)}>
          <span className="canvas-course-icon">♢</span>
          <div><small>{path.title} · Module {moduleIndex + 1} of {path.moduleCount}</small><h1>{module.title}</h1><p>{module.description}</p></div>
          <b>Browse modules ▾</b>
        </button>
        <div className="banner-lesson-progress">
          <small>{stageLabel[activeStage]} · Step {stageIndex + 1} of 6</small>
          <div><span style={{width: `${player.journeyPercent}%`}}/></div>
        </div>
        <div className="banner-timer"><span>◷</span><div><small>TIME REMAINING</small><strong>{Math.max(7, 32 - player.completedPhases.length * 5)}:15</strong></div><b>Ⅱ</b></div>
      </section>

      <nav className="canvas-stage-nav" aria-label="Module journey">
        <button onClick={() => setModulesOpen(true)}><strong>☰ Course content</strong><small>{path.moduleCount} modules</small></button>
        {player.stages.map((stage, index) => (
          <button key={stage.key} className={`${stage.active ? "active" : ""} ${stage.complete ? "done" : ""}`} disabled={!stage.unlocked || busy} onClick={() => void openStage(stage.key)}>
            <span>{stage.complete ? "✓" : index + 1}</span><strong>{stage.label}</strong><small>{stage.active ? "Current" : stage.complete ? "Done" : stage.unlocked ? "Ready" : "Locked"}</small>
          </button>
        ))}
      </nav>

      <div className="canvas-work-area">
        <section className="canvas-primary">
          <div className="canvas-learning-grid">
            <article className="canvas-visual-panel">
              {approvedVideo ? (
                <video controls src={approvedVideo} aria-label={content.video.title}/>
              ) : approvedImage ? (
                <img src={approvedImage} alt={content.imagePlaceholders.find((item) => item.url)?.alt || module.title}/>
              ) : (
                <div className="module-content-visual">
                  <span>{module.track}</span><h2>{module.title}</h2><p>{content.summary}</p>
                  <div>{content.objectives.slice(0, 3).map((objective, index) => <b key={objective}><i>{index + 1}</i>{objective}</b>)}</div>
                </div>
              )}
              <div className="visual-controls"><b>▶</b><span>{approvedVideo ? content.video.title : `${module.code} learning media`}</span><i/><span>🔊 &nbsp; CC &nbsp; ⚙ &nbsp; ⛶</span></div>
            </article>

            <article className="canvas-lesson-panel">
              <nav>
                <button className={panel === "lesson" ? "active" : ""} onClick={() => setPanel("lesson")}>▥ &nbsp; Lesson</button>
                <button className={panel === "notes" ? "active" : ""} onClick={() => setPanel("notes")}>▤ &nbsp; Notes</button>
                <button className={panel === "resources" ? "active" : ""} onClick={() => setPanel("resources")}>▣ &nbsp; Resources</button>
                <button className={panel === "transcript" ? "active" : ""} onClick={() => setPanel("transcript")}>▧ &nbsp; Transcript</button>
              </nav>
              {panel === "notes" ? (
                <CanvasNotes moduleCode={module.code} initialNote={initialNote} notify={notify}/>
              ) : panel === "resources" ? (
                <div className="canvas-resources"><h2>Approved resources</h2>{content.citations.length ? content.citations.map((citation) => <p key={citation.id}><strong>{citation.title}</strong><small>{citation.author} · {citation.locator || "Locator awaiting verification"} · {citation.verificationStatus}</small></p>) : <p>No published source records for this module yet.</p>}</div>
              ) : panel === "transcript" ? (
                <div className="canvas-transcript"><h2>{content.video.title || `${module.title} transcript`}</h2><p>{content.video.transcript || content.phases.map((item) => `${item.title}\n${item.body}`).join("\n\n")}</p></div>
              ) : activeStage === "today" ? (
                <div className="canvas-lesson-copy">
                  <span className="canvas-step-label">TODAY · {content.estimatedMinutes} MINUTES</span>
                  <h2>Welcome, {learnerName.split(" ")[0]}</h2><p>{content.summary}</p><h3>Today’s Outcomes</h3>
                  <ul>{content.objectives.map((objective) => <li key={objective}>✓ <span>{objective}</span></li>)}</ul>
                  <button className="canvas-submit" disabled={busy} onClick={() => void startDay()}>Begin Today’s Lesson</button>
                </div>
              ) : activeStage === "learn" ? (
                <div className="canvas-lesson-copy">
                  <span className="canvas-step-label">ACTIVITY {phaseIndex + 1} OF {content.phases.length} · {phase.minutes} MIN</span>
                  <h2>{phase.title}</h2><p>{phase.body}</p><h3>Learning outcomes</h3>
                  <ul>{content.objectives.slice(0, 4).map((objective) => <li key={objective}>✓ <span>{objective}</span></li>)}</ul>
                  <div className="canvas-quick-check"><span>?</span><div><strong>Ready to continue?</strong><small>Complete this activity to advance through the published lesson.</small></div><button disabled={busy} onClick={() => void finishActivity()}>{phaseIndex + 1 === content.phases.length ? "Finish Lesson" : "Next Activity"}</button></div>
                </div>
              ) : (
                <div className="canvas-stage-embed">
                  {activeStage === "practice" && <LessonExperience moduleCode={module.code} notify={notify} display="practice" onActivity={() => void refresh()}/>}
                  {activeStage === "assess" && <LessonExperience moduleCode={module.code} notify={notify} display="assess" onActivity={() => void refresh()}/>}
                  {activeStage === "assignment" && <LessonExperience moduleCode={module.code} notify={notify} display="assignment" onActivity={() => void refresh()}/>}
                  {activeStage === "complete" && <CompletionGate pathCode={path.code} moduleCode={module.code} isComplete={isComplete} hasNext={hasNext} updateState={updateState} goNext={goNext} notify={notify}/>}
                </div>
              )}
            </article>

            <aside className="canvas-professor-panel">
              <div className="professor-scene"><img src="/mock-assets/professor-luna.webp" alt="Professor Luna"/><div className="professor-bubble"><strong>Professor Luna</strong><p>{chat.at(-1)?.content || `I’m here to teach ${module.title}. Ask for an explanation, hint, or example.`}</p></div></div>
              <div className="professor-online"><i/> <strong>AI Professor</strong><span>· Online</span><b>≋</b></div>
              <div className="professor-actions">
                <button disabled={player.professorLocked} onClick={() => void sendProfessor("Explain this lesson again", "teach")}>◉ &nbsp; Explain Again</button>
                <button disabled={player.professorLocked} onClick={() => void sendProfessor("Give me a hint", "hint")}>💡 &nbsp; Give Hint</button>
                <button disabled={player.professorLocked} onClick={() => void sendProfessor("Show me a concrete example", "coach")}>▧ &nbsp; Example</button>
                <button onClick={() => notify("Read aloud is ready")}>🔊 &nbsp; Read Aloud</button>
              </div>
              <form onSubmit={submitChat} className="professor-input"><input disabled={player.professorLocked} value={message} onChange={(event) => setMessage(event.target.value)} placeholder={player.professorLocked ? "Open today’s lesson to ask…" : "Ask Professor Luna…"}/><button disabled={busy || player.professorLocked}>➤</button></form>
            </aside>
          </div>

          <section className="canvas-summary-cards">
            <MiniSummary icon="▤" title="Your Assignment"><strong>{content.assignment.title}</strong><span className="green-pill">{player.assignment ? player.assignment.ai_review_status.replaceAll("_", " ") : "Not started"}</span><small>{content.assignment.instructions.slice(0, 90)}…</small><button onClick={() => void openStage("assignment")}>Open</button></MiniSummary>
            <MiniSummary icon="★" title="Your Grades"><div className="grade-summary"><b>{player.quiz?.score ?? 0}%</b><span>Quiz <progress max="100" value={player.quiz?.score ?? 0}/><br/>Exam <progress max="100" value={player.exam?.score ?? 0}/><br/>Pathway <progress max="100" value={summary.percent}/></span></div></MiniSummary>
            <MiniSummary icon="▦" title="Course Content"><CompactCanvasItem title={`${content.phases.length} lesson activities`} detail={`${content.estimatedMinutes} instructional minutes`} onClick={() => void openStage("learn")}/><CompactCanvasItem title={`${content.quiz.questions.length} quiz questions`} detail={`${content.quiz.passingScore}% required`} onClick={() => void openStage("assess")}/><CompactCanvasItem title="Applied evidence" detail={content.assignment.title} onClick={() => void openStage("assignment")}/></MiniSummary>
            <MiniSummary icon="◎" title="What’s Next">{player.stages.slice(Math.max(0, stageIndex + 1), stageIndex + 4).map((stage, index) => <button className="next-canvas-item" disabled={!stage.unlocked} onClick={() => void openStage(stage.key)} key={stage.key}><b>{index + 1}</b><span><strong>{stage.label}</strong><small>{stage.unlocked ? "Ready now" : "Complete the prior step"}</small></span></button>)}</MiniSummary>
          </section>
        </section>

        <aside className="canvas-workspace">
          <button className="workspace-course-button" onClick={() => setModulesOpen(true)}><strong>▣ &nbsp; Course & Modules</strong><span>›</span></button>
          {[["▣","Assignments","2"],["▤","Quizzes","1"],["★","Grades",""],["☁","Files & Uploads",""],["▦","Calendar","1"],["Aƒ","Messages","3"],["A²","Notes",""],["▥","Notebook",""],["◖","AI Voices",""],["▶","Video Controls",""]].map(([icon, label, badge]) => <button key={label} onClick={() => workspaceAction(label)}><span>{icon}</span><strong>{label}</strong>{badge && <b>{badge}</b>}<i>›</i></button>)}
          <h3>Learning Tools</h3>
          <button className="workspace-tool" onClick={() => void sendProfessor("Start dictation support", "coach")}><strong>🎙 Dictation</strong><i>›</i></button>
          <button className="workspace-tool" onClick={() => void sendProfessor("I need help", "coach")}><strong>✋ Raise Hand</strong><i>›</i></button>
          <button className="workspace-tool" onClick={() => setPanel("resources")}><strong>↗ Share & Resources</strong><i>›</i></button>
          <button className="workspace-tool" onClick={() => notify("Instructor request recorded")}><strong>⚙ Request Instructor</strong><i>›</i></button>
        </aside>
      </div>

      <section className="canvas-bottom-player">
        <button className="bottom-module-visual" onClick={() => setModulesOpen(true)}>{module.code}</button>
        <div className="bottom-course"><strong>{module.title}</strong><small>{path.title} · {module.code}</small><div><span style={{width: `${lessonPercent}%`}}/></div></div>
        <span>{player.completedPhases.length} / {content.phases.length}</span>
        <div className="transport"><button onClick={goPrevious} disabled={moduleIndex === 0}>Ⅰ◀</button><button className="play" disabled={busy} onClick={() => activeStage === "learn" ? void finishActivity() : void openStage(player.nextAction.toLowerCase())}>▶</button><button onClick={goNext} disabled={!hasNext}>▶Ⅰ</button></div>
        <div className="volume">🔊 &nbsp; ━━━━━ &nbsp; CC &nbsp; ⚙ &nbsp; ⛶</div>
      </section>

      <section className="learning-network">
        <strong>Your Learning Network</strong>
        {["Courses","Assignments","Assessments","Evidence","Sources","Professor","Progress"].map((item, index) => <button key={item} onClick={() => index === 0 ? setModulesOpen(true) : index === 1 || index === 3 ? void openStage("assignment") : index === 2 ? void openStage("assess") : index === 4 ? setPanel("resources") : index === 5 ? void sendProfessor("Help me with this lesson", "coach") : void openStage("complete")}><b>{["▦","▣","✓","☁","▥","PL","★"][index]}</b><small>{item}</small></button>)}
        <div className="network-encouragement"><b>★</b><span><strong>You’re doing great!</strong><small>Complete the work. Prove the skill.</small></span></div>
        <button className="network-next" onClick={hasNext ? goNext : () => void openStage("complete")}><strong>→ &nbsp; Next Up</strong><small>{path.modules[moduleIndex + 1]?.title || "Complete pathway"}</small></button>
      </section>

      {modulesOpen && <ModuleDrawer path={path} module={module} progress={progress} close={() => setModulesOpen(false)} selectModule={(code) => {setModulesOpen(false); selectModule(code);}}/>}
    </main>
  );
}

function ModuleDrawer({path, module, progress, close, selectModule}: {path: Pathway; module: Module; progress: LearnerState["progress"]; close: () => void; selectModule: (code: string) => void}) {
  const currentIndex = path.modules.findIndex((item) => item.code === module.code);
  return <div className="module-drawer-backdrop" onMouseDown={close}><aside className="module-drawer" onMouseDown={(event) => event.stopPropagation()}>
    <header><div><small>{path.credential}</small><h2>{path.title}</h2><p>{path.moduleCount} mapped modules · {path.hours.toLocaleString()} hours</p></div><button onClick={close}>×</button></header>
    <div className="module-drawer-levels">{path.levels.map((level) => <section key={level.name}><h3>{level.name}</h3>{level.modules.map((item) => {
      const index = path.modules.findIndex((candidate) => candidate.code === item.code);
      const done = progress[item.code]?.status === "completed";
      const unlocked = index <= currentIndex || index === 0 || progress[path.modules[index - 1]?.code]?.status === "completed";
      return <button key={item.code} className={`${item.code === module.code ? "active" : ""} ${done ? "done" : ""}`} disabled={!unlocked} onClick={() => selectModule(item.code)}><span>{done ? "✓" : unlocked ? index + 1 : "🔒"}</span><div><strong>{item.code} · {item.title}</strong><small>{item.track} · {item.hours} hours</small></div><b>›</b></button>;
    })}</section>)}</div>
  </aside></div>;
}

function MiniSummary({icon, title, children}: {icon: string; title: string; children: React.ReactNode}) {
  return <article className="canvas-mini-card"><header><span>{icon}</span><strong>{title}</strong></header>{children}</article>;
}
function CompactCanvasItem({title, detail, onClick}: {title: string; detail: string; onClick: () => void}) {
  return <button className="compact-canvas-item" onClick={onClick}><span>▣</span><div><strong>{title}</strong><small>{detail}</small></div><b>›</b></button>;
}
function CanvasNotes({moduleCode, initialNote, notify}: {moduleCode: string; initialNote: string; notify: (message: string) => void}) {
  const [note, setNote] = useState(initialNote);
  return <div className="canvas-notes"><h2>Lesson Notes</h2><textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Capture observations, questions, and reflections…"/><button onClick={async () => {await lmsApi.saveNote({moduleCode, content: note}); notify("Note saved");}}>Save Note</button></div>;
}