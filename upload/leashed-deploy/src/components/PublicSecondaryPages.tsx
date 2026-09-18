"use client";

import Link from "next/link";
import {useMemo, useState} from "react";
import {
  ArrowRight, Award, BookOpen, BriefcaseBusiness, Building2, CalendarDays,
  Cat, Check, ChevronDown, CircleHelp, Clock3, CreditCard, GraduationCap,
  Headphones, Heart, Laptop, Mail, MapPin, MessageCircle, PawPrint, Phone,
  PlaySquare, Search, ShieldCheck, Sparkles, Store, UsersRound, Wrench,
} from "lucide-react";
import {PublicFooter, PublicHeader} from "@/components/PublicHome";

export type Program = {
  slug:string; code:string; title:string; credential:string; hours:number; weeks:number;
  category:"Academy"|"Training"|"Pathway"; image:string; description:string;
};

export const leashedPrograms:Program[] = [
  {slug:"professional-pet-sitter",code:"SIT",title:"Professional Pet Sitter",credential:"Certificate",hours:640,weeks:16,category:"Academy",image:"/leashed-assets/supplied/pet-sitter-hero.webp",description:"Build trustworthy client-care, animal handling, safety, scheduling, and professional pet-sitting skills."},
  {slug:"professional-cat-groomer",code:"CAT",title:"Professional Cat Groomer",credential:"Certificate",hours:560,weeks:24,category:"Academy",image:"/leashed-assets/supplied/cat-groomer-hero.webp",description:"Master feline behavior, safe handling, coat care, grooming technique, and client communication."},
  {slug:"animal-care-assistant",code:"DB",title:"Dog Bather / Animal Care Assistant",credential:"Diploma",hours:988,weeks:35,category:"Training",image:"/leashed-assets/supplied/animal-care-hero.webp",description:"Build foundational bathing, handling, facility care, safety, and animal-care workplace capability."},
  {slug:"professional-dog-trainer",code:"PDT",title:"Professional Dog Trainer",credential:"Diploma",hours:1112,weeks:39,category:"Training",image:"/leashed-assets/supplied/dog-trainer-hero.webp",description:"Develop humane training, behavior assessment, coaching, business, and practicum-based professional skills."},
  {slug:"intensive-professional-dog-groomer",code:"PDG",title:"Intensive Professional Dog Groomer",credential:"Diploma",hours:640,weeks:16,category:"Training",image:"/leashed-assets/supplied/dog-groomer-hero.webp",description:"Master complete professional grooming practice, breed styling, safety, client care, and business readiness."},
  {slug:"complete-professional-pet-care",code:"CPP",title:"Complete Professional Pet Care",credential:"Advanced Diploma",hours:1024,weeks:52,category:"Pathway",image:"/leashed-assets/program-business.webp",description:"Combine pet care, grooming, training, operations, entrepreneurship, and a capstone into one advanced pathway."},
];

const iconList=[PawPrint,Heart,Cat,BriefcaseBusiness,GraduationCap,ShieldCheck];

function Hero({active,eyebrow,title,copy,image,script}:{active:string;eyebrow:string;title:string;copy:string;image:string;script:string}){
  return <>
    <PublicHeader active={active}/>
    <section className="secondary-hero" style={{backgroundImage:`linear-gradient(90deg,rgba(5,25,18,.93),rgba(5,25,18,.64) 43%,rgba(5,25,18,.05)),url("${image}")`}}>
      <div className="secondary-shell secondary-hero-copy">
        <p className="public-eyebrow">{eyebrow}</p><h1>{title}</h1><p>{copy}</p>
        <Link className="public-peach-button" href="/get-started">Get Started <ArrowRight/></Link>
      </div>
      <p className="public-handwritten secondary-script">{script}</p>
    </section>
  </>;
}

function CourseCard({program}:{program:Program}){
  const Icon=iconList[leashedPrograms.indexOf(program)%iconList.length];
  return <Link className="secondary-course-card" href={`/programs/${program.slug}`}>
    <div style={{backgroundImage:`url("${program.image}")`}}/>
    <span><Icon/></span><small>{program.code} · {program.credential}</small>
    <h3>{program.title}</h3><p>{program.description}</p>
    <b>View Program <ArrowRight/></b>
  </Link>;
}

