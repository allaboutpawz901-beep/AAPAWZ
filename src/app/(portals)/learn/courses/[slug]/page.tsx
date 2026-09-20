import { notFound } from 'next/navigation';
import { COURSES_PROGRAMS, getProgramBySlug } from '@/lib/courses-data';
import { ProgramDetailView } from '@/components/ProgramDetailView';

// Statically pre-render the 6 known pathway slugs.
export function generateStaticParams() {
  return COURSES_PROGRAMS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then((p) => {
    const program = getProgramBySlug(p.slug);
    return program
      ? { title: `${program.title} — Learning Center` }
      : { title: 'Pathway not found' };
  });
}

export default async function PathwayPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = getProgramBySlug(slug);
  if (!program) notFound();
  return <ProgramDetailView program={program} />;
}
