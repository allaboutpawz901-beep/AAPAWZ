// All About Pawz Academy — Course Catalog & Syllabi
// EVERY field sourced from the Leashed Course Catalog & Syllabi v1.0
// 15 pathways, 146 modules — real module names, real hours, real terms.

export type ProgramDetails = {
  id: string;
  code: string;
  slug: string;
  title: string;
  fullTitle: string;
  subtitle: string;
  tagline: string;
  heroQuote: string;
  heroQuoteAttribution: string;
  badge: string;
  credential: string;
  totalWeeks: number;
  totalWeeksFormatted: string;
  partTimeWeeksFormatted: string;
  totalModules: number;
  totalClockHours: number;
  termsCount: number;
  heroImage: string;
  scheduleWeekly: string;
  stats: { weeks: string; modules: string; hours: string; credential: string };
  overviewParagraphs: string[];
  programObjective: string;
  safetyGates: string[];
  capstoneCode: string;
  stacksInto: string;
  admissionRequirements: string;
  coreCompetencies: { icon: string; label: string }[];
  donutData: { technical: number; businessPersonal: number; applied: number };
  breakdown: { type: string; percent: string; hours: number; description: string }[];
  manuals: { id: string; title: string; type: string }[];
  deliveryAndAccess: { icon: string; title: string; description: string }[];
  completionRequirements: string[];
  terms: {
    termNumber: number;
    name: string;
    technicalModules: string[];
    businessModules: string;
    appliedModule: string | null;
    techHours: number;
    businessHours: number;
    appliedHours: number;
    termHours: number;
    durationWeeks: string;
    description: string;
    modulesCount: number;
    clockHours: number;
    modulesSummary: { technicalHours: number; businessHours: number; appliedHours: number };
    courseHighlights: { code: string; title: string; hours: number; description: string }[];
  }[];
};

// ─── ABT — Animal Behavior Technician ──────────────────────────────────────────
const abt: ProgramDetails = {
  id: "abt",
  code: "ABT",
  slug: "animal-behavior-technician",
  title: "Animal Behavior Technician",
  fullTitle: "Animal Behavior Technician",
  subtitle: "Individuals seeking animal behavior modification and counseling skills.",
  tagline: "Animal Behavior Technician.",
  heroQuote: "Skills that save lives and build careers.",
  heroQuoteAttribution: "Leashed",
  badge: "ACADEMY",
  credential: "Animal Behavior Technician",
  totalWeeks: 52,
  totalWeeksFormatted: "12 months",
  partTimeWeeksFormatted: "Part-Time Available",
  totalModules: 9,
  totalClockHours: 485,
  termsCount: 3,
  heroImage: "/images/pets_caregiver.jpg",
  scheduleWeekly: "30 Hours / Week · Mon – Fri | 08:00 – 15:30",
  stats: { weeks: "52 Weeks", modules: "9 Modules", hours: "485 Hours", credential: "1 Credential" },
  overviewParagraphs: ["Animal Behavior Technician is a 12 months program with 9 modules and 385 instructional hours.", "Target: Individuals seeking animal behavior modification and counseling skills."],
  programObjective: "Individuals seeking animal behavior modification and counseling skills.",
  safetyGates: [],
  capstoneCode: "ABT-109",
  stacksInto: "",
  admissionRequirements: "Age 18+",
  coreCompetencies: [
    { icon: "Scissors", label: "Foundations of Animal Behavior" },
    { icon: "Heart", label: "Normal Development, Behavior" },
    { icon: "Shield", label: "Neurochemistry" },
    { icon: "PawPrint", label: "Applied Behavior Modification Techniques" },
  ],
  donutData: { technical: 485, businessPersonal: 0, applied: 0 },
  breakdown: [{ type: "Total Hours", percent: "100%", hours: 485, description: "9 modules" }],
  manuals: [],
  deliveryAndAccess: [],
  completionRequirements: ["Complete all 9 modules", "Complete 385 instructional hours"],
  terms: [
    { termNumber: 1, name: "Term 1", technicalModules: ["ABT-101", "ABT-102", "ABT-103"], businessModules: "", appliedModule: null, techHours: 120, businessHours: 0, appliedHours: 0, termHours: 120, durationWeeks: "≈ 17 Weeks", description: "Term 1 modules.", modulesCount: 3, clockHours: 120, modulesSummary: { technicalHours: 120, businessHours: 0, appliedHours: 0 }, courseHighlights: [
      { code: "ABT-101", title: "Foundations of Animal Behavior & Learning Theory", hours: 45, description: "" },
      { code: "ABT-102", title: "Normal Development, Behavior & Observation Across Species", hours: 40, description: "" },
      { code: "ABT-103", title: "Neurochemistry & Psychopharmacology", hours: 35, description: "" },
    ] },
    { termNumber: 2, name: "Term 2", technicalModules: ["ABT-104", "ABT-105", "ABT-106"], businessModules: "", appliedModule: null, techHours: 140, businessHours: 0, appliedHours: 0, termHours: 140, durationWeeks: "≈ 17 Weeks", description: "Term 2 modules.", modulesCount: 3, clockHours: 140, modulesSummary: { technicalHours: 140, businessHours: 0, appliedHours: 0 }, courseHighlights: [
      { code: "ABT-104", title: "Applied Behavior Modification Techniques", hours: 50, description: "" },
      { code: "ABT-105", title: "Behavior Problems & Treatment Strategies", hours: 50, description: "" },
      { code: "ABT-106", title: "Client Communication, Counseling & Professional Skills", hours: 40, description: "" },
    ] },
    { termNumber: 3, name: "Term 3", technicalModules: ["ABT-107", "ABT-108", "ABT-109"], businessModules: "", appliedModule: null, techHours: 125, businessHours: 0, appliedHours: 0, termHours: 125, durationWeeks: "≈ 17 Weeks", description: "Term 3 modules.", modulesCount: 3, clockHours: 125, modulesSummary: { technicalHours: 125, businessHours: 0, appliedHours: 0 }, courseHighlights: [
      { code: "ABT-107", title: "Training Protocols & Problem Prevention", hours: 45, description: "" },
      { code: "ABT-108", title: "Professional Practice, Ethics & LA", hours: 35, description: "" },
      { code: "ABT-109", title: "Clinical Practicum & Portfolio", hours: 45, description: "" },
    ] },
  ],
};

// ─── ACA — Animal Care Assistant ──────────────────────────────────────────
const aca: ProgramDetails = {
  id: "aca",
  code: "ACA",
  slug: "animal-care-assistant",
  title: "Animal Care Assistant",
  fullTitle: "Animal Care Assistant",
  subtitle: "Individuals seeking foundational animal care and handling skills.",
  tagline: "Animal Care Assistant.",
  heroQuote: "Skills that save lives and build careers.",
  heroQuoteAttribution: "Leashed",
  badge: "ACADEMY",
  credential: "Animal Care Assistant",
  totalWeeks: 9,
  totalWeeksFormatted: "2 months",
  partTimeWeeksFormatted: "Part-Time Available",
  totalModules: 7,
  totalClockHours: 170,
  termsCount: 1,
  heroImage: "/images/pet_sitter.jpg",
  scheduleWeekly: "30 Hours / Week · Mon – Fri | 08:00 – 15:30",
  stats: { weeks: "9 Weeks", modules: "7 Modules", hours: "170 Hours", credential: "1 Credential" },
  overviewParagraphs: ["Animal Care Assistant is a 2 months program with 7 modules and 170 instructional hours.", "Target: Individuals seeking foundational animal care and handling skills."],
  programObjective: "Individuals seeking foundational animal care and handling skills.",
  safetyGates: [],
  capstoneCode: "ACA-107",
  stacksInto: "",
  admissionRequirements: "Age 18+",
  coreCompetencies: [
    { icon: "Scissors", label: "Introduction to Animal Care" },
    { icon: "Heart", label: "AKC Breeds, Recognition" },
    { icon: "Shield", label: "Bathing Techniques" },
    { icon: "PawPrint", label: "Pet Nutrition, Diet" },
  ],
  donutData: { technical: 170, businessPersonal: 0, applied: 0 },
  breakdown: [{ type: "Total Hours", percent: "100%", hours: 170, description: "7 modules" }],
  manuals: [],
  deliveryAndAccess: [],
  completionRequirements: ["Complete all 7 modules", "Complete 170 instructional hours"],
  terms: [
    { termNumber: 1, name: "Term 1", technicalModules: ["ACA-101", "ACA-102", "ACA-103", "ACA-104", "ACA-105", "ACA-106", "ACA-107"], businessModules: "", appliedModule: null, techHours: 170, businessHours: 0, appliedHours: 0, termHours: 170, durationWeeks: "≈ 9 Weeks", description: "Term 1 modules.", modulesCount: 7, clockHours: 170, modulesSummary: { technicalHours: 170, businessHours: 0, appliedHours: 0 }, courseHighlights: [
      { code: "ACA-101", title: "Introduction to Animal Care & Pet Handling", hours: 30, description: "" },
      { code: "ACA-102", title: "AKC Breeds, Recognition & Characteristics", hours: 20, description: "" },
      { code: "ACA-103", title: "Bathing Techniques & Sanitation Process", hours: 25, description: "" },
      { code: "ACA-104", title: "Pet Nutrition, Diet & Pet Care", hours: 25, description: "" },
      { code: "ACA-105", title: "Pet Massage & Emotional Intelligence", hours: 25, description: "" },
      { code: "ACA-106", title: "Dog Walking, Day Care & Client Relations", hours: 25, description: "" },
      { code: "ACA-107", title: "CPR, First Aid & Professional Resilience", hours: 20, description: "" },
    ] },
  ],
};

