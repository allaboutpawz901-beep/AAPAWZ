import Link from "next/link";
import {
  ArrowRight,
  Award,
  BriefcaseBusiness,
  Building2,
  Cat,
  Check,
  ClipboardCheck,
  GraduationCap,
  Heart,
  PawPrint,
  Scissors,
  Store,
} from "lucide-react";
import {PublicFooter, PublicHeader} from "@/components/PublicHome";

const steps = [
  {number:"1",title:"Choose Your\nProgram",copy:"Start with the program that fits your goals and passion.",Icon:GraduationCap},
  {number:"2",title:"Get Trained",copy:"Learn from expert instructors through hands-on, real-world training.",Icon:PawPrint},
  {number:"3",title:"Earn Your\nCertification",copy:"Graduate with industry-recognized credentials and practical experience.",Icon:ClipboardCheck},
  {number:"4",title:"Launch Your Career",copy:"Step into a job, start your own business, or continue your education.",Icon:BriefcaseBusiness},
];

const programs = [
  {title:"Intensive Professional\nDog Groomer",copy:"Build your grooming skills and earn certification.",image:"/leashed-assets/pathway-fresh/pathway-program-groomer.webp",href:"/programs/intensive-professional-dog-groomer",Icon:PawPrint},
  {title:"Professional Pet Sitter\n(SIT)",copy:"Gain hands-on experience and client care skills.",image:"/leashed-assets/pathway-fresh/pathway-program-sitter.webp",href:"/programs/professional-pet-sitter",Icon:ClipboardCheck},
  {title:"Animal Care Assistant\n(DB)",copy:"Learn core animal care and handling skills.",image:"/leashed-assets/pathway-fresh/pathway-program-care.webp",href:"/programs/animal-care-assistant",Icon:Heart},
  {title:"Professional Cat Groomer\n(CAT)",copy:"Specialize in feline care and grooming techniques.",image:"/leashed-assets/pathway-fresh/pathway-program-cat.webp",href:"/programs/professional-cat-groomer",Icon:Cat},
  {title:"Complete Professional\nPet Care (CPP)",copy:"Learn business, operations, and management skills.",image:"/leashed-assets/pathway-fresh/pathway-program-business.webp",href:"/programs/complete-professional-pet-care",Icon:Building2},
];

const careers = [
  {title:"Pet Groomer",copy:"Work in salons, mobile units, or start your own.",Icon:PawPrint,href:"/programs/intensive-professional-dog-groomer"},
  {title:"Pet Sitter",copy:"Provide care in clients’ homes or specialized pet care services.",Icon:Heart,href:"/programs/professional-pet-sitter"},
  {title:"Animal Care Technician",copy:"Work in shelters, vet clinics, zoos, or animal facilities.",Icon:BriefcaseBusiness,href:"/programs/animal-care-assistant"},
  {title:"Business Owner",copy:"Launch and grow your own pet care business.",Icon:Store,href:"/programs/complete-professional-pet-care"},
];

const stories = [
  {quote:"“The hands-on training and support from the instructors gave me the confidence to start my own grooming business.”",name:"— Emily R.",program:"PPC Graduate",image:"/leashed-assets/pathway-fresh/pathway-story-groomer.webp"},
  {quote:"“LEASHED gave me the skills and connections I needed to go from volunteer to professional pet care provider.”",name:"— Marcus L.",program:"SIT Graduate",image:"/leashed-assets/pathway-fresh/pathway-story-care.webp"},
  {quote:"“I never thought I could turn my love for animals into a career. LEASHED made it possible.”",name:"— Taylor S.",program:"Cat Groomer Graduate",image:"/leashed-assets/pathway-fresh/pathway-story-cat.webp"},
];

