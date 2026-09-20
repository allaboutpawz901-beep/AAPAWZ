// Leashed Program  (v1.0 — September 2026)
// Comprehensive accredited syllabi, week-by-week master schedules,
// hour distributions, assessment calendars, key skills checks, and  governance.

export interface WeeklyScheduleEntry {
  week: number;
  term: string;
  technicalModules: string;
  businessModules: string;
  hoursFormatted: string; // e.g. "9 / 20", "4 / 24", "13 / 17"
  technicalHours: number;
  businessHours: number;
  assessments: string;
}

export interface AssessmentCalendarEntry {
  point: string;
  when: string;
  instrument: string;
  passStandard: string;
}

export interface SafetyGateEntry {
  code: string;
  title: string;
  stage: string;
  requirement: string;
  isMandatoryBeforeLiveWork: boolean;
}

export interface CareerOutcomeEntry {
  title: string;
  employmentType: 'Owner-Operator / Entrepreneur' | 'Salaried / Commission Practitioner' | 'Specialist / Lead';
  typicalComp: string;
  roleDescription: string;
  marketDemand: string;
}

export interface CompetencyRubricEntry {
  domain: string;
  coreSkills: string;
  competentBenchmark: string;
  masteryThreshold: string;
}

export interface ProgramData {
  code: 'IPDG' | 'PDT' | 'ACA' | 'PPS' | 'CAT' | 'PPC';
  programName: string;
  credentialTitle: string;
  totalClockHours: number;
  technicalHours: number;
  businessHours: number;
  appliedHours: number;
  scheduledWeeks: number;
  partTimeWeeks: number;
  scheduleTemplate: string;
  programObjective: string;
  admissionRequirements: string[];
  attendancePolicy: string;
  gradingStandards: string;
  safetyGates: SafetyGateEntry[];
  practicumMinimums: string;
  completionRequirements: string[];
  stacksInto: string;
  weeklySchedule: WeeklyScheduleEntry[];
  assessmentCalendar: AssessmentCalendarEntry[];
  careerOutcomes: CareerOutcomeEntry[];
  rubricDomains: CompetencyRubricEntry[];
  faqs: Array<{ question: string; answer: string; category: string }>;
}