// ─── EQN — Equine Nursing Technicians ──────────────────────────────────────────
const eqn: ProgramDetails = {
  id: "eqn",
  code: "EQN",
  slug: "equine-nursing-technicians",
  title: "Equine Nursing Technicians",
  fullTitle: "Equine Nursing Technician",
  subtitle: "Individuals seeking equine veterinary nursing skills.",
  tagline: "Equine Nursing Technicians.",
  heroQuote: "Skills that save lives and build careers.",
  heroQuoteAttribution: "Leashed",
  badge: "ACADEMY",
  credential: "Equine Nursing Technician",
  totalWeeks: 52,
  totalWeeksFormatted: "12 months",
  partTimeWeeksFormatted: "Part-Time Available",
  totalModules: 9,
  totalClockHours: 440,
  termsCount: 3,
  heroImage: "/images/mountain_sunset.jpg",
  scheduleWeekly: "30 Hours / Week · Mon – Fri | 08:00 – 15:30",
  stats: { weeks: "52 Weeks", modules: "9 Modules", hours: "440 Hours", credential: "1 Credential" },
  overviewParagraphs: ["Equine Nursing Technicians is a 12 months program with 9 modules and 385 instructional hours.", "Target: Individuals seeking equine veterinary nursing skills."],
  programObjective: "Individuals seeking equine veterinary nursing skills.",
  safetyGates: [],
  capstoneCode: "EQN-109",
  stacksInto: "",
  admissionRequirements: "Age 18+",
  coreCompetencies: [
    { icon: "Scissors", label: "Equine Veterinary Nursing Foundations" },
    { icon: "Heart", label: "Horse Anatomy" },
    { icon: "Shield", label: "Equine Anesthesia, Monitoring" },
    { icon: "PawPrint", label: "Equine Medicine" },
  ],
  donutData: { technical: 440, businessPersonal: 0, applied: 0 },
  breakdown: [{ type: "Total Hours", percent: "100%", hours: 440, description: "9 modules" }],
  manuals: [],
  deliveryAndAccess: [],
  completionRequirements: ["Complete all 9 modules", "Complete 385 instructional hours"],
  terms: [
    { termNumber: 1, name: "Term 1", technicalModules: ["EQN-101", "EQN-102", "EQN-103"], businessModules: "", appliedModule: null, techHours: 130, businessHours: 0, appliedHours: 0, termHours: 130, durationWeeks: "≈ 17 Weeks", description: "Term 1 modules.", modulesCount: 3, clockHours: 130, modulesSummary: { technicalHours: 130, businessHours: 0, appliedHours: 0 }, courseHighlights: [
      { code: "EQN-101", title: "Equine Veterinary Nursing Foundations & Terminology", hours: 45, description: "" },
      { code: "EQN-102", title: "Horse Anatomy & Digestive System", hours: 40, description: "" },
      { code: "EQN-103", title: "Equine Anesthesia, Monitoring & Emergency Therapy", hours: 45, description: "" },
    ] },
    { termNumber: 2, name: "Term 2", technicalModules: ["EQN-104", "EQN-105", "EQN-106"], businessModules: "", appliedModule: null, techHours: 130, businessHours: 0, appliedHours: 0, termHours: 130, durationWeeks: "≈ 17 Weeks", description: "Term 2 modules.", modulesCount: 3, clockHours: 130, modulesSummary: { technicalHours: 130, businessHours: 0, appliedHours: 0 }, courseHighlights: [
      { code: "EQN-104", title: "Equine Medicine & Disease Management", hours: 45, description: "" },
      { code: "EQN-105", title: "Equine Lameness, Neurology & Diagnostic Examination", hours: 40, description: "" },
      { code: "EQN-106", title: "Equine Nursing Techniques & Large Animal Procedures", hours: 45, description: "" },
    ] },
    { termNumber: 3, name: "Term 3", technicalModules: ["EQN-107", "EQN-108", "EQN-109"], businessModules: "", appliedModule: null, techHours: 125, businessHours: 0, appliedHours: 0, termHours: 125, durationWeeks: "≈ 17 Weeks", description: "Term 3 modules.", modulesCount: 3, clockHours: 125, modulesSummary: { technicalHours: 125, businessHours: 0, appliedHours: 0 }, courseHighlights: [
      { code: "EQN-107", title: "Radiographic Examinations & Diagnostic Imaging", hours: 35, description: "" },
      { code: "EQN-108", title: "Equine Emergencies & Critical Care", hours: 40, description: "" },
      { code: "EQN-109", title: "Clinical Practicum &", hours: 50, description: "" },
    ] },
  ],
};

// ─── FEL — Felines & Health ──────────────────────────────────────────
const fel: ProgramDetails = {
  id: "fel",
  code: "FEL",
  slug: "felines-and-health",
  title: "Felines & Health",
  fullTitle: "Feline Care Specialist",
  subtitle: "Individuals seeking feline care, behavior, and grooming skills.",
  tagline: "Felines & Health.",
  heroQuote: "Skills that save lives and build careers.",
  heroQuoteAttribution: "Leashed",
  badge: "ACADEMY",
  credential: "Feline Care Specialist",
  totalWeeks: 13,
  totalWeeksFormatted: "3 months",
  partTimeWeeksFormatted: "Part-Time Available",
  totalModules: 6,
  totalClockHours: 170,
  termsCount: 1,
  heroImage: "/images/cat_groomer.jpg",
  scheduleWeekly: "30 Hours / Week · Mon – Fri | 08:00 – 15:30",
  stats: { weeks: "13 Weeks", modules: "6 Modules", hours: "170 Hours", credential: "1 Credential" },
  overviewParagraphs: ["Felines & Health is a 3 months program with 6 modules and 170 instructional hours.", "Target: Individuals seeking feline care, behavior, and grooming skills."],
  programObjective: "Individuals seeking feline care, behavior, and grooming skills.",
  safetyGates: [],
  capstoneCode: "FEL-106",
  stacksInto: "",
  admissionRequirements: "Age 18+",
  coreCompetencies: [
    { icon: "Scissors", label: "Feline Foundations" },
    { icon: "Heart", label: "Learning Theories" },
    { icon: "Shield", label: "Cat Behavior Management" },
    { icon: "PawPrint", label: "Cat Nutrition" },
  ],
  donutData: { technical: 170, businessPersonal: 0, applied: 0 },
  breakdown: [{ type: "Total Hours", percent: "100%", hours: 170, description: "6 modules" }],
  manuals: [],
  deliveryAndAccess: [],
  completionRequirements: ["Complete all 6 modules", "Complete 170 instructional hours"],
  terms: [
    { termNumber: 1, name: "Term 1", technicalModules: ["FEL-101", "FEL-102", "FEL-103", "FEL-104", "FEL-105", "FEL-106"], businessModules: "", appliedModule: null, techHours: 170, businessHours: 0, appliedHours: 0, termHours: 170, durationWeeks: "≈ 13 Weeks", description: "Term 1 modules.", modulesCount: 6, clockHours: 170, modulesSummary: { technicalHours: 170, businessHours: 0, appliedHours: 0 }, courseHighlights: [
      { code: "FEL-101", title: "Feline Foundations: Overview, Breeds & Temperament", hours: 25, description: "" },
      { code: "FEL-102", title: "Learning Theories & the Feline Mind", hours: 30, description: "" },
      { code: "FEL-103", title: "Cat Behavior Management & Basic Training", hours: 35, description: "" },
      { code: "FEL-104", title: "Cat Nutrition & Basic Care", hours: 25, description: "" },
      { code: "FEL-105", title: "Feline Grooming: Handling, Bathing & Drying", hours: 30, description: "" },
      { code: "FEL-106", title: "Safety, First Aid & Shelter Experience", hours: 25, description: "" },
    ] },
  ],
};

