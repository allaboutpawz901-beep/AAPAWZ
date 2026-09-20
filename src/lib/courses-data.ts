// All About Pawz Academy — Leashed curriculum data
// EVERY field in this file is sourced from the Leashed Program Delivery Guide v1.0.
// No fabricated module titles, no fabricated modules, no fabricated hours.

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

// ─── Required & Reference Texts ───────────────────────────────────────────
// Single source of truth for textbook metadata, sourced verbatim from the
// Program Delivery Guide (Sections B1–B6, "Required & Reference Texts" tables).
// Each pathway selects its subset via the *_TEXT_IDS arrays below.
const TEXTS: Record<string, { title: string; type: string }> = {
  // Core manuals (Section C2 build status + per-pathway text lists)
  'MAN-IPDG': { title: 'Professional Dog Groomer (merged: v1 200 hr + v2 300 hr + PPC grooming track)', type: 'Core manual' },
  'MAN-PDT': { title: 'Professional Dog Trainer', type: 'Core manual' },
  'MAN-ACA': { title: 'Bather–Animal Care Assistant', type: 'Core manual' },
  'MAN-PPS': { title: 'Professional Pet Sitter', type: 'Core manual' },
  'MAN-CAT': { title: 'Professional Cat Groomer', type: 'Core manual' },
  'MAN-LSH': { title: 'Life Skills & Personal Readiness', type: 'Core manual' },
  'MAN-BUS': { title: 'Business & Leadership: Ownership, Operations & Expansion (merged BUS + LDR)', type: 'Core manual' },
  'MAN-PER': { title: 'Personal Mastery & Lifelong Growth', type: 'Core manual' },
  'MAN-MKT': { title: 'Marketing, Branding & SEO Mastery', type: 'Core manual' },
  'MAN-TEC': { title: 'AI & Technology Systems', type: 'Core manual' },
  'MAN-FIN': { title: 'Financial Mastery, Bookkeeping & Tax Strategy', type: 'Core manual' },
  'MAN-LEG': { title: 'Legal, Risk, Compliance & Ethical Governance', type: 'Core manual' },

  // Reference & supplementary texts
  'REF-GRM-01': { title: 'Dog Grooming for Beginners', type: 'Reference text · Book' },
  'REF-GRM-02': { title: 'Grooming Manual for Dog and Cat', type: 'Reference text · DOCX manuscript' },
  'REF-GRM-03': { title: 'The Everything Dog Grooming Book', type: 'Reference text · DOCX manuscript' },
  'REF-GRM-04': { title: 'The Stone Guide to Dog Grooming for All Breeds', type: 'Reference text · Book' },
  'REF-BEH-01': { title: 'Handbook of Applied Dog Behavior and Training, Vol. 3', type: 'Reference text · Book' },
  'REF-TRN-01': { title: "Nate Schoemer's Dog Training Manual", type: 'Reference text · Book' },
  'REF-PPS-01': { title: 'Pet Care Givers and Families', type: 'Reference text · Book' },
  'REF-HLTH-01': { title: 'National Geographic Guide to Pet Health, Behavior, and Happiness', type: 'Reference text · Book' },
  'REF-MED-01': { title: 'Small Animal Critical Care Medicine', type: 'Reference text · Book' },
  'REF-AI-01': { title: 'AI for Animals: Revolutionizing Veterinary Care', type: 'Supplementary text · Book' },
  'REF-ANI-01': { title: 'Beastly: The 40,000-Year Story of Animals and Us', type: 'Supplementary text · Book' },
  'REF-CARE-01': { title: 'Knack Dog Care and Training', type: 'Reference text · Book' },
  'REF-BIZ-01': { title: 'Business Cycles', type: 'Supplementary text · Book' },
  'REF-BIZ-02': { title: 'Building a Successful Business', type: 'Reference text · Book' },
  'REF-BIZ-03': { title: 'The Disruptors', type: 'Supplementary text · Book' },
  'REF-BIZ-04': { title: 'Go It Alone!', type: 'Reference text · Book' },
  'REF-BIZ-05': { title: 'The Successful Entrepreneur Playbook', type: 'Reference text · Book' },
  'REF-BIZ-06': { title: '4-Hour Work Day', type: 'Supplementary text · Book' },
  'REF-BIZ-07': { title: 'The Business Bible', type: 'Reference text · Book' },
  'REF-BIZ-08': { title: 'Poverty Traps', type: 'Supplementary text · Book' },
  'REF-LDR-01': { title: 'Leadership Presence', type: 'Reference text · Book' },
  'REF-LDR-02': { title: 'Leadership and Ethics', type: 'Reference text · Book' },
  'REF-MKT-01': { title: 'Multi-Channel Marketing, Branding and Retail Design', type: 'Reference text · Book' },
  'REF-MKT-02': { title: 'Marketing is not Rocket Science', type: 'Reference text · Book' },
  'REF-MKT-03': { title: 'Unconscious Branding', type: 'Supplementary text · Book' },
  'REF-MKT-04': { title: 'Content Branding Solutions for Entrepreneur Strategic Content Marketing', type: 'Reference text · Book' },
  'REF-MKT-05': { title: 'Branding: What You Need to Know About Building a Personal Brand…', type: 'Reference text · Book' },
  'REF-MKT-06': { title: 'Business Branding Guide', type: 'Reference text · Book' },
  'REF-MKT-07': { title: 'Salon Marketing', type: 'Reference text · Book' },
  'REF-CX-01': { title: 'Customer Service in Health Care', type: 'Reference text · Book' },
  'REF-CX-02': { title: 'Can Your Customer Service Do This?', type: 'Reference text · Book' },
  'REF-CX-03': { title: 'Crushing the Competition with Service', type: 'Reference text · Book' },
  'REF-CX-04': { title: 'Customer Service Is Just Foreplay', type: 'Supplementary text · Book' },
  'REF-FIN-01': { title: "J.K. Lasser's Small Business Taxes 2025", type: 'Reference text · Book' },
  'REF-FIN-02': { title: 'Tax Accounting: A Guide for Small Business Owners', type: 'Reference text · Book' },
  'REF-FIN-03': { title: 'Small Time Operator', type: 'Reference text · Book' },
  'REF-FIN-04': { title: '475 Tax Deductions for All Small Businesses', type: 'Reference text · Book' },
  'REF-LEG-01': { title: 'Cybersecurity: Ethics, Legal, Risks', type: 'Reference text · Book' },
  'REF-LEG-02': { title: 'The Tax and Legal Playbook', type: 'Reference text · Book' },
  'REF-LEG-03': { title: 'Reimagining Fairness: Equity, Cultural Diversity, and Inclusion Competency Approach', type: 'Reference text · Book' },
  'REF-LEG-04': { title: 'PCI Compliance', type: 'Reference text · Book' },
  'REF-LEG-05': { title: 'The Guide to OSHA Compliance', type: 'Reference text · Book' },
  'REF-LEG-06': { title: 'Security-First Compliance for Small Businesses', type: 'Reference text · Book' },
  'REF-LEG-07': { title: 'Transfer Pricing: Rules, Compliance and Controversy', type: 'Supplementary text · Book' },
  'REF-LEG-08': { title: 'Stop Harming Customers: A Compliance Manifesto', type: 'Reference text · Book' },
  'REF-LEG-09': { title: 'Tools of Effective Compliance', type: 'Reference text · Book' },
  'REF-LSH-01': { title: 'Teaching life skills in intermediate phase', type: 'Reference text · Book' },
  'REF-LSH-02': { title: 'Stuff Students Should Know: Learn Essential Life Skills', type: 'Reference text · Book' },
  'REF-LSH-03': { title: '10 Proven Ways to Relieve Stress Now', type: 'Supplementary text · Book' },
  'REF-LSH-04': { title: 'Personal Finance', type: 'Reference text · Book' },
  'REF-PER-01': { title: 'The Personal MBA', type: 'Reference text · Book' },
  'REF-PER-02': { title: 'Self-Talk Your Way to Success', type: 'Reference text · Book' },
  'REF-PER-03': { title: 'Are You Ready to Succeed?', type: 'Reference text · Book' },
  'REF-PER-04': { title: 'Trigger High Performance', type: 'Reference text · Book' },
  'REF-PER-05': { title: 'Rebuilding Relationships in Recovery', type: 'Reference text · Book' },
  'REF-PER-06': { title: 'Trust Yourself: Stop Overthinking and Channel Your Emotions for Success at Work', type: 'Reference text · Book' },
  'REF-AI-02': { title: 'LinkedIn Personal Branding and Marketing', type: 'Reference text · Book' },
  'REF-AI-03': { title: 'The Marketing Mindset: 100 ChatGPT Prompts', type: 'Reference text · Book' },
  'REF-AI-04': { title: 'Enterprise AI', type: 'Reference text · Book' },
  'REF-AI-05': { title: 'AI In Finance', type: 'Reference text · Book' },
  'REF-AI-06': { title: 'AI Timekeeper', type: 'Reference text · Book' },
  'REF-AI-07': { title: 'AI Profit Hacks', type: 'Reference text · Book' },
  'REF-AI-08': { title: 'AI Startup Strategy', type: 'Reference text · Book' },
  'REF-AI-09': { title: 'AI and the Boardroom', type: 'Reference text · Book' },
  'REF-AI-10': { title: 'Foundations of Agentic AI for Retail', type: 'Reference text · Book' },
  'REF-AI-11': { title: 'Retail 4.0: How AI is Shaping the Future of Shopping', type: 'Supplementary text · Book' },
  'REF-AI-12': { title: 'AI-Powered Accounting with Excel and Power BI', type: 'Reference text · Book' },
  'REF-AI-13': { title: 'The AI Revolution in Customer Service', type: 'Reference text · Book' },
  'REF-AI-14': { title: 'Natural Language Processing with Python: Building your Own Customer Service ChatBot', type: 'Reference text · Book' },
  'REF-AI-15': { title: 'Teaching and Learning in the Age of Generative AI', type: 'Reference text · Book' },
};