export function CoursesPage(){
  const [query,setQuery]=useState("");
  const [category,setCategory]=useState("All Pathways");
  const visible=useMemo(()=>leashedPrograms.filter(p=>(category==="All Pathways"||p.category===category)&&`${p.code} ${p.title} ${p.description}`.toLowerCase().includes(query.toLowerCase())),[query,category]);
  return <main className="public-site secondary-page courses-full-page">
    <Hero active="Academy" eyebrow="ACADEMY" title="View All Academy Courses" copy="Explore our complete library of career-focused courses, organized by pathway. Each course builds practical skills, knowledge, and confidence for success in animal care." image="/leashed-assets/supplied/academy-hero.webp" script={"Real Skills.\nReal Animals.\nReal Careers."}/>
    <section className="course-browser secondary-shell">
      <aside className="course-filters">
        <div className="filter-brand"><GraduationCap/><b>ACADEMY</b></div>
        <button className="selected">View All Courses <ArrowRight/></button>
        <h3>Pathways</h3>
        {["Intro to Animal Behavior","Pet First Aid Basics","Animal Care Fundamentals","Small Animal Care","Professional Cat Groomer","Professional Pet Care"].map(x=><button key={x}>{x}</button>)}
        <h3>Filter Courses</h3>
        <label>Pathway<select value={category} onChange={e=>setCategory(e.target.value)}><option>All Pathways</option><option>Academy</option><option>Training</option><option>Pathway</option></select></label>
        <label>Course Level<select><option>100 Level</option><option>Advanced</option></select></label>
        <label>Course Format<select><option>All Formats</option><option>Online</option><option>Hands-on</option></select></label>
        <label>Duration<select><option>Any Duration</option><option>Short Course</option><option>Full Pathway</option></select></label>
        <label className="course-search"><Search/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search Courses"/></label>
        <div className="filter-help"><CircleHelp/><h3>Not sure where to start?</h3><p>Take our quick quiz to find the right path for you.</p><Link href="/get-started">Take the Quiz <ArrowRight/></Link></div>
      </aside>
      <div className="course-results">
        <div className="course-results-head"><div><p className="public-eyebrow dark">COURSES</p><h2>100-Level Courses</h2><p>Build your foundation with industry-relevant, hands-on courses designed for real-world success.</p></div><span>{visible.length} courses</span></div>
        <div className="course-dense-grid">
          {[...visible,...visible,...visible].slice(0,15).map((p,i)=><CourseCard key={`${p.slug}-${i}`} program={p}/>)}
        </div>
      </div>
    </section>
    <section className="secondary-cta"><div className="secondary-shell"><div><p className="public-eyebrow">YOUR JOURNEY</p><h2>More Than a School —<br/>It’s a Future in Pet Care.</h2><p>Build your skills. Earn your credentials. Create the career you want.</p></div><Link href="/get-started">Start Your Journey <ArrowRight/></Link></div></section>
    <PublicFooter/>
  </main>;
}

const softwareBenefits=[
  ["CRM & customer/pet management","Appointment scheduling and status flow","Payments, invoices and accounting","POS, orders, inventory and fulfillment","Employee and customer portals","Analytics, reporting and automation"],
  ["Curriculum authoring and learning paths","AI-guided or self-paced delivery","Media, SCORM/xAPI and accessibility","Assessment, grading and rubrics","Skills, credentials and verification","Auditable clock-hour ledger"],
];

