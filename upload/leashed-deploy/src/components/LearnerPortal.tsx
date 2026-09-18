"use client";

import Link from "next/link";
import {BrandLogo} from "@/components/BrandLogo";
import {useEffect, useMemo, useState} from "react";
import {lmsApi} from "@/lib/api";
import type {Bootstrap, Pathway} from "@/lib/types";

const nav = [
  ["⌂","Home",""],
  ["▤","Lessons","lessons"],
  ["▣","Assignments","assignments"],
  ["A+","Grades","grades"],
  ["▥","Notes","notes"],
  ["▧","Books / Reads","books"],
  ["▦","Calendar","calendar"],
  ["✉","Messages","messages"],
  ["☁","Files / Uploads","files"],
  ["▤","Notebook","notebook"],
  ["▶","Media","media"],
  ["▰","Meet","meet"],
  ["↗","Share","share"],
  ["•••","More","more"],
] as const;

const sampleItems = [
  {title:"Safety & Handling Evidence",detail:"Submit handling checklist and reflection",status:"In Progress",tone:"orange"},
  {title:"Module Knowledge Check",detail:"20 questions · 30 minutes",status:"Not Started",tone:"blue"},
  {title:"Applied Practice Record",detail:"Document supervised practical work",status:"Submitted",tone:"green"},
  {title:"Professional Reflection",detail:"Connect this module to workplace practice",status:"Graded",tone:"purple"},
];

function pct(path: Pathway | undefined, data: Bootstrap | null) {
  return path ? data?.state.summaries[path.code]?.percent || 0 : 0;
}

export function LearnerPortal({section = ""}: {section?: string}) {
  const [data,setData]=useState<Bootstrap|null>(null);
  const [query,setQuery]=useState("");
  const [toast,setToast]=useState("");
  const [notes,setNotes]=useState<Array<{title:string;body:string;date:string}>>([]);
  const [messages,setMessages]=useState<Array<{from:string;body:string;mine?:boolean}>>([
    {from:"Professor Luna",body:"Welcome back. I’m ready to guide today’s lesson and check your understanding."},
    {from:"Instructor",body:"Your latest evidence is queued for review. Keep going."},
  ]);

  useEffect(()=>{
    lmsApi.bootstrap().then(setData);
    try{setNotes(JSON.parse(localStorage.getItem("leashed_portal_notes")||"[]"));}catch{}
  },[]);

  const path=useMemo(()=>{
    if(!data)return undefined;
    const enrolled=data.state.enrollments[0]?.path_code;
    return data.curriculum.paths.find(p=>p.code===enrolled)||data.curriculum.paths[0];
  },[data]);
  const summary=path&&data ? data.state.summaries[path.code]||{completed:0,total:path.moduleCount,percent:0,currentModule:path.modules[0].code}:undefined;
  const module=path?.modules.find(m=>m.code===summary?.currentModule)||path?.modules[0];
  const currentIndex=path&&module?path.modules.findIndex(m=>m.code===module.code):0;
  const firstName=data?.learner.name.split(" ")[0]||"Learner";

  function notify(message:string){setToast(message);window.setTimeout(()=>setToast(""),2200);}
  function addNote(){
    const title=prompt("Note title");
    if(!title)return;
    const body=prompt("Write your note")||"";
    const next=[{title,body,date:new Date().toLocaleDateString()},...notes];
    setNotes(next);localStorage.setItem("leashed_portal_notes",JSON.stringify(next));notify("Note saved");
  }

  if(!data||!path||!module||!summary)return <main className="learner-loading">Preparing your Leashed workspace…</main>;

  return <main className="learner-portal">
    <LearnerTopBar data={data} path={path} query={query} setQuery={setQuery}/>
    <div className="learner-content">
      {section==="" ? <LearnerHome data={data} path={path} module={module} summary={summary} currentIndex={currentIndex}/> :
       <LearnerInterior section={section} data={data} path={path} module={module} notes={notes} addNote={addNote} messages={messages} setMessages={setMessages} notify={notify}/>}
    </div>
    <LearnerBottomNav active={section}/>
    <div className={`portal-toast ${toast?"show":""}`}>{toast}</div>
  </main>;
}

