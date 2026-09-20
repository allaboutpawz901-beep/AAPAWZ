'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  BookOpen,
  Award,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  Check,
  ChevronDown,
  Shield,
  AlertTriangle,
  GraduationCap,
  Users,
  Building,
  Layers,
  Sparkles,
  FileText,
  DollarSign,
  HelpCircle,
  Briefcase,
  SlidersHorizontal,
} from 'lucide-react';
import { Navbar } from '@/components/lms-design-system/Navbar';
import { Footer } from '@/components/lms-design-system/Footer';
import { EnrollmentModal } from '@/components/lms-design-system/EnrollmentModal';
import { DynamicIcon } from '@/components/DynamicIcon';
import { ProgramDetails } from '@/lib/courses-data';
import { ALL_PROGRAM_SYLLABI, ProgramInstitutionalData } from '@/lib/syllabi-data';
import { ALL_CATALOG_MODULES, CatalogModule } from '@/lib/catalog-modules';

interface ProgramDetailViewProps {
  program: ProgramDetails;
}

export function ProgramDetailView({ program }: ProgramDetailViewProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'outcomes' | 'requirements' | 'faq'>('overview');
  const [curriculumViewMode, setCurriculumViewMode] = useState<'terms' | 'weekly' | 'catalog'>('terms');
  const [openTermIndex, setOpenTermIndex] = useState<number | null>(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);

  // Retrieve matching institutional syllabus
  const syllabus: ProgramInstitutionalData | undefined =
    ALL_PROGRAM_SYLLABI[program.code.toUpperCase()] || ALL_PROGRAM_SYLLABI[program.id.toLowerCase()];

  // Retrieve track-specific catalog modules
  const programCatalogModules = React.useMemo(() => {
    return ALL_CATALOG_MODULES.filter((m) => {
      if (program.code.toUpperCase() === 'IPDG') return m.trackCode === 'IPDG';
      if (program.code.toUpperCase() === 'PDT') return m.trackCode === 'PDT';
      if (program.code.toUpperCase() === 'ACA') return m.trackCode === 'ACA';
      if (program.code.toUpperCase() === 'PPS') return m.trackCode === 'PPS' || m.code.startsWith('PPS');
      if (program.code.toUpperCase() === 'CAT') return m.trackCode === 'CAT' || m.code.startsWith('CAT');
      if (program.code.toUpperCase() === 'PPC') return true; // PPC contains all modules
      return m.trackCode === program.code.toUpperCase();
    });
  }, [program.code]);

  // SVG Donut Calculations
  const donutTotal = program.donutData.technical + program.donutData.businessPersonal + program.donutData.applied;
  const techRatio = program.donutData.technical / (donutTotal || 1);
  const bizRatio = program.donutData.businessPersonal / (donutTotal || 1);
  const appRatio = program.donutData.applied / (donutTotal || 1);

  const circ = 238.76;
  const strokeTech = techRatio * circ;
  const strokeBiz = bizRatio * circ;
  const strokeApp = appRatio * circ;

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf9f5] font-sans text-[#141b16]">
      <Navbar activeNav="Academy" />

      {/* Hero Header Banner */}
      <section className="relative w-full bg-[#16221a] text-white overflow-hidden">
        <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold uppercase tracking-wider text-[#eed8b8] backdrop-blur-md">
                  {program.badge} · CODE: {program.code}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono font-medium">
                  Accredited Delivery Guide v1.0
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.12]">
                {program.fullTitle}
              </h1>

              <p className="text-[#d8e5dc] text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
                {program.subtitle}
              </p>

              {/* 4 Hero Key Metrics Chips */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/15">
                <div className="p-3 rounded-xl bg-white/[0.07] border border-white/15 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-[#ecd2af] mb-1">
                    <Calendar className="w-4 h-4" />
                    <span className="text-[0.7rem] uppercase tracking-wider font-semibold text-[#a8bba9]">Duration</span>
                  </div>
                  <div className="text-sm font-bold text-white">{program.stats.weeks}</div>
                  <div className="text-[0.7rem] text-[#9eb1a1] mt-0.5">{program.partTimeWeeksFormatted}</div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.07] border border-white/15 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-[#ecd2af] mb-1">
                    <BookOpen className="w-4 h-4" />
                    <span className="text-[0.7rem] uppercase tracking-wider font-semibold text-[#a8bba9]">Modules</span>
                  </div>
                  <div className="text-sm font-bold text-white">{program.stats.modules}</div>
                  <div className="text-[0.7rem] text-[#9eb1a1] mt-0.5">Accredited Units</div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.07] border border-white/15 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-[#ecd2af] mb-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-[0.7rem] uppercase tracking-wider font-semibold text-[#a8bba9]">Hours</span>
                  </div>
                  <div className="text-sm font-bold text-white">{program.stats.hours}</div>
                  <div className="text-[0.7rem] text-[#9eb1a1] mt-0.5">Audited Clock Hrs</div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.07] border border-white/15 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-[#ecd2af] mb-1">
                    <Award className="w-4 h-4" />
                    <span className="text-[0.7rem] uppercase tracking-wider font-semibold text-[#a8bba9]">Award</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">{program.credential}</div>
                  <div className="text-[0.7rem] text-[#9eb1a1] mt-0.5">State Approved</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setEnrollModalOpen(true)}
                  className="px-6 py-3 rounded-full bg-[#ecd2af] hover:bg-[#f3dfc3] text-[#141b16] font-bold text-xs tracking-wide transition-all shadow-md flex items-center gap-2"
                >
                  <span>Enroll in this Pathway</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <Link
                  href="/learn/classroom"
                  className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs tracking-wide transition-all border border-white/20 flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#ecd2af]" />
                  <span>Launch AI Classroom</span>
                </Link>
              </div>
            </div>

            {/* Right Photo Column - Bright, Crisp, Un-darkened */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-white/15">
                <Image
                  src={program.heroImage}
                  alt={program.title}
                  fill
                  priority
                  className="object-cover object-center brightness-100 contrast-[1.02]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-mono text-[0.7rem] font-bold border border-white/20">
                  {program.code} Practicum Track
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          
          {/* Main Left Content Area */}
          <main className="w-full lg:flex-1 min-w-0">
            {/* Top Navigation Tabs */}
            <div className="border-b border-[#e2ddd4] mb-8 overflow-x-auto scrollbar-none">
              <nav className="flex space-x-8 min-w-max" aria-label="Program sections">
                {[
                  { id: 'overview', label: 'Program Overview' },
                  { id: 'curriculum', label: 'Curriculum & Schedule' },
                  { id: 'outcomes', label: 'Career Outcomes & Rubrics' },
                  { id: 'requirements', label: 'Admissions & Safety Gates' },
                  { id: 'faq', label: 'Accreditation FAQ' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`py-4 px-1 text-sm font-semibold border-b-2 transition-colors duration-150 flex items-center gap-2 ${
                      activeTab === tab.id
                        ? 'border-[#1b3d2b] text-[#1b3d2b]'
                        : 'border-transparent text-[#617466] hover:text-[#141b16] hover:border-[#cbd5e1]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-10">
                {/* Program Description & Core Competencies */}
                <section className="bg-white p-6 sm:p-8 rounded-xl border border-[#e2ddd4] shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1b3d2b] mb-3">
                    <GraduationCap className="w-4 h-4 text-[#d9b589]" /> Institutional Objectives & Scope
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-[#141b16] mb-4">
                    About the {program.title}
                  </h2>
                  <div className="text-[#3c4a3e] leading-relaxed space-y-4 text-sm sm:text-base mb-6">
                    {program.overviewParagraphs.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                    {syllabus && (
                      <div className="p-4 rounded-lg bg-[#f4f1eb] border border-[#e2ddd4] text-xs sm:text-sm text-[#243328] font-mono leading-relaxed">
                        <strong className="font-sans font-bold text-[#1b3d2b] block mb-1 uppercase tracking-wide">Accredited Program Objectives:</strong>
                        {syllabus.programObjective}
                      </div>
                    )}
                  </div>

                  {/* Core Competencies Badges */}
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#617466] mb-4">
                    Primary Competency Domains
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {program.coreCompetencies.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-3.5 rounded-lg bg-[#fbf9f5] border border-[#e2ddd4] text-[#141b16] text-xs sm:text-sm font-medium"
                      >
                        <DynamicIcon name={item.icon} className="w-4 h-4 text-[#1b3d2b] shrink-0" />
                        <span>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Clock-Hour Distribution & Donut Breakdown */}
                <section className="bg-white p-6 sm:p-8 rounded-xl border border-[#e2ddd4] shadow-sm">
                  <h2 className="font-serif text-2xl font-bold text-[#141b16] mb-2">
                    Clock-Hour Distribution & Curriculum Architecture
                  </h2>
                  <p className="text-xs sm:text-sm text-[#617466] mb-6">
                    All hours represent audited clock hours under vocational training standards. 1 clock hour = 50–60 minutes of supervised technical laboratory, business workshop, or practicum.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                    {/* SVG Donut Chart */}
                    <div className="md:col-span-4 flex flex-col items-center justify-center p-4 bg-[#fbf9f5] rounded-xl border border-[#e2ddd4]">
                      <div className="relative w-44 h-44">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                          {/* Background Circle */}
                          <circle cx="50" cy="50" r="38" fill="none" stroke="#e2ddd4" strokeWidth="12" />
                          {/* Technical Segment */}
                          <circle
                            cx="50"
                            cy="50"
                            r="38"
                            fill="none"
                            stroke="#1b3d2b"
                            strokeWidth="12"
                            strokeDasharray={`${strokeTech} ${circ}`}
                            strokeDashoffset={0}
                          />
                          {/* Business & Personal Segment */}
                          <circle
                            cx="50"
                            cy="50"
                            r="38"
                            fill="none"
                            stroke="#d9b589"
                            strokeWidth="12"
                            strokeDasharray={`${strokeBiz} ${circ}`}
                            strokeDashoffset={-strokeTech}
                          />
                          {/* Applied Segment */}
                          {program.donutData.applied > 0 && (
                            <circle
                              cx="50"
                              cy="50"
                              r="38"
                              fill="none"
                              stroke="#0d9488"
                              strokeWidth="12"
                              strokeDasharray={`${strokeApp} ${circ}`}
                              strokeDashoffset={-(strokeTech + strokeBiz)}
                            />
                          )}
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                          <span className="text-xl font-bold font-serif text-[#141b16]">
                            {program.totalClockHours}
                          </span>
                          <span className="text-[10px] font-semibold text-[#617466] uppercase tracking-wider">
                            Total Hours
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Breakdown items */}
                    <div className="md:col-span-8 space-y-4">
                      {program.breakdown.map((item, idx) => (
                        <div key={idx} className="p-4 rounded-lg bg-[#fbf9f5] border border-[#e2ddd4]">
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center gap-2">
                              <span
                                className={`w-3 h-3 rounded-full ${
                                  idx === 0 ? 'bg-[#1b3d2b]' : idx === 1 ? 'bg-[#d9b589]' : 'bg-[#0d9488]'
                                }`}
                              />
                              <span className="text-sm font-bold text-[#141b16]">{item.type}</span>
                            </div>
                            <span className="text-xs font-mono font-bold text-[#1b3d2b] bg-white px-2 py-0.5 rounded border border-[#e2ddd4]">
                              {item.hours} Hours ({item.percent})
                            </span>
                          </div>
                          {item.description && (
                            <p className="text-xs text-[#617466] leading-relaxed pl-5">
                              {item.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Table A4: Weekly Schedule Template */}
                <section className="bg-white p-6 sm:p-8 rounded-xl border border-[#e2ddd4] shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#141b16]">
                        Standard Daily & Weekly Schedule (Template A4)
                      </h2>
                      <p className="text-xs sm:text-sm text-[#617466]">
                        30 Hours per week · Monday through Friday structured delivery
                      </p>
                    </div>
                    <span className="text-xs font-mono px-3 py-1 bg-[#1b3d2b]/10 text-[#1b3d2b] rounded-full font-semibold">
                      Mon – Fri | 08:00 – 15:30
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="p-4 rounded-lg bg-[#1b3d2b]/5 border border-[#1b3d2b]/20">
                      <div className="text-xs font-mono font-bold text-[#1b3d2b] uppercase mb-1">
                        Block 1 · 08:00 – 12:00 (4.0 hrs)
                      </div>
                      <div className="text-sm font-bold text-[#141b16] mb-1">Technical Skills Laboratory</div>
                      <p className="text-xs text-[#617466]">
                        Live salon floor, wet prep tubs, obedience rings, handling mechanics, and supervised safety drills.
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-[#d9b589]/10 border border-[#d9b589]/30">
                      <div className="text-xs font-mono font-bold text-[#8c6527] uppercase mb-1">
                        Block 2 · 12:30 – 14:30 (2.0 hrs)
                      </div>
                      <div className="text-sm font-bold text-[#141b16] mb-1">Business & Personal Mastery Spine</div>
                      <p className="text-xs text-[#617466]">
                        LSH, PER, BUS, MKT, TEC, FIN, and LEG daily interactive business and self-governance workshops.
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-[#0d9488]/5 border border-[#0d9488]/20">
                      <div className="text-xs font-mono font-bold text-[#0d9488] uppercase mb-1">
                        Block 3 · 14:30 – 15:30 (1.0 hr)
                      </div>
                      <div className="text-sm font-bold text-[#141b16] mb-1">Micro-checks & AI/RAG Synthesis</div>
                      <p className="text-xs text-[#617466]">
                        10 Micro-checks, portfolio evidence uploads, RAG retrieval verification, and daily attendance logging.
                      </p>
                    </div>
                  </div>

                  {/* Staffing & Facilities Specs (Table A5 & A6) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#e2ddd4] text-xs text-[#3c4a3e]">
                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-[#1b3d2b] shrink-0" />
                      <div>
                        <strong className="text-[#141b16] block font-semibold">Staffing Ratios (Table A5):</strong>
                        1:8 instructor-to-student ratio during live animal labs; 1:16 during business lectures. Lead instructor maintains Master credential.
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Building className="w-5 h-5 text-[#1b3d2b] shrink-0" />
                      <div>
                        <strong className="text-[#141b16] block font-semibold">Facility Standards (Table A6):</strong>
                        Commercial-grade hydraulic grooming tables, non-slip electric tubs, dedicated ventilation, isolation kennel, and secure outdoor training yards.
                      </div>
                    </div>
                  </div>
                </section>

                {/* Textbooks & Reference Bibliography (Part B & C) */}
                <section className="bg-white p-6 sm:p-8 rounded-xl border border-[#e2ddd4] shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#141b16]">
                      Required Textbooks & Official Syllabi Manuals
                    </h2>
                    <span className="text-xs text-[#617466]">Part B & C Bibliography</span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border border-[#e2ddd4]">
                      <thead className="bg-[#f4f1eb] text-[#141b16] font-bold border-b border-[#e2ddd4]">
                        <tr>
                          <th className="p-3">Reference Code</th>
                          <th className="p-3">Title & Publication Standard</th>
                          <th className="p-3">Category</th>
                          <th className="p-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#e2ddd4] text-[#3c4a3e]">
                        {program.manuals.map((man, idx) => (
                          <tr key={idx} className="hover:bg-[#fbf9f5]">
                            <td className="p-3 font-mono font-bold text-[#1b3d2b]">{man.id}</td>
                            <td className="p-3 font-medium text-[#141b16]">{man.title}</td>
                            <td className="p-3">
                              <span
                                className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                                  man.type === 'Core Manual'
                                    ? 'bg-[#1b3d2b]/10 text-[#1b3d2b]'
                                    : 'bg-[#d9b589]/20 text-[#8c6527]'
                                }`}
                              >
                                {man.type}
                              </span>
                            </td>
                            <td className="p-3 text-[#16a34a] font-semibold flex items-center gap-1">
                              <Check className="w-3.5 h-3.5" /> Required in LMS
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              </div>
            )}

            {/* TAB 2: CURRICULUM & SCHEDULE */}
            {activeTab === 'curriculum' && (
              <div className="space-y-8">
                {/* View Mode Switcher */}
                <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white rounded-xl border border-[#e2ddd4]">
                  <div>
                    <h2 className="font-serif text-xl font-bold text-[#141b16]">Curriculum Delivery & Master Schedule</h2>
                    <p className="text-xs text-[#617466]">Select a view mode to inspect terms, the week-by-week master schedule, or granular course modules.</p>
                  </div>

                  <div className="inline-flex rounded-lg bg-[#f4f1eb] p-1 border border-[#e2ddd4]">
                    <button
                      onClick={() => setCurriculumViewMode('terms')}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                        curriculumViewMode === 'terms'
                          ? 'bg-[#1b3d2b] text-white shadow-sm'
                          : 'text-[#617466] hover:text-[#141b16]'
                      }`}
                    >
                      Term Overview
                    </button>
                    <button
                      onClick={() => setCurriculumViewMode('weekly')}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                        curriculumViewMode === 'weekly'
                          ? 'bg-[#1b3d2b] text-white shadow-sm'
                          : 'text-[#617466] hover:text-[#141b16]'
                      }`}
                    >
                      Week-by-Week Master Schedule ({program.totalWeeks} Wks)
                    </button>
                    <button
                      onClick={() => setCurriculumViewMode('catalog')}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                        curriculumViewMode === 'catalog'
                          ? 'bg-[#1b3d2b] text-white shadow-sm'
                          : 'text-[#617466] hover:text-[#141b16]'
                      }`}
                    >
                      Full Course Catalog ({programCatalogModules.length} Modules)
                    </button>
                  </div>
                </div>

                {/* VIEW 1: TERM OVERVIEW */}
                {curriculumViewMode === 'terms' && (
                  <div className="space-y-6">
                    {program.terms.map((term, index) => {
                      const isOpen = openTermIndex === index;
                      return (
                        <div
                          key={term.termNumber}
                          className="bg-white rounded-xl border border-[#e2ddd4] overflow-hidden shadow-sm transition-all"
                        >
                          <button
                            onClick={() => setOpenTermIndex(isOpen ? null : index)}
                            className="w-full text-left p-6 flex items-start sm:items-center justify-between gap-4 hover:bg-[#fbf9f5] transition-colors"
                          >
                            <div className="flex items-start sm:items-center gap-4">
                              <div className="w-12 h-12 rounded-xl bg-[#1b3d2b]/10 border border-[#1b3d2b]/20 flex flex-col items-center justify-center shrink-0">
                                <span className="text-[10px] font-bold text-[#1b3d2b] uppercase">TERM</span>
                                <span className="text-base font-bold font-serif text-[#1b3d2b]">{term.termNumber}</span>
                              </div>
                              <div>
                                <h3 className="font-serif text-lg font-bold text-[#141b16]">{term.name}</h3>
                                <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-[#617466]">
                                  <span>{term.durationWeeks}</span>
                                  <span>•</span>
                                  <span>{term.clockHours} Clock Hours</span>
                                  <span>•</span>
                                  <span>{term.modulesCount} Modules</span>
                                </div>
                              </div>
                            </div>

                            <ChevronDown
                              className={`w-5 h-5 text-[#617466] transition-transform duration-200 shrink-0 ${
                                isOpen ? 'rotate-180' : ''
                              }`}
                            />
                          </button>

                          {isOpen && (
                            <div className="p-6 pt-0 border-t border-[#e2ddd4]/70 bg-[#fbf9f5]/50 space-y-6">
                              <p className="text-sm text-[#3c4a3e] leading-relaxed pt-4">{term.description}</p>

                              {/* Clock Hour Allocation Bar */}
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-lg bg-white border border-[#e2ddd4]">
                                <div>
                                  <div className="text-xs text-[#617466]">Technical Lab Hours</div>
                                  <div className="text-base font-bold text-[#1b3d2b]">
                                    {term.modulesSummary.technicalHours || 0} hrs
                                  </div>
                                </div>
                                <div>
                                  <div className="text-xs text-[#617466]">Business Spine Hours</div>
                                  <div className="text-base font-bold text-[#8c6527]">
                                    {term.modulesSummary.businessHours || 0} hrs
                                  </div>
                                </div>
                                <div>
                                  <div className="text-xs text-[#617466]">Applied / Capstone</div>
                                  <div className="text-base font-bold text-[#0d9488]">
                                    {term.modulesSummary.appliedHours || 0} hrs
                                  </div>
                                </div>
                              </div>

                              {/* Detailed Course Highlight Cards */}
                              <div>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-[#617466] mb-3">
                                  Term {term.termNumber} Modules & Practical Syllabi
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  {term.courseHighlights.map((mod) => (
                                    <div
                                      key={mod.code}
                                      className="p-4 rounded-lg bg-white border border-[#e2ddd4] hover:border-[#1b3d2b]/40 transition-colors"
                                    >
                                      <div className="flex items-center justify-between mb-1.5">
                                        <span className="font-mono text-xs font-bold text-[#1b3d2b] px-2 py-0.5 rounded bg-[#1b3d2b]/10">
                                          {mod.code}
                                        </span>
                                        <span className="text-xs font-medium text-[#617466]">{mod.hours} Clock Hrs</span>
                                      </div>
                                      <h5 className="font-semibold text-sm text-[#141b16] mb-1">{mod.title}</h5>
                                      <p className="text-xs text-[#617466] leading-relaxed">{mod.description}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* VIEW 2: WEEK-BY-WEEK MASTER DELIVERY SCHEDULE */}
                {curriculumViewMode === 'weekly' && (
                  <div className="bg-white rounded-xl border border-[#e2ddd4] p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-serif text-xl font-bold text-[#141b16]">
                          Week-by-Week Delivery Schedule (Part B Syllabi)
                        </h3>
                        <p className="text-xs text-[#617466]">
                          Exact pacing of technical modules, business/personal spine modules, clock hours, and weekly assessments.
                        </p>
                      </div>
                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#1b3d2b]/10 text-[#1b3d2b]">
                        Total {syllabus?.weeklySchedule.length || program.totalWeeks} Weeks Scheduled
                      </span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border border-[#e2ddd4]">
                        <thead className="bg-[#f4f1eb] text-[#141b16] font-bold border-b border-[#e2ddd4]">
                          <tr>
                            <th className="p-3 w-16">Week</th>
                            <th className="p-3 w-28">Term</th>
                            <th className="p-3">Technical Track Modules (08:00–12:00)</th>
                            <th className="p-3">Business / Personal Spine (12:30–14:30)</th>
                            <th className="p-3 w-24">Hrs (Tech / Biz)</th>
                            <th className="p-3">Assessments, Quizzes & Gates</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#e2ddd4] text-[#3c4a3e]">
                          {syllabus?.weeklySchedule.map((entry) => (
                            <tr key={entry.week} className="hover:bg-[#fbf9f5]">
                              <td className="p-3 font-mono font-bold text-[#1b3d2b]">Wk {entry.week}</td>
                              <td className="p-3 font-medium text-[#141b16]">{entry.term}</td>
                              <td className="p-3 font-mono text-[#1b3d2b] font-semibold">{entry.technicalModules}</td>
                              <td className="p-3 font-mono text-[#8c6527]">{entry.businessModules}</td>
                              <td className="p-3 font-mono font-bold bg-[#fbf9f5]">{entry.hoursFormatted}</td>
                              <td className="p-3 text-xs">
                                {entry.assessments.includes('Safety Gate') ? (
                                  <span className="text-[#dc2626] font-semibold flex items-center gap-1">
                                    <AlertTriangle className="w-3 h-3 shrink-0" /> {entry.assessments}
                                  </span>
                                ) : entry.assessments.includes('Defense') || entry.assessments.includes('Checkpoint') ? (
                                  <span className="text-[#1b3d2b] font-semibold flex items-center gap-1">
                                    <Award className="w-3 h-3 shrink-0" /> {entry.assessments}
                                  </span>
                                ) : (
                                  <span className="text-[#4b5563]">{entry.assessments}</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* VIEW 3: FULL COURSE MODULE CATALOG */}
                {curriculumViewMode === 'catalog' && (
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-xl border border-[#e2ddd4] flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#141b16]">
                        Displaying {programCatalogModules.length} accredited course descriptions for {program.code}
                      </span>
                      <Link
                        href="/learn/courses"
                        className="text-xs font-bold text-[#1b3d2b] hover:underline flex items-center gap-1"
                      >
                        Open Global Catalog <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {programCatalogModules.map((m) => (
                        <div key={m.code} className="p-5 rounded-xl bg-white border border-[#e2ddd4] shadow-sm flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#1b3d2b]/10 text-[#1b3d2b]">
                                {m.code}
                              </span>
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs font-medium text-[#617466]">{m.hours} Clock Hrs</span>
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#f4f1eb] font-semibold text-[#617466]">
                                  {m.level}
                                </span>
                              </div>
                            </div>
                            <h4 className="font-semibold text-sm text-[#141b16] mb-1.5">{m.title}</h4>
                            <p className="text-xs text-[#617466] leading-relaxed mb-3">{m.description}</p>
                          </div>

                          {m.safetyGate && (
                            <div className="pt-2 border-t border-[#fee2e2] text-[11px] font-semibold text-[#dc2626] flex items-center gap-1.5">
                              <Shield className="w-3.5 h-3.5" /> Mandatory Safety-Critical Gate
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: CAREER OUTCOMES & RUBRICS */}
            {activeTab === 'outcomes' && (
              <div className="space-y-8">
                {/* Career Pathways & Wage Ladder */}
                <section className="bg-white p-6 sm:p-8 rounded-xl border border-[#e2ddd4] shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1b3d2b] mb-2">
                    <Briefcase className="w-4 h-4 text-[#d9b589]" /> Professional Pathways & Economic Mobility
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-[#141b16] mb-2">
                    Career Pathways & Graduate Compensation
                  </h2>
                  <p className="text-xs sm:text-sm text-[#617466] mb-6">
                    Institutional standard: 75%+ verified 6-month placement or business launch rate. Graduates enter both entrepreneurial owner-operator tracks and salaried clinical leadership roles.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {syllabus?.careerOutcomes.map((outcome, idx) => (
                      <div key={idx} className="p-5 rounded-xl bg-[#fbf9f5] border border-[#e2ddd4] flex flex-col justify-between">
                        <div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#1b3d2b]/10 text-[#1b3d2b] uppercase tracking-wider block w-fit mb-2">
                            {outcome.employmentType}
                          </span>
                          <h3 className="font-semibold text-base text-[#141b16] mb-1">{outcome.title}</h3>
                          <p className="text-xs text-[#617466] leading-relaxed mb-4">{outcome.roleDescription}</p>
                        </div>
                        <div className="pt-3 border-t border-[#e2ddd4]">
                          <div className="text-[10px] uppercase font-bold text-[#617466]">Typical Compensation</div>
                          <div className="text-sm font-mono font-bold text-[#1b3d2b]">{outcome.typicalComp}</div>
                          <div className="text-[11px] text-[#16a34a] font-medium mt-0.5">Market Demand: {outcome.marketDemand}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Institutional Competency Rubric */}
                <section className="bg-white p-6 sm:p-8 rounded-xl border border-[#e2ddd4] shadow-sm">
                  <h2 className="font-serif text-2xl font-bold text-[#141b16] mb-2">
                    Official Institutional Competency Rubric
                  </h2>
                  <p className="text-xs sm:text-sm text-[#617466] mb-6">
                    To receive graduation sign-off, every student must demonstrate a minimum rating of "Competent" across all evaluated technical and personal-business domains.
                  </p>

                  <div className="space-y-4">
                    {syllabus?.rubricDomains.map((r, idx) => (
                      <div key={idx} className="p-4 rounded-xl border border-[#e2ddd4] bg-[#fbf9f5]">
                        <div className="font-serif font-bold text-sm text-[#141b16] mb-1">{r.domain}</div>
                        <div className="text-xs text-[#617466] mb-3">
                          <strong className="text-[#141b16]">Core Skills Evaluated:</strong> {r.coreSkills}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div className="p-3 rounded bg-white border border-[#e2ddd4]">
                            <span className="font-bold text-[#1b3d2b] block mb-1">Competent Benchmark (Graduation Standard):</span>
                            <span className="text-[#3c4a3e]">{r.competentBenchmark}</span>
                          </div>
                          <div className="p-3 rounded bg-white border border-[#e2ddd4]">
                            <span className="font-bold text-[#8c6527] block mb-1">Mastery / Honors Benchmark:</span>
                            <span className="text-[#3c4a3e]">{r.masteryThreshold}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {/* TAB 4: ADMISSIONS & SAFETY GATES */}
            {activeTab === 'requirements' && (
              <div className="space-y-8">
                {/* Mandatory Safety Gates */}
                <section className="bg-white p-6 sm:p-8 rounded-xl border border-[#dc2626]/30 shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#dc2626] mb-2">
                    <Shield className="w-4 h-4" /> Safety-Critical Gates & Live-Animal Contact Protocol
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-[#141b16] mb-2">
                    Mandatory Safety Gate Checkpoints
                  </h2>
                  <p className="text-xs sm:text-sm text-[#617466] mb-6">
                    Zero-tolerance animal and human safety threshold. Students cannot advance to live-client animals without 100% binary instructor sign-off on these checkpoints.
                  </p>

                  <div className="space-y-3">
                    {syllabus?.safetyGates.map((gate) => (
                      <div key={gate.code} className="p-4 rounded-lg bg-[#fef2f2] border border-[#fecaca] flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-[#dc2626] shrink-0 mt-0.5" />
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono text-xs font-bold text-[#dc2626]">{gate.code}</span>
                            <span className="font-semibold text-sm text-[#141b16]">{gate.title}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-[#fee2e2] text-[#991b1b] font-bold">
                              {gate.stage}
                            </span>
                          </div>
                          <p className="text-xs text-[#7f1d1d] leading-relaxed">{gate.requirement}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Admission Requirements & Attendance Policy */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <section className="bg-white p-6 rounded-xl border border-[#e2ddd4] shadow-sm">
                    <h3 className="font-serif text-lg font-bold text-[#141b16] mb-3">
                      Admissions Criteria (Institutional Standard)
                    </h3>
                    <ul className="space-y-2.5 text-xs text-[#3c4a3e]">
                      {syllabus?.admissionRequirements.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#1b3d2b] shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section className="bg-white p-6 rounded-xl border border-[#e2ddd4] shadow-sm">
                    <h3 className="font-serif text-lg font-bold text-[#141b16] mb-3">
                      Clock-Hour Attendance & Makeup Policy
                    </h3>
                    <p className="text-xs text-[#3c4a3e] leading-relaxed mb-4">
                      {syllabus?.attendancePolicy}
                    </p>
                    <div className="p-3 rounded-lg bg-[#f4f1eb] text-xs font-mono text-[#1b3d2b] font-semibold">
                      Friday 08:00–12:00: Open Laboratory Makeup Block
                    </div>
                  </section>
                </div>
              </div>
            )}

            {/* TAB 5: ACCREDITATION FAQ */}
            {activeTab === 'faq' && (
              <section className="bg-white p-6 sm:p-8 rounded-xl border border-[#e2ddd4] shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1b3d2b] mb-2">
                  <HelpCircle className="w-4 h-4 text-[#d9b589]" /> Compliance & Operations FAQ
                </div>
                <h2 className="font-serif text-2xl font-bold text-[#141b16] mb-2">
                  Frequently Asked Questions
                </h2>
                <p className="text-xs sm:text-sm text-[#617466] mb-6">
                  Official guidance on clock-hour audit, Louisiana Board of Regents proprietary compliance, live animal safety, and credential stacking.
                </p>

                <div className="space-y-3">
                  {syllabus?.faqs.map((faq, idx) => {
                    const isOpen = openFaqIndex === idx;
                    return (
                      <div key={idx} className="border border-[#e2ddd4] rounded-lg overflow-hidden">
                        <button
                          onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                          className="w-full text-left p-4 bg-[#fbf9f5] flex items-center justify-between gap-4 font-semibold text-sm text-[#141b16] hover:bg-[#f4f1eb] transition-colors"
                        >
                          <span>{faq.question}</span>
                          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isOpen && (
                          <div className="p-4 bg-white text-xs sm:text-sm text-[#3c4a3e] leading-relaxed border-t border-[#e2ddd4]">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}
          </main>

          {/* Right Sidebar: Program Card & Action Pane */}
          <aside className="w-full lg:w-80 shrink-0 space-y-6">
            <div className="bg-white rounded-xl border border-[#e2ddd4] p-6 shadow-sm">
              <span className="text-[10px] font-bold tracking-widest text-[#1b3d2b] uppercase block mb-1">
                Official Credential
              </span>
              <h3 className="font-serif text-lg font-bold text-[#141b16] mb-3">
                {program.credential}
              </h3>
              
              <div className="space-y-3 text-xs text-[#3c4a3e] mb-6 pt-3 border-t border-[#e2ddd4]">
                <div className="flex justify-between">
                  <span className="text-[#617466]">Total Clock Hours:</span>
                  <span className="font-mono font-bold text-[#141b16]">{program.totalClockHours} hrs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#617466]">Full-Time Duration:</span>
                  <span className="font-bold text-[#141b16]">{program.totalWeeks} Weeks</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#617466]">Part-Time Duration:</span>
                  <span className="text-[#141b16]">{program.partTimeWeeksFormatted}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#617466]">Delivery Format:</span>
                  <span className="text-[#141b16]">Hybrid Salon Lab</span>
                </div>
              </div>

              <button
                onClick={() => setEnrollModalOpen(true)}
                className="w-full py-3 px-4 rounded-lg bg-[#1b3d2b] text-white text-sm font-semibold hover:bg-[#2d5a3f] transition-colors shadow-sm flex items-center justify-center gap-2 mb-3"
              >
                Enroll in Program <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                href={`/classroom`}
                className="w-full py-2.5 px-4 rounded-lg bg-[#f4f1eb] text-[#1b3d2b] border border-[#e2ddd4] text-xs font-semibold hover:bg-[#e8e2d8] transition-colors flex items-center justify-center gap-2"
              >
                Open AI Classroom Sandbox
              </Link>
            </div>

            {/* Stacking Ladder Card */}
            {syllabus && (
              <div className="bg-[#1b3d2b] text-white rounded-xl p-6 shadow-sm">
                <span className="text-[10px] font-bold tracking-widest text-[#d9b589] uppercase block mb-1">
                  Stackable Architecture
                </span>
                <h4 className="font-serif text-base font-bold text-white mb-2">Articulation & Stacking</h4>
                <p className="text-xs text-[#d5e0d8] leading-relaxed mb-4">
                  {syllabus.stacksInto}
                </p>
                <div className="text-[11px] text-[#a0b2a6] font-mono">
                  All completed clock hours transfer automatically into higher credential pathways.
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>

      <Footer />

      <EnrollmentModal
        isOpen={enrollModalOpen}
        onClose={() => setEnrollModalOpen(false)}
        initialProgramId={program.id}
      />
    </div>
  );
}
