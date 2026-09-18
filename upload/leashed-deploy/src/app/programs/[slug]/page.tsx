import {notFound} from "next/navigation";
import {ProgramPage} from "@/components/PublicPages";

const programSlugs = [
  "professional-pet-sitter",
  "professional-cat-groomer",
  "animal-care-assistant",
  "professional-dog-trainer",
  "intensive-professional-dog-groomer",
  "complete-professional-pet-care",
];

export function generateStaticParams(){return programSlugs.map(slug=>({slug}));}

export default async function ProgramRoute({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  if(!programSlugs.includes(slug))notFound();
  return <ProgramPage slug={slug}/>;
}