// =========================================================================
// B1. SYLLABUS — PROFESSIONAL DOG GROOMER (IPDG)
// =========================================================================
export const IPDG_SYLLABUS: ProgramData = {
  code: 'IPDG',
  programName: 'Professional Dog Groomer',
  credentialTitle: 'Professional Dog Groomer Diploma (Diploma)',
  totalClockHours: 1248,
  technicalHours: 360,
  businessHours: 864,
  appliedHours: 24,
  scheduledWeeks: 44,
  partTimeWeeks: 84,
  scheduleTemplate: 'Mon–Fri 08:00–15:30 (30 hrs/wk) · 08:00–12:00 Technical Lab | 12:30–14:30 Business/Personal Spine | 14:30–15:30 Micro-checks & AI/RAG Workflow',
  programObjective:
    'Identify dog stages and understand dog life · Recognize breeds · Recognize grooming tools · Identify workplace safety · Provide basic and advanced grooming techniques · Provide handling and pet care · Understand sanitation · Supervised live-client salon services · Build, price, market and operate a grooming business · Manage personal readiness, finances and well-being as an owner · Provide CPR and first aid.',
  admissionRequirements: [
    'Age 18+ (17 with legal guardian consent)',
    'High school diploma, GED, or approved Ability-to-Benefit assessment',
    'Physical capability to lift 40 lbs and stand for extended technical lab blocks',
    'Signed Animal-Handling Risk Acknowledgement & Safety Agreement',
    'Reliable transportation for salon lab attendance',
  ],
  attendancePolicy:
    'Clock hours are earned exclusively for documented, attended blocks. Minimum 95% attendance per term is strictly enforced. Any missed laboratory hours must be made up during scheduled Friday open lab sessions within the active term. Attendance below 90% triggers mandatory coach remediation.',
  gradingStandards:
    'Every module requires: 10 hands-on activities + 10 micro-checks, 2 intermediate checkpoints, a final knowledge quiz (≥ 80% passing grade), and accepted capstone artifacts. Program completion requires rating at "Competent" on every skills checklist domain.',
  safetyGates: [
    { code: 'IPDG-103', title: 'Handling, Key Skills Check & Table Restraints', stage: 'Term 1', requirement: 'MANDATORY KEY SKILLS CHECK: Grooming loops, belly straps, bite mitigation, table posture, and safe lifting required before live-animal contact.', isMandatoryBeforeLiveWork: true },
    { code: 'IPDG-302', title: 'Advanced Pattern Trims & Breed Profiles [Key Skills Check]', stage: 'Term 3', requirement: 'MANDATORY KEY SKILLS CHECK: Precision shear control on sanitary areas, hocks, and facial expression points.', isMandatoryBeforeLiveWork: true },
    { code: 'IPDG-402', title: 'CPR, First Aid & Salon Emergency Protocols', stage: 'Term 4', requirement: 'MANDATORY KEY SKILLS CHECK: Canine/feline CPR, vital signs, heatstroke prevention, and arterial bleed management before hands-on practice.', isMandatoryBeforeLiveWork: true },
  ],
  practicumMinimums:
    'IPDG-401 requires a minimum of 16 fully documented, supervised live-client grooms across varied coat types (double-coated, curly/furnishings, wire-haired, and smooth) signed off by the Master Grooming Instructor.',
  completionRequirements: [
    'Completion of all 157 modules (360 technical + 864 business & personal + 24 applied capstone hours)',
    '1,248 verified hours recorded in the  attendance ledger',
    'Demonstrated "Competent" rating on all 10 Skills Checklist domains',
    'Formal defense and panel acceptance of the GRM-BIZ Applied Business Capstone',
    'Signed hands-on practice log verifying 16 live-client grooms and CPR/First Aid certification',
  ],
  stacksInto: 'Articulates 100% into the Professional Pet Care & Business Ownership (PPC) Advanced Diploma.',
  weeklySchedule: [
    { week: 1, term: 'T1 Foundation', technicalModules: 'IPDG-101 (cont.)', businessModules: 'LSH-101, LSH-102, LSH-103, LSH-104 (cont.)', hoursFormatted: '9 / 20', technicalHours: 9, businessHours: 20, assessments: 'Quizzes: LSH-101, LSH-102, LSH-103' },
    { week: 2, term: 'T1 Foundation', technicalModules: 'IPDG-101 (cont.)', businessModules: 'LSH-104, LSH-105, PER-101, PER-102 (cont.)', hoursFormatted: '9 / 20', technicalHours: 9, businessHours: 20, assessments: 'Quizzes: LSH-104, LSH-105, PER-101' },
    { week: 3, term: 'T1 Foundation', technicalModules: 'IPDG-101, IPDG-102 (cont.)', businessModules: 'PER-102, PER-103, PER-104, PER-105 (cont.)', hoursFormatted: '9 / 20', technicalHours: 9, businessHours: 20, assessments: 'Quizzes: IPDG-101, PER-102, PER-103, PER-104' },
    { week: 4, term: 'T1 Foundation', technicalModules: 'IPDG-102 (cont.)', businessModules: 'PER-105, BUS-101, BUS-102, BUS-103, BUS-104 (cont.)', hoursFormatted: '9 / 20', technicalHours: 9, businessHours: 20, assessments: 'Quizzes: PER-105, BUS-101, BUS-102, BUS-103' },
    { week: 5, term: 'T1 Foundation', technicalModules: 'IPDG-102 (cont.)', businessModules: 'BUS-104, BUS-105, BUS-106, MKT-101 (cont.)', hoursFormatted: '9 / 20', technicalHours: 9, businessHours: 20, assessments: 'Quizzes: BUS-104, BUS-105, BUS-106' },
    { week: 6, term: 'T1 Foundation', technicalModules: 'IPDG-102, IPDG-103 (cont.)', businessModules: 'MKT-101, MKT-102, MKT-103, MKT-104 (cont.)', hoursFormatted: '9 / 20', technicalHours: 9, businessHours: 20, assessments: 'Quizzes: IPDG-102, MKT-101, MKT-102, MKT-103' },
    { week: 7, term: 'T1 Foundation', technicalModules: 'IPDG-103 (cont.)', businessModules: 'MKT-104, MKT-105, TEC-101, TEC-102 (cont.)', hoursFormatted: '9 / 20', technicalHours: 9, businessHours: 20, assessments: 'Quizzes: MKT-104, MKT-105, TEC-101' },
    { week: 8, term: 'T1 Foundation', technicalModules: 'IPDG-103 (cont.)', businessModules: 'TEC-102, TEC-103, TEC-104, TEC-105, FIN-101 (cont.)', hoursFormatted: '9 / 20', technicalHours: 9, businessHours: 20, assessments: 'Quizzes: TEC-102, TEC-103, TEC-104, TEC-105' },
    { week: 9, term: 'T1 Foundation', technicalModules: 'IPDG-103, IPDG-104 (cont.)', businessModules: 'FIN-101, FIN-102, FIN-103, FIN-104 (cont.)', hoursFormatted: '9 / 20', technicalHours: 9, businessHours: 20, assessments: 'Quizzes: IPDG-103 (Key Skills Check), FIN-101, FIN-102, FIN-103' },
    { week: 10, term: 'T1 Foundation', technicalModules: 'IPDG-104 (cont.)', businessModules: 'FIN-104, FIN-105, LEG-101, LEG-102 (cont.)', hoursFormatted: '9 / 20', technicalHours: 9, businessHours: 20, assessments: 'Quizzes: FIN-104, FIN-105, LEG-101' },
    { week: 11, term: 'T1 Foundation', technicalModules: 'IPDG-104', businessModules: 'LEG-102, LEG-103, LEG-104, LEG-105', hoursFormatted: '9 / 20', technicalHours: 9, businessHours: 20, assessments: 'Quizzes: IPDG-104, LEG-102, LEG-103, LEG-104, LEG-105 · Term 1 Checkpoint & Skills Checklist Review' },
    { week: 12, term: 'T2 Core Skill', technicalModules: 'IPDG-201 (cont.)', businessModules: 'LSH-201, LSH-202, LSH-203, LSH-204 (cont.)', hoursFormatted: '9 / 20', technicalHours: 9, businessHours: 20, assessments: 'Quizzes: LSH-201, LSH-202, LSH-203' },
    { week: 13, term: 'T2 Core Skill', technicalModules: 'IPDG-201 (cont.)', businessModules: 'LSH-204, LSH-205, PER-201, PER-202 (cont.)', hoursFormatted: '9 / 20', technicalHours: 9, businessHours: 20, assessments: 'Quizzes: LSH-204, LSH-205, PER-201' },
    { week: 14, term: 'T2 Core Skill', technicalModules: 'IPDG-201, IPDG-202 (cont.)', businessModules: 'PER-202, PER-203, PER-204, PER-205 (cont.)', hoursFormatted: '9 / 20', technicalHours: 9, businessHours: 20, assessments: 'Quizzes: IPDG-201, PER-202, PER-203, PER-204' },
    { week: 15, term: 'T2 Core Skill', technicalModules: 'IPDG-202 (cont.)', businessModules: 'PER-205, BUS-201, BUS-202, BUS-203, BUS-204 (cont.)', hoursFormatted: '9 / 20', technicalHours: 9, businessHours: 20, assessments: 'Quizzes: PER-205, BUS-201, BUS-202, BUS-203' },
    { week: 16, term: 'T2 Core Skill', technicalModules: 'IPDG-202 (cont.)', businessModules: 'BUS-204, BUS-205, BUS-206, MKT-201 (cont.)', hoursFormatted: '9 / 20', technicalHours: 9, businessHours: 20, assessments: 'Quizzes: BUS-204, BUS-205, BUS-206' },
    { week: 17, term: 'T2 Core Skill', technicalModules: 'IPDG-202, IPDG-203 (cont.)', businessModules: 'MKT-201, MKT-202, MKT-203, MKT-204 (cont.)', hoursFormatted: '9 / 20', technicalHours: 9, businessHours: 20, assessments: 'Quizzes: IPDG-202, MKT-201, MKT-202, MKT-203' },
    { week: 18, term: 'T2 Core Skill', technicalModules: 'IPDG-203 (cont.)', businessModules: 'MKT-204, MKT-205, TEC-201, TEC-202 (cont.)', hoursFormatted: '9 / 20', technicalHours: 9, businessHours: 20, assessments: 'Quizzes: MKT-204, MKT-205, TEC-201' },
    { week: 19, term: 'T2 Core Skill', technicalModules: 'IPDG-203 (cont.)', businessModules: 'TEC-202, TEC-203, TEC-204, TEC-205, FIN-201 (cont.)', hoursFormatted: '9 / 20', technicalHours: 9, businessHours: 20, assessments: 'Quizzes: TEC-202, TEC-203, TEC-204, TEC-205' },
    { week: 20, term: 'T2 Core Skill', technicalModules: 'IPDG-203, IPDG-204 (cont.)', businessModules: 'FIN-201, FIN-202, FIN-203, FIN-204 (cont.)', hoursFormatted: '9 / 20', technicalHours: 9, businessHours: 20, assessments: 'Quizzes: IPDG-203, FIN-201, FIN-202, FIN-203' },
    { week: 21, term: 'T2 Core Skill', technicalModules: 'IPDG-204 (cont.)', businessModules: 'FIN-204, FIN-205, LEG-201, LEG-202 (cont.)', hoursFormatted: '9 / 20', technicalHours: 9, businessHours: 20, assessments: 'Quizzes: FIN-204, FIN-205, LEG-201' },
    { week: 22, term: 'T2 Core Skill', technicalModules: 'IPDG-204', businessModules: 'LEG-202, LEG-203, LEG-204, LEG-205', hoursFormatted: '9 / 20', technicalHours: 9, businessHours: 20, assessments: 'Quizzes: IPDG-204, LEG-202, LEG-203, LEG-204, LEG-205 · Term 2 Checkpoint & Skills Checklist Review' },
    { week: 23, term: 'T3 Advanced Skill', technicalModules: 'IPDG-301 (cont.)', businessModules: 'LSH-301, LSH-302, LSH-303', hoursFormatted: '11 / 18', technicalHours: 11, businessHours: 18, assessments: 'Quizzes: LSH-301, LSH-302, LSH-303' },
    { week: 24, term: 'T3 Advanced Skill', technicalModules: 'IPDG-301 (cont.)', businessModules: 'LSH-304, LSH-305, PER-301', hoursFormatted: '11 / 18', technicalHours: 11, businessHours: 18, assessments: 'Quizzes: LSH-304, LSH-305, PER-301' },
    { week: 25, term: 'T3 Advanced Skill', technicalModules: 'IPDG-301 (cont.)', businessModules: 'PER-302, PER-303, PER-304', hoursFormatted: '11 / 18', technicalHours: 11, businessHours: 18, assessments: 'Quizzes: PER-302, PER-303, PER-304' },
    { week: 26, term: 'T3 Advanced Skill', technicalModules: 'IPDG-301 (cont.)', businessModules: 'PER-305, BUS-301, BUS-302', hoursFormatted: '11 / 18', technicalHours: 11, businessHours: 18, assessments: 'Quizzes: PER-305, BUS-301, BUS-302' },
    { week: 27, term: 'T3 Advanced Skill', technicalModules: 'IPDG-301 (cont.)', businessModules: 'BUS-303, BUS-304, BUS-305', hoursFormatted: '11 / 18', technicalHours: 11, businessHours: 18, assessments: 'Quizzes: BUS-303, BUS-304, BUS-305' },
    { week: 28, term: 'T3 Advanced Skill', technicalModules: 'IPDG-301 (cont.)', businessModules: 'BUS-306, MKT-301, MKT-302', hoursFormatted: '11 / 18', technicalHours: 11, businessHours: 18, assessments: 'Quizzes: BUS-306, MKT-301, MKT-302' },
    { week: 29, term: 'T3 Advanced Skill', technicalModules: 'IPDG-301 (cont.)', businessModules: 'MKT-303, MKT-304, MKT-305', hoursFormatted: '11 / 18', technicalHours: 11, businessHours: 18, assessments: 'Quizzes: MKT-303, MKT-304, MKT-305' },
    { week: 30, term: 'T3 Advanced Skill', technicalModules: 'IPDG-301 (cont.)', businessModules: 'TEC-301, TEC-302, TEC-303', hoursFormatted: '11 / 18', technicalHours: 11, businessHours: 18, assessments: 'Quizzes: TEC-301, TEC-302, TEC-303' },
    { week: 31, term: 'T3 Advanced Skill', technicalModules: 'IPDG-301 (cont.)', businessModules: 'TEC-304, TEC-305, FIN-301', hoursFormatted: '11 / 18', technicalHours: 11, businessHours: 18, assessments: 'Quizzes: TEC-304, TEC-305, FIN-301' },
    { week: 32, term: 'T3 Advanced Skill', technicalModules: 'IPDG-301 (cont.)', businessModules: 'FIN-302, FIN-303, FIN-304', hoursFormatted: '11 / 18', technicalHours: 11, businessHours: 18, assessments: 'Quizzes: FIN-302, FIN-303, FIN-304' },
    { week: 33, term: 'T3 Advanced Skill', technicalModules: 'IPDG-301, IPDG-302 (cont.)', businessModules: 'FIN-305, LEG-301, LEG-302', hoursFormatted: '11 / 18', technicalHours: 11, businessHours: 18, assessments: 'Quizzes: IPDG-301, FIN-305, LEG-301, LEG-302' },
    { week: 34, term: 'T3 Advanced Skill', technicalModules: 'IPDG-302', businessModules: 'LEG-303, LEG-304, LEG-305', hoursFormatted: '11 / 18', technicalHours: 11, businessHours: 18, assessments: 'Quizzes: IPDG-302 (Key Skills Check), LEG-303, LEG-304, LEG-305 · Term 3 Checkpoint & Skills Checklist Review' },
    { week: 35, term: 'T4 Capstone', technicalModules: 'IPDG-401 (cont.)', businessModules: 'LSH-401, LSH-402, LSH-403, LSH-404', hoursFormatted: '4 / 24', technicalHours: 4, businessHours: 24, assessments: 'Quizzes: LSH-401, LSH-402, LSH-403, LSH-404' },
    { week: 36, term: 'T4 Capstone', technicalModules: 'IPDG-401 (cont.)', businessModules: 'LSH-405, PER-401, PER-402, PER-403', hoursFormatted: '4 / 24', technicalHours: 4, businessHours: 24, assessments: 'Quizzes: LSH-405, PER-401, PER-402, PER-403' },
    { week: 37, term: 'T4 Capstone', technicalModules: 'IPDG-401 (cont.)', businessModules: 'PER-404, PER-405, BUS-401, BUS-402', hoursFormatted: '4 / 24', technicalHours: 4, businessHours: 24, assessments: 'Quizzes: PER-404, PER-405, BUS-401, BUS-402' },
    { week: 38, term: 'T4 Capstone', technicalModules: 'IPDG-401 (cont.)', businessModules: 'BUS-403, BUS-404, BUS-405, BUS-406', hoursFormatted: '4 / 24', technicalHours: 4, businessHours: 24, assessments: 'Quizzes: BUS-403, BUS-404, BUS-405, BUS-406' },
    { week: 39, term: 'T4 Capstone', technicalModules: 'IPDG-401 (cont.)', businessModules: 'MKT-401, MKT-402, MKT-403, MKT-404', hoursFormatted: '4 / 24', technicalHours: 4, businessHours: 24, assessments: 'Quizzes: MKT-401, MKT-402, MKT-403, MKT-404' },
    { week: 40, term: 'T4 Capstone', technicalModules: 'IPDG-401 (cont.)', businessModules: 'MKT-405, TEC-401, TEC-402, TEC-403', hoursFormatted: '4 / 24', technicalHours: 4, businessHours: 24, assessments: 'Quizzes: MKT-405, TEC-401, TEC-402, TEC-403' },
    { week: 41, term: 'T4 Capstone', technicalModules: 'IPDG-401 (cont.)', businessModules: 'TEC-404, TEC-405, FIN-401, FIN-402', hoursFormatted: '4 / 24', technicalHours: 4, businessHours: 24, assessments: 'Quizzes: TEC-404, TEC-405, FIN-401, FIN-402' },
    { week: 42, term: 'T4 Capstone', technicalModules: 'IPDG-401', businessModules: 'FIN-403, FIN-404, FIN-405, LEG-401', hoursFormatted: '4 / 24', technicalHours: 4, businessHours: 24, assessments: 'Quizzes: IPDG-401 Hands-On Practice Log, FIN-403, FIN-404, FIN-405, LEG-401' },
    { week: 43, term: 'T4 Capstone', technicalModules: 'IPDG-402 (cont.)', businessModules: 'LEG-402, LEG-403, LEG-404, LEG-405', hoursFormatted: '4 / 24', technicalHours: 4, businessHours: 24, assessments: 'Quizzes: LEG-402, LEG-403, LEG-404, LEG-405' },
    { week: 44, term: 'T4 Capstone', technicalModules: 'IPDG-402', businessModules: 'GRM-BIZ', hoursFormatted: '4 / 24', technicalHours: 4, businessHours: 24, assessments: 'Quizzes: IPDG-402 (CPR Key Skills Check), GRM-BIZ Capstone Panel Defense · Diploma Award Audit' },
  ],
  assessmentCalendar: [
    { point: 'Module Quizzes & Evidence', when: 'Weekly (end of each module)', instrument: '10 Micro-checks + 2 Checkpoints + LMS Final Quiz + Artifact', passStandard: '≥ 80% on quiz; artifact accepted' },
    { point: 'Level Checkpoint 1', when: 'End of Term 1 (Week 11)', instrument: 'Skills Checklist level rows + Hour attendance ledger', passStandard: 'Competent on all rows; ≥ 95% attendance' },
    { point: 'Level Checkpoint 2', when: 'End of Term 2 (Week 22)', instrument: 'Skills Checklist level rows + Salon floor technique audit', passStandard: 'Competent on all rows; ≥ 95% attendance' },
    { point: 'Level Checkpoint 3', when: 'End of Term 3 (Week 34)', instrument: 'Skills Checklist level rows + Timed breed styling evaluation', passStandard: 'Competent on all rows; ≥ 95% attendance' },
    { point: 'Level Checkpoint 4', when: 'End of Term 4 (Week 44)', instrument: 'Comprehensive Skills Checklist (all 10 domains)', passStandard: 'Competent on every row; 100% attendance quota' },
    { point: 'Safety-Critical Sign-Offs', when: 'Prior to live-animal contact / Hands-On Practice', instrument: 'IPDG-103, IPDG-302, IPDG-402 instructor approval checklist', passStandard: '100% Pass / Fail binary compliance' },
    { point: 'Supervised Hands-On Practice', when: 'Term 4 (IPDG-401)', instrument: 'Supervised Hands-On Practice Log (16 live client grooms)', passStandard: 'All 16 client logs verified by Master Groomer' },
    { point: 'Applied Business Capstone', when: 'Week 44 (GRM-BIZ)', instrument: 'Instructor + Owner review panel defense', passStandard: 'Launch plan, pricing model, insurance checklist accepted' },
  ],
  careerOutcomes: [
    { title: 'Independent Salon Owner / Operator', employmentType: 'Owner-Operator / Entrepreneur', typicalComp: '$65,000 – $120,000+ / yr', roleDescription: 'Launch and operate a high-margin independent pet salon, mobile grooming unit, or boutique styling studio.', marketDemand: 'High (Fast-growing pet wellness sector)' },
    { title: 'Master Groomer & Stylist', employmentType: 'Salaried / Commission Practitioner', typicalComp: '$45,000 – $78,000 / yr', roleDescription: 'Provide high-end breed standard cuts, hand-stripping, creative styling, and corrective coats in premier salons.', marketDemand: 'Very High (Severe shortage of credentialed groomers)' },
    { title: 'Mobile Grooming Business Founder', employmentType: 'Owner-Operator / Entrepreneur', typicalComp: '$70,000 – $135,000 / yr', roleDescription: 'Deliver VIP curbside mobile grooming services with zero brick-and-mortar lease overhead.', marketDemand: 'Extremely High (Strong consumer convenience preference)' },
  ],
  rubricDomains: [
    { domain: 'Handling & Animal Safety', coreSkills: 'Low-stress handling, bite mitigation, table loop safety, senior/puppy accommodations', competentBenchmark: 'Zero safety incidents; applies safe restraints and reads all canine stress cues instantly.', masteryThreshold: 'De-escalates highly fearful/fractious dogs with zero force.' },
    { domain: 'Bathing & Coat Prep', coreSkills: 'Shampoo chemistry, complete matting removal, high-velocity blowout without coat damage', competentBenchmark: 'Coats thoroughly cleaned to the skin; zero moisture left in double coats; ear/eye hygiene complete.', masteryThreshold: 'Selects bespoke product formulations tailored to dermatological conditions.' },
    { domain: 'Precision Scissor & Blade Control', coreSkills: 'Clipper blade selection, safe pad shaving, guard comb symmetry, clean bevels and topknots', competentBenchmark: 'Consistent blade length without clipper burn; smooth scissor lines with balanced symmetry.', masteryThreshold: 'Exemplary competition-ready breed standard styling.' },
    { domain: 'Business & Operational Systems', coreSkills: 'Service pricing, booking software, client consultations, waiver enforcement, marketing', competentBenchmark: 'Maintains compliant client records; executes automated booking workflows; enforces fee policies.', masteryThreshold: 'Demonstrates full unit economics mastery and recurring client retention.' },
  ],
  faqs: [
    { question: 'Is the Professional Dog Groomer Diploma accredited and state-recognized?', answer: 'Yes. The IPDG curriculum complies with proprietary school licensing standards established by the Louisiana Board of Regents (Proprietary Schools), with all 1,248 hours tracked in official  attendance ledgers.', category: 'Accreditation & Licensing' },
    { question: 'What is the difference between hours and credit hours?', answer: 'Vocational pet-care academies operate on hours (1 hour = 50–60 minutes of supervised classroom, laboratory, or hands-on practice instruction). To earn your diploma, you must complete the required 1,248 hours.', category: 'Academics' },
    { question: 'When do students begin working with live dogs?', answer: 'Live dog handling begins only AFTER passing the mandatory IPDG-103 Handling & Key Skills Check. Prior to this gate, students practice handling, tool grips, and sanitation on high-fidelity simulation models.', category: 'Safety' },
    { question: 'Can I stack this diploma into the Advanced Diploma (PPC)?', answer: 'Yes! All 157 modules (1,248 hours) completed in the IPDG program transfer 100% into the Professional Pet Care & Business Ownership (PPC) Advanced Diploma.', category: 'Stacking Pathways' },
  ],
};

