# UNLEASHED Classroom — Unified Build Worklog

Source: uploaded `unleashed-fresh-source layout` (Next 15 + node:sqlite + PromptQL identity + Gemini-only).
Target: This Next 16 + Prisma + Tailwind/shadcn project.

## Goals (from user)
- Untangle & unify as a product; clean up; ship as a classroom.
- DO NOT delete the Gemini SDK.
- ADD the ZAI SDK (z-ai-web-dev-sdk, already installed in this project).

## Architecture decisions
- **DB:** Replace `node:sqlite` with Prisma (SQLite). All 17 tables → Prisma models.
- **Identity:** Replace PromptQL visitor-token headers with a local demo visitor ("Avery Johnson", id `demo-avery`) so the app runs standalone. Keep `getVisitor(request)` signature.
- **AI providers (unified):**
  - `lib/gemini.ts` — KEPT as-is (Gemini via PromptQL proxy). Used when `PROMPTQL_PLATFORM_API_URL` is set.
  - `lib/zai.ts` — NEW. Uses `z-ai-web-dev-sdk` (`ZAI.create()` → `chat.completions.create`). Matching signatures to Gemini.
  - `lib/ai.ts` — unified router. `AI_PROVIDER` env selects (`zai` default, `gemini` when configured). Re-exports `generateText`/`generateJson`/`modelLabel`.
  - API routes import from `@/lib/ai` instead of `@/lib/gemini` → keeps Gemini, adds ZAI, single switch point.
- **Design system:** Keep the cohesive custom CSS (warm paper/orange/green) — it IS the product identity. Merge into globals.css below Tailwind base.
- **Seed:** Author demo courses (Biology/Algebra/English/History) + today's schedule + enrollments + grades + meetings so the classroom ships alive.

## File map (target)
- `prisma/schema.prisma` — all classroom models
- `src/lib/visitor.ts`, `src/lib/types.ts`, `src/lib/atlas.ts`, `src/lib/gemini.ts`, `src/lib/zai.ts`, `src/lib/ai.ts`, `src/lib/db.ts`, `src/lib/seed.ts`
- `src/data/atlas.json`
- `src/app/api/{atlas,identity,courses,professor,classroom,school,workspace,workspace/files/[id],day,generate,learner-professor}/route.ts`
- `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`
- `src/components/classroom.tsx`, `src/components/course-builder.tsx`
- `public/professor.png`, `public/fonts/{dm-sans,manrope}.woff2`, `public/icon.svg`

---
Task ID: 1
Agent: main
Task: Write Prisma schema for all classroom models and push to DB.

Work Log:
- Reading source lib/db.ts (724 lines) to enumerate every table + column + relation.
- Authoring prisma/schema.prisma with 17 models mirroring the SQLite schema.
- Composite PKs for learner_assignment_state and course_enrollments.
- Bytes for learner_files.data; DateTime for all timestamps; Int autoincrement ids.
- Run `bun run db:push`.

Stage Summary:
- (in progress)

---
Task ID: 4
Agent: api-routes-porter
Task: Port 11 UNLEASHED API routes to Prisma-backed Next.js 16.

Work Log:
- Read all 11 source routes from /home/z/my-project/upload/unleashed/app/api/.
- Confirmed db.ts exports every required function as async (except `saveCourse` which is sync but returns a Promise via `.then` — awaiting works correctly).
- `atlas/route.ts` — no db/AI calls; only `listStates()` from `@/lib/atlas`. Kept `force-static`. No changes needed beyond file location.
- `identity/route.ts` — no db calls; `getVisitor` is sync (NOT awaited). Verbatim port.
- `courses/route.ts` — added `await` on `listCourses(visitor.id)`.
- `professor/route.ts` — switched `@/lib/gemini` → `@/lib/ai`. Added `await` on `getCourse`, `saveMessage`, `listMessages` (3 call sites: GET response, POST pre-call, POST after-reply).
- `classroom/route.ts` — added `await` on `listInstructorDaySnapshots`, `getLearningDaySnapshot`, `commandLearningDay` (2x), `resolveHumanNeed`.
- `school/route.ts` — added `await` on `getSchoolSnapshot`, `setMeetingStatus`, `setScheduleBlockStatus`, `listInstructorDaySnapshots` (called inside the spread on both GET + POST; wrapped with `(await ...)`).
- `workspace/route.ts` — converted `snapshot()` helper to `async function snapshot()` with each db call awaited individually. Added `await` to `saveWorkspaceFile`, `saveWorkspaceNote`, `deleteWorkspaceNote`, `saveWorkspaceEvent`, `deleteWorkspaceEvent`, `deleteWorkspaceFile`, `saveAssignmentState`, `saveWorkspaceMessage`, `saveLearningEvidence`, plus all 7 list/summary calls inside `snapshot()`. All calls in both GET and POST paths go through `await snapshot(v.id)`.
- `workspace/files/[id]/route.ts` — added `await` on `getWorkspaceFile`. Kept `await params` (already a Promise in Next 16). Preserved `f.data as BodyInit` and the file-download headers.
- `day/route.ts` (largest, ~400 lines) — switched `@/lib/gemini` → `@/lib/ai` for `generateJson`/`generateText`. Added `await` to: `listInstructorDaySnapshots` (2x), `getCourse` (2x), `getLearningDaySnapshot` (4x — incl. `let snapshot` init and final reassign), `listMessages` (3x), `openLearningDay`, `commandLearningDay` (8x across CHECK_IN/TAKE_BREAK/END_BREAK/START_ASSIGNMENT/RETURN_TO_LESSON/ADVANCE/RAISE_HAND/RESUME_WITH_PROFESSOR/ASK_PROFESSOR/SUBMIT_ATTEMPT), `closeLearningDay` (2x), `createHumanNeed` (2x), `recordLearningAttempt`, `saveAssignmentState` (2x), `saveMessage` (4x), `getSchoolSnapshot`. Preserved all prompts, the grading schema, control flow, and helper functions `currentLesson`/`currentCheck`/`courseAssignments` unchanged. `getVisitor` left sync.
- `generate/route.ts` — switched `@/lib/gemini` → `@/lib/ai`. Added `await` on `saveCourse` (returns a Promise) and `enrollGeneratedCourse`. Preserved `companionSchema`, atlas lookup, prompt, and companion-assembly logic verbatim.
- `learner-professor/route.ts` — switched `@/lib/gemini` → `@/lib/ai`. Added `await` on `listDashboardProfessorMessages` (3x), `saveDashboardProfessorMessage` (2x). Preserved `LESSON_ID`, `lessonGrounding`, `teachingContract` strings and the 401-vs-500 status branch.

