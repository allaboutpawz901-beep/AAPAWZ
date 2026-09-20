'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Search,
  BookOpen,
  Award,
  Clock,
  ArrowRight,
  PawPrint,
  SlidersHorizontal,
  X,
  Shield,
  Layers,
  Sparkles,
  GraduationCap,
  Compass,
} from 'lucide-react';
import { Navbar } from '@/components/lms-design-system/Navbar';
import { Footer } from '@/components/lms-design-system/Footer';
import { EnrollmentModal } from '@/components/lms-design-system/EnrollmentModal';
import { COURSES_PROGRAMS, ProgramDetails } from '@/lib/courses-data';
import { ALL_CATALOG_MODULES, CatalogModule } from '@/lib/catalog-modules';

// Track code mapping to program id
const TRACK_CODE_TO_PROGRAM_ID: Record<string, string> = {
  IPDG: 'ipdg',
  PDT: 'pdt',
  ACA: 'aca',
  PPS: 'pps',
  CAT: 'cat',
  PPC: 'ppc',
  BIZ: 'ppc',
  PERS: 'ppc',
};

export function CoursesCatalogView() {
  const [selectedPathway, setSelectedPathway] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedDuration, setSelectedDuration] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [viewMode, setViewMode] = useState<'programs' | 'modules'>('programs');
  const [activeCourseModal, setActiveCourseModal] = useState<ProgramDetails | null>(null);
  const [enrollModalOpen, setEnrollModalOpen] = useState<boolean>(false);
  const [selectedProgramForEnroll, setSelectedProgramForEnroll] = useState<string>('ipdg');

  // 1. Filtered Modules from ALL_CATALOG_MODULES
  const filteredModules = useMemo(() => {
    return ALL_CATALOG_MODULES.filter((m) => {
      // Pathway filter
      if (selectedPathway !== 'all') {
        if (selectedPathway === 'grooming' && !['IPDG', 'CAT', 'ACA'].includes(m.trackCode)) return false;
        if (selectedPathway === 'training' && m.trackCode !== 'PDT') return false;
        if (selectedPathway === 'pet-care' && !['PPS', 'ACA', 'PPC'].includes(m.trackCode)) return false;
        if (selectedPathway === 'business' && !['PPC', 'BIZ', 'PERS'].includes(m.trackCode)) return false;
      }

      // Course Level filter
      if (selectedLevel !== 'all') {
        if (m.level !== selectedLevel) return false;
      }

      // Search Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesCode = m.code.toLowerCase().includes(q);
        const matchesTitle = m.title.toLowerCase().includes(q);
        const matchesDesc = m.description.toLowerCase().includes(q);
        const matchesTrack = m.trackTitle.toLowerCase().includes(q) || m.trackCode.toLowerCase().includes(q);
        const matchesCategory = m.category.toLowerCase().includes(q);
        const matchesSafety = (q.includes('safety') || q.includes('gate')) && !!m.safetyGate;
        const matchesPracticum = q.includes('practicum') && !!m.practicum;

        if (!matchesCode && !matchesTitle && !matchesDesc && !matchesTrack && !matchesCategory && !matchesSafety && !matchesPracticum) {
          return false;
        }
      }

      return true;
    });
  }, [selectedPathway, selectedLevel, searchQuery]);

  // 2. Map of matching modules grouped by program id for rich search previews
  const programMatchingModulesMap = useMemo(() => {
    const map: Record<string, CatalogModule[]> = {};
    if (!searchQuery.trim() && selectedLevel === 'all') return map;

    for (const m of filteredModules) {
      const progId = TRACK_CODE_TO_PROGRAM_ID[m.trackCode];
      if (progId) {
        if (!map[progId]) map[progId] = [];
        map[progId].push(m);
      }
    }
    return map;
  }, [filteredModules, searchQuery, selectedLevel]);

  // 3. Filtered & Sorted Programs
  const filteredPrograms = useMemo(() => {
    const list = COURSES_PROGRAMS.filter((p) => {
      // Pathway filter
      if (selectedPathway !== 'all') {
        if (selectedPathway === 'grooming' && !['ipdg', 'cat', 'aca'].includes(p.id)) return false;
        if (selectedPathway === 'training' && p.id !== 'pdt') return false;
        if (selectedPathway === 'pet-care' && !['pps', 'aca', 'ppc'].includes(p.id)) return false;
        if (selectedPathway === 'business' && p.id !== 'ppc') return false;
      }

      // Duration filter
      if (selectedDuration === 'short' && p.totalWeeks > 16) return false;
      if (selectedDuration === 'long' && p.totalWeeks <= 16) return false;

      // Course Level filter
      if (selectedLevel !== 'all') {
        const hasLevelModule = ALL_CATALOG_MODULES.some(
          (m) => TRACK_CODE_TO_PROGRAM_ID[m.trackCode] === p.id && m.level === selectedLevel
        );
        if (!hasLevelModule) return false;
      }

      // Search Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesCode = p.code.toLowerCase().includes(q);
        const matchesSubtitle = p.subtitle.toLowerCase().includes(q);
        const matchesOverview = p.overviewParagraphs.some((para) => para.toLowerCase().includes(q));
        const matchesTopics = p.terms.some((t) => t.topics.some((top) => top.toLowerCase().includes(q)));
        const matchesHighlights = p.terms.some((t) =>
          t.courseHighlights.some(
            (ch) =>
              ch.code.toLowerCase().includes(q) ||
              ch.title.toLowerCase().includes(q) ||
              ch.description.toLowerCase().includes(q)
          )
        );
        const hasMatchedModules = (programMatchingModulesMap[p.id]?.length ?? 0) > 0;
        const matchesSafetyQuery = (q.includes('safety') || q.includes('gate')) && p.terms.some((t) =>
          t.courseHighlights.some((ch) => ch.title.toLowerCase().includes('safety gate'))
        );

        if (
          !matchesTitle &&
          !matchesCode &&
          !matchesSubtitle &&
          !matchesOverview &&
          !matchesTopics &&
          !matchesHighlights &&
          !hasMatchedModules &&
          !matchesSafetyQuery
        ) {
          return false;
        }
      }

      return true;
    });

    // Sorting
    return [...list].sort((a, b) => {
      if (sortBy === 'hours') return b.totalClockHours - a.totalClockHours;
      if (sortBy === 'weeks') return b.totalWeeks - a.totalWeeks;
      if (sortBy === 'name') return a.title.localeCompare(b.title);
      return 0; // 'featured' keeps original curriculum order
    });
  }, [selectedPathway, selectedDuration, selectedLevel, searchQuery, sortBy, programMatchingModulesMap]);

  const hasActiveFilters =
    selectedPathway !== 'all' ||
    selectedLevel !== 'all' ||
    selectedDuration !== 'all' ||
    searchQuery.trim() !== '';

  const handleResetFilters = () => {
    setSelectedPathway('all');
    setSelectedLevel('all');
    setSelectedDuration('all');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf9f5] font-sans text-[#141b16]">
      {/* Global Navigation */}
      <Navbar activeNav="Courses" />

      {/* Hero Header Banner */}
      <section className="relative w-full bg-[#16221a] text-white overflow-hidden">
        <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold uppercase tracking-wider text-[#ebdcc8] backdrop-blur-md">
                <GraduationCap className="w-3.5 h-3.5 text-[#d9b589]" />
                <span>ACADEMY CURRICULUM &amp; SYLLABUS</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                View All Academy Courses
              </h1>
              <p className="text-[#d8e5dc] text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
                Explore our complete curriculum of 6 integrated career pathways and over 160 accredited course modules. Search by specific module code, safety gate, skill, or credential, and jump directly into the full term-by-term syllabus.
              </p>

              {/* Quick Route Shortcut to Enroll */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/learn/enroll"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#ebdcc8] hover:bg-[#dfcdb7] text-[#141b16] font-bold text-xs transition-colors shadow-sm"
                >
                  <span>Get Started / Enroll Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/learn/classroom"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#ecd2af]" />
                  <span>Interactive AI Classroom</span>
                </Link>
              </div>

              {/* 3 Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-white/15">
                <div className="p-2.5 rounded-xl bg-white/[0.07] border border-white/15">
                  <div className="flex items-center gap-2 text-[#ecd2af] mb-0.5">
                    <Award className="w-4 h-4" />
                    <span className="text-[0.7rem] uppercase tracking-wider font-semibold text-[#a8bba9]">6 Pathways</span>
                  </div>
                  <p className="text-[0.75rem] text-[#cad8ce]">
                    Grooming, training, sitting, daycare, cat care, business.
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-white/[0.07] border border-white/15">
                  <div className="flex items-center gap-2 text-[#ecd2af] mb-0.5">
                    <Clock className="w-4 h-4" />
                    <span className="text-[0.7rem] uppercase tracking-wider font-semibold text-[#a8bba9]">Flexible Formats</span>
                  </div>
                  <p className="text-[0.75rem] text-[#cad8ce]">
                    6 to 52 weeks with hybrid and practicum tracks.
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-white/[0.07] border border-white/15">
                  <div className="flex items-center gap-2 text-[#ecd2af] mb-0.5">
                    <BookOpen className="w-4 h-4" />
                    <span className="text-[0.7rem] uppercase tracking-wider font-semibold text-[#a8bba9]">Live Practicum</span>
                  </div>
                  <p className="text-[0.75rem] text-[#cad8ce]">
                    Safety gates, live client animals, and portfolios.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Photo Column - Bright, Crisp, Un-darkened */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[16/10] lg:aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-white/15">
                <Image
                  src="/images/pets_caregiver.jpg"
                  alt="LEASHED Academy Students"
                  fill
                  priority
                  className="object-cover object-center brightness-100 contrast-[1.02]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-mono text-[0.7rem] font-bold border border-white/20">
                  Accredited Program Delivery Guide
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog View: Left Sidebar + Right Content Area */}
      <main className="flex-1 w-full max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar Filters */}
          <aside className="lg:col-span-4 xl:col-span-3 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-[#e8dfcf] shadow-sm sticky top-24">
              {/* Academy Nav Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#eee4d2]">
                <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-[#141b16] uppercase">
                  <BookOpen className="w-4 h-4 text-[#4e5b41]" />
                  <span>CURRICULUM TRACKS</span>
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={handleResetFilters}
                    className="text-[0.7rem] font-bold text-[#b54a35] hover:underline"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Direct Pathway Quick Links to Syllabus Pages */}
              <div className="py-4 border-b border-[#eee4d2] space-y-1 text-xs">
                {COURSES_PROGRAMS.map((prog) => (
                  <Link
                    key={prog.id}
                    href={`/courses/${prog.slug}`}
                    className="flex items-center justify-between py-1.5 px-2 rounded-lg text-[#3b4c40] hover:bg-[#f5efe3] hover:text-[#141b16] font-medium transition-colors"
                  >
                    <span className="truncate">{prog.title}</span>
                    <span className="font-mono text-[0.68rem] text-[#76877b] bg-[#ece5d8] px-1.5 py-0.5 rounded">
                      {prog.code}
                    </span>
                  </Link>
                ))}
              </div>

              {/* Filter Controls */}
              <div className="pt-4 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#141b16] flex items-center gap-2">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#4e5b41]" />
                  <span>Filter Catalog</span>
                </h3>

                {/* Search Input with Clear Button */}
                <div>
                  <label className="block text-[0.72rem] font-bold text-[#55665b] uppercase mb-1">
                    Search Course or Skill
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="e.g. IPDG-103, safety gate, lion cut..."
                      className="w-full bg-[#fbf9f5] border border-[#d9ccb6] rounded-lg pl-3 pr-8 py-2 text-xs text-[#141b16] focus:outline-none focus:border-[#4e5b41]"
                    />
                    {searchQuery ? (
                      <button
                        onClick={() => setSearchQuery('')}
                        aria-label="Clear search"
                        className="absolute right-2.5 top-2.5 text-[#86968c] hover:text-[#141b16]"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <Search className="w-3.5 h-3.5 absolute right-2.5 top-2.5 text-[#86968c]" />
                    )}
                  </div>
                </div>

                {/* Pathway Dropdown */}
                <div>
                  <label className="block text-[0.72rem] font-bold text-[#55665b] uppercase mb-1">
                    Pathway
                  </label>
                  <select
                    value={selectedPathway}
                    onChange={(e) => setSelectedPathway(e.target.value)}
                    className="w-full bg-[#fbf9f5] border border-[#d9ccb6] rounded-lg px-3 py-2 text-xs text-[#141b16] font-medium focus:outline-none focus:border-[#4e5b41]"
                  >
                    <option value="all">All Pathways</option>
                    <option value="grooming">Grooming &amp; Bathing (IPDG, CAT, ACA)</option>
                    <option value="training">Dog Training (PDT)</option>
                    <option value="pet-care">Pet Sitting &amp; Care (PPS, ACA, PPC)</option>
                    <option value="business">Business &amp; Ownership (PPC)</option>
                  </select>
                </div>

                {/* Course Level Dropdown */}
                <div>
                  <label className="block text-[0.72rem] font-bold text-[#55665b] uppercase mb-1">
                    Course Level
                  </label>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="w-full bg-[#fbf9f5] border border-[#d9ccb6] rounded-lg px-3 py-2 text-xs text-[#141b16] font-medium focus:outline-none focus:border-[#4e5b41]"
                  >
                    <option value="all">All Levels (100–400)</option>
                    <option value="100">100 Level – Foundation &amp; Safety</option>
                    <option value="200">200 Level – Core Skills</option>
                    <option value="300">300 Level – Advanced Skills</option>
                    <option value="400">400 Level – Practicum &amp; Capstone</option>
                  </select>
                </div>

                {/* Duration Filter */}
                <div>
                  <label className="block text-[0.72rem] font-bold text-[#55665b] uppercase mb-1">
                    Duration
                  </label>
                  <select
                    value={selectedDuration}
                    onChange={(e) => setSelectedDuration(e.target.value)}
                    className="w-full bg-[#fbf9f5] border border-[#d9ccb6] rounded-lg px-3 py-2 text-xs text-[#141b16] font-medium focus:outline-none focus:border-[#4e5b41]"
                  >
                    <option value="all">All Durations</option>
                    <option value="short">Short Courses (≤ 16 Weeks)</option>
                    <option value="long">Comprehensive Programs (&gt; 16 Weeks)</option>
                  </select>
                </div>

                {/* Suggested Quick Search Chips */}
                <div className="pt-2">
                  <div className="text-[0.68rem] font-bold uppercase tracking-wider text-[#687a6f] mb-1.5">
                    Popular Inquiries
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {['Safety Gate', 'IPDG-103', 'PDT-201', 'Lion Cut', 'Bathing', 'Obedience'].map((term) => (
                      <button
                        key={term}
                        onClick={() => setSearchQuery(term)}
                        className={`text-[0.68rem] px-2 py-0.5 rounded-md border transition-colors ${
                          searchQuery.toLowerCase() === term.toLowerCase()
                            ? 'bg-[#4e5b41] text-white border-[#4e5b41]'
                            : 'bg-[#f4efe5] text-[#3e5043] border-[#e2d5c1] hover:bg-[#ebdcc8]'
                        }`}
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Advisor Callout Card */}
              <div className="mt-6 p-4 rounded-xl bg-[#141d16] text-white">
                <div className="w-8 h-8 rounded-full bg-[#ebdcc8] text-[#141b16] flex items-center justify-center mb-2.5">
                  <PawPrint className="w-4 h-4" />
                </div>
                <h4 className="font-serif text-sm font-bold mb-1">
                  Need Help Choosing?
                </h4>
                <p className="text-[0.75rem] text-[#b4c4b9] leading-relaxed mb-3">
                  Talk to an admissions advisor to map your background to the best pathway.
                </p>
                <Link
                  href="/learn/enroll"
                  className="block text-center py-1.5 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-[#ebdcc8] text-xs font-bold transition-colors border border-white/15"
                >
                  Start Enrollment &amp; Advising
                </Link>
              </div>
            </div>
          </aside>

          {/* Right Main Catalog Content */}
          <section className="lg:col-span-8 xl:col-span-9 space-y-6">
            {/* Top Toolbar: View Switcher + Count + Sort */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#e5decb]">
              {/* Tabs: Programs vs Modules */}
              <div className="flex items-center gap-1.5 bg-[#eee6d8] p-1 rounded-xl">
                <button
                  onClick={() => setViewMode('programs')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    viewMode === 'programs'
                      ? 'bg-white text-[#141b16] shadow-sm'
                      : 'text-[#5a6b5f] hover:text-[#141b16]'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#4e5b41]" />
                  <span>Programs &amp; Tracks</span>
                  <span className="text-[0.68rem] px-1.5 py-0.2 rounded-full bg-[#ebdcc8] text-[#141b16]">
                    {filteredPrograms.length}
                  </span>
                </button>

                <button
                  onClick={() => setViewMode('modules')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    viewMode === 'modules'
                      ? 'bg-white text-[#141b16] shadow-sm'
                      : 'text-[#5a6b5f] hover:text-[#141b16]'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5 text-[#4e5b41]" />
                  <span>Course Modules Catalog</span>
                  <span className="text-[0.68rem] px-1.5 py-0.2 rounded-full bg-[#ebdcc8] text-[#141b16]">
                    {filteredModules.length}
                  </span>
                </button>
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <span className="text-xs text-[#6e7f74]">Sort by</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-[#d9ccb6] rounded-lg px-2.5 py-1 text-xs text-[#141b16] font-medium focus:outline-none"
                >
                  <option value="featured">Featured (Curriculum Order)</option>
                  <option value="hours">Hours (High to Low)</option>
                  <option value="weeks">Duration (Weeks)</option>
                  <option value="name">Title (A-Z)</option>
                </select>
              </div>
            </div>

            {/* Active search summary notice */}
            {searchQuery && (
              <div className="p-3 bg-[#f5efe3] rounded-xl border border-[#e8dfcf] flex items-center justify-between text-xs text-[#3b4c3f]">
                <div>
                  Showing results for &ldquo;<strong>{searchQuery}</strong>&rdquo; across{' '}
                  <strong>{filteredPrograms.length}</strong> programs and{' '}
                  <strong>{filteredModules.length}</strong> course modules.
                </div>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs font-bold text-[#b54a35] hover:underline"
                >
                  Clear search
                </button>
              </div>
            )}

            {/* VIEW MODE 1: PROGRAMS & TRACKS */}
            {viewMode === 'programs' && (
              <>
                {filteredPrograms.length === 0 ? (
                  <div className="bg-white rounded-2xl p-12 text-center border border-[#e8dfcf] space-y-4">
                    <div className="w-12 h-12 rounded-full bg-[#f4efe5] text-[#4e5b41] flex items-center justify-center mx-auto">
                      <Search className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-[#141b16]">No programs found</h3>
                    <p className="text-xs text-[#607166] max-w-md mx-auto">
                      We couldn&rsquo;t find any programs matching your current search or filter combination.
                    </p>
                    <button
                      onClick={handleResetFilters}
                      className="px-4 py-2 rounded-full bg-[#4e5b41] text-white font-bold text-xs hover:bg-[#3b4731] transition-colors"
                    >
                      Reset All Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredPrograms.map((program) => {
                      const matchedModules = programMatchingModulesMap[program.id] || [];
                      return (
                        <div
                          key={program.id}
                          className="bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-xs hover:shadow-md hover:border-stone-300 transition-all flex flex-col justify-between"
                        >
                          <div>
                            {/* Top Image Banner with Badges - Crisp & Bright */}
                            <div className="relative w-full aspect-[16/9] bg-stone-100 overflow-hidden">
                              <Image
                                src={program.heroImage}
                                alt={program.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover object-center brightness-100 contrast-[1.01] transition-transform duration-500 hover:scale-105"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute top-3 left-3">
                                <span className="px-2.5 py-1 rounded-full bg-white/95 text-stone-900 font-mono font-bold text-[0.68rem] tracking-wider uppercase backdrop-blur-md shadow-xs border border-stone-200/60">
                                  {program.code}
                                </span>
                              </div>
                              <div className="absolute top-3 right-3">
                                <span className="px-2.5 py-1 rounded-full bg-[#16221a]/85 text-emerald-300 font-sans font-medium text-[0.68rem] tracking-wider uppercase backdrop-blur-md shadow-xs border border-white/10">
                                  {program.credential}
                                </span>
                              </div>
                            </div>

                            {/* Card Body */}
                            <div className="p-5">
                              <h3 className="font-serif text-lg font-bold text-stone-900 leading-snug mb-1.5 line-clamp-1">
                                {program.title}
                              </h3>
                              <p className="text-xs text-stone-600 leading-relaxed mb-4 line-clamp-2">
                                {program.subtitle}
                              </p>

                              {/* 3 Metric Pills */}
                              <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-stone-50 border border-stone-200/60 text-center mb-4">
                                <div>
                                  <div className="text-[0.68rem] text-stone-500 font-semibold uppercase">Duration</div>
                                  <div className="text-xs font-bold text-stone-900">{program.totalWeeks} Wks</div>
                                </div>
                                <div className="border-x border-stone-200">
                                  <div className="text-[0.68rem] text-stone-500 font-semibold uppercase">Modules</div>
                                  <div className="text-xs font-bold text-stone-900">{program.totalModules}</div>
                                </div>
                                <div>
                                  <div className="text-[0.68rem] text-stone-500 font-semibold uppercase">Clock Hrs</div>
                                  <div className="text-xs font-bold text-stone-900">{program.totalClockHours}</div>
                                </div>
                              </div>

                              {/* Matched Modules Indicator (when user searches) */}
                              {matchedModules.length > 0 && searchQuery && (
                                <div className="mb-4 p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/60 text-xs">
                                  <div className="text-[0.68rem] font-bold text-amber-900 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                                    <Sparkles className="w-3 h-3 text-amber-700" />
                                    <span>Matched Courses in this Track ({matchedModules.length})</span>
                                  </div>
                                  <div className="space-y-1">
                                    {matchedModules.slice(0, 2).map((m) => (
                                      <div key={m.code} className="flex items-center gap-1.5 text-[0.72rem] text-stone-800">
                                        <span className="font-mono font-bold text-emerald-800">{m.code}:</span>
                                        <span className="truncate">{m.title}</span>
                                        {m.safetyGate && (
                                          <span className="shrink-0 text-[0.62rem] px-1 rounded bg-rose-600 text-white font-bold">
                                            Safety Gate
                                          </span>
                                        )}
                                      </div>
                                    ))}
                                    {matchedModules.length > 2 && (
                                      <button
                                        onClick={() => setViewMode('modules')}
                                        className="text-[0.68rem] font-bold text-emerald-800 hover:underline block pt-1"
                                      >
                                        + {matchedModules.length - 2} more matching modules in catalog →
                                      </button>
                                    )}
                                  </div>
                                </div>
                              )}

                              {/* 4 Term Breadcrumb Pills */}
                              <div className="space-y-1.5 mb-4">
                                <div className="text-[0.68rem] font-bold uppercase tracking-wider text-stone-500">
                                  4-Term Integrated Curriculum:
                                </div>
                                <div className="grid grid-cols-2 gap-1.5 text-[0.72rem] text-stone-700">
                                  {program.terms.map((t) => (
                                    <div
                                      key={t.termNumber}
                                      className="px-2 py-1 rounded-lg bg-stone-100/80 border border-stone-200/50 truncate font-medium flex items-center gap-1"
                                    >
                                      <span className="font-bold text-emerald-800">T{t.termNumber}:</span>
                                      <span className="truncate">{t.name}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Card Actions Footer */}
                          <div className="p-5 pt-0 flex items-center justify-between gap-3 border-t border-stone-100 mt-2">
                            {/* Basic Info Quick Modal Button */}
                            <button
                              onClick={() => setActiveCourseModal(program)}
                              className="text-xs font-semibold text-stone-600 hover:text-stone-900 underline underline-offset-2"
                            >
                              Quick Overview
                            </button>

                            {/* See More Button Routing to Dedicated Course Page & Syllabus */}
                            <Link
                              href={`/courses/${program.slug}`}
                              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#16221a] hover:bg-[#25392c] text-white font-bold text-xs transition-colors shadow-xs"
                            >
                              <span>Full Syllabus &amp; Schedule</span>
                              <ArrowRight className="w-3.5 h-3.5 text-[#ecd2af]" />
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}

            {/* VIEW MODE 2: COURSE MODULES CATALOG (ALL 160+ MODULES) */}
            {viewMode === 'modules' && (
              <div className="space-y-4">
                <div className="bg-white rounded-2xl p-5 border border-[#e8dfcf] shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#eee4d2]">
                    <div>
                      <h2 className="font-serif text-lg font-bold text-[#141b16]">
                        Academic Course Modules Catalog
                      </h2>
                      <p className="text-xs text-[#5f7166]">
                        Showing {filteredModules.length} accredited modules from the Delivery Guide v1.0
                      </p>
                    </div>
                    {hasActiveFilters && (
                      <button
                        onClick={handleResetFilters}
                        className="text-xs font-bold text-[#b54a35] hover:underline self-start sm:self-auto"
                      >
                        Reset All Filters
                      </button>
                    )}
                  </div>

                  {filteredModules.length === 0 ? (
                    <div className="py-12 text-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-[#f4efe5] text-[#4e5b41] flex items-center justify-center mx-auto">
                        <Search className="w-6 h-6" />
                      </div>
                      <h3 className="font-serif text-base font-bold text-[#141b16]">No matching course modules found</h3>
                      <p className="text-xs text-[#607166] max-w-md mx-auto">
                        Try clearing or modifying your search terms to explore modules across all 6 pathways.
                      </p>
                      <button
                        onClick={handleResetFilters}
                        className="px-4 py-2 rounded-full bg-[#4e5b41] text-white font-bold text-xs hover:bg-[#3b4731] transition-colors"
                      >
                        Clear Filters
                      </button>
                    </div>
                  ) : (
                    <div className="divide-y divide-[#eee4d2] mt-2">
                      {filteredModules.map((m) => (
                        <div
                          key={m.code}
                          className="py-4 hover:bg-[#faf6ee] px-3 -mx-3 rounded-xl transition-colors flex flex-col sm:flex-row sm:items-start justify-between gap-4"
                        >
                          <div className="space-y-1.5 flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#ebdcc8] text-[#141b16]">
                                {m.code}
                              </span>
                              <span className="text-[0.68rem] font-bold uppercase tracking-wider text-[#4e5b41] bg-[#eef4ee] px-2 py-0.5 rounded">
                                {m.trackTitle}
                              </span>
                              <span className="text-[0.68rem] text-[#6d7e73] bg-[#f4efe5] px-2 py-0.5 rounded">
                                Term {m.term} • Level {m.level}
                              </span>
                              {m.safetyGate && (
                                <span className="inline-flex items-center gap-1 text-[0.68rem] font-bold px-2 py-0.5 rounded bg-[#b54a35] text-white">
                                  <Shield className="w-3 h-3" />
                                  <span>Safety Gate</span>
                                </span>
                              )}
                              {m.practicum && (
                                <span className="inline-flex items-center gap-1 text-[0.68rem] font-bold px-2 py-0.5 rounded bg-[#2b4c37] text-white">
                                  <span>Live Practicum</span>
                                </span>
                              )}
                            </div>

                            <h3 className="font-serif text-base font-bold text-[#141b16]">
                              {m.title}
                            </h3>

                            <p className="text-xs text-[#526356] leading-relaxed">
                              {m.description}
                            </p>
                          </div>

                          <div className="sm:text-right shrink-0 flex sm:flex-col items-center sm:items-end justify-between gap-2">
                            <div className="text-xs font-bold text-[#141b16] bg-[#f4efe5] sm:bg-transparent px-2.5 py-1 sm:p-0 rounded-md">
                              {m.hours} Clock Hours
                            </div>
                            <Link
                              href={`/courses/${m.slug}`}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#4e5b41] hover:bg-[#3b4731] text-white font-bold text-[0.72rem] transition-colors"
                            >
                              <span>View Track &amp; Syllabus</span>
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Bottom Promo Banner */}
            <div className="mt-12 rounded-2xl bg-[#141d16] text-white p-8 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
              <div className="max-w-xl z-10">
                <span className="text-[0.7rem] uppercase tracking-widest text-[#d9b589] font-bold block mb-1">
                  CAREER OPPORTUNITY
                </span>
                <h3 className="font-serif text-2xl font-bold mb-2">
                  More Than a School — It’s a Future in Pet Care.
                </h3>
                <p className="text-xs text-[#ccd8d0] leading-relaxed">
                  Build your hands-on skills, earn your credentials, and launch or advance the pet care business you want.
                </p>
              </div>

              <div className="z-10 shrink-0 flex flex-wrap gap-3">
                <Link
                  href="/learn/enroll"
                  className="px-6 py-3 rounded-full bg-[#ebdcc8] hover:bg-[#dfcdb7] text-[#141b16] font-bold text-xs transition-colors shadow-sm inline-flex items-center gap-2"
                >
                  <span>Get Started / Enroll</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />

      {/* Quick Info Modal */}
      {activeCourseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#decbb4] relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveCourseModal(null)}
              aria-label="Close dialog"
              className="absolute top-4 right-4 text-[#8a9b90] hover:text-[#141b16] text-xl font-bold w-8 h-8 rounded-full bg-[#f4efe5] flex items-center justify-center"
            >
              ×
            </button>

            <span className="text-[0.7rem] font-bold text-[#4e5b41] uppercase tracking-widest block mb-1">
              {activeCourseModal.code} • {activeCourseModal.credential}
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#141b16] mb-2">
              {activeCourseModal.title}
            </h3>
            <p className="text-xs text-[#526357] leading-relaxed mb-6">
              {activeCourseModal.subtitle}
            </p>

            <div className="grid grid-cols-3 gap-3 p-3 rounded-xl bg-[#fbf9f5] border border-[#eee4d2] text-center mb-6">
              <div>
                <div className="text-[0.68rem] text-[#708075] uppercase font-bold">Total Duration</div>
                <div className="text-sm font-bold text-[#141b16]">{activeCourseModal.totalWeeksFormatted}</div>
              </div>
              <div className="border-x border-[#e8dfcf]">
                <div className="text-[0.68rem] text-[#708075] uppercase font-bold">Modules</div>
                <div className="text-sm font-bold text-[#141b16]">{activeCourseModal.totalModules}</div>
              </div>
              <div>
                <div className="text-[0.68rem] text-[#708075] uppercase font-bold">Instruction</div>
                <div className="text-sm font-bold text-[#141b16]">{activeCourseModal.totalClockHours} Hours</div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <h4 className="font-serif text-sm font-bold text-[#141b16]">
                4-Term Progression Outline:
              </h4>
              {activeCourseModal.terms.map((t) => (
                <div key={t.termNumber} className="p-2.5 rounded-lg bg-[#f8f5ee] border border-[#eee4d2] text-xs">
                  <div className="font-bold text-[#141b16] flex items-center justify-between">
                    <span>Term {t.termNumber}: {t.name}</span>
                    <span className="text-[#6d7e73] font-normal">{t.clockHours} hrs • {t.durationWeeks}</span>
                  </div>
                  <p className="text-[0.72rem] text-[#55665b] mt-0.5">{t.description}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#f0e8dc]">
              <button
                onClick={() => {
                  setSelectedProgramForEnroll(activeCourseModal.id);
                  setActiveCourseModal(null);
                  setEnrollModalOpen(true);
                }}
                className="px-4 py-2 rounded-full bg-[#ebdcc8] text-[#141b16] font-bold text-xs hover:bg-[#dfcdb7] transition-colors"
              >
                Enroll Now
              </button>

              <Link
                href={`/courses/${activeCourseModal.slug}`}
                className="px-5 py-2 rounded-full bg-[#4e5b41] hover:bg-[#3b4731] text-white font-bold text-xs transition-colors flex items-center gap-1.5"
              >
                <span>Full Syllabus &amp; Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Enrollment Modal */}
      <EnrollmentModal
        isOpen={enrollModalOpen}
        onClose={() => setEnrollModalOpen(false)}
        initialProgramId={selectedProgramForEnroll}
      />
    </div>
  );
}
