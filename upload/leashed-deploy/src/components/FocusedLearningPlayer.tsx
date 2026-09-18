"use client";

import {useCallback, useEffect, useMemo, useState} from "react";
import {CompletionGate} from "@/components/CompletionGate";
import {DailyLearningRuntime} from "@/components/DailyLearningRuntime";
import {LessonExperience} from "@/components/LessonExperience";
import {lmsApi} from "@/lib/api";
import type {LearnerState, LearningPlayerState, LessonContent, Module, Pathway} from "@/lib/types";

type Props = {
  path: Pathway;
  module: Module;
  learnerName: string;
  isComplete: boolean;
  hasNext: boolean;
  updateState: (state: LearnerState) => void;
  goNext: () => void;
  notify: (message: string) => void;
  setProfessorLocked: (locked: boolean) => void;
};

const stageHelp: Record<string, string> = {
  today: "Open the day, set your pace, and understand today’s goal.",
  learn: "Work through the lesson in order—one teaching activity at a time.",
  practice: "Explain your decisions and receive source-grounded coaching.",
  assess: "Demonstrate knowledge through the quiz and module exam.",
  assignment: "Apply the skill and submit observable evidence.",
  complete: "Review every requirement and unlock the next module."
};

export function FocusedLearningPlayer({
  path, module, learnerName, isComplete, hasNext, updateState, goNext, notify, setProfessorLocked
}: Props) {
  const [player, setPlayer] = useState<LearningPlayerState | null>(null);
  const [content, setContent] = useState<LessonContent | null>(null);
  const [busy, setBusy] = useState(false);
  const [evidenceUploading, setEvidenceUploading] = useState(false);

  const refresh = useCallback(async () => {
    const [nextPlayer, nextContent] = await Promise.all([
      lmsApi.learningPlayer(path.code, module.code),
      lmsApi.content(module.code)
    ]);
    setPlayer(nextPlayer);
    setContent(nextContent);
    setProfessorLocked(nextPlayer.professorLocked);
  }, [path.code, module.code]);

  useEffect(() => {
    setPlayer(null);
    setContent(null);
    void refresh().catch((error) => notify(error.message));
  }, [refresh, notify]);

  const currentPhase = useMemo(() => {
    if (!player || !content) return 0;
    const index = content.phases.findIndex((_, phaseIndex) => !player.completedPhases.includes(`phase-${phaseIndex}`));
    return index < 0 ? Math.max(0, content.phases.length - 1) : index;
  }, [content, player]);

  async function openStage(stage: string) {
    if (!player) return;
    setBusy(true);
    try {
      const next = await lmsApi.learningPlayerAction({
        pathCode: path.code,
        moduleCode: module.code,
        action: "open_stage",
        stage
      });
      setPlayer(next);
      window.scrollTo({top: 0, behavior: "smooth"});
    } catch (error) {
      notify((error as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function completePhase(phaseIndex: number) {
    setBusy(true);
    try {
      const next = await lmsApi.learningPlayerAction({
        pathCode: path.code,
        moduleCode: module.code,
        action: "complete_phase",
        phaseIndex
      });
      setPlayer(next);
      notify(next.activeStage === "practice" ? "Lesson complete — practice unlocked" : "Activity complete — next lesson step ready");
    } catch (error) {
      notify((error as Error).message);
    } finally {
      setBusy(false);
    }
  }

  if (!player || !content) {
    return <section className="learning-player loading-panel">Preparing your lesson and place in the course…</section>;
  }

  const active = player.activeStage;
  const phase = content.phases[currentPhase];

  return (
    <div className="learning-player">
      <section className="learner-orientation">
        <div>
          <span className="eyebrow green">Your course position</span>
          <h2>Module {player.moduleNumber} of {player.moduleTotal} · {module.title}</h2>
          <p><strong>Next:</strong> {player.nextAction}. {stageHelp[active]}</p>
        </div>
        <div className="journey-meter">
          <strong>{player.journeyPercent}%</strong>
          <span>of this module journey</span>
          <progress max="100" value={player.journeyPercent}/>
        </div>
      </section>

      <nav className="learning-steps" aria-label="Module learning journey">
        {player.stages.map((stage, index) => (
          <button
            key={stage.key}
            className={`${stage.active ? "active" : ""} ${stage.complete ? "complete" : ""}`}
            disabled={!stage.unlocked || busy}
            onClick={() => void openStage(stage.key)}
            aria-current={stage.active ? "step" : undefined}
          >
            <span>{stage.complete ? "✓" : index + 1}</span>
            <div><strong>{stage.label}</strong><small>{stage.complete ? "Done" : stage.unlocked ? "Ready" : "Locked"}</small></div>
          </button>
        ))}
      </nav>

      <section className="active-learning-stage">
        <header className="stage-heading">
          <div>
            <span className="eyebrow green">Step {player.stages.findIndex((item) => item.key === active) + 1} of 6</span>
            <h2>{player.stages.find((item) => item.key === active)?.label}</h2>
            <p>{stageHelp[active]}</p>
          </div>
          <span className="stage-status">{player.stages.find((item) => item.key === active)?.complete ? "Complete" : "In progress"}</span>
        </header>

        {active === "today" && (
          <div className="stage-body">
            <div className="today-brief">
              <span className="eyebrow green">Today’s mission</span>
              <h3>{content.title}</h3>
              <p>{content.summary}</p>
              <div className="mission-facts">
                <span><strong>{content.estimatedMinutes}</strong> planned minutes</span>
                <span><strong>{content.objectives.length}</strong> learning outcomes</span>
                <span><strong>{content.citations.length}</strong> approved sources</span>
              </div>
              <h4>By the end of this module, you will be able to:</h4>
              <ol>{content.objectives.map((objective) => <li key={objective}>{objective}</li>)}</ol>
            </div>
            <DailyLearningRuntime
              pathCode={path.code}
              moduleCode={module.code}
              learnerName={learnerName}
              notify={notify}
              onGateChange={setProfessorLocked}
              onRuntimeChange={() => void refresh()}
            />
          </div>
        )}

        {active === "learn" && phase && (
          <div className="stage-body lesson-focus">
            <div className="lesson-progress-line">
              <span>Lesson activity {currentPhase + 1} of {content.phases.length}</span>
              <progress max={content.phases.length} value={player.completedPhases.length}/>
              <strong>{Math.round(player.completedPhases.length / Math.max(1, content.phases.length) * 100)}%</strong>
            </div>
            <article className="focused-lesson-card">
              <div className="activity-number">{currentPhase + 1}</div>
              <div>
                <span className="eyebrow green">{phase.minutes} minutes · {phase.kind}</span>
                <h3>{phase.title}</h3>
                <p>{phase.body}</p>
              </div>
            </article>
            {(phase.kind === "show" || phase.kind === "teach") && (
              <div className="focused-media">
                {content.video.url ? <video controls preload="metadata" src={content.video.url}/> : (
                  <div className="media-empty"><span>▶</span><strong>{content.video.title}</strong><small>{content.video.description}</small></div>
                )}
                {content.imagePlaceholders[0] && (
                  content.imagePlaceholders[0].url
                    ? <img src={content.imagePlaceholders[0].url} alt={content.imagePlaceholders[0].alt}/>
                    : <div className="media-empty"><span>▧</span><strong>Instructional visual</strong><small>{content.imagePlaceholders[0].description}</small></div>
                )}
              </div>
            )}
            <details className="lesson-sources">
              <summary>Sources for this activity · {content.citations.length}</summary>
              {content.citations.map((citation) => (
                <p key={citation.id}><strong>{citation.id} · {citation.title}</strong><br/><small>{citation.author} · {citation.locator}</small></p>
              ))}
            </details>
            <div className="stage-actions">
              <button className="btn secondary" onClick={() => setProfessorLocked(false)}>Ask Professor Luna</button>
              <button className="btn primary" disabled={busy} onClick={() => void completePhase(currentPhase)}>
                {currentPhase + 1 === content.phases.length ? "Finish lesson & begin practice →" : "I completed this activity →"}
              </button>
            </div>
          </div>
        )}

        {active === "practice" && (
          <div className="stage-body">
            <div className="stage-callout">
              <strong>{player.masteredCount} of {player.practiceRequired} checks mastered</strong>
              <p>Professor Luna will reframe, nudge, and reteach without revealing the answer.</p>
            </div>
            <LessonExperience moduleCode={module.code} notify={notify} display="practice" onActivity={() => void refresh()}/>
          </div>
        )}

        {active === "assess" && (
          <div className="stage-body">
            <div className="stage-callout">
              <strong>Show what you know</strong>
              <p>Pass the quiz, then complete the module exam. Written reasoning may require verification.</p>
            </div>
            <LessonExperience moduleCode={module.code} notify={notify} display="assess" onActivity={() => void refresh()}/>
          </div>
        )}

        {active === "assignment" && (
          <div className="stage-body">
            <div className="stage-callout">
              <strong>Apply the skill in a real or realistic setting</strong>
              <p>Your submitted evidence—not a button click—proves that you can perform the work.</p>
            </div>
            <LessonExperience moduleCode={module.code} notify={notify} display="assignment" onActivity={() => void refresh()}/>
            <section className="evidence-upload-card">
              <div>
                <span className="eyebrow green">Required evidence</span>
                <h3>{module.evidence}</h3>
                <p>Upload your work when it is ready. Leashed records the submission, checks it, and routes only required judgment to a reviewer.</p>
                {player.assignment && (
                  <div className="submission-receipt">
                    <strong>{player.assignment.original_name}</strong>
                    <span>{player.assignment.ai_review_status.replaceAll("_", " ")}</span>
                  </div>
                )}
              </div>
              <label className={`evidence-upload-button ${evidenceUploading ? "disabled" : ""}`}>
                {evidenceUploading ? "Uploading evidence…" : player.assignment ? "Replace evidence" : "Upload evidence"}
                <input
                  type="file"
                  disabled={evidenceUploading || !player.sessionId}
                  onChange={async (event) => {
                    const file = event.target.files?.[0];
                    if (!file || !player.sessionId) {
                      if (!player.sessionId) notify("Open today’s learning day before submitting evidence.");
                      return;
                    }
                    setEvidenceUploading(true);
                    try {
                      await lmsApi.uploadAssignment(module.code, player.sessionId, file);
                      notify("Evidence submitted and added to the verification queue");
                      await refresh();
                    } catch (error) {
                      notify((error as Error).message);
                    } finally {
                      setEvidenceUploading(false);
                    }
                  }}
                />
              </label>
            </section>
          </div>
        )}

        {active === "complete" && (
          <div className="stage-body">
            <CompletionGate
              pathCode={path.code}
              moduleCode={module.code}
              isComplete={isComplete}
              hasNext={hasNext}
              updateState={updateState}
              goNext={goNext}
              notify={notify}
            />
          </div>
        )}
      </section>
    </div>
  );
}