// ─── GRO — Pet Grooming ──────────────────────────────────────────
const gro: ProgramDetails = {
  id: "gro",
  code: "GRO",
  slug: "pet-grooming",
  title: "Pet Grooming",
  fullTitle: "Professional Pet Groomer",
  subtitle: "Individuals seeking professional pet grooming skills.",
  tagline: "Pet Grooming.",
  heroQuote: "Skills that save lives and build careers.",
  heroQuoteAttribution: "Leashed",
  badge: "ACADEMY",
  credential: "Professional Pet Groomer",
  totalWeeks: 26,
  totalWeeksFormatted: "6 months",
  partTimeWeeksFormatted: "Part-Time Available",
  totalModules: 7,
  totalClockHours: 345,
  termsCount: 2,
  heroImage: "/images/dog_groomer.jpg",
  scheduleWeekly: "30 Hours / Week · Mon – Fri | 08:00 – 15:30",
  stats: { weeks: "26 Weeks", modules: "7 Modules", hours: "345 Hours", credential: "1 Credential" },
  overviewParagraphs: ["Pet Grooming is a 6 months program with 7 modules and 250 instructional hours.", "Target: Individuals seeking professional pet grooming skills."],
  programObjective: "Individuals seeking professional pet grooming skills.",
  safetyGates: [],
  capstoneCode: "GRO-107",
  stacksInto: "",
  admissionRequirements: "Age 18+",
  coreCompetencies: [
    { icon: "Scissors", label: "Introduction to Grooming" },
    { icon: "Heart", label: "Canine Knowledge, Breed Profiles" },
    { icon: "Shield", label: "Equipment, Tools" },
    { icon: "PawPrint", label: "Bathing, Brushing" },
  ],
  donutData: { technical: 345, businessPersonal: 0, applied: 0 },
  breakdown: [{ type: "Total Hours", percent: "100%", hours: 345, description: "7 modules" }],
  manuals: [],
  deliveryAndAccess: [],
  completionRequirements: ["Complete all 7 modules", "Complete 250 instructional hours"],
  terms: [
    { termNumber: 1, name: "Term 1", technicalModules: ["GRO-101", "GRO-102", "GRO-103"], businessModules: "", appliedModule: null, techHours: 110, businessHours: 0, appliedHours: 0, termHours: 110, durationWeeks: "≈ 13 Weeks", description: "Term 1 modules.", modulesCount: 3, clockHours: 110, modulesSummary: { technicalHours: 110, businessHours: 0, appliedHours: 0 }, courseHighlights: [
      { code: "GRO-101", title: "Introduction to Grooming & Pet Safety", hours: 35, description: "" },
      { code: "GRO-102", title: "Canine Knowledge, Breed Profiles & Development", hours: 40, description: "" },
      { code: "GRO-103", title: "Equipment, Tools & Product Knowledge", hours: 35, description: "" },
    ] },
    { termNumber: 2, name: "Term 2", technicalModules: ["GRO-104", "GRO-105", "GRO-106", "GRO-107"], businessModules: "", appliedModule: null, techHours: 140, businessHours: 0, appliedHours: 0, termHours: 140, durationWeeks: "≈ 13 Weeks", description: "Term 2 modules.", modulesCount: 4, clockHours: 140, modulesSummary: { technicalHours: 140, businessHours: 0, appliedHours: 0 }, courseHighlights: [
      { code: "GRO-104", title: "Bathing, Brushing & Drying Techniques", hours: 40, description: "" },
      { code: "GRO-105", title: "Breed-Specific Grooming & Styling Techniques", hours: 45, description: "" },
      { code: "GRO-106", title: "Grooming Safety, Injury Prevention & Self-Care", hours: 30, description: "" },
      { code: "GRO-107", title: "Customer Relations & Mobile Grooming Operations", hours: 25, description: "" },
    ] },
  ],
};

// ─── GSP — Grooming Salon Practice Management ──────────────────────────────────────────
const gsp: ProgramDetails = {
  id: "gsp",
  code: "GSP",
  slug: "grooming-salon-practice-management",
  title: "Grooming Salon Practice Management",
  fullTitle: "Grooming Salon Practice Manager",
  subtitle: "Individuals seeking to own and operate a grooming salon business.",
  tagline: "Grooming Salon Practice Management.",
  heroQuote: "Skills that save lives and build careers.",
  heroQuoteAttribution: "Leashed",
  badge: "ACADEMY",
  credential: "Grooming Salon Practice Manager",
  totalWeeks: 52,
  totalWeeksFormatted: "12 months",
  partTimeWeeksFormatted: "Part-Time Available",
  totalModules: 9,
  totalClockHours: 655,
  termsCount: 3,
  heroImage: "/images/pet_business.jpg",
  scheduleWeekly: "30 Hours / Week · Mon – Fri | 08:00 – 15:30",
  stats: { weeks: "52 Weeks", modules: "9 Modules", hours: "655 Hours", credential: "1 Credential" },
  overviewParagraphs: ["Grooming Salon Practice Management is a 12 months program with 9 modules and 375 instructional hours.", "Target: Individuals seeking to own and operate a grooming salon business."],
  programObjective: "Individuals seeking to own and operate a grooming salon business.",
  safetyGates: [],
  capstoneCode: "GSP-109",
  stacksInto: "",
  admissionRequirements: "Age 18+",
  coreCompetencies: [
    { icon: "Scissors", label: "Grooming Foundations" },
    { icon: "Heart", label: "Feline Grooming" },
    { icon: "Shield", label: "Business Foundations" },
    { icon: "PawPrint", label: "Marketing" },
  ],
  donutData: { technical: 655, businessPersonal: 0, applied: 0 },
  breakdown: [{ type: "Total Hours", percent: "100%", hours: 655, description: "9 modules" }],
  manuals: [],
  deliveryAndAccess: [],
  completionRequirements: ["Complete all 9 modules", "Complete 375 instructional hours"],
  terms: [
    { termNumber: 1, name: "Term 1", technicalModules: ["GSP-101", "GSP-102", "GSP-103"], businessModules: "", appliedModule: null, techHours: 125, businessHours: 0, appliedHours: 0, termHours: 125, durationWeeks: "≈ 17 Weeks", description: "Term 1 modules.", modulesCount: 3, clockHours: 125, modulesSummary: { technicalHours: 125, businessHours: 0, appliedHours: 0 }, courseHighlights: [
      { code: "GSP-101", title: "Grooming Foundations & Salon Operations", hours: 45, description: "" },
      { code: "GSP-102", title: "Feline Grooming & Multi-Service Practicum", hours: 35, description: "" },
      { code: "GSP-103", title: "Business Foundations & Entrepreneurship", hours: 45, description: "" },
    ] },
    { termNumber: 2, name: "Term 2", technicalModules: ["GSP-104", "GSP-105", "GSP-106"], businessModules: "", appliedModule: null, techHours: 140, businessHours: 0, appliedHours: 0, termHours: 140, durationWeeks: "≈ 17 Weeks", description: "Term 2 modules.", modulesCount: 3, clockHours: 140, modulesSummary: { technicalHours: 140, businessHours: 0, appliedHours: 0 }, courseHighlights: [
      { code: "GSP-104", title: "Marketing & Brand Strategy", hours: 50, description: "" },
      { code: "GSP-105", title: "Technology & AI for Business Operations", hours: 45, description: "" },
      { code: "GSP-106", title: "Financial Management & Regulatory Compliance", hours: 45, description: "" },
    ] },
    { termNumber: 3, name: "Term 3", technicalModules: ["GSP-107", "GSP-108", "GSP-109"], businessModules: "", appliedModule: null, techHours: 110, businessHours: 0, appliedHours: 0, termHours: 110, durationWeeks: "≈ 17 Weeks", description: "Term 3 modules.", modulesCount: 3, clockHours: 110, modulesSummary: { technicalHours: 110, businessHours: 0, appliedHours: 0 }, courseHighlights: [
      { code: "GSP-107", title: "Leadership & Professional Development", hours: 40, description: "" },
      { code: "GSP-108", title: "Salon Business Strategy & Launch", hours: 45, description: "" },
      { code: "GSP-109", title: "Grooming Skills & Private Class Design", hours: 25, description: "" },
    ] },
  ],
};