function textsFor(ids: string[]): { id: string; title: string; type: string }[] {
  return ids.map((id) => ({ id, title: TEXTS[id].title, type: TEXTS[id].type }));
}

// Per-pathway text ID lists, in the order each pathway's table appears in the guide.
// IPDG (B1): 8 core manuals + 66 reference/supplementary texts
const IPDG_TEXT_IDS = [
  'MAN-IPDG', 'MAN-LSH', 'MAN-BUS', 'MAN-PER', 'MAN-MKT', 'MAN-TEC', 'MAN-FIN', 'MAN-LEG',
  'REF-GRM-01', 'REF-GRM-02', 'REF-GRM-03', 'REF-BEH-01', 'REF-MED-01', 'REF-AI-01', 'REF-ANI-01', 'REF-CARE-01',
  'REF-BIZ-01', 'REF-BIZ-02', 'REF-BIZ-03', 'REF-BIZ-04', 'REF-BIZ-05', 'REF-BIZ-06', 'REF-BIZ-07', 'REF-BIZ-08',
  'REF-LDR-01', 'REF-LDR-02',
  'REF-MKT-01', 'REF-MKT-02', 'REF-MKT-03', 'REF-MKT-04', 'REF-MKT-05', 'REF-MKT-06', 'REF-MKT-07',
  'REF-CX-01', 'REF-CX-02', 'REF-CX-03', 'REF-CX-04',
  'REF-FIN-01', 'REF-FIN-02', 'REF-FIN-03', 'REF-FIN-04',
  'REF-LEG-01', 'REF-LEG-02', 'REF-LEG-03', 'REF-LEG-04', 'REF-LEG-05', 'REF-LEG-06', 'REF-LEG-07', 'REF-LEG-08', 'REF-LEG-09',
  'REF-LSH-01', 'REF-LSH-02', 'REF-LSH-03', 'REF-LSH-04',
  'REF-PER-01', 'REF-PER-02', 'REF-PER-03', 'REF-PER-04', 'REF-PER-05', 'REF-PER-06',
  'REF-AI-02', 'REF-AI-03', 'REF-AI-04', 'REF-AI-05', 'REF-AI-06', 'REF-AI-07', 'REF-AI-08', 'REF-AI-09', 'REF-AI-10', 'REF-AI-11', 'REF-AI-12', 'REF-AI-13', 'REF-AI-14', 'REF-AI-15',
];

// PDT (B2): 8 core manuals + 65 reference/supplementary texts
const PDT_TEXT_IDS = [
  'MAN-PDT', 'MAN-LSH', 'MAN-BUS', 'MAN-PER', 'MAN-MKT', 'MAN-TEC', 'MAN-FIN', 'MAN-LEG',
  'REF-BEH-01', 'REF-TRN-01', 'REF-HLTH-01', 'REF-MED-01', 'REF-AI-01', 'REF-ANI-01', 'REF-CARE-01',
  'REF-BIZ-01', 'REF-BIZ-02', 'REF-BIZ-03', 'REF-BIZ-04', 'REF-BIZ-05', 'REF-BIZ-06', 'REF-BIZ-07', 'REF-BIZ-08',
  'REF-LDR-01', 'REF-LDR-02',
  'REF-MKT-01', 'REF-MKT-02', 'REF-MKT-03', 'REF-MKT-04', 'REF-MKT-05', 'REF-MKT-06', 'REF-MKT-07',
  'REF-CX-01', 'REF-CX-02', 'REF-CX-03', 'REF-CX-04',
  'REF-FIN-01', 'REF-FIN-02', 'REF-FIN-03', 'REF-FIN-04',
  'REF-LEG-01', 'REF-LEG-02', 'REF-LEG-03', 'REF-LEG-04', 'REF-LEG-05', 'REF-LEG-06', 'REF-LEG-07', 'REF-LEG-08', 'REF-LEG-09',
  'REF-LSH-01', 'REF-LSH-02', 'REF-LSH-03', 'REF-LSH-04',
  'REF-PER-01', 'REF-PER-02', 'REF-PER-03', 'REF-PER-04', 'REF-PER-05', 'REF-PER-06',
  'REF-AI-02', 'REF-AI-03', 'REF-AI-04', 'REF-AI-05', 'REF-AI-06', 'REF-AI-07', 'REF-AI-08', 'REF-AI-09', 'REF-AI-10', 'REF-AI-11', 'REF-AI-12', 'REF-AI-13', 'REF-AI-14', 'REF-AI-15',
];