export function SoftwarePage(){
  return <main className="public-site secondary-page software-full-page">
    <Hero active="Software" eyebrow="SOFTWARE" title="Software Built for the Business of Pet Care." copy="Two connected platforms for the people who care for animals—and the businesses and learning systems behind them." image="/leashed-assets/supplied/software-hero.webp" script="One connected ecosystem."/>
    <section className="software-stat-band secondary-shell">{[[Laptop,"2 Platforms","Business + Learning"],[UsersRound,"CRM & Operations","Run the business"],[Sparkles,"AI-Enhanced","Teach & automate"],[BriefcaseBusiness,"Connected","One shared ecosystem"]].map(([I,a,b])=>{const Icon=I as typeof Laptop;return <article key={String(a)}><Icon/><div><strong>{String(a)}</strong><small>{String(b)}</small></div></article>})}</section>
    <section className="software-body secondary-shell">
      <main>
        <p className="public-eyebrow dark">ONE CONNECTED PATH</p><h2>Two Platforms. One Connected Path.</h2><p>Leashed connects business operations with professional learning, so you can manage the day-to-day and build your team’s future through one governed ecosystem.</p>
        {[["LEASHED BUSINESS","Run the Work. Grow the Business.","business",softwareBenefits[0]],["LEASHED LMS","Teach Skills. Track Mastery. Issue Credentials.","learning",softwareBenefits[1]]].map(([label,title,preview,items])=><article className="software-platform" key={String(label)}>
          <div className={`software-screen software-screen-${preview}`}><div className="screen-sidebar"/><div className="screen-header"/><div className="screen-kpis"><i/><i/><i/></div><div className="screen-chart"/><div className="screen-list"><i/><i/><i/><i/></div></div>
          <div><small>{String(label)}</small><h3>{String(title)}</h3><ul>{(items as string[]).map(x=><li key={x}><Check/>{x}</li>)}</ul></div>
        </article>)}
        <div className="platform-bridge"><Wrench/><div><h3>Built to Work Together.</h3><p>The Platform Bridge connects learning outcomes to real business operations, workforce readiness, and career opportunities.</p></div><span>BUSINESS <ArrowRight/> LEARNING</span></div>
      </main>
      <aside className="software-aside">
        <h2><PawPrint/> The Leashed Ecosystem</h2>
        <h3><b>2</b> Software Platforms</h3><p>Business Operations + Learning Management</p>
        {["Business Platform","Learning Platform","Connected by Design"].map((x,i)=><div key={x}><b>{x}</b><ul>{softwareBenefits[i<2?i:0].slice(0,4).map(v=><li key={v}>{v}</li>)}</ul></div>)}
        <section><h3>Build the Business Behind Better Care.</h3><Link href="/get-started">Get Started <ArrowRight/></Link></section>
      </aside>
    </section>
    <section className="secondary-cta"><div className="secondary-shell"><div><h2>Better tools create better careers—and better care.</h2></div><Link href="/get-started">Start Your Journey <ArrowRight/></Link></div></section>
    <PublicFooter/>
  </main>;
}

const plans=[
  {name:"FREE",price:"$0",desc:"Perfect for exploring the program and getting a feel for the Leashed learning experience.",items:["2 free sample modules","Learning platform preview","Career resources & guides","Community forum access","Basic skill assessments"]},
  {name:"STARTER",price:"$49",desc:"Ideal for serious learners who want full access to course content.",items:["All course modules","AI tutor & personalized learning","Progress tracking & certificates","Study guides & practice quizzes","Email support"]},
  {name:"PRO",price:"$99",desc:"Best for dedicated learners who want advanced features and career support.",items:["Everything in Starter","Live instructor sessions","Hands-on practicum tracking","Career coaching & job placement","Full software access"]},
  {name:"ENTERPRISE",price:"Custom",desc:"For organizations, shelters, and businesses that need tailored training.",items:["All Pro features","Custom user management","Team & location management","Dedicated onboarding","Custom reporting & analytics"]},
];

