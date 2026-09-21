'use client';

import Link from 'next/link';
import { ArrowRight, Award } from 'lucide-react';
import { ProgramDetails } from '@/lib/courses-data';

interface ProgramDetailViewProps {
  program: ProgramDetails;
}

export function ProgramDetailView({ program }: ProgramDetailViewProps) {
  return (
    <div className="bg-cream text-ink">
      {/* Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-[1fr_1.25fr]">
        <div className="marble flex flex-col justify-center bg-cream px-8 py-16 lg:px-12">
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink leading-[1.12]">
            {program.fullTitle}
          </h1>
          <p className="text-ink-soft text-sm sm:text-base leading-relaxed max-w-2xl font-normal mt-4">
            {program.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/learn/enroll" className="btn-gold">
              Enroll in this Pathway <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        <div className="relative bg-cream-deep overflow-hidden">
          <img
            src={program.heroImage}
            alt={program.title}
            className="w-full h-full object-cover object-center min-h-[320px] lg:min-h-[480px] max-h-[600px]"
          />
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-gold/25 bg-cream px-8 py-6 lg:px-12">
        <div className="flex flex-wrap items-center justify-center gap-8 text-center">
          <div>
            <div className="font-display text-2xl font-bold text-ink">{program.totalClockHours}</div>
            <div className="text-xs text-ink-soft uppercase tracking-wider">Hours</div>
          </div>
          <div className="border-l border-gold/25 h-12" />
          <div>
            <div className="font-display text-2xl font-bold text-ink">{program.totalModules}</div>
            <div className="text-xs text-ink-soft uppercase tracking-wider">Modules</div>
          </div>
          <div className="border-l border-gold/25 h-12" />
          <div>
            <div className="font-display text-2xl font-bold text-ink">{program.termsCount}</div>
            <div className="text-xs text-ink-soft uppercase tracking-wider">Terms</div>
          </div>
          <div className="border-l border-gold/25 h-12" />
          <div>
            <div className="font-display text-2xl font-bold text-ink">{program.totalWeeksFormatted}</div>
            <div className="text-xs text-ink-soft uppercase tracking-wider">Duration</div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="px-8 py-12 lg:px-12 max-w-[900px] mx-auto">
        <h2 className="font-display text-2xl font-bold text-ink mb-4">About this program</h2>
        <div className="text-ink-soft leading-relaxed space-y-4 text-sm sm:text-base">
          {program.overviewParagraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>

      {/* What you'll learn */}
      <section className="px-8 py-8 lg:px-12 max-w-[900px] mx-auto">
        <h2 className="font-display text-2xl font-bold text-ink mb-6">What you'll learn</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {program.coreCompetencies.map((item, idx) => (
            <div key={idx} className="p-4 border border-gold/25 bg-cream">
              <span className="text-sm font-medium text-ink">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Curriculum — all terms expanded, all modules visible */}
      <section className="px-8 py-12 lg:px-12 max-w-[900px] mx-auto">
        <h2 className="font-display text-2xl font-bold text-ink mb-2">Curriculum</h2>
        <p className="text-sm text-ink-soft mb-8">{program.totalModules} modules across {program.termsCount} terms.</p>

        {program.terms.map((term) => (
          <div key={term.termNumber} className="mb-10">
            {/* Term header */}
            <div className="border-b border-gold/25 pb-3 mb-6">
              <h3 className="font-display text-xl font-bold text-ink">
                Term {term.termNumber}: {term.name}
              </h3>
              <p className="text-xs text-ink-soft mt-1">
                {term.courseHighlights.length} modules · {term.termHours} hours · {term.durationWeeks}
              </p>
            </div>

            {/* Module cards — all visible, no expanding */}
            <div className="space-y-4">
              {term.courseHighlights.map((mod) => (
                <div key={mod.code} className="p-5 border border-gold/25 bg-cream">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h4 className="font-semibold text-base text-ink">{mod.title}</h4>
                    <span className="text-sm text-ink-soft whitespace-nowrap">{mod.hours} hrs</span>
                  </div>
                  <span className="text-[10px] text-ink-soft font-mono">{mod.code}</span>
                  {mod.description && (
                    <p className="text-sm text-ink-soft leading-relaxed mt-3">{mod.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Career outcomes */}
      {program.completionRequirements.length > 0 && (
        <section className="px-8 py-12 lg:px-12 max-w-[900px] mx-auto">
          <h2 className="font-display text-2xl font-bold text-ink mb-6">Career outcomes</h2>
          <div className="space-y-3">
            {program.completionRequirements.map((outcome, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 border border-gold/25 bg-cream">
                <Award className="w-5 h-5 text-gold-deep shrink-0 mt-0.5" />
                <span className="text-sm text-ink leading-relaxed">{outcome}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Enroll CTA */}
      <section className="px-8 py-16 lg:px-12 text-center">
        <h2 className="font-display text-2xl font-bold text-ink mb-4">Ready to start?</h2>
        <p className="text-sm text-ink-soft mb-8 max-w-md mx-auto">
          Enroll in {program.title} and begin your career in animal care.
        </p>
        <Link href="/learn/enroll" className="btn-gold">
          Enroll in this Pathway <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
