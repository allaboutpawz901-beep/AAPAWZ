"use client";

import {useState} from "react";
import type {Bootstrap, Pathway} from "@/lib/types";

type Props = {
  data: Bootstrap;
  enrolled: string[];
  openPath: (code: string) => void;
  continuePath: (code: string) => void;
  navigate: (route: "catalog" | "progress" | "classroom") => void;
  openEnrollment: () => void;
};

const quickActions = [
  ["▣", "My Assignments", "violet", "assignment"],
  ["✓", "Take a Quiz", "green", "assess"],
  ["▰", "Join Meeting", "blue", "professor"],
  ["✋", "Raise Hand", "orange", "professor"],
  ["✉", "Send Message", "pink", "professor"],
  ["↗", "Share Link", "teal", "courses"]
] as const;

const learningTools = [
  ["▣", "Assignments", "View & submit", "assignment"],
  ["A+", "Grades", "Check your scores", "progress"],
  ["▤", "Notes", "View & add notes", "notes"],
  ["☁", "Uploads", "Files & documents", "assignment"],
  ["◆", "Modules", "Your course content", "courses"],
  ["▧", "Transcripts", "View lesson records", "transcript"],
  ["▥", "Books / Reads", "Library & resources", "resources"],
  ["●", "Professor Luna", "Messages & coaching", "professor"]
] as const;