export function PricingPage(){
  const [open,setOpen]=useState(-1);
  return <main className="public-site secondary-page pricing-full-page">
    <Hero active="Pricing" eyebrow="PRICING" title="Invest in Your Future and Their Care." copy="Flexible plans for every stage—from free learning resources to full platform access. Choose the plan that fits your goals." image="/leashed-assets/supplied/cat-groomer-hero.webp" script={"Better Careers.\nHappier Pets."}/>
    <section className="pricing-benefits secondary-shell">{[[BookOpen,"World-Class Curriculum"],[CalendarDays,"Flexible Learning"],[ShieldCheck,"Built for Real Careers"],[Heart,"Whole-Person Support"]].map(([I,title])=>{const Icon=I as typeof BookOpen;return <article key={String(title)}><Icon/><div><h3>{String(title)}</h3><p>Industry-aligned training and support.</p></div></article>})}</section>
    <section className="pricing-main secondary-shell"><div className="center-heading"><p className="public-eyebrow dark">SIMPLE, TRANSPARENT PRICING</p><h2>Choose the Plan That’s Right for You.</h2><p>From free resources to full platform access, there is a plan for every learner, career goal, and business need.</p></div>
      <div className="pricing-card-grid">{plans.map((plan,i)=><article className={i===2?"featured":""} key={plan.name}><small>{plan.name}</small><h3>{plan.price}{plan.price!=="Custom"&&<span>/month</span>}</h3><p>{plan.desc}</p><ul>{plan.items.map(x=><li key={x}><Check/>{x}</li>)}</ul><Link href="/get-started">{i===3?"Contact Sales":`Choose ${plan.name}`} <ArrowRight/></Link></article>)}</div>
      <div className="every-plan"><PawPrint/><strong>Every Plan Includes Access to the Leashed Ecosystem</strong><span>Training + Software + Support + Career Pathways</span></div>
    </section>
    <section className="faq secondary-shell"><h2>Frequently Asked Questions</h2>{["Can I change my plan later?","Is there a refund policy?","Do you offer payment plans?","What happens after I complete a course?","Do you provide job placement support?","Is the software included in the Pro plan?"].map((x,i)=><button onClick={()=>setOpen(open===i?-1:i)} key={x}><span>{x}{open===i&&<small>Yes. Our support team will help you choose or change the best option for your goals.</small>}</span><ChevronDown/></button>)}</section>
    <section className="secondary-cta"><div className="secondary-shell"><div><h2>Start building your future today.</h2></div><Link href="/get-started">Get Started <ArrowRight/></Link></div></section><PublicFooter/>
  </main>;
}

const values=[[Heart,"Compassion"],[Award,"Opportunity"],[ShieldCheck,"Integrity"],[UsersRound,"Community"],[Sparkles,"Innovation"],[GraduationCap,"Excellence"]];

export function AboutPage(){
  return <main className="public-site secondary-page about-full-page">
    <Hero active="About" eyebrow="ABOUT LEASHED" title="More Than Training. It’s a Brighter Future." copy="Leashed combines professional education, hands-on training, and powerful technology to create real opportunities for people and better care for animals." image="/leashed-assets/supplied/about-hero.webp" script={"Better People.\nHealthier Pets.\nStronger Communities."}/>
    <section className="about-mission secondary-shell"><div><p className="public-eyebrow dark">OUR MISSION</p><h2>Empower People.<br/>Care for Animals.<br/>Build Stronger Communities.</h2><p>When people gain the skills, confidence, and tools to build careers in animal care, everyone wins—pets get better care, communities grow stronger, and individuals create brighter futures.</p><Link href="/get-started">Our Story <ArrowRight/></Link></div><aside><p className="public-eyebrow dark">OUR VALUES</p><div>{values.map(([I,title])=>{const Icon=I as typeof Heart;return <article key={String(title)}><Icon/><div><h3>{String(title)}</h3><p>We put people, animals, and meaningful outcomes first.</p></div></article>})}</div></aside></section>
    <section className="about-ecosystem"><div className="secondary-shell"><div><p className="public-eyebrow">WHAT SETS US APART</p><h2>A Complete Ecosystem<br/>for Lasting Impact</h2><p>From curiosity to career, Leashed brings together learning, hands-on training, technology, and whole-person support.</p></div><div className="about-impact-grid">{[[GraduationCap,"6","Career Pathways"],[UsersRound,"100%","Mission Focused"],[BookOpen,"Lifelong","Access to Resources"],[Award,"Real","Job Placement Support"]].map(([I,n,l])=>{const Icon=I as typeof Award;return <article key={String(l)}><Icon/><strong>{String(n)}</strong><span>{String(l)}</span></article>})}</div></div></section>
    <section className="about-team secondary-shell"><div><p className="public-eyebrow dark">OUR TEAM & IMPACT</p><h2>Real People. Real Expertise. Real Change.</h2><p>Experienced educators, industry professionals, technology experts, and animal lovers—all united to help people build meaningful careers and give animals exceptional care.</p><div className="about-metrics">{[["50+","Instructors & Mentors"],["10,000+","Learners Empowered"],["5,000+","Pets Cared For"],["100%","Mission Focused"]].map(x=><article key={x[0]}><strong>{x[0]}</strong><span>{x[1]}</span></article>)}</div></div><aside><blockquote>“Leashed gave me the skills, confidence, and support I needed to turn my love for animals into a real career.”</blockquote><cite>— Jessica M., Graduate</cite></aside></section>
    <section className="secondary-cta"><div className="secondary-shell"><div><h2>Ready to make a difference?</h2><p>Join a community that believes in people, pets, and possibility.</p></div><Link href="/get-started">Get Started <ArrowRight/></Link></div></section><PublicFooter/>
  </main>;
}

