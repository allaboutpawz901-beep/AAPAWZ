import { InstitutionPortal } from "@/components/InstitutionPortal";

export default async function AdminPortalPage({
  params,
}: {
  params: Promise<{ section?: string[] }>;
}) {
  const { section } = await params;
  return <InstitutionPortal role="admin" section={section?.[0] || ""} />;
}