// ACA (B3): 8 core manuals + 68 reference/supplementary texts
const ACA_TEXT_IDS = [
  'MAN-ACA', 'MAN-LSH', 'MAN-BUS', 'MAN-PER', 'MAN-MKT', 'MAN-TEC', 'MAN-FIN', 'MAN-LEG',
  'REF-GRM-01', 'REF-GRM-02', 'REF-GRM-03', 'REF-BEH-01', 'REF-GRM-04', 'REF-PPS-01', 'REF-HLTH-01', 'REF-AI-01', 'REF-ANI-01', 'REF-CARE-01',
  'REF-BIZ-01', 'REF-BIZ-02', 'REF-BIZ-03', 'REF-BIZ-04', 'REF-BIZ-05', 'REF-BIZ-06', 'REF-BIZ-07', 'REF-BIZ-08',
  'REF-LDR-01', 'REF-LDR-02',
  'REF-MKT-01', 'REF-MKT-02', 'REF-MKT-03', 'REF-MKT-04', 'REF-MKT-05', 'REF-MKT-06', 'REF-MKT-07',
  'REF-CX-01', 'REF-CX-02', 'REF-CX-03', 'REF-CX-04',
  'REF-FIN-01', 'REF-FIN-02', 'REF-FIN-03', 'REF-FIN-04',
  'REF-LEG-01', 'REF-LEG-02', 'REF-LEG-03', 'REF-LEG-04', 'REF-LEG-05', 'REF-LEG-06', 'REF-LEG-07', 'REF-LEG-08', 'REF-LEG-09',
  'REF-LSH-01', 'REF-LSH-02', 'REF-LSH-03', 'REF-LSH-04',
  'REF-PER-01', 'REF-PER-02', 'REF-PER-03', 'REF-PER-04', 'REF-PER-05', 'REF-PER-06',
  'REF-AI-02', 'REF-AI-03', 'REF-AI-04', 'REF-AI-05', 'REF-AI-06', 'REF-AI-07', 'REF-AI-08', 'REF-AI-09', 'REF-AI-10', 'REF-AI-11', 'REF-AI-12', 'REF-AI-13', 'REF-AI-14', 'REF-AI-15',
];

// PPS (B4): 5 core manuals + 15 reference/supplementary texts
const PPS_TEXT_IDS = [
  'MAN-PPS', 'MAN-BUS', 'MAN-MKT', 'MAN-FIN', 'MAN-LEG',
  'REF-PPS-01', 'REF-HLTH-01', 'REF-MED-01', 'REF-CARE-01',
  'REF-BIZ-02', 'REF-BIZ-04', 'REF-BIZ-07',
  'REF-LDR-02',
  'REF-MKT-07',
  'REF-FIN-03',
  'REF-LEG-02', 'REF-LEG-05', 'REF-LEG-08',
  'REF-LSH-04',
  'REF-PER-01',
];

// CAT (B5): 5 core manuals + 13 reference/supplementary texts
const CAT_TEXT_IDS = [
  'MAN-CAT', 'MAN-BUS', 'MAN-MKT', 'MAN-FIN', 'MAN-LEG',
  'REF-GRM-02', 'REF-GRM-04', 'REF-HLTH-01',
  'REF-BIZ-02', 'REF-BIZ-04', 'REF-BIZ-07',
  'REF-LDR-02',
  'REF-MKT-07',
  'REF-FIN-03',
  'REF-LEG-02', 'REF-LEG-08',
  'REF-LSH-04',
  'REF-PER-01',
];

// PPC (B6): 11 core manuals + 70 reference/supplementary texts
const PPC_TEXT_IDS = [
  'MAN-IPDG', 'MAN-PDT', 'MAN-PPS', 'MAN-CAT', 'MAN-LSH', 'MAN-BUS', 'MAN-PER', 'MAN-MKT', 'MAN-TEC', 'MAN-FIN', 'MAN-LEG',
  'REF-GRM-01', 'REF-GRM-02', 'REF-GRM-03', 'REF-BEH-01', 'REF-GRM-04', 'REF-TRN-01', 'REF-PPS-01', 'REF-HLTH-01', 'REF-MED-01', 'REF-AI-01', 'REF-ANI-01', 'REF-CARE-01',
  'REF-BIZ-01', 'REF-BIZ-02', 'REF-BIZ-03', 'REF-BIZ-04', 'REF-BIZ-05', 'REF-BIZ-06', 'REF-BIZ-07', 'REF-BIZ-08',
  'REF-LDR-01', 'REF-LDR-02',
  'REF-MKT-01', 'REF-MKT-02', 'REF-MKT-03', 'REF-MKT-04', 'REF-MKT-05', 'REF-MKT-06', 'REF-MKT-07',
  'REF-CX-01', 'REF-CX-02', 'REF-CX-03', 'REF-CX-04',
  'REF-FIN-01', 'REF-FIN-02', 'REF-FIN-03', 'REF-FIN-04',
  'REF-LEG-01', 'REF-LEG-02', 'REF-LEG-03', 'REF-LEG-04', 'REF-LEG-05', 'REF-LEG-06', 'REF-LEG-07', 'REF-LEG-08', 'REF-LEG-09',
  'REF-LSH-01', 'REF-LSH-02', 'REF-LSH-03', 'REF-LSH-04',
  'REF-PER-01', 'REF-PER-02', 'REF-PER-03', 'REF-PER-04', 'REF-PER-05', 'REF-PER-06',
  'REF-AI-02', 'REF-AI-03', 'REF-AI-04', 'REF-AI-05', 'REF-AI-06', 'REF-AI-07', 'REF-AI-08', 'REF-AI-09', 'REF-AI-10', 'REF-AI-11', 'REF-AI-12', 'REF-AI-13', 'REF-AI-14', 'REF-AI-15',
];

