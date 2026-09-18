"use client";

import {useEffect, useMemo, useState} from "react";
import {lmsApi} from "@/lib/api";
import type {LessonContent} from "@/lib/types";

export function LessonExperience({moduleCode, notify, display = "all", onActivity}: {moduleCode: string; notify: (message: string) => void; display?: "all" | "practice" | "assess" | "assignment"; onActivity?: () => void}) {
  const [content, setContent] = useState<LessonContent | null>(null);
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizResult, setQuizResult] = useState<{score: number; passed: boolean; humanReviewPending: boolean} | null>(null);
  const [examOpen, setExamOpen] = useState(false);
  const [examAnswers, setExamAnswers] = useState<Record<string, string | number>>({});
  const [examResult, setExamResult] = useState<{score: number; passed: boolean; humanReviewPending: boolean} | null>(null);
  const [interactive, setInteractive] = useState<Record<string, string>>({});
  const [mastery, setMastery] = useState<Record<string, {satisfactory: boolean; attempt: number; stage: string; coaching: string; citations: Array<{id: string; title: string; locator: string}>}>>({});
  const [checking, setChecking] = useState("");
  const [dueAt, setDueAt] = useState("");
  const [remaining, setRemaining] = useState("");
  const [proctorEvents, setProctorEvents] = useState<string[]>([]);

  useEffect(() => {
    setContent(null);
    setAnswers({});
    setQuizResult(null);
    setExamOpen(false);
    setExamAnswers({});
    setExamResult(null);
    setInteractive({});
    setMastery({});
    setDueAt("");
    lmsApi.content(moduleCode).then(setContent).catch((error) => notify(error.message));
  }, [moduleCode, notify]);

  useEffect(() => {
    if (!dueAt) return;
    const update = () => {
      const difference = new Date(dueAt).getTime() - Date.now();
      if (difference <= 0) return setRemaining("Due now");
      const hours = Math.floor(difference / 3_600_000);
      const minutes = Math.floor((difference % 3_600_000) / 60_000);
      const seconds = Math.floor((difference % 60_000) / 1000);
      setRemaining(`${hours}h ${minutes}m ${seconds}s`);
    };
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, [dueAt]);

  useEffect(() => {
    if (!quizOpen && !examOpen) return;
    const visibility = () => {
      if (document.hidden) setProctorEvents((current) => [...current, `Focus left exam at ${new Date().toISOString()}`]);
    };
    document.addEventListener("visibilitychange", visibility);
    return () => document.removeEventListener("visibilitychange", visibility);
  }, [quizOpen, examOpen]);

  const answeredCount = useMemo(() => Object.values(answers).filter((answer) => String(answer).trim()).length, [answers]);

  if (!content) return <section className="lesson-card skeleton-card">Loading authored lesson…</section>;

  return (
    <>
      {display === "all" && <section className="lesson-card content-status">
        <div>
          <span className={`status-dot ${content.status}`}/><strong>{content.status === "published" ? "Published lesson" : "Curriculum draft"}</strong>
          <small>Version {content.version} · ~{content.estimatedMinutes} min · human approval required to publish</small>
        </div>
        <span className="pill">{content.citations.length} SOURCES</span>
      </section>}

      {display === "all" && <section className="lesson-card">
        <h2>Guided lesson</h2>
        <div className="phase-timeline">
          {content.phases.map((phase, index) => (
            <article className="phase-card" key={`${phase.kind}-${index}`}>
              <span>{index + 1}</span>
              <div><small>{phase.minutes} MIN · {phase.kind.toUpperCase()}</small><h3>{phase.title}</h3><p>{phase.body}</p></div>
            </article>
          ))}
        </div>
      </section>}

      {display === "all" && <section className="lesson-card media-grid">
        <article className="video-placeholder">
          {content.video.url ? <video className="lesson-video" controls preload="metadata" src={content.video.url}/> : <div className="play-button">▶</div>}
          <span className="media-label">{content.video.status === "placeholder" ? "VIDEO PLACEHOLDER" : "LESSON VIDEO"}</span>
          <h3>{content.video.title}</h3>
          <p>{content.video.description}</p>
          <small>{content.video.captionsRequired ? "Captions and transcript required" : "Transcript optional"}</small>
        </article>
        {content.imagePlaceholders.map((image) => (
          <article className="image-placeholder" key={image.id}>
            {image.url ? <img className="lesson-image" src={image.url} alt={image.alt}/> : <div className="image-icon">▧</div>}
            <span className="media-label">{image.url ? "LESSON IMAGE" : "IMAGE BRIEF"}</span>
            <h3>{image.alt}</h3>
            <p>{image.description}</p>
          </article>
        ))}
      </section>}

      {display === "all" && <section className="lesson-card">
        <h2>Book and manual citations</h2>
        <p className="muted">Mapped to the approved catalog. Exact page/chapter locators must be verified by a curriculum author before publication.</p>
        <div className="citation-list">
          {content.citations.map((citation) => (
            <article className="citation" key={citation.id}>
              <span className="source-id">{citation.id}</span>
              <div><strong>{citation.title}</strong><small>{citation.author} · {citation.type}</small><em>{citation.locator}</em></div>
            </article>
          ))}
        </div>
      </section>}

      {(display === "all" || display === "practice") && <section className="lesson-card">
        <h2>Interactive understanding checks</h2>
        <div className="interactive-list">
          {content.interactiveQuestions.map((question, index) => (
            <article className="interactive-question" key={question.id}>
              <span className="question-type">{question.type}</span>
              <h3>{index + 1}. {question.prompt}</h3>
              <textarea value={interactive[question.id] || ""} onChange={(event) => setInteractive({...interactive, [question.id]: event.target.value})} placeholder="Reason through your answer…"/>
              <button className="btn secondary" disabled={checking === question.id || !interactive[question.id]?.trim()} onClick={async () => {
                setChecking(question.id);
                try {
                  const runtime = await lmsApi.currentSession(moduleCode);
                  if (!runtime.session) throw new Error("Open today’s learning day before submitting an understanding check.");
                  const result = await lmsApi.masteryAttempt({
                    moduleCode,
                    questionId: question.id,
                    answer: interactive[question.id],
                    sessionId: runtime.session.id
                  });
                  setMastery({...mastery, [question.id]: result});
                  notify(result.satisfactory ? "Mastery demonstrated — continue" : `${result.stage} · attempt ${result.attempt}`); onActivity?.();
                } catch (error) {
                  notify((error as Error).message);
                } finally {
                  setChecking("");
                }
              }}>{checking === question.id ? "Professor is reviewing…" : "Submit reasoning to Professor Luna"}</button>
              {mastery[question.id] && (
                <div className={`mastery-feedback ${mastery[question.id].satisfactory ? "satisfactory" : "continue"}`}>
                  <strong>{mastery[question.id].satisfactory ? "Satisfactory" : `${mastery[question.id].stage} · attempt ${mastery[question.id].attempt}`}</strong>
                  <p>{mastery[question.id].coaching}</p>
                  {!mastery[question.id].satisfactory && mastery[question.id].citations.map((citation) => (
                    <small key={citation.id}>{citation.id} · {citation.title} · {citation.locator}</small>
                  ))}
                  <em>The answer is never revealed. Revise in your own words.</em>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>}

      {(display === "all" || display === "assess") && <section className="lesson-card assessment-grid">
        <article>
          <span className="eyebrow green">Timed quiz</span>
          <h2>{content.quiz.title}</h2>
          <p>{content.quiz.questions.length} items · {content.quiz.timeLimitMinutes} minutes · {content.quiz.passingScore}% passing · {content.quiz.attemptLimit} attempts</p>
          <button className="btn primary" onClick={() => { setQuizOpen(true); setProctorEvents([`Exam agreement accepted at ${new Date().toISOString()}`]); }}>Start quiz</button>
        </article>
        <article>
          <span className="eyebrow orange">Module exam</span>
          <h2>{content.exam.title}</h2>
          <p>{content.exam.questionCount} questions · {content.exam.timeLimitMinutes} minutes · {content.exam.proctored ? "proctored" : "standard integrity checks"}</p>
          <div className="card-actions">
            <span className="pill">{content.exam.status.replaceAll("-", " ").toUpperCase()}</span>
            <button className="btn secondary" onClick={() => {
              setExamOpen(true);
              setProctorEvents([`Exam agreement accepted at ${new Date().toISOString()}`]);
            }}>Start module exam</button>
          </div>
        </article>
      </section>}

      {(display === "all" || display === "assignment") && <section className="lesson-card assignment-panel">
        <div>
          <span className="eyebrow green">Assignment · overnight work</span>
          <h2>{content.assignment.title}</h2>
          <p>{content.assignment.instructions}</p>
          <div className="rubric-row">{content.assignment.rubric.map((item) => <span key={item.criterion}>{item.criterion} <strong>{item.weight}%</strong></span>)}</div>
        </div>
        <aside className="timer-card">
          <small>COURSE TIMER</small>
          <strong>{remaining || `${content.assignment.dueOffsetHours}:00:00`}</strong>
          <span>{dueAt ? `Due ${new Date(dueAt).toLocaleString()}` : "Starts when learner begins assignment"}</span>
          <button className="btn secondary" disabled={Boolean(dueAt)} onClick={async () => {
            const timer = await lmsApi.startTimer(moduleCode);
            setDueAt(timer.dueAt);
            notify(`${timer.durationHours}-hour assignment timer started`);
          }}>{dueAt ? "Timer running" : "Begin assignment"}</button>
        </aside>
      </section>}

      {(display === "all" || display === "assess") && <section className="lesson-card proctor-card">
        <div><span className="shield">✓</span><div><h2>Assessment integrity</h2><p>{content.proctoring.privacyNotice}</p></div></div>
        <ul>{content.proctoring.checks.map((check) => <li key={check}>{check}</li>)}</ul>
      </section>}

      {examOpen && (
        <AssessmentModal
          title={content.exam.title}
          label={content.exam.proctored ? "Proctored module exam" : "Module exam"}
          questions={content.exam.questions}
          answers={examAnswers}
          setAnswers={setExamAnswers}
          result={examResult}
          close={() => setExamOpen(false)}
          submit={async () => {
            const result = await lmsApi.submitQuiz({moduleCode, assessmentType: "exam", answers: examAnswers, proctorEvents});
            setExamResult(result);
            notify(result.passed ? "Exam objective section passed; human review pending" : "Exam submitted — review and retry"); onActivity?.();
          }}
        />
      )}

      {quizOpen && (
        <div className="modal-backdrop">
          <section className="modal quiz-modal">
            <div className="modal-head">
              <div><span className="eyebrow green">Assessment in progress</span><h2>{content.quiz.title}</h2><small>{answeredCount}/{content.quiz.questions.length} answered · integrity event logging active</small></div>
              <button className="close" onClick={() => setQuizOpen(false)}>×</button>
            </div>
            <div className="modal-body quiz-body">
              {content.quiz.questions.map((question, index) => (
                <article className="quiz-question" key={question.id}>
                  <h3>{index + 1}. {question.prompt}</h3>
                  {question.type === "multiple_choice" ? question.options?.map((option, optionIndex) => (
                    <label key={option}><input type="radio" name={question.id} checked={answers[question.id] === optionIndex} onChange={() => setAnswers({...answers, [question.id]: optionIndex})}/><span>{option}</span></label>
                  )) : (
                    <textarea value={String(answers[question.id] || "")} onChange={(event) => setAnswers({...answers, [question.id]: event.target.value})} placeholder="Type your response…"/>
                  )}
                </article>
              ))}
              {quizResult && <div className={`quiz-result ${quizResult.passed ? "passed" : "retry"}`}><strong>{quizResult.score}% · {quizResult.passed ? "Passed" : "Review and retry"}</strong>{quizResult.humanReviewPending && <span>Short answer queued for human verification.</span>}</div>}
            </div>
            <div className="modal-foot">
              <button className="btn ghost" onClick={() => setQuizOpen(false)}>Exit</button>
              <button className="btn primary" onClick={async () => {
                const result = await lmsApi.submitQuiz({moduleCode, answers, proctorEvents});
                setQuizResult(result);
                notify(result.passed ? "Quiz passed" : "Quiz submitted — review required"); onActivity?.();
              }}>Submit quiz</button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

function AssessmentModal({
  title, label, questions, answers, setAnswers, result, close, submit
}: {
  title: string;
  label: string;
  questions: LessonContent["exam"]["questions"];
  answers: Record<string, string | number>;
  setAnswers: (answers: Record<string, string | number>) => void;
  result: {score: number; passed: boolean; humanReviewPending: boolean} | null;
  close: () => void;
  submit: () => Promise<void>;
}) {
  const answered = Object.values(answers).filter((answer) => String(answer).trim()).length;
  return (
    <div className="modal-backdrop">
      <section className="modal quiz-modal">
        <div className="modal-head">
          <div><span className="eyebrow orange">{label}</span><h2>{title}</h2><small>{answered}/{questions.length} answered · timer and focus-change logging active</small></div>
          <button className="close" onClick={close}>×</button>
        </div>
        <div className="exam-integrity">Identity confirmed · exam agreement accepted · human verification required for written responses</div>
        <div className="modal-body quiz-body">
          {questions.map((question, index) => (
            <article className="quiz-question" key={question.id}>
              <h3>{index + 1}. {question.prompt}</h3>
              {question.type === "multiple_choice" ? question.options?.map((option, optionIndex) => (
                <label key={option}><input type="radio" name={question.id} checked={answers[question.id] === optionIndex} onChange={() => setAnswers({...answers, [question.id]: optionIndex})}/><span>{option}</span></label>
              )) : (
                <textarea value={String(answers[question.id] || "")} onChange={(event) => setAnswers({...answers, [question.id]: event.target.value})} placeholder="Write a source-aware, evidence-led response…"/>
              )}
            </article>
          ))}
          {result && <div className={`quiz-result ${result.passed ? "passed" : "retry"}`}><strong>{result.score}% objective score · {result.passed ? "Passed" : "Review and retry"}</strong>{result.humanReviewPending && <span>Written responses queued for human verification.</span>}</div>}
        </div>
        <div className="modal-foot"><button className="btn ghost" onClick={close}>Exit exam</button><button className="btn primary" onClick={() => void submit()}>Submit exam</button></div>
      </section>
    </div>
  );
}