// =========================================================================
// B2. SYLLABUS — PROFESSIONAL DOG TRAINER (PDT)
// =========================================================================
export const PDT_SYLLABUS: ProgramData = {
  code: 'PDT',
  programName: 'Professional Dog Trainer',
  credentialTitle: 'Professional Dog Trainer Diploma (Diploma)',
  totalClockHours: 1112,
  technicalHours: 224,
  businessHours: 864,
  appliedHours: 24,
  scheduledWeeks: 39,
  partTimeWeeks: 75,
  scheduleTemplate: 'Mon–Fri 08:00–15:30 (30 hrs/wk) · 08:00–12:00 Technical Training Ring | 12:30–14:30 Business/Personal Spine | 14:30–15:30 Micro-checks & RAG Lab',
  programObjective:
    'Recognize/search dog history · Offer guidance to new owners · Follow vaccination & ADA guides · Identify 10 most important AKC breeds · Recognize training equipment · Recognize personalities & behavior problems · Choose effective solutions · Train basic obedience · Train advanced obedience · Use in-motion commands, verbal & hand signals · Make corrections · Design private classes · Build, price, market and operate a training business · Manage personal readiness, finances and well-being as an owner · Understand continuous education · Provide CPR and first aid.',
  admissionRequirements: [
    'Age 18+ (17 with legal guardian consent)',
    'High school diploma or GED equivalent',
    'Physical ability to handle energetic dogs and stand/move during outdoor & indoor yard sessions',
    'Signed Animal-Handling Risk Acknowledgement & Liability Release',
  ],
  attendancePolicy:
    'Clock hours require 95% attendance minimum per term. Missed training ring hours must be made up during Friday ring hands-on practice sessions within the same term.',
  gradingStandards:
    'Module completion requires: 10 activities + 10 micro-checks, 2 checkpoints, and quiz at ≥ 80%. Program graduation requires Competent on all behavior and training skills checklist rows.',
  safetyGates: [
    { code: 'PDT-201', title: 'Canine Learning Theory & Marker Training [Key Skills Check]', stage: 'Term 2', requirement: 'MANDATORY KEY SKILLS CHECK: Demonstration of clear marker timing, reward mechanics, and threshold management.', isMandatoryBeforeLiveWork: true },
    { code: 'PDT-402', title: 'CPR, First Aid & Field Safety Protocols', stage: 'Term 4', requirement: 'MANDATORY KEY SKILLS CHECK: Canine CPR, emergency bite intervention, and heat/hydration management.', isMandatoryBeforeLiveWork: true },
  ],
  practicumMinimums:
    'PDT-401 requires designing, marketing, and successfully instructing a multi-session private client obedience class under instructor observation.',
  completionRequirements: [
    'All 155 modules completed (224 technical + 864 business & personal + 24 applied capstone hours)',
    '1,112 verified hours recorded in the  ledger',
    'Skills Checklist evaluated at "Competent" on all training and business rows',
    'TRN-BIZ Applied Training Business Capstone successfully defended',
    'Supervised private class instruction log signed by Lead Training Instructor',
  ],
  stacksInto: 'Articulates 100% into the Professional Pet Care & Business Ownership (PPC) Advanced Diploma.',
  weeklySchedule: [
    { week: 1, term: 'T1 Foundation', technicalModules: 'PDT-101 (cont.)', businessModules: 'LSH-101, LSH-102, LSH-103, LSH-104', hoursFormatted: '4 / 24', technicalHours: 4, businessHours: 24, assessments: 'Quizzes: LSH-101, LSH-102, LSH-103, LSH-104' },
    { week: 2, term: 'T1 Foundation', technicalModules: 'PDT-101 (cont.)', businessModules: 'LSH-105, PER-101, PER-102, PER-103', hoursFormatted: '4 / 24', technicalHours: 4, businessHours: 24, assessments: 'Quizzes: LSH-105, PER-101, PER-102, PER-103' },
    { week: 3, term: 'T1 Foundation', technicalModules: 'PDT-101, PDT-102 (cont.)', businessModules: 'PER-104, PER-105, BUS-101, BUS-102', hoursFormatted: '4 / 24', technicalHours: 4, businessHours: 24, assessments: 'Quizzes: PDT-101, PER-104, PER-105, BUS-101, BUS-102' },
    { week: 4, term: 'T1 Foundation', technicalModules: 'PDT-102 (cont.)', businessModules: 'BUS-103, BUS-104, BUS-105, BUS-106', hoursFormatted: '4 / 24', technicalHours: 4, businessHours: 24, assessments: 'Quizzes: BUS-103, BUS-104, BUS-105, BUS-106' },
    { week: 5, term: 'T1 Foundation', technicalModules: 'PDT-102 (cont.)', businessModules: 'MKT-101, MKT-102, MKT-103, MKT-104', hoursFormatted: '4 / 24', technicalHours: 4, businessHours: 24, assessments: 'Quizzes: MKT-101, MKT-102, MKT-103, MKT-104' },
    { week: 6, term: 'T1 Foundation', technicalModules: 'PDT-102 (cont.)', businessModules: 'MKT-105, TEC-101, TEC-102, TEC-103', hoursFormatted: '4 / 24', technicalHours: 4, businessHours: 24, assessments: 'Quizzes: MKT-105, TEC-101, TEC-102, TEC-103' },
    { week: 7, term: 'T1 Foundation', technicalModules: 'PDT-102, PDT-103 (cont.)', businessModules: 'TEC-104, TEC-105, FIN-101, FIN-102', hoursFormatted: '4 / 24', technicalHours: 4, businessHours: 24, assessments: 'Quizzes: PDT-102, TEC-104, TEC-105, FIN-101, FIN-102' },
    { week: 8, term: 'T1 Foundation', technicalModules: 'PDT-103 (cont.)', businessModules: 'FIN-103, FIN-104, FIN-105, LEG-101', hoursFormatted: '4 / 24', technicalHours: 4, businessHours: 24, assessments: 'Quizzes: FIN-103, FIN-104, FIN-105, LEG-101' },
    { week: 9, term: 'T1 Foundation', technicalModules: 'PDT-103', businessModules: 'LEG-102, LEG-103, LEG-104, LEG-105', hoursFormatted: '4 / 24', technicalHours: 4, businessHours: 24, assessments: 'Quizzes: PDT-103, LEG-102, LEG-103, LEG-104, LEG-105 · Term 1 Checkpoint & Skills Checklist Review' },
    { week: 10, term: 'T2 Core Skill', technicalModules: 'PDT-201 (cont.)', businessModules: 'LSH-201, LSH-202, LSH-203, LSH-204', hoursFormatted: '6 / 24', technicalHours: 6, businessHours: 24, assessments: 'Quizzes: LSH-201, LSH-202, LSH-203, LSH-204' },
    { week: 11, term: 'T2 Core Skill', technicalModules: 'PDT-201 (cont.)', businessModules: 'LSH-205, PER-201, PER-202, PER-203', hoursFormatted: '6 / 24', technicalHours: 6, businessHours: 24, assessments: 'Quizzes: LSH-205, PER-201, PER-202, PER-203' },
    { week: 12, term: 'T2 Core Skill', technicalModules: 'PDT-201 (cont.)', businessModules: 'PER-204, PER-205, BUS-201, BUS-202', hoursFormatted: '6 / 24', technicalHours: 6, businessHours: 24, assessments: 'Quizzes: PER-204, PER-205, BUS-201, BUS-202' },
    { week: 13, term: 'T2 Core Skill', technicalModules: 'PDT-201 (cont.)', businessModules: 'BUS-203, BUS-204, BUS-205, BUS-206', hoursFormatted: '6 / 24', technicalHours: 6, businessHours: 24, assessments: 'Quizzes: BUS-203, BUS-204, BUS-205, BUS-206' },
    { week: 14, term: 'T2 Core Skill', technicalModules: 'PDT-201, PDT-202 (cont.)', businessModules: 'MKT-201, MKT-202, MKT-203, MKT-204', hoursFormatted: '6 / 24', technicalHours: 6, businessHours: 24, assessments: 'Quizzes: PDT-201 (Key Skills Check), MKT-201, MKT-202, MKT-203, MKT-204' },
    { week: 15, term: 'T2 Core Skill', technicalModules: 'PDT-202 (cont.)', businessModules: 'MKT-205, TEC-201, TEC-202, TEC-203', hoursFormatted: '6 / 24', technicalHours: 6, businessHours: 24, assessments: 'Quizzes: MKT-205, TEC-201, TEC-202, TEC-203' },
    { week: 16, term: 'T2 Core Skill', technicalModules: 'PDT-202 (cont.)', businessModules: 'TEC-204, TEC-205, FIN-201, FIN-202', hoursFormatted: '6 / 24', technicalHours: 6, businessHours: 24, assessments: 'Quizzes: TEC-204, TEC-205, FIN-201, FIN-202' },
    { week: 17, term: 'T2 Core Skill', technicalModules: 'PDT-202 (cont.)', businessModules: 'FIN-203, FIN-204, FIN-205, LEG-201', hoursFormatted: '6 / 24', technicalHours: 6, businessHours: 24, assessments: 'Quizzes: FIN-203, FIN-204, FIN-205, LEG-201' },
    { week: 18, term: 'T2 Core Skill', technicalModules: 'PDT-202', businessModules: 'LEG-202, LEG-203, LEG-204, LEG-205', hoursFormatted: '6 / 24', technicalHours: 6, businessHours: 24, assessments: 'Quizzes: PDT-202, LEG-202, LEG-203, LEG-204, LEG-205 · Term 2 Checkpoint & Skills Checklist Review' },
    { week: 19, term: 'T3 Advanced Skill', technicalModules: 'PDT-301 (cont.)', businessModules: 'LSH-301, LSH-302, LSH-303', hoursFormatted: '10 / 18', technicalHours: 10, businessHours: 18, assessments: 'Quizzes: LSH-301, LSH-302, LSH-303' },
    { week: 20, term: 'T3 Advanced Skill', technicalModules: 'PDT-301 (cont.)', businessModules: 'LSH-304, LSH-305, PER-301', hoursFormatted: '10 / 18', technicalHours: 10, businessHours: 18, assessments: 'Quizzes: LSH-304, LSH-305, PER-301' },
    { week: 21, term: 'T3 Advanced Skill', technicalModules: 'PDT-301 (cont.)', businessModules: 'PER-302, PER-303, PER-304', hoursFormatted: '10 / 18', technicalHours: 10, businessHours: 18, assessments: 'Quizzes: PER-302, PER-303, PER-304' },
    { week: 22, term: 'T3 Advanced Skill', technicalModules: 'PDT-301', businessModules: 'PER-305, BUS-301, BUS-302', hoursFormatted: '10 / 18', technicalHours: 10, businessHours: 18, assessments: 'Quizzes: PDT-301, PER-305, BUS-301, BUS-302' },
    { week: 23, term: 'T3 Advanced Skill', technicalModules: 'PDT-302 (cont.)', businessModules: 'BUS-303, BUS-304, BUS-305', hoursFormatted: '10 / 18', technicalHours: 10, businessHours: 18, assessments: 'Quizzes: BUS-303, BUS-304, BUS-305' },
    { week: 24, term: 'T3 Advanced Skill', technicalModules: 'PDT-302 (cont.)', businessModules: 'BUS-306, MKT-301, MKT-302', hoursFormatted: '10 / 18', technicalHours: 10, businessHours: 18, assessments: 'Quizzes: BUS-306, MKT-301, MKT-302' },
    { week: 25, term: 'T3 Advanced Skill', technicalModules: 'PDT-302 (cont.)', businessModules: 'MKT-303, MKT-304, MKT-305', hoursFormatted: '10 / 18', technicalHours: 10, businessHours: 18, assessments: 'Quizzes: MKT-303, MKT-304, MKT-305' },
    { week: 26, term: 'T3 Advanced Skill', technicalModules: 'PDT-302', businessModules: 'TEC-301, TEC-302, TEC-303', hoursFormatted: '10 / 18', technicalHours: 10, businessHours: 18, assessments: 'Quizzes: PDT-302, TEC-301, TEC-302, TEC-303' },
    { week: 27, term: 'T3 Advanced Skill', technicalModules: 'PDT-303 (cont.)', businessModules: 'TEC-304, TEC-305, FIN-301', hoursFormatted: '10 / 18', technicalHours: 10, businessHours: 18, assessments: 'Quizzes: TEC-304, TEC-305, FIN-301' },
    { week: 28, term: 'T3 Advanced Skill', technicalModules: 'PDT-303 (cont.)', businessModules: 'FIN-302, FIN-303, FIN-304', hoursFormatted: '10 / 18', technicalHours: 10, businessHours: 18, assessments: 'Quizzes: FIN-302, FIN-303, FIN-304' },
    { week: 29, term: 'T3 Advanced Skill', technicalModules: 'PDT-303 (cont.)', businessModules: 'FIN-305, LEG-301, LEG-302', hoursFormatted: '10 / 18', technicalHours: 10, businessHours: 18, assessments: 'Quizzes: FIN-305, LEG-301, LEG-302' },
    { week: 30, term: 'T3 Advanced Skill', technicalModules: 'PDT-303', businessModules: 'LEG-303, LEG-304, LEG-305', hoursFormatted: '10 / 18', technicalHours: 10, businessHours: 18, assessments: 'Quizzes: PDT-303, LEG-303, LEG-304, LEG-305 · Term 3 Checkpoint & Skills Checklist Review' },
    { week: 31, term: 'T4 Capstone', technicalModules: 'PDT-401 (cont.)', businessModules: 'LSH-401, LSH-402, LSH-403, LSH-404, LSH-405 (cont.)', hoursFormatted: '2 / 27', technicalHours: 2, businessHours: 27, assessments: 'Quizzes: LSH-401, LSH-402, LSH-403, LSH-404' },
    { week: 32, term: 'T4 Capstone', technicalModules: 'PDT-401 (cont.)', businessModules: 'LSH-405, PER-401, PER-402, PER-403, PER-404 (cont.)', hoursFormatted: '2 / 27', technicalHours: 2, businessHours: 27, assessments: 'Quizzes: LSH-405, PER-401, PER-402, PER-403' },
    { week: 33, term: 'T4 Capstone', technicalModules: 'PDT-401 (cont.)', businessModules: 'PER-404, PER-405, BUS-401, BUS-402, BUS-403, BUS-404 (cont.)', hoursFormatted: '2 / 27', technicalHours: 2, businessHours: 27, assessments: 'Quizzes: PER-404, PER-405, BUS-401, BUS-402, BUS-403' },
    { week: 34, term: 'T4 Capstone', technicalModules: 'PDT-401, PDT-402 (cont.)', businessModules: 'BUS-404, BUS-405, BUS-406, MKT-401, MKT-402 (cont.)', hoursFormatted: '2 / 27', technicalHours: 2, businessHours: 27, assessments: 'Quizzes: PDT-401 Hands-On Practice, BUS-404, BUS-405, BUS-406, MKT-401' },
    { week: 35, term: 'T4 Capstone', technicalModules: 'PDT-402 (cont.)', businessModules: 'MKT-402, MKT-403, MKT-404, MKT-405, TEC-401, TEC-402 (cont.)', hoursFormatted: '2 / 27', technicalHours: 2, businessHours: 27, assessments: 'Quizzes: MKT-402, MKT-403, MKT-404, MKT-405, TEC-401' },
    { week: 36, term: 'T4 Capstone', technicalModules: 'PDT-402 (cont.)', businessModules: 'TEC-402, TEC-403, TEC-404, TEC-405, FIN-401 (cont.)', hoursFormatted: '2 / 27', technicalHours: 2, businessHours: 27, assessments: 'Quizzes: TEC-402, TEC-403, TEC-404, TEC-405' },
    { week: 37, term: 'T4 Capstone', technicalModules: 'PDT-402 (cont.)', businessModules: 'FIN-401, FIN-402, FIN-403, FIN-404, FIN-405, LEG-401 (cont.)', hoursFormatted: '2 / 27', technicalHours: 2, businessHours: 27, assessments: 'Quizzes: FIN-401, FIN-402, FIN-403, FIN-404, FIN-405' },
    { week: 38, term: 'T4 Capstone', technicalModules: 'PDT-402 (cont.)', businessModules: 'LEG-401, LEG-402, LEG-403, LEG-404, LEG-405 (cont.)', hoursFormatted: '2 / 27', technicalHours: 2, businessHours: 27, assessments: 'Quizzes: LEG-401, LEG-402, LEG-403, LEG-404' },
    { week: 39, term: 'T4 Capstone', technicalModules: 'PDT-402', businessModules: 'LEG-405, TRN-BIZ', hoursFormatted: '2 / 27', technicalHours: 2, businessHours: 27, assessments: 'Quizzes: PDT-402 (Key Skills Check), LEG-405, TRN-BIZ Capstone Panel Defense · Diploma Award Audit' },
  ],
  assessmentCalendar: [
    { point: 'Weekly Quizzes & Micro-checks', when: 'End of each module', instrument: '10 Micro-checks + Checkpoints + LMS Quiz', passStandard: '≥ 80%' },
    { point: 'Term 1 Evaluation', when: 'Week 9', instrument: 'Learning Theory & Equipment handling checkoff', passStandard: 'Competent on all rows; ≥ 95% attendance' },
    { point: 'Term 2 Safety Checkpoint', when: 'Week 18', instrument: 'PDT-201 Marker timing & live-dog handler check', passStandard: 'Competent on all rows; ≥ 95% attendance' },
    { point: 'Term 3 Advanced Checkpoint', when: 'Week 30', instrument: 'Behavior modification plan evaluation', passStandard: 'Competent on all rows; ≥ 95% attendance' },
    { point: 'Hands-On Practice Delivery', when: 'Term 4 (PDT-401)', instrument: 'Live client private class observation report', passStandard: 'Lead Instructor approval' },
    { point: 'Applied Capstone Panel', when: 'Week 39 (TRN-BIZ)', instrument: 'Formal business plan, waiver packet & 90-day plan defense', passStandard: 'Unanimous panel acceptance' },
  ],
  careerOutcomes: [
    { title: 'Independent Dog Training Business Owner', employmentType: 'Owner-Operator / Entrepreneur', typicalComp: '$55,000 – $115,000+ / yr', roleDescription: 'Offer in-home obedience packages, board-and-train programs, and behavioral consultation.', marketDemand: 'High' },
    { title: 'Head Behavior Consultant / Trainer', employmentType: 'Salaried / Commission Practitioner', typicalComp: '$42,000 – $72,000 / yr', roleDescription: 'Lead group classes, puppy socialization, and reactive dog modification for facilities.', marketDemand: 'Very High' },
    { title: 'Service & Working Dog Specialist', employmentType: 'Specialist / Lead', typicalComp: '$50,000 – $90,000 / yr', roleDescription: 'Train task-specific assistance dogs, therapy animals, and specialized companion canines.', marketDemand: 'Steady' },
  ],
  rubricDomains: [
    { domain: 'Learning Theory & Conditioning', coreSkills: 'Operant conditioning quadrants, marker precision, reward schedules, desensitization', competentBenchmark: 'Applies positive reinforcement mechanics with split-second marker accuracy.', masteryThreshold: 'Authors custom behavior modification protocols for complex aggression/phobia.' },
    { domain: 'Client Coaching & Communication', coreSkills: 'Human coaching, mechanical drills, homework design, empathy and compliance tracking', competentBenchmark: 'Clearly transfers handling mechanics to owners and designs realistic home routines.', masteryThreshold: 'Achieves 90%+ client homework compliance and retention.' },
  ],
  faqs: [
    { question: 'What certification will I graduate with?', answer: 'Graduates receive the state-approved Professional Dog Trainer Diploma and are fully prepared to sit for national CPDT-KA credentialing.', category: 'Credentials' },
    { question: 'Does this program cover aggression and behavioral rehabilitation?', answer: 'Yes. Terms 2 and 3 cover behavior problem identification, counter-conditioning, desensitization, and threshold management.', category: 'Curriculum' },
  ],
};

