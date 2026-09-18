"use client";

import Link from "next/link";
import {BrandLogo} from "@/components/BrandLogo";
import {useEffect, useMemo, useState} from "react";
import {lmsApi} from "@/lib/api";
import type {AdminDashboard, Bootstrap, Pathway} from "@/lib/types";

type Role = "organization" | "admin";
type Item = {title:string;subtitle:string;status:string;metric:string};

const organizationNav = [
  ["⌂","Dashboard",""],
  ["♙","Students","students"],
  ["♙","Instructors","instructors"],
  ["▧","Programs & Courses","programs"],
  ["♙","Cohorts","cohorts"],
  ["▣","Assessments","assessments"],
  ["A+","Gradebook","gradebook"],
  ["▥","Reports","reports"],
  ["⬡","Compliance","compliance"],
  ["◇","AI Controls","ai-controls"],
  ["▰","Meetings","meetings"],
  ["✉","Messages","messages"],
  ["⚙","Settings","settings"],
  ["▣","Resource Library","resources"],
  ["▦","Enrollment Controls","enrollment"],
] as const;

const adminNav = [
  ["⌂","Dashboard",""],
  ["▧","Curriculum & Courses","programs"],
  ["♙","Students","students"],
  ["♙","Instructors","instructors"],
  ["▣","Assessments","assessments"],
  ["▣","Media & Resources","resources"],
  ["▥","Reports","reports"],
  ["⬡","Policy & Compliance","compliance"],
  ["◇","AI Controls","ai-controls"],
  ["▰","Meetings","meetings"],
  ["✉","Messages","messages"],
  ["⚙","Organization Settings","settings"],
  ["▦","Enrollment Rules","enrollment"],
] as const;

function orgName() {
  if (typeof window === "undefined") return "Leashed Demonstration School";
  try {
    const stored=JSON.parse(localStorage.getItem("leashed_onboarding_organization")||"{}");
    return stored.organizationName||"Leashed Demonstration School";
  } catch { return "Leashed Demonstration School"; }
}

export function InstitutionPortal({role,section=""}:{role:Role;section?:string}) {
  const [data,setData]=useState<Bootstrap|null>(null);
  const [admin,setAdmin]=useState<AdminDashboard|null>(null);
  const [organization,setOrganization]=useState("Leashed Demonstration School");
  const [toast,setToast]=useState("");
  const [query,setQuery]=useState("");
  const [selectedStudent,setSelectedStudent]=useState<string|null>(null);

  useEffect(()=>{
    Promise.all([lmsApi.bootstrap(),lmsApi.adminDashboard()]).then(([bootstrap,dashboard])=>{setData(bootstrap);setAdmin(dashboard)});
    setOrganization(orgName());
  },[]);

  function notify(message:string){setToast(message);setTimeout(()=>setToast(""),2200);}
  if(!data||!admin)return <main className="institution-loading">Preparing institutional workspace…</main>;

  const paths=data.curriculum.paths;
  const nav=role==="admin"?adminNav:organizationNav;
  const label=role==="admin"?"Platform Admin":"Organization Admin";

  return <main className="institution-portal">
    <aside className="institution-sidebar">
      <BrandLogo light className="institution-logo" />
      <nav>{nav.map(([icon,title,slug])=><Link className={section===slug?"active":""} href={`/dashboard/${role}${slug?"/"+slug:""}`} key={title}><span>{icon}</span>{title}</Link>)}</nav>
      <div className="institution-identity"><span>♧</span><strong>{organization}<small>{label}</small></strong></div>
    </aside>
    <div className="institution-main">
      <header className="institution-topbar">
        <label>⌕<input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search learners, instructors, programs, or resources…"/></label>
        <button>{organization}⌄</button><button>♧<i>3</i></button><button className="institution-user"><span>{admin.viewer.name.slice(0,1)}</span><strong>{admin.viewer.name}<small>{label}</small></strong>⌄</button>
      </header>
      {section ? <InstitutionInterior role={role} section={section} paths={paths} admin={admin} query={query} selectedStudent={selectedStudent} setSelectedStudent={setSelectedStudent} notify={notify}/> : <InstitutionHome role={role} organization={organization} paths={paths} admin={admin}/>}
    </div>
    <div className={`portal-toast ${toast?"show":""}`}>{toast}</div>
  </main>;
}