// ─── IPDG — Professional Dog Groomer ───────────────────────────────────────
const ipdg: ProgramDetails = {
  id: "ipdg",
  code: "IPDG",
  slug: "professional-dog-groomer",
  title: "Professional Dog Groomer",
  fullTitle: "Professional Dog Groomer Diploma (IPDG)",
  subtitle: "Identify dog stages and understand dog life · Recognize breeds · Recognize grooming tools · Identify workplace safety · Provide basic and advanced grooming techniques · Provide handling and pet care · Understand sanitation · Provide supervised live-client salon services · Build, price, market and operate a grooming business · Manage personal readiness, finances and well-being as an owner · Provide CPR and first aid.",
  tagline: "Skilled Groomers. Healthier Happier Dogs.",
  heroQuote: "Great groomers don't just make dogs look good — they promote health, confidence, and happiness.",
  heroQuoteAttribution: "Leashed",
  badge: "ACADEMY",
  credential: "Professional Dog Groomer Diploma",
  totalWeeks: 44,
  totalWeeksFormatted: "44 Weeks Full-Time",
  partTimeWeeksFormatted: "≈ 84 Weeks (Part-Time)",
  totalModules: 157,
  totalClockHours: 1248,
  termsCount: 4,
  heroImage: "/images/dog_groomer.jpg",
  scheduleWeekly: "30 Hours / Week · Mon – Fri | 08:00 – 15:30",
  stats: { weeks: "44 Weeks FT (84 Wk PT)", modules: "157 Modules", hours: "1,248 Hours", credential: "1 Professional Diploma" },
  overviewParagraphs: [
    "The Professional Dog Groomer (IPDG) program is a 44-week, four-term career pathway. You'll learn canine anatomy, bathing chemistry, drying techniques, shear and clipper skills, and all major breed trims — alongside the business and personal skills to run your own salon.",
    "Students complete 360 technical hours, 864 hours of business and personal development, and a 24-hour applied capstone. All hours transfer into the PPC Advanced Diploma.",
  ],
  programObjective: "Identify dog stages and understand dog life · Recognize breeds · Recognize grooming tools · Identify workplace safety · Provide basic and advanced grooming techniques · Provide handling and pet care · Understand sanitation · Provide supervised live-client salon services · Build, price, market and operate a grooming business · Manage personal readiness, finances and well-being as an owner · Provide CPR and first aid.",
  safetyGates: ["IPDG-103", "IPDG-302", "IPDG-402"],
  capstoneCode: "GRM-BIZ",
  stacksInto: "PPC Advanced Diploma (all technical and business & personal modules credited)",
  admissionRequirements: "Age 18+ (17 with guardian consent); high-school diploma, GED or ability-to-benefit assessment; physical ability to lift 40 lb and stand for lab blocks; signed animal-handling risk acknowledgement.",
  coreCompetencies: [
    { icon: "Scissors", label: "Breed-Specific Grooming" },
    { icon: "Sparkles", label: "Bathing & Drying" },
    { icon: "Shield", label: "Safe Handling" },
    { icon: "Heart", label: "Canine Health" },
    { icon: "Briefcase", label: "Salon Business" },
  ],
  donutData: { technical: 360, businessPersonal: 864, applied: 24 },
  breakdown: [
    { type: "Technical Hours", percent: "29%", hours: 360, description: "12 Grooming Technical Modules" },
    { type: "Business & Personal Hours", percent: "69%", hours: 864, description: "144 Business & Personal Modules" },
    { type: "Applied Capstone Hours", percent: "2%", hours: 24, description: "GRM-BIZ Applied Salon Capstone" },
  ],
  manuals: textsFor(IPDG_TEXT_IDS),
  deliveryAndAccess: [],
  completionRequirements: [],
  terms: [
    { termNumber: 1, name: "Foundation", technicalModules: ["IPDG-101", "IPDG-102", "IPDG-103", "IPDG-104"], businessModules: "36 modules: LSH 101–105, PER 101–105, BUS 101–106, MKT 101–105, TEC 101–105, FIN 101–105, LEG 101–105", appliedModule: null, techHours: 95, businessHours: 216, appliedHours: 0, termHours: 311, durationWeeks: "≈ 11 Weeks", description: "Establish core handling, bathing, drying, and grooming tool fundamentals.", modulesCount: 39, clockHours: 311, modulesSummary: { technicalHours: 95, businessHours: 216, appliedHours: 0 }, courseHighlights: [] },
    { termNumber: 2, name: "Core Skill", technicalModules: ["IPDG-201", "IPDG-202", "IPDG-203", "IPDG-204"], businessModules: "36 modules: LSH 201–205, PER 201–205, BUS 201–206, MKT 201–205, TEC 201–205, FIN 201–205, LEG 201–205", appliedModule: null, techHours: 95, businessHours: 216, appliedHours: 0, termHours: 311, durationWeeks: "≈ 11 Weeks", description: "Core grooming techniques, clipper mastery, and basic breed styling.", modulesCount: 41, clockHours: 311, modulesSummary: { technicalHours: 95, businessHours: 216, appliedHours: 0 }, courseHighlights: [] },
    { termNumber: 3, name: "Advanced Skill", technicalModules: ["IPDG-301", "IPDG-302"], businessModules: "36 modules: LSH 301–305, PER 301–305, BUS 301–306, MKT 301–305, TEC 301–305, FIN 301–305, LEG 301–305", appliedModule: null, techHours: 130, businessHours: 216, appliedHours: 0, termHours: 346, durationWeeks: "≈ 12 Weeks", description: "Advanced breed styling, specialty coats, and scissor mastery.", modulesCount: 40, clockHours: 346, modulesSummary: { technicalHours: 130, businessHours: 216, appliedHours: 0 }, courseHighlights: [] },
    { termNumber: 4, name: "Capstone", technicalModules: ["IPDG-401", "IPDG-402"], businessModules: "36 modules: LSH 401–405, PER 401–405, BUS 401–406, MKT 401–405, TEC 401–405, FIN 401–405, LEG 401–405", appliedModule: "GRM-BIZ", techHours: 40, businessHours: 216, appliedHours: 24, termHours: 280, durationWeeks: "≈ 10 Weeks", description: "Supervised salon practicum, speed grooming, and salon business capstone.", modulesCount: 40, clockHours: 280, modulesSummary: { technicalHours: 40, businessHours: 216, appliedHours: 24 }, courseHighlights: [] },
  ],
};