export function MockedDashboard({data, enrolled, openPath, continuePath, navigate, openEnrollment}: Props) {
  const [coursesOpen, setCoursesOpen] = useState(false);
  const activeCode = enrolled[0];
  const path = data.curriculum.paths.find((item) => item.code === activeCode) || data.curriculum.paths[0];
  const summary = data.state.summaries[path.code] || {completed: 0, total: path.moduleCount, percent: 0, currentModule: path.modules[0].code};
  const current = path.modules.find((item) => item.code === summary.currentModule) || path.modules[0];
  const currentIndex = path.modules.findIndex((item) => item.code === current.code);
  const firstName = data.learner.name.split(" ")[0];

  function openLearning(target = "lesson") {
    if (!activeCode) {
      openEnrollment();
      return;
    }
    window.sessionStorage.setItem("leashed:canvas-target", target);
    continuePath(path.code);
  }

  function handleAction(target: string) {
    if (target === "progress") navigate("progress");
    else if (target === "courses") setCoursesOpen(true);
    else openLearning(target);
  }

  return (
    <main className="spec-dashboard">
      <section className="dashboard-welcome">
        <div className="welcome-copy"><span>★</span><div><h1>Good Morning, {firstName}!</h1><p>Keep going — you’re doing great!</p></div></div>
        <div className="welcome-art" aria-hidden="true"><i/><i/><i/><b>🐕</b></div>
      </section>

      <section className="dashboard-actions">
        {quickActions.map(([icon, label, color, target]) => (
          <button className={`dash-action ${color}`} key={label} onClick={() => handleAction(target)}><span>{icon}</span><strong>{label}</strong></button>
        ))}
      </section>

      <div className="dashboard-columns">
        <aside className="dashboard-left">
          <DashboardCard title="Today’s Plan" icon="▦" action="View Calendar" onAction={() => openLearning("today")}>
            <ScheduleRow time="9:00 AM" icon="▥" title={current.title} detail={`${current.code} · ${current.hours} hr module`} onClick={() => openLearning("lesson")}/>
            <ScheduleRow time="10:30 AM" icon="✓" title="Knowledge Check" detail="Quiz · 20 min" onClick={() => openLearning("assess")}/>
            <ScheduleRow time="12:00 PM" icon="☕" title="Lunch Break" detail="Take a break!" onClick={() => openLearning("today")}/>
            <ScheduleRow time="1:00 PM" icon="▣" title="Applied Practice" detail="Assignment · 30 min" onClick={() => openLearning("assignment")}/>
            <ScheduleRow time="2:30 PM" icon="▰" title="Professor Session" detail="AI guided · 60 min" onClick={() => openLearning("professor")}/>
          </DashboardCard>
          <DashboardCard title="What’s Next" icon="★" action="View Timeline" onAction={() => navigate("progress")}>
            <div className="timeline-list">
              <TimelineItem color="green" title={`Finish ${current.code}`} detail="Due today · 9:00 AM"/>
              <TimelineItem color="teal" title="Complete knowledge check" detail="Due today · 10:30 AM"/>
              <TimelineItem color="blue" title="Submit applied evidence" detail="Due today · 1:00 PM"/>
              <TimelineItem color="purple" title="Prepare next module" detail={path.modules[currentIndex + 1]?.title || "Capstone review"}/>
              <TimelineItem color="blue" title="Progress review" detail="Friday · 3:00 PM"/>
            </div>
          </DashboardCard>
        </aside>

        <section className="dashboard-center">
          <article className="active-course-card">
            <div className="active-course-copy">
              <span className="course-mark">♢</span>
              <div><h2>{current.code}</h2><p>{current.title}</p></div>
              <small>Module {currentIndex + 1} of {path.moduleCount}</small>
              <div className="hero-progress"><span style={{width: `${Math.max(8, summary.percent)}%`}}/></div>
              <b>{summary.percent}%</b>
              <button onClick={() => openLearning("lesson")}>▶ &nbsp; Continue</button>
            </div>
            <button className="active-course-video" onClick={() => openLearning("lesson")} aria-label="Open current lesson">
              <div className="video-board"><span>{current.code}</span><b>▶</b></div>
              <div className="video-controls">◐ ━━━━━━━ 🔊 ⚙ ⛶</div>
            </button>
          </article>

          <div className="learning-tool-grid">
            {learningTools.map(([icon, title, detail, target], index) => (
              <button key={title} onClick={() => handleAction(target)}>
                <span className={`tool-icon c${index}`}>{icon}</span><div><strong>{title}</strong><small>{detail}</small></div>
              </button>
            ))}
          </div>

          <div className="dashboard-center-row">
            <DashboardCard title="Performance & Achievements" icon="🏆" action="View Details" onAction={() => navigate("progress")}>
              <div className="performance">
                <div className="progress-ring" style={{"--progress": `${Math.max(5, summary.percent) * 3.6}deg`} as React.CSSProperties}><strong>{summary.percent}%</strong><small>Overall Progress</small></div>
                <div className="badges"><b>Badges</b><div><span>★</span><span>🏆</span><span>◆</span><span>◉</span></div></div>
              </div>
              <div className="metric-row"><span>Assignments<b>{summary.completed}/10</b></span><span>Quizzes<b>0/5</b></span><span>Time Spent<b>{current.hours}h</b></span><span>Streak<b>1 day</b></span></div>
            </DashboardCard>
            <DashboardCard title="Quick Tools" icon="◉">
              <div className="mini-tool-grid">
                <button onClick={() => openLearning("professor")}>🎙 Dictation</button><button onClick={() => openLearning("professor")}>◫ AI Voices</button>
                <button onClick={() => openLearning("assignment")}>▰ Video Uploads</button><button onClick={() => openLearning("professor")}>✋ Raise Hand</button>
                <button onClick={() => openLearning("assignment")}>⌂ Homework</button><button onClick={() => openLearning("today")}>▦ Calendar</button>
                <button onClick={() => openLearning("today")}>☑ To Do</button><button onClick={() => navigate("progress")}>☀ Progress</button>
              </div>
            </DashboardCard>
          </div>

          <div className="integration-row">
            <DashboardCard title="Course Tools & Integrations" icon="↗">
              <div className="integration-icons">{["Canvas","Classroom","PSI","Parchment","PowerSchool","More"].map((item, index) => <button key={item} onClick={() => openLearning("resources")}><b>{["◎","▣","PSI","▦","P","•••"][index]}</b><small>{item}</small></button>)}</div>
            </DashboardCard>
            <DashboardCard title="Video & Media" icon="▶">
              <button className="mini-video" onClick={() => openLearning("lesson")}><img src="/mock-assets/lesson-thumbnail.webp" alt="Lesson preview"/><b>▶</b></button>
            </DashboardCard>
            <DashboardCard title="Learning Tools" icon="◆">
              <div className="plain-list"><button onClick={() => openLearning("professor")}>▰ Start Video Meeting</button><button onClick={() => openLearning("professor")}>◉ Request Instructor</button><button onClick={() => openLearning("complete")}>✓ Completion Gates</button><button onClick={() => setCoursesOpen(true)}>↗ Courses & Modules</button></div>
            </DashboardCard>
          </div>
        </section>

        <aside className="dashboard-right">
          <DashboardCard title="Current Course" icon="▥" action="All Courses" onAction={() => setCoursesOpen(true)}>
            <button className="current-course" onClick={() => setCoursesOpen(true)}><strong>{path.title}</strong><span>{current.code}: {current.title}</span><b>{summary.percent}%</b><progress max="100" value={summary.percent}/></button>
          </DashboardCard>
          <DashboardCard title="Upcoming" icon="▦" action="View All" onAction={() => openLearning("today")}>
            <CompactRow icon="✓" title="Knowledge Check" detail="Today · 10:30 AM" onClick={() => openLearning("assess")}/>
            <CompactRow icon="▣" title="Applied Assignment" detail="Today · 1:00 PM" onClick={() => openLearning("assignment")}/>
            <CompactRow icon="▥" title={path.modules[currentIndex + 1]?.title || "Capstone"} detail="Tomorrow · 9:00 AM" onClick={() => setCoursesOpen(true)}/>
            <CompactRow icon="▥" title="Progress Meeting" detail="Tomorrow · 11:00 AM" onClick={() => navigate("progress")}/>
          </DashboardCard>
          <DashboardCard title="Recent Activity" icon="◷" action="View All" onAction={() => navigate("progress")}>
            <CompactRow icon="▧" title="You opened today’s lesson" detail="Today" onClick={() => openLearning("lesson")}/>
            <CompactRow icon="A+" title={`Progress updated: ${summary.percent}%`} detail="Today" onClick={() => navigate("progress")}/>
            <CompactRow icon="●" title="Professor Luna is ready" detail="Today" onClick={() => openLearning("professor")}/>
            <CompactRow icon="☁" title="Evidence workspace available" detail="Today" onClick={() => openLearning("assignment")}/>
          </DashboardCard>
          <DashboardCard title="Stay on Track" icon="◎">
            <div className="stay-track"><p>You’re {Math.max(1, summary.total - summary.completed)} steps away from this pathway’s goal!</p><progress max={summary.total} value={summary.completed}/><button onClick={() => navigate("progress")}>View My Goals</button></div>
          </DashboardCard>
        </aside>
      </div>

      <footer className="dashboard-footer">
        <strong><span className="mini-brand">●●●</span> Leashed</strong>
        <nav><button onClick={() => setCoursesOpen(true)}>Courses</button><button onClick={() => openLearning("resources")}>Resources</button><button onClick={() => navigate("progress")}>Progress</button><button onClick={() => openLearning("professor")}>Help</button></nav>
        <span>★ &nbsp; Small steps. Big progress. &nbsp; ↗</span>
      </footer>

      {coursesOpen && <CourseLibrary data={data} enrolled={enrolled} close={() => setCoursesOpen(false)} openPath={openPath} continuePath={continuePath} openEnrollment={openEnrollment}/>}
    </main>
  );
}

