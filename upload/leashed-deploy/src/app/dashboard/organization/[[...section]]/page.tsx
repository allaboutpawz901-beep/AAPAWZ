import { InstitutionPortal } from "@/components/InstitutionPortal";

export default async function OrganizationPortalPage({
  params,
}: {
  params: Promise<{ section?: string[] }>;
}) {
  const { section } = await params;
  return <InstitutionPortal role="organization" section={section?.[0] || ""} />;
}