// =========================================================================
// B3. SYLLABUS — ANIMAL CARE ASSISTANT (ACA)
// =========================================================================
export const ACA_SYLLABUS: ProgramData = {
  code: 'ACA',
  programName: 'Animal Care Assistant',
  credentialTitle: 'Dog Bather–Animal Care Assistant Diploma (Diploma)',
  totalClockHours: 988,
  technicalHours: 112,
  businessHours: 864,
  appliedHours: 12,
  scheduledWeeks: 35,
  partTimeWeeks: 66,
  scheduleTemplate: 'Mon–Fri 08:00–15:30 (30 hrs/wk) · 08:00–12:00 Bather/Care Lab | 12:30–14:30 Business/Personal Spine | 14:30–15:30 Micro-checks',
  programObjective:
    'Identify a puppy and understand puppy life · Recognize breeds · Recognize grooming tools · Identify workplace safety · Provide basic handling and basic dog care · Understand sanitation process · Enter the workforce with personal readiness and customer-service skills · Understand the bather-to-owner career ladder.',
  admissionRequirements: [
    'Age 18+ (17 with guardian consent)',
    'High school diploma, GED, or Ability-to-Benefit evaluation',
    'Ability to lift 40 lbs, bend, stand in wet tub environments safely',
    'Signed Animal-Handling Safety Acknowledgement',
  ],
  attendancePolicy:
    'Minimum 95% attendance per term. Friday open labs provide required makeup opportunities.',
  gradingStandards:
    'All modules require 10 activities, 10 micro-checks, checkpoints, and quizzes at ≥ 80%. Skills Checklist Competent on handling and sanitation.',
  safetyGates: [
    { code: 'ACA-201', title: 'Hygiene, Key Skills Check & Bather Protocol', stage: 'Term 2', requirement: 'MANDATORY KEY SKILLS CHECK: Water temperature control, ear canal protection, eye lubrication, and tub slip prevention.', isMandatoryBeforeLiveWork: true },
  ],
  practicumMinimums:
    'Supervised log of 30 complete bath, blowout, brush-out, and sanitary preps.',
  completionRequirements: [
    'All 150 modules completed (112 technical + 864 business & personal + 12 applied hours)',
    '988 verified hours recorded in official ledger',
    'Skills Checklist Competent on all bather and business rows',
    'ACA-BIZ career ladder capstone accepted',
  ],
  stacksInto: 'Articulates directly into the Professional Dog Groomer (IPDG) Diploma and PPC Advanced Diploma.',
  weeklySchedule: [
    { week: 1, term: 'T1 Foundation', technicalModules: 'ACA-101 (cont.)', businessModules: 'LSH-101, LSH-102, LSH-103, LSH-104', hoursFormatted: '4 / 24', technicalHours: 4, businessHours: 24, assessments: 'Quizzes: LSH-101, LSH-102, LSH-103, LSH-104' },
    { week: 2, term: 'T1 Foundation', technicalModules: 'ACA-101, ACA-102 (cont.)', businessModules: 'LSH-105, PER-101, PER-102, PER-103', hoursFormatted: '4 / 24', technicalHours: 4, businessHours: 24, assessments: 'Quizzes: ACA-101, LSH-105, PER-101, PER-102, PER-103' },
    { week: 3, term: 'T1 Foundation', technicalModules: 'ACA-102 (cont.)', businessModules: 'PER-104, PER-105, BUS-101, BUS-102', hoursFormatted: '4 / 24', technicalHours: 4, businessHours: 24, assessments: 'Quizzes: PER-104, PER-105, BUS-101, BUS-102' },
    { week: 4, term: 'T1 Foundation', technicalModules: 'ACA-102 (cont.)', businessModules: 'BUS-103, BUS-104, BUS-105, BUS-106', hoursFormatted: '4 / 24', technicalHours: 4, businessHours: 24, assessments: 'Quizzes: BUS-103, BUS-104, BUS-105, BUS-106' },
    { week: 5, term: 'T1 Foundation', technicalModules: 'ACA-102 (cont.)', businessModules: 'MKT-101, MKT-102, MKT-103, MKT-104', hoursFormatted: '4 / 24', technicalHours: 4, businessHours: 24, assessments: 'Quizzes: MKT-101, MKT-102, MKT-103, MKT-104' },
    { week: 6, term: 'T1 Foundation', technicalModules: 'ACA-102 (cont.)', businessModules: 'MKT-105, TEC-101, TEC-102, TEC-103', hoursFormatted: '4 / 24', technicalHours: 4, businessHours: 24, assessments: 'Quizzes: MKT-105, TEC-101, TEC-102, TEC-103' },
    { week: 7, term: 'T1 Foundation', technicalModules: 'ACA-102 (cont.)', businessModules: 'TEC-104, TEC-105, FIN-101, FIN-102', hoursFormatted: '4 / 24', technicalHours: 4, businessHours: 24, assessments: 'Quizzes: TEC-104, TEC-105, FIN-101, FIN-102' },
    { week: 8, term: 'T1 Foundation', technicalModules: 'ACA-102, ACA-103 (cont.)', businessModules: 'FIN-103, FIN-104, FIN-105, LEG-101', hoursFormatted: '4 / 24', technicalHours: 4, businessHours: 24, assessments: 'Quizzes: ACA-102, FIN-103, FIN-104, FIN-105, LEG-101' },
    { week: 9, term: 'T1 Foundation', technicalModules: 'ACA-103', businessModules: 'LEG-102, LEG-103, LEG-104, LEG-105', hoursFormatted: '4 / 24', technicalHours: 4, businessHours: 24, assessments: 'Quizzes: ACA-103, LEG-102, LEG-103, LEG-104, LEG-105 · Term 1 Checkpoint' },
    { week: 10, term: 'T2 Core Skill', technicalModules: 'ACA-201 (cont.)', businessModules: 'LSH-201, LSH-202, LSH-203, LSH-204', hoursFormatted: '3 / 24', technicalHours: 3, businessHours: 24, assessments: 'Quizzes: LSH-201, LSH-202, LSH-203, LSH-204' },
    { week: 11, term: 'T2 Core Skill', technicalModules: 'ACA-201 (cont.)', businessModules: 'LSH-205, PER-201, PER-202, PER-203', hoursFormatted: '3 / 24', technicalHours: 3, businessHours: 24, assessments: 'Quizzes: LSH-205, PER-201, PER-202, PER-203' },
    { week: 12, term: 'T2 Core Skill', technicalModules: 'ACA-201 (cont.)', businessModules: 'PER-204, PER-205, BUS-201, BUS-202', hoursFormatted: '3 / 24', technicalHours: 3, businessHours: 24, assessments: 'Quizzes: PER-204, PER-205, BUS-201, BUS-202' },
    { week: 13, term: 'T2 Core Skill', technicalModules: 'ACA-201 (cont.)', businessModules: 'BUS-203, BUS-204, BUS-205, BUS-206', hoursFormatted: '3 / 24', technicalHours: 3, businessHours: 24, assessments: 'Quizzes: BUS-203, BUS-204, BUS-205, BUS-206' },
    { week: 14, term: 'T2 Core Skill', technicalModules: 'ACA-201 (cont.)', businessModules: 'MKT-201, MKT-202, MKT-203, MKT-204', hoursFormatted: '3 / 24', technicalHours: 3, businessHours: 24, assessments: 'Quizzes: MKT-201, MKT-202, MKT-203, MKT-204' },
    { week: 15, term: 'T2 Core Skill', technicalModules: 'ACA-201 (cont.)', businessModules: 'MKT-205, TEC-201, TEC-202, TEC-203', hoursFormatted: '3 / 24', technicalHours: 3, businessHours: 24, assessments: 'Quizzes: MKT-205, TEC-201, TEC-202, TEC-203' },
    { week: 16, term: 'T2 Core Skill', technicalModules: 'ACA-201 (cont.)', businessModules: 'TEC-204, TEC-205, FIN-201, FIN-202', hoursFormatted: '3 / 24', technicalHours: 3, businessHours: 24, assessments: 'Quizzes: TEC-204, TEC-205, FIN-201, FIN-202' },
    { week: 17, term: 'T2 Core Skill', technicalModules: 'ACA-201 (cont.)', businessModules: 'FIN-203, FIN-204, FIN-205, LEG-201', hoursFormatted: '3 / 24', technicalHours: 3, businessHours: 24, assessments: 'Quizzes: FIN-203, FIN-204, FIN-205, LEG-201' },
    { week: 18, term: 'T2 Core Skill', technicalModules: 'ACA-201', businessModules: 'LEG-202, LEG-203, LEG-204, LEG-205', hoursFormatted: '3 / 24', technicalHours: 3, businessHours: 24, assessments: 'Quizzes: ACA-201 (Key Skills Check), LEG-202, LEG-203, LEG-204, LEG-205 · Term 2 Checkpoint' },
    { week: 19, term: 'T3 Advanced Skill', technicalModules: 'ACA-301 (cont.)', businessModules: 'LSH-301, LSH-302, LSH-303, LSH-304', hoursFormatted: '6 / 24', technicalHours: 6, businessHours: 24, assessments: 'Quizzes: LSH-301, LSH-302, LSH-303, LSH-304' },
    { week: 20, term: 'T3 Advanced Skill', technicalModules: 'ACA-301 (cont.)', businessModules: 'LSH-305, PER-301, PER-302, PER-303', hoursFormatted: '6 / 24', technicalHours: 6, businessHours: 24, assessments: 'Quizzes: LSH-305, PER-301, PER-302, PER-303' },
    { week: 21, term: 'T3 Advanced Skill', technicalModules: 'ACA-301 (cont.)', businessModules: 'PER-304, PER-305, BUS-301, BUS-302', hoursFormatted: '6 / 24', technicalHours: 6, businessHours: 24, assessments: 'Quizzes: PER-304, PER-305, BUS-301, BUS-302' },
    { week: 22, term: 'T3 Advanced Skill', technicalModules: 'ACA-301 (cont.)', businessModules: 'BUS-303, BUS-304, BUS-305, BUS-306', hoursFormatted: '6 / 24', technicalHours: 6, businessHours: 24, assessments: 'Quizzes: BUS-303, BUS-304, BUS-305, BUS-306' },
    { week: 23, term: 'T3 Advanced Skill', technicalModules: 'ACA-301 (cont.)', businessModules: 'MKT-301, MKT-302, MKT-303, MKT-304', hoursFormatted: '6 / 24', technicalHours: 6, businessHours: 24, assessments: 'Quizzes: MKT-301, MKT-302, MKT-303, MKT-304' },
    { week: 24, term: 'T3 Advanced Skill', technicalModules: 'ACA-301 (cont.)', businessModules: 'MKT-305, TEC-301, TEC-302, TEC-303', hoursFormatted: '6 / 24', technicalHours: 6, businessHours: 24, assessments: 'Quizzes: MKT-305, TEC-301, TEC-302, TEC-303' },
    { week: 25, term: 'T3 Advanced Skill', technicalModules: 'ACA-301 (cont.)', businessModules: 'TEC-304, TEC-305, FIN-301, FIN-302', hoursFormatted: '6 / 24', technicalHours: 6, businessHours: 24, assessments: 'Quizzes: TEC-304, TEC-305, FIN-301, FIN-302' },
    { week: 26, term: 'T3 Advanced Skill', technicalModules: 'ACA-301 (cont.)', businessModules: 'FIN-303, FIN-304, FIN-305, LEG-301', hoursFormatted: '6 / 24', technicalHours: 6, businessHours: 24, assessments: 'Quizzes: FIN-303, FIN-304, FIN-305, LEG-301' },
    { week: 27, term: 'T3 Advanced Skill', technicalModules: 'ACA-301', businessModules: 'LEG-302, LEG-303, LEG-304, LEG-305', hoursFormatted: '6 / 24', technicalHours: 6, businessHours: 24, assessments: 'Quizzes: ACA-301, LEG-302, LEG-303, LEG-304, LEG-305 · Term 3 Checkpoint' },
    { week: 28, term: 'T4 Capstone', technicalModules: '—', businessModules: 'LSH-401, LSH-402, LSH-403, LSH-404, LSH-405 (cont.)', hoursFormatted: '0 / 29', technicalHours: 0, businessHours: 29, assessments: 'Quizzes: LSH-401, LSH-402, LSH-403, LSH-404' },
    { week: 29, term: 'T4 Capstone', technicalModules: '—', businessModules: 'LSH-405, PER-401, PER-402, PER-403, PER-404, PER-405 (cont.)', hoursFormatted: '0 / 29', technicalHours: 0, businessHours: 29, assessments: 'Quizzes: LSH-405, PER-401, PER-402, PER-403, PER-404' },
    { week: 30, term: 'T4 Capstone', technicalModules: '—', businessModules: 'PER-405, BUS-401, BUS-402, BUS-403, BUS-404, BUS-405 (cont.)', hoursFormatted: '0 / 29', technicalHours: 0, businessHours: 29, assessments: 'Quizzes: PER-405, BUS-401, BUS-402, BUS-403, BUS-404' },
    { week: 31, term: 'T4 Capstone', technicalModules: '—', businessModules: 'BUS-405, BUS-406, MKT-401, MKT-402, MKT-403', hoursFormatted: '0 / 29', technicalHours: 0, businessHours: 29, assessments: 'Quizzes: BUS-405, BUS-406, MKT-401, MKT-402, MKT-403' },
    { week: 32, term: 'T4 Capstone', technicalModules: '—', businessModules: 'MKT-404, MKT-405, TEC-401, TEC-402, TEC-403 (cont.)', hoursFormatted: '0 / 29', technicalHours: 0, businessHours: 29, assessments: 'Quizzes: MKT-404, MKT-405, TEC-401, TEC-402' },
    { week: 33, term: 'T4 Capstone', technicalModules: '—', businessModules: 'TEC-403, TEC-404, TEC-405, FIN-401, FIN-402, FIN-403 (cont.)', hoursFormatted: '0 / 29', technicalHours: 0, businessHours: 29, assessments: 'Quizzes: TEC-403, TEC-404, TEC-405, FIN-401, FIN-402' },
    { week: 34, term: 'T4 Capstone', technicalModules: '—', businessModules: 'FIN-403, FIN-404, FIN-405, LEG-401, LEG-402, LEG-403 (cont.)', hoursFormatted: '0 / 29', technicalHours: 0, businessHours: 29, assessments: 'Quizzes: FIN-403, FIN-404, FIN-405, LEG-401, LEG-402' },
    { week: 35, term: 'T4 Capstone', technicalModules: '—', businessModules: 'LEG-403, LEG-404, LEG-405, ACA-BIZ', hoursFormatted: '0 / 29', technicalHours: 0, businessHours: 29, assessments: 'Quizzes: LEG-403, LEG-404, LEG-405, ACA-BIZ Capstone Panel Defense' },
  ],
  assessmentCalendar: [
    { point: 'Module Quizzes', when: 'Weekly', instrument: 'Micro-checks + Final LMS Quiz', passStandard: '≥ 80%' },
    { point: 'Safety Checkpoint', when: 'Week 18 (ACA-201)', instrument: 'Bather Key Skills Check Checklist', passStandard: 'Pass/Fail' },
    { point: 'Applied Capstone', when: 'Week 35 (ACA-BIZ)', instrument: 'Bather Career Ladder & Operations Portfolio', passStandard: 'Panel Acceptance' },
  ],
  careerOutcomes: [
    { title: 'Professional Salon Bather & Spa Technician', employmentType: 'Salaried / Commission Practitioner', typicalComp: '$32,000 – $48,000 / yr', roleDescription: 'Execute prep baths, blowouts, de-shedding treatments, and assist senior stylists.', marketDemand: 'Very High' },
    { title: 'Veterinary / Boarding Animal Care Lead', employmentType: 'Salaried / Commission Practitioner', typicalComp: '$34,000 – $52,000 / yr', roleDescription: 'Manage kennel sanitation, medication intake, and patient hygiene in clinical settings.', marketDemand: 'High' },
  ],
  rubricDomains: [
    { domain: 'Sanitation & Pathogen Control', coreSkills: 'Disinfection dilution, table sterilization, infectious disease triage', competentBenchmark: 'Maintains spotless biosecurity protocols between dogs.', masteryThreshold: 'Authors facility sanitation SOPs.' },
  ],
  faqs: [
    { question: 'Is this suitable for someone brand new to animal care?', answer: 'Yes! ACA is our foundational vocational diploma specifically designed to build rock-solid handling, hygiene, and business literacy from the ground up.', category: 'Admissions' },
  ],
};

