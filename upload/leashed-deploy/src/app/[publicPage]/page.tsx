import { notFound } from "next/navigation";
import { PublicPage, type PublicPageKind } from "@/components/PublicPages";

const allowed: PublicPageKind[] = [
  "academy",
  "training",
  "pathway",
  "courses",
  "software",
  "pricing",
  "about",
  "resources",
  "support",
];

export function generateStaticParams() {
  return allowed.map((publicPage) => ({ publicPage }));
}

export default async function PublicRoute({
  params,
}: {
  params: Promise<{ publicPage: string }>;
}) {
  const { publicPage } = await params;
  if (!allowed.includes(publicPage as PublicPageKind)) notFound();
  return <PublicPage kind={publicPage as PublicPageKind} />;
}
