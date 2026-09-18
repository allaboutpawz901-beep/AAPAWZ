# UNLEASHED — fresh classroom build

A new React/Next.js interface with a bounded classroom frame. This is not a restyle of the old learner component. The earlier application is retained separately.

## Composition
- Header: learner, active course, search and voice.
- Left: Professor and a single school-day agenda.
- Center: one replaceable working surface, with its own scrolling.
- Right: attention, recent submissions, quick notes and next scheduled block.
- Footer: tools remain anchored.
- Compact widths: Professor stays above the work; Day and Attention have explicit switches. The tool rail scrolls horizontally.

The work surface contains the lesson, overview, companion, courses, assignments, quizzes, grades, resources, notebook, calendar, inbox, files, meeting setup and co-host review. Changing a subject changes the companion and learning state, not the classroom composition.

## Behavior
Existing server APIs and SQLite records are retained. Gemini handles Professor replies and formative attempt evaluation. Notes, files, assignment states, calendar events, messages and intervention records persist. Draft answers and notes are local to the browser and course.

Atlas → Press course construction is inside My Courses. A generated companion becomes an enrollment. Its source context is shown, not represented as curriculum approval.

## Honest boundaries
- The teacher image is an AI-generated static portrait, not a live video avatar. Speech uses the browser's speech synthesis; availability varies by browser.
- Meeting supports a local camera preview and a real HTTPS provider link. It does not provide an embedded conferencing service. The link is saved locally to the browser; external calling was not tested.
- Enrollment levels, support targets, gradebook records and the schedule are demonstration data. They are not validated assessments or imported district records.
- AI-accepted reasoning is formative evidence, not certified mastery.
- Co-host review uses this visitor's workspace records. It is not production role-based district access or a cross-user classroom roster.
- Inbox messages are stored in the application; external delivery is not connected.
- The current seeded schedule is displayed with its actual date when there are no blocks for today.
- Production institutional security, identity/rosters, integrations, accessibility certification, safety evaluation and operational controls remain outstanding.

## Run
Node.js 24, npm.
```
npm ci
npm run build
UNLEASHED_DB_PATH=/absolute/path/to/unleashed.db PORT=8082 npm start
```
The app expects PromptQL visitor identity headers at the trusted proxy. The host platform provides `PROMPTQL_PLATFORM_API_URL`; Gemini requests use each visitor's token server-side. No credentials belong in client code.

Use an enabled persistent systemd unit, and `/readyz` for health. Readiness verifies database access.

## QA
`qa-functional.mjs` runs against an isolated database copy on port 8083. It makes real Gemini calls but does not alter the learner's live records. `qa-layout.mjs` checks live read-only renderings on port 8082.

A missing browser identity renders a nonpersonal shell. Source package deliberately excludes database records, environment files, dependencies, generated build output and test logs.
