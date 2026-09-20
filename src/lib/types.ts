export type Area = {
  area: string;
  statute: string;
  grades: string[] | null;
  sourceExcerpt: string;
  excerptCitation: string;
  citationMatchesExcerpt: boolean;
};

export type StateSummary = {
  state: string;
  authority: string;
  mode: "require" | "recommend";
  standardStatute: string;
  curriculumEntity: string;
  areas: Area[];
};

export type Selection = {
  state: string;
  area: string;
  statute: string;
  grade: string;
};

export type CompanionSection = {
  title: string;
  lesson: string;
  workedExample: string;
  checks: string[];
};

export type Companion = {
  title: string;
  subtitle: string;
  overview: string;
  alignment: {
    state: string;
    grade: string;
    area: string;
    statute: string;
    authority: string;
    note: string;
  };
  learningObjectives: string[];
  sections: CompanionSection[];
  independentPractice: string[];
  appliedProject: {
    title: string;
    brief: string;
    deliverables: string[];
  };
  glossary: Array<{ term: string; definition: string }>;
  familyNote: string;
  sources: string[];
};

export type CourseRecord = {
  id: number;
  state: string;
  area: string;
  statute: string;
  grade: string;
  title: string;
  companion: Companion;
  model: string;
  createdAt: string;
};
