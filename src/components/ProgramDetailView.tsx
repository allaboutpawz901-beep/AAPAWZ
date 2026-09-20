'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  BookOpen,
  Award,
  ArrowRight,
  CheckCircle2,
  Check,
  ChevronDown,
  Shield,
  AlertTriangle,
  GraduationCap,
  Users,
  Building,
  Sparkles,
  HelpCircle,
  Briefcase,
} from 'lucide-react';
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

  // Retrieve matching program syllabus
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
    <div className="min-h-screen flex flex-col bg-cream text-ink">
      {/* Hero Header Banner — split grid: marble cream left, photo right */}
      <section className="grid grid-cols-1 lg:grid-cols-[1fr_1.25fr]">
        {/* Left Content Column — marble on cream */}
        <div className="marble bg-cream px-6 sm:px-10 lg:px-14 py-10 lg:py-14 flex flex-col justify-center">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-gold-light/20 border border-gold/30 text-xs font-semibold uppercase tracking-wider text-gold-deep">
              PROGRAM: {program.code}
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink leading-[1.12] mt-5">
            {program.fullTitle}
          </h1>

          <p className="text-ink-soft text-sm sm:text-base leading-relaxed max-w-2xl font-normal mt-4">
            {program.subtitle}
          </p>

          {/* 4 Hero Key Metrics Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-gold/25">
            <div className="p-3 rounded-xl bg-cream-deep border border-gold/25">
              <div className="flex items-center gap-2 text-gold mb-1">
                <Calendar className="w-4 h-4" />
                <span className="text-[0.7rem] uppercase tracking-wider font-semibold text-ink-soft">Duration</span>
              </div>
              <div className="text-sm font-bold text-ink">{program.stats.weeks}</div>
              <div className="text-[0.7rem] text-ink-soft mt-0.5">{program.partTimeWeeksFormatted}</div>
            </div>

            <div className="p-3 rounded-xl bg-cream-deep border border-gold/25">
              <div className="flex items-center gap-2 text-gold mb-1">
                <BookOpen className="w-4 h-4" />
                <span className="text-[0.7rem] uppercase tracking-wider font-semibold text-ink-soft">Modules</span>
              </div>
              <div className="text-sm font-bold text-ink">{program.stats.modules}</div>
              <div className="text-[0.7rem] text-ink-soft mt-0.5">Accredited Units</div>
            </div>

            <div className="p-3 rounded-xl bg-cream-deep border border-gold/25">
              <div className="flex items-center gap-2 text-gold mb-1">
                <Clock className="w-4 h-4" />
                <span className="text-[0.7rem] uppercase tracking-wider font-semibold text-ink-soft">Hours</span>
              </div>
              <div className="text-sm font-bold text-ink">{program.stats.hours}</div>
              <div className="text-[0.7rem] text-ink-soft mt-0.5">Hands-on Hours</div>
            </div>

            <div className="p-3 rounded-xl bg-cream-deep border border-gold/25">
              <div className="flex items-center gap-2 text-gold mb-1">
                <Award className="w-4 h-4" />
                <span className="text-[0.7rem] uppercase tracking-wider font-semibold text-ink-soft">Award</span>
              </div>
              <div className="text-xs font-bold text-ink leading-tight">{program.credential}</div>
              <div className="text-[0.7rem] text-ink-soft mt-0.5">Credential</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-6">
            <Link
              href="/learn/enroll"
              className="btn-gold"
            >
              <span>Enroll in this Pathway</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/learn/classroom" className="btn-ghost">
              <Sparkles className="w-4 h-4" />
              <span>Launch AI Classroom</span>
            </Link>
          </div>
        </div>

        {/* Right Photo Column */}
        <div className="relative bg-cream-deep overflow-hidden">
          <img
            src={program.heroImage}
            alt={program.title}
            className="w-full h-full object-cover object-center min-h-[320px] lg:min-h-[480px] max-h-[600px]"
          />
        </div>
      </section>

      {/* Main Container — full-bleed */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-10 flex-1">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          
          {/* Main Left Content Area */}
          <main className="w-full lg:flex-1 min-w-0">
            {/* Top Navigation Tabs */}
            <div className="border-b border-[#e4dfd4] mb-8 overflow-x-auto scrollbar-none">
              <nav className="flex space-x-8 min-w-max" aria-label="Program sections">
                {[
                  { id: 'overview', label: 'Program' },
                  { id: 'curriculum', label: 'Curriculum' },
                  { id: 'outcomes', label: 'Career Outcomes' },
                  { id: 'requirements', label: 'Admissions' },
                  { id: 'faq', label: 'FAQ' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`py-4 px-1 text-sm font-semibold border-b-2 transition-colors duration-150 flex items-center gap-2 ${
                      activeTab === tab.id
                        ? 'border-[#8a6d2b] text-[#8a6d2b]'
                        : 'border-transparent text-[#5a6b5f] hover:text-ink hover:border-[#cbd5e1]'
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
                <section className="bg-cream p-6 sm:p-8 border-t border-gold/25">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8a6d2b] mb-3">
                    <GraduationCap className="w-4 h-4 text-gold" /> What You'll Learn
                  </div>
                  <h2 className="font-display text-2xl font-bold text-ink mb-4">
                    About the {program.title}
                  </h2>
                  <div className="text-[#5a6b5f] leading-relaxed space-y-4 text-sm sm:text-base mb-6">
                    {program.overviewParagraphs.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                    {syllabus && (
                      <div className="p-4 rounded-lg bg-[#faf6ee] border border-[#e4dfd4] text-xs sm:text-sm text-[#243328] font-mono leading-relaxed">
                        <strong className="font-sans font-bold text-[#8a6d2b] block mb-1 uppercase tracking-wide">Accredited Program Objectives:</strong>
                        {syllabus.programObjective}
                      </div>
                    )}
                  </div>

                  {/* Core Competencies Badges */}
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#5a6b5f] mb-4">
                    Primary Competency Domains
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {program.coreCompetencies.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-3.5 rounded-lg bg-cream border border-[#e4dfd4] text-ink text-xs sm:text-sm font-medium"
                      >
                        <DynamicIcon name={item.icon} className="w-4 h-4 text-[#8a6d2b] shrink-0" />
                        <span>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* How Your Time Is Spent - Donut Breakdown */}
                <section className="bg-cream p-6 sm:p-8 border-t border-gold/25">
                  <h2 className="font-display text-2xl font-bold text-ink mb-2">
                    How Your Time Is Spent
                  </h2>
                  <p className="text-xs sm:text-sm text-[#5a6b5f] mb-6">
                    All hours are hands-on training time.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                    {/* SVG Donut Chart */}
                    <div className="md:col-span-4 flex flex-col items-center justify-center p-4 bg-cream rounded-xl border border-[#e4dfd4]">
                      <div className="relative w-44 h-44">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                          {/* Background Circle */}
                          <circle cx="50" cy="50" r="38" fill="none" stroke="#e4dfd4" strokeWidth="12" />
                          {/* Technical Segment */}
                          <circle
                            cx="50"
                            cy="50"
                            r="38"
                            fill="none"
                            stroke="#8a6d2b"
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
                          <span className="text-xl font-bold font-display text-ink">
                            {program.totalClockHours}
                          </span>
                          <span className="text-[10px] font-semibold text-[#5a6b5f] uppercase tracking-wider">
                            Total Hours
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Breakdown items */}
                    <div className="md:col-span-8 space-y-4">
                      {program.breakdown.map((item, idx) => (
                        <div key={idx} className="p-4 rounded-lg bg-cream border border-[#e4dfd4]">
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center gap-2">
                              <span
                                className={`w-3 h-3 rounded-full ${
                                  idx === 0 ? 'bg-[#8a6d2b]' : idx === 1 ? 'bg-[#d9b589]' : 'bg-[#0d9488]'
                                }`}
                              />
                              <span className="text-sm font-bold text-ink">{item.type}</span>
                            </div>
                            <span className="text-xs font-mono font-bold text-[#8a6d2b] bg-cream px-2 py-0.5 rounded border border-[#e4dfd4]">
                              {item.hours} Hours ({item.percent})
                            </span>
                          </div>
                          {item.description && (
                            <p className="text-xs text-[#5a6b5f] leading-relaxed pl-5">
                              {item.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Table A4: Weekly Schedule Template */}
                <section className="bg-cream p-6 sm:p-8 border-t border-gold/25">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="font-display text-xl sm:text-2xl font-bold text-ink">
                        Standard Daily & Weekly Schedule (Template A4)
                      </h2>
                      <p className="text-xs sm:text-sm text-[#5a6b5f]">
                        30 Hours per week · Monday through Friday structured delivery
                      </p>
                    </div>
                    <span className="text-xs font-mono px-3 py-1 bg-[#8a6d2b]/10 text-[#8a6d2b] rounded-full font-semibold">
                      Mon – Fri | 08:00 – 15:30
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="p-4 rounded-lg bg-[#8a6d2b]/5 border border-[#8a6d2b]/20">
                      <div className="text-xs font-mono font-bold text-[#8a6d2b] uppercase mb-1">
                        Block 1 · 08:00 – 12:00 (4.0 hrs)
                      </div>
                      <div className="text-sm font-bold text-ink mb-1">Technical Skills Laboratory</div>
                      <p className="text-xs text-[#5a6b5f]">
                        Live salon floor, wet prep tubs, obedience rings, handling mechanics, and supervised safety drills.
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-[#d9b589]/10 border border-[#d9b589]/30">
                      <div className="text-xs font-mono font-bold text-[#8c6527] uppercase mb-1">
                        Block 2 · 12:30 – 14:30 (2.0 hrs)
                      </div>
                      <div className="text-sm font-bold text-ink mb-1">Business & Personal Mastery Spine</div>
                      <p className="text-xs text-[#5a6b5f]">
                        LSH, PER, BUS, MKT, TEC, FIN, and LEG daily interactive business and self-governance workshops.
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-gold-deep/5 border border-gold-deep/20">
                      <div className="text-xs font-mono font-bold text-gold-deep uppercase mb-1">
                        Block 3 · 14:30 – 15:30 (1.0 hr)
                      </div>
                      <div className="text-sm font-bold text-ink mb-1">Daily Review & Practice</div>
                      <p className="text-xs text-[#5a6b5f]">
                        Quick checks, portfolio uploads, and daily attendance.
                      </p>
                    </div>
                  </div>

                  {/* Staffing & Facilities Specs (Table A5 & A6) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#e4dfd4] text-xs text-[#5a6b5f]">
                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-[#8a6d2b] shrink-0" />
                      <div>
                        <strong className="text-ink block font-semibold">Staffing Ratios (Table A5):</strong>
                        1:8 instructor-to-student ratio during live animal labs; 1:16 during business lectures. Lead instructor maintains Master credential.
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Building className="w-5 h-5 text-[#8a6d2b] shrink-0" />
                      <div>
                        <strong className="text-ink block font-semibold">Facility Standards (Table A6):</strong>
                        Commercial-grade hydraulic grooming tables, non-slip electric tubs, dedicated ventilation, isolation kennel, and secure outdoor training yards.
                      </div>
                    </div>
                  </div>
                </section>

                {/* Textbooks & Reference Bibliography (Part B & C) */}
                <section className="bg-cream p-6 sm:p-8 border-t border-gold/25">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-display text-xl sm:text-2xl font-bold text-ink">
                      Required Textbooks & Official Syllabi Manuals
                    </h2>
                    <span className="text-xs text-[#5a6b5f]">Part B & C Bibliography</span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border border-[#e4dfd4]">
                      <thead className="bg-[#faf6ee] text-ink font-bold border-b border-[#e4dfd4]">
                        <tr>
                          <th className="p-3">Reference Code</th>
                          <th className="p-3">Title & Publication Standard</th>
                          <th className="p-3">Category</th>
                          <th className="p-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#e4dfd4] text-[#5a6b5f]">
                        {program.manuals.map((man, idx) => (
                          <tr key={idx} className="hover:bg-cream">
                            <td className="p-3 font-mono font-bold text-[#8a6d2b]">{man.id}</td>
                            <td className="p-3 font-medium text-ink">{man.title}</td>
                            <td className="p-3">
                              <span
                                className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                                  man.type === 'Core Manual'
                                    ? 'bg-[#8a6d2b]/10 text-[#8a6d2b]'
                                    : 'bg-[#d9b589]/20 text-[#8c6527]'
                                }`}
                              >
                                {man.type}
                              </span>
                            </td>
                            <td className="p-3 text-gold-deep font-semibold flex items-center gap-1">
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
                <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-cream rounded-xl border border-[#e4dfd4]">
                  <div>
                    <h2 className="font-display text-xl font-bold text-ink">Curriculum Delivery & Master Schedule</h2>
                    <p className="text-xs text-[#5a6b5f]">Select a view mode to inspect terms, the week-by-week master schedule, or granular course modules.</p>
                  </div>

                  <div className="inline-flex rounded-lg bg-[#faf6ee] p-1 border border-[#e4dfd4]">
                    <button
                      onClick={() => setCurriculumViewMode('terms')}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                        curriculumViewMode === 'terms'
                          ? 'bg-[#8a6d2b] text-on-dark shadow-sm'
                          : 'text-[#5a6b5f] hover:text-ink'
                      }`}
                    >
                      Term Overview
                    </button>
                    <button
                      onClick={() => setCurriculumViewMode('weekly')}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                        curriculumViewMode === 'weekly'
                          ? 'bg-[#8a6d2b] text-on-dark shadow-sm'
                          : 'text-[#5a6b5f] hover:text-ink'
                      }`}
                    >
                      Week-by-Week Master Schedule ({program.totalWeeks} Wks)
                    </button>
                    <button
                      onClick={() => setCurriculumViewMode('catalog')}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                        curriculumViewMode === 'catalog'
                          ? 'bg-[#8a6d2b] text-on-dark shadow-sm'
                          : 'text-[#5a6b5f] hover:text-ink'
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
                          className="bg-cream rounded-xl border border-[#e4dfd4] overflow-hidden shadow-sm transition-all"
                        >
                          <button
                            onClick={() => setOpenTermIndex(isOpen ? null : index)}
                            className="w-full text-left p-6 flex items-start sm:items-center justify-between gap-4 hover:bg-cream transition-colors"
                          >
                            <div className="flex items-start sm:items-center gap-4">
                              <div className="w-12 h-12 rounded-xl bg-[#8a6d2b]/10 border border-[#8a6d2b]/20 flex flex-col items-center justify-center shrink-0">
                                <span className="text-[10px] font-bold text-[#8a6d2b] uppercase">TERM</span>
                                <span className="text-base font-bold font-display text-[#8a6d2b]">{term.termNumber}</span>
                              </div>
                              <div>
                                <h3 className="font-display text-lg font-bold text-ink">{term.name}</h3>
                                <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-[#5a6b5f]">
                                  <span>{term.durationWeeks}</span>
                                  <span>•</span>
                                  <span>{term.clockHours} Hours</span>
                                  <span>•</span>
                                  <span>{term.modulesCount} Modules</span>
                                </div>
                              </div>
                            </div>

                            <ChevronDown
                              className={`w-5 h-5 text-[#5a6b5f] transition-transform duration-200 shrink-0 ${
                                isOpen ? 'rotate-180' : ''
                              }`}
                            />
                          </button>

                          {isOpen && (
                            <div className="p-6 pt-0 border-t border-[#e4dfd4]/70 bg-cream/50 space-y-6">
                              <p className="text-sm text-[#5a6b5f] leading-relaxed pt-4">{term.description}</p>

                              {/* Time Breakdown */}
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-lg bg-cream border border-[#e4dfd4]">
                                <div>
                                  <div className="text-xs text-[#5a6b5f]">Technical Lab Hours</div>
                                  <div className="text-base font-bold text-[#8a6d2b]">
                                    {term.modulesSummary.technicalHours || 0} hrs
                                  </div>
                                </div>
                                <div>
                                  <div className="text-xs text-[#5a6b5f]">Business Spine Hours</div>
                                  <div className="text-base font-bold text-[#8c6527]">
                                    {term.modulesSummary.businessHours || 0} hrs
                                  </div>
                                </div>
                                <div>
                                  <div className="text-xs text-[#5a6b5f]">Applied / Capstone</div>
                                  <div className="text-base font-bold text-[#0d9488]">
                                    {term.modulesSummary.appliedHours || 0} hrs
                                  </div>
                                </div>
                              </div>

                              {/* Detailed Course Highlight Cards */}
                              <div>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-[#5a6b5f] mb-3">
                                  Term {term.termNumber} Modules & Practical Syllabi
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  {term.courseHighlights.map((mod) => (
                                    <div
                                      key={mod.code}
                                      className="p-4 rounded-lg bg-cream border border-[#e4dfd4] hover:border-[#8a6d2b]/40 transition-colors"
                                    >
                                      <div className="flex items-center justify-between mb-1.5">
                                        <span className="font-mono text-xs font-bold text-[#8a6d2b] px-2 py-0.5 rounded bg-[#8a6d2b]/10">
                                          {mod.code}
                                        </span>
                                        <span className="text-xs font-medium text-[#5a6b5f]">{mod.hours} Hrs</span>
                                      </div>
                                      <h5 className="font-semibold text-sm text-ink mb-1">{mod.title}</h5>
                                      <p className="text-xs text-[#5a6b5f] leading-relaxed">{mod.description}</p>
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
                  <div className="bg-cream rounded-xl border border-[#e4dfd4] p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-display text-xl font-bold text-ink">
                          Week-by-Week Delivery Schedule (Part B Syllabi)
                        </h3>
                        <p className="text-xs text-[#5a6b5f]">
                          Exact pacing of technical modules, business/personal spine modules, hours, and weekly assessments.
                        </p>
                      </div>
                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#8a6d2b]/10 text-[#8a6d2b]">
                        Total {syllabus?.weeklySchedule.length || program.totalWeeks} Weeks Scheduled
                      </span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border border-[#e4dfd4]">
                        <thead className="bg-[#faf6ee] text-ink font-bold border-b border-[#e4dfd4]">
                          <tr>
                            <th className="p-3 w-16">Week</th>
                            <th className="p-3 w-28">Term</th>
                            <th className="p-3">Technical Track Modules (08:00–12:00)</th>
                            <th className="p-3">Business / Personal Spine (12:30–14:30)</th>
                            <th className="p-3 w-24">Hrs (Tech / Biz)</th>
                            <th className="p-3">Assessments, Quizzes & Gates</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#e4dfd4] text-[#5a6b5f]">
                          {syllabus?.weeklySchedule.map((entry) => (
                            <tr key={entry.week} className="hover:bg-cream">
                              <td className="p-3 font-mono font-bold text-[#8a6d2b]">Wk {entry.week}</td>
                              <td className="p-3 font-medium text-ink">{entry.term}</td>
                              <td className="p-3 font-mono text-[#8a6d2b] font-semibold">{entry.technicalModules}</td>
                              <td className="p-3 font-mono text-[#8c6527]">{entry.businessModules}</td>
                              <td className="p-3 font-mono font-bold bg-cream">{entry.hoursFormatted}</td>
                              <td className="p-3 text-xs">
                                {entry.assessments.includes('Safety Gate') ? (
                                  <span className="text-gold-deep font-semibold flex items-center gap-1">
                                    <AlertTriangle className="w-3 h-3 shrink-0" /> {entry.assessments}
                                  </span>
                                ) : entry.assessments.includes('Defense') || entry.assessments.includes('Checkpoint') ? (
                                  <span className="text-[#8a6d2b] font-semibold flex items-center gap-1">
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
                    <div className="bg-cream p-4 rounded-xl border border-[#e4dfd4] flex items-center justify-between">
                      <span className="text-xs font-semibold text-ink">
                        Displaying {programCatalogModules.length} accredited course descriptions for {program.code}
                      </span>
                      <Link
                        href="/learn/courses"
                        className="text-xs font-bold text-[#8a6d2b] hover:underline flex items-center gap-1"
                      >
                        Open Global Catalog <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {programCatalogModules.map((m) => (
                        <div key={m.code} className="p-5 rounded-xl bg-cream border border-[#e4dfd4] shadow-sm flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#8a6d2b]/10 text-[#8a6d2b]">
                                {m.code}
                              </span>
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs font-medium text-[#5a6b5f]">{m.hours} Hrs</span>
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#faf6ee] font-semibold text-[#5a6b5f]">
                                  {m.level}
                                </span>
                              </div>
                            </div>
                            <h4 className="font-semibold text-sm text-ink mb-1.5">{m.title}</h4>
                            <p className="text-xs text-[#5a6b5f] leading-relaxed mb-3">{m.description}</p>
                          </div>

                          {m.safetyGate && (
                            <div className="pt-2 border-t border-gold-deep/20 text-[11px] font-semibold text-gold-deep flex items-center gap-1.5">
                              <Shield className="w-3.5 h-3.5" /> Key Skills Check
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: CAREER OUTCOMES */}
            {activeTab === 'outcomes' && (
              <div className="space-y-8">
                {/* Career Pathways & Wage Ladder */}
                <section className="bg-cream p-6 sm:p-8 border-t border-gold/25">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8a6d2b] mb-2">
                    <Briefcase className="w-4 h-4 text-gold" /> Professional Pathways & Economic Mobility
                  </div>
                  <h2 className="font-display text-2xl font-bold text-ink mb-2">
                    Career Pathways & Graduate Compensation
                  </h2>
                  <p className="text-xs sm:text-sm text-[#5a6b5f] mb-6">
                    75%+ of graduates are working or running their own business within 6 months.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {syllabus?.careerOutcomes.map((outcome, idx) => (
                      <div key={idx} className="p-5 rounded-xl bg-cream border border-[#e4dfd4] flex flex-col justify-between">
                        <div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#8a6d2b]/10 text-[#8a6d2b] uppercase tracking-wider block w-fit mb-2">
                            {outcome.employmentType}
                          </span>
                          <h3 className="font-semibold text-base text-ink mb-1">{outcome.title}</h3>
                          <p className="text-xs text-[#5a6b5f] leading-relaxed mb-4">{outcome.roleDescription}</p>
                        </div>
                        <div className="pt-3 border-t border-[#e4dfd4]">
                          <div className="text-[10px] uppercase font-bold text-[#5a6b5f]">Typical Compensation</div>
                          <div className="text-sm font-mono font-bold text-[#8a6d2b]">{outcome.typicalComp}</div>
                          <div className="text-[11px] text-gold-deep font-medium mt-0.5">Market Demand: {outcome.marketDemand}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Skills You'll Master */}
                <section className="bg-cream p-6 sm:p-8 border-t border-gold/25">
                  <h2 className="font-display text-2xl font-bold text-ink mb-2">
                    Skills You'll Master
                  </h2>
                  <p className="text-xs sm:text-sm text-[#5a6b5f] mb-6">
                    To graduate, you'll demonstrate every skill on your checklist with your instructor.
                  </p>

                  <div className="space-y-4">
                    {syllabus?.rubricDomains.map((r, idx) => (
                      <div key={idx} className="p-4 rounded-xl border border-[#e4dfd4] bg-cream">
                        <div className="font-display font-bold text-sm text-ink mb-1">{r.domain}</div>
                        <div className="text-xs text-[#5a6b5f] mb-3">
                          <strong className="text-ink">Core Skills Evaluated:</strong> {r.coreSkills}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div className="p-3 rounded bg-cream border border-[#e4dfd4]">
                            <span className="font-bold text-[#8a6d2b] block mb-1">Competent Benchmark (Graduation Standard):</span>
                            <span className="text-[#5a6b5f]">{r.competentBenchmark}</span>
                          </div>
                          <div className="p-3 rounded bg-cream border border-[#e4dfd4]">
                            <span className="font-bold text-[#8c6527] block mb-1">Mastery / Honors Benchmark:</span>
                            <span className="text-[#5a6b5f]">{r.masteryThreshold}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {/* TAB 4: ADMISSIONS */}
            {activeTab === 'requirements' && (
              <div className="space-y-8">
                {/* Key Skills You'll Demonstrate */}
                <section className="bg-cream p-6 sm:p-8 rounded-xl border border-gold-deep/30 shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-deep mb-2">
                    <Shield className="w-4 h-4" /> Key Skills You'll Demonstrate
                  </div>
                  <h2 className="font-display text-2xl font-bold text-ink mb-2">
                    Key Skills You'll Demonstrate
                  </h2>
                  <p className="text-xs sm:text-sm text-[#5a6b5f] mb-6">
                    Safety skills you must demonstrate before working with live animals. You'll practice these skills with your instructor before working with real animals.
                  </p>

                  <div className="space-y-3">
                    {syllabus?.safetyGates.map((gate) => (
                      <div key={gate.code} className="p-4 rounded-lg bg-gold-deep/5 border border-gold-deep/20 flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-gold-deep shrink-0 mt-0.5" />
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono text-xs font-bold text-gold-deep">{gate.code}</span>
                            <span className="font-semibold text-sm text-ink">{gate.title}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-gold-deep/10 text-gold-deep font-bold">
                              {gate.stage}
                            </span>
                          </div>
                          <p className="text-xs text-ink-soft leading-relaxed">{gate.requirement}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Admission Requirements & Attendance Policy */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <section className="bg-cream p-6 rounded-xl border border-[#e4dfd4] shadow-sm">
                    <h3 className="font-display text-lg font-bold text-ink mb-3">
                      What You Need to Enroll
                    </h3>
                    <ul className="space-y-2.5 text-xs text-[#5a6b5f]">
                      {syllabus?.admissionRequirements.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#8a6d2b] shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section className="bg-cream p-6 rounded-xl border border-[#e4dfd4] shadow-sm">
                    <h3 className="font-display text-lg font-bold text-ink mb-3">
                      Attendance Policy
                    </h3>
                    <p className="text-xs text-[#5a6b5f] leading-relaxed mb-4">
                      {syllabus?.attendancePolicy}
                    </p>
                    <div className="p-3 rounded-lg bg-[#faf6ee] text-xs font-mono text-[#8a6d2b] font-semibold">
                      Friday 08:00–12:00: Open Laboratory Makeup Block
                    </div>
                  </section>
                </div>
              </div>
            )}

            {/* TAB 5: ACCREDITATION FAQ */}
            {activeTab === 'faq' && (
              <section className="bg-cream p-6 sm:p-8 border-t border-gold/25 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8a6d2b] mb-2">
                  <HelpCircle className="w-4 h-4 text-gold" /> Compliance & Operations FAQ
                </div>
                <h2 className="font-display text-2xl font-bold text-ink mb-2">
                  Frequently Asked Questions
                </h2>
                <p className="text-xs sm:text-sm text-[#5a6b5f] mb-6">
                  Guidance on attendance, safety, and building your credentials.
                </p>

                <div className="space-y-3">
                  {syllabus?.faqs.map((faq, idx) => {
                    const isOpen = openFaqIndex === idx;
                    return (
                      <div key={idx} className="border border-[#e4dfd4] rounded-lg overflow-hidden">
                        <button
                          onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                          className="w-full text-left p-4 bg-cream flex items-center justify-between gap-4 font-semibold text-sm text-ink hover:bg-[#faf6ee] transition-colors"
                        >
                          <span>{faq.question}</span>
                          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isOpen && (
                          <div className="p-4 bg-cream text-xs sm:text-sm text-[#5a6b5f] leading-relaxed border-t border-[#e4dfd4]">
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
            <div className="bg-cream rounded-xl border border-[#e4dfd4] p-6 shadow-sm">
              <span className="text-[10px] font-bold tracking-widest text-[#8a6d2b] uppercase block mb-1">
                Official Credential
              </span>
              <h3 className="font-display text-lg font-bold text-ink mb-3">
                {program.credential}
              </h3>
              
              <div className="space-y-3 text-xs text-[#5a6b5f] mb-6 pt-3 border-t border-[#e4dfd4]">
                <div className="flex justify-between">
                  <span className="text-[#5a6b5f]">Total Hours:</span>
                  <span className="font-mono font-bold text-ink">{program.totalClockHours} hrs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5a6b5f]">Full-Time Duration:</span>
                  <span className="font-bold text-ink">{program.totalWeeks} Weeks</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5a6b5f]">Part-Time Duration:</span>
                  <span className="text-ink">{program.partTimeWeeksFormatted}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5a6b5f]">Delivery Format:</span>
                  <span className="text-ink">Hybrid Salon Lab</span>
                </div>
              </div>

              <Link
                href="/learn/enroll"
                className="btn-gold w-full mb-3"
              >
                Enroll in Program <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href={'/learn/classroom'}
                className="btn-ghost w-full"
              >
                Practice in the Classroom
              </Link>
            </div>

            {/* Stacking Ladder Card */}
            {syllabus && (
              <div className="bg-[#8a6d2b] text-on-dark rounded-xl p-6 shadow-sm">
                <span className="text-[10px] font-bold tracking-widest text-gold uppercase block mb-1">
                  Build on Your Credentials
                </span>
                <h4 className="font-display text-base font-bold text-on-dark mb-2">Build on Your Credentials</h4>
                <p className="text-xs text-[#d5e0d8] leading-relaxed mb-4">
                  {syllabus.stacksInto}
                </p>
                <div className="text-[11px] text-[#a0b2a6] font-mono">
                  Your completed hours transfer into advanced programs.
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>

    </div>
  );
}
