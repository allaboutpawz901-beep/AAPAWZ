import Link from "next/link";
import {
  ArrowRight,
  Award,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  GraduationCap,
  Heart,
  PawPrint,
  Scissors,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import {PublicFooter, PublicHeader} from "@/components/PublicHome";

const programs = [
  {
    title:"Dog Bather / Animal Care Assistant (DB)",
    meta:"35 Weeks  |  150 Modules  |  988 Hours",
    copy:"Build foundational skills in animal care, handling, bathing, and facility operations.",
    image:"/leashed-assets/training-fresh/training-program-bather.webp",
    href:"/programs/animal-care-assistant",
    Icon:PawPrint,
  },
  {
    title:"Intensive Professional Dog Groomer (PDG)",
    meta:"44 Weeks  |  212 Lessons  |  1,248 Hours",
    copy:"Master complete professional grooming practice, breed styling, safety, and client care.",
    image:"/leashed-assets/training-fresh/training-program-groomer.webp",
    href:"/programs/intensive-professional-dog-groomer",
    Icon:Scissors,
  },
  {
    title:"Professional Cat Groomer (CAT)",
    meta:"4 Weeks  |  Credential Pathway  |  58 Hours",
    copy:"Learn feline behavior, safe handling, coat care, grooming, and client communication.",
    image:"/leashed-assets/training-fresh/training-program-cat.webp",
    href:"/programs/professional-cat-groomer",
    Icon:ShieldCheck,
  },
  {
    title:"Complete Professional Pet Care (CPP)",
    meta:"52 Weeks  |  Advanced Diploma  |  1,500 Hours",
    copy:"Combine pet care, grooming, training, operations, entrepreneurship, and capstone skills.",
    image:"/leashed-assets/training-fresh/training-program-business.webp",
    href:"/programs/complete-professional-pet-care",
    Icon:Award,
  },
];

const learnItems = [
  {title:"Animal Handling\n& Behavior",copy:"Learn safe, effective handling techniques for different species and temperaments.",Icon:PawPrint},
  {title:"Grooming Techniques",copy:"Master breed-specific grooming, bathing, trimming, and styling methods.",Icon:Scissors},
  {title:"Health & Safety",copy:"Understand animal health, first aid, and safety protocols in the workplace.",Icon:ShieldCheck},
  {title:"Industry Readiness",copy:"Build communication, customer service, and professionalism skills for real-world success.",Icon:BriefcaseBusiness},
];

const stories = [
  {
    quote:"“LEASHED gave me the skills and confidence to start my dream career. The hands-on training made all the difference!”",
    name:"Jessica T.",
    program:"Dog Groomer Graduate",
    image:"/leashed-assets/training-fresh/training-story-groomer.webp",
  },
  {
    quote:"“The instructors are amazing and the support is real. I went from student to full-time pet care professional in under a year.”",
    name:"Marcus L.",
    program:"Pet Care Graduate",
    image:"/leashed-assets/training-fresh/training-story-care.webp",
  },
  {
    quote:"“I never imagined I’d be grooming cats, but LEASHED made it possible. The training is top-notch!”",
    name:"Taylor R.",
    program:"Cat Groomer Graduate",
    image:"/leashed-assets/training-fresh/training-story-cat.webp",
  },
];

export function TrainingPage() {
  return (
    <main className="public-site training-exact-page">
      <PublicHeader active="Training" />

      <section className="training-master-hero">
        <div className="training-master-photo" />
        <div className="training-master-shade" />
        <div className="training-hero-copy">
          <p className="public-eyebrow">TRAINING</p>
          <h1>Hands-On Training.<br />Real-World Skills.</h1>
          <p>LEASHED&apos;s training programs give you practical, in-person experience with expert instructors and industry-standard equipment. You&apos;ll build the skills, confidence, and professionalism to succeed in the pet care industry.</p>
          <div className="training-hero-features">
            <article><PawPrint aria-hidden="true" /><div><strong>Expert Instructors</strong><span>Industry professionals<br />with real-world experience.</span></div></article>
            <article><GraduationCap aria-hidden="true" /><div><strong>Hands-On Learning</strong><span>Work with real animals,<br />not just theory.</span></div></article>
            <article><UsersRound aria-hidden="true" /><div><strong>Small Class Sizes</strong><span>More time, more support,<br />better results.</span></div></article>
            <article><UsersRound aria-hidden="true" /><div><strong>Career Support</strong><span>Job placement and<br />resume guidance.</span></div></article>
          </div>
        </div>
        <p className="public-handwritten training-hero-script">Real Animals.<br />Real Skills.<br />Real Careers.</p>
      </section>

      <section className="training-programs-section">
        <div className="training-programs-inner">
          <div className="training-programs-main">
            <p className="public-eyebrow dark">TRAINING PROGRAMS</p>
            <h2>Choose Your Path</h2>
            <p className="training-programs-lede">Our hands-on training programs are designed to give you the practical skills, industry knowledge, and confidence to succeed in the pet care industry.</p>
            <div className="training-program-card-grid">
              {programs.map(program=>(
                <Link className="training-program-card" href={program.href} key={program.title}>
                  <div className="training-program-photo" style={{backgroundImage:`url("${program.image}")`}} />
                  <span className="training-program-icon"><program.Icon aria-hidden="true" /></span>
                  <h3>{program.title}</h3>
                  <small>{program.meta}</small>
                  <p>{program.copy}</p>
                  <b>Learn More <ArrowRight aria-hidden="true" /></b>
                </Link>
              ))}
            </div>
          </div>

          <aside className="training-program-sidebar">
            <div className="training-why">
              <h3><PawPrint aria-hidden="true" /> Why Train<br />with LEASHED?</h3>
              <ul>
                {["Real-world, hands-on training","Industry-experienced instructors","Modern facilities & equipment","Flexible scheduling options","Career placement support","Nationally recognized credentials"].map(item=><li key={item}><Check aria-hidden="true" />{item}</li>)}
              </ul>
            </div>
            <div className="training-sidebar-quote">
              <div aria-hidden="true" />
              <p className="public-handwritten">SKILLS<br />CONFIDENCE<br />CAREER</p>
            </div>
            <div className="training-ready">
              <CalendarDays aria-hidden="true" />
              <div><h3>Ready to Get Started?</h3><p>Explore our training programs, find the right fit for your goals, and take the first step toward your new career.</p><Link href="/courses">View All Programs <ArrowRight aria-hidden="true" /></Link></div>
            </div>
          </aside>
        </div>
      </section>

      <section className="training-learn-section">
        <div className="training-learn-inner">
          <div className="training-learn-intro">
            <p className="public-eyebrow dark">TRAINING PROGRAM DETAILS</p>
            <h2>What You&apos;ll Learn</h2>
            <p>Each training program includes a structured curriculum with hands-on practice, live animal experience, and industry-standard techniques. You&apos;ll gain the skills and knowledge employers are looking for — and the confidence to succeed from day one.</p>
            <Link href="/courses">View Curriculum <ArrowRight aria-hidden="true" /></Link>
          </div>
          <div className="training-learn-grid">
            {learnItems.map(item=>(
              <article key={item.title}>
                <item.Icon aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="training-stories">
        <div className="training-stories-bg" />
        <div className="training-stories-inner">
          <div className="training-stories-intro">
            <p className="public-eyebrow">REAL STUDENT STORIES</p>
            <h2>From Training to Career</h2>
            <p>Hear from our graduates who turned their passion for animals into rewarding careers with LEASHED.</p>
            <Link href="/about#stories">Read More Stories <ArrowRight aria-hidden="true" /></Link>
          </div>
          <div className="training-story-grid">
            {stories.map(story=>(
              <article key={story.name}>
                <div style={{backgroundImage:`url("${story.image}")`}} />
                <blockquote>{story.quote}</blockquote>
                <strong>{story.name}</strong>
                <small>{story.program}</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="training-cta">
        <div className="training-cta-inner">
          <div className="training-cta-brand">
            <PawPrint aria-hidden="true" />
            <span>LEASHED<small>SKILLS. CONFIDENCE. CAREER.</small></span>
          </div>
          <div><h2>Your Future in Pet Care<br />Starts with Training.</h2><p>Gain the skills. Build your confidence. Create the career you want.</p></div>
          <Link href="/training">Explore All Training Programs <ArrowRight aria-hidden="true" /></Link>
        </div>
      </section>

      <PublicFooter />
    </main>
  );
}