// =========================================================================
// B4. SYLLABUS — PROFESSIONAL PET SITTER (PPS)
// =========================================================================
export const PPS_SYLLABUS: ProgramData = {
  code: 'PPS',
  programName: 'Professional Pet Sitter',
  credentialTitle: 'Pet Sitter Certificate (Certificate)',
  totalClockHours: 56,
  technicalHours: 14,
  businessHours: 36,
  appliedHours: 6,
  scheduledWeeks: 2,
  partTimeWeeks: 4,
  scheduleTemplate: 'Mon–Fri 08:00–15:30 (30 hrs/wk) · 2-Week Intensive Certificate',
  programObjective:
    'Introduce and choose appropriate clients · Provide multi-species pet care · Handle pets and sanitation safely · Provide CPR and first aid · Launch and run a compliant, insured pet-sitting business.',
  admissionRequirements: [
    'Age 18+',
    'Background check required for in-home client residential access',
    'Reliable vehicle transportation and smart device for GPS/visit logging',
    'Signed Animal-Handling Risk Acknowledgement',
  ],
  attendancePolicy:
    '100% attendance required for the 2-week intensive certificate. Any missed block must be completed immediately in supervised lab.',
  gradingStandards:
    'Module quizzes at ≥ 80% + PPS-BIZ business launch defense.',
  safetyGates: [
    { code: 'PPS-104', title: 'Multi-Species Handling & Medication Administration', stage: 'Week 1', requirement: 'MANDATORY KEY SKILLS CHECK: Oral pill/liquid administration, exotic pet handling, and escape prevention.', isMandatoryBeforeLiveWork: true },
    { code: 'PPS-105', title: 'Pet First Aid, CPR & Home Emergency Protocols', stage: 'Week 2', requirement: 'MANDATORY KEY SKILLS CHECK: CPR certification and emergency homeowner protocol.', isMandatoryBeforeLiveWork: true },
  ],
  practicumMinimums: 'Completed in-home mock visit audit with key security protocol.',
  completionRequirements: [
    'All 11 modules completed (14 technical + 36 business/personal + 6 applied capstone)',
    '56 hours verified in ledger',
    'Defense of PPS-BIZ Launch Plan & Insurance Binder',
  ],
  stacksInto: '100% credited into ACA, IPDG, PDT, and PPC programs.',
  weeklySchedule: [
    { week: 1, term: 'T1 All levels', technicalModules: 'PPS-101, PPS-102, PPS-104, PPS-105 (cont.)', businessModules: 'BUS-101, FIN-101, LEG-101, LEG-103 (cont.)', hoursFormatted: '7 / 21', technicalHours: 7, businessHours: 21, assessments: 'Quizzes: PPS-101, PPS-102, PPS-104 (Key Skills Check), BUS-101, FIN-101, LEG-101' },
    { week: 2, term: 'T1 All levels', technicalModules: 'PPS-105', businessModules: 'LEG-103, BUS-203, MKT-304, PPS-BIZ', hoursFormatted: '7 / 21', technicalHours: 7, businessHours: 21, assessments: 'Quizzes: PPS-105 (CPR Key Skills Check), LEG-103, BUS-203, MKT-304, PPS-BIZ Capstone Defense' },
  ],
  assessmentCalendar: [
    { point: 'Safety Checkoffs', when: 'Week 1 & 2', instrument: 'PPS-104 & PPS-105 Safety Checklist', passStandard: 'Pass/Fail' },
    { point: 'Capstone Review', when: 'Week 2', instrument: 'PPS-BIZ Launch Plan & Insurance Verification', passStandard: 'Panel Approval' },
  ],
  careerOutcomes: [
    { title: 'Independent Pet Sitter / Dog Walker Founder', employmentType: 'Owner-Operator / Entrepreneur', typicalComp: '$40,000 – $85,000 / yr', roleDescription: 'Deliver premium insured in-home sitting, drop-in visits, and dog walking routes.', marketDemand: 'High' },
  ],
  rubricDomains: [
    { domain: 'Home Security & Key Management', coreSkills: 'Lockbox protocols, alarm systems, emergency contact trees', competentBenchmark: 'Flawless custody and zero security breaches.', masteryThreshold: 'Automates contactless client access.' },
  ],
  faqs: [
    { question: 'How fast can I launch my business after completing PPS?', answer: 'Graduates leave Week 2 with an active business entity, insurance binder, pricing schedule, and client contract ready for immediate onboarding.', category: 'Career' },
  ],
};