Stage Summary:
- 11 routes written under `src/app/api/{atlas,identity,courses,professor,classroom,school,workspace,workspace/files/[id],day,generate,learner-professor}/route.ts`.
- Every db call in every route is now `await`ed (verified against `src/lib/db.ts` signature list — all 33 exported db functions are async except `saveCourse` which returns a thenable; awaiting both forms works).
- `getVisitor` left synchronous per spec.
- All `@/lib/gemini` imports in the 4 AI-using routes (professor, day, generate, learner-professor) were redirected to `@/lib/ai`; named exports `generateJson`, `generateText`, `modelLabel` match.
- Directives preserved: `runtime = "nodejs"` + `dynamic = "force-dynamic"` on all dynamic routes; `dynamic = "force-static"` on atlas.
- Lint result: `bunx eslint src/app/api` → clean (0 problems). `bun run lint` reports 1 pre-existing error in `upload/unleashed/next-env.d.ts` (triple-slash reference) — outside `src/app/api`, not touched per task constraints.
- TypeScript: `bunx tsc --noEmit` reports 0 errors in `src/app/api/*` (remaining errors are all in the `upload/unleashed/...` source folder, which is expected since the source still has sync db calls).
- No files outside `src/app/api/` were modified.

---
Task ID: 5
Agent: main
Task: Frontend — layout, page, design system, classroom component, assets.

Work Log:
- Copied professor.png + dm-sans/manrope woff2 fonts + icon.svg into public/ and src/app/.
- Wrote src/app/layout.tsx (UNLEASHED metadata, imports globals.css then classroom.css, keeps Toaster).
- Wrote src/app/page.tsx (renders <Classroom/>).
- Copied the cohesive classroom design system verbatim to src/app/classroom.css (warm paper/orange/green; 100dvh grid: header / room-grid / bottom-rail). Existing globals.css (Tailwind 4 + shadcn tokens) kept for Toaster compatibility; classroom.css loads after so its rules win.
- Copied src/components/classroom.tsx (219 lines) and course-builder.tsx verbatim — they consume the same API contracts, no changes needed.
- Removed old scaffold api/route.ts dependency concerns (it was standalone, left in place).

Stage Summary:
- Single route `/` renders the full UNLEASHED classroom. Design system intact. Fonts + portrait served from /public.

---
Task ID: 6
Agent: main
Task: Verify the unified classroom end-to-end with Agent Browser + VLM; fix issues.

Work Log:
- Lint: `bun run lint` → clean (0 problems) after adding upload/**, mini-services/**, tool-results/** to eslint ignores.
- Dev server compiled; all APIs return 200 (/api/identity seeds on first call, then /api/courses, /api/workspace, /api/school, /api/day).
- Browser open `/`: classroom renders — header (Avery Johnson, course switch, search, voice), left Professor panel + school-day agenda (9 blocks), center welcome "Biology starts here", right Attention & inbox rail, pinned bottom tool rail (12 tools + Co-host). No console/page errors.
- Golden path 1 — Professor (ZAI generateText): clicked "Begin this course block" → learning day opened with lesson + cell diagram + check. Clicked "Teach" → POST /api/day 200 (1.17s) → Professor replied with a grounded, <70-word response teaching the nucleus/DNA idea WITHOUT revealing the check answer, ending with a purposeful question.
- Golden path 2 — Attempt grading (ZAI generateJson): submitted reasoning → POST /api/day 200 (2.1s) → "Reasoning accepted · formative" with specific feedback; state transitioned to TEACHING ("Continue to next lesson"); workspace refreshed (assignment state persisted).
- Golden path 3 — Course construction (ZAI generateJson, full companion schema): in My Courses, selected Arizona/grade 10/"State and federal constitutions" → POST /api/generate 200 (24.1s) → "Arizona & U.S. Constitutions" companion (4 lessons) created + enrolled + added to course switcher.
- Grades view: seeded gradebook renders with "demonstration records" disclosure.
- Mobile (390×844): mobile-context bar with School day / Attention switches appears (designed compact-width behavior); bottom rail pinned.
- VLM screenshot review: "No visible issues… clean, modern, organized… distinct pinned navigation bar at the bottom… no overlapping elements, broken images, or awkward empty spaces."
- Reset DB + restarted dev for a clean ship state: re-seeded exactly 4 authored courses (Biology/Algebra/English/History) + today's schedule + enrollments + grades + meetings. Re-verified clean load.

Stage Summary:
- UNLEASHED classroom is shipped and browser-verified. All three AI paths (Professor text, attempt grading, course generation) work via the unified router → ZAI SDK (default). Gemini SDK preserved in lib/gemini.ts, switchable via AI_PROVIDER=gemini + PROMPTQL_PLATFORM_API_URL. Prisma-backed data layer, demo-seeded, single `/` route, cohesive design system, responsive, sticky bottom rail. No errors.