// ─── PDT — Professional Dog Trainer ─────────────────────────────────────────
const pdt: ProgramDetails = {
  id: "pdt",
  code: "PDT",
  slug: "professional-dog-trainer",
  title: "Professional Dog Trainer",
  fullTitle: "Professional Dog Trainer Diploma (PDT)",
  subtitle: "Recognize dog history · Offer guidance to new owners · Follow vaccination & ADA guides · Identify 10 most important AKC breeds · Recognize training equipment · Recognize personalities & behavior problems · Choose effective solutions · Train basic obedience · Train advanced obedience · Use in-motion commands, verbal & hand signals · Make corrections · Design private classes · Build, price, market and operate a training business · Manage personal readiness, finances and well-being as an owner · Understand continuous education · Provide CPR and first aid.",
  tagline: "Confident Trainers. Well-Behaved Dogs.",
  heroQuote: "Training is a conversation, not a command.",
  heroQuoteAttribution: "Leashed",
  badge: "ACADEMY",
  credential: "Professional Dog Trainer Diploma",
  totalWeeks: 39,
  totalWeeksFormatted: "39 Weeks Full-Time",
  partTimeWeeksFormatted: "≈ 75 Weeks (Part-Time)",
  totalModules: 155,
  totalClockHours: 1112,
  termsCount: 4,
  heroImage: "/images/hero_trainer.jpg",
  scheduleWeekly: "30 Hours / Week · Mon – Fri | 08:00 – 15:30",
  stats: { weeks: "39 Weeks FT (75 Wk PT)", modules: "155 Modules", hours: "1,112 Hours", credential: "1 Professional Diploma" },
  overviewParagraphs: [
    "The Professional Dog Trainer (PDT) program is a 39-week, four-term career pathway. You'll learn dog history, breed identification, training equipment, obedience training (basic and advanced), behavior problem solving, and private class design — alongside the business skills to run your own training business.",
    "Students complete 224 technical hours, 864 hours of business and personal development, and a 24-hour applied capstone. All hours transfer into the PPC Advanced Diploma.",
  ],
  programObjective: "Recognize/search dog history · Offer guidance to new owners · Follow vaccination & ADA guides · Identify 10 most important AKC breeds · Recognize training equipment · Recognize personalities & behavior problems · Choose effective solutions · Train basic obedience · Train advanced obedience · Use in-motion commands, verbal & hand signals · Make corrections · Design private classes · Build, price, market and operate a training business · Manage personal readiness, finances and well-being as an owner · Understand continuous education · Provide CPR and first aid.",
  safetyGates: ["PDT-201", "PDT-402"],
  capstoneCode: "TRN-BIZ",
  stacksInto: "PPC Advanced Diploma (all technical and business & personal modules credited)",
  admissionRequirements: "Age 18+ (17 with guardian consent); high-school diploma, GED or ability-to-benefit assessment; physical ability to lift 40 lb and stand for lab blocks; signed animal-handling risk acknowledgement.",
  coreCompetencies: [
    { icon: "PawPrint", label: "Breed Identification" },
    { icon: "Compass", label: "Obedience Training" },
    { icon: "Shield", label: "Safe Handling" },
    { icon: "Heart", label: "Behavior Problem Solving" },
    { icon: "Briefcase", label: "Training Business" },
  ],
  donutData: { technical: 224, businessPersonal: 864, applied: 24 },
  breakdown: [
    { type: "Technical Hours", percent: "20%", hours: 224, description: "10 Training Technical Modules" },
    { type: "Business & Personal Hours", percent: "78%", hours: 864, description: "144 Business & Personal Modules" },
    { type: "Applied Capstone Hours", percent: "2%", hours: 24, description: "TRN-BIZ Applied Training Capstone" },
  ],
  manuals: textsFor(PDT_TEXT_IDS),
  deliveryAndAccess: [],
  completionRequirements: [],
  terms: [
    { termNumber: 1, name: "Foundation", technicalModules: ["PDT-101", "PDT-102", "PDT-103"], businessModules: "36 modules: LSH 101–105, PER 101–105, BUS 101–106, MKT 101–105, TEC 101–105, FIN 101–105, LEG 101–105", appliedModule: null, techHours: 40, businessHours: 216, appliedHours: 0, termHours: 256, durationWeeks: "≈ 9 Weeks", description: "Dog history, breeds, training equipment, and basic obedience foundations.", modulesCount: 39, clockHours: 256, modulesSummary: { technicalHours: 40, businessHours: 216, appliedHours: 0 }, courseHighlights: [] },
    { termNumber: 2, name: "Core Skill", technicalModules: ["PDT-201", "PDT-202"], businessModules: "36 modules: LSH 201–205, PER 201–205, BUS 201–206, MKT 201–205, TEC 201–205, FIN 201–205, LEG 201–205", appliedModule: null, techHours: 50, businessHours: 216, appliedHours: 0, termHours: 266, durationWeeks: "≈ 9 Weeks", description: "Core obedience, marker training, and behavior problem solving.", modulesCount: 38, clockHours: 266, modulesSummary: { technicalHours: 50, businessHours: 216, appliedHours: 0 }, courseHighlights: [] },
    { termNumber: 3, name: "Advanced Skill", technicalModules: ["PDT-301", "PDT-302", "PDT-303"], businessModules: "36 modules: LSH 301–305, PER 301–305, BUS 301–306, MKT 301–305, TEC 301–305, FIN 301–305, LEG 301–305", appliedModule: null, techHours: 120, businessHours: 216, appliedHours: 0, termHours: 336, durationWeeks: "≈ 12 Weeks", description: "Advanced obedience, private class design, and behavior modification.", modulesCount: 39, clockHours: 336, modulesSummary: { technicalHours: 120, businessHours: 216, appliedHours: 0 }, courseHighlights: [] },
    { termNumber: 4, name: "Capstone", technicalModules: ["PDT-401", "PDT-402"], businessModules: "36 modules: LSH 401–405, PER 401–405, BUS 401–406, MKT 401–405, TEC 401–405, FIN 401–405, LEG 401–405", appliedModule: "TRN-BIZ", techHours: 14, businessHours: 216, appliedHours: 24, termHours: 254, durationWeeks: "≈ 9 Weeks", description: "Supervised training practicum and training business capstone.", modulesCount: 39, clockHours: 254, modulesSummary: { technicalHours: 14, businessHours: 216, appliedHours: 24 }, courseHighlights: [] },
  ],
};

