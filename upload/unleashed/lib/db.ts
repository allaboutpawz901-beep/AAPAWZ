import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import type { Companion, CourseRecord } from "./types";

const databasePath =
  process.env.UNLEASHED_DB_PATH ?? path.join(process.cwd(), "data", "unleashed.db");

let database: DatabaseSync | null = null;

function db() {
  if (!database) {
    database = new DatabaseSync(databasePath);
    database.exec(`
      PRAGMA journal_mode = WAL;
      PRAGMA foreign_keys = ON;

      CREATE TABLE IF NOT EXISTS courses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        owner_id TEXT NOT NULL,
        state TEXT NOT NULL,
        area TEXT NOT NULL,
        statute TEXT NOT NULL,
        grade TEXT NOT NULL,
        title TEXT NOT NULL,
        companion_json TEXT NOT NULL,
        model TEXT NOT NULL,
        created_at TEXT NOT NULL
      );

      CREATE INDEX IF NOT EXISTS courses_owner_created
        ON courses(owner_id, created_at DESC);

      CREATE TABLE IF NOT EXISTS professor_messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        owner_id TEXT NOT NULL,
        course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
        role TEXT NOT NULL CHECK(role IN ('learner', 'professor')),
        content TEXT NOT NULL,
        created_at TEXT NOT NULL
      );

      CREATE INDEX IF NOT EXISTS messages_owner_course
        ON professor_messages(owner_id, course_id, id);

      CREATE TABLE IF NOT EXISTS dashboard_professor_messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        owner_id TEXT NOT NULL,
        lesson_id TEXT NOT NULL,
        role TEXT NOT NULL CHECK(role IN ('learner', 'professor')),
        content TEXT NOT NULL,
        created_at TEXT NOT NULL
      );

      CREATE INDEX IF NOT EXISTS dashboard_messages_owner_lesson
        ON dashboard_professor_messages(owner_id, lesson_id, id);

      CREATE TABLE IF NOT EXISTS learner_notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        owner_id TEXT NOT NULL,
        course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        body TEXT NOT NULL,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );
      CREATE INDEX IF NOT EXISTS learner_notes_owner ON learner_notes(owner_id, updated_at DESC);

      CREATE TABLE IF NOT EXISTS learner_events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        owner_id TEXT NOT NULL,
        course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        starts_at TEXT NOT NULL,
        kind TEXT NOT NULL,
        created_at TEXT NOT NULL
      );
      CREATE INDEX IF NOT EXISTS learner_events_owner ON learner_events(owner_id, starts_at);

      CREATE TABLE IF NOT EXISTS learner_files (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        owner_id TEXT NOT NULL,
        course_id INTEGER REFERENCES courses(id) ON DELETE SET NULL,
        name TEXT NOT NULL,
        mime TEXT NOT NULL,
        size INTEGER NOT NULL,
        data BLOB NOT NULL,
        created_at TEXT NOT NULL
      );
      CREATE INDEX IF NOT EXISTS learner_files_owner ON learner_files(owner_id, created_at DESC);

      CREATE TABLE IF NOT EXISTS learner_assignment_state (
        owner_id TEXT NOT NULL,
        course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
        assignment_key TEXT NOT NULL,
        status TEXT NOT NULL,
        score INTEGER,
        updated_at TEXT NOT NULL,
        PRIMARY KEY(owner_id, course_id, assignment_key)
      );

      CREATE TABLE IF NOT EXISTS learner_messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        owner_id TEXT NOT NULL,
        sender TEXT NOT NULL,
        recipient TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at TEXT NOT NULL
      );
      CREATE INDEX IF NOT EXISTS learner_messages_owner ON learner_messages(owner_id, created_at);

      CREATE TABLE IF NOT EXISTS learner_evidence (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        owner_id TEXT NOT NULL,
        course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
        kind TEXT NOT NULL,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at TEXT NOT NULL
      );
      CREATE INDEX IF NOT EXISTS learner_evidence_owner ON learner_evidence(owner_id, created_at DESC);
    `);
  }
  return database;
}

type CourseRow = {
  id: number;
  state: string;
  area: string;
  statute: string;
  grade: string;
  title: string;
  companion_json: string;
  model: string;
  created_at: string;
};

function mapCourse(row: CourseRow): CourseRecord {
  return {
    id: row.id,
    state: row.state,
    area: row.area,
    statute: row.statute,
    grade: row.grade,
    title: row.title,
    companion: JSON.parse(row.companion_json) as Companion,
    model: row.model,
    createdAt: row.created_at,
  };
}

