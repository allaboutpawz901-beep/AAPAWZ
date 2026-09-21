import { notFound } from 'next/navigation';
import { COURSES_PROGRAMS, getProgramBySlug } from '@/lib/courses-data';
import { ProgramDetailView } from '@/components/ProgramDetailView';

// Pre-render every pathway page at build time.
export function generateStaticParams() {
  return COURSES_PROGRAMS.map((p) => ({ slug: p.slug }));
}

// Static metadata for SEO.
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = getProgramBySlug(slug);
  if (!program) return { title: 'Course Not Found' };
  return {
    title: `${program.fullTitle} | Leashed Academy`,
    description: program.subtitle,
  };
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = getProgramBySlug(slug);
  if (!program) notFound();
  return <ProgramDetailView program={program} />;
}
