export interface CourseModuleSummary {
  code: string;
  title: string;
  hours: number;
  description: string;
}

export interface TermData {
  termNumber: number;
  name: string;
  subtitle?: string;
  modulesCount: number;
  durationWeeks: string;
  clockHours: number;
  description: string;
  image: string;
  modulesSummary: {
    technicalModules?: string[];
    businessModulesCount?: number;
    businessCodeRange?: string;
    appliedModules?: string[];
    technicalHours?: number;
    businessHours?: number;
    appliedHours?: number;
  };
  topics: string[];
  courseHighlights: CourseModuleSummary[];
}

export interface ProgramBreakdownItem {
  type: string;
  percent: string;
  hours: number;
  description?: string;
}

export interface ProgramDetails {
  id: string;
  code: string; // e.g. 'PPC', 'CAT', 'ACA', 'PPS', 'IPDG', 'PDT'
  slug: string; // url slug under /courses/[slug]
  title: string;
  fullTitle: string;
  subtitle: string;
  tagline: string;
  heroQuote: string;
  heroQuoteAttribution?: string;
  bannerCtaText: string;
  badge: string;
  credential: string;
  totalWeeks: number;
  totalWeeksFormatted: string;
  partTimeWeeksFormatted: string;
  totalModules: number;
  totalClockHours: number;
  termsCount: number;
  heroImage: string;
  trainerImage: string;
  scheduleWeekly: string;
  
  // Program Overview stats
  stats: {
    weeks: string;
    modules: string;
    hours: string;
    credential: string;
  };

  overviewParagraphs: string[];
  coreCompetencies: {
    icon: string;
    label: string;
  }[];

  // Hours Donut & breakdown
  donutData: {
    technical: number;
    businessPersonal: number;
    applied: number;
  };
  breakdown: ProgramBreakdownItem[];

  // Delivery & Access bullet items
  deliveryAndAccess: {
    icon: string;
    title: string;
    description: string;
  }[];

  // Safety & Completion Requirements
  completionRequirements: string[];

  // 4 Terms structured breakdown
  terms: TermData[];

  // Totals row
  totalsRow: {
    technicalHours: number;
    businessHours: number;
    appliedHours: number;
    totalHours: number;
  };

  // Textbooks / Manuals from syllabus
  manuals: {
    id: string;
    title: string;
    type: 'Core Manual' | 'Reference Text' | 'Supplementary';
  }[];
}