function InstitutionHome({role,organization,paths,admin}:{role:Role;organization:string;paths:Pathway[];admin:AdminDashboard}) {
  return <section className="institution-dashboard">
    <header className="institution-heading">
      <div><small>{role==="admin"?"PLATFORM OPERATIONS":"ORGANIZATION DASHBOARD"}</small><h1>{role==="admin"?organization:`Welcome back, ${admin.viewer.name.split(" ")[0]}!`}</h1><p>{role==="admin"?"Manage governed curriculum, people, evidence, policy, and credentials.":`Here’s what’s happening across ${organization}.`}</p></div>
      <div><button>▦ Sep 7–13, 2026⌄</button><button>All Programs⌄</button></div>
    </header>
    <div className="institution-kpis">
      {[
        ["♙","Total Learners","42","↑ 12%"],
        ["♙","Active Instructors","8","↑ 7%"],
        ["◇",role==="admin"?"Courses Published":"Completed Courses",String(paths.length),"↑ 20%"],
        ["▣","Placement Rate","76%","↑ 15%"],
      ].map(([icon,title,value,change])=><article key={title}><span>{icon}</span><div><small>{title}</small><strong>{value}</strong><b>{change}</b><p>vs. last term</p></div></article>)}
    </div>
    <div className="institution-dashboard-grid">
      <section className="institution-card student-progress">
        <header><div><h2>Student Progress</h2><p>Overall completion across all programs</p></div><button>All Programs⌄</button></header>
        <div className="donut"><strong>68%</strong><small>On Track</small></div>
        <ul><li><i/>On Track <b>29</b><span>68%</span></li><li><i/>At Risk <b>8</b><span>19%</span></li><li><i/>Needs Attention <b>4</b><span>10%</span></li><li><i/>Completed <b>1</b><span>2%</span></li></ul>
      </section>
      <section className="institution-card enrollment-chart">
        <header><div><h2>Program Enrollment</h2><p>Current learners by pathway</p></div></header>
        <div className="bars">{paths.map((path,i)=><span key={path.code}><i style={{height:`${35+(paths.length-i)*13}%`}}/><small>{path.code}</small><b>{16-i*2}</b></span>)}</div>
      </section>
      <section className="institution-card institution-actions">
        <h2>Quick Actions</h2>
        <Link href={`/dashboard/${role}/students`}>♙ Add New Student <span>›</span></Link>
        <Link href={`/dashboard/${role}/instructors`}>♙ Add Instructor <span>›</span></Link>
        <Link href={`/dashboard/${role}/cohorts`}>♙ Create Cohort <span>›</span></Link>
        <Link href={`/dashboard/${role}/enrollment`}>▧ Enroll in Program <span>›</span></Link>
        <Link href={`/dashboard/${role}/reports`}>▥ View Reports <span>›</span></Link>
      </section>
      <section className="institution-card recent-students">
        <header><h2>Recent Students</h2><Link href={`/dashboard/${role}/students`}>View All</Link></header>
        <div className="institution-table">
          <div className="head"><span>Name</span><span>Program</span><span>Status</span><span>Progress</span><span>Next Milestone</span></div>
          {students.slice(0,5).map((student,i)=><Link href={`/dashboard/${role}/students`} key={student.name}><strong>{student.name}<small>{student.email}</small></strong><span>{paths[i%paths.length].title}<small>{paths[i%paths.length].code}</small></span><b className={student.status.toLowerCase().replaceAll(" ","-")}>{student.status}</b><span><progress max="100" value={student.progress}/>{student.progress}%</span><span>Module {i+5}</span></Link>)}
        </div>
      </section>
      <section className="institution-card upcoming-sessions">
        <header><h2>Upcoming Instructor Sessions</h2><Link href={`/dashboard/${role}/meetings`}>View All</Link></header>
        {paths.slice(0,5).map((path,i)=><p key={path.code}><b>{["SEP 14","SEP 15","SEP 16","SEP 17","SEP 18"][i]}</b><span><strong>{path.title}</strong><small>{9+i}:00 AM · {path.code}</small></span></p>)}
      </section>
    </div>
  </section>;
}