// ─── PRT — Professional Trainer ──────────────────────────────────────────
const prt: ProgramDetails = {
  id: "prt",
  code: "PRT",
  slug: "professional-trainer",
  title: "Professional Trainer",
  fullTitle: "Professional Dog Trainer",
  subtitle: "Individuals seeking professional dog training and behavior skills.",
  tagline: "Professional Trainer.",
  heroQuote: "Skills that save lives and build careers.",
  heroQuoteAttribution: "Leashed",
  badge: "ACADEMY",
  credential: "Professional Dog Trainer",
  totalWeeks: 26,
  totalWeeksFormatted: "6 months",
  partTimeWeeksFormatted: "Part-Time Available",
  totalModules: 8,
  totalClockHours: 345,
  termsCount: 2,
  heroImage: "/images/hero_trainer.jpg",
  scheduleWeekly: "30 Hours / Week · Mon – Fri | 08:00 – 15:30",
  stats: { weeks: "26 Weeks", modules: "8 Modules", hours: "345 Hours", credential: "1 Credential" },
  overviewParagraphs: ["Professional Trainer is a 6 months program with 8 modules and 290 instructional hours.", "Target: Individuals seeking professional dog training and behavior skills."],
  programObjective: "Individuals seeking professional dog training and behavior skills.",
  safetyGates: [],
  capstoneCode: "PRT-108",
  stacksInto: "",
  admissionRequirements: "Age 18+",
  coreCompetencies: [
    { icon: "Scissors", label: "Introduction to Service Dogs" },
    { icon: "Heart", label: "Foundations of Dog Training" },
    { icon: "Shield", label: "Breed Characteristics" },
    { icon: "PawPrint", label: "Obedience Skills" },
  ],
  donutData: { technical: 345, businessPersonal: 0, applied: 0 },
  breakdown: [{ type: "Total Hours", percent: "100%", hours: 345, description: "8 modules" }],
  manuals: [],
  deliveryAndAccess: [],
  completionRequirements: ["Complete all 8 modules", "Complete 290 instructional hours"],
  terms: [
    { termNumber: 1, name: "Term 1", technicalModules: ["PRT-101", "PRT-102", "PRT-103"], businessModules: "", appliedModule: null, techHours: 110, businessHours: 0, appliedHours: 0, termHours: 110, durationWeeks: "≈ 13 Weeks", description: "Term 1 modules.", modulesCount: 3, clockHours: 110, modulesSummary: { technicalHours: 110, businessHours: 0, appliedHours: 0 }, courseHighlights: [
      { code: "PRT-101", title: "Introduction to Service Dogs & Canine Life", hours: 35, description: "" },
      { code: "PRT-102", title: "Foundations of Dog Training & Learning Theory", hours: 40, description: "" },
      { code: "PRT-103", title: "Breed Characteristics & Canine Health for Trainers", hours: 35, description: "" },
    ] },
    { termNumber: 2, name: "Term 2", technicalModules: ["PRT-104", "PRT-105", "PRT-106", "PRT-107", "PRT-108"], businessModules: "", appliedModule: null, techHours: 180, businessHours: 0, appliedHours: 0, termHours: 180, durationWeeks: "≈ 13 Weeks", description: "Term 2 modules.", modulesCount: 5, clockHours: 180, modulesSummary: { technicalHours: 180, businessHours: 0, appliedHours: 0 }, courseHighlights: [
      { code: "PRT-104", title: "Obedience Skills: Basic to", hours: 45, description: "" },
      { code: "PRT-105", title: "Task Foundations, Behavior Chains & Behavior Sequences", hours: 40, description: "" },
      { code: "PRT-106", title: "Training Problems, Solutions & Client Management", hours: 35, description: "" },
      { code: "PRT-107", title: "Behavior Modification & Professional Practice", hours: 35, description: "" },
      { code: "PRT-108", title: "CPR, First Aid & Final Assessment", hours: 25, description: "" },
    ] },
  ],
};

// ─── PVM — Pre-Veterinary Medicine ──────────────────────────────────────────
const pvm: ProgramDetails = {
  id: "pvm",
  code: "PVM",
  slug: "pre-veterinary-medicine",
  title: "Pre-Veterinary Medicine",
  fullTitle: "Pre-Veterinary Medicine Certificate",
  subtitle: "Individuals preparing for veterinary medical school.",
  tagline: "Pre-Veterinary Medicine.",
  heroQuote: "Skills that save lives and build careers.",
  heroQuoteAttribution: "Leashed",
  badge: "ACADEMY",
  credential: "Pre-Veterinary Medicine Certificate",
  totalWeeks: 104,
  totalWeeksFormatted: "24 months",
  partTimeWeeksFormatted: "Part-Time Available",
  totalModules: 13,
  totalClockHours: 770,
  termsCount: 4,
  heroImage: "/images/hero_trainer.jpg",
  scheduleWeekly: "30 Hours / Week · Mon – Fri | 08:00 – 15:30",
  stats: { weeks: "104 Weeks", modules: "13 Modules", hours: "770 Hours", credential: "1 Credential" },
  overviewParagraphs: ["Pre-Veterinary Medicine is a 24 months program with 13 modules and 550 instructional hours.", "Target: Individuals preparing for veterinary medical school."],
  programObjective: "Individuals preparing for veterinary medical school.",
  safetyGates: [],
  capstoneCode: "PVM-113",
  stacksInto: "",
  admissionRequirements: "Age 18+",
  coreCompetencies: [
    { icon: "Scissors", label: "The Language of Veterinary Medicine" },
    { icon: "Heart", label: "Small Animal Internal Medicine" },
    { icon: "Shield", label: "Small Animal Anesthesia" },
    { icon: "PawPrint", label: "Radiology" },
  ],
  donutData: { technical: 770, businessPersonal: 0, applied: 0 },
  breakdown: [{ type: "Total Hours", percent: "100%", hours: 770, description: "13 modules" }],
  manuals: [],
  deliveryAndAccess: [],
  completionRequirements: ["Complete all 13 modules", "Complete 550 instructional hours"],
  terms: [
    { termNumber: 1, name: "Term 1", technicalModules: ["PVM-101", "PVM-102", "PVM-103"], businessModules: "", appliedModule: null, techHours: 135, businessHours: 0, appliedHours: 0, termHours: 135, durationWeeks: "≈ 26 Weeks", description: "Term 1 modules.", modulesCount: 3, clockHours: 135, modulesSummary: { technicalHours: 135, businessHours: 0, appliedHours: 0 }, courseHighlights: [
      { code: "PVM-101", title: "The Language of Veterinary Medicine & Mathematical Calculations", hours: 45, description: "" },
      { code: "PVM-102", title: "Small Animal Internal Medicine & Hematology Part One", hours: 45, description: "" },
      { code: "PVM-103", title: "Small Animal Anesthesia: Perioperative to Recovery", hours: 45, description: "" },
    ] },
    { termNumber: 2, name: "Term 2", technicalModules: ["PVM-104", "PVM-105", "PVM-106", "PVM-107"], businessModules: "", appliedModule: null, techHours: 155, businessHours: 0, appliedHours: 0, termHours: 155, durationWeeks: "≈ 26 Weeks", description: "Term 2 modules.", modulesCount: 4, clockHours: 155, modulesSummary: { technicalHours: 155, businessHours: 0, appliedHours: 0 }, courseHighlights: [
      { code: "PVM-104", title: "Radiology & Diagnostic Imaging", hours: 45, description: "" },
      { code: "PVM-105", title: "Dental Basics &  Dental Problems", hours: 35, description: "" },
      { code: "PVM-106", title: "Fluid Therapy, Transfusion Medicine & the Surgical Suite", hours: 35, description: "" },
      { code: "PVM-107", title: "Equine Medicine & Core Skills", hours: 40, description: "" },
    ] },
    { termNumber: 3, name: "Term 3", technicalModules: ["PVM-108", "PVM-109", "PVM-110", "PVM-111"], businessModules: "", appliedModule: null, techHours: 160, businessHours: 0, appliedHours: 0, termHours: 160, durationWeeks: "≈ 26 Weeks", description: "Term 3 modules.", modulesCount: 4, clockHours: 160, modulesSummary: { technicalHours: 160, businessHours: 0, appliedHours: 0 }, courseHighlights: [
      { code: "PVM-108", title: "Neurology & Cancer in Small Animals", hours: 40, description: "" },
      { code: "PVM-109", title: "Exotic, Avian & Reptile Medicine", hours: 35, description: "" },
      { code: "PVM-110", title: "Cardiovascular ECC & Specialized Clinical Procedures", hours: 45, description: "" },
      { code: "PVM-111", title: "Nutrition, Wellness & Preventive Care", hours: 40, description: "" },
    ] },
    { termNumber: 4, name: "Term 4", technicalModules: ["PVM-112", "PVM-113"], businessModules: "", appliedModule: null, techHours: 100, businessHours: 0, appliedHours: 0, termHours: 100, durationWeeks: "≈ 26 Weeks", description: "Term 4 modules.", modulesCount: 2, clockHours: 100, modulesSummary: { technicalHours: 100, businessHours: 0, appliedHours: 0 }, courseHighlights: [
      { code: "PVM-112", title: "Clinical Specialties Integration", hours: 50, description: "" },
      { code: "PVM-113", title: "Clinical Integration", hours: 50, description: "" },
    ] },
  ],
};