// ─── ACA — Animal Care Assistant ────────────────────────────────────────────
const aca: ProgramDetails = {
  id: "aca",
  code: "ACA",
  slug: "animal-care-assistant",
  title: "Animal Care Assistant",
  fullTitle: "Dog Bather–Animal Care Assistant Diploma (ACA)",
  subtitle: "Identify a puppy and understand puppy life · Recognize breeds · Recognize grooming tools · Identify workplace safety · Provide basic handling and basic dog care · Understand sanitation process · Enter the workforce with personal readiness and customer-service skills · Understand the bather-to-owner career ladder.",
  tagline: "Caring Hands. Career Start.",
  heroQuote: "Every great groomer started by learning to care.",
  heroQuoteAttribution: "Leashed",
  badge: "ACADEMY",
  credential: "Dog Bather–Animal Care Assistant Diploma",
  totalWeeks: 35,
  totalWeeksFormatted: "35 Weeks Full-Time",
  partTimeWeeksFormatted: "≈ 66 Weeks (Part-Time)",
  totalModules: 150,
  totalClockHours: 988,
  termsCount: 4,
  heroImage: "/images/pets_caregiver.jpg",
  scheduleWeekly: "30 Hours / Week · Mon – Fri | 08:00 – 15:30",
  stats: { weeks: "35 Weeks FT (66 Wk PT)", modules: "150 Modules", hours: "988 Hours", credential: "1 Professional Diploma" },
  overviewParagraphs: [
    "The Animal Care Assistant (ACA) program is a 35-week, four-term career pathway. You'll learn puppy care, breed identification, grooming tool basics, workplace safety, basic handling and dog care, sanitation, and customer-service skills — the fastest entry into the animal-care workforce.",
    "Students complete 112 technical hours, 864 hours of business and personal development, and a 12-hour applied capstone. ACA modules stack into the IPDG pathway.",
  ],
  programObjective: "Identify a puppy and understand puppy life · Recognize breeds · Recognize grooming tools · Identify workplace safety · Provide basic handling and basic dog care · Understand sanitation process · Enter the workforce with personal readiness and customer-service skills · Understand the bather-to-owner career ladder.",
  safetyGates: ["ACA-201"],
  capstoneCode: "ACA-BIZ",
  stacksInto: "IPDG (ACA-101/102/103/201/301 credited toward IPDG-101–204); all business & personal modules credited",
  admissionRequirements: "Age 18+ (17 with guardian consent); high-school diploma, GED or ability-to-benefit assessment; physical ability to lift 40 lb and stand for lab blocks; signed animal-handling risk acknowledgement.",
  coreCompetencies: [
    { icon: "PawPrint", label: "Puppy & Dog Care" },
    { icon: "Sparkles", label: "Bathing & Sanitation" },
    { icon: "Shield", label: "Workplace Safety" },
    { icon: "Heart", label: "Customer Service" },
    { icon: "Briefcase", label: "Career Development" },
  ],
  donutData: { technical: 112, businessPersonal: 864, applied: 12 },
  breakdown: [
    { type: "Technical Hours", percent: "11%", hours: 112, description: "5 Animal Care Technical Modules" },
    { type: "Business & Personal Hours", percent: "87%", hours: 864, description: "144 Business & Personal Modules" },
    { type: "Applied Capstone Hours", percent: "1%", hours: 12, description: "ACA-BIZ Applied Career Capstone" },
  ],
  manuals: textsFor(ACA_TEXT_IDS),
  deliveryAndAccess: [],
  completionRequirements: [],
  terms: [
    { termNumber: 1, name: "Foundation", technicalModules: ["ACA-101", "ACA-102", "ACA-103"], businessModules: "36 modules: LSH 101–105, PER 101–105, BUS 101–106, MKT 101–105, TEC 101–105, FIN 101–105, LEG 101–105", appliedModule: null, techHours: 32, businessHours: 216, appliedHours: 0, termHours: 248, durationWeeks: "≈ 9 Weeks", description: "Puppy care, breed identification, grooming tool basics, and workplace safety.", modulesCount: 39, clockHours: 248, modulesSummary: { technicalHours: 32, businessHours: 216, appliedHours: 0 }, courseHighlights: [] },
    { termNumber: 2, name: "Core Skill", technicalModules: ["ACA-201"], businessModules: "36 modules: LSH 201–205, PER 201–205, BUS 201–206, MKT 201–205, TEC 201–205, FIN 201–205, LEG 201–205", appliedModule: null, techHours: 30, businessHours: 216, appliedHours: 0, termHours: 246, durationWeeks: "≈ 9 Weeks", description: "Handling, bathing, and basic grooming prep.", modulesCount: 37, clockHours: 246, modulesSummary: { technicalHours: 30, businessHours: 216, appliedHours: 0 }, courseHighlights: [] },
    { termNumber: 3, name: "Advanced Skill", technicalModules: ["ACA-301"], businessModules: "36 modules: LSH 301–305, PER 301–305, BUS 301–306, MKT 301–305, TEC 301–305, FIN 301–305, LEG 301–305", appliedModule: null, techHours: 50, businessHours: 216, appliedHours: 0, termHours: 266, durationWeeks: "≈ 9 Weeks", description: "Kennel operations, customer service, and career development.", modulesCount: 37, clockHours: 266, modulesSummary: { technicalHours: 50, businessHours: 216, appliedHours: 0 }, courseHighlights: [] },
    { termNumber: 4, name: "Capstone", technicalModules: [], businessModules: "36 modules: LSH 401–405, PER 401–405, BUS 401–406, MKT 401–405, TEC 401–405, FIN 401–405, LEG 401–405", appliedModule: "ACA-BIZ", techHours: 0, businessHours: 216, appliedHours: 12, termHours: 228, durationWeeks: "≈ 8 Weeks", description: "Workforce readiness portfolio and career capstone.", modulesCount: 37, clockHours: 228, modulesSummary: { technicalHours: 0, businessHours: 216, appliedHours: 12 }, courseHighlights: [] },
  ],
};

// ─── PPS — Professional Pet Sitter ──────────────────────────────────────────
const pps: ProgramDetails = {
  id: "pps",
  code: "PPS",
  slug: "professional-pet-sitter",
  title: "Professional Pet Sitter",
  fullTitle: "Pet Sitter Certificate (PPS)",
  subtitle: "Introduce and choose appropriate clients · Provide multi-species pet care · Handle pets and sanitation safely · Provide CPR and first aid · Launch and run a compliant, insured pet-sitting business.",
  tagline: "Trusted Care. Peace of Mind.",
  heroQuote: "Pet sitting is not a job — it's a responsibility.",
  heroQuoteAttribution: "Leashed",
  badge: "ACADEMY",
  credential: "Pet Sitter Certificate",
  totalWeeks: 2,
  totalWeeksFormatted: "2 Weeks Full-Time",
  partTimeWeeksFormatted: "≈ 4 Weeks (Part-Time)",
  totalModules: 11,
  totalClockHours: 56,
  termsCount: 4,
  heroImage: "/images/pet_sitter.jpg",
  scheduleWeekly: "30 Hours / Week · Mon – Fri | 08:00 – 15:30",
  stats: { weeks: "2 Weeks FT (4 Wk PT)", modules: "11 Modules", hours: "56 Hours", credential: "1 Certificate" },
  overviewParagraphs: [
    "The Professional Pet Sitter (PPS) program is a 2-week certificate pathway. You'll learn client selection, multi-species pet care, safe handling, sanitation, CPR and first aid, and how to launch and run a compliant, insured pet-sitting business.",
    "Students complete 14 technical hours, 36 hours of business development, and a 6-hour applied capstone. PPS modules stack into ACA, IPDG, PDT, or PPC.",
  ],
  programObjective: "Introduce and choose appropriate clients · Provide multi-species pet care · Handle pets and sanitation safely · Provide CPR and first aid · Launch and run a compliant, insured pet-sitting business.",
  safetyGates: ["PPS-104", "PPS-105"],
  capstoneCode: "PPS-BIZ",
  stacksInto: "ACA, IPDG, PDT or PPC (PPS-101–105 and the 6 micro-owner modules credited)",
  admissionRequirements: "Age 18+; background check (in-home client access); reliable transportation; signed animal-handling risk acknowledgement.",
  coreCompetencies: [
    { icon: "PawPrint", label: "Multi-Species Care" },
    { icon: "Shield", label: "Safe Handling" },
    { icon: "Heart", label: "CPR & First Aid" },
    { icon: "Briefcase", label: "Pet-Sitting Business" },
  ],
  donutData: { technical: 14, businessPersonal: 36, applied: 6 },
  breakdown: [
    { type: "Technical Hours", percent: "25%", hours: 14, description: "4 Pet-Sitting Technical Modules" },
    { type: "Business & Personal Hours", percent: "64%", hours: 36, description: "6 Business Modules" },
    { type: "Applied Capstone Hours", percent: "11%", hours: 6, description: "PPS-BIZ Applied Capstone" },
  ],
  manuals: textsFor(PPS_TEXT_IDS),
  deliveryAndAccess: [],
  completionRequirements: [],
  terms: [
    { termNumber: 1, name: "Foundation", technicalModules: ["PPS-101", "PPS-102", "PPS-104", "PPS-105"], businessModules: "BUS-101, FIN-101, LEG-101, LEG-103", appliedModule: null, techHours: 14, businessHours: 24, appliedHours: 0, termHours: 38, durationWeeks: "≈ 2 Weeks", description: "Client selection, multi-species care, safe handling, and CPR.", modulesCount: 8, clockHours: 38, modulesSummary: { technicalHours: 14, businessHours: 24, appliedHours: 0 }, courseHighlights: [] },
    { termNumber: 2, name: "Core Skill", technicalModules: [], businessModules: "BUS-203", appliedModule: null, techHours: 0, businessHours: 6, appliedHours: 0, termHours: 6, durationWeeks: "≈ 1 Day", description: "Focused business module.", modulesCount: 1, clockHours: 6, modulesSummary: { technicalHours: 0, businessHours: 6, appliedHours: 0 }, courseHighlights: [] },
    { termNumber: 3, name: "Advanced Skill", technicalModules: [], businessModules: "MKT-304", appliedModule: null, techHours: 0, businessHours: 6, appliedHours: 0, termHours: 6, durationWeeks: "≈ 1 Day", description: "Marketing module.", modulesCount: 1, clockHours: 6, modulesSummary: { technicalHours: 0, businessHours: 6, appliedHours: 0 }, courseHighlights: [] },
    { termNumber: 4, name: "Capstone", technicalModules: [], businessModules: "", appliedModule: "PPS-BIZ", techHours: 0, businessHours: 0, appliedHours: 6, termHours: 6, durationWeeks: "≈ 1 Day", description: "Pet-sitting business capstone.", modulesCount: 1, clockHours: 6, modulesSummary: { technicalHours: 0, businessHours: 0, appliedHours: 6 }, courseHighlights: [] },
  ],
};