export function saveCourse(
  ownerId: string,
  selection: { state: string; area: string; statute: string; grade: string },
  companion: Companion,
  model: string,
) {
  const createdAt = new Date().toISOString();
  const result = db()
    .prepare(`
      INSERT INTO courses
        (owner_id, state, area, statute, grade, title, companion_json, model, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)
    .run(
      ownerId,
      selection.state,
      selection.area,
      selection.statute,
      selection.grade,
      companion.title,
      JSON.stringify(companion),
      model,
      createdAt,
    );
  return getCourse(ownerId, Number(result.lastInsertRowid));
}

export function listCourses(ownerId: string): CourseRecord[] {
  const rows = db()
    .prepare(`
      SELECT id, state, area, statute, grade, title, companion_json, model, created_at
      FROM courses WHERE owner_id = ? ORDER BY created_at DESC LIMIT 50
    `)
    .all(ownerId) as unknown as CourseRow[];
  return rows.map(mapCourse);
}

export function getCourse(ownerId: string, id: number): CourseRecord | null {
  const row = db()
    .prepare(`
      SELECT id, state, area, statute, grade, title, companion_json, model, created_at
      FROM courses WHERE owner_id = ? AND id = ?
    `)
    .get(ownerId, id) as unknown as CourseRow | undefined;
  return row ? mapCourse(row) : null;
}

export function listMessages(ownerId: string, courseId: number) {
  return db()
    .prepare(`
      SELECT id, role, content, created_at AS createdAt
      FROM professor_messages
      WHERE owner_id = ? AND course_id = ?
      ORDER BY id ASC LIMIT 100
    `)
    .all(ownerId, courseId) as unknown as Array<{
      id: number;
      role: "learner" | "professor";
      content: string;
      createdAt: string;
    }>;
}

export function saveMessage(
  ownerId: string,
  courseId: number,
  role: "learner" | "professor",
  content: string,
) {
  db()
    .prepare(`
      INSERT INTO professor_messages (owner_id, course_id, role, content, created_at)
      VALUES (?, ?, ?, ?, ?)
    `)
    .run(ownerId, courseId, role, content, new Date().toISOString());
}

export function listDashboardProfessorMessages(ownerId: string, lessonId: string) {
  return db()
    .prepare(`
      SELECT id, role, content, created_at AS createdAt
      FROM dashboard_professor_messages
      WHERE owner_id = ? AND lesson_id = ?
      ORDER BY id ASC LIMIT 100
    `)
    .all(ownerId, lessonId) as unknown as Array<{
      id: number;
      role: "learner" | "professor";
      content: string;
      createdAt: string;
    }>;
}

export function saveDashboardProfessorMessage(
  ownerId: string,
  lessonId: string,
  role: "learner" | "professor",
  content: string,
) {
  db()
    .prepare(`
      INSERT INTO dashboard_professor_messages
        (owner_id, lesson_id, role, content, created_at)
      VALUES (?, ?, ?, ?, ?)
    `)
    .run(ownerId, lessonId, role, content, new Date().toISOString());
}


export type WorkspaceNote = {
  id: number; courseId: number | null; title: string; body: string;
  createdAt: string; updatedAt: string;
};
export type WorkspaceEvent = {
  id: number; courseId: number | null; title: string; startsAt: string; kind: string;
};
export type WorkspaceFile = {
  id: number; courseId: number | null; name: string; mime: string; size: number; createdAt: string;
};
export type AssignmentState = {
  courseId: number; assignmentKey: string; status: string; score: number | null; updatedAt: string;
};

export function listWorkspaceNotes(ownerId: string) {
  return db().prepare(`SELECT id, course_id AS courseId, title, body, created_at AS createdAt,
    updated_at AS updatedAt FROM learner_notes WHERE owner_id=? ORDER BY updated_at DESC LIMIT 100`)
    .all(ownerId) as unknown as WorkspaceNote[];
}
export function saveWorkspaceNote(ownerId: string, input: {id?: number; courseId?: number|null; title: string; body: string}) {
  const now = new Date().toISOString();
  if (input.id) {
    db().prepare(`UPDATE learner_notes SET title=?, body=?, course_id=?, updated_at=? WHERE owner_id=? AND id=?`)
      .run(input.title, input.body, input.courseId ?? null, now, ownerId, input.id);
    return input.id;
  }
  const r = db().prepare(`INSERT INTO learner_notes(owner_id,course_id,title,body,created_at,updated_at)
    VALUES(?,?,?,?,?,?)`).run(ownerId,input.courseId ?? null,input.title,input.body,now,now);
  return Number(r.lastInsertRowid);
}
export function deleteWorkspaceNote(ownerId: string, id: number) {
  db().prepare(`DELETE FROM learner_notes WHERE owner_id=? AND id=?`).run(ownerId,id);
}

export function listWorkspaceEvents(ownerId: string) {
  return db().prepare(`SELECT id, course_id AS courseId, title, starts_at AS startsAt, kind
    FROM learner_events WHERE owner_id=? ORDER BY starts_at ASC LIMIT 100`)
    .all(ownerId) as unknown as WorkspaceEvent[];
}
export function saveWorkspaceEvent(ownerId: string, input: {courseId?: number|null;title:string;startsAt:string;kind:string}) {
  const r=db().prepare(`INSERT INTO learner_events(owner_id,course_id,title,starts_at,kind,created_at)
    VALUES(?,?,?,?,?,?)`).run(ownerId,input.courseId??null,input.title,input.startsAt,input.kind,new Date().toISOString());
  return Number(r.lastInsertRowid);
}
export function deleteWorkspaceEvent(ownerId:string,id:number){
  db().prepare(`DELETE FROM learner_events WHERE owner_id=? AND id=?`).run(ownerId,id);
}

export function listWorkspaceFiles(ownerId: string) {
  return db().prepare(`SELECT id, course_id AS courseId, name, mime, size, created_at AS createdAt
    FROM learner_files WHERE owner_id=? ORDER BY created_at DESC LIMIT 100`)
    .all(ownerId) as unknown as WorkspaceFile[];
}
export function saveWorkspaceFile(ownerId:string,input:{courseId?:number|null;name:string;mime:string;data:Uint8Array}){
  const r=db().prepare(`INSERT INTO learner_files(owner_id,course_id,name,mime,size,data,created_at)
    VALUES(?,?,?,?,?,?,?)`).run(ownerId,input.courseId??null,input.name,input.mime,input.data.byteLength,input.data,new Date().toISOString());
  return Number(r.lastInsertRowid);
}
export function getWorkspaceFile(ownerId:string,id:number){
  return db().prepare(`SELECT name,mime,data FROM learner_files WHERE owner_id=? AND id=?`).get(ownerId,id) as
    unknown as {name:string;mime:string;data:Uint8Array}|undefined;
}
export function deleteWorkspaceFile(ownerId:string,id:number){
  db().prepare(`DELETE FROM learner_files WHERE owner_id=? AND id=?`).run(ownerId,id);
}

export function listAssignmentStates(ownerId:string){
  return db().prepare(`SELECT course_id AS courseId, assignment_key AS assignmentKey,status,score,
    updated_at AS updatedAt FROM learner_assignment_state WHERE owner_id=?`).all(ownerId) as unknown as AssignmentState[];
}
export function saveAssignmentState(ownerId:string,input:{courseId:number;assignmentKey:string;status:string;score?:number|null}){
  db().prepare(`INSERT INTO learner_assignment_state(owner_id,course_id,assignment_key,status,score,updated_at)
    VALUES(?,?,?,?,?,?) ON CONFLICT(owner_id,course_id,assignment_key) DO UPDATE SET
    status=excluded.status,score=excluded.score,updated_at=excluded.updated_at`)
    .run(ownerId,input.courseId,input.assignmentKey,input.status,input.score??null,new Date().toISOString());
}

export function listWorkspaceMessages(ownerId:string){
  return db().prepare(`SELECT id,sender,recipient,content,created_at AS createdAt FROM learner_messages
    WHERE owner_id=? ORDER BY id ASC LIMIT 200`).all(ownerId) as unknown as Array<{id:number;sender:string;recipient:string;content:string;createdAt:string}>;
}
export function saveWorkspaceMessage(ownerId:string,input:{sender:string;recipient:string;content:string}){
  const r=db().prepare(`INSERT INTO learner_messages(owner_id,sender,recipient,content,created_at)
    VALUES(?,?,?,?,?)`).run(ownerId,input.sender,input.recipient,input.content,new Date().toISOString());
  return Number(r.lastInsertRowid);
}

export type LearningEvidence = {
  id:number; courseId:number; kind:string; title:string; content:string; createdAt:string;
};
export function listLearningEvidence(ownerId:string){
  return db().prepare(`SELECT id,course_id AS courseId,kind,title,content,created_at AS createdAt
    FROM learner_evidence WHERE owner_id=? ORDER BY id DESC LIMIT 100`).all(ownerId) as unknown as LearningEvidence[];
}
export function saveLearningEvidence(ownerId:string,input:{courseId:number;kind:string;title:string;content:string}){
  const r=db().prepare(`INSERT INTO learner_evidence(owner_id,course_id,kind,title,content,created_at)
    VALUES(?,?,?,?,?,?)`).run(ownerId,input.courseId,input.kind,input.title,input.content,new Date().toISOString());
  return Number(r.lastInsertRowid);
}

export function workspaceSummary(ownerId:string){
  const count=(table:string)=>Number((db().prepare(`SELECT COUNT(1) AS n FROM ${table} WHERE owner_id=?`).get(ownerId) as any).n);
  return {notes:count("learner_notes"),events:count("learner_events"),files:count("learner_files"),
    messages:count("learner_messages"),evidence:count("learner_evidence"),assignmentStates:listAssignmentStates(ownerId)};
}
// ---- Governed learning Day + append-only event projection ----
type DayCommand = {
  state?: string;
  currentLesson?: number;
  currentItem?: string;
  cycleStep?: number;
  sentiment?: string;
  breakEndsAt?: string|null;
  priorState?: string|null;
  activeWorkKind?: "LESSON"|"ASSIGNMENT"|"QUIZ";
  activeWorkKey?: string|null;
  activeWorkTitle?: string|null;
  eventType: string;
  payload: Record<string, unknown>;
};

function ensureDaySchema() {
  db().exec(`
    CREATE TABLE IF NOT EXISTS learning_days (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      owner_id TEXT NOT NULL,
      course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
      mode TEXT NOT NULL CHECK(mode IN ('SPRINT','SHIFT','FULL_DAY')),
      state TEXT NOT NULL,
      current_lesson INTEGER NOT NULL DEFAULT 0,
      current_item TEXT NOT NULL,
      cycle_step INTEGER NOT NULL DEFAULT 0,
      sentiment TEXT,
      opened_at TEXT NOT NULL,
      scheduled_close_at TEXT NOT NULL,
      break_ends_at TEXT,
      prior_state TEXT,
      closed_at TEXT,
      recap TEXT,
      homework TEXT,
      forecast TEXT,
      version INTEGER NOT NULL DEFAULT 1,
      updated_at TEXT NOT NULL
    );
    CREATE UNIQUE INDEX IF NOT EXISTS one_open_day_per_course
      ON learning_days(owner_id,course_id) WHERE closed_at IS NULL;

    CREATE TABLE IF NOT EXISTS learning_day_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      owner_id TEXT NOT NULL,
      day_id INTEGER NOT NULL REFERENCES learning_days(id) ON DELETE CASCADE,
      event_type TEXT NOT NULL,
      payload_json TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS day_events_timeline ON learning_day_events(owner_id,day_id,id);

    CREATE TABLE IF NOT EXISTS learning_attempts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      owner_id TEXT NOT NULL,
      day_id INTEGER NOT NULL REFERENCES learning_days(id) ON DELETE CASCADE,
      course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
      lesson_index INTEGER NOT NULL,
      item_text TEXT NOT NULL,
      attempt_no INTEGER NOT NULL,
      response TEXT NOT NULL,
      score REAL NOT NULL,
      passed INTEGER NOT NULL,
      stage TEXT NOT NULL,
      misconception TEXT NOT NULL,
      feedback TEXT NOT NULL,
      evidence_summary TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS attempts_day ON learning_attempts(owner_id,day_id,id);

    CREATE TABLE IF NOT EXISTS human_need_queue (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      owner_id TEXT NOT NULL,
      day_id INTEGER NOT NULL REFERENCES learning_days(id) ON DELETE CASCADE,
      course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
      reason TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'OPEN',
      context_json TEXT NOT NULL,
      created_at TEXT NOT NULL,
      resolved_at TEXT
    );
    CREATE INDEX IF NOT EXISTS human_queue_status ON human_need_queue(owner_id,status,created_at);
  `);
  const addColumn=(table:string,column:string,definition:string)=>{
    const fields=db().prepare(`PRAGMA table_info(${table})`).all() as unknown as Array<{name:string}>;
    if(!fields.some(field=>field.name===column))db().exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
  };
  addColumn("learning_days","active_work_kind","TEXT NOT NULL DEFAULT 'LESSON'");
  addColumn("learning_days","active_work_key","TEXT");
  addColumn("learning_days","active_work_title","TEXT");
  addColumn("learning_attempts","work_kind","TEXT NOT NULL DEFAULT 'LESSON'");
  addColumn("learning_attempts","work_key","TEXT");
}

function appendDayEvent(ownerId:string, dayId:number, eventType:string, payload:Record<string,unknown>) {
  db().prepare(`INSERT INTO learning_day_events(owner_id,day_id,event_type,payload_json,created_at)
    VALUES(?,?,?,?,?)`).run(ownerId,dayId,eventType,JSON.stringify(payload),new Date().toISOString());
}

function courseFirstItem(ownerId:string, courseId:number) {
  const course=getCourse(ownerId,courseId);
  const first=course?.companion.sections?.[0];
  return first?.checks?.[0] || `Explain the central idea of ${first?.title || course?.title || "this lesson"} in your own words.`;
}

export function openLearningDay(ownerId:string,courseId:number,mode:"SPRINT"|"SHIFT"|"FULL_DAY") {
  ensureDaySchema();
  const active=db().prepare(`SELECT id FROM learning_days WHERE owner_id=? AND course_id=? AND closed_at IS NULL ORDER BY id DESC LIMIT 1`)
    .get(ownerId,courseId) as {id:number}|undefined;
  if(active) return active.id;
  const duration=mode==="FULL_DAY"?480:mode==="SHIFT"?120:45;
  const now=new Date();
  const result=db().prepare(`INSERT INTO learning_days
    (owner_id,course_id,mode,state,current_item,opened_at,scheduled_close_at,updated_at)
    VALUES(?,?,?,?,?,?,?,?)`).run(
      ownerId,courseId,mode,"CHECK_IN",courseFirstItem(ownerId,courseId),
      now.toISOString(),new Date(now.getTime()+duration*60000).toISOString(),now.toISOString()
    );
  const id=Number(result.lastInsertRowid);
  appendDayEvent(ownerId,id,"DAY_OPENED",{mode,durationMinutes:duration});
  return id;
}

export function commandLearningDay(ownerId:string,dayId:number,command:DayCommand) {
  ensureDaySchema();
  const current=db().prepare(`SELECT * FROM learning_days WHERE owner_id=? AND id=?`).get(ownerId,dayId) as any;
  if(!current) throw new Error("Learning Day not found.");
  const state=command.state ?? current.state;
  const lesson=command.currentLesson ?? current.current_lesson;
  const item=command.currentItem ?? current.current_item;
  const cycle=command.cycleStep ?? current.cycle_step;
  const sentiment=command.sentiment ?? current.sentiment;
  const breakEnds=command.breakEndsAt === undefined ? current.break_ends_at : command.breakEndsAt;
  const prior=command.priorState === undefined ? current.prior_state : command.priorState;
  const workKind=command.activeWorkKind ?? current.active_work_kind ?? "LESSON";
  const workKey=command.activeWorkKey === undefined ? current.active_work_key : command.activeWorkKey;
  const workTitle=command.activeWorkTitle === undefined ? current.active_work_title : command.activeWorkTitle;
  db().prepare(`UPDATE learning_days SET state=?,current_lesson=?,current_item=?,cycle_step=?,
    sentiment=?,break_ends_at=?,prior_state=?,active_work_kind=?,active_work_key=?,active_work_title=?,
    version=version+1,updated_at=? WHERE owner_id=? AND id=?`)
    .run(state,lesson,item,cycle,sentiment,breakEnds,prior,workKind,workKey,workTitle,new Date().toISOString(),ownerId,dayId);
  appendDayEvent(ownerId,dayId,command.eventType,{fromState:current.state,toState:state,...command.payload});
}

export function recordLearningAttempt(ownerId:string,dayId:number,courseId:number,input:{
  lessonIndex:number;item:string;attemptNo:number;response:string;score:number;passed:boolean;stage:string;
  misconception:string;feedback:string;evidenceSummary:string;workKind?:"LESSON"|"ASSIGNMENT"|"QUIZ";workKey?:string|null;
}) {
  ensureDaySchema();
  db().prepare(`INSERT INTO learning_attempts
    (owner_id,day_id,course_id,lesson_index,item_text,attempt_no,response,score,passed,stage,
     misconception,feedback,evidence_summary,work_kind,work_key,created_at)
    VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`).run(
      ownerId,dayId,courseId,input.lessonIndex,input.item,input.attemptNo,input.response,input.score,
      input.passed?1:0,input.stage,input.misconception||"",input.feedback||"",input.evidenceSummary||"",
      input.workKind||"LESSON",input.workKey??null,new Date().toISOString()
    );
}

export function createHumanNeed(ownerId:string,dayId:number,courseId:number,context:Record<string,unknown>) {
  ensureDaySchema();
  const reason=String(context.reason||"Human support requested");
  const existing=db().prepare(`SELECT id FROM human_need_queue WHERE owner_id=? AND day_id=? AND status='OPEN' LIMIT 1`)
    .get(ownerId,dayId) as {id:number}|undefined;
  if(existing) {
    db().prepare(`UPDATE human_need_queue SET reason=?,context_json=? WHERE owner_id=? AND id=?`)
      .run(reason,JSON.stringify(context),ownerId,existing.id);
    return existing.id;
  }
  const result=db().prepare(`INSERT INTO human_need_queue(owner_id,day_id,course_id,reason,status,context_json,created_at)
    VALUES(?,?,?,?,'OPEN',?,?)`).run(ownerId,dayId,courseId,reason,JSON.stringify(context),new Date().toISOString());
  return Number(result.lastInsertRowid);
}

export function resolveHumanNeed(ownerId:string,id:number,resolution:string) {
  ensureDaySchema();
  const row=db().prepare(`SELECT day_id AS dayId,context_json AS context FROM human_need_queue WHERE owner_id=? AND id=?`)
    .get(ownerId,id) as {dayId:number;context:string}|undefined;
  if(!row) throw new Error("Queue item not found.");
  db().prepare(`UPDATE human_need_queue SET status='RESOLVED',resolved_at=? WHERE owner_id=? AND id=?`)
    .run(new Date().toISOString(),ownerId,id);
  appendDayEvent(ownerId,row.dayId,"HUMAN_NEED_RESOLVED",{resolution});
}

export function closeLearningDay(ownerId:string,dayId:number,input:{recap:string;homework:string;forecast:string}) {
  ensureDaySchema();
  const now=new Date().toISOString();
  db().prepare(`UPDATE learning_days SET state='CLOSED',closed_at=?,recap=?,homework=?,forecast=?,
    version=version+1,updated_at=? WHERE owner_id=? AND id=?`)
    .run(now,input.recap,input.homework,input.forecast,now,ownerId,dayId);
  appendDayEvent(ownerId,dayId,"DAY_CLOSED",input);
}

function mapDay(row:any) {
  if(!row) return null;
  return {
    id:row.id,courseId:row.course_id,mode:row.mode,state:row.state,currentLesson:row.current_lesson,
    currentItem:row.current_item,cycleStep:row.cycle_step,activeWorkKind:row.active_work_kind||"LESSON",
    activeWorkKey:row.active_work_key,activeWorkTitle:row.active_work_title,
    sentiment:row.sentiment,openedAt:row.opened_at,
    scheduledCloseAt:row.scheduled_close_at,breakEndsAt:row.break_ends_at,priorState:row.prior_state,
    closedAt:row.closed_at,recap:row.recap,homework:row.homework,forecast:row.forecast,version:row.version,
    updatedAt:row.updated_at,
  };
}

export function getLearningDaySnapshot(ownerId:string,courseId:number) {
  ensureDaySchema();
  const row=db().prepare(`SELECT * FROM learning_days WHERE owner_id=? AND course_id=? ORDER BY id DESC LIMIT 1`)
    .get(ownerId,courseId) as any;
  if(!row) return null;
  const events=(db().prepare(`SELECT id,event_type AS eventType,payload_json AS payload,created_at AS createdAt
    FROM learning_day_events WHERE owner_id=? AND day_id=? ORDER BY id`).all(ownerId,row.id) as any[])
    .map(e=>({...e,payload:JSON.parse(e.payload)}));
  const attempts=(db().prepare(`SELECT id,lesson_index AS lessonIndex,item_text AS item,attempt_no AS attemptNo,
    response,score,passed,stage,misconception,feedback,evidence_summary AS evidenceSummary,
    work_kind AS workKind,work_key AS workKey,created_at AS createdAt
    FROM learning_attempts WHERE owner_id=? AND day_id=? ORDER BY id`).all(ownerId,row.id) as any[])
    .map(a=>({...a,passed:Boolean(a.passed)}));
  const queue=(db().prepare(`SELECT id,reason,status,context_json AS context,created_at AS createdAt,resolved_at AS resolvedAt
    FROM human_need_queue WHERE owner_id=? AND day_id=? ORDER BY id DESC`).all(ownerId,row.id) as any[])
    .map(q=>({...q,context:JSON.parse(q.context)}));
  const passedLessons=new Set(attempts.filter(a=>a.passed&&a.workKind==="LESSON").map(a=>a.lessonIndex));
  const openedAt=new Date(row.opened_at).getTime();
  const endedAt=row.closed_at?new Date(row.closed_at).getTime():Date.now();
  let cursor=openedAt,activeMs=0,paused=false;
  for(const event of events){
    const at=new Date(event.createdAt).getTime();
    if(event.eventType==="BREAK_STARTED"){
      if(!paused)activeMs+=Math.max(0,at-cursor);
      paused=true;
    }else if(event.eventType==="BREAK_ENDED"){
      paused=false;cursor=at;
    }
  }
  if(!paused)activeMs+=Math.max(0,endedAt-cursor);
  return {
    day:mapDay(row),events,attempts,queue,
    metrics:{activeMinutes:Math.floor(activeMs/60000),demonstratedLessons:passedLessons.size,evidenceCount:attempts.filter(a=>a.passed).length},
  };
}

export function listInstructorDaySnapshots(ownerId:string) {
  ensureDaySchema();
  const rows=db().prepare(`SELECT d.*,c.title AS course_title,c.area AS course_area
    FROM learning_days d JOIN courses c ON c.id=d.course_id
    WHERE d.owner_id=? AND d.id IN (
      SELECT MAX(id) FROM learning_days WHERE owner_id=? GROUP BY course_id
    ) ORDER BY d.id DESC LIMIT 30`).all(ownerId,ownerId) as any[];
  return rows.map(row=>{
    const snapshot=getLearningDaySnapshot(ownerId,row.course_id);
    return {...snapshot,courseTitle:row.course_title,courseArea:row.course_area,learnerName:"Avery Johnson"};
  });
}// ---- Multi-course school Day projection ----
function ensureSchoolSchema(){
  db().exec(`
    CREATE TABLE IF NOT EXISTS course_enrollments(
      owner_id TEXT NOT NULL,course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
      level TEXT NOT NULL,deficiency_focus TEXT,priority TEXT NOT NULL DEFAULT 'Low',enrolled_at TEXT NOT NULL,
      PRIMARY KEY(owner_id,course_id)
    );
    CREATE TABLE IF NOT EXISTS school_schedule_blocks(
      id INTEGER PRIMARY KEY AUTOINCREMENT,owner_id TEXT NOT NULL,school_date TEXT NOT NULL,
      course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,block_type TEXT NOT NULL,title TEXT NOT NULL,
      starts_at TEXT NOT NULL,ends_at TEXT NOT NULL,status TEXT NOT NULL DEFAULT 'UPCOMING',
      deficiency_focus TEXT,sequence INTEGER NOT NULL
    );
    CREATE INDEX IF NOT EXISTS school_schedule_owner_date ON school_schedule_blocks(owner_id,school_date,sequence);
    CREATE TABLE IF NOT EXISTS gradebook_entries(
      id INTEGER PRIMARY KEY AUTOINCREMENT,owner_id TEXT NOT NULL,course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
      title TEXT NOT NULL,category TEXT NOT NULL,score REAL,possible REAL,status TEXT NOT NULL,feedback TEXT,graded_at TEXT
    );
    CREATE TABLE IF NOT EXISTS classroom_meetings(
      id INTEGER PRIMARY KEY AUTOINCREMENT,owner_id TEXT NOT NULL,course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
      title TEXT NOT NULL,starts_at TEXT NOT NULL,ends_at TEXT NOT NULL,room TEXT NOT NULL,status TEXT NOT NULL DEFAULT 'SCHEDULED'
    );
  `);
}

export function getSchoolSnapshot(ownerId:string){
  ensureSchoolSchema();
  const todayParts=new Intl.DateTimeFormat("en-US",{timeZone:"America/Chicago",year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(new Date());
  const pick=(type:string)=>todayParts.find(part=>part.type===type)?.value||"";
  const today=`${pick("year")}-${pick("month")}-${pick("day")}`;
  const enrollments=db().prepare(`
    SELECT c.id AS courseId,c.title,c.area,c.grade,c.state,c.companion_json AS companionJson,
      e.level,e.deficiency_focus AS deficiencyFocus,e.priority,e.enrolled_at AS enrolledAt
    FROM course_enrollments e JOIN courses c ON c.id=e.course_id
    WHERE e.owner_id=?
    ORDER BY CASE e.priority WHEN 'High' THEN 1 WHEN 'Medium' THEN 2 ELSE 3 END,c.title
  `).all(ownerId) as any[];
  const hasToday=db().prepare("SELECT id FROM school_schedule_blocks WHERE owner_id=? AND school_date=? LIMIT 1").get(ownerId,today);
  const latestDate=db().prepare("SELECT MAX(school_date) AS date FROM school_schedule_blocks WHERE owner_id=?").get(ownerId) as {date:string|null}|undefined;
  const displayedDate=hasToday?today:latestDate?.date||today;
  const schedule=db().prepare(`
    SELECT s.id,s.course_id AS courseId,s.block_type AS blockType,s.title,s.starts_at AS startsAt,
      s.ends_at AS endsAt,s.status,s.deficiency_focus AS deficiencyFocus,s.sequence,c.area,c.title AS courseTitle
    FROM school_schedule_blocks s LEFT JOIN courses c ON c.id=s.course_id
    WHERE s.owner_id=? AND s.school_date=? ORDER BY s.sequence
  `).all(ownerId,displayedDate) as any[];
  const grades=db().prepare(`
    SELECT g.id,g.course_id AS courseId,c.title AS courseTitle,g.title,g.category,g.score,g.possible,
      g.status,g.feedback,g.graded_at AS gradedAt
    FROM gradebook_entries g JOIN courses c ON c.id=g.course_id
    WHERE g.owner_id=? ORDER BY COALESCE(g.graded_at,'9999') DESC,g.id DESC
  `).all(ownerId) as any[];
  const meetings=db().prepare(`
    SELECT m.id,m.course_id AS courseId,m.title,m.starts_at AS startsAt,m.ends_at AS endsAt,m.room,m.status,
      c.title AS courseTitle
    FROM classroom_meetings m LEFT JOIN courses c ON c.id=m.course_id
    WHERE m.owner_id=? ORDER BY m.starts_at
  `).all(ownerId) as any[];
  const assignmentStates=listAssignmentStates(ownerId);
  const submissions=assignmentStates.filter((item:any)=>["Submitted","Completed"].includes(item.status)).map((item:any)=>{
    const enrollment=enrollments.find((course:any)=>course.courseId===item.courseId);
    const companion=enrollment?JSON.parse(enrollment.companionJson):null;
    const work=[
      ...(companion?.independentPractice||[]).map((title:string,index:number)=>({key:`practice-${index}`,title,kind:"Assignment"})),
      ...(companion?.appliedProject?[{key:"project",title:companion.appliedProject.title,kind:"Project"}]:[]),
      ...(companion?.sections||[]).flatMap((section:any,lessonIndex:number)=>(section.checks||[]).map((title:string,index:number)=>({key:`check-${lessonIndex}-${index}`,title,kind:"Quiz"}))),
    ].find((entry:any)=>entry.key===item.assignmentKey);
    return {...item,title:work?.title||item.assignmentKey,kind:work?.kind||"Assignment",courseTitle:enrollment?.title||"Course"};
  });
  return {
    schoolDate:displayedDate,
    currentDate:today,
    isHistoricalSchedule:displayedDate!==today,
    enrollments:enrollments.map(({companionJson,...item}:any)=>({
      ...item,
      lessonCount:(JSON.parse(companionJson).sections||[]).length,
      objectiveCount:(JSON.parse(companionJson).learningObjectives||[]).length,
      nextLesson:JSON.parse(companionJson).sections?.[0]?.title||item.title,
    })),
    schedule,grades,submissions,meetings,
    inbox:listWorkspaceMessages(ownerId).slice(-50).reverse(),
    resources:listWorkspaceFiles(ownerId),
    events:listWorkspaceEvents(ownerId),
  };
}

export function setMeetingStatus(ownerId:string,id:number,status:string){
  ensureSchoolSchema();
  if(!["SCHEDULED","JOINED","ENDED"].includes(status))throw new Error("Invalid meeting status.");
  db().prepare(`UPDATE classroom_meetings SET status=? WHERE owner_id=? AND id=?`).run(status,ownerId,id);
}

export function setScheduleBlockStatus(ownerId:string,id:number,status:string){
  ensureSchoolSchema();
  if(!["UPCOMING","CURRENT","COMPLETE"].includes(status))throw new Error("Invalid schedule status.");
  if(status==="CURRENT"){
    db().prepare(`UPDATE school_schedule_blocks SET status='UPCOMING'
      WHERE owner_id=? AND school_date=(SELECT school_date FROM school_schedule_blocks WHERE owner_id=? AND id=?)
      AND status='CURRENT'`).run(ownerId,ownerId,id);
  }
  db().prepare(`UPDATE school_schedule_blocks SET status=? WHERE owner_id=? AND id=?`).run(status,ownerId,id);
}
export function enrollGeneratedCourse(ownerId:string,courseId:number){ensureSchoolSchema();db().prepare("INSERT OR IGNORE INTO course_enrollments(owner_id,course_id,level,deficiency_focus,priority,enrolled_at) VALUES(?,?,'Not assessed',NULL,'Low',?)").run(ownerId,courseId,new Date().toISOString());}
