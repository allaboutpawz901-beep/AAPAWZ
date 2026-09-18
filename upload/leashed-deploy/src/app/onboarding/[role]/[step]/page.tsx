import {notFound} from "next/navigation";
import {OnboardingFlow} from "@/components/OnboardingFlow";
import type {OnboardingRole} from "@/components/AuthExperience";

const allowed: Record<OnboardingRole, string[]> = {
  learner: ["welcome", "account", "role", "goals", "profile", "consent", "review", "complete"],
  instructor: ["welcome", "account", "profile", "skills", "training", "tour", "verification", "complete"],
  organization: ["welcome", "create", "details", "locations", "team", "permissions", "programs", "billing", "review", "complete"],
};

export function generateStaticParams() {
  return Object.entries(allowed).flatMap(([role, steps]) => steps.map(step => ({role, step})));
}

export default async function OnboardingPage({params}: {params: Promise<{role: string; step: string}>}) {
  const {role, step} = await params;
  if (!(role in allowed) || !allowed[role as OnboardingRole].includes(step)) notFound();
  return <OnboardingFlow role={role as OnboardingRole} step={step} />;
}