// ─── VET — Veterinary Assistant ──────────────────────────────────────────
const vet: ProgramDetails = {
  id: "vet",
  code: "VET",
  slug: "veterinary-assistant",
  title: "Veterinary Assistant",
  fullTitle: "Veterinary Assistant",
  subtitle: "Individuals seeking entry-level veterinary support roles in clinics, hospitals, and animal care facilities.",
  tagline: "Veterinary Assistant.",
  heroQuote: "Skills that save lives and build careers.",
  heroQuoteAttribution: "Leashed",
  badge: "ACADEMY",
  credential: "Veterinary Assistant",
  totalWeeks: 26,
  totalWeeksFormatted: "6 months",
  partTimeWeeksFormatted: "Part-Time Available",
  totalModules: 12,
  totalClockHours: 395,
  termsCount: 2,
  heroImage: "/images/pets_caregiver.jpg",
  scheduleWeekly: "30 Hours / Week · Mon – Fri | 08:00 – 15:30",
  stats: { weeks: "26 Weeks", modules: "12 Modules", hours: "395 Hours", credential: "1 Credential" },
  overviewParagraphs: ["Veterinary Assistant is a 6 months program with 12 modules and 395 instructional hours.", "Target: Individuals seeking entry-level veterinary support roles in clinics, hospitals, and animal care facilities."],
  programObjective: "Individuals seeking entry-level veterinary support roles in clinics, hospitals, and animal care facilities.",
  safetyGates: [],
  capstoneCode: "VET-112",
  stacksInto: "",
  admissionRequirements: "Age 18+",
  coreCompetencies: [
    { icon: "Scissors", label: "Veterinary Foundations" },
    { icon: "Heart", label: "Animal Behavior, Handling" },
    { icon: "Shield", label: "Office Procedures" },
    { icon: "PawPrint", label: "Examination Room Procedures" },
  ],
  donutData: { technical: 395, businessPersonal: 0, applied: 0 },
  breakdown: [{ type: "Total Hours", percent: "100%", hours: 395, description: "12 modules" }],
  manuals: [],
  deliveryAndAccess: [],
  completionRequirements: ["Complete all 12 modules", "Complete 395 instructional hours"],
  terms: [
    { termNumber: 1, name: "Term 1", technicalModules: ["VET-101", "VET-102", "VET-103"], businessModules: "", appliedModule: null, techHours: 110, businessHours: 0, appliedHours: 0, termHours: 110, durationWeeks: "≈ 13 Weeks", description: "Term 1 modules.", modulesCount: 3, clockHours: 110, modulesSummary: { technicalHours: 110, businessHours: 0, appliedHours: 0 }, courseHighlights: [
      { code: "VET-101", title: "Veterinary Foundations & Medical Terminology", hours: 40, description: "" },
      { code: "VET-102", title: "Animal Behavior, Handling & Restraint Techniques", hours: 40, description: "" },
      { code: "VET-103", title: "Office Procedures & Hospital Management", hours: 30, description: "" },
    ] },
    { termNumber: 2, name: "Term 2", technicalModules: ["VET-104", "VET-105", "VET-106", "VET-107", "VET-108", "VET-109", "VET-110", "VET-111", "VET-112"], businessModules: "", appliedModule: null, techHours: 285, businessHours: 0, appliedHours: 0, termHours: 285, durationWeeks: "≈ 13 Weeks", description: "Term 2 modules.", modulesCount: 9, clockHours: 285, modulesSummary: { technicalHours: 285, businessHours: 0, appliedHours: 0 }, courseHighlights: [
      { code: "VET-104", title: "Examination Room Procedures & Client Communication", hours: 35, description: "" },
      { code: "VET-105", title: "Pharmacy & Pharmacology Fundamentals", hours: 30, description: "" },
      { code: "VET-106", title: "Small & Large Animal Nursing", hours: 40, description: "" },
      { code: "VET-107", title: "Surgical Preparation & Assisting", hours: 35, description: "" },
      { code: "VET-108", title: "Radiology, Imaging & Endoscopy", hours: 30, description: "" },
      { code: "VET-109", title: "Emergency Care, Wound Management & Common Diseases", hours: 35, description: "" },
      { code: "VET-110", title: "Veterinary Laboratory Procedures", hours: 30, description: "" },
      { code: "VET-111", title: "Introduction to Veterinary Telehealth & Teletriage", hours: 25, description: "" },
      { code: "VET-112", title: "Building & Professional Development", hours: 25, description: "" },
    ] },
  ],
};

// ─── VPM — Veterinary Practice Management ──────────────────────────────────────────
const vpm: ProgramDetails = {
  id: "vpm",
  code: "VPM",
  slug: "veterinary-practice-management",
  title: "Veterinary Practice Management",
  fullTitle: "Veterinary Practice Manager",
  subtitle: "Individuals seeking veterinary practice management and administration roles.",
  tagline: "Veterinary Practice Management.",
  heroQuote: "Skills that save lives and build careers.",
  heroQuoteAttribution: "Leashed",
  badge: "ACADEMY",
  credential: "Veterinary Practice Manager",
  totalWeeks: 52,
  totalWeeksFormatted: "12 months",
  partTimeWeeksFormatted: "Part-Time Available",
  totalModules: 8,
  totalClockHours: 330,
  termsCount: 3,
  heroImage: "/images/pet_business.jpg",
  scheduleWeekly: "30 Hours / Week · Mon – Fri | 08:00 – 15:30",
  stats: { weeks: "52 Weeks", modules: "8 Modules", hours: "330 Hours", credential: "1 Credential" },
  overviewParagraphs: ["Veterinary Practice Management is a 12 months program with 8 modules and 300 instructional hours.", "Target: Individuals seeking veterinary practice management and administration roles."],
  programObjective: "Individuals seeking veterinary practice management and administration roles.",
  safetyGates: [],
  capstoneCode: "VPM-108",
  stacksInto: "",
  admissionRequirements: "Age 18+",
  coreCompetencies: [
    { icon: "Scissors", label: "Business Orientation" },
    { icon: "Heart", label: "Principles of Management" },
    { icon: "Shield", label: "Basic Accounting for Veterinary Practice" },
    { icon: "PawPrint", label: "Veterinary Practice Management" },
  ],
  donutData: { technical: 330, businessPersonal: 0, applied: 0 },
  breakdown: [{ type: "Total Hours", percent: "100%", hours: 330, description: "8 modules" }],
  manuals: [],
  deliveryAndAccess: [],
  completionRequirements: ["Complete all 8 modules", "Complete 300 instructional hours"],
  terms: [
    { termNumber: 1, name: "Term 1", technicalModules: ["VPM-101", "VPM-102", "VPM-103"], businessModules: "", appliedModule: null, techHours: 105, businessHours: 0, appliedHours: 0, termHours: 105, durationWeeks: "≈ 17 Weeks", description: "Term 1 modules.", modulesCount: 3, clockHours: 105, modulesSummary: { technicalHours: 105, businessHours: 0, appliedHours: 0 }, courseHighlights: [
      { code: "VPM-101", title: "Business Orientation & Professional Development", hours: 30, description: "" },
      { code: "VPM-102", title: "Principles of Management", hours: 40, description: "" },
      { code: "VPM-103", title: "Basic Accounting for Veterinary Practices", hours: 35, description: "" },
    ] },
    { termNumber: 2, name: "Term 2", technicalModules: ["VPM-104", "VPM-105", "VPM-106"], businessModules: "", appliedModule: null, techHours: 120, businessHours: 0, appliedHours: 0, termHours: 120, durationWeeks: "≈ 17 Weeks", description: "Term 2 modules.", modulesCount: 3, clockHours: 120, modulesSummary: { technicalHours: 120, businessHours: 0, appliedHours: 0 }, courseHighlights: [
      { code: "VPM-104", title: "Veterinary Practice Management", hours: 45, description: "" },
      { code: "VPM-105", title: "Human Resource Management", hours: 40, description: "" },
      { code: "VPM-106", title: "Marketing for Veterinary Practices", hours: 35, description: "" },
    ] },
    { termNumber: 3, name: "Term 3", technicalModules: ["VPM-107", "VPM-108"], businessModules: "", appliedModule: null, techHours: 75, businessHours: 0, appliedHours: 0, termHours: 75, durationWeeks: "≈ 17 Weeks", description: "Term 3 modules.", modulesCount: 2, clockHours: 75, modulesSummary: { technicalHours: 75, businessHours: 0, appliedHours: 0 }, courseHighlights: [
      { code: "VPM-107", title: "Business Ethics & Professional Conduct", hours: 35, description: "" },
      { code: "VPM-108", title: "Veterinary Practice Operations Strategy", hours: 40, description: "" },
    ] },
  ],
};