function LearnerTopBar({data,path,query,setQuery}:{data:Bootstrap;path:Pathway;query:string;setQuery:(v:string)=>void}) {
  return <header className="learner-topbar">
    <BrandLogo className="learner-wordmark" />
    <button className="learner-profile"><i>{data.learner.name.slice(0,1)}</i><span><strong>{data.learner.name}</strong><small>Learner · {path.code}</small></span>⌄</button>
    <Link className="learner-course-pill" href="/dashboard/learner/lessons"><span>♧</span>{path.title}<b>⌄</b></Link>
    <label className="learner-search">⌕<input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search lessons, modules, notes, or ask anything…"/></label>
    <div className="learner-top-icons"><button>♧<i>3</i></button><button>◉</button><button>◖</button><Link href="/dashboard/learner/more">⚙</Link></div>
  </header>;
}

function LearnerBottomNav({active}:{active:string}) {
  return <nav className="learner-bottom-nav" aria-label="Learner tools">
    {nav.map(([icon,label,slug])=><Link className={active===slug?"active":""} href={`/dashboard/learner${slug?"/"+slug:""}`} key={label}><span>{icon}</span><small>{label}</small></Link>)}
  </nav>;
}

function LearnerHome({data,path,module,summary,currentIndex}:{data:Bootstrap;path:Pathway;module:Pathway["modules"][number];summary:{completed:number;total:number;percent:number;currentModule:string};currentIndex:number}) {
  const pathwayVisual: Record<string,string> = {
    SIT: "/leashed-assets/pathway-sit.webp",
    CAT: "/leashed-assets/pathway-cat.webp",
    DB: "/leashed-assets/pathway-db.webp",
    PDT: "/leashed-assets/pathway-pdt.webp",
    PDG: "/leashed-assets/pathway-pdg.webp",
    CPP: "/leashed-assets/pathway-cpp.webp",
  };
  const currentVisual = pathwayVisual[path.code] || "/leashed-assets/pathway-cpp.webp";
  return <div className="integrated-dashboard">
    <section className="lesson-focus">
      <div className="professor-card">
        <img src="/mock-assets/professor-luna.webp" alt="Professor Luna"/>
        <div><strong>I’m your AI professor.</strong><p>I’ll explain, guide, check understanding, and help you prove mastery.</p></div>
      </div>
      <div className="lesson-focus-copy">
        <small>{module.code} · Module {currentIndex+1}</small>
        <h1>{module.title}</h1>
        <p>{module.description}</p>
        <div className="dashboard-check"><b>✓</b><span><strong>Quick Check</strong><small>Ready when you complete today’s instruction.</small></span><Link href="/dashboard/learner/lessons">Open lesson →</Link></div>
        <Link className="expand-lesson" href="/dashboard/learner/lessons">▧ &nbsp; Expand the lesson <span>Dive into instruction, evidence, and resources.</span> →</Link>
      </div>
      <div className="module-visual">
        <img src={currentVisual} alt={`${path.title} vocational training`}/>
        <div><span>{path.code}</span><strong>{summary.percent}% pathway progress</strong></div>
      </div>
      <aside className="dashboard-inbox">
        <header><strong>ATTENTION / INBOX <b>3</b></strong><Link href="/dashboard/learner/messages">View all →</Link></header>
        {[
          ["▣","Evidence awaiting review","Applied practice submission","1h ago"],
          ["✓","Quiz result","Latest knowledge check","2h ago"],
          ["●","Instructor message","Keep up the good work","4h ago"],
          ["▦","Meeting request","Support check-in","5h ago"],
        ].map(([icon,title,copy,time])=><Link href="/dashboard/learner/messages" key={title}><span>{icon}</span><div><strong>{title}</strong><small>{copy}</small></div><time>{time}</time></Link>)}
        <div className="inbox-actions"><Link href="/dashboard/learner/meet">✋ RAISE HAND</Link><Link href="/dashboard/learner/messages">♙ REQUEST HUMAN</Link></div>
      </aside>
    </section>

    <section className="whats-next">
      <h2>WHAT’S NEXT</h2>
      <div>
        {[
          ["NOW","Current Lesson",module.title,"75%","green","lessons"],
          ["Next","Knowledge Check","20 questions · 30 min","0%","gold","assignments"],
          ["Then","Applied Evidence","Assignment · 45 min","","purple","assignments"],
          ["Later","Instructor Review","Human verification","","orange","messages"],
          ["Upcoming","Next Module",path.modules[currentIndex+1]?.title||"Capstone","","violet","lessons"],
        ].map(([tag,title,copy,value,tone,slug])=><Link className={`next-card ${tone}`} href={`/dashboard/learner/${slug}`} key={tag}><b>{tag}</b><strong>{title}</strong><small>{copy}</small>{value&&<><progress max="100" value={value.replace("%","")}/><i>{value}</i></>}</Link>)}
      </div>
    </section>

    <div className="integrated-grid">
      <section className="today-schedule panel">
        <header><h2>Today’s Schedule</h2><span>Today</span></header>
        {[
          ["1","Instruction","8:00 – 9:00 AM","In Progress"],
          ["2","Guided Practice","9:15 – 10:00 AM","Next"],
          ["3","Knowledge Check","10:15 – 10:45 AM",""],
          ["4","Applied Evidence","11:00 – 12:00 PM",""],
          ["◷","Break","12:00 – 12:30 PM",""],
          ["5","Professor Review","12:30 – 1:20 PM",""],
        ].map(([n,title,time,status])=><Link href="/dashboard/learner/lessons" key={title}><b>{n}</b><span><strong>{title}</strong><small>{time}</small></span>{status&&<i>{status}</i>}<em>›</em></Link>)}
      </section>

      <section className="lesson-detail panel">
        <header><h2>{module.title}</h2><span>Key Concept</span></header>
        <p>{module.description}</p>
        <div className="lesson-tabs"><button>Lesson</button><button>Practice</button><button>Quiz</button><button>Resources</button></div>
        <h3>Professional outcomes</h3>
        <p>{module.evidence}</p>
        <img src={currentVisual} alt={`${path.title} module visual`}/>
        <footer><Link href="/dashboard/learner/lessons">CC Transcript</Link><Link href="/dashboard/learner/meet">◉ Raise Hand</Link><Link href="/dashboard/learner/lessons">Next →</Link></footer>
      </section>

      <section className="dashboard-media panel"><div className="video-placeholder"><img src="/mock-assets/lesson-thumbnail.webp" alt="Approved lesson media"/><b>▶</b></div><h3>Key Takeaways</h3><ul><li>Safety and humane practice guide every decision.</li><li>Evidence must demonstrate applied competence.</li><li>Mastery—not clicks—opens the next stage.</li></ul><div className="mini-check"><strong>Quick Check</strong><input placeholder="Type your answer…"/><button>→</button></div></section>

      <section className="dashboard-notes panel"><header><h2>NOTES</h2><Link href="/dashboard/learner/notes">View details →</Link></header><ul><li>{module.title} is the current focus.</li><li>Review all cited sources before assessment.</li><li>Prepare evidence for instructor verification.</li></ul><Link href="/dashboard/learner/notes">Add your own notes… →</Link></section>

      <section className="performance-panel panel"><header><h2>PERFORMANCE</h2><Link href="/dashboard/learner/grades">View details →</Link></header><div><span><b>{summary.percent}%</b><small>Mastery</small></span><span><b>{summary.completed}</b><small>Modules</small></span><span><b>{module.hours}h</b><small>Current hours</small></span></div><p><strong>Time Learned</strong> {Math.round(path.hours*summary.percent/100)} hrs</p><p><strong>Confidence</strong> Building</p></section>

      <section className="dashboard-side-stack">
        <div className="panel"><header><h2>SUBMISSIONS</h2><Link href="/dashboard/learner/assignments">View all →</Link></header>{sampleItems.slice(0,3).map(item=><p key={item.title}><strong>{item.title}</strong><small>{item.status}</small></p>)}</div>
        <div className="panel"><header><h2>READ</h2><Link href="/dashboard/learner/books">View all →</Link></header><p><strong>Current program sources</strong><small>{module.sources.length||"Mapped"} references</small></p><p><strong>Next module reading</strong><small>{path.modules[currentIndex+1]?.title||"Capstone preparation"}</small></p></div>
      </section>
    </div>
  </div>;
}

