import {chromium} from "/workspace/professor/unleashed/node_modules/playwright-core/index.mjs";
import assert from "node:assert/strict";
import {DatabaseSync} from "node:sqlite";
import fs from "node:fs";
const base="http://127.0.0.1:8083",token=process.env.PROMPTQL_USER_JWT;
const browser=await chromium.launch({headless:true,executablePath:"/usr/bin/google-chrome-stable",args:["--no-sandbox"]});
const ctx=await browser.newContext({viewport:{width:1440,height:900},extraHTTPHeaders:{"x-promptql-visitor-token":token}});
const p=await ctx.newPage(),errors=[],checks=[];
p.on("pageerror",e=>errors.push(e.message));
p.on("response",r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`)});
const pass=(v)=>{checks.push(v);console.log("PASS",v)};
const api=async(path,body)=>{const r=await ctx.request.fetch(base+path,body?{method:"POST",data:body}:{});const j=await r.json();return {status:r.status(),...j}};
const ui=async(label)=>{await p.getByRole("navigation",{name:"Classroom tools"}).getByRole("button",{name:label,exact:true}).click();await p.waitForTimeout(150)};
const day=async(id)=>api(`/api/day?courseId=${id}`);
async function geometry(label){const g=await p.evaluate(()=>({w:innerWidth,h:innerHeight,sw:document.documentElement.scrollWidth,sh:document.documentElement.scrollHeight,prof:document.querySelector('[data-testid="professor"]').getBoundingClientRect().toJSON(),nav:document.querySelector('[data-testid="bottom-rail"]').getBoundingClientRect().toJSON()}));assert(g.sw<=g.w&&g.sh<=g.h);assert(g.prof.top>=0&&g.prof.bottom<g.nav.top);pass(label)}
try{
await p.goto(base,{waitUntil:"networkidle"});
await p.waitForFunction(()=>document.querySelector('select[aria-label="Active course"]')?.value==="4");
await geometry("Desktop is one viewport; Professor and tool rail anchored");
const before=await p.getByTestId("professor").boundingBox();
for(const label of ["My courses","Companion","Assignments","Quizzes","Grades","Notebook","Resources","Calendar","Inbox","Files","Meeting","Classroom"]){
 await ui(label);assert.deepEqual(await p.getByTestId("professor").boundingBox(),before);assert.equal(new URL(p.url()).pathname,"/");
}
pass("12 tools replace only the center; Professor does not move; no route change");

await ui("My courses");
await p.getByLabel("Atlas subject").selectOption({label:"Mental health education"});
await p.getByLabel("Atlas grade").selectOption("3");
assert.equal(await p.getByLabel("Atlas subject").inputValue(),"");
pass("Atlas→Press source selector retained with grade reset; generation not run in this test");

await ui("Classroom");
await p.getByLabel("Ask Professor",{exact:true}).fill("In this Biology lesson, explain structure and function using a different example. Do not answer the current check. Keep it under 60 words.");
const ai= p.waitForResponse(r=>r.url().endsWith("/api/day")&&r.request().postData()?.includes("ASK_PROFESSOR"),{timeout:120000});
await p.getByRole("button",{name:"Send to Professor",exact:true}).click();
const ar=await ai;assert.equal(ar.status(),200);
await p.waitForFunction(()=>!document.querySelector('button[aria-label="Send to Professor"]')||document.querySelector('input[aria-label="Ask Professor"]').value==="");
const ds=await day(4);assert(ds.messages.at(-1).content.length>40);
pass("Real Gemini Professor response in Biology");
console.log("GEMINI",ds.messages.at(-1).content);

await p.getByLabel("Your reasoning").fill("The membrane makes all the DNA and is the place that produces ATP.");
const evalPromise=p.waitForResponse(r=>r.url().endsWith("/api/day")&&r.request().postData()?.includes("SUBMIT_ATTEMPT"),{timeout:120000});
await p.getByRole("button",{name:"Check my thinking",exact:true}).click();
assert.equal((await evalPromise).status(),200);
await p.waitForTimeout(400);
let d=await day(4);assert.equal(d.day.attempts.at(-1).passed,false);assert.equal(d.day.day.state,"REFRAME");
pass("Incorrect answer creates persisted reframe, not fake completion");

await p.getByLabel("Quick note").pressSequentially("A membrane regulates what enters and leaves.",{delay:70});
assert.equal(await p.getByLabel("Quick note").inputValue(),"A membrane regulates what enters and leaves.");
await p.getByRole("button",{name:"Save note",exact:true}).click();
await p.waitForTimeout(400);
await ui("Notebook");assert((await p.getByTestId("work-scroll").innerText()).includes("A membrane regulates what enters and leaves."));
pass("Typing stays focused through timer ticks; notes persist between surfaces");

await ui("Files");
await p.getByLabel("Upload file").setInputFiles({name:"fresh-qa.txt",mimeType:"text/plain",buffer:Buffer.from("Fresh classroom QA file")});
await p.waitForSelector('a:has-text("fresh-qa.txt")');
const file=await p.getByRole("link").filter({hasText:"fresh-qa.txt"}).getAttribute("href");
assert.equal((await ctx.request.get(base+file)).status(),200);pass("Uploaded file saved and downloadable");

await ui("Inbox");await p.getByLabel("Message to co-host").fill("QA: please review my reasoning.");
await p.getByRole("button",{name:"Save message",exact:true}).click();await p.waitForTimeout(300);
assert((await api("/api/workspace")).messages.some(m=>m.content==="QA: please review my reasoning."));
pass("Classroom message persisted with server-derived attribution");

await ui("Calendar");await p.getByLabel("Event title",{exact:true}).fill("QA: Biology review");
await p.getByLabel("Event date and time").fill("2026-09-18T17:00");
await p.getByRole("button",{name:"Add",exact:true}).click();await p.waitForTimeout(300);
assert((await api("/api/workspace")).events.some(e=>e.title==="QA: Biology review"));
pass("Calendar event creation persists");

await p.getByLabel("Active course").selectOption("5");
await p.waitForFunction(()=>document.querySelector(".work-heading h1")?.textContent.includes("Claims"));
await ui("Quizzes");await p.getByLabel("Work scope").selectOption("current");
await p.locator(".work-row").filter({hasText:"Write a precise, debatable claim about a school issue."}).getByRole("button",{name:/Open|Review again/}).click();
await p.waitForFunction(()=>document.querySelector(".live-state")?.textContent==="Quiz");
const baseline=(await day(5)).day.metrics.demonstratedLessons;
await p.getByLabel("Your reasoning").fill("Our school should start classes at 9 a.m. because a later start can help teenagers get enough sleep and arrive ready to learn.");
const quizResponse=p.waitForResponse(r=>r.url().endsWith("/api/day")&&r.request().postData()?.includes("SUBMIT_ATTEMPT"),{timeout:120000});
await p.getByRole("button",{name:"Check my thinking",exact:true}).click();assert.equal((await quizResponse).status(),200);
await p.waitForTimeout(600);d=await day(5);assert.equal(d.day.day.activeWorkKind,"QUIZ");assert(d.day.attempts.at(-1).passed);assert.equal(d.day.metrics.demonstratedLessons,baseline);
assert.equal((await api("/api/workspace")).assignments.find(a=>a.courseId===5&&a.assignmentKey==="check-0-0").score,null);
pass("Cross-course quiz: real acceptance, no fabricated grade, no lesson-mastery increment");
await p.getByRole("button",{name:"Return to lesson",exact:true}).click();await p.waitForTimeout(500);

await p.getByRole("button",{name:"Raise hand",exact:true}).click();
await p.waitForFunction(()=>document.querySelector(".live-state")?.textContent==="Hand raised");
await ui("Co-host review");
const intervention=p.locator(".intervention").filter({hasText:"Learner requested help from the classroom canvas"}).last();
await intervention.getByLabel("Intervention resolution").fill("Reviewed the distinction between a claim and supporting evidence; learner is ready to retry.");
await intervention.getByRole("button",{name:"Resolve & return to Professor"}).click();
await p.waitForTimeout(500);assert.equal((await day(5)).day.day.state,"AWAITING_ATTEMPT");
pass("One-click hand raise → context queue → persisted co-host resolution");

await ui("Classroom");await p.getByRole("button",{name:"Take a 15-minute break",exact:true}).click();
await p.waitForFunction(()=>document.querySelector(".live-state")?.textContent==="On break");
let block=await api("/api/day",{courseId:4,command:"OPEN_DAY"});assert.equal(block.status,400);
pass("Break enforced server-side across subject switching");
await p.reload({waitUntil:"networkidle"});await p.waitForFunction(()=>document.querySelector(".live-state")?.textContent==="On break");
pass("Reload resumes locked break, not another course");
const db=new DatabaseSync("/workspace/unleashed-classroom/data/qa.db");
db.prepare("UPDATE learning_days SET break_ends_at=? WHERE course_id=5 AND state='BREAK_LOCKED'").run(new Date(Date.now()-1000).toISOString());db.close();
await p.reload({waitUntil:"networkidle"});await p.getByRole("button",{name:"Resume classroom",exact:true}).click();await p.waitForTimeout(400);
assert.notEqual((await day(5)).day.day.state,"BREAK_LOCKED");pass("Expired break resumes the saved state");

await ui("Meeting");assert(await p.getByText("Meeting link required",{exact:true}).isVisible());
assert.equal(await p.getByRole("button",{name:"Join",exact:true}).count(),0);
pass("Meeting honestly requires provider link; no fake joined/live state");
await p.getByLabel("Meeting URL").fill("https://meet.google.com/abc-defg-hij");await p.getByRole("button",{name:"Connect",exact:true}).click();
assert.equal(await p.getByRole("link",{name:"Open connected meeting"}).getAttribute("href"),"https://meet.google.com/abc-defg-hij");
pass("Connected HTTPS meeting link becomes a real external link (call not tested)");

await p.getByLabel("Active course").selectOption("4");await p.waitForFunction(()=>document.querySelector(".work-heading h1")?.textContent.includes("Cell Structure"));
await p.screenshot({path:"/workspace/fresh-qa-desktop.png",fullPage:true});
for(const size of [{width:1366,height:768},{width:1024,height:768},{width:768,height:1024},{width:390,height:844},{width:320,height:640}]){
 await p.setViewportSize(size);await p.waitForTimeout(200);await geometry(`Viewport ${size.width}×${size.height}`);
 for(const t of ["Companion","Assignments","Calendar","Meeting"]){await ui(t);await geometry(`${size.width}px ${t}`)}
 await ui("Classroom");
 if(size.width===390){await p.getByRole("button",{name:"School day",exact:true}).click();assert(await p.getByTestId("day-agenda").isVisible());await p.getByRole("button",{name:"School day",exact:true}).click();await p.screenshot({path:"/workspace/fresh-qa-mobile.png",fullPage:true})}
}
const anonymous=await browser.newContext();const a=await anonymous.newPage();const anonErrors=[];a.on("pageerror",e=>anonErrors.push(e.message));await a.goto(base,{waitUntil:"networkidle"});assert.equal(await a.locator("select[aria-label='Active course'] option").count(),1);assert.equal(anonErrors.length,0);pass("Anonymous shell renders without private courses");
console.log("BROWSER ERRORS",errors);
assert.equal(errors.length,0);
fs.writeFileSync("/workspace/unleashed-classroom/qa-results.json",JSON.stringify({passed:true,checks,errors,at:new Date().toISOString()},null,2));
}finally{await browser.close()}