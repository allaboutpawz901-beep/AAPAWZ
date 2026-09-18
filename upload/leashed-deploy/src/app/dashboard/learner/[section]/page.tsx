import { notFound } from "next/navigation";
import { LearnerPortal } from "@/components/LearnerPortal";

const sections = [
  "assignments",
  "grades",
  "notes",
  "books",
  "calendar",
  "messages",
  "files",
  "notebook",
  "media",
  "meet",
  "share",
  "more",
];

export function generateStaticParams() {
  return sections.map((section) => ({ section }));
}

export default async function LearnerSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  if (!sections.includes(section)) notFound();
  return <LearnerPortal section={section} />;
}