// ─── VPT — Veterinary Pathology Technician ──────────────────────────────────────────
const vpt: ProgramDetails = {
  id: "vpt",
  code: "VPT",
  slug: "veterinary-pathology-technician",
  title: "Veterinary Pathology Technician",
  fullTitle: "Veterinary Pathology Technician",
  subtitle: "Individuals seeking veterinary pathology and laboratory diagnostic skills.",
  tagline: "Veterinary Pathology Technician.",
  heroQuote: "Skills that save lives and build careers.",
  heroQuoteAttribution: "Leashed",
  badge: "ACADEMY",
  credential: "Veterinary Pathology Technician",
  totalWeeks: 104,
  totalWeeksFormatted: "24 months",
  partTimeWeeksFormatted: "Part-Time Available",
  totalModules: 12,
  totalClockHours: 510,
  termsCount: 4,
  heroImage: "/images/health_woman_cat.jpg",
  scheduleWeekly: "30 Hours / Week · Mon – Fri | 08:00 – 15:30",
  stats: { weeks: "104 Weeks", modules: "12 Modules", hours: "510 Hours", credential: "1 Credential" },
  overviewParagraphs: ["Veterinary Pathology Technician is a 24 months program with 12 modules and 495 instructional hours.", "Target: Individuals seeking veterinary pathology and laboratory diagnostic skills."],
  programObjective: "Individuals seeking veterinary pathology and laboratory diagnostic skills.",
  safetyGates: [],
  capstoneCode: "VPT-112",
  stacksInto: "",
  admissionRequirements: "Age 18+",
  coreCompetencies: [
    { icon: "Scissors", label: "Foundations of Pathology" },
    { icon: "Heart", label: "Microscopy" },
    { icon: "Shield", label: "Hematology Fundamentals" },
    { icon: "PawPrint", label: "Clinical Chemistry" },
  ],
  donutData: { technical: 510, businessPersonal: 0, applied: 0 },
  breakdown: [{ type: "Total Hours", percent: "100%", hours: 510, description: "12 modules" }],
  manuals: [],
  deliveryAndAccess: [],
  completionRequirements: ["Complete all 12 modules", "Complete 495 instructional hours"],
  terms: [
    { termNumber: 1, name: "Term 1", technicalModules: ["VPT-101", "VPT-102", "VPT-103"], businessModules: "", appliedModule: null, techHours: 130, businessHours: 0, appliedHours: 0, termHours: 130, durationWeeks: "≈ 26 Weeks", description: "Term 1 modules.", modulesCount: 3, clockHours: 130, modulesSummary: { technicalHours: 130, businessHours: 0, appliedHours: 0 }, courseHighlights: [
      { code: "VPT-101", title: "Foundations of Pathology & Laboratory Safety", hours: 45, description: "" },
      { code: "VPT-102", title: "Microscopy & Instrumentation", hours: 35, description: "" },
      { code: "VPT-103", title: "Hematology Fundamentals", hours: 50, description: "" },
    ] },
    { termNumber: 2, name: "Term 2", technicalModules: ["VPT-104", "VPT-105", "VPT-106"], businessModules: "", appliedModule: null, techHours: 125, businessHours: 0, appliedHours: 0, termHours: 125, durationWeeks: "≈ 26 Weeks", description: "Term 2 modules.", modulesCount: 3, clockHours: 125, modulesSummary: { technicalHours: 125, businessHours: 0, appliedHours: 0 }, courseHighlights: [
      { code: "VPT-104", title: "Clinical Chemistry", hours: 45, description: "" },
      { code: "VPT-105", title: "Urinalysis & Coagulation", hours: 40, description: "" },
      { code: "VPT-106", title: "Cytology & Immuno-Hematology", hours: 40, description: "" },
    ] },
    { termNumber: 3, name: "Term 3", technicalModules: ["VPT-107", "VPT-108", "VPT-109"], businessModules: "", appliedModule: null, techHours: 120, businessHours: 0, appliedHours: 0, termHours: 120, durationWeeks: "≈ 26 Weeks", description: "Term 3 modules.", modulesCount: 3, clockHours: 120, modulesSummary: { technicalHours: 120, businessHours: 0, appliedHours: 0 }, courseHighlights: [
      { code: "VPT-107", title: "Serology, Immunology & Endocrinology", hours: 40, description: "" },
      { code: "VPT-108", title: "Microbiology & Parasitology", hours: 45, description: "" },
      { code: "VPT-109", title: "Toxicology & Acid-Base Evaluation", hours: 35, description: "" },
    ] },
    { termNumber: 4, name: "Term 4", technicalModules: ["VPT-110", "VPT-111", "VPT-112"], businessModules: "", appliedModule: null, techHours: 120, businessHours: 0, appliedHours: 0, termHours: 120, durationWeeks: "≈ 26 Weeks", description: "Term 4 modules.", modulesCount: 3, clockHours: 120, modulesSummary: { technicalHours: 120, businessHours: 0, appliedHours: 0 }, courseHighlights: [
      { code: "VPT-110", title: "Quality Assurance & Reference Intervals", hours: 35, description: "" },
      { code: "VPT-111", title: "Specimen Management & Laboratory Operations", hours: 35, description: "" },
      { code: "VPT-112", title: "Clinical Pathology Practicum &", hours: 50, description: "" },
    ] },
  ],
};

// ─── VST — Veterinary Surgical Technician ──────────────────────────────────────────
const vst: ProgramDetails = {
  id: "vst",
  code: "VST",
  slug: "veterinary-surgical-technician",
  title: "Veterinary Surgical Technician",
  fullTitle: "Veterinary Surgical Technician",
  subtitle: "Individuals seeking specialized surgical veterinary technology skills.",
  tagline: "Veterinary Surgical Technician.",
  heroQuote: "Skills that save lives and build careers.",
  heroQuoteAttribution: "Leashed",
  badge: "ACADEMY",
  credential: "Veterinary Surgical Technician",
  totalWeeks: 52,
  totalWeeksFormatted: "12 months",
  partTimeWeeksFormatted: "Part-Time Available",
  totalModules: 12,
  totalClockHours: 445,
  termsCount: 3,
  heroImage: "/images/health_woman_cat.jpg",
  scheduleWeekly: "30 Hours / Week · Mon – Fri | 08:00 – 15:30",
  stats: { weeks: "52 Weeks", modules: "12 Modules", hours: "445 Hours", credential: "1 Credential" },
  overviewParagraphs: ["Veterinary Surgical Technician is a 12 months program with 12 modules and 465 instructional hours.", "Target: Individuals seeking specialized surgical veterinary technology skills."],
  programObjective: "Individuals seeking specialized surgical veterinary technology skills.",
  safetyGates: [],
  capstoneCode: "VST-112",
  stacksInto: "",
  admissionRequirements: "Age 18+",
  coreCompetencies: [
    { icon: "Scissors", label: "Aseptic Technique" },
    { icon: "Heart", label: "Surgical Instruments" },
    { icon: "Shield", label: "Patient Preparation" },
    { icon: "PawPrint", label: "Scrub" },
  ],
  donutData: { technical: 445, businessPersonal: 0, applied: 0 },
  breakdown: [{ type: "Total Hours", percent: "100%", hours: 445, description: "12 modules" }],
  manuals: [],
  deliveryAndAccess: [],
  completionRequirements: ["Complete all 12 modules", "Complete 465 instructional hours"],
  terms: [
    { termNumber: 1, name: "Term 1", technicalModules: ["VST-101", "VST-102", "VST-103"], businessModules: "", appliedModule: null, techHours: 120, businessHours: 0, appliedHours: 0, termHours: 120, durationWeeks: "≈ 17 Weeks", description: "Term 1 modules.", modulesCount: 3, clockHours: 120, modulesSummary: { technicalHours: 120, businessHours: 0, appliedHours: 0 }, courseHighlights: [
      { code: "VST-101", title: "Aseptic Technique & Sterilization", hours: 45, description: "" },
      { code: "VST-102", title: "Surgical Instruments & Equipment", hours: 40, description: "" },
      { code: "VST-103", title: "Patient Preparation & Positioning", hours: 35, description: "" },
    ] },
    { termNumber: 2, name: "Term 2", technicalModules: ["VST-104", "VST-105", "VST-106", "VST-107"], businessModules: "", appliedModule: null, techHours: 160, businessHours: 0, appliedHours: 0, termHours: 160, durationWeeks: "≈ 17 Weeks", description: "Term 2 modules.", modulesCount: 4, clockHours: 160, modulesSummary: { technicalHours: 160, businessHours: 0, appliedHours: 0 }, courseHighlights: [
      { code: "VST-104", title: "Scrub & Circulating Nurse Duties", hours: 45, description: "" },
      { code: "VST-105", title: "Surgical Care Expertise & Wound Management", hours: 40, description: "" },
      { code: "VST-106", title: "Pharmacology & Laboratory for Surgical Nursing", hours: 35, description: "" },
      { code: "VST-107", title: "Anesthesia & Pain Management", hours: 40, description: "" },
    ] },
    { termNumber: 3, name: "Term 3", technicalModules: ["VST-108", "VST-109", "VST-110", "VST-111", "VST-112"], businessModules: "", appliedModule: null, techHours: 185, businessHours: 0, appliedHours: 0, termHours: 185, durationWeeks: "≈ 17 Weeks", description: "Term 3 modules.", modulesCount: 5, clockHours: 185, modulesSummary: { technicalHours: 185, businessHours: 0, appliedHours: 0 }, courseHighlights: [
      { code: "VST-108", title: "Surgical Techniques & Procedures", hours: 50, description: "" },
      { code: "VST-109", title: "Diagnostic Imaging & Radiography", hours: 35, description: "" },
      { code: "VST-110", title: "Emergency Critical Care & Specialized Medicine", hours: 45, description: "" },
      { code: "VST-111", title: "Exotic Animal Medicine & Physical Rehabilitation", hours: 30, description: "" },
      { code: "VST-112", title: "Professional Practice, Communications & Compliance", hours: 25, description: "" },
    ] },
  ],
};