function LearnerInterior({section,data,path,module,notes,addNote,messages,setMessages,notify}:{section:string;data:Bootstrap;path:Pathway;module:Pathway["modules"][number];notes:Array<{title:string;body:string;date:string}>;addNote:()=>void;messages:Array<{from:string;body:string;mine?:boolean}>;setMessages:(m:Array<{from:string;body:string;mine?:boolean}>)=>void;notify:(m:string)=>void}) {
  const titles:Record<string,[string,string,string]>={
    assignments:["▣","Assignments","View, complete, submit, and track evidence-backed assignments."],
    grades:["A+","Grades","Track mastery, detailed feedback, and competency decisions."],
    notes:["▥","Notes","Create and organize private course notes."],
    books:["▧","Books & Reads","Explore mapped source material and approved learning resources."],
    calendar:["▦","Calendar","Track instructional days, assessments, reviews, and study sessions."],
    messages:["✉","Messages","Connect with instructors, classmates, support, and Professor Luna."],
    files:["☁","Files & Uploads","Manage submitted evidence, course files, and shared resources."],
    notebook:["▤","Notebook","Work with AI to turn files and ideas into study materials."],
    media:["▶","Video & Media","Watch approved course media and review transcripts."],
    meet:["▰","Meet & Human Support","Join sessions, raise your hand, or request a human educator."],
    share:["↗","Share","Share approved progress, resources, and credential links."],
    more:["•••","More Tools","Access profile, accessibility, settings, help, and credentials."],
  };
  const meta=titles[section]||["◇","Learner Workspace","Continue your vocational learning journey."];
  return <section className={`learner-interior learner-${section}`}>
    <header className="interior-title"><span>{meta[0]}</span><div><h1>{meta[1]}</h1><p>{meta[2]}</p></div></header>
    {section==="assignments"&&<Assignments path={path} module={module} notify={notify}/>}
    {section==="grades"&&<Grades data={data} path={path}/>}
    {section==="notes"&&<Notes notes={notes} addNote={addNote}/>}
    {section==="books"&&<Books module={module}/>}
    {section==="calendar"&&<Calendar module={module}/>}
    {section==="messages"&&<Messages messages={messages} setMessages={setMessages}/>}
    {section==="files"&&<Files notify={notify}/>}
    {section==="notebook"&&<Notebook notify={notify}/>}
    {section==="media"&&<Media module={module}/>}
    {section==="meet"&&<Meet notify={notify}/>}
    {section==="share"&&<Share path={path} notify={notify}/>}
    {section==="more"&&<More/>}
  </section>;
}