function CourseLibrary({data, enrolled, close, openPath, continuePath, openEnrollment}: {data: Bootstrap; enrolled: string[]; close: () => void; openPath: (code: string) => void; continuePath: (code: string) => void; openEnrollment: () => void}) {
  return <div className="course-library-backdrop" onMouseDown={close}><section className="course-library" onMouseDown={(event) => event.stopPropagation()}>
    <header><div><small>LEASHED CURRICULUM</small><h2>Courses & complete content</h2><p>All six vocational pathways and every mapped module remain available.</p></div><button onClick={close}>×</button></header>
    <div className="course-library-list">{data.curriculum.paths.map((path) => {
      const enrolledPath = enrolled.includes(path.code);
      const summary = data.state.summaries[path.code];
      return <article key={path.code}>
        <div className="course-library-title"><span style={{background: path.accent}}>{path.code}</span><div><h3>{path.title}</h3><p>{path.credential} · {path.moduleCount} modules · {path.hours.toLocaleString()} hours</p></div></div>
        <div className="course-library-progress"><i><b style={{width: `${summary?.percent || 0}%`}}/></i><small>{summary?.percent || 0}% complete</small></div>
        <div className="course-library-actions"><button onClick={() => {close(); openPath(path.code);}}>View curriculum</button>{enrolledPath ? <button className="primary" onClick={() => {close(); window.sessionStorage.setItem("leashed:canvas-target", "courses"); continuePath(path.code);}}>Open course</button> : <button className="primary" onClick={() => {close(); openEnrollment();}}>Enroll</button>}</div>
      </article>;
    })}</div>
  </section></div>;
}

function DashboardCard({title, icon, action, onAction, children}: {title: string; icon: string; action?: string; onAction?: () => void; children: React.ReactNode}) {
  return <section className="dash-card"><header><h3><span>{icon}</span>{title}</h3>{action && <button onClick={onAction}>{action}</button>}</header>{children}</section>;
}
function ScheduleRow({time, icon, title, detail, onClick}: {time: string; icon: string; title: string; detail: string; onClick: () => void}) {
  return <button className="schedule-row" onClick={onClick}><time>{time}</time><span>{icon}</span><div><strong>{title}</strong><small>{detail}</small></div><b>›</b></button>;
}
function TimelineItem({color, title, detail}: {color: string; title: string; detail: string}) {
  return <div className={`timeline-item ${color}`}><i/><div><strong>{title}</strong><small>{detail}</small></div></div>;
}
function CompactRow({icon, title, detail, onClick}: {icon: string; title: string; detail: string; onClick: () => void}) {
  return <button className="compact-row" onClick={onClick}><span>{icon}</span><div><strong>{title}</strong><small>{detail}</small></div><b>›</b></button>;
}