const supportTopics=[[BookOpen,"Getting Started"],[GraduationCap,"Academy & Training"],[Laptop,"Software Platform"],[CreditCard,"Billing & Payments"],[UsersRound,"Account & Profile"],[Wrench,"Technical Support"]];

export function SupportPage(){
  const [query,setQuery]=useState("");
  return <main className="public-site secondary-page support-full-page">
    <Hero active="Support" eyebrow="SUPPORT" title="We’re Here to Help You Succeed." copy="Find answers, get step-by-step guidance, and connect with our team. Leashed support is here for you every step of the way." image="/leashed-assets/supplied/cat-groomer-hero.webp" script={"Better People.\nHealthier Pets."}/>
    <section className="support-search secondary-shell"><label><Search/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search for help articles, guides, or topics"/><button>Search</button></label></section>
    <section className="support-topics secondary-shell">{supportTopics.filter(x=>String(x[1]).toLowerCase().includes(query.toLowerCase())).map(([I,title])=>{const Icon=I as typeof BookOpen;return <article key={String(title)}><Icon/><h3>{String(title)}</h3><p>Guides, answers, workflows, and role-specific assistance.</p><Link href="/support">View Support <ArrowRight/></Link></article>})}</section>
    <section className="support-roles secondary-shell"><main><p className="public-eyebrow dark">HELP TOPICS</p><h2>Find the Right Support for Your Role.</h2><p>Choose your role to see relevant guides, FAQs, and resources.</p><div>{[["Learners","Course access and learning support."],["Instructors","Teaching resources and curriculum guides."],["Admin & Staff","Organization, reporting, and operations."],["Pet Parents","Appointments and care support."],["Groomers & Technicians","Software, scheduling, and workflow help."],["Partners & Employers","Partnership and workforce programs."]].map(([a,b],i)=><article key={a}><div className={`support-photo photo-${i}`}/><h3>{a}</h3><p>{b}</p><Link href="/support">{a} Support <ArrowRight/></Link></article>)}</div></main><aside><h3>Popular Help Articles</h3>{["How to Reset Your Password","Book a New Appointment","Access Your Course Materials","Update Your Payment Method","Manage Your Profile","Contact Support"].map(x=><Link href="/support" key={x}>{x}<ArrowRight/></Link>)}<div><MessageCircle/><h3>Need More Help?</h3><p>Our friendly team is ready to assist you.</p><Link href="mailto:support@leashed.io">Contact Support</Link></div></aside></section>
    <section className="support-contact secondary-shell"><div><p className="public-eyebrow dark">CONTACT OPTIONS</p><h2>Get in Touch</h2><p>Choose the best way to reach us.</p></div>{[[Mail,"Email Support","support@leashed.io"],[MessageCircle,"Live Chat","Start Chat"],[Phone,"Phone Support","(318) 555-0123"],[Headphones,"Help Center","Visit Help Center"]].map(([I,a,b])=>{const Icon=I as typeof Mail;return <article key={String(a)}><Icon/><h3>{String(a)}</h3><p>{String(b)}</p><button>Get Help <ArrowRight/></button></article>})}</section>
    <section className="secondary-cta"><div className="secondary-shell"><div><h2>Support that moves you forward.</h2></div><Link href="mailto:support@leashed.io">Contact Us <ArrowRight/></Link></div></section><PublicFooter/>
  </main>;
}

const programTermNames={
  SIT:["Foundations & Animal Care","Client Care & Communication","Multi-Species & Specialized Care","Business, Safety & Capstone"],
  CAT:["Feline Foundations","Advanced Grooming & Styling","Health, Wellness & Special Needs","Business, Safety & Professional Growth"],
  DB:["Foundations","Core Skills","Advanced Skills","Capstone"],
  PDT:["Foundations & Core Skills","Behavior & Communication","Advanced Training Techniques","Handler Skills & Client Communication"],
  PDG:["Foundations of Grooming","Advanced Grooming Techniques","Canine Health & Professional Practice","Capstone & Career Launch"],
  CPP:["Foundations of Pet Care & Industry","Client Care & Communication","Business Operations & Management","Advanced Care & Business Growth"],
};

