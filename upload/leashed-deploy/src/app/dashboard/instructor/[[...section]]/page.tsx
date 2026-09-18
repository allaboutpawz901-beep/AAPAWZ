import { InstructorPortal } from "@/components/InstructorPortal";

export default async function InstructorPortalPage({
  params,
}: {
  params: Promise<{ section?: string[] }>;
}) {
  const { section } = await params;
  return <InstructorPortal section={section?.[0] || ""} />;
}