// =========================================================================
// B5. SYLLABUS — PROFESSIONAL CAT GROOMER (CAT)
// =========================================================================
export const CAT_SYLLABUS: ProgramData = {
  code: 'CAT',
  programName: 'Professional Cat Groomer',
  credentialTitle: 'Professional Cat Groomer Certificate (Certificate)',
  totalClockHours: 58,
  technicalHours: 16,
  businessHours: 36,
  appliedHours: 6,
  scheduledWeeks: 2,
  partTimeWeeks: 4,
  scheduleTemplate: 'Mon–Fri 08:00–15:30 (30 hrs/wk) · Dedicated Feline Suite Lab',
  programObjective:
    'Recognize cat breeds · Read cat temperament and handle safely · Bathe and dry cats safely · Perform short, long and shave-down cat grooms · Add a profitable, safe cat-grooming service line to a business.',
  admissionRequirements: [
    'Age 18+',
    'Prior animal handling experience or concurrent grooming enrollment recommended',
    'Signed Feline-Handling Risk Acknowledgement',
  ],
  attendancePolicy: '100% attendance required across the 2-week intensive.',
  gradingStandards: 'Quizzes at ≥ 80% + CAT-BIZ service line launch defense.',
  safetyGates: [
    { code: 'CAT-102', title: 'Low-Stress Feline Restraint & Scruffing Alternatives', stage: 'Week 1', requirement: 'MANDATORY KEY SKILLS CHECK: Low-stress towel wraps, muzzle safety, bite barrier protocols, and stress threshold monitoring.', isMandatoryBeforeLiveWork: true },
  ],
  practicumMinimums: 'Completed bath, comb-out, sanitary trim, and full lion cut on feline simulation and live cats.',
  completionRequirements: [
    'All 11 modules completed (16 technical + 36 business/personal + 6 applied)',
    '58 hours recorded',
    'CAT-BIZ feline service menu and pricing defense passed',
  ],
  stacksInto: 'Credited directly toward IPDG and PPC Advanced Diploma.',
  weeklySchedule: [
    { week: 1, term: 'T1 All levels', technicalModules: 'CAT-101, CAT-102', businessModules: 'BUS-101, FIN-101, LEG-101, LEG-103 (cont.)', hoursFormatted: '8 / 21', technicalHours: 8, businessHours: 21, assessments: 'Quizzes: CAT-101, CAT-102 (Key Skills Check), BUS-101, FIN-101, LEG-101' },
    { week: 2, term: 'T1 All levels', technicalModules: 'CAT-103, CAT-104', businessModules: 'LEG-103, BUS-203, MKT-304, CAT-BIZ', hoursFormatted: '8 / 21', technicalHours: 8, businessHours: 21, assessments: 'Quizzes: CAT-103, CAT-104, LEG-103, BUS-203, MKT-304, CAT-BIZ Capstone Defense' },
  ],
  assessmentCalendar: [
    { point: 'Feline Key Skills Check', when: 'Week 1 (CAT-102)', instrument: 'Towel wrap and threshold test', passStandard: 'Pass/Fail' },
    { point: 'Applied Capstone Panel', when: 'Week 2 (CAT-BIZ)', instrument: 'Feline salon add-on financial plan', passStandard: 'Panel Approval' },
  ],
  careerOutcomes: [
    { title: 'Feline Exclusive Master Groomer', employmentType: 'Specialist / Lead', typicalComp: '$60,000 – $110,000 / yr', roleDescription: 'Provide high-ticket feline grooming services with premium rates ($90–$180/hr).', marketDemand: 'Extremely High' },
  ],
  rubricDomains: [
    { domain: 'Feline Stress Mitigation', coreSkills: 'Reading ear positions, tail swishing, respiratory monitoring, zero-force handling', competentBenchmark: 'Executes complete grooms without elevating feline cortisol or causing aggression.', masteryThreshold: 'Handles geriatric and severely pelted cats safely.' },
  ],
  faqs: [
    { question: 'Why is cat grooming in such high demand?', answer: 'Most dog salons do not accept cats due to lack of certified feline training. Certified cat groomers command 50–100% higher hourly service fees.', category: 'Industry' },
  ],
};