export function ProgramDetailPage({slug}:{slug:string}){
  const program=leashedPrograms.find(x=>x.slug===slug);
  if(!program)return null;
  const terms=programTermNames[program.code as keyof typeof programTermNames];
  const icons=[PawPrint,Heart,ShieldCheck,BriefcaseBusiness,UsersRound];
  return <main className="public-site secondary-page program-full-page">
    <Hero active={program.category==="Training"?"Training":"Academy"} eyebrow={`${program.category.toUpperCase()} · ${program.code}`} title={program.title} copy={program.description} image={program.image} script={"Real skills.\nReal confidence.\nA stronger future."}/>
    <nav className="program-tabs secondary-shell">{["Overview","Curriculum","Outcomes","Requirements","FAQ"].map(x=><a href={`#${x.toLowerCase()}`} key={x}>{x}</a>)}</nav>
    <section id="overview" className="program-overview secondary-shell"><main><p className="public-eyebrow dark">PROGRAM OVERVIEW</p><h2>Program Overview</h2><p>This pathway combines sequenced instruction, hands-on practice, assessments, evidence review, professional development, and a pathway-specific capstone. Every stage builds real capability for animal-care work.</p><div className="program-capabilities">{icons.map((I,i)=><article key={i}><I/><span>{["Animal Care & Handling","Health & Safety","Client Communication","Career Readiness","Professional Practice"][i]}</span></article>)}</div></main><aside><div style={{backgroundImage:`url("${program.image}")`}}/><blockquote>“Build the knowledge, judgment, and confidence to do the work well.”</blockquote></aside></section>
    <section id="curriculum" className="program-curriculum secondary-shell"><main><p className="public-eyebrow dark">COMPLETE CURRICULUM</p><h2>Four Terms. One Complete Path.</h2><p>Each term builds on the last with progressive skills, applied practice, and real-world evidence.</p>{terms.map((term,i)=><article key={term}><div className="term-photo" style={{backgroundImage:`url("${program.image}")`}}/><div><small>TERM {i+1}</small><h3>{term}</h3><p>{Math.round(program.hours/4).toLocaleString()} hours · Guided learning, applied practice, and assessment</p><ul><li><Check/>Technical foundations</li><li><Check/>Safety and professional practice</li><li><Check/>Applied evidence and feedback</li></ul></div><span>{i+1}</span></article>)}</main>
      <aside className="program-sidebar"><section><h3>Total Program</h3><strong>{program.hours.toLocaleString()} Hours</strong><p>{program.weeks} Weeks · 4 Terms</p></section><section><h3>Program Breakdown</h3>{[["Technical Hours","60%"],["Business Hours","15%"],["Personal Development","10%"],["Applied Learning","15%"]].map(x=><div key={x[0]}><span>{x[0]}</span><b>{x[1]}</b></div>)}</section><section><h3>Delivery & Access</h3><p><Laptop/> Learning platform</p><p><UsersRound/> Instructor support</p><p><Wrench/> Hands-on practice</p><p><Award/> Progress assessments</p></section><section><h3>Completion Requirements</h3>{["Complete all required modules","Pass required assessments","Meet attendance requirements","Complete capstone evidence","Fulfill all safety gates"].map(x=><p key={x}><Check/>{x}</p>)}</section><Link href="/get-started">Enroll Now <ArrowRight/></Link></aside>
    </section>
    <section className="program-metrics secondary-shell">{[[CalendarDays,`${program.weeks}`,"Weeks"],[BookOpen,"4","Terms"],[Clock3,program.hours.toLocaleString(),"Clock Hours"],[Award,"1",program.credential]].map(([I,n,l])=>{const Icon=I as typeof Award;return <article key={String(l)}><Icon/><strong>{String(n)}</strong><span>{String(l)}</span></article>})}</section>
    <section className="secondary-cta"><div className="secondary-shell"><div><h2>Turn Your Passion Into a Professional Career.</h2><p>Build the skill. Prove the work. Earn the credential.</p></div><Link href="/get-started">Start This Program <ArrowRight/></Link></div></section><PublicFooter/>
  </main>;
}