// ─── CAT — Professional Cat Groomer ─────────────────────────────────────────
const cat: ProgramDetails = {
  id: "cat",
  code: "CAT",
  slug: "professional-cat-groomer",
  title: "Professional Cat Groomer",
  fullTitle: "Professional Cat Groomer Certificate (CAT)",
  subtitle: "Recognize cat breeds · Read cat temperament and handle safely · Bathe and dry cats safely · Perform short, long and shave-down cat grooms · Add a profitable, safe cat-grooming service line to a business.",
  tagline: "Calm Hands. Happy Cats.",
  heroQuote: "Cat grooming is reading the cat before touching the cat.",
  heroQuoteAttribution: "Leashed",
  badge: "ACADEMY",
  credential: "Professional Cat Groomer Certificate",
  totalWeeks: 2,
  totalWeeksFormatted: "2 Weeks Full-Time",
  partTimeWeeksFormatted: "≈ 4 Weeks (Part-Time)",
  totalModules: 11,
  totalClockHours: 58,
  termsCount: 4,
  heroImage: "/images/cat_groomer.jpg",
  scheduleWeekly: "30 Hours / Week · Mon – Fri | 08:00 – 15:30",
  stats: { weeks: "2 Weeks FT (4 Wk PT)", modules: "11 Modules", hours: "58 Hours", credential: "1 Certificate" },
  overviewParagraphs: [
    "The Professional Cat Groomer (CAT) program is a 2-week certificate pathway. You'll learn cat breeds, temperament reading, safe handling, bathing and drying, short and long coat grooms, shave-downs, and how to add a profitable cat-grooming service line to your business.",
    "Students complete 16 technical hours, 36 hours of business development, and a 6-hour applied capstone. CAT modules stack into IPDG or PPC.",
  ],
  programObjective: "Recognize cat breeds · Read cat temperament and handle safely · Bathe and dry cats safely · Perform short, long and shave-down cat grooms · Add a profitable, safe cat-grooming service line to a business.",
  safetyGates: ["CAT-102"],
  capstoneCode: "CAT-BIZ",
  stacksInto: "IPDG or PPC (CAT-101–104 and the 6 micro-owner modules credited)",
  admissionRequirements: "Age 18+; signed animal-handling risk acknowledgement.",
  coreCompetencies: [
    { icon: "PawPrint", label: "Cat Breed Identification" },
    { icon: "Shield", label: "Safe Cat Handling" },
    { icon: "Sparkles", label: "Bathing & Drying Cats" },
    { icon: "Scissors", label: "Cat Grooming Techniques" },
    { icon: "Briefcase", label: "Cat Grooming Business" },
  ],
  donutData: { technical: 16, businessPersonal: 36, applied: 6 },
  breakdown: [
    { type: "Technical Hours", percent: "28%", hours: 16, description: "4 Cat Grooming Technical Modules" },
    { type: "Business & Personal Hours", percent: "62%", hours: 36, description: "6 Business Modules" },
    { type: "Applied Capstone Hours", percent: "10%", hours: 6, description: "CAT-BIZ Applied Capstone" },
  ],
  manuals: textsFor(CAT_TEXT_IDS),
  deliveryAndAccess: [],
  completionRequirements: [],
  terms: [
    { termNumber: 1, name: "Foundation", technicalModules: ["CAT-101", "CAT-102", "CAT-103", "CAT-104"], businessModules: "BUS-101, FIN-101, LEG-101, LEG-103", appliedModule: null, techHours: 16, businessHours: 24, appliedHours: 0, termHours: 40, durationWeeks: "≈ 2 Weeks", description: "Cat breeds, temperament, safe handling, and grooming techniques.", modulesCount: 8, clockHours: 40, modulesSummary: { technicalHours: 16, businessHours: 24, appliedHours: 0 }, courseHighlights: [] },
    { termNumber: 2, name: "Core Skill", technicalModules: [], businessModules: "BUS-203", appliedModule: null, techHours: 0, businessHours: 6, appliedHours: 0, termHours: 6, durationWeeks: "≈ 1 Day", description: "Focused business module.", modulesCount: 1, clockHours: 6, modulesSummary: { technicalHours: 0, businessHours: 6, appliedHours: 0 }, courseHighlights: [] },
    { termNumber: 3, name: "Advanced Skill", technicalModules: [], businessModules: "MKT-304", appliedModule: null, techHours: 0, businessHours: 6, appliedHours: 0, termHours: 6, durationWeeks: "≈ 1 Day", description: "Marketing module.", modulesCount: 1, clockHours: 6, modulesSummary: { technicalHours: 0, businessHours: 6, appliedHours: 0 }, courseHighlights: [] },
    { termNumber: 4, name: "Capstone", technicalModules: [], businessModules: "", appliedModule: "CAT-BIZ", techHours: 0, businessHours: 0, appliedHours: 6, termHours: 6, durationWeeks: "≈ 1 Day", description: "Cat grooming business capstone.", modulesCount: 1, clockHours: 6, modulesSummary: { technicalHours: 0, businessHours: 0, appliedHours: 6 }, courseHighlights: [] },
  ],
};

