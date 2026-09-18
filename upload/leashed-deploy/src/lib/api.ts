import type {
  AdminDashboard, Bootstrap, CompletionStatus, LearnerState, LearningPlayerState, LearningSession,
  LessonContent, SchoolPolicy, SchoolRuntime
} from "./types";

const ROOT = "/api/backend";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${ROOT}${path}`, {
    ...init,
    headers: {"Content-Type": "application/json", ...(init?.headers || {})}
  });
  if (!response.ok) {
    let message = "Something went wrong";
    try {
      const body = await response.json();
      message = body.detail || message;
    } catch {}
    throw new Error(message);
  }
  return response.json();
}

export const lmsApi = {
  bootstrap: () => request<Bootstrap>("/bootstrap"),
  enroll: (body: {pathCode: string; pace: string; goal: string; experience: string}) =>
    request<LearnerState>("/enroll", {method: "POST", body: JSON.stringify(body)}),
  progress: (body: {pathCode: string; moduleCode: string; action: string}) =>
    request<LearnerState>("/progress", {method: "POST", body: JSON.stringify(body)}),
  capstone: (body: {pathCode: string; itemIndex: number; completed: boolean}) =>
    request<LearnerState>("/capstone", {method: "POST", body: JSON.stringify(body)}),
  saveNote: (body: {moduleCode: string; content: string}) =>
    request<{saved: boolean; updatedAt: string}>("/note", {method: "POST", body: JSON.stringify(body)}),
  professor: (body: {moduleCode: string; message: string; mode: string}) =>
    request<{reply: string}>("/professor", {method: "POST", body: JSON.stringify(body)}),
  professorHistory: (moduleCode: string) =>
    request<{messages: Array<{role: string; content: string; created_at: string}>}>(`/professor/${encodeURIComponent(moduleCode)}`),
  content: (moduleCode: string) => request<LessonContent>(`/content/${encodeURIComponent(moduleCode)}`),
  adminContent: (moduleCode: string) => request<LessonContent>(`/admin/content/${encodeURIComponent(moduleCode)}`),
  architectDraft: (body: {moduleCode: string; operation: string; brief: string}) =>
    request<{created: boolean; version: number; status: string; content: LessonContent; guardrails: string[]}>("/admin/architect/draft", {
      method: "POST", body: JSON.stringify(body)
    }),
  schoolPolicy: () => request<SchoolPolicy>("/school/policy"),
  adminRuntime: () => request<SchoolRuntime>("/admin/runtime"),
  saveSchoolPolicy: (policy: SchoolPolicy) =>
    request<{saved: boolean; version: number; status: string; policy: SchoolPolicy}>("/admin/school/policy", {
      method: "PUT", body: JSON.stringify({policy, publish: true})
    }),
  learningPlayer: (pathCode: string, moduleCode: string) =>
    request<LearningPlayerState>(`/learning-player/${encodeURIComponent(pathCode)}/${encodeURIComponent(moduleCode)}`),
  learningPlayerAction: (body: {pathCode: string; moduleCode: string; action: string; stage?: string; phaseIndex?: number}) =>
    request<LearningPlayerState>("/learning-player/action", {method: "POST", body: JSON.stringify(body)}),
  completionStatus: (pathCode: string, moduleCode: string) =>
    request<CompletionStatus>(`/completion/${encodeURIComponent(pathCode)}/${encodeURIComponent(moduleCode)}`),
  reviewEvidence: (submissionId: number, decision: "approved" | "revision_required", note = "") =>
    request<{reviewed: boolean; decision: string}>("/admin/evidence/review", {
      method: "POST", body: JSON.stringify({submissionId, decision, note})
    }),
  reviewAssessment: (body: {userId: string; moduleCode: string; assessmentType: string; decision: "passed" | "revision_required"; note?: string}) =>
    request<{reviewed: boolean; decision: string}>("/admin/assessment/review", {
      method: "POST", body: JSON.stringify(body)
    }),
  currentSession: (moduleCode: string) =>
    request<{session: LearningSession | null; policy: SchoolPolicy}>(`/session/current/${encodeURIComponent(moduleCode)}`),
  openSession: (body: {pathCode: string; moduleCode: string; deliveryMode: string; learnerCondition: string}) =>
    request<{session: LearningSession; policy: SchoolPolicy; openingMessage: string}>("/session/open", {
      method: "POST", body: JSON.stringify(body)
    }),
  sessionAction: (body: {sessionId: number; action: string; breakId?: string}) =>
    request<{session: LearningSession; policy: SchoolPolicy}>("/session/action", {
      method: "POST", body: JSON.stringify(body)
    }),
  uploadAssignment: async (moduleCode: string, sessionId: number, file: File) => {
    const form = new FormData();
    form.append("moduleCode", moduleCode);
    form.append("sessionId", String(sessionId));
    form.append("file", file);
    const response = await fetch(`${ROOT}/session/assignment`, {method: "POST", body: form});
    if (!response.ok) {
      const body = await response.json().catch(() => ({detail: "Upload failed"}));
      throw new Error(body.detail || "Upload failed");
    }
    return response.json() as Promise<{uploaded: boolean; fileName: string; verificationStatus: string}>;
  },
  masteryAttempt: (body: {moduleCode: string; questionId: string; answer: string; sessionId: number}) =>
    request<{satisfactory: boolean; attempt: number; stage: string; coaching: string; citations: Array<{id: string; title: string; locator: string}>; answerRevealed: boolean}>("/mastery/attempt", {
      method: "POST", body: JSON.stringify(body)
    }),
  submitQuiz: (body: {moduleCode: string; assessmentType?: "quiz" | "exam"; answers: Record<string, string | number>; proctorEvents: string[]}) =>
    request<{score: number; passed: boolean; passingScore: number; humanReviewPending: boolean}>("/quiz/submit", {method: "POST", body: JSON.stringify(body)}),
  startTimer: (moduleCode: string) =>
    request<{moduleCode: string; startedAt: string; dueAt: string; durationHours: number}>("/timer/start", {method: "POST", body: JSON.stringify({moduleCode})}),
  adminDashboard: () => request<AdminDashboard>("/admin/dashboard"),
  saveLesson: (moduleCode: string, content: LessonContent, publish: boolean) =>
    request<{saved: boolean; version: number; status: string; content: LessonContent}>(`/admin/content/${encodeURIComponent(moduleCode)}`, {
      method: "PUT",
      body: JSON.stringify({content, publish})
    }),
  addCohost: (body: {name: string; email: string; role: string; permissions: string[]}) =>
    request<{invited: boolean; email: string; role: string}>("/admin/cohosts", {method: "POST", body: JSON.stringify(body)}),
  uploadMedia: async (moduleCode: string, kind: "image" | "video", file: File) => {
    const form = new FormData();
    form.append("moduleCode", moduleCode);
    form.append("kind", kind);
    form.append("file", file);
    const response = await fetch(`${ROOT}/media/upload`, {method: "POST", body: form});
    if (!response.ok) {
      const body = await response.json().catch(() => ({detail: "Upload failed"}));
      throw new Error(body.detail || "Upload failed");
    }
    return response.json() as Promise<{uploaded: boolean; kind: string; url: string; fileName: string; contentType: string; sizeBytes: number}>;
  }
};