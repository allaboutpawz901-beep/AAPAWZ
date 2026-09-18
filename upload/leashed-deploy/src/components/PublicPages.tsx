"use client";

import Link from "next/link";
import {ArrowRight, Award, BookOpen, Heart, PawPrint, ShieldCheck} from "lucide-react";
import {PublicFooter, PublicHeader} from "@/components/PublicHome";
import {AcademyPage} from "@/components/AcademyPage";
import {TrainingPage} from "@/components/TrainingPage";
import {PathwayPage} from "@/components/PathwayPage";
import {
  AboutPage, CoursesPage, leashedPrograms, PricingPage, ProgramDetailPage,
  SoftwarePage, SupportPage,
} from "@/components/PublicSecondaryPages";

export type PublicPageKind = "academy"|"training"|"pathway"|"courses"|"software"|"pricing"|"about"|"resources"|"support";

function ResourcesPage(){
  const resources=[
    [BookOpen,"Study Guides","Practical course guides and source-grounded learning materials."],
    [PawPrint,"Skills Practice","Templates and checklists for hands-on animal-care practice."],
    [ShieldCheck,"Safety Resources","Professional safety, welfare, and evidence requirements."],
    [Award,"Career Tools","Resume, interview, placement, and entrepreneurship resources."],
    [Heart,"Whole-Person Support","Tools for confidence, persistence, wellness, and success."],
  ] as const;
  return <main className="public-site secondary-page resources-full-page">
    <PublicHeader active="Resources"/>
    <section className="secondary-hero" style={{backgroundImage:'linear-gradient(90deg,rgba(5,25,18,.93),rgba(5,25,18,.54),rgba(5,25,18,.08)),url("/leashed-assets/supplied/homepage-hero.webp")'}}>
      <div className="secondary-shell secondary-hero-copy"><p className="public-eyebrow">LEARNING RESOURCES</p><h1>Tools for Skills That Last.</h1><p>Learning guides, career resources, instructor materials, templates, and practical support across every stage of the journey.</p><Link className="public-peach-button" href="/get-started">Get Started <ArrowRight/></Link></div>
    </section>
    <section className="resource-grid secondary-shell">{resources.map(([I,title,copy])=><article key={title}><I/><h2>{title}</h2><p>{copy}</p><button>Browse Resources <ArrowRight/></button></article>)}</section>
    <section className="secondary-cta"><div className="secondary-shell"><div><h2>Learn. Practice. Prove. Grow.</h2></div><Link href="/get-started">Start Your Journey <ArrowRight/></Link></div></section><PublicFooter/>
  </main>;
}

export function PublicPage({kind}:{kind:PublicPageKind}){
  if(kind==="academy")return <AcademyPage/>;
  if(kind==="training")return <TrainingPage/>;
  if(kind==="pathway")return <PathwayPage/>;
  if(kind==="courses")return <CoursesPage/>;
  if(kind==="software")return <SoftwarePage/>;
  if(kind==="pricing")return <PricingPage/>;
  if(kind==="about")return <AboutPage/>;
  if(kind==="support")return <SupportPage/>;
  return <ResourcesPage/>;
}

export function ProgramPage({slug}:{slug:string}){return <ProgramDetailPage slug={slug}/>;}
export const programSlugs=leashedPrograms.map(program=>program.slug);