// ─── PPC — Professional Pet Care & Business Ownership ───────────────────────
const ppc: ProgramDetails = {
  id: "ppc",
  code: "PPC",
  slug: "pet-care-business-ownership",
  title: "Professional Pet Care & Business Ownership",
  fullTitle: "Professional Pet Care & Business Ownership — Advanced Diploma (PPC)",
  subtitle: "All IPDG, PDT, PPS and CAT technical objectives · A multi-service practicum across salon floor, training floor and pet-sitting visits · Master the full Business & Personal Mastery spine (LSH, PER, BUS, MKT, TEC, FIN, LEG) · Launch, fund, staff, market, protect and scale a multi-service pet-care enterprise · Master personal life systems, finances and well-being as a whole-person owner · Provide CPR and first aid.",
  tagline: "Master Every Craft. Own the Business.",
  heroQuote: "The terminal credential — craft, business, and personal readiness in one.",
  heroQuoteAttribution: "Leashed",
  badge: "ACADEMY",
  credential: "Professional Pet Care & Business Ownership — Advanced Diploma",
  totalWeeks: 52,
  totalWeeksFormatted: "52 Weeks Full-Time",
  partTimeWeeksFormatted: "≈ 100 Weeks (Part-Time)",
  totalModules: 172,
  totalClockHours: 1500,
  termsCount: 4,
  heroImage: "/images/pet_business.jpg",
  scheduleWeekly: "30 Hours / Week · Mon – Fri | 08:00 – 15:30",
  stats: { weeks: "52 Weeks FT (100 Wk PT)", modules: "172 Modules", hours: "1,500 Hours", credential: "1 Advanced Diploma" },
  overviewParagraphs: [
    "The Professional Pet Care & Business Ownership (PPC) program is the terminal credential — a 52-week, four-term advanced diploma covering all four pet-care crafts (grooming, training, sitting, cat grooming) plus the full business and personal development spine.",
    "Students complete 600 technical hours, 864 hours of business and personal development, and a 36-hour applied capstone. This is the most comprehensive pathway in the program.",
  ],
  programObjective: "All IPDG, PDT, PPS and CAT technical objectives · A multi-service practicum across salon floor, training floor and pet-sitting visits · Master the full Business & Personal Mastery spine (LSH, PER, BUS, MKT, TEC, FIN, LEG) · Launch, fund, staff, market, protect and scale a multi-service pet-care enterprise · Master personal life systems, finances and well-being as a whole-person owner · Provide CPR and first aid.",
  safetyGates: ["PPC-105", "PPC-201", "PPC-306", "PPC-403", "PPC-405", "PPC-410"],
  capstoneCode: "PPC-BIZ",
  stacksInto: "Terminal credential — does not stack into any other pathway.",
  admissionRequirements: "Age 18+ (17 with guardian consent); high-school diploma, GED or ability-to-benefit assessment; physical ability to lift 40 lb and stand for lab blocks; signed animal-handling risk acknowledgement.",
  coreCompetencies: [
    { icon: "Scissors", label: "Multi-Service Craft" },
    { icon: "Briefcase", label: "Business Operations" },
    { icon: "TrendingUp", label: "Funding & Scaling" },
    { icon: "Shield", label: "Legal & Insurance" },
    { icon: "Heart", label: "Whole-Person Readiness" },
  ],
  donutData: { technical: 600, businessPersonal: 864, applied: 36 },
  breakdown: [
    { type: "Technical Hours", percent: "40%", hours: 600, description: "27 Multi-Service Technical Modules" },
    { type: "Business & Personal Hours", percent: "58%", hours: 864, description: "144 Business & Personal Modules" },
    { type: "Applied Capstone Hours", percent: "2%", hours: 36, description: "PPC-BIZ Multi-Service Enterprise Capstone" },
  ],
  manuals: textsFor(PPC_TEXT_IDS),
  deliveryAndAccess: [],
  completionRequirements: [],
  terms: [
    { termNumber: 1, name: "Foundation", technicalModules: ["PPC-101", "PPC-102", "PPC-103", "PPC-104", "PPC-105", "PPC-106"], businessModules: "36 modules: LSH 101–105, PER 101–105, BUS 101–106, MKT 101–105, TEC 101–105, FIN 101–105, LEG 101–105", appliedModule: null, techHours: 115, businessHours: 216, appliedHours: 0, termHours: 331, durationWeeks: "≈ 12 Weeks", description: "Multi-service craft foundations and owner identity.", modulesCount: 42, clockHours: 331, modulesSummary: { technicalHours: 115, businessHours: 216, appliedHours: 0 }, courseHighlights: [] },
    { termNumber: 2, name: "Core Skill", technicalModules: ["PPC-201", "PPC-202", "PPC-203", "PPC-204", "PPC-205"], businessModules: "36 modules: LSH 201–205, PER 201–205, BUS 201–206, MKT 201–205, TEC 201–205, FIN 201–205, LEG 201–205", appliedModule: null, techHours: 170, businessHours: 216, appliedHours: 0, termHours: 386, durationWeeks: "≈ 13 Weeks", description: "Scaling craft across all service lines.", modulesCount: 41, clockHours: 386, modulesSummary: { technicalHours: 170, businessHours: 216, appliedHours: 0 }, courseHighlights: [] },
    { termNumber: 3, name: "Advanced Skill", technicalModules: ["PPC-301", "PPC-302", "PPC-303", "PPC-304", "PPC-305", "PPC-306"], businessModules: "36 modules: LSH 301–305, PER 301–305, BUS 301–306, MKT 301–305, TEC 301–305, FIN 301–305, LEG 301–305", appliedModule: null, techHours: 225, businessHours: 216, appliedHours: 0, termHours: 441, durationWeeks: "≈ 15 Weeks", description: "Funding, staffing, and scaling a multi-service enterprise.", modulesCount: 42, clockHours: 441, modulesSummary: { technicalHours: 225, businessHours: 216, appliedHours: 0 }, courseHighlights: [] },
    { termNumber: 4, name: "Capstone", technicalModules: ["PPC-401", "PPC-402", "PPC-403", "PPC-404", "PPC-405", "PPC-406", "PPC-407", "PPC-408", "PPC-409", "PPC-410"], businessModules: "36 modules: LSH 401–405, PER 401–405, BUS 401–406, MKT 401–405, TEC 401–405, FIN 401–405, LEG 401–405", appliedModule: "PPC-BIZ", techHours: 90, businessHours: 216, appliedHours: 36, termHours: 342, durationWeeks: "≈ 12 Weeks", description: "Multi-service enterprise capstone and launch.", modulesCount: 47, clockHours: 342, modulesSummary: { technicalHours: 90, businessHours: 216, appliedHours: 36 }, courseHighlights: [] },
  ],
};

// ─── Exports ────────────────────────────────────────────────────────────────
export const COURSES_PROGRAMS: ProgramDetails[] = [ipdg, pdt, aca, pps, cat, ppc];

export function getProgramBySlug(slug: string): ProgramDetails | undefined {
  return COURSES_PROGRAMS.find((p) => p.slug === slug);
}

export function getProgramById(id: string): ProgramDetails | undefined {
  return COURSES_PROGRAMS.find((p) => p.id === id);
}