export const COURSES_PROGRAMS: ProgramDetails[] = [
  // 1. PPC - Professional Pet Care & Business Ownership
  {
    id: 'ppc',
    code: 'PPC',
    slug: 'pet-care-business-ownership',
    title: 'Professional Pet Care & Business Ownership (PPC)',
    fullTitle: 'Professional Pet Care & Business Ownership (PPC)',
    subtitle: 'Learn the skills, knowledge, and business strategies to provide exceptional pet care services and build a successful, sustainable business. This program prepares you for a career as a professional pet care provider and/or business owner in the growing pet industry.',
    tagline: 'Better Care. Stronger Skills. Your Business.',
    heroQuote: '“More than a job — it’s a lifestyle, a business, and a bigger purpose.”',
    heroQuoteAttribution: 'LEASHED',
    bannerCtaText: 'Enroll Now',
    badge: 'ACADEMY',
    credential: 'Professional Pet Care & Business Ownership — Advanced Diploma',
    totalWeeks: 52,
    totalWeeksFormatted: '52 Weeks Total Program',
    partTimeWeeksFormatted: '≈ 100 Weeks (Part-Time)',
    totalModules: 172,
    totalClockHours: 1500,
    termsCount: 4,
    heroImage: '/images/pets_caregiver.jpg',
    trainerImage: '/images/trainer_jacket.jpg',
    scheduleWeekly: '30 Hours / Week · Mon – Fri | 08:00 – 15:30',
    stats: {
      weeks: '52 Weeks',
      modules: '172 Modules',
      hours: '1,500 Hours',
      credential: '1 Advanced Diploma Included',
    },
    overviewParagraphs: [
      'The Professional Pet Care & Business Ownership (PPC) program gives you the hands-on skills, industry knowledge, and business training to work in the pet care industry and build your own successful business. You’ll learn animal care, client communication, scheduling, marketing, financial management, and more — all in a supportive, real-world learning environment.',
    ],
    coreCompetencies: [
      { icon: 'PawPrint', label: 'Animal Care & Handling' },
      { icon: 'Heart', label: 'Client Communication' },
      { icon: 'Briefcase', label: 'Business Management' },
      { icon: 'Megaphone', label: 'Marketing & Branding' },
      { icon: 'TrendingUp', label: 'Financial Literacy' },
      { icon: 'Users', label: 'Career Pathways' },
    ],
    donutData: {
      technical: 600,
      businessPersonal: 864,
      applied: 36,
    },
    breakdown: [
      { type: 'Technical Hours', percent: '40%', hours: 600, description: '27 Technical Modules (600 hr)' },
      { type: 'Business & Personal Hours', percent: '58%', hours: 864, description: '144 Business & Personal Modules (864 hr)' },
      { type: 'Applied Learning Hours', percent: '2%', hours: 36, description: 'PPC-BIZ Comprehensive Capstone' },
    ],
    deliveryAndAccess: [
      { icon: 'Building2', title: 'In-Person Training', description: 'Hands-on labs, salon floor, training floor, and real-world practice' },
      { icon: 'Laptop', title: 'Online Learning Platform', description: 'Comprehensive LMS with theory modules (learn anytime, anywhere)' },
      { icon: 'Users', title: 'Hands-On Practicals', description: 'Real-world application with live-animal rotations' },
      { icon: 'CheckCircle2', title: 'Progress Assessments', description: 'Regular checkpoints, quizzes, and skills reviews' },
    ],
    completionRequirements: [
      'Complete all 172 modules (600 technical + 864 business & personal + 36 applied hours)',
      'Pass required assessments with ≥ 80% on each quiz',
      'Meet 95% attendance requirements across all terms',
      'Successfully complete and defend PPC-BIZ capstone project before owner panel',
      'Fulfill all key skills checks (PPC-105, PPC-201, PPC-306, PPC-403, PPC-405, PPC-410)',
      'Complete supervised multi-service hands-on practice (PPC-408 private class + PPC-409 multi-service log)',
    ],
    terms: [
      {
        termNumber: 1,
        name: 'Foundations of Pet Care & Industry',
        modulesCount: 42,
        durationWeeks: '12 Weeks',
        clockHours: 331,
        description: 'Learn core animal care, behavior, safety, and industry fundamentals.',
        image: '/images/dog_groomer.jpg',
        modulesSummary: {
          technicalModules: ['PPC-101', 'PPC-102', 'PPC-103', 'PPC-104', 'PPC-105', 'PPC-106'],
          businessModulesCount: 36,
          businessCodeRange: 'LSH 101–105, PER 101–105, BUS 101–106, MKT 101–105, TEC 101–105, FIN 101–105, LEG 101–105',
          technicalHours: 115,
          businessHours: 216,
          appliedHours: 0,
        },
        topics: [
          'Animal behavior & handling mechanics',
          'Pet health, CPR & first aid protocol',
          'Breed recognition & temperament assessment',
          'Bathing & salon preparation fundamentals',
          'Salon sanitation & infection control key skills check',
          'Customer intake & service consultation',
        ],
        courseHighlights: [
          { code: 'PPC-101', title: 'Animal Handling & Restraint Mechanics', hours: 20, description: 'Safe physical mechanics and reading canine and feline stress signals.' },
          { code: 'PPC-102', title: 'Pet Health, CPR & First Aid Protocol', hours: 20, description: 'Vital signs assessment, canine and feline CPR, choking, and emergency response.' },
          { code: 'PPC-103', title: 'Breed Recognition & Temperament Assessment', hours: 20, description: 'AKC breed groups, feline traits, and socialization assessment.' },
          { code: 'PPC-104', title: 'Bathing & Salon Preparation Fundamentals', hours: 20, description: 'Bathing chemistry, high-velocity drying, and hygiene prep.' },
          { code: 'PPC-105', title: 'Salon Sanitation & Infection Control [Key Skills Check]', hours: 20, description: 'MANDATORY KEY SKILLS CHECK: Biosecurity, pathogen control, and chemical safety.' },
          { code: 'PPC-106', title: 'Customer Intake & Service Consultation', hours: 15, description: 'Client intake interviews, service agreements, and owner expectations.' },
        ],
      },
      {
        termNumber: 2,
        name: 'Client Care, Core Grooming & Training Skills',
        modulesCount: 41,
        durationWeeks: '13 Weeks',
        clockHours: 386,
        description: 'Build intermediate salon skills, dog training learning theory, multi-species care, and feline grooming.',
        image: '/images/grooming_woman_pet.jpg',
        modulesSummary: {
          technicalModules: ['PPC-201', 'PPC-202', 'PPC-203', 'PPC-204', 'PPC-205'],
          businessModulesCount: 36,
          businessCodeRange: 'LSH 201–205, PER 201–205, BUS 201–206, MKT 201–205, TEC 201–205, FIN 201–205, LEG 201–205',
          technicalHours: 170,
          businessHours: 216,
          appliedHours: 0,
        },
        topics: [
          'Intermediate canine grooming & scissor control',
          'Basic obedience & operant learning theory',
          'Multi-species care & in-home pet sitting',
          'Cat handling & feline grooming fundamentals',
          'Behavior problem identification & solutions',
        ],
        courseHighlights: [
          { code: 'PPC-201', title: 'Intermediate Canine Grooming & Scissor Control [Key Skills Check]', hours: 35, description: 'MANDATORY KEY SKILLS CHECK: Blade safety, guard combs, and sanitary scissor trimming.' },
          { code: 'PPC-202', title: 'Basic Obedience & Canine Learning Theory', hours: 35, description: 'Operant conditioning, marker training, loose-leash walking, and sit/down/stay.' },
          { code: 'PPC-203', title: 'Multi-Species Care & In-Home Pet Sitting', hours: 35, description: 'In-home care routines, key security, pocket pets, and client daily logs.' },
          { code: 'PPC-204', title: 'Cat Handling & Feline Grooming Fundamentals', hours: 35, description: 'Low-stress feline handling, towel wraps, lion cuts, and matting remediation.' },
          { code: 'PPC-205', title: 'Behavior Problem Identification & Solutions', hours: 30, description: 'Remediating jumping, barking, separation distress, and leash reactivity.' },
        ],
      },
      {
        termNumber: 3,
        name: 'Advanced Skills, Daycare & Mobile Operations',
        modulesCount: 42,
        durationWeeks: '15 Weeks',
        clockHours: 441,
        description: 'Advanced breed patterns, behavior modification, commercial daycare/boarding logistics, and mobile operations.',
        image: '/images/job_resume_desk.jpg',
        modulesSummary: {
          technicalModules: ['PPC-301', 'PPC-302', 'PPC-303', 'PPC-304', 'PPC-305', 'PPC-306'],
          businessModulesCount: 36,
          businessCodeRange: 'LSH 301–305, PER 301–305, BUS 301–306, MKT 301–305, TEC 301–305, FIN 301–305, LEG 301–305',
          technicalHours: 225,
          businessHours: 216,
          appliedHours: 0,
        },
        topics: [
          'Advanced breed styling & hand scissoring',
          'Behavior modification & reactivity management',
          'Commercial daycare & boarding facility operations',
          'Mobile pet care operations & van outfitting',
          'Multi-service facility logistics & scheduling',
          'High-risk handling & aggression key skills check',
        ],
        courseHighlights: [
          { code: 'PPC-301', title: 'Advanced Breed Pattern Styling & Hand Scissoring', hours: 40, description: 'Poodle trims, Teddy Bear heads, Terrier hand-stripping, and curved shear beveling.' },
          { code: 'PPC-302', title: 'Behavior Modification & Reactivity Management', hours: 40, description: 'Desensitization, threshold counter-conditioning, and trigger management.' },
          { code: 'PPC-303', title: 'Commercial Daycare & Boarding Facility Operations', hours: 40, description: 'Pack dynamics, playgroup safety, air filtration, and overnight protocols.' },
          { code: 'PPC-304', title: 'Mobile Pet Care Operations & Van Outfitting', hours: 35, description: 'Generator power, water tanks, winterization, and route planning.' },
          { code: 'PPC-305', title: 'Multi-Service Facility Logistics & Scheduling', hours: 40, description: 'Optimizing simultaneous grooming bays, daycare packs, and training classes.' },
          { code: 'PPC-306', title: 'High-Risk Handling & Aggression Protocols [Key Skills Check]', hours: 30, description: 'MANDATORY KEY SKILLS CHECK: Basket muzzles, bite prevention, and defensive handling.' },
        ],
      },
      {
        termNumber: 4,
        name: 'Master Hands-On Practice, Business Scaling & Capstone',
        modulesCount: 47,
        durationWeeks: '12 Weeks',
        clockHours: 342,
        description: 'Prepare for certification, complete supervised multi-service hands-on practice, and defend your business launch capstone.',
        image: '/images/golden_portrait.jpg',
        modulesSummary: {
          technicalModules: ['PPC-401', 'PPC-402', 'PPC-403', 'PPC-404', 'PPC-405', 'PPC-406', 'PPC-407', 'PPC-408', 'PPC-409', 'PPC-410'],
          businessModulesCount: 36,
          businessCodeRange: 'LSH 401–405, PER 401–405, BUS 401–406, MKT 401–405, TEC 401–405, FIN 401–405, LEG 401–405',
          appliedModules: ['PPC-BIZ'],
          technicalHours: 90,
          businessHours: 216,
          appliedHours: 36,
        },
        topics: [
          'Advanced feline styling & specialty services',
          'Service dog basics & public access rules',
          'Emergency first responder & triage key skills check',
          'Master grooming speed & quality benchmarks',
          'Complex behavior case management',
          'Supervised hands-on practice & applied capstone defense',
        ],
        courseHighlights: [
          { code: 'PPC-401', title: 'Advanced Feline Styling & Specialty Services', hours: 10, description: 'Precision comb cuts, senior cat comfort styling, and specialty coats.' },
          { code: 'PPC-402', title: 'Service Dog Basics & Public Access Foundations', hours: 10, description: 'ADA regulations, task training fundamentals, and public access etiquette.' },
          { code: 'PPC-403', title: 'Emergency First Responder & Triage [Key Skills Check]', hours: 10, description: 'MANDATORY KEY SKILLS CHECK: Bloat triage, vehicular trauma stabilization, and emergency transport.' },
          { code: 'PPC-404', title: 'Master Grooming Speed & Quality Benchmarking', hours: 10, description: 'Speed efficiency benchmarks (60-75 min full grooms) with immaculate scissor finish.' },
          { code: 'PPC-405', title: 'Complex Behavior Case Management [Key Skills Check]', hours: 10, description: 'MANDATORY KEY SKILLS CHECK: Severe separation anxiety, vet partnerships, and bite record audits.' },
          { code: 'PPC-406', title: 'Pet Care Business Acquisition & Franchising', hours: 10, description: 'Salon valuation, lease negotiation, franchise disclosure, and expansion strategy.' },
          { code: 'PPC-407', title: 'Staff Training & Salon Leadership Development', hours: 10, description: 'SOP authoring, hiring bathers/groomers, apprenticeship coaching, and team culture.' },
          { code: 'PPC-408', title: 'Private Training Class Delivery Hands-On Practice', hours: 10, description: 'Supervised delivery of live 1-on-1 client behavior and obedience sessions.' },
          { code: 'PPC-409', title: 'Multi-Service Hands-On Practice Supervised Client Log', hours: 10, description: 'Verified multi-service log across salon, training floor, and in-home client visits.' },
          { code: 'PPC-410', title: 'Terminal Safety & Master Operator Board [Key Skills Check]', hours: 10, description: 'MANDATORY FINAL KEY SKILLS CHECK: Comprehensive practical exam and risk governance audit.' },
          { code: 'PPC-BIZ', title: 'Applied Multi-Service Business Capstone Defense', hours: 36, description: 'Complete business defense before owner panel: financial models, SOPs, and 90-day launch roadmap.' },
        ],
      },
    ],
    totalsRow: {
      technicalHours: 600,
      businessHours: 864,
      appliedHours: 36,
      totalHours: 1500,
    },
    manuals: [
      { id: 'MAN-IPDG', title: 'Professional Dog Groomer Core Manual', type: 'Core Manual' },
      { id: 'MAN-PDT', title: 'Professional Dog Trainer Core Manual', type: 'Core Manual' },
      { id: 'MAN-PPS', title: 'Professional Pet Sitter Core Manual', type: 'Core Manual' },
      { id: 'MAN-CAT', title: 'Professional Cat Groomer Core Manual', type: 'Core Manual' },
      { id: 'MAN-BUS', title: 'Business & Leadership: Ownership, Operations & Expansion', type: 'Core Manual' },
      { id: 'MAN-FIN', title: 'Financial Mastery, Bookkeeping & Tax Strategy', type: 'Core Manual' },
      { id: 'MAN-LEG', title: 'Legal, Risk, Compliance & Ethical Governance', type: 'Core Manual' },
    ],
  },

  // 2. Professional Cat Groomer (CAT)
  {
    id: 'cat',
    code: 'CAT',
    slug: 'professional-cat-groomer',
    title: 'Professional Cat Groomer',
    fullTitle: 'Professional Cat Groomer Certificate (CAT)',
    subtitle: 'Recognize cat breeds, read feline temperament, handle safely with low-stress techniques, bathe and dry safely, perform short, long, and shave-down cat grooms, and add a profitable, safe cat-grooming service line to a pet care business.',
    tagline: 'Calm Cats. Confident Groomers. Better Lives.',
    heroQuote: '“Because every cat deserves to look and feel their best.”',
    heroQuoteAttribution: 'LEASHED',
    bannerCtaText: 'Enroll Now',
    badge: 'ACADEMY',
    credential: 'Professional Cat Groomer Certificate (Certificate)',
    totalWeeks: 2,
    totalWeeksFormatted: '2 Weeks Full-Time',
    partTimeWeeksFormatted: '≈ 4 Weeks (Part-Time)',
    totalModules: 11,
    totalClockHours: 58,
    termsCount: 4,
    heroImage: '/images/cat_groomer.jpg',
    trainerImage: '/images/orange_cat.jpg',
    scheduleWeekly: '30 Hours / Week · Mon – Fri | 08:00 – 15:30 (FT) · 15 Hr/Wk (PT)',
    stats: {
      weeks: '2 Weeks FT (4 Wk PT)',
      modules: '11 Modules',
      hours: '58 Hours',
      credential: '1 Professional Certificate',
    },
    overviewParagraphs: [
      'The Professional Cat Groomer (CAT) certificate provides specialized instruction in feline handling, grooming mechanics, breed nuances, and safety protocols. Graduates master low-stress handling, coat degreasing, sanitary shaving, lion trims, and comb cuts while integrating crucial micro-business management foundations.',
      'This certificate stands on its own as a rapid credential or stacks directly into the Professional Dog Groomer (IPDG) or Professional Pet Care & Business Ownership (PPC) advanced diplomas, with all 58 hours fully credited.',
    ],
    coreCompetencies: [
      { icon: 'PawPrint', label: 'Feline Behavior & Body Language' },
      { icon: 'Scissors', label: 'Lion Trims & Shave-Downs' },
      { icon: 'Shield', label: 'Low-Stress Towel Wraps Gate' },
      { icon: 'Heart', label: 'Degreasing & Bathing Safety' },
      { icon: 'Briefcase', label: 'Specialty Salon Pricing' },
    ],
    donutData: {
      technical: 16,
      businessPersonal: 36,
      applied: 6,
    },
    breakdown: [
      { type: 'Technical Hours', percent: '28%', hours: 16, description: '4 Core Feline Technical Modules (16 hr)' },
      { type: 'Business Hours', percent: '62%', hours: 36, description: '6 Business & Legal Micro-Owner Modules (36 hr)' },
      { type: 'Applied Capstone Hours', percent: '10%', hours: 6, description: 'CAT-BIZ Specialty Service Launch (6 hr)' },
    ],
    deliveryAndAccess: [
      { icon: 'Building2', title: 'In-Person Training', description: 'Hands-on feline labs with quiet isolated cat grooming suites' },
      { icon: 'Laptop', title: 'Online Learning Platform', description: 'Feline anatomy, coat textures, and video demos' },
      { icon: 'Users', title: 'Hands-On Practicals', description: 'Supervised handling of varied feline temperaments' },
      { icon: 'CheckCircle2', title: 'Progress Assessments', description: 'Mandatory CAT-102 key skills check and practical skills review' },
    ],
    completionRequirements: [
      'Complete all 11 modules with verified attendance (58 hours)',
      'Pass mandatory key skills check CAT-102 (low-stress handling and towel wraps) before live-cat grooming',
      'Demonstrate safe scissor and clipper work on shorthair and longhair cat models',
      'Defend CAT-BIZ cat grooming specialty pricing and service menu portfolio',
      'Maintain zero-incident safety record throughout all practical sessions',
    ],
    terms: [
      {
        termNumber: 1,
        name: 'Technical Feline Mastery & Business Foundation',
        modulesCount: 8,
        durationWeeks: '2 Weeks (FT)',
        clockHours: 40,
        description: 'Master all four technical cat grooming modules alongside core business structure, financial bookkeeping, and legal licensing.',
        image: '/images/orange_cat.jpg',
        modulesSummary: {
          technicalModules: ['CAT-101', 'CAT-102', 'CAT-103', 'CAT-104'],
          businessModulesCount: 4,
          businessCodeRange: 'BUS-101, FIN-101, LEG-101, LEG-103',
          technicalHours: 16,
          businessHours: 24,
          appliedHours: 0,
        },
        topics: [
          'Feline breeds, anatomy & thin skin mechanics',
          'Low-stress handling & towel wrap key skills check',
          'Cat bathing, degreasing & ambient drying',
          'Lion cuts, comb cuts & sanitary shaving',
          'Entity structure, bookkeeping & licensing',
        ],
        courseHighlights: [
          { code: 'CAT-101', title: 'Feline Breeds, Anatomy & Coat Types', hours: 4, description: 'Recognizing cat breeds, skeletal differences from dogs, thin skin anatomy, and shorthair vs longhair coats.' },
          { code: 'CAT-102', title: 'Low-Stress Feline Handling & Towel Wraps [Key Skills Check]', hours: 4, description: 'MANDATORY KEY SKILLS CHECK: Reading body language (ears, whiskers, tail), burrito wraps, scruffing alternatives.' },
          { code: 'CAT-103', title: 'Cat Bathing, Degreasing & Stress-Free Drying', hours: 4, description: 'Stud tail degreasing, safe face washing, water acclimation, and low-noise ambient drying.' },
          { code: 'CAT-104', title: 'Lion Cuts, Comb Cuts, Sanitary Trims & Dematting', hours: 4, description: '#10 blade safety over feline skin folds, lion cut styling, sanitary trimming, and humane pelt removal.' },
          { code: 'BUS-101', title: 'Pet Industry Business Fundamentals & Structure', hours: 6, description: 'Business entity selection (LLC), positioning feline specialty services, and business planning.' },
          { code: 'FIN-101', title: 'Sole Proprietorship, Bookkeeping & Cash Flow', hours: 6, description: 'Chart of accounts, tracking cat grooming supply expenses, sales tax, and cash flow budgeting.' },
          { code: 'LEG-101', title: 'Licensing, Zoning & Insurance for Pet Care Providers', hours: 6, description: 'Municipal animal permits, commercial liability, animal bailee insurance, and bonding.' },
          { code: 'LEG-103', title: 'Service Contracts, Bailment & Client Liability Waivers', hours: 6, description: 'Feline service agreements, veterinary emergency release forms, and matting liability waivers.' },
        ],
      },
      {
        termNumber: 2,
        name: 'Client Retention & Booking Systems',
        modulesCount: 1,
        durationWeeks: '≈ 1 Day',
        clockHours: 6,
        description: 'Implement client retention loops, key security, and specialized cat booking schedules.',
        image: '/images/cat_groomer.jpg',
        modulesSummary: {
          technicalModules: [],
          businessModulesCount: 1,
          businessCodeRange: 'BUS-203',
          technicalHours: 0,
          businessHours: 6,
          appliedHours: 0,
        },
        topics: [
          'Client retention & loyalty loops',
          'Cat-only quiet salon scheduling',
          'Automated booking and SMS reminders',
        ],
        courseHighlights: [
          { code: 'BUS-203', title: 'Client Retention, Key Security & Scheduling Logistics', hours: 6, description: 'Managing recurring cat grooming appointments, quiet feline hours, and client retention.' },
        ],
      },
      {
        termNumber: 3,
        name: 'Marketing & Local Referral Networks',
        modulesCount: 1,
        durationWeeks: '≈ 1 Day',
        clockHours: 6,
        description: 'Build strategic referral networks with feline veterinarians, shelters, and pet boutiques.',
        image: '/images/health_woman_cat.jpg',
        modulesSummary: {
          technicalModules: [],
          businessModulesCount: 1,
          businessCodeRange: 'MKT-304',
          technicalHours: 0,
          businessHours: 6,
          appliedHours: 0,
        },
        topics: [
          'Local feline veterinary partnerships',
          'Google Business profile optimization for cat grooming',
          'High-ticket pricing and premium cat packages',
        ],
        courseHighlights: [
          { code: 'MKT-304', title: 'Local Service Marketing & Referral Partnerships', hours: 6, description: 'Veterinary referral networks, feline boutique alliances, and targeted digital acquisition.' },
        ],
      },
      {
        termNumber: 4,
        name: 'Applied Business Capstone',
        modulesCount: 1,
        durationWeeks: '≈ 1 Day',
        clockHours: 6,
        description: 'Finalize and present your specialized cat grooming service line and pricing model.',
        image: '/images/job_resume_desk.jpg',
        modulesSummary: {
          technicalModules: [],
          businessModulesCount: 0,
          appliedModules: ['CAT-BIZ'],
          technicalHours: 0,
          businessHours: 0,
          appliedHours: 6,
        },
        topics: [
          'Specialty service line design',
          'Cat grooming pricing menu defense',
          'Emergency vet protocols & launch checklist',
        ],
        courseHighlights: [
          { code: 'CAT-BIZ', title: 'Professional Cat Grooming Business Capstone', hours: 6, description: 'Applied defense: cat salon pricing menu, quiet feline block schedule, client waiver portfolio, and 90-day launch plan.' },
        ],
      },
    ],
    totalsRow: {
      technicalHours: 16,
      businessHours: 36,
      appliedHours: 6,
      totalHours: 58,
    },
    manuals: [
      { id: 'MAN-CAT', title: 'Professional Cat Groomer Program Manual', type: 'Core Manual' },
      { id: 'REF-GRM-02', title: 'Grooming Manual for Dog and Cat', type: 'Reference Text' },
      { id: 'MAN-BUS', title: 'Business & Leadership: Ownership, Operations & Expansion', type: 'Core Manual' },
      { id: 'MAN-FIN', title: 'Financial Mastery, Bookkeeping & Tax Strategy', type: 'Core Manual' },
      { id: 'MAN-LEG', title: 'Legal, Risk, Compliance & Ethical Governance', type: 'Core Manual' },
    ],
  },

  // 3. Dog Bather / Animal Care Assistant (ACA / DB)
  {
    id: 'aca',
    code: 'ACA',
    slug: 'animal-care-assistant',
    title: 'Animal Care Assistant (ACA)',
    fullTitle: 'Dog Bather–Animal Care Assistant Diploma (ACA / DB)',
    subtitle: 'Identify dog stages and life, recognize breeds, identify workplace safety, provide handling and pet care, understand sanitation, prepare coat and bathe/dry, perform hygiene services, clean ears, trim nails, and build foundational career readiness.',
    tagline: 'Healthy Pets. Happy People. Better Together.',
    heroQuote: '“Real skills. Real animals. A stronger you.”',
    heroQuoteAttribution: 'LEASHED',
    bannerCtaText: 'Enroll Now',
    badge: 'ACADEMY',
    credential: 'Dog Bather–Animal Care Assistant Diploma (Diploma)',
    totalWeeks: 35,
    totalWeeksFormatted: '35 Weeks (Full-Time)',
    partTimeWeeksFormatted: '≈ 66 Weeks (Part-Time)',
    totalModules: 150,
    totalClockHours: 988,
    termsCount: 4,
    heroImage: '/images/grooming_woman_pet.jpg',
    trainerImage: '/images/aussie_shepherd.jpg',
    scheduleWeekly: '30 Hours / Week · Mon – Fri | 08:00 – 15:30',
    stats: {
      weeks: '35 Weeks FT (66 Wk PT)',
      modules: '150 Modules',
      hours: '988 Hours',
      credential: '1 Diploma Included',
    },
    overviewParagraphs: [
      'The Dog Bather–Animal Care Assistant (ACA / DB) diploma provides comprehensive, career-entry training in professional animal care, salon bathing, high-velocity drying, and client communication. You’ll gain the practical skills to work confidently in a commercial pet salon, boarding facility, or veterinary clinic.',
      'Students complete 112 technical hours across 5 core bathing and animal care modules, 864 hours across the comprehensive 144-module business and personal development spine, and a 12-hour applied career capstone.',
    ],
    coreCompetencies: [
      { icon: 'PawPrint', label: 'Animal Care & Handling' },
      { icon: 'Sparkles', label: 'Bathing & Coat Preparation' },
      { icon: 'Shield', label: 'Key Skills Check & Sanitation' },
      { icon: 'Users', label: 'Client Care & Reception' },
      { icon: 'TrendingUp', label: 'Career Pathway Progression' },
    ],
    donutData: {
      technical: 112,
      businessPersonal: 864,
      applied: 12,
    },
    breakdown: [
      { type: 'Technical Hours', percent: '11%', hours: 112, description: '5 Technical Modules (ACA-101 to ACA-301)' },
      { type: 'Business & Personal Hours', percent: '87%', hours: 864, description: '144 Business & Personal Mastery Modules' },
      { type: 'Applied Capstone Hours', percent: '2%', hours: 12, description: 'ACA-BIZ Applied Career Capstone' },
    ],
    deliveryAndAccess: [
      { icon: 'Building2', title: 'In-Person Training', description: 'Hands-on labs and real-world salon tub practice' },
      { icon: 'Laptop', title: 'Online Resources', description: 'Learning platform & digital study tools' },
      { icon: 'Users', title: 'Hands-On Practicals', description: 'Live animal bathing and handling experience' },
      { icon: 'CheckCircle2', title: 'Progress Assessments', description: 'ACA-201 key skills check approval & skills reviews' },
    ],
    completionRequirements: [
      'ACA-201 signed off before live-animal work',
      'CPR / First Aid verified before hands-on practice',
      'Complete all 150 modules with attendance records',
      '988 hours documented in LMS attendance ledger',
      'Your skills checklist must be Competent across all technical benchmarks',
      'Pass ACA-BIZ applied career capstone review',
    ],
    terms: [
      {
        termNumber: 1,
        name: 'Animal Care Foundations & Safe Handling',
        modulesCount: 39,
        durationWeeks: '≈ 9 Weeks',
        clockHours: 248,
        description: 'Build essential animal care knowledge and safe handling mechanics. Learn bathing chemistry, equipment ergonomics, and high-velocity drying.',
        image: '/images/dog_groomer.jpg',
        modulesSummary: {
          technicalModules: ['ACA-101', 'ACA-102', 'ACA-103'],
          businessModulesCount: 36,
          businessCodeRange: 'LSH 101–105, PER 101–105, BUS 101–106, MKT 101–105, TEC 101–105, FIN 101–105, LEG 101–105',
          technicalHours: 32,
          businessHours: 216,
          appliedHours: 0,
        },
        topics: [
          'Canine handling, body language & lift mechanics',
          'Bathing chemistry, dilution pumps & water safety',
          'High-velocity drying & de-shedding rakes',
          'Salon safety & equipment sanitation',
        ],
        courseHighlights: [
          { code: 'ACA-101', title: 'Canine Handling, Body Language & Lift Mechanics', hours: 10, description: 'Identifying dog breeds, life stages, fear postures, ergonomic two-person lifting for 40+ lb dogs, and kennel safety.' },
          { code: 'ACA-102', title: 'Bathing Chemistry, Coat Prep & Water Safety', hours: 12, description: 'Shampoo types, dilution pumps, medicated dips, degreasers, water temperature regulation, and non-slip mats.' },
          { code: 'ACA-103', title: 'High-Velocity Drying & De-Shedding Techniques', hours: 10, description: 'Velocity nozzle angles, happy hoodies, eye/ear protection, undercoat rakes, and carding tools.' },
        ],
      },
      {
        termNumber: 2,
        name: 'Sanitation, Hygiene & Prep Work Key Skills Check',
        modulesCount: 37,
        durationWeeks: '≈ 9 Weeks',
        clockHours: 246,
        description: 'Master salon sanitation, pathogen control, and pre-grooming hygiene under the mandatory ACA-201 key skills check.',
        image: '/images/aussie_shepherd.jpg',
        modulesSummary: {
          technicalModules: ['ACA-201'],
          businessModulesCount: 36,
          businessCodeRange: 'LSH 201–205, PER 201–205, BUS 201–206, MKT 201–205, TEC 201–205, FIN 201–205, LEG 201–205',
          technicalHours: 30,
          businessHours: 216,
          appliedHours: 0,
        },
        topics: [
          'Salon sanitation, infection control & health gate',
          'Biosecurity, parasite checks (fleas, ticks, mites)',
          'Customer intake & check-in documentation',
          'Ergonomic table safety and non-slip restraints',
        ],
        courseHighlights: [
          { code: 'ACA-201', title: 'Salon Sanitation, Infection Control & Health Gate [Key Skills Check]', hours: 30, description: 'MANDATORY KEY SKILLS CHECK: Tub disinfection, kennel sanitation, identifying parasites, and skin lesion reporting before live-animal work.' },
        ],
      },
      {
        termNumber: 3,
        name: 'Advanced Prep Work & Speed Benchmarking',
        modulesCount: 37,
        durationWeeks: '≈ 9 Weeks',
        clockHours: 266,
        description: 'Perform advanced pad trimming, sanitary shaving, nail dremel grinding, ear care, and bather workflow speed.',
        image: '/images/trainer_shepherd.jpg',
        modulesSummary: {
          technicalModules: ['ACA-301'],
          businessModulesCount: 36,
          businessCodeRange: 'LSH 301–305, PER 301–305, BUS 301–306, MKT 301–305, TEC 301–305, FIN 301–305, LEG 301–305',
          technicalHours: 50,
          businessHours: 216,
          appliedHours: 0,
        },
        topics: [
          'Pre-grooming hygiene & paw pad shaving',
          'Nail clipping & electric dremel grinding',
          'Ear cleaning & humane care standards',
          'Bathing workflow speed benchmarks (6-8 dogs/shift)',
        ],
        courseHighlights: [
          { code: 'ACA-301', title: 'Pre-Grooming Hygiene, Nail Grinding & Ear Cleaning', hours: 50, description: 'Pad trimming, sanitary area shaving, nail clipping & dremel grinding, ear cleaning, and speed benchmarking.' },
        ],
      },
      {
        termNumber: 4,
        name: 'Applied Career & Business Capstone',
        modulesCount: 37,
        durationWeeks: '≈ 8 Weeks',
        clockHours: 228,
        description: 'Complete the 144-module business and personal development spine and defend the ACA-BIZ applied career capstone.',
        image: '/images/job_resume_desk.jpg',
        modulesSummary: {
          technicalModules: [],
          businessModulesCount: 36,
          businessCodeRange: 'LSH 401–405, PER 401–405, BUS 401–406, MKT 401–405, TEC 401–405, FIN 401–405, LEG 401–405',
          appliedModules: ['ACA-BIZ'],
          technicalHours: 0,
          businessHours: 216,
          appliedHours: 12,
        },
        topics: [
          'Resume & portfolio of 30 documented dog baths',
          'Salon interviewing & live bathing auditions',
          'Bather-to-groomer career ladder progression',
          'ACA-BIZ capstone review & panel approval',
        ],
        courseHighlights: [
          { code: 'ACA-BIZ', title: 'Animal Care Assistant Applied Career & Business Capstone', hours: 12, description: 'Portfolio of 30 documented dog baths, hygiene approvals, career ladder mapping (bather to salon owner), and interview prep.' },
        ],
      },
    ],
    totalsRow: {
      technicalHours: 112,
      businessHours: 864,
      appliedHours: 12,
      totalHours: 988,
    },
    manuals: [
      { id: 'MAN-ACA', title: 'Bather–Animal Care Assistant Core Manual', type: 'Core Manual' },
      { id: 'MAN-BUS', title: 'Business & Leadership: Ownership, Operations & Expansion', type: 'Core Manual' },
      { id: 'MAN-LSH', title: 'Life Skills & Personal Readiness', type: 'Core Manual' },
      { id: 'MAN-FIN', title: 'Financial Mastery, Bookkeeping & Tax Strategy', type: 'Core Manual' },
      { id: 'MAN-LEG', title: 'Legal, Risk, Compliance & Ethical Governance', type: 'Core Manual' },
    ],
  },

  // 4. Professional Pet Sitter (PPS / SIT)
  {
    id: 'pps',
    code: 'PPS',
    slug: 'professional-pet-sitter',
    title: 'Professional Pet Sitter',
    fullTitle: 'Pet Sitter Certificate (PPS)',
    subtitle: 'Introduce and choose appropriate clients, provide multi-species pet care, handle pets and sanitation safely, provide CPR and first aid, and launch and run a compliant, insured pet-sitting business.',
    tagline: 'Trusted Care. Happy Pets. Peace of Mind.',
    heroQuote: '“Professional pet sitters don’t just care for pets — they care for the people who love them.”',
    heroQuoteAttribution: 'LEASHED',
    bannerCtaText: 'Enroll Now',
    badge: 'ACADEMY',
    credential: 'Pet Sitter Certificate (Certificate)',
    totalWeeks: 2,
    totalWeeksFormatted: '2 Weeks Full-Time',
    partTimeWeeksFormatted: '≈ 4 Weeks (Part-Time)',
    totalModules: 11,
    totalClockHours: 56,
    termsCount: 4,
    heroImage: '/images/pet_sitter.jpg',
    trainerImage: '/images/aussie_shepherd.jpg',
    scheduleWeekly: '30 Hours / Week · Mon – Fri | 08:00 – 15:30 (FT) · 15 Hr/Wk (PT)',
    stats: {
      weeks: '2 Weeks FT (4 Wk PT)',
      modules: '11 Modules',
      hours: '56 Hours',
      credential: '1 Professional Certificate',
    },
    overviewParagraphs: [
      'The Professional Pet Sitter (PPS) certificate prepares you to provide safe, reliable, and insured care for a variety of companion animals in residential settings. You’ll master in-home client consultations, key and lockbox security, multi-species feeding routines, canine leash safety, and medical emergency first aid.',
      'Graduates complete 14 technical hours across 4 core modules, 36 hours of micro-owner business and legal modules, and a 6-hour applied business launch capstone (PPS-BIZ).',
    ],
    coreCompetencies: [
      { icon: 'PawPrint', label: 'Multi-Species Care & Routines' },
      { icon: 'Shield', label: 'In-Home Leash Key Skills Check' },
      { icon: 'Heart', label: 'Pet First Aid & CPR Gate' },
      { icon: 'Home', label: 'Home Security & Lockboxes' },
      { icon: 'Briefcase', label: 'Pet Sitting Service Pricing' },
    ],
    donutData: {
      technical: 14,
      businessPersonal: 36,
      applied: 6,
    },
    breakdown: [
      { type: 'Technical Hours', percent: '25%', hours: 14, description: '4 Core Pet Sitting Technical Modules (14 hr)' },
      { type: 'Business Hours', percent: '64%', hours: 36, description: '6 Business & Legal Micro-Owner Modules (36 hr)' },
      { type: 'Applied Capstone Hours', percent: '11%', hours: 6, description: 'PPS-BIZ Service Launch Capstone (6 hr)' },
    ],
    deliveryAndAccess: [
      { icon: 'Laptop', title: 'Interactive Learning Platform', description: 'Video demonstrations and scenario drills' },
      { icon: 'Building2', title: 'In-Person Practical Scenarios', description: 'Mock client meet-and-greets & lockbox safety' },
      { icon: 'Users', title: 'Live Animal Handling', description: 'Supervised dog walks and multi-species care' },
      { icon: 'CheckCircle2', title: 'Progress Assessments', description: 'PPS-104 and PPS-105 key skills check certifications' },
    ],
    completionRequirements: [
      'Complete all 11 modules with verified attendance (56 hours)',
      'Pass mandatory key skills check PPS-104 (in-home handling and door bolting prevention)',
      'Pass mandatory key skills check PPS-105 (pet CPR, first aid, and emergency triage)',
      'Successfully defend PPS-BIZ business launch, pricing menu, and client agreement portfolio',
      'Demonstrate mastery of lockbox management, bailment law, and client emergency protocols',
    ],
    terms: [
      {
        termNumber: 1,
        name: 'Technical Pet Sitting Care & Business Spine',
        modulesCount: 8,
        durationWeeks: '2 Weeks (FT)',
        clockHours: 38,
        description: 'Complete all 4 technical pet-sitting modules alongside business structure, financial bookkeeping, and licensing.',
        image: '/images/golden_portrait.jpg',
        modulesSummary: {
          technicalModules: ['PPS-101', 'PPS-102', 'PPS-104', 'PPS-105'],
          businessModulesCount: 4,
          businessCodeRange: 'BUS-101, FIN-101, LEG-101, LEG-103',
          technicalHours: 14,
          businessHours: 24,
          appliedHours: 0,
        },
        topics: [
          'Pet sitter intake & home security protocols',
          'Multi-species care: dogs, cats, birds, small animals',
          'In-home handling & door escape key skills check',
          'Pet first aid, CPR & medication admin key skills check',
          'Business structure, licensing & client waivers',
        ],
        courseHighlights: [
          { code: 'PPS-101', title: 'Pet Sitter Intake, Client Consultation & Home Security', hours: 3, description: 'Client intake meetings, key and lockbox security protocols, alarm systems, and emergency contact procedures.' },
          { code: 'PPS-102', title: 'Multi-Species Care: Dogs, Cats, Birds & Small Animals', hours: 4, description: 'Species-specific routines, feeding schedules, cage cleaning, litter box monitoring, and behavioral stress signs.' },
          { code: 'PPS-104', title: 'In-Home Handling & Leash Key Skills Check [Key Skills Check]', hours: 4, description: 'MANDATORY KEY SKILLS CHECK: Door bolting prevention, slip leads, harness verification, and outdoor dog encounter protocols.' },
          { code: 'PPS-105', title: 'Pet First Aid, Medication Admin & Medical Emergencies [Key Skills Check]', hours: 3, description: 'MANDATORY KEY SKILLS CHECK: Administering oral/topical medications, insulin injections basics, CPR, choking response, and vet transport.' },
          { code: 'BUS-101', title: 'Pet Industry Business Fundamentals & Structure', hours: 6, description: 'Business entity selection (LLC), positioning solo sitting services, and competitive territory mapping.' },
          { code: 'FIN-101', title: 'Sole Proprietorship, Bookkeeping & Cash Flow', hours: 6, description: 'Mileage tracking, equipment write-offs, invoicing software, and cash flow budgeting.' },
          { code: 'LEG-101', title: 'Licensing, Zoning & Insurance for Pet Care Providers', hours: 6, description: 'Commercial liability, animal bailee floater, bonding against theft, and municipal permits.' },
          { code: 'LEG-103', title: 'Service Contracts, Bailment & Client Liability Waivers', hours: 6, description: 'Enforceable pet sitting agreements, veterinary authorization, key release clauses, and property access waivers.' },
        ],
      },
      {
        termNumber: 2,
        name: 'Client Retention & Booking Logistics',
        modulesCount: 1,
        durationWeeks: '≈ 1 Day',
        clockHours: 6,
        description: 'Establish scheduling systems, recurring booking calendars, and client communication workflows.',
        image: '/images/pet_sitter.jpg',
        modulesSummary: {
          technicalModules: [],
          businessModulesCount: 1,
          businessCodeRange: 'BUS-203',
          technicalHours: 0,
          businessHours: 6,
          appliedHours: 0,
        },
        topics: [
          'Client retention & loyalty loops',
          'Key security & digital lockbox codes',
          'Recurring booking software & automated updates',
        ],
        courseHighlights: [
          { code: 'BUS-203', title: 'Client Retention, Key Security & Scheduling Logistics', hours: 6, description: 'Managing recurring dog-walking and drop-in visit schedules, lockbox security, and retention loops.' },
        ],
      },
      {
        termNumber: 3,
        name: 'Marketing & Local Referral Networks',
        modulesCount: 1,
        durationWeeks: '≈ 1 Day',
        clockHours: 6,
        description: 'Build neighborhood visibility, veterinary alliances, and local Google Business presence.',
        image: '/images/orange_cat.jpg',
        modulesSummary: {
          technicalModules: [],
          businessModulesCount: 1,
          businessCodeRange: 'MKT-304',
          technicalHours: 0,
          businessHours: 6,
          appliedHours: 0,
        },
        topics: [
          'Neighborhood pet marketing & flyers',
          'Veterinary clinic referral relationships',
          'Online client reviews and trust building',
        ],
        courseHighlights: [
          { code: 'MKT-304', title: 'Local Service Marketing & Referral Partnerships', hours: 6, description: 'Veterinary referral networks, pet food boutique partnerships, Google Business Profile optimization, and local community outreach.' },
        ],
      },
      {
        termNumber: 4,
        name: 'Applied Business Capstone',
        modulesCount: 1,
        durationWeeks: '≈ 1 Day',
        clockHours: 6,
        description: 'Launch your independent pet sitting enterprise with a verified business portfolio.',
        image: '/images/pets_caregiver.jpg',
        modulesSummary: {
          technicalModules: [],
          businessModulesCount: 0,
          appliedModules: ['PPS-BIZ'],
          technicalHours: 0,
          businessHours: 0,
          appliedHours: 6,
        },
        topics: [
          'Service radius & route optimization',
          'Pet sitting price menu defense',
          'Emergency veterinary protocols portfolio',
        ],
        courseHighlights: [
          { code: 'PPS-BIZ', title: 'Pet Sitter Applied Business Launch Capstone', hours: 6, description: 'Complete launch plan: service radius, route optimization, pricing menu, client service agreement, and liability insurance checklist.' },
        ],
      },
    ],
    totalsRow: {
      technicalHours: 14,
      businessHours: 36,
      appliedHours: 6,
      totalHours: 56,
    },
    manuals: [
      { id: 'MAN-PPS', title: 'Professional Pet Sitter Program Manual', type: 'Core Manual' },
      { id: 'REF-PPS-01', title: 'Pet Care Givers and Families', type: 'Reference Text' },
      { id: 'MAN-BUS', title: 'Business & Leadership: Ownership, Operations & Expansion', type: 'Core Manual' },
      { id: 'MAN-FIN', title: 'Financial Mastery, Bookkeeping & Tax Strategy', type: 'Core Manual' },
      { id: 'MAN-LEG', title: 'Legal, Risk, Compliance & Ethical Governance', type: 'Core Manual' },
    ],
  },

  // 5. Intensive Professional Dog Groomer (IPDG)
  {
    id: 'ipdg',
    code: 'IPDG',
    slug: 'professional-dog-groomer',
    title: 'Professional Dog Groomer',
    fullTitle: 'Professional Dog Groomer Diploma (IPDG)',
    subtitle: 'Identify dog stages and life, recognize breeds, identify workplace safety, provide handling and pet care, understand sanitation, prepare coat and bathe/dry, perform hygiene services, clean ears, trim nails, scissor and clipper work, style all major breeds, and manage a professional grooming salon.',
    tagline: 'Skilled Groomers. Healthier Happier Dogs.',
    heroQuote: '“Great groomers don’t just make dogs look good — they promote health, confidence, and happiness.”',
    heroQuoteAttribution: 'LEASHED',
    bannerCtaText: 'Enroll Now',
    badge: 'ACADEMY',
    credential: 'Professional Dog Groomer Diploma (Diploma)',
    totalWeeks: 44,
    totalWeeksFormatted: '44 Weeks Full-Time',
    partTimeWeeksFormatted: '≈ 84 Weeks (Part-Time)',
    totalModules: 157,
    totalClockHours: 1328,
    termsCount: 4,
    heroImage: '/images/dog_groomer.jpg',
    trainerImage: '/images/golden_portrait.jpg',
    scheduleWeekly: '30 Hours / Week · Mon – Fri | 08:00 – 15:30 (FT) · 15 Hr/Wk (PT)',
    stats: {
      weeks: '44 Weeks FT (84 Wk PT)',
      modules: '157 Modules',
      hours: '1,328 Hours',
      credential: '1 Professional Diploma',
    },
    overviewParagraphs: [
      'The Professional Dog Groomer (IPDG) diploma is an intensive 44-week, four-term career program preparing students for full professional mastery and salon ownership. The curriculum delivers comprehensive hands-on instruction in canine anatomy, bathing chemistry, high-velocity drying, shear and clipper ergonomics, and all major AKC breed trims.',
      'Students complete 452 technical hours across 15 dedicated modules, the comprehensive 864-hour (144-module) business and personal development spine, and a 12-hour applied business capstone (IPDG-BIZ). All hours stack seamlessly toward the Master PPC Diploma.',
    ],
    coreCompetencies: [
      { icon: 'Scissors', label: 'Breed-Specific Styling & Scissoring' },
      { icon: 'Sparkles', label: 'Bathing, Drying & Coat Prep' },
      { icon: 'Shield', label: 'Tool Safety & Handling Gates' },
      { icon: 'Heart', label: 'Canine Health & Skin Wellness' },
      { icon: 'Briefcase', label: 'Salon Operations & Pricing' },
    ],
    donutData: {
      technical: 452,
      businessPersonal: 864,
      applied: 12,
    },
    breakdown: [
      { type: 'Technical Hours', percent: '34%', hours: 452, description: '15 Professional Grooming Technical Modules' },
      { type: 'Business & Personal Hours', percent: '65%', hours: 864, description: '144 Business & Personal Mastery Modules' },
      { type: 'Applied Capstone Hours', percent: '1%', hours: 12, description: 'IPDG-BIZ Applied Salon Launch Capstone' },
    ],
    deliveryAndAccess: [
      { icon: 'Building2', title: 'Full Salon Floor Labs', description: 'Daily hands-on grooming with commercial equipment and tables' },
      { icon: 'Laptop', title: 'Online Learning Platform', description: 'Breed standard video demos and interactive anatomy quizzes' },
      { icon: 'Users', title: 'Supervised Live Practicals', description: 'Start-to-finish grooms on varied coat types and temperaments' },
      { icon: 'CheckCircle2', title: 'Progress Assessments', description: 'Mandatory IPDG-103 key skills check and technical approvals' },
    ],
    completionRequirements: [
      'IPDG-103 signed off before live-animal work',
      'CPR / First Aid verified before hands-on practice',
      'Complete all 157 modules with attendance records',
      '1,328 hours documented in LMS attendance ledger',
      'Your skills checklist must be Competent across all breed trims and finishing benchmarks',
      'Pass IPDG-BIZ capstone defense and salon business portfolio review',
    ],
    terms: [
      {
        termNumber: 1,
        name: 'Grooming Foundations & Handling Key Skills Check',
        modulesCount: 39,
        durationWeeks: '≈ 9 Weeks',
        clockHours: 248,
        description: 'Establish core canine handling, bathing chemistry, high-velocity drying, and grooming tool mechanics.',
        image: '/images/dog_groomer.jpg',
        modulesSummary: {
          technicalModules: ['IPDG-101', 'IPDG-102', 'IPDG-103'],
          businessModulesCount: 36,
          businessCodeRange: 'LSH 101–105, PER 101–105, BUS 101–106, MKT 101–105, TEC 101–105, FIN 101–105, LEG 101–105',
          technicalHours: 32,
          businessHours: 216,
          appliedHours: 0,
        },
        topics: [
          'Canine breeds, coat types & anatomy',
          'Bathing chemistry, water safety & drying systems',
          'Safe handling, table restraints & lifting gate',
          'Business structure, licensing & initial bookkeeping',
        ],
        courseHighlights: [
          { code: 'IPDG-101', title: 'Canine Breeds, Coat Types & Life Stages', hours: 10, description: 'AKC coat categories, skin sensitivity, puppy and geriatric handling accommodations.' },
          { code: 'IPDG-102', title: 'Bathing Chemistry, Equipment & Ergonomics', hours: 12, description: 'Shampoo types, dilution ratios, eye/ear protection, tub ergonomics, and high-velocity dryers.' },
          { code: 'IPDG-103', title: 'Handling, Key Skills Check & Table Restraints [Key Skills Check]', hours: 10, description: 'MANDATORY KEY SKILLS CHECK: Grooming loops, belly straps, bite mitigation, table posture, and safe lifting.' },
        ],
      },
      {
        termNumber: 2,
        name: 'Core Grooming Techniques & Clipper Mastery',
        modulesCount: 41,
        durationWeeks: '≈ 12 Weeks',
        clockHours: 356,
        description: 'Master sanitary prep, scissor work, clipper safety, drop coats, and basic breed styling.',
        image: '/images/aussie_shepherd.jpg',
        modulesSummary: {
          technicalModules: ['IPDG-201', 'IPDG-202', 'IPDG-203', 'IPDG-204', 'IPDG-205'],
          businessModulesCount: 36,
          businessCodeRange: 'LSH 201–205, PER 201–205, BUS 201–206, MKT 201–205, TEC 201–205, FIN 201–205, LEG 201–205',
          technicalHours: 140,
          businessHours: 216,
          appliedHours: 0,
        },
        topics: [
          'Pre-grooming hygiene: nails, pads & ears',
          'Shears & thinning mechanics',
          'Clippers, snap-on combs & blade care',
          'Drop coats, long coats & de-shedding routines',
          'Basic breed trims: Terriers & Sporting outlines',
        ],
        courseHighlights: [
          { code: 'IPDG-201', title: 'Pre-Grooming Hygiene: Nails, Pads & Ears', hours: 30, description: 'Nail clipping and electric grinding, pad clearing, ear cleaning, and sanitary area prep.' },
          { code: 'IPDG-202', title: 'Introduction to Shears & Hand Scissoring', hours: 20, description: 'Straight, curved, and thinning shear mechanics, hand positioning, and line blending.' },
          { code: 'IPDG-203', title: 'Clipper Mechanics, Blades & Snap-On Combs', hours: 30, description: 'Blade numbering (#10, #7F, #5F, #4F), clipper maintenance, and heat monitoring.' },
          { code: 'IPDG-204', title: 'Drop Coats, Long Coats & Undercoat De-Shedding', hours: 30, description: 'Carding, dematting rakes, line brushing, and coat moisture conditioning.' },
          { code: 'IPDG-205', title: 'Basic Breed Trims: Terriers & Sporting Group', hours: 30, description: 'Jacket setting, skirt lines, furnishings preservation, and eyebrow trimming.' },
        ],
      },
      {
        termNumber: 3,
        name: 'Advanced Breed Styling & Specialty Coats',
        modulesCount: 40,
        durationWeeks: '≈ 12 Weeks',
        clockHours: 356,
        description: 'Execute high-level breed profiles including Poodle patterns, Doodles, double coats, and hand stripping.',
        image: '/images/grooming_woman_pet.jpg',
        modulesSummary: {
          technicalModules: ['IPDG-301', 'IPDG-302', 'IPDG-303', 'IPDG-304'],
          businessModulesCount: 36,
          businessCodeRange: 'LSH 301–305, PER 301–305, BUS 301–306, MKT 301–305, TEC 301–305, FIN 301–305, LEG 301–305',
          technicalHours: 140,
          businessHours: 216,
          appliedHours: 0,
        },
        topics: [
          'Poodle styling & curly coat scissor work',
          'Doodles, mixed breeds & custom pet trims',
          'Double coats, Northern breeds & carding',
          'Hand stripping wire coats & hand plucking',
        ],
        courseHighlights: [
          { code: 'IPDG-301', title: 'Poodle Styling & Curly Coat Scissoring', hours: 50, description: 'Lamb cuts, kennel trims, topknots, clean face and feet, and pompon styling.' },
          { code: 'IPDG-302', title: 'Doodles, Mixed Breeds & Modern Pet Trims', hours: 30, description: 'Teddy bear heads, donut muzzles, column legs, and textured blends.' },
          { code: 'IPDG-303', title: 'Double Coats, Nordic Breeds & Carding', hours: 30, description: 'Preserving insulating layers, carding undercoat, silhouette tidy-ups, and heat risks.' },
          { code: 'IPDG-304', title: 'Hand Stripping Wire Breeds & Rolling Coats', hours: 30, description: 'Stripping knives, chalking, finger pulling, maintaining wiry texture, and humane schedules.' },
        ],
      },
      {
        termNumber: 4,
        name: 'Senior Care, Speed Hands-On Practice & Salon Capstone',
        modulesCount: 40,
        durationWeeks: '≈ 11 Weeks',
        clockHours: 368,
        description: 'Complete high-speed commercial salon hands-on practice, senior dog accommodations, creative styling, and defend the salon business capstone.',
        image: '/images/job_resume_desk.jpg',
        modulesSummary: {
          technicalModules: ['IPDG-401', 'IPDG-402', 'IPDG-403'],
          businessModulesCount: 36,
          businessCodeRange: 'LSH 401–405, PER 401–405, BUS 401–406, MKT 401–405, TEC 401–405, FIN 401–405, LEG 401–405',
          appliedModules: ['IPDG-BIZ'],
          technicalHours: 140,
          businessHours: 216,
          appliedHours: 12,
        },
        topics: [
          'Senior, disabled & reactive dog accommodations',
          'Supervised salon hands-on practice & speed benchmarking',
          'Creative grooming, Asian fusion & finish work',
          'Salon business capstone defense (IPDG-BIZ)',
        ],
        courseHighlights: [
          { code: 'IPDG-401', title: 'Senior, Disabled & Reactive Dog Accommodations', hours: 50, description: 'Low-stress table work, timed pauses, orthopedic support, and compassionate senior handling.' },
          { code: 'IPDG-402', title: 'Supervised Live-Client Salon Hands-On Practice & Speed Benchmarking', hours: 50, description: 'Full commercial salon floor experience, time management, quality checks, and client handoffs.' },
          { code: 'IPDG-403', title: 'Creative Grooming, Asian Fusion & Breed Standard Finishing', hours: 40, description: 'Asian fusion expressions, flared legs, creative styling, and competition-level scissor finish.' },
          { code: 'IPDG-BIZ', title: 'Professional Dog Grooming Salon Business Capstone', hours: 12, description: 'Salon buildout budget, equipment selection, hourly pricing formula, intake waivers, and 90-day launch plan.' },
        ],
      },
    ],
    totalsRow: {
      technicalHours: 452,
      businessHours: 864,
      appliedHours: 12,
      totalHours: 1328,
    },
    manuals: [
      { id: 'MAN-IPDG', title: 'Professional Dog Groomer Core Manual', type: 'Core Manual' },
      { id: 'REF-GRM-01', title: 'Dog Grooming for Beginners by Jorge Bendersky', type: 'Reference Text' },
      { id: 'REF-GRM-04', title: 'The Stone Guide to Dog Grooming for All Breeds', type: 'Reference Text' },
      { id: 'MAN-BUS', title: 'Business & Leadership: Ownership, Operations & Expansion', type: 'Core Manual' },
      { id: 'MAN-FIN', title: 'Financial Mastery, Bookkeeping & Tax Strategy', type: 'Core Manual' },
      { id: 'MAN-LEG', title: 'Legal, Risk, Compliance & Ethical Governance', type: 'Core Manual' },
    ],
  },

  // 6. Professional Dog Trainer (PDT)
  {
    id: 'pdt',
    code: 'PDT',
    slug: 'professional-dog-trainer',
    title: 'Professional Dog Trainer',
    fullTitle: 'Professional Dog Trainer Diploma (PDT)',
    subtitle: 'Identify dog stages and life, recognize breeds, identify workplace safety, provide handling and pet care, understand sanitation, teach basic and advanced obedience, conduct behavior assessments, plan and deliver training sessions, coach dog owners, and run a professional training practice.',
    tagline: 'Better Trainers. Happier Dogs. Stronger Communities.',
    heroQuote: '“Great dog trainers don’t just teach dogs — they teach people how to understand them.”',
    heroQuoteAttribution: 'LEASHED',
    bannerCtaText: 'Enroll Now',
    badge: 'ACADEMY',
    credential: 'Professional Dog Trainer Diploma (Diploma)',
    totalWeeks: 39,
    totalWeeksFormatted: '39 Weeks Full-Time',
    partTimeWeeksFormatted: '≈ 75 Weeks (Part-Time)',
    totalModules: 155,
    totalClockHours: 1112,
    termsCount: 4,
    heroImage: '/images/hero_trainer.jpg',
    trainerImage: '/images/trainer_shepherd.jpg',
    scheduleWeekly: '30 Hours / Week · Mon – Fri | 08:00 – 15:30 (FT) · 15 Hr/Wk (PT)',
    stats: {
      weeks: '39 Weeks FT (75 Wk PT)',
      modules: '155 Modules',
      hours: '1,112 Hours',
      credential: '1 Professional Diploma',
    },
    overviewParagraphs: [
      'The Professional Dog Trainer (PDT) diploma prepares students to become confident, evidence-based canine behavior specialists and independent training business owners. Across 39 intensive weeks, students gain deep mastery of learning theory, behavioral modification, aggression protocols, and owner coaching.',
      'The program features 236 technical hours across 10 specialized training modules, the full 864-hour (144-module) business and personal development spine, and a 12-hour applied training business capstone (PDT-BIZ).',
    ],
    coreCompetencies: [
      { icon: 'GraduationCap', label: 'Canine Learning Theory & Mechanics' },
      { icon: 'Compass', label: 'Behavior Modification & Reactivity' },
      { icon: 'Users', label: 'Client Coaching & Instruction' },
      { icon: 'Shield', label: 'Aggression & Key Skills Checks' },
      { icon: 'Briefcase', label: 'Training Packages & Business' },
    ],
    donutData: {
      technical: 236,
      businessPersonal: 864,
      applied: 12,
    },
    breakdown: [
      { type: 'Technical Hours', percent: '21%', hours: 236, description: '10 Professional Dog Training Technical Modules' },
      { type: 'Business & Personal Hours', percent: '78%', hours: 864, description: '144 Business & Personal Mastery Modules' },
      { type: 'Applied Capstone Hours', percent: '1%', hours: 12, description: 'PDT-BIZ Applied Training Business Capstone' },
    ],
    deliveryAndAccess: [
      { icon: 'Calendar', title: 'Daily Practical Handling', description: 'Real-world application on indoor/outdoor training fields' },
      { icon: 'Laptop', title: 'Online Learning Platform', description: 'Ethology lectures, case study videos, and study guides' },
      { icon: 'Users', title: 'Supervised Client Practicals', description: 'Teaching real dog owners in 1-on-1 private lesson settings' },
      { icon: 'CheckCircle2', title: 'Progress Assessments', description: 'PDT-201 key skills check approval & skills reviews' },
    ],
    completionRequirements: [
      'PDT-201 signed off before live-animal work',
      'CPR / First Aid verified before hands-on practice',
      'Complete all 155 modules with verified attendance records',
      '1,112 hours documented in LMS attendance ledger',
      'Your skills checklist must be Competent across all training mechanics and client coaching rows',
      'Pass PDT-BIZ capstone defense and private lesson curriculum portfolio',
    ],
    terms: [
      {
        termNumber: 1,
        name: 'Ethology, Learning Theory & Leash Mechanics',
        modulesCount: 39,
        durationWeeks: '≈ 9 Weeks',
        clockHours: 248,
        description: 'Build foundational knowledge of canine development, classical and operant conditioning, and safe leash handling.',
        image: '/images/golden_portrait.jpg',
        modulesSummary: {
          technicalModules: ['PDT-101', 'PDT-102', 'PDT-103'],
          businessModulesCount: 36,
          businessCodeRange: 'LSH 101–105, PER 101–105, BUS 101–106, MKT 101–105, TEC 101–105, FIN 101–105, LEG 101–105',
          technicalHours: 32,
          businessHours: 216,
          appliedHours: 0,
        },
        topics: [
          'Canine ethology, body language & stress signals',
          'Learning theory: classical & operant conditioning',
          'Equipment mechanics: flat collars, martingales, slip leads',
          'Business structure, licensing & bookkeeping basics',
        ],
        courseHighlights: [
          { code: 'PDT-101', title: 'Canine Ethology, Body Language & Stress Signals', hours: 10, description: 'Evolutionary history, developmental stages, subtle calming signals, and stress escalation ladder.' },
          { code: 'PDT-102', title: 'Learning Theory: Operant & Classical Conditioning', hours: 12, description: 'Four quadrants, marker training (clickers/verbal), reinforcement schedules, and extinction bursts.' },
          { code: 'PDT-103', title: 'Equipment Mechanics, Leash Handling & Safety', hours: 10, description: 'Proper collar and harness fitting, leash grip techniques, slip lead safety, and spatial awareness.' },
        ],
      },
      {
        termNumber: 2,
        name: 'Basic Obedience, Luring & Handling Key Skills Check',
        modulesCount: 39,
        durationWeeks: '≈ 10 Weeks',
        clockHours: 296,
        description: 'Master luring, shaping, foundational cues, impulse control, and pass the mandatory handling key skills check.',
        image: '/images/aussie_shepherd.jpg',
        modulesSummary: {
          technicalModules: ['PDT-201', 'PDT-202', 'PDT-203'],
          businessModulesCount: 36,
          businessCodeRange: 'LSH 201–205, PER 201–205, BUS 201–206, MKT 201–205, TEC 201–205, FIN 201–205, LEG 201–205',
          technicalHours: 80,
          businessHours: 216,
          appliedHours: 0,
        },
        topics: [
          'Basic obedience: luring, shaping & cue capture [Key Skills Check]',
          'Loose-leash walking & proofing recalls',
          'Impulse control, stay mechanics & threshold manners',
          'Marketing, client retention & service software',
        ],
        courseHighlights: [
          { code: 'PDT-201', title: 'Basic Obedience: Luring, Shaping & Cue Capture [Key Skills Check]', hours: 30, description: 'MANDATORY KEY SKILLS CHECK: Sit, down, stand, eye contact, hand targets, and fade food lures safely before live client coaching.' },
          { code: 'PDT-202', title: 'Loose-Leash Walking & Recall Fundamentals', hours: 20, description: 'Directional changes, handler focus, long-line recalls, and managing environmental distractions.' },
          { code: 'PDT-203', title: 'Impulse Control, Place Cue & Threshold Manners', hours: 30, description: 'Boundary training, crate manners, door thresholds, and duration stays.' },
        ],
      },
      {
        termNumber: 3,
        name: 'Behavior Modification, Reactivity & Proofing',
        modulesCount: 38,
        durationWeeks: '≈ 10 Weeks',
        clockHours: 276,
        description: 'Address leash reactivity, resource guarding, fear behaviors, and advanced distance cues in public settings.',
        image: '/images/trainer_shepherd.jpg',
        modulesSummary: {
          technicalModules: ['PDT-301', 'PDT-302'],
          businessModulesCount: 36,
          businessCodeRange: 'LSH 301–305, PER 301–305, BUS 301–306, MKT 301–305, TEC 301–305, FIN 301–305, LEG 301–305',
          technicalHours: 60,
          businessHours: 216,
          appliedHours: 0,
        },
        topics: [
          'Behavior modification: desensitization & counter-conditioning',
          'Advanced obedience, proofing & off-leash control',
          'Distance commands, whistle signals & emergency stops',
          'Legal contracts, incident reports & liability insurance',
        ],
        courseHighlights: [
          { code: 'PDT-301', title: 'Behavior Modification: Desensitization & Reactivity', hours: 30, description: 'Threshold management, counter-conditioning, resource guarding remediation, and trigger stacking.' },
          { code: 'PDT-302', title: 'Advanced Obedience, Proofing & Distraction Training', hours: 30, description: 'Distance commands, out-of-sight stays, emergency drop, and public access manners.' },
        ],
      },
      {
        termNumber: 4,
        name: 'Aggression Assessment, Client Coaching & Capstone',
        modulesCount: 39,
        durationWeeks: '≈ 10 Weeks',
        clockHours: 292,
        description: 'Conduct aggression assessments, lead private coaching sessions with real dog owners, and defend the training business capstone.',
        image: '/images/hero_trainer.jpg',
        modulesSummary: {
          technicalModules: ['PDT-401', 'PDT-402'],
          businessModulesCount: 36,
          businessCodeRange: 'LSH 401–405, PER 401–405, BUS 401–406, MKT 401–405, TEC 401–405, FIN 401–405, LEG 401–405',
          appliedModules: ['PDT-BIZ'],
          technicalHours: 64,
          businessHours: 216,
          appliedHours: 12,
        },
        topics: [
          'Aggression assessment, safety protocols & bite prevention',
          'Client coaching, private lesson instruction & group classes',
          'Puppy preschool curriculum & adult dog training series',
          'PDT-BIZ Applied training business capstone defense',
        ],
        courseHighlights: [
          { code: 'PDT-401', title: 'Aggression Assessment, Bite Prevention & Safety Protocols', hours: 34, description: 'Evaluating bite histories, Dunbar bite scale, muzzling protocols, and defensive handling.' },
          { code: 'PDT-402', title: 'Client Coaching, Private Lesson Delivery & Group Classes', hours: 30, description: 'Supervised 1-on-1 private lesson instruction with real owners, adult learning principles, and group class mechanics.' },
          { code: 'PDT-BIZ', title: 'Professional Dog Training Business Capstone', hours: 12, description: 'Complete training service menu, package pricing, client contract packet, and 90-day marketing launch plan.' },
        ],
      },
    ],
    totalsRow: {
      technicalHours: 236,
      businessHours: 864,
      appliedHours: 12,
      totalHours: 1112,
    },
    manuals: [
      { id: 'MAN-PDT', title: 'Professional Dog Trainer Program Manual', type: 'Core Manual' },
      { id: 'REF-BEH-01', title: 'Handbook of Applied Dog Behavior and Training by Steven R. Lindsay', type: 'Reference Text' },
      { id: 'REF-TRN-01', title: "Nate Schoemer's Dog Training Manual", type: 'Reference Text' },
      { id: 'MAN-BUS', title: 'Business & Leadership: Ownership, Operations & Expansion', type: 'Core Manual' },
      { id: 'MAN-FIN', title: 'Financial Mastery, Bookkeeping & Tax Strategy', type: 'Core Manual' },
      { id: 'MAN-LEG', title: 'Legal, Risk, Compliance & Ethical Governance', type: 'Core Manual' },
    ],
  },
];

export function getProgramBySlug(slug: string): ProgramDetails | undefined {
  return COURSES_PROGRAMS.find((p) => p.slug === slug);
}

export function getProgramByCode(code: string): ProgramDetails | undefined {
  return COURSES_PROGRAMS.find((p) => p.code.toLowerCase() === code.toLowerCase());
}