// ─── VTE — Veterinary Technician ──────────────────────────────────────────
const vte: ProgramDetails = {
  id: "vte",
  code: "VTE",
  slug: "veterinary-technician",
  title: "Veterinary Technician",
  fullTitle: "Veterinary Technician",
  subtitle: "Individuals seeking veterinary technician credentials for clinical practice.",
  tagline: "Veterinary Technician.",
  heroQuote: "Skills that save lives and build careers.",
  heroQuoteAttribution: "Leashed",
  badge: "ACADEMY",
  credential: "Veterinary Technician",
  totalWeeks: 104,
  totalWeeksFormatted: "24 months",
  partTimeWeeksFormatted: "Part-Time Available",
  totalModules: 16,
  totalClockHours: 1010,
  termsCount: 4,
  heroImage: "/images/vet_cat_checkup.jpg",
  scheduleWeekly: "30 Hours / Week · Mon – Fri | 08:00 – 15:30",
  stats: { weeks: "104 Weeks", modules: "16 Modules", hours: "1010 Hours", credential: "1 Credential" },
  overviewParagraphs: ["Veterinary Technician is a 24 months program with 16 modules and 650 instructional hours.", "Target: Individuals seeking veterinary technician credentials for clinical practice."],
  programObjective: "Individuals seeking veterinary technician credentials for clinical practice.",
  safetyGates: [],
  capstoneCode: "VTE-116",
  stacksInto: "",
  admissionRequirements: "Age 18+",
  coreCompetencies: [
    { icon: "Scissors", label: "Veterinary Medicine Profession" },
    { icon: "Heart", label: "Veterinary Anatomy" },
    { icon: "Shield", label: "Veterinary Pharmacy" },
    { icon: "PawPrint", label: "Animal Behavior, Handling" },
  ],
  donutData: { technical: 1010, businessPersonal: 0, applied: 0 },
  breakdown: [{ type: "Total Hours", percent: "100%", hours: 1010, description: "16 modules" }],
  manuals: [],
  deliveryAndAccess: [],
  completionRequirements: ["Complete all 16 modules", "Complete 650 instructional hours"],
  terms: [
    { termNumber: 1, name: "Term 1", technicalModules: ["VTE-101", "VTE-102", "VTE-103", "VTE-104"], businessModules: "", appliedModule: null, techHours: 170, businessHours: 0, appliedHours: 0, termHours: 170, durationWeeks: "≈ 26 Weeks", description: "Term 1 modules.", modulesCount: 4, clockHours: 170, modulesSummary: { technicalHours: 170, businessHours: 0, appliedHours: 0 }, courseHighlights: [
      { code: "VTE-101", title: "Veterinary Medicine Profession & Practice", hours: 40, description: "" },
      { code: "VTE-102", title: "Veterinary Anatomy & Physiology", hours: 50, description: "" },
      { code: "VTE-103", title: "Veterinary Pharmacy & Pharmacology", hours: 45, description: "" },
      { code: "VTE-104", title: "Animal Behavior, Handling & Restraint", hours: 35, description: "" },
    ] },
    { termNumber: 2, name: "Term 2", technicalModules: ["VTE-105", "VTE-106", "VTE-107", "VTE-108"], businessModules: "", appliedModule: null, techHours: 155, businessHours: 0, appliedHours: 0, termHours: 155, durationWeeks: "≈ 26 Weeks", description: "Term 2 modules.", modulesCount: 4, clockHours: 155, modulesSummary: { technicalHours: 155, businessHours: 0, appliedHours: 0 }, courseHighlights: [
      { code: "VTE-105", title: "Medical Mathematics & Calculations", hours: 30, description: "" },
      { code: "VTE-106", title: "Clinical Pathology I: Hematology & Laboratory", hours: 45, description: "" },
      { code: "VTE-107", title: "Medical Nursing for Veterinary Technicians", hours: 45, description: "" },
      { code: "VTE-108", title: "Nutrition, History & Physical Examination", hours: 35, description: "" },
    ] },
    { termNumber: 3, name: "Term 3", technicalModules: ["VTE-109", "VTE-110", "VTE-111", "VTE-112"], businessModules: "", appliedModule: null, techHours: 170, businessHours: 0, appliedHours: 0, termHours: 170, durationWeeks: "≈ 26 Weeks", description: "Term 3 modules.", modulesCount: 4, clockHours: 170, modulesSummary: { technicalHours: 170, businessHours: 0, appliedHours: 0 }, courseHighlights: [
      { code: "VTE-109", title: "Clinical Pathology II: Microbiology & Parasitology", hours: 45, description: "" },
      { code: "VTE-110", title: "Anesthesia for Veterinary Technicians", hours: 45, description: "" },
      { code: "VTE-111", title: "Surgical Nursing for Veterinary Technicians", hours: 45, description: "" },
      { code: "VTE-112", title: "Radiography & Diagnostic Imaging", hours: 35, description: "" },
    ] },
    { termNumber: 4, name: "Term 4", technicalModules: ["VTE-113", "VTE-114", "VTE-115", "VTE-116"], businessModules: "", appliedModule: null, techHours: 155, businessHours: 0, appliedHours: 0, termHours: 155, durationWeeks: "≈ 26 Weeks", description: "Term 4 modules.", modulesCount: 4, clockHours: 155, modulesSummary: { technicalHours: 155, businessHours: 0, appliedHours: 0 }, courseHighlights: [
      { code: "VTE-113", title: "Small & Large Animal Medicine", hours: 45, description: "" },
      { code: "VTE-114", title: "Animal Nutrition, Reproduction, Genetics & Aging", hours: 35, description: "" },
      { code: "VTE-115", title: "Emergency & Wound Care", hours: 35, description: "" },
      { code: "VTE-116", title: "Veterinary Practice Administration & Communications", hours: 40, description: "" },
    ] },
  ],
};

