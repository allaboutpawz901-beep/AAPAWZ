export type Module = {
  code: string;
  title: string;
  track: string;
  hours: number;
  level: string;
  description: string;
  evidence: string;
  sources: string[];
  safetyCritical: boolean;
};

export type Level = {
  name: string;
  description: string;
  modules: Module[];
};

export type Capstone = {
  code: string;
  title: string;
  description: string;
  deliverables: string[];
  rubric: string[];
};

export type Pathway = {
  code: string;
  title: string;
  credential: string;
  hours: number;
  level: string;
  accent: string;
  description: string;
  modules: Module[];
  levels: Level[];
  moduleCount: number;
  weeksFullTime: number;
  capstone: Capstone;
};

export type Curriculum = {
  brand: string;
  program: string;
  version: string;
  pathwayOrder: string[];
  credentialLadder: Array<{level: string; paths: string[]; description: string}>;
  moduleEvidenceModel: string[];
  completionStandard: string[];
  paths: Pathway[];
};

export type Enrollment = {
  user_id: string;
  path_code: string;
  pace: string;
  goal: string;
  experience: string;
  status: string;
  enrolled_at: string;
};

export type ModuleProgress = {
  user_id: string;
  path_code: string;
  module_code: string;
  status: string;
  percent: number;
  completed_at?: string;
  updated_at: string;
};

export type Summary = {
  completed: number;
  total: number;
  percent: number;
  currentModule: string;
};

export type LearnerState = {
  enrollments: Enrollment[];
  progress: Record<string, ModuleProgress>;
  summaries: Record<string, Summary>;
  capstones: Array<{path_code: string; item_index: number; completed: number}>;
  notes: Record<string, string>;
};

export type Citation = {
  id: string;
  title: string;
  author: string;
  type: string;
  locator: string;
  verificationStatus: string;
};

export type LessonContent = {
  moduleCode: string;
  pathCode: string;
  version: number;
  status: string;
  title: string;
  summary: string;
  estimatedMinutes: number;
  overnightWork: {enabled: boolean; durationHours: number; instructions: string};
  phases: Array<{kind: string; title: string; minutes: number; body: string}>;
  objectives: string[];
  imagePlaceholders: Array<{id: string; alt: string; description: string; status: string; url?: string}>;
  video: {title: string; description: string; url: string; transcript: string; captionsRequired: boolean; status: string};
  citations: Citation[];
  interactiveQuestions: Array<{id: string; type: string; prompt: string; answerGuide: string}>;
  quiz: {
    title: string;
    passingScore: number;
    attemptLimit: number;
    timeLimitMinutes: number;
    questions: Array<{
      id: string;
      type: string;
      prompt: string;
      options?: string[];
      correctIndex?: number;
      explanation?: string;
      answerGuide?: string;
    }>;
  };
  exam: {
    title: string;
    passingScore: number;
    timeLimitMinutes: number;
    proctored: boolean;
    humanVerificationRequired: boolean;
    questionCount: number;
    status: string;
    questions: Array<{
      id: string;
      type: string;
      prompt: string;
      options?: string[];
      correctIndex?: number;
      explanation?: string;
      answerGuide?: string;
    }>;
  };
  assignment: {
    title: string;
    instructions: string;
    rubric: Array<{criterion: string; weight: number}>;
    humanReviewRequired: boolean;
    dueOffsetHours: number;
  };
  proctoring: {mode: string; checks: string[]; privacyNotice: string};
  authorNotes: string;
};

export type AdminDashboard = {
  viewer: {id: string; name: string; email: string; role: string};
  stats: Record<string, number>;
  modules: Array<{pathCode: string; pathTitle: string; moduleCode: string; title: string; track: string; status: string}>;
  cohosts: Array<{id: number; email: string; name: string; role: string; status: string; created_at: string}>;
  publicationPolicy: string;
};

export type DeliveryMode = "self_paced" | "paced_professor";

export type SchoolPolicy = {
  version: number;
  publishedAt?: string;
  schoolName: string;
  professorName: string;
  deliveryModes: Record<DeliveryMode, {
    label: string;
    description: string;
    enabled: boolean;
  }>;
  day: {
    dayWindowHours: number;
    maxLearningMinutes: number;
    textLocksAtClose: boolean;
    neverEndMidLesson: boolean;
    breaks: Array<{
      id: string;
      label: string;
      afterLearningMinutes: number;
      durationMinutes: number;
    }>;
  };
  openingRoutine: Record<string, boolean>;
  mastery: {
    blockOnUnsatisfactoryAnswer: boolean;
    neverRevealAnswers: boolean;
    cycle: string[];
    passingScore: number;
    maxAttemptsBeforeEscalation: number;
  };
  evidence: Record<string, boolean>;
  conduct: {
    encouragingTone: boolean;
    profanityStrikesBeforeTermination: number;
    recordBehaviorIncidents: boolean;
    detectPromptAttacks: boolean;
  };
  capabilities: Record<string, boolean>;
  publishing: Record<string, boolean>;
};

export type TimelineEvent = {
  eventType: string;
  details: Record<string, unknown>;
  createdAt: string;
};

export type LearningSession = {
  id: number;
  pathCode: string;
  moduleCode: string;
  deliveryMode: DeliveryMode;
  learnerCondition: string;
  status: "active" | "break" | "ended" | "terminated";
  openedAt: string;
  closedAt?: string;
  learningMinutes: number;
  breakMinutes: number;
  currentBreakId?: string;
  assignmentGate: boolean;
  conductStrikes: number;
  latestSubmission?: {
    original_name: string;
    ai_review_status: string;
    submitted_at: string;
  };
  timeline: TimelineEvent[];
};

export type LearningPlayerStage = {
  key: "today" | "learn" | "practice" | "assess" | "assignment" | "complete";
  label: string;
  complete: boolean;
  unlocked: boolean;
  active: boolean;
};

export type LearningPlayerState = {
  pathCode: string;
  moduleCode: string;
  moduleNumber: number;
  moduleTotal: number;
  activeStage: LearningPlayerStage["key"];
  completedPhases: string[];
  phaseCount: number;
  masteredCount: number;
  practiceRequired: number;
  quiz: {score: number; status: string} | null;
  exam: {score: number; status: string} | null;
  assignment: {ai_review_status: string; original_name: string} | null;
  sessionId: number | null;
  professorLocked: boolean;
  stages: LearningPlayerStage[];
  journeyPercent: number;
  nextAction: string;
};

export type CompletionStatus = {
  moduleCode: string;
  pathCode: string;
  eligible: boolean;
  policyVersion: number;
  requirements: Array<{
    key: string;
    label: string;
    met: boolean;
    current: string | number | null;
    required: string | number;
  }>;
};

export type SchoolRuntime = {
  viewer: {id: string; name: string; email: string};
  policy: SchoolPolicy;
  sessions: LearningSession[];
  reviewSubmissions: Array<{
    id: number;
    user_id: string;
    module_code: string;
    original_name: string;
    content_type: string;
    size_bytes: number;
    ai_review_status: string;
    submitted_at: string;
  }>;
  reviewAssessments: Array<{
    user_id: string;
    module_code: string;
    assessment_type: string;
    score: number;
    status: string;
    graded_at: string;
  }>;
  stats: {
    timelineEvents: number;
    submissions: number;
    incidents: number;
    pendingEvidence: number;
    pendingAssessmentReviews: number;
  };
};

export type Bootstrap = {
  learner: {id: string; name: string; email: string};
  curriculum: Curriculum;
  state: LearnerState;
};