const students=[
  {name:"Emily Carter",email:"emily@example.com",status:"On Track",progress:72},
  {name:"Marcus Johnson",email:"marcus@example.com",status:"At Risk",progress:54},
  {name:"Sophie Martinez",email:"sophie@example.com",status:"On Track",progress:83},
  {name:"Daniel Kim",email:"daniel@example.com",status:"Completed",progress:100},
  {name:"Olivia Davis",email:"olivia@example.com",status:"Needs Attention",progress:42},
  {name:"Ava Wilson",email:"ava@example.com",status:"On Track",progress:68},
];

function InstitutionInterior({role,section,paths,admin,query,selectedStudent,setSelectedStudent,notify}:{role:Role;section:string;paths:Pathway[];admin:AdminDashboard;query:string;selectedStudent:string|null;setSelectedStudent:(v:string|null)=>void;notify:(m:string)=>void}) {
  const titles:Record<string,[string,string]>={
    students:["Students","Manage enrollment, progress, credentials, and learner support."],
    instructors:["Instructors","Assign organization-owned courses and manage educator qualifications."],
    programs:["Programs & Courses","Author, publish, own, and assign governed vocational curriculum."],
    cohorts:["Cohorts","Group learners, instructors, schedules, and locations."],
    assessments:["Assessments","Build assessments and manage human grading and evidence review."],
    gradebook:["Gradebook","Review grades, mastery, evidence, and competency decisions."],
    reports:["Reports & Analytics","Measure academic, operational, compliance, and workforce outcomes."],
    compliance:["Compliance & State Mandates","Manage audit-ready requirements, clock hours, and approvals."],
    "ai-controls":["AI Controls","Govern AI assistants, retrieval, answer protection, and provenance."],
    meetings:["Meetings & Collaboration","Schedule curriculum reviews, coaching, office hours, and planning."],
    messages:["Messages & Notifications","Communicate with learners, instructors, administrators, and support."],
    settings:["Organization Settings","Manage tenant identity, locations, integrations, roles, and billing."],
    resources:["Resource Library","Manage approved media, files, books, and instructional content."],
    enrollment:["Enrollment Controls","Set availability, prerequisites, capacity, and learner access."],
  };
  const title=titles[section]||["Institution Workspace","Manage institutional operations."];
  const filteredStudents=students.filter(s=>s.name.toLowerCase().includes(query.toLowerCase()));
  if(section==="students"&&selectedStudent){
    const student=students.find(s=>s.name===selectedStudent)||students[0];
    return <section className="institution-interior"><button className="back-row" onClick={()=>setSelectedStudent(null)}>← Back to students</button><InstitutionTitle title={student.name} copy="Learner profile, progress, evidence, credentials, and support history."/><div className="profile-tabs"><button>Overview</button><button>Progress</button><button>Grades</button><button>Credentials</button><button>Support</button><button>Notes</button></div><div className="student-profile-grid"><section className="institution-card"><h2>Progress</h2><div className="donut"><strong>{student.progress}%</strong><small>Overall</small></div><p>Technical <progress max="100" value={student.progress}/></p><p>Evidence <progress max="100" value={Math.max(20,student.progress-8)}/></p><p>Attendance <progress max="100" value={94}/></p></section><section className="institution-card"><h2>Recent Activity</h2>{["Completed module evidence","Quiz reviewed","Instructor feedback posted","Support referral resolved"].map(x=><p className="activity-row" key={x}>✓ {x}<small>2h ago</small></p>)}</section></div></section>;
  }
  return <section className="institution-interior">
    <InstitutionTitle title={title[0]} copy={title[1]}/>
    {section==="students"&&<StudentList students={filteredStudents} paths={paths} select={setSelectedStudent} notify={notify}/>}
    {section==="instructors"&&<InstructorList paths={paths} notify={notify}/>}
    {section==="programs"&&<Programs paths={paths} role={role} notify={notify}/>}
    {section==="cohorts"&&<GenericTable headings={["Cohort","Program","Learners","Instructor","Schedule","Status"]} rows={paths.map((p,i)=>[`Cohort ${i+1}`,p.code,String(8+i*3),["Jamie Carter","Michael Brooks","Jessica Turner"][i%3],`${i%2?"Tue/Thu":"Mon/Wed"} · ${9+i}:00`,"Active"])}/>}
    {section==="assessments"&&<Assessments paths={paths} notify={notify}/>}
    {section==="gradebook"&&<Gradebook paths={paths}/>}
    {section==="reports"&&<Reports paths={paths}/>}
    {section==="compliance"&&<Compliance notify={notify}/>}
    {section==="ai-controls"&&<AIControls notify={notify}/>}
    {section==="meetings"&&<Meetings notify={notify}/>}
    {section==="messages"&&<InstitutionMessages/>}
    {section==="settings"&&<Settings notify={notify}/>}
    {section==="resources"&&<Resources notify={notify}/>}
    {section==="enrollment"&&<Enrollment paths={paths} notify={notify}/>}
  </section>;
}

