import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  Cat,
  ClipboardList,
  GraduationCap,
  Heart,
  PawPrint,
  PlaySquare,
  Scissors,
  ShieldPlus,
} from "lucide-react";
import {PublicFooter, PublicHeader} from "@/components/PublicHome";

type Card = {
  title: string;
  copy: string;
  image: string;
  href: string;
  Icon: typeof PawPrint;
};

const academyCards: Card[] = [
  {title:"Full Programs",copy:"Complete, structured programs for your career goals.",image:"/leashed-assets/academy-fresh/academy-learn-programs.webp",href:"/courses",Icon:CalendarDays},
  {title:"Learning Modules",copy:"Focused lessons for real-world skills.",image:"/leashed-assets/academy-fresh/academy-learning-modules.webp",href:"/courses",Icon:BookOpen},
  {title:"Resources & Library",copy:"Tools, guides, and bonus materials.",image:"/leashed-assets/academy-fresh/academy-resources-library.webp",href:"/resources",Icon:PlaySquare},
];

const trainingCards: Card[] = [
  {title:"Grooming Training",copy:"Master the art of professional grooming.",image:"/leashed-assets/academy-fresh/academy-grooming-training.webp",href:"/training",Icon:Scissors},
  {title:"Animal Care Training",copy:"Build care and handling skills.",image:"/leashed-assets/academy-fresh/academy-animal-care.webp",href:"/training",Icon:PawPrint},
  {title:"Pet Health & Safety",copy:"Learn to recognize and respond to health needs.",image:"/leashed-assets/academy-fresh/academy-health-safety.webp",href:"/training",Icon:Heart},
];

const pathwayCards: Card[] = [
  {title:"Career Guidance",copy:"Plan your journey with expert support.",image:"/leashed-assets/academy-fresh/academy-career-guidance.webp",href:"/pathway",Icon:Award},
  {title:"Job Placement",copy:"Connect with employers and opportunities.",image:"/leashed-assets/academy-fresh/academy-job-placement.webp",href:"/pathway",Icon:ClipboardList},
  {title:"Alumni Success",copy:"Real stories. Real careers.",image:"/leashed-assets/academy-fresh/academy-alumni-success.webp",href:"/about#stories",Icon:GraduationCap},
];

const courseCards: Card[] = [
  {title:"Pet Grooming",copy:"Learn professional techniques.",image:"/leashed-assets/academy-fresh/academy-course-grooming.webp",href:"/courses",Icon:Scissors},
  {title:"Pet Sitting",copy:"Build trust and confidence.",image:"/leashed-assets/academy-fresh/academy-course-sitting.webp",href:"/courses",Icon:Heart},
  {title:"First Aid & Safety",copy:"Be prepared for anything.",image:"/leashed-assets/academy-fresh/academy-course-safety.webp",href:"/courses",Icon:ShieldPlus},
  {title:"Business Ownership",copy:"Turn your passion into a business.",image:"/leashed-assets/academy-fresh/academy-course-business.webp",href:"/courses",Icon:BriefcaseBusiness},
];

function FeatureCard({card}:{card:Card}) {
  return (
    <Link className="academy-feature-card" href={card.href}>
      <div className="academy-card-photo" style={{backgroundImage:`url("${card.image}")`}} />
      <div className="academy-card-copy">
        <span className="academy-card-icon"><card.Icon aria-hidden="true" /></span>
        <h3>{card.title}</h3>
        <p>{card.copy}</p>
      </div>
    </Link>
  );
}

function AcademyBand({
  kind,
  eyebrow,
  title,
  copy,
  cards,
  href,
  Icon,
}:{
  kind:"academy"|"training"|"pathway"|"courses";
  eyebrow:string;
  title:string;
  copy:string;
  cards:Card[];
  href:string;
  Icon:typeof PawPrint;
}) {
  return (
    <section className={`academy-band academy-band-${kind}`}>
      <div className="academy-band-inner">
        <div className="academy-band-intro">
          <div className="academy-band-label"><Icon aria-hidden="true" /><span>{eyebrow}</span></div>
          <h2>{title}</h2>
          <p>{copy}</p>
          <Link className={kind==="training"||kind==="courses"?"academy-light-button":"academy-dark-button"} href={href}>
            See More <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <div className={`academy-card-grid academy-card-grid-${cards.length}`}>
          {cards.map(card=><FeatureCard key={card.title} card={card} />)}
        </div>
        <Link className="academy-side-link" href={href}>See More <ArrowRight aria-hidden="true" /></Link>
        <Icon className="academy-watermark" aria-hidden="true" />
      </div>
    </section>
  );
}

export function AcademyPage() {
  return (
    <main className="public-site academy-exact-page">
      <PublicHeader active="Academy" />

      <section className="academy-master-hero">
        <div className="academy-master-photo" />
        <div className="academy-master-shade" />
        <div className="academy-hero-copy">
          <p className="public-eyebrow">REAL SKILLS. MEANINGFUL CAREERS.</p>
          <h1>Professional Pet Care<br />Education &amp; Career Training</h1>
          <p>LEASHED provides industry-leading education, hands-on training, and career pathways for those who want to work with animals, make a difference, and build a future they&apos;re proud of.</p>
          <div className="academy-hero-features">
            <article><PawPrint aria-hidden="true" /><div><strong>Expert Instructors</strong><span>Real-World Experience</span></div></article>
            <article><GraduationCap aria-hidden="true" /><div><strong>Hands-On Training</strong><span>Build Real Skills</span></div></article>
            <article><Award aria-hidden="true" /><div><strong>Career Support</strong><span>From Training to Job</span></div></article>
            <article><Heart aria-hidden="true" /><div><strong>A Kinder Tomorrow</strong><span>For Animals &amp; People</span></div></article>
          </div>
        </div>
        <p className="public-handwritten academy-hero-script">Better Care.<br />Stronger Skills.<br />Brighter Futures.</p>
      </section>

      <AcademyBand
        kind="academy"
        eyebrow="ACADEMY"
        title={"Learn at Your Pace.\nOn Your Terms."}
        copy="The LEASHED Academy offers structured, self-paced learning designed for real-world success. Explore expert-led lessons, interactive content, and resources to build your knowledge and confidence."
        cards={academyCards}
        href="/courses"
        Icon={GraduationCap}
      />
      <AcademyBand
        kind="training"
        eyebrow="TRAINING"
        title={"Hands-On Training.\nReal-World Skills."}
        copy="Get practical experience with expert instructors and industry-standard equipment. Our training programs prepare you for the demands of the pet care industry with confidence and skill."
        cards={trainingCards}
        href="/training"
        Icon={PawPrint}
      />
      <AcademyBand
        kind="pathway"
        eyebrow="PATHWAY"
        title={"Your Career.\nOur Roadmap."}
        copy="From your first lesson to your first job, LEASHED’s career pathway gives you the guidance, support, and opportunities to turn your passion into a profession."
        cards={pathwayCards}
        href="/pathway"
        Icon={Award}
      />
      <AcademyBand
        kind="courses"
        eyebrow="COURSES"
        title={"Specialized Learning.\nReal-World Impact."}
        copy="Browse our individual courses designed to build specific skills, earn certifications, and advance your career in the pet care industry."
        cards={courseCards}
        href="/courses"
        Icon={BookOpen}
      />

      <PublicFooter />
    </main>
  );
}
