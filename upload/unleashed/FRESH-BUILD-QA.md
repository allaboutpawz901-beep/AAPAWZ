# UNLEASHED — fresh classroom build

Built as a separate React application, not patched onto the previous dashboard. Existing learner records were preserved.

## What was verified

- Desktop is one viewport; Professor and tool rail anchored
- 12 tools replace only the center; Professor does not move; no route change
- Atlas→Press source selector retained with grade reset; generation not run in this test
- Real Gemini Professor response in Biology
- Incorrect answer creates persisted reframe, not fake completion
- Typing stays focused through timer ticks; notes persist between surfaces
- Uploaded file saved and downloadable
- Classroom message persisted with server-derived attribution
- Calendar event creation persists
- Cross-course quiz: real acceptance, no fabricated grade, no lesson-mastery increment
- One-click hand raise → context queue → persisted co-host resolution
- Break enforced server-side across subject switching
- Reload resumes locked break, not another course
- Expired break resumes the saved state
- Meeting honestly requires provider link; no fake joined/live state
- Connected HTTPS meeting link becomes a real external link (call not tested)
- Viewport 1366×768
- 1366px Companion
- 1366px Assignments
- 1366px Calendar
- 1366px Meeting
- Viewport 1024×768
- 1024px Companion
- 1024px Assignments
- 1024px Calendar
- 1024px Meeting
- Viewport 768×1024
- 768px Companion
- 768px Assignments
- 768px Calendar
- 768px Meeting
- Viewport 390×844
- 390px Companion
- 390px Assignments
- 390px Calendar
- 390px Meeting
- Viewport 320×640
- 320px Companion
- 320px Assignments
- 320px Calendar
- 320px Meeting
- Anonymous shell renders without private courses

Production TypeScript and Next.js builds pass. Live service readiness checks the database, and the systemd unit is enabled for restarts. Desktop, laptop, tablet, and phone compositions were inspected. Functional testing used an isolated database copy and real Gemini calls.

## Explicit limitations

- Professor uses an AI portrait and browser speech, not a live video avatar. Audio playback and camera hardware were not validated in headless QA.
- Meetings require a real external provider link. The app can preview the local camera; it does not host an embedded conference. External call connection was not tested.
- Grades, support levels, enrollments and school schedule are labelled demonstration records. They are not measured learner outcomes.
- AI evaluation is formative, not certified mastery. Co-host review is a demonstration workspace role, not district RBAC or a roster.
- Inbox persistence works; external message delivery is not connected.
- Atlas selection/reset was tested. Press generation is wired to the existing API, but a new generation was not run in this QA pass.
- This is an interaction build for review, not district-production infrastructure.

Test completion: 2026-09-18T03:57:35.594Z