// =========================================================================
// B6. SYLLABUS — PROFESSIONAL PET CARE & BUSINESS OWNERSHIP (PPC)
// =========================================================================
export const PPC_SYLLABUS: ProgramData = {
  code: 'PPC',
  programName: 'Professional Pet Care & Business Ownership',
  credentialTitle: 'Professional Pet Care & Business Ownership — Advanced Diploma (Advanced Diploma)',
  totalClockHours: 1500,
  technicalHours: 600,
  businessHours: 864,
  appliedHours: 36,
  scheduledWeeks: 52,
  partTimeWeeks: 100,
  scheduleTemplate: 'Mon–Fri 08:00–15:30 (30 hrs/wk) · Full-Year Comprehensive Enterprise Track',
  programObjective:
    'All IPDG, PDT, PPS and CAT technical objectives · Supervise a multi-service hands-on practice across salon floor, training floor and pet sitting visits · Master the full Business & Personal Mastery spine (LSH, PER, BUS, MKT, TEC, FIN, LEG) · Launch, fund, staff, market, protect and scale a multi-service pet-care enterprise · Master personal life systems, finances and well-being as a whole-person owner · Provide CPR and first aid.',
  admissionRequirements: [
    'Age 18+ (17 with guardian consent)',
    'High school diploma or GED equivalent',
    'Physical ability to participate across grooming salons, training rings, and daycare facilities',
    'Background check & signed Risk Acknowledgement',
  ],
  attendancePolicy:
    '95% minimum attendance per term across all 52 scheduled weeks. Friday makeup labs mandatory for missed hours.',
  gradingStandards:
    'All 172 modules require 10 activities, 10 micro-checks, checkpoints, and quizzes at ≥ 80%. PPC-BIZ panel defense required.',
  safetyGates: [
    { code: 'PPC-105', title: 'Salon Sanitation & Infection Control [Key Skills Check]', stage: 'Term 1', requirement: 'MANDATORY KEY SKILLS CHECK: Pathogen control, chemical safety, and sterilization.', isMandatoryBeforeLiveWork: true },
    { code: 'PPC-201', title: 'Intermediate Canine Grooming & Scissor Control [Key Skills Check]', stage: 'Term 2', requirement: 'MANDATORY KEY SKILLS CHECK: Scissor technique on sanitary areas and face.', isMandatoryBeforeLiveWork: true },
    { code: 'PPC-306', title: 'Boarding, Daycare & Multi-Dog Group Play Safety [Key Skills Check]', stage: 'Term 3', requirement: 'MANDATORY KEY SKILLS CHECK: Pack dynamics, fight interruption, and play yard protocols.', isMandatoryBeforeLiveWork: true },
    { code: 'PPC-403', title: 'Advanced Pet Sitting & In-Home Medical Administration [Key Skills Check]', stage: 'Term 4', requirement: 'MANDATORY KEY SKILLS CHECK: Subcutaneous fluids, insulin injections, and emergency triage.', isMandatoryBeforeLiveWork: true },
    { code: 'PPC-405', title: 'Advanced Feline Grooming & Lion Cut Execution [Key Skills Check]', stage: 'Term 4', requirement: 'MANDATORY KEY SKILLS CHECK: Feline clipper safety on delicate skin folds.', isMandatoryBeforeLiveWork: true },
    { code: 'PPC-410', title: 'Comprehensive CPR, First Aid & Crisis Management [Key Skills Check]', stage: 'Term 4', requirement: 'MANDATORY KEY SKILLS CHECK: Full multi-species CPR/First Aid certification.', isMandatoryBeforeLiveWork: true },
  ],
  practicumMinimums:
    'Multi-service hands-on practice log: 16 live grooms, 1 private training class delivered, 10 boarding/daycare shifts, and 5 in-home visits.',
  completionRequirements: [
    'Complete all 172 modules (600 technical + 864 business & personal + 36 applied capstone hours)',
    '1,500 hours recorded in attendance ledger',
    'Skills Checklist Competent on every row',
    'Defend PPC-BIZ Comprehensive Business Plan before Director & Owner panel',
  ],
  stacksInto: 'Advanced Certification — Highest vocational pet-care credential awarded.',
  weeklySchedule: [
    { week: 1, term: 'T1 Foundation', technicalModules: 'PPC-101 (cont.)', businessModules: 'LSH-101, LSH-102, LSH-103', hoursFormatted: '10 / 18', technicalHours: 10, businessHours: 18, assessments: 'Quizzes: LSH-101, LSH-102, LSH-103' },
    { week: 2, term: 'T1 Foundation', technicalModules: 'PPC-101, PPC-102 (cont.)', businessModules: 'LSH-104, LSH-105, PER-101', hoursFormatted: '10 / 18', technicalHours: 10, businessHours: 18, assessments: 'Quizzes: PPC-101, LSH-104, LSH-105, PER-101' },
    { week: 3, term: 'T1 Foundation', technicalModules: 'PPC-102 (cont.)', businessModules: 'PER-102, PER-103, PER-104', hoursFormatted: '10 / 18', technicalHours: 10, businessHours: 18, assessments: 'Quizzes: PER-102, PER-103, PER-104' },
    { week: 4, term: 'T1 Foundation', technicalModules: 'PPC-102, PPC-103 (cont.)', businessModules: 'PER-105, BUS-101, BUS-102', hoursFormatted: '10 / 18', technicalHours: 10, businessHours: 18, assessments: 'Quizzes: PPC-102, PER-105, BUS-101, BUS-102' },
    { week: 5, term: 'T1 Foundation', technicalModules: 'PPC-103, PPC-104 (cont.)', businessModules: 'BUS-103, BUS-104, BUS-105', hoursFormatted: '10 / 18', technicalHours: 10, businessHours: 18, assessments: 'Quizzes: PPC-103, BUS-103, BUS-104, BUS-105' },
    { week: 6, term: 'T1 Foundation', technicalModules: 'PPC-104 (cont.)', businessModules: 'BUS-106, MKT-101, MKT-102', hoursFormatted: '10 / 18', technicalHours: 10, businessHours: 18, assessments: 'Quizzes: BUS-106, MKT-101, MKT-102' },
    { week: 7, term: 'T1 Foundation', technicalModules: 'PPC-104, PPC-105 (cont.)', businessModules: 'MKT-103, MKT-104, MKT-105', hoursFormatted: '10 / 18', technicalHours: 10, businessHours: 18, assessments: 'Quizzes: PPC-104, MKT-103, MKT-104, MKT-105' },
    { week: 8, term: 'T1 Foundation', technicalModules: 'PPC-105 (cont.)', businessModules: 'TEC-101, TEC-102, TEC-103', hoursFormatted: '10 / 18', technicalHours: 10, businessHours: 18, assessments: 'Quizzes: TEC-101, TEC-102, TEC-103' },
    { week: 9, term: 'T1 Foundation', technicalModules: 'PPC-105 (cont.)', businessModules: 'TEC-104, TEC-105, FIN-101', hoursFormatted: '10 / 18', technicalHours: 10, businessHours: 18, assessments: 'Quizzes: TEC-104, TEC-105, FIN-101' },
    { week: 10, term: 'T1 Foundation', technicalModules: 'PPC-105, PPC-106 (cont.)', businessModules: 'FIN-102, FIN-103, FIN-104', hoursFormatted: '10 / 18', technicalHours: 10, businessHours: 18, assessments: 'Quizzes: PPC-105 (Key Skills Check), FIN-102, FIN-103, FIN-104' },
    { week: 11, term: 'T1 Foundation', technicalModules: 'PPC-106 (cont.)', businessModules: 'FIN-105, LEG-101, LEG-102', hoursFormatted: '10 / 18', technicalHours: 10, businessHours: 18, assessments: 'Quizzes: FIN-105, LEG-101, LEG-102' },
    { week: 12, term: 'T1 Foundation', technicalModules: 'PPC-106', businessModules: 'LEG-103, LEG-104, LEG-105', hoursFormatted: '10 / 18', technicalHours: 10, businessHours: 18, assessments: 'Quizzes: PPC-106, LEG-103, LEG-104, LEG-105 · Term 1 Checkpoint & Skills Checklist Review' },
    { week: 13, term: 'T2 Core Skill', technicalModules: 'PPC-201 (cont.)', businessModules: 'LSH-201, LSH-202, LSH-203 (cont.)', hoursFormatted: '13 / 17', technicalHours: 13, businessHours: 17, assessments: 'Quizzes: LSH-201, LSH-202' },
    { week: 14, term: 'T2 Core Skill', technicalModules: 'PPC-201, PPC-202 (cont.)', businessModules: 'LSH-203, LSH-204, LSH-205, PER-201 (cont.)', hoursFormatted: '13 / 17', technicalHours: 13, businessHours: 17, assessments: 'Quizzes: PPC-201 (Key Skills Check), LSH-203, LSH-204, LSH-205' },
    { week: 15, term: 'T2 Core Skill', technicalModules: 'PPC-202 (cont.)', businessModules: 'PER-201, PER-202, PER-203, PER-204 (cont.)', hoursFormatted: '13 / 17', technicalHours: 13, businessHours: 17, assessments: 'Quizzes: PER-201, PER-202, PER-203' },
    { week: 16, term: 'T2 Core Skill', technicalModules: 'PPC-202, PPC-203 (cont.)', businessModules: 'PER-204, PER-205, BUS-201, BUS-202 (cont.)', hoursFormatted: '13 / 17', technicalHours: 13, businessHours: 17, assessments: 'Quizzes: PPC-202, PER-204, PER-205, BUS-201' },
    { week: 17, term: 'T2 Core Skill', technicalModules: 'PPC-203 (cont.)', businessModules: 'BUS-202, BUS-203, BUS-204 (cont.)', hoursFormatted: '13 / 17', technicalHours: 13, businessHours: 17, assessments: 'Quizzes: BUS-202, BUS-203' },
    { week: 18, term: 'T2 Core Skill', technicalModules: 'PPC-203 (cont.)', businessModules: 'BUS-204, BUS-205, BUS-206, MKT-201 (cont.)', hoursFormatted: '13 / 17', technicalHours: 13, businessHours: 17, assessments: 'Quizzes: BUS-204, BUS-205, BUS-206' },
    { week: 19, term: 'T2 Core Skill', technicalModules: 'PPC-203, PPC-204 (cont.)', businessModules: 'MKT-201, MKT-202, MKT-203, MKT-204 (cont.)', hoursFormatted: '13 / 17', technicalHours: 13, businessHours: 17, assessments: 'Quizzes: PPC-203, MKT-201, MKT-202, MKT-203' },
    { week: 20, term: 'T2 Core Skill', technicalModules: 'PPC-204 (cont.)', businessModules: 'MKT-204, MKT-205, TEC-201, TEC-202 (cont.)', hoursFormatted: '13 / 17', technicalHours: 13, businessHours: 17, assessments: 'Quizzes: MKT-204, MKT-205, TEC-201' },
    { week: 21, term: 'T2 Core Skill', technicalModules: 'PPC-204 (cont.)', businessModules: 'TEC-202, TEC-203, TEC-204 (cont.)', hoursFormatted: '13 / 17', technicalHours: 13, businessHours: 17, assessments: 'Quizzes: TEC-202, TEC-203' },
    { week: 22, term: 'T2 Core Skill', technicalModules: 'PPC-204, PPC-205 (cont.)', businessModules: 'TEC-204, TEC-205, FIN-201, FIN-202 (cont.)', hoursFormatted: '13 / 17', technicalHours: 13, businessHours: 17, assessments: 'Quizzes: PPC-204, TEC-204, TEC-205, FIN-201' },
    { week: 23, term: 'T2 Core Skill', technicalModules: 'PPC-205 (cont.)', businessModules: 'FIN-202, FIN-203, FIN-204, FIN-205 (cont.)', hoursFormatted: '13 / 17', technicalHours: 13, businessHours: 17, assessments: 'Quizzes: FIN-202, FIN-203, FIN-204' },
    { week: 24, term: 'T2 Core Skill', technicalModules: 'PPC-205 (cont.)', businessModules: 'FIN-205, LEG-201, LEG-202, LEG-203 (cont.)', hoursFormatted: '13 / 17', technicalHours: 13, businessHours: 17, assessments: 'Quizzes: FIN-205, LEG-201, LEG-202' },
    { week: 25, term: 'T2 Core Skill', technicalModules: 'PPC-205', businessModules: 'LEG-203, LEG-204, LEG-205', hoursFormatted: '13 / 17', technicalHours: 13, businessHours: 17, assessments: 'Quizzes: PPC-205, LEG-203, LEG-204, LEG-205 · Term 2 Checkpoint & Skills Checklist Review' },
    { week: 26, term: 'T3 Advanced Skill', technicalModules: 'PPC-301 (cont.)', businessModules: 'LSH-301, LSH-302, LSH-303 (cont.)', hoursFormatted: '15 / 14', technicalHours: 15, businessHours: 14, assessments: 'Quizzes: LSH-301, LSH-302' },
    { week: 27, term: 'T3 Advanced Skill', technicalModules: 'PPC-301, PPC-302 (cont.)', businessModules: 'LSH-303, LSH-304, LSH-305 (cont.)', hoursFormatted: '15 / 14', technicalHours: 15, businessHours: 14, assessments: 'Quizzes: PPC-301, LSH-303, LSH-304' },
    { week: 28, term: 'T3 Advanced Skill', technicalModules: 'PPC-302', businessModules: 'LSH-305, PER-301, PER-302, PER-303 (cont.)', hoursFormatted: '15 / 14', technicalHours: 15, businessHours: 14, assessments: 'Quizzes: PPC-302, LSH-305, PER-301, PER-302' },
    { week: 29, term: 'T3 Advanced Skill', technicalModules: 'PPC-303 (cont.)', businessModules: 'PER-303, PER-304, PER-305 (cont.)', hoursFormatted: '15 / 14', technicalHours: 15, businessHours: 14, assessments: 'Quizzes: PER-303, PER-304' },
    { week: 30, term: 'T3 Advanced Skill', technicalModules: 'PPC-303', businessModules: 'PER-305, BUS-301, BUS-302', hoursFormatted: '15 / 14', technicalHours: 15, businessHours: 14, assessments: 'Quizzes: PPC-303, PER-305, BUS-301, BUS-302' },
    { week: 31, term: 'T3 Advanced Skill', technicalModules: 'PPC-304 (cont.)', businessModules: 'BUS-303, BUS-304, BUS-305 (cont.)', hoursFormatted: '15 / 14', technicalHours: 15, businessHours: 14, assessments: 'Quizzes: BUS-303, BUS-304' },
    { week: 32, term: 'T3 Advanced Skill', technicalModules: 'PPC-304, PPC-305 (cont.)', businessModules: 'BUS-305, BUS-306, MKT-301 (cont.)', hoursFormatted: '15 / 14', technicalHours: 15, businessHours: 14, assessments: 'Quizzes: PPC-304, BUS-305, BUS-306' },
    { week: 33, term: 'T3 Advanced Skill', technicalModules: 'PPC-305 (cont.)', businessModules: 'MKT-301, MKT-302, MKT-303, MKT-304 (cont.)', hoursFormatted: '15 / 14', technicalHours: 15, businessHours: 14, assessments: 'Quizzes: MKT-301, MKT-302, MKT-303' },
    { week: 34, term: 'T3 Advanced Skill', technicalModules: 'PPC-305 (cont.)', businessModules: 'MKT-304, MKT-305, TEC-301 (cont.)', hoursFormatted: '15 / 14', technicalHours: 15, businessHours: 14, assessments: 'Quizzes: MKT-304, MKT-305' },
    { week: 35, term: 'T3 Advanced Skill', technicalModules: 'PPC-305 (cont.)', businessModules: 'TEC-301, TEC-302, TEC-303', hoursFormatted: '15 / 14', technicalHours: 15, businessHours: 14, assessments: 'Quizzes: TEC-301, TEC-302, TEC-303' },
    { week: 36, term: 'T3 Advanced Skill', technicalModules: 'PPC-305 (cont.)', businessModules: 'TEC-304, TEC-305, FIN-301 (cont.)', hoursFormatted: '15 / 14', technicalHours: 15, businessHours: 14, assessments: 'Quizzes: TEC-304, TEC-305' },
    { week: 37, term: 'T3 Advanced Skill', technicalModules: 'PPC-305 (cont.)', businessModules: 'FIN-301, FIN-302, FIN-303 (cont.)', hoursFormatted: '15 / 14', technicalHours: 15, businessHours: 14, assessments: 'Quizzes: FIN-301, FIN-302' },
    { week: 38, term: 'T3 Advanced Skill', technicalModules: 'PPC-305 (cont.)', businessModules: 'FIN-303, FIN-304, FIN-305, LEG-301 (cont.)', hoursFormatted: '15 / 14', technicalHours: 15, businessHours: 14, assessments: 'Quizzes: FIN-303, FIN-304, FIN-305' },
    { week: 39, term: 'T3 Advanced Skill', technicalModules: 'PPC-305 (cont.)', businessModules: 'LEG-301, LEG-302, LEG-303 (cont.)', hoursFormatted: '15 / 14', technicalHours: 15, businessHours: 14, assessments: 'Quizzes: LEG-301, LEG-302' },
    { week: 40, term: 'T3 Advanced Skill', technicalModules: 'PPC-305, PPC-306', businessModules: 'LEG-303, LEG-304, LEG-305', hoursFormatted: '15 / 14', technicalHours: 15, businessHours: 14, assessments: 'Quizzes: PPC-305, PPC-306 (Key Skills Check), LEG-303, LEG-304, LEG-305 · Term 3 Checkpoint' },
    { week: 41, term: 'T4 Capstone', technicalModules: 'PPC-401, PPC-402, PPC-403, PPC-404, PPC-405 (cont.)', businessModules: 'LSH-401, LSH-402, LSH-403, LSH-404 (cont.)', hoursFormatted: '8 / 21', technicalHours: 8, businessHours: 21, assessments: 'Quizzes: PPC-401, PPC-402, PPC-403 (Key Skills Check), PPC-404, LSH-401, LSH-402, LSH-403' },
    { week: 42, term: 'T4 Capstone', technicalModules: 'PPC-405, PPC-406 (cont.)', businessModules: 'LSH-404, LSH-405, PER-401, PER-402', hoursFormatted: '8 / 21', technicalHours: 8, businessHours: 21, assessments: 'Quizzes: PPC-405 (Key Skills Check), LSH-404, LSH-405, PER-401, PER-402' },
    { week: 43, term: 'T4 Capstone', technicalModules: 'PPC-406, PPC-407, PPC-408 (cont.)', businessModules: 'PER-403, PER-404, PER-405, BUS-401 (cont.)', hoursFormatted: '8 / 21', technicalHours: 8, businessHours: 21, assessments: 'Quizzes: PPC-406, PPC-407, PER-403, PER-404, PER-405' },
    { week: 44, term: 'T4 Capstone', technicalModules: 'PPC-408, PPC-409 (cont.)', businessModules: 'BUS-401, BUS-402, BUS-403, BUS-404', hoursFormatted: '8 / 21', technicalHours: 8, businessHours: 21, assessments: 'Quizzes: PPC-408 (Training Hands-On Practice), BUS-401, BUS-402, BUS-403, BUS-404' },
    { week: 45, term: 'T4 Capstone', technicalModules: 'PPC-409 (cont.)', businessModules: 'BUS-405, BUS-406, MKT-401, MKT-402 (cont.)', hoursFormatted: '8 / 21', technicalHours: 8, businessHours: 21, assessments: 'Quizzes: BUS-405, BUS-406, MKT-401' },
    { week: 46, term: 'T4 Capstone', technicalModules: 'PPC-409 (cont.)', businessModules: 'MKT-402, MKT-403, MKT-404, MKT-405', hoursFormatted: '8 / 21', technicalHours: 8, businessHours: 21, assessments: 'Quizzes: MKT-402, MKT-403, MKT-404, MKT-405' },
    { week: 47, term: 'T4 Capstone', technicalModules: 'PPC-409 (cont.)', businessModules: 'TEC-401, TEC-402, TEC-403, TEC-404 (cont.)', hoursFormatted: '8 / 21', technicalHours: 8, businessHours: 21, assessments: 'Quizzes: TEC-401, TEC-402, TEC-403' },
    { week: 48, term: 'T4 Capstone', technicalModules: 'PPC-409 (cont.)', businessModules: 'TEC-404, TEC-405, FIN-401, FIN-402', hoursFormatted: '8 / 21', technicalHours: 8, businessHours: 21, assessments: 'Quizzes: TEC-404, TEC-405, FIN-401, FIN-402' },
    { week: 49, term: 'T4 Capstone', technicalModules: 'PPC-409 (cont.)', businessModules: 'FIN-403, FIN-404, FIN-405, LEG-401 (cont.)', hoursFormatted: '8 / 21', technicalHours: 8, businessHours: 21, assessments: 'Quizzes: FIN-403, FIN-404, FIN-405' },
    { week: 50, term: 'T4 Capstone', technicalModules: 'PPC-409 (cont.)', businessModules: 'LEG-401, LEG-402, LEG-403, LEG-404', hoursFormatted: '8 / 21', technicalHours: 8, businessHours: 21, assessments: 'Quizzes: LEG-401, LEG-402, LEG-403, LEG-404' },
    { week: 51, term: 'T4 Capstone', technicalModules: 'PPC-409, PPC-410 (cont.)', businessModules: 'LEG-405, PPC-BIZ (cont.)', hoursFormatted: '8 / 21', technicalHours: 8, businessHours: 21, assessments: 'Quizzes: PPC-409 Hands-On Practice Sign-Off, LEG-405' },
    { week: 52, term: 'T4 Capstone', technicalModules: 'PPC-410', businessModules: 'PPC-BIZ', hoursFormatted: '8 / 21', technicalHours: 8, businessHours: 21, assessments: 'Quizzes: PPC-410 (Key Skills Check), PPC-BIZ Comprehensive Capstone Defense · Advanced Diploma Award' },
  ],
  assessmentCalendar: [
    { point: 'Weekly Module Quizzes', when: 'Weeks 1–52', instrument: 'Micro-checks + Final LMS Quiz', passStandard: '≥ 80%' },
    { point: 'Term 1 Foundation Check', when: 'Week 12', instrument: 'Sanitation Gate + Term 1 Skills Checklist', passStandard: 'Competent; ≥ 95% attendance' },
    { point: 'Term 2 Core Skills Check', when: 'Week 25', instrument: 'Scissor Control & Basic Obedience Checkoff', passStandard: 'Competent; ≥ 95% attendance' },
    { point: 'Term 3 Advanced Check', when: 'Week 40', instrument: 'Daycare & Feline Key Skills Checks', passStandard: 'Competent; ≥ 95% attendance' },
    { point: 'Multi-Service Hands-On Practice', when: 'Term 4 (PPC-408/409)', instrument: 'Supervised salon, training & boarding logs', passStandard: 'All shift minimums verified' },
    { point: 'Applied Capstone Panel', when: 'Week 52 (PPC-BIZ)', instrument: 'Comprehensive enterprise plan defense with Owner & Director', passStandard: 'Unanimous Panel Approval' },
  ],
  careerOutcomes: [
    { title: 'Multi-Service Pet Care Enterprise Founder', employmentType: 'Owner-Operator / Entrepreneur', typicalComp: '$90,000 – $220,000+ / yr', roleDescription: 'Launch and scale a premier full-service pet resort offering grooming, training, daycare, and in-home care.', marketDemand: 'Exceptional' },
    { title: 'Pet Resort General Manager', employmentType: 'Specialist / Lead', typicalComp: '$65,000 – $95,000 / yr', roleDescription: 'Lead commercial operations, oversee multi-disciplinary staff, and drive customer retention.', marketDemand: 'High' },
  ],
  rubricDomains: [
    { domain: 'Enterprise & Multi-Service Mastery', coreSkills: 'Salon, ring, daycare, mobile, and in-home operations synergy', competentBenchmark: 'Operates seamlessly across all 4 pet care verticals with strict compliance.', masteryThreshold: 'Scales multi-location or franchised pet care operations.' },
  ],
  faqs: [
    { question: 'What makes the PPC Advanced Diploma unique?', answer: 'PPC is the only 1,500-hour comprehensive diploma that integrates all four pet care verticals (Dog Grooming, Dog Training, Pet Sitting, and Cat Grooming) with the full 864-hour Business & Personal Mastery spine.', category: 'Program Overview' },
  ],
};

export const ALL_PROGRAM_SYLLABI: Record<string, ProgramData> = {
  IPDG: IPDG_SYLLABUS,
  PDT: PDT_SYLLABUS,
  ACA: ACA_SYLLABUS,
  PPS: PPS_SYLLABUS,
  CAT: CAT_SYLLABUS,
  PPC: PPC_SYLLABUS,
  ipdg: IPDG_SYLLABUS,
  pdt: PDT_SYLLABUS,
  aca: ACA_SYLLABUS,
  pps: PPS_SYLLABUS,
  cat: CAT_SYLLABUS,
  ppc: PPC_SYLLABUS,
};