function InstitutionTitle({title,copy}:{title:string;copy:string}){return <header className="institution-interior-title"><div><small>INSTITUTION WORKSPACE</small><h1>{title}</h1><p>{copy}</p></div><button>＋ Create / Add</button></header>;}
function StudentList({students,paths,select,notify}:{students:Array<{name:string;email:string;status:string;progress:number}>;paths:Pathway[];select:(v:string)=>void;notify:(m:string)=>void}) {
  const list=students;
  return <div className="institution-card institution-list-page"><nav><button>All Students</button><button>Active</button><button>At Risk</button><button>Completed</button><button>Archived</button><button onClick={()=>notify("Invitation workflow opened")}>＋ Add Student</button></nav><GenericTable headings={["Name","Program","Grade","Progress","Status","Last Active","Actions"]} rows={list.map((s,i)=>[s.name,paths[i%paths.length].title,"—",`${s.progress}%`,s.status,`${i+1}h ago`,"View"])} onRow={(row)=>select(row[0])}/></div>;
}
function InstructorList({paths,notify}:{paths:Pathway[];notify:(m:string)=>void}){return <div className="institution-card institution-list-page"><nav><button>All Instructors</button><button>Active</button><button>Qualifications</button><button onClick={()=>notify("Instructor invitation created")}>＋ Add Instructor</button></nav><GenericTable headings={["Name","Role","Assigned Courses","Status","Organization","Actions"]} rows={[
["Jamie Carter","Lead Instructor",`${paths[4].code}, ${paths[2].code}`,"Active","Current tenant","Manage"],
["Michael Brooks","Instructor",paths[3].code,"Active","Current tenant","Manage"],
["Jessica Turner","Instructor",paths[1].code,"Active","Current tenant","Manage"],
["Robert Chen","Lab Instructor",paths[2].code,"Active","Current tenant","Manage"],
["Lisa Parker","Mentor",`${paths[0].code}, ${paths[5].code}`,"On Leave","Current tenant","Manage"],
]}/></div>}
function Programs({paths,role,notify}:{paths:Pathway[];role:Role;notify:(m:string)=>void}){return <div className="institution-card institution-list-page"><nav><button>Courses</button><button>Pathways</button><button>Curriculum Builder</button><button onClick={()=>notify("Course authoring workspace opened")}>＋ Create Course</button></nav><GenericTable headings={["Title","Code","Credential","Modules","Hours","Status","Ownership","Actions"]} rows={paths.map(p=>[p.title,p.code,p.credential,String(p.moduleCount),p.hours.toLocaleString(),"Published",role==="admin"?"Organization tenant":"Owned by this organization","Open"])}/></div>}
function Assessments({paths,notify}:{paths:Pathway[];notify:(m:string)=>void}){return <div className="institution-card institution-list-page"><nav><button>Assignments</button><button>Quizzes</button><button>Rubrics</button><button>Grading Queue</button><button onClick={()=>notify("Assessment builder opened")}>＋ Create Assessment</button></nav><GenericTable headings={["Title","Type","Course","Due","Submissions","Review","Actions"]} rows={paths.map((p,i)=>[`${p.code} Module ${i+1}`,i%2?"Quiz":"Applied Evidence",p.code,`Sep ${15+i}`,`${12+i}/20`,i%2?"Automated + audit":"Human required","Open"])}/></div>}
function Gradebook({paths}:{paths:Pathway[]}){return <div className="gradebook-layout"><section className="institution-card"><GenericTable headings={["Student","Program","Modules","Assignments","Quizzes","Exam","Overall"]} rows={students.map((s,i)=>[s.name,paths[i%paths.length].code,String(65+i*5),String(70+i*4),String(68+i*5),String(80+i*3),`${Math.min(98,74+i*4)}%`])}/></section><aside className="institution-card"><h2>Performance Analytics</h2>{paths.map((p,i)=><label className="grade-bar" key={p.code}>{p.code}<span><i style={{width:`${90-i*6}%`}}/></span>{90-i*6}%</label>)}</aside></div>}
function Reports({paths}:{paths:Pathway[]}){return <div className="report-grid"><section className="institution-card"><h2>Enrollment</h2><div className="report-bars">{paths.map((p,i)=><span key={p.code}><i style={{height:`${40+i*9}%`}}/><small>{p.code}</small></span>)}</div></section><section className="institution-card"><h2>Completion Rate</h2><div className="donut"><strong>78%</strong><small>Completed</small></div></section><section className="institution-card"><h2>Top Performing Programs</h2>{paths.slice(0,4).map((p,i)=><p className="activity-row" key={p.code}>{p.title}<b>{94-i*3}%</b></p>)}</section><section className="institution-card"><h2>At-Risk Students</h2><strong className="big-number">8</strong><p>↑ 2 this term</p></section></div>}
function Compliance({notify}:{notify:(m:string)=>void}){return <div className="institution-card institution-list-page"><nav><button>Mandates</button><button>Audits</button><button>Reports</button></nav><GenericTable headings={["Mandate","Status","Due Date","Authority","Evidence"]} rows={[["Clock Hour Requirement","Complete","Ongoing","State board","Verified"],["Safety Training","Complete","Sep 30, 2026","School policy","Verified"],["Background Checks","Complete","Ongoing","School policy","On file"],["State Curriculum Standards","In Progress","Oct 15, 2026","State board","Review"],["Reporting & Documentation","Complete","Ongoing","Funder","Verified"]]}/><button className="institution-save" onClick={()=>notify("Compliance report exported")}>Export audit package</button></div>}
function AIControls({notify}:{notify:(m:string)=>void}){const controls=["Enable AI Tutor for Learners","Enable AI Grading Assistant","Enable AI Content Recommendations","Protect assessment answers","Require published-source retrieval","Escalate uncertainty to humans"];return <div className="settings-grid"><section className="institution-card"><h2>AI Assistant Settings</h2>{controls.map((x,i)=><label className="toggle-row" key={x}>{x}<input type="checkbox" defaultChecked={i!==1}/></label>)}</section><aside className="institution-card"><h2>AI Usage & Transparency</h2><strong className="big-number">12,406</strong><p>Total governed interactions</p><p>Source citations <b>100%</b></p><p>Rejected content <b>0</b></p><button className="institution-save" onClick={()=>notify("AI audit log opened")}>View Audit Logs</button></aside></div>}
function Meetings({notify}:{notify:(m:string)=>void}){return <div className="institution-card institution-list-page"><nav><button>Upcoming</button><button>Past</button><button>Calendar</button><button onClick={()=>notify("Meeting scheduler opened")}>＋ Schedule Meeting</button></nav><GenericTable headings={["Title","Type","Participants","Date & Time","Actions"]} rows={[["Curriculum Review","Review","12","Sep 14 · 10:00 AM","Join"],["Instructor Coaching","1:1","2","Sep 15 · 2:00 PM","Open"],["Compliance Check-in","District","8","Sep 16 · 11:00 AM","Open"],["Parent/Guardian Q&A","Group","20","Sep 17 · 6:00 PM","Open"],["Program Planning","Admin","15","Sep 18 · 9:00 AM","Open"]]}/></div>}
function InstitutionMessages(){const [draft,setDraft]=useState("");const [messages,setMessages]=useState(["Welcome to the institutional message center.","Three learner evidence reviews need assignment."]);return <div className="institution-messages"><aside className="institution-card">{["Sarah Mitchell","District Administrators","Parent Group","System","Instructors"].map(x=><button key={x}>{x}<small>Latest message…</small></button>)}</aside><section className="institution-card"><header><h2>Operations Team</h2></header><div>{messages.map((m,i)=><p key={i}>{m}</p>)}</div><footer><input value={draft} onChange={e=>setDraft(e.target.value)} placeholder="Type a message…"/><button onClick={()=>{if(draft){setMessages([...messages,draft]);setDraft("")}}}>➤</button></footer></section></div>}
function Settings({notify}:{notify:(m:string)=>void}){return <div className="settings-grid"><section className="institution-card settings-form"><h2>Organization Information</h2><label>Organization Name<input defaultValue={orgName()}/></label><label>District ID<input defaultValue="LEASHED-DEMO-001"/></label><label>Contact Email<input defaultValue="admin@leashed.io"/></label><label>Phone<input defaultValue="(318) 555-0123"/></label><button onClick={()=>notify("Organization settings saved")}>Save Changes</button></section><aside className="institution-card"><h2>Features</h2>{["AI Controls","Compliance Reporting","Custom Branding","Multi-Campus Support","SIS Integration"].map(x=><label className="toggle-row" key={x}>{x}<input type="checkbox" defaultChecked/></label>)}</aside></div>}
function Resources({notify}:{notify:(m:string)=>void}){return <div className="institution-card institution-list-page"><nav><button>All Media</button><button>Videos</button><button>Documents</button><button>Images</button><button>Books</button><label className="upload-button">↑ Upload<input hidden type="file" onChange={e=>e.target.files?.[0]&&notify(`${e.target.files[0].name} uploaded`)}/></label></nav><GenericTable headings={["Name","Type","Size","Updated","Program","Approval"]} rows={[["Grooming Techniques.mp4","Video","246 MB","Sep 12","PDG","Published"],["CPR Certification.pdf","Document","1.2 MB","Sep 10","All","Approved"],["Cat Care Guide.pdf","Document","3.4 MB","Sep 8","CAT","Approved"],["Program Delivery Guide","Document","1.8 MB","Sep 5","All","Canonical"],["Training Toolkit.zip","Archive","12 MB","Aug 30","All","Approved"]]}/></div>}
function Enrollment({paths,notify}:{paths:Pathway[];notify:(m:string)=>void}){return <div className="settings-grid"><section className="institution-card"><h2>Enrollment Settings</h2>{["Allow Self-Enrollment","Require Approval","Enrollment Window","Maximum Learners per Cohort","Waitlist Enabled"].map((x,i)=><label className="toggle-row" key={x}>{x}<input type="checkbox" defaultChecked={i!==2}/></label>)}<button className="institution-save" onClick={()=>notify("Enrollment settings saved")}>Save Settings</button></section><aside className="institution-card"><h2>Programs Available</h2>{paths.map(p=><label className="toggle-row" key={p.code}>{p.code} · {p.title}<input type="checkbox" defaultChecked/></label>)}</aside></div>}
function GenericTable({headings,rows,onRow}:{headings:string[];rows:string[][];onRow?:(row:string[])=>void}){return <div className="generic-table"><div className="generic-table-head">{headings.map(h=><span key={h}>{h}</span>)}</div>{rows.map((row,i)=><button key={i} onClick={()=>onRow?.(row)} style={{gridTemplateColumns:`repeat(${headings.length},minmax(80px,1fr))`}}>{row.map((cell,j)=><span key={j}>{j===0?<strong>{cell}</strong>:cell}</span>)}</button>)}</div>}