export function PathwayPage() {
  return (
    <main className="public-site pathway-exact-page">
      <PublicHeader active="Pathway" />

      <section className="pathway-hero">
        <div className="pathway-hero-photo" />
        <div className="pathway-hero-shade" />
        <div className="pathway-hero-copy">
          <p className="public-eyebrow">YOUR CAREER PATH. OUR GUIDANCE.</p>
          <h1>The LEASHED<br />Career Pathway.</h1>
          <p>From your first lesson to your dream career, LEASHED&apos;s Pathway gives you the roadmap, support, and real-world opportunities to turn your passion for animals into a rewarding, long-term career.</p>
          <div className="pathway-hero-steps">
            {steps.map((step,index)=><article key={step.number}><step.Icon aria-hidden="true" /><span>{step.title.replace("\n"," ")}</span>{index<steps.length-1&&<ArrowRight className="pathway-step-arrow" aria-hidden="true" />}</article>)}
          </div>
        </div>
        <p className="public-handwritten pathway-hero-script">Real Training.<br />Real Experience.<br />Real Opportunities.</p>
      </section>

      <section className="pathway-steps-section">
        <div className="pathway-steps-inner">
          <div className="pathway-steps-main">
            <p className="public-eyebrow dark">THE LEASHED PATHWAY</p>
            <h2>Your Pathway, Step by Step</h2>
            <p>We&apos;ve designed a clear, supportive path to help you build your skills, gain hands-on experience, earn your certifications, and launch a career in the pet care industry.</p>
            <div className="pathway-step-grid">
              {steps.map((step,index)=><article key={step.number}>
                <div><b>{step.number}</b><step.Icon aria-hidden="true" /></div>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
                {index<steps.length-1&&<ArrowRight className="pathway-grid-arrow" aria-hidden="true" />}
              </article>)}
            </div>
          </div>
          <aside className="pathway-quote-card">
            <div />
            <blockquote>“LEASHED didn&apos;t just teach me a skill —<br />it gave me a future.”</blockquote>
            <cite>— Madison T.<br />PPC Graduate</cite>
            <Link href="/pathway">Explore the Full Pathway <ArrowRight aria-hidden="true" /></Link>
          </aside>
        </div>
      </section>

      <section className="pathway-programs">
        <div className="pathway-programs-inner">
          <div className="pathway-program-intro">
            <p className="public-eyebrow">FEATURED PATHWAY PROGRAMS</p>
            <h2>Pathway Programs</h2>
            <p>Each program is part of a larger career pathway, with clear progression, hands-on training, and real-world outcomes.</p>
            <Link href="/courses">View All Programs <ArrowRight aria-hidden="true" /></Link>
          </div>
          <div className="pathway-program-grid">
            {programs.map(program=><Link href={program.href} className="pathway-program-card" key={program.title}>
              <div style={{backgroundImage:`url("${program.image}")`}} />
              <span><program.Icon aria-hidden="true" /></span>
              <h3>{program.title}</h3>
              <p>{program.copy}</p>
              <b>View Program <ArrowRight aria-hidden="true" /></b>
            </Link>)}
          </div>
        </div>
      </section>

      <section className="pathway-careers">
        <div className="pathway-careers-inner">
          <div className="pathway-careers-intro">
            <p className="public-eyebrow dark">CAREER OUTCOMES</p>
            <h2>Real Opportunities</h2>
            <p>Graduates of LEASHED go on to work in a variety of roles — from pet care professionals to business owners. Your future is as flexible as your passion.</p>
            <Link href="/courses">Explore Career Paths <ArrowRight aria-hidden="true" /></Link>
          </div>
          <div className="pathway-career-grid">
            {careers.map(career=><article key={career.title}>
              <career.Icon aria-hidden="true" />
              <h3>{career.title}</h3>
              <p>{career.copy}</p>
              <Link href={career.href}>View Program <ArrowRight aria-hidden="true" /></Link>
            </article>)}
          </div>
        </div>
      </section>

      <section className="pathway-stories">
        <div className="pathway-stories-bg" />
        <div className="pathway-stories-inner">
          <div className="pathway-stories-intro">
            <p className="public-eyebrow">REAL STORIES</p>
            <h2>Student Success</h2>
            <p>Our graduates turn their training into meaningful careers, creating better lives for themselves and the animals they love.</p>
            <Link href="/about#stories">Read More Stories <ArrowRight aria-hidden="true" /></Link>
          </div>
          <div className="pathway-story-grid">
            {stories.map(story=><article key={story.name}>
              <div style={{backgroundImage:`url("${story.image}")`}} />
              <blockquote>{story.quote}</blockquote>
              <strong>{story.name}</strong>
              <small>{story.program}</small>
            </article>)}
          </div>
        </div>
      </section>

      <section className="pathway-cta">
        <div className="pathway-cta-inner">
          <div className="pathway-cta-mark"><PawPrint aria-hidden="true" /><strong>LEASHED<small>SKILLS. CONFIDENCE. CAREER.</small></strong></div>
          <div><h2>Your Future in Pet Care<br />Starts Here.</h2><p>Choose your program. Follow the pathway. Build the life you want.</p></div>
          <Link href="/courses">Explore All Programs <ArrowRight aria-hidden="true" /></Link>
        </div>
      </section>

      <PublicFooter />
    </main>
  );
}