function SummaryCards({items}:{items:Array<[string,string,string]>}){return <div className="interior-summary">{items.map(([icon,value,label])=><article key={label}><span>{icon}</span><strong>{value}</strong><small>{label}</small></article>)}</div>;}
function Assignments({path,module,notify}:{path:Pathway;module:Pathway["modules"][number];notify:(m:string)=>void}){return <div className="interior-two"><div className="panel interior-list"><nav><button>All Assignments</button><button>Upcoming</button><button>Completed</button><button>Overdue</button></nav><h2>Active Assignments <small>4</small></h2>{sampleItems.map((item,index)=><button className="assignment-row" key={item.title} onClick={()=>notify(index===0?"Opening evidence workspace":"Assignment opened")}><span>▣</span><div><strong>{index===0?module.title+" — Evidence":item.title}</strong><small>{item.detail} · {path.code}</small></div><time>Due in {index+1} days</time><b className={item.tone}>{item.status}</b><i>›</i></button>)}</div><aside><div className="panel"><h2>Assignment Summary</h2><SummaryCards items={[["▣","4","Active"],["✓","12","Completed"],["◷","1","Overdue"],["★","88%","Average score"]]}/></div><div className="panel quick-action-panel"><h2>Quick Actions</h2><button onClick={()=>notify("Upload workspace opened")}>☁ Upload evidence</button><Link href="/dashboard/learner/calendar">▦ Calendar</Link><Link href="/dashboard/learner/messages">✉ Assignment help</Link></div></aside></div>}
function Grades({data,path}:{data:Bootstrap;path:Pathway}){const s=data.state.summaries[path.code];return <div className="interior-two"><div className="panel"><h2>Overall Performance</h2><SummaryCards items={[["◯",`${s?.percent||0}%`,"Pathway progress"],["★","A","Highest grade"],["✓",String(s?.completed||0),"Modules completed"],["!","0","Missing evidence"]]}/><h2>Recent Grades</h2><div className="data-table">{path.modules.slice(0,8).map((m,i)=><div key={m.code}><strong>{m.code} · {m.title}</strong><span>{i<(s?.completed||0)?"Passed":"In progress"}</span><b>{i<(s?.completed||0)?"92%":"—"}</b><small>{i<(s?.completed||0)?"Competent":"Awaiting decision"}</small></div>)}</div></div><aside className="panel"><h2>Competency by domain</h2>{["Technical skill","Safety","Professional judgment","Communication","Evidence quality"].map((x,i)=><label className="grade-bar" key={x}>{x}<span><i style={{width:`${85-i*5}%`}}/></span><b>{85-i*5}%</b></label>)}</aside></div>}
function Notes({notes,addNote}:{notes:Array<{title:string;body:string;date:string}>;addNote:()=>void}){const shown=notes.length?notes:[{title:"Current module notes",body:"Capture key concepts, questions, evidence ideas, and instructor feedback here.",date:"Today"},{title:"Safety reminders",body:"Document decisions, not just outcomes.",date:"Today"}];return <div className="interior-two"><div className="panel interior-list"><nav><button onClick={addNote}>＋ Create New Note</button><button>By Module</button><button>Favorites</button><button>Shared</button></nav><h2>Recent Notes</h2>{shown.map(note=><article className="note-row" key={note.title}><span>▥</span><div><strong>{note.title}</strong><p>{note.body}</p><small>{note.date}</small></div><button>☆</button></article>)}</div><aside className="panel quick-action-panel"><h2>Quick Actions</h2><button onClick={addNote}>▥ Create New Note</button><Link href="/dashboard/learner/files">☁ Upload File</Link><Link href="/dashboard/learner/lessons">▦ Link to Lesson</Link></aside></div>}
function Books({module}:{module:Pathway["modules"][number]}){const sources=module.sources.length?module.sources:["Leashed Program Delivery Guide","Approved course bibliography","Instructor-provided source pack"];return <div className="interior-two"><div className="panel"><h2>Currently Reading</h2><div className="book-grid">{sources.map((s,i)=><article key={s}><div>LEASHED<br/><b>{i+1}</b></div><h3>{s}</h3><p>Mapped to {module.code}</p><progress max="100" value={68-i*12}/><button>▧ Continue Reading →</button></article>)}</div><h2>Recommended for You</h2><div className="book-grid compact">{["Animal handling","Professional safety","Client communication","Business readiness"].map((x,i)=><article key={x}><div>BOOK<br/><b>{i+4}</b></div><h3>{x}</h3><button>＋ Add to Library</button></article>)}</div></div><aside className="panel"><h2>Reading Progress</h2><SummaryCards items={[["◯","68%","Total read"],["▧","12","Books read"],["◷","8h","This month"],["★","4.7","Avg rating"]]}/></aside></div>}
function Calendar({module}:{module:Pathway["modules"][number]}){const days=Array.from({length:35},(_,i)=>i-1);return <div className="interior-two calendar-layout"><div className="panel"><div className="calendar-head"><div><button>Month</button><button>Week</button><button>Day</button><button>Agenda</button></div><h2>September 2026</h2></div><div className="calendar-grid">{["SUN","MON","TUE","WED","THU","FRI","SAT"].map(x=><b key={x}>{x}</b>)}{days.map((d,i)=><div key={i}><strong>{d>0&&d}</strong>{[3,8,10,16,21,24,29].includes(d)&&<span className={`event e${i%4}`}>{d===3?module.title:d===8?"Knowledge Check":d===10?"Office Hours":d===16?"Evidence Due":d===21?"Study Session":d===24?"Module Review":"Final Assessment"}</span>}</div>)}</div></div><aside className="panel"><h2>Upcoming Events</h2>{["Study Group","Evidence Review","Virtual Office Hours","Progress Check"].map((x,i)=><p className="upcoming-event" key={x}><b>{3+i*5}</b><span><strong>{x}</strong><small>{i+1}:00 PM</small></span>›</p>)}</aside></div>}
function Messages({messages,setMessages}:{messages:Array<{from:string;body:string;mine?:boolean}>;setMessages:(m:Array<{from:string;body:string;mine?:boolean}>)=>void}){const [draft,setDraft]=useState("");function send(){if(!draft.trim())return;setMessages([...messages,{from:"You",body:draft,mine:true}]);setDraft("");}return <div className="message-layout"><aside className="panel conversation-list"><button>＋ New Message</button>{["Professor Luna","Assigned Instructor","Study Group","Learner Support","Credential Office"].map((x,i)=><p key={x}><span>{x.slice(0,1)}</span><strong>{x}<small>{i?"Latest conversation…":"Ready to help with your lesson."}</small></strong><b>{i<2?i+1:""}</b></p>)}</aside><section className="panel chat-panel"><header><strong>Professor Luna</strong><small>● Online</small></header><div>{messages.map((m,i)=><p className={m.mine?"mine":""} key={i}><small>{m.from}</small>{m.body}</p>)}</div><footer><input value={draft} onChange={e=>setDraft(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Type a message…"/><button onClick={send}>➤</button></footer></section><aside className="panel contact-card"><div className="avatar">L</div><h2>Professor Luna</h2><p>AI Full Professor</p><button>Request Human Instructor</button><h3>Shared Files</h3><p>Program guide.pdf</p><p>Evidence checklist.docx</p></aside></div>}
function Files({notify}:{notify:(m:string)=>void}){const [files,setFiles]=useState<string[]>(["Safety Evidence.pdf","Practice Photos.zip","Reflection.docx","Assessment Feedback.pdf"]);return <div className="interior-two"><div className="panel"><nav className="file-nav"><label>☁ Upload File<input type="file" hidden onChange={e=>{const n=e.target.files?.[0]?.name;if(n){setFiles([n,...files]);notify(`${n} uploaded`)}}}/></label><button>My Uploads</button><button>Shared Files</button><button>Assignments</button></nav><h2>Recent Files</h2><div className="file-table">{files.map((f,i)=><div key={f}><input type="checkbox"/><span>▣</span><strong>{f}<small>{i?"Shared resource":"My upload"}</small></strong><b>{["PDF","ZIP","DOCX","PDF"][i%4]}</b><time>{i+1}.2 MB</time><button>↓</button></div>)}</div></div><aside className="panel"><h2>Storage Space</h2><SummaryCards items={[["◯","68%","Used"],["☁","3.4 GB","of 5 GB"]]}/><h2>File Categories</h2>{["Assignments","Class Materials","Notes","Projects","Resources"].map(x=><p className="category-row" key={x}>▣ {x}<span>›</span></p>)}</aside></div>}
function Notebook({notify}:{notify:(m:string)=>void}){const [draft,setDraft]=useState("");const [answer,setAnswer]=useState("");function ask(){if(!draft)return;setAnswer("I can help organize that into key concepts, practice questions, an evidence checklist, and a study plan. Open the current lesson when you are ready to connect it to published course content.");setDraft("");notify("Notebook response generated");}return <div className="notebook-layout"><aside className="panel notebook-tools"><h2>New Notebook</h2>{["Chat with AI","Upload Files","Generate Notes","Build Study Guide","Create Paper","Brainstorm Ideas"].map(x=><button key={x}>{x}</button>)}</aside><section className="panel notebook-chat"><header><h2>AI Study Assistant</h2><span>Published content only</span></header><div><b>♙</b><h2>Ready to get started?</h2><p>{answer||"Upload a document, ask a question, or tell me what you want to explore."}</p><div><button>Summarize a document</button><button>Build a study guide</button><button>Turn this into notes</button></div></div><footer><input value={draft} onChange={e=>setDraft(e.target.value)} onKeyDown={e=>e.key==="Enter"&&ask()} placeholder="Ask me anything about your study…"/><button onClick={ask}>➤</button></footer></section><aside className="panel"><h2>My Notebooks</h2>{["Current Module","Capstone Planning","Safety & Handling","Career Preparation"].map(x=><p className="category-row" key={x}>▤ {x}<span>›</span></p>)}</aside></div>}
function Media({module}:{module:Pathway["modules"][number]}){return <div className="interior-two"><section className="panel media-library"><div className="large-video"><img src="/leashed-assets/pathway-cpp.webp" alt="Approved vocational course media"/><b>▶</b></div><h2>{module.title}</h2><p>Approved instructional media · captions and transcript available</p><div><button>CC Captions</button><button>▤ Transcript</button><button>▧ Resources</button></div></section><aside className="panel"><h2>Up Next</h2>{["Instructor demonstration","Safety scenario","Evidence walkthrough","Career application"].map((x,i)=><p className="media-row" key={x}><span>▶</span><strong>{x}<small>{8+i*4} min</small></strong></p>)}</aside></div>}
function Meet({notify}:{notify:(m:string)=>void}){return <div className="meeting-grid">{[["✋","Raise Hand","Notify your assigned instructor that you need help."],["♙","Request Human","Escalate from Professor Luna to a qualified educator."],["▰","Join Session","Enter a scheduled live or office-hours session."],["▦","Schedule Meeting","Request a future support or review appointment."]].map(([icon,title,copy])=><button className="panel" key={title} onClick={()=>notify(`${title} request recorded`)}><span>{icon}</span><h2>{title}</h2><p>{copy}</p><b>Continue →</b></button>)}</div>}
function Share({path,notify}:{path:Pathway;notify:(m:string)=>void}){return <div className="share-grid"><section className="panel"><h2>Share approved progress</h2><p>Only verified, permission-appropriate information is included.</p>{["Pathway enrollment","Verified module completion","Issued credentials","Public credential verification"].map(x=><label key={x}><input type="checkbox" defaultChecked={x!=="Pathway enrollment"}/> {x}</label>)}<button onClick={()=>{navigator.clipboard?.writeText(location.origin+`/credentials/${path.code}`);notify("Share link copied")}}>Create share link</button></section><aside className="panel"><h2>Institutional sharing</h2><p>Export approved records for employers, partner schools, workforce programs, or funding reports.</p><button onClick={()=>notify("Transcript export prepared")}>Export transcript</button><button onClick={()=>notify("Credential record prepared")}>Credential record</button></aside></div>}
function More(){return <div className="more-grid">{[["♙","Profile","Identity, contact, and learner preferences"],["◉","Accessibility","Captions, read-aloud, display, and pacing"],["⬡","Privacy & Consent","Data permissions and guardian consent"],["◇","Credentials","Issued certificates and verification"],["⚙","Settings","Notifications, timezone, and account"],["♡","Support","Technical, academic, and wellbeing help"]].map(([icon,title,copy])=><button className="panel" key={title}><span>{icon}</span><h2>{title}</h2><p>{copy}</p><b>Open →</b></button>)}</div>}