// ─── VTN — Veterinary Technology ──────────────────────────────────────────
const vtn: ProgramDetails = {
  id: "vtn",
  code: "VTN",
  slug: "veterinary-technology",
  title: "Veterinary Technology",
  fullTitle: "Veterinary Technologist",
  subtitle: "Individuals seeking comprehensive veterinary technology education.",
  tagline: "Veterinary Technology.",
  heroQuote: "Skills that save lives and build careers.",
  heroQuoteAttribution: "Leashed",
  badge: "ACADEMY",
  credential: "Veterinary Technologist",
  totalWeeks: 104,
  totalWeeksFormatted: "24 months",
  partTimeWeeksFormatted: "Part-Time Available",
  totalModules: 10,
  totalClockHours: 525,
  termsCount: 4,
  heroImage: "/images/vet_cat_checkup.jpg",
  scheduleWeekly: "30 Hours / Week · Mon – Fri | 08:00 – 15:30",
  stats: { weeks: "104 Weeks", modules: "10 Modules", hours: "525 Hours", credential: "1 Credential" },
  overviewParagraphs: ["Veterinary Technology is a 24 months program with 10 modules and 435 instructional hours.", "Target: Individuals seeking comprehensive veterinary technology education."],
  programObjective: "Individuals seeking comprehensive veterinary technology education.",
  safetyGates: [],
  capstoneCode: "VTN-110",
  stacksInto: "",
  admissionRequirements: "Age 18+",
  coreCompetencies: [
    { icon: "Scissors", label: "Veterinary Pharmacology" },
    { icon: "Heart", label: "Understanding the Human-Animal Bond" },
    { icon: "Shield", label: "Safety" },
    { icon: "PawPrint", label: "Research in Veterinary Technology" },
  ],
  donutData: { technical: 525, businessPersonal: 0, applied: 0 },
  breakdown: [{ type: "Total Hours", percent: "100%", hours: 525, description: "10 modules" }],
  manuals: [],
  deliveryAndAccess: [],
  completionRequirements: ["Complete all 10 modules", "Complete 435 instructional hours"],
  terms: [
    { termNumber: 1, name: "Term 1", technicalModules: ["VTN-101", "VTN-102", "VTN-103"], businessModules: "", appliedModule: null, techHours: 115, businessHours: 0, appliedHours: 0, termHours: 115, durationWeeks: "≈ 26 Weeks", description: "Term 1 modules.", modulesCount: 3, clockHours: 115, modulesSummary: { technicalHours: 115, businessHours: 0, appliedHours: 0 }, courseHighlights: [
      { code: "VTN-101", title: "Veterinary Pharmacology", hours: 50, description: "" },
      { code: "VTN-102", title: "Understanding the Human-Animal Bond", hours: 30, description: "" },
      { code: "VTN-103", title: "Safety & Regulatory Compliance in Veterinary Medicine", hours: 35, description: "" },
    ] },
    { termNumber: 2, name: "Term 2", technicalModules: ["VTN-104", "VTN-105", "VTN-106"], businessModules: "", appliedModule: null, techHours: 115, businessHours: 0, appliedHours: 0, termHours: 115, durationWeeks: "≈ 26 Weeks", description: "Term 2 modules.", modulesCount: 3, clockHours: 115, modulesSummary: { technicalHours: 115, businessHours: 0, appliedHours: 0 }, courseHighlights: [
      { code: "VTN-104", title: "Research in Veterinary Technology", hours: 35, description: "" },
      { code: "VTN-105", title: "Preventative Healthcare & Integrative Medicine for Animals", hours: 40, description: "" },
      { code: "VTN-106", title: "Veterinary Practice Management", hours: 40, description: "" },
    ] },
    { termNumber: 3, name: "Term 3", technicalModules: ["VTN-107", "VTN-108"], businessModules: "", appliedModule: null, techHours: 95, businessHours: 0, appliedHours: 0, termHours: 95, durationWeeks: "≈ 26 Weeks", description: "Term 3 modules.", modulesCount: 2, clockHours: 95, modulesSummary: { technicalHours: 95, businessHours: 0, appliedHours: 0 }, courseHighlights: [
      { code: "VTN-107", title: "Animal Medicine & Domestic Animal Species Nursing", hours: 50, description: "" },
      { code: "VTN-108", title: "Veterinary Emergency & Critical Care", hours: 45, description: "" },
    ] },
    { termNumber: 4, name: "Term 4", technicalModules: ["VTN-109", "VTN-110"], businessModules: "", appliedModule: null, techHours: 110, businessHours: 0, appliedHours: 0, termHours: 110, durationWeeks: "≈ 26 Weeks", description: "Term 4 modules.", modulesCount: 2, clockHours: 110, modulesSummary: { technicalHours: 110, businessHours: 0, appliedHours: 0 }, courseHighlights: [
      { code: "VTN-109", title: "Animal Anesthesia & Surgical Nursing", hours: 50, description: "" },
      { code: "VTN-110", title: "Clinical Practicum & Portfolio", hours: 60, description: "" },
    ] },
  ],
};

// ─── ZKA — Zookeeper Assistant ──────────────────────────────────────────
const zka: ProgramDetails = {
  id: "zka",
  code: "ZKA",
  slug: "zookeeper-assistant",
  title: "Zookeeper Assistant",
  fullTitle: "Zookeeper Assistant",
  subtitle: "Individuals seeking zookeeping and exotic animal care skills.",
  tagline: "Zookeeper Assistant.",
  heroQuote: "Skills that save lives and build careers.",
  heroQuoteAttribution: "Leashed",
  badge: "ACADEMY",
  credential: "Zookeeper Assistant",
  totalWeeks: 52,
  totalWeeksFormatted: "12 months",
  partTimeWeeksFormatted: "Part-Time Available",
  totalModules: 9,
  totalClockHours: 440,
  termsCount: 3,
  heroImage: "/images/mountain_sunset.jpg",
  scheduleWeekly: "30 Hours / Week · Mon – Fri | 08:00 – 15:30",
  stats: { weeks: "52 Weeks", modules: "9 Modules", hours: "440 Hours", credential: "1 Credential" },
  overviewParagraphs: ["Zookeeper Assistant is a 12 months program with 9 modules and 375 instructional hours.", "Target: Individuals seeking zookeeping and exotic animal care skills."],
  programObjective: "Individuals seeking zookeeping and exotic animal care skills.",
  safetyGates: [],
  capstoneCode: "ZKA-109",
  stacksInto: "",
  admissionRequirements: "Age 18+",
  coreCompetencies: [
    { icon: "Scissors", label: "Introduction to Zoos" },
    { icon: "Heart", label: "Exotic Animal Housing, Exhibits" },
    { icon: "Shield", label: "Animal Health" },
    { icon: "PawPrint", label: "Exotic Animal Behavior, Enrichment" },
  ],
  donutData: { technical: 440, businessPersonal: 0, applied: 0 },
  breakdown: [{ type: "Total Hours", percent: "100%", hours: 440, description: "9 modules" }],
  manuals: [],
  deliveryAndAccess: [],
  completionRequirements: ["Complete all 9 modules", "Complete 375 instructional hours"],
  terms: [
    { termNumber: 1, name: "Term 1", technicalModules: ["ZKA-101", "ZKA-102", "ZKA-103"], businessModules: "", appliedModule: null, techHours: 120, businessHours: 0, appliedHours: 0, termHours: 120, durationWeeks: "≈ 17 Weeks", description: "Term 1 modules.", modulesCount: 3, clockHours: 120, modulesSummary: { technicalHours: 120, businessHours: 0, appliedHours: 0 }, courseHighlights: [
      { code: "ZKA-101", title: "Introduction to Zoos & Zookeeping", hours: 40, description: "" },
      { code: "ZKA-102", title: "Exotic Animal Housing, Exhibits & Husbandry", hours: 40, description: "" },
      { code: "ZKA-103", title: "Animal Health & Zookeeping Safety", hours: 40, description: "" },
    ] },
    { termNumber: 2, name: "Term 2", technicalModules: ["ZKA-104", "ZKA-105", "ZKA-106"], businessModules: "", appliedModule: null, techHours: 120, businessHours: 0, appliedHours: 0, termHours: 120, durationWeeks: "≈ 17 Weeks", description: "Term 2 modules.", modulesCount: 3, clockHours: 120, modulesSummary: { technicalHours: 120, businessHours: 0, appliedHours: 0 }, courseHighlights: [
      { code: "ZKA-104", title: "Exotic Animal Behavior, Enrichment & Training", hours: 40, description: "" },
      { code: "ZKA-105", title: "Zoo Conservation & Breeding Programs", hours: 35, description: "" },
      { code: "ZKA-106", title: "Biology & Taxonomy of Zoo Species", hours: 45, description: "" },
    ] },
    { termNumber: 3, name: "Term 3", technicalModules: ["ZKA-107", "ZKA-108", "ZKA-109"], businessModules: "", appliedModule: null, techHours: 135, businessHours: 0, appliedHours: 0, termHours: 135, durationWeeks: "≈ 17 Weeks", description: "Term 3 modules.", modulesCount: 3, clockHours: 135, modulesSummary: { technicalHours: 135, businessHours: 0, appliedHours: 0 }, courseHighlights: [
      { code: "ZKA-107", title: "Ecology & Conservation Science", hours: 45, description: "" },
      { code: "ZKA-108", title: "Wildlife Management, Policy & Visitor Education", hours: 40, description: "" },
      { code: "ZKA-109", title: "Veterinary Medicine in Zoological Settings &", hours: 50, description: "" },
    ] },
  ],
};

export const COURSES_PROGRAMS: ProgramDetails[] = [abt, aca, eqn, fel, gro, gsp, prt, pvm, vet, vpm, vpt, vst, vte, vtn, zka];

export function getProgramBySlug(slug: string): ProgramDetails | undefined {
  return COURSES_PROGRAMS.find((p) => p.slug === slug);
}

export function getProgramById(id: string): ProgramDetails | undefined {
  return COURSES_PROGRAMS.find((p) => p.id === id);
}