import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  Cat,
  Check,
  Clock3,
  GraduationCap,
  Heart,
  Instagram,
  Laptop,
  Linkedin,
  PawPrint,
  Scissors,
  Search,
  ShieldCheck,
  UsersRound,
  Youtube,
} from "lucide-react";
import {BrandLogo} from "@/components/BrandLogo";

const nav = [
  ["Home", "/"],
  ["Academy", "/academy"],
  ["Training", "/training"],
  ["Pathway", "/pathway"],
  ["Software", "/software"],
  ["Pricing", "/pricing"],
  ["About", "/about"],
  ["Resources", "/resources"],
  ["Support", "/support"],
] as const;

const programs = [
  {
    title: "Intensive Professional Dog Groomer",
    meta: "44 Weeks  |  1,112 Hours",
    image: "/leashed-assets/homepage-fresh/home-fresh-groomer.webp",
    href: "/programs/intensive-professional-dog-groomer",
    Icon: Scissors,
  },
  {
    title: "Professional Pet Sitter (SIT)",
    meta: "39 Weeks  |  640 Hours",
    image: "/leashed-assets/homepage-fresh/home-fresh-sitter.webp",
    href: "/programs/professional-pet-sitter",
    Icon: Heart,
  },
  {
    title: "Professional Cat Groomer",
    meta: "24 Weeks  |  560 Hours",
    image: "/leashed-assets/homepage-fresh/home-fresh-cat.webp",
    href: "/programs/professional-cat-groomer",
    Icon: Cat,
  },
  {
    title: "Professional Pet Care & Business Ownership (PPC)",
    meta: "52 Weeks  |  1,024 Hours",
    image: "/leashed-assets/homepage-fresh/home-fresh-business.webp",
    href: "/programs/complete-professional-pet-care",
    Icon: BriefcaseBusiness,
  },
] as const;

function Brand({footer = false}: {footer?: boolean}) {
  return <BrandLogo light tagline className={`public-brand${footer ? " public-brand-footer" : ""}`} />;
}

function XIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="17" height="17" fill="none">
      <path d="M4 3.5 19.5 20.5M19.5 3.5 4 20.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function PublicHeader({active = "Home"}: {active?: string}) {
  return (
    <header className="public-header">
      <div className="public-header-inner">
        <Brand />
        <nav aria-label="Public navigation">
          {nav.map(([label, href]) => (
            <Link key={href} className={label === active ? "active" : ""} href={href}>{label}</Link>
          ))}
        </nav>
        <div className="public-header-actions">
          <Link className="public-search-link" href="/courses" aria-label="Search Leashed">
            <Search aria-hidden="true" size={18} strokeWidth={1.7} />
          </Link>
          <Link className="public-signin-button" href="/login">Sign In</Link>
          <Link className="public-peach-button compact" href="/get-started">Get Started</Link>
        </div>
      </div>
    </header>
  );
}

export function PublicFooter() {
  return (
    <footer className="public-footer">
      <div className="public-footer-inner">
        <Brand footer />
        <nav aria-label="Footer navigation">
          {nav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        </nav>
        <div className="public-socials" aria-label="Social links">
          <a href="https://instagram.com" aria-label="Instagram"><Instagram aria-hidden="true" /></a>
          <a href="https://youtube.com" aria-label="YouTube"><Youtube aria-hidden="true" /></a>
          <a href="https://x.com" aria-label="X"><XIcon /></a>
          <a href="https://linkedin.com" aria-label="LinkedIn"><Linkedin aria-hidden="true" /></a>
        </div>
      </div>
      <div className="public-copyright">© 2025 Leashed. All rights reserved.</div>
    </footer>
  );
}

export function PublicHome() {
  return (
    <main className="public-site public-home">
      <PublicHeader />

      <section className="public-home-hero">
        <div className="public-home-hero-image" />
        <div className="public-home-hero-shade" />
        <div className="public-shell public-home-hero-copy">
          <p className="public-eyebrow">PROFESSIONAL PET CARE EDUCATION</p>
          <h1>Real Skills.<br />Meaningful Careers.</h1>
          <p>LEASHED provides industry-leading education and training for those who want to turn their love for animals into a professional career. Whether you&apos;re just starting or looking to grow, we give you the skills, confidence, and support to succeed.</p>
          <Link className="public-peach-button" href="/academy">Explore Our Programs <ArrowRight aria-hidden="true" size={16} /></Link>
        </div>
        <p className="public-handwritten hero-script">Better Care.<br />Stronger Skills.<br />Brighter Futures.</p>
      </section>

      <section className="public-programs public-section">
        <div className="public-shell public-programs-grid">
          <div className="public-section-intro">
            <p className="public-eyebrow dark">OUR PROGRAMS</p>
            <h2>Find Your Path</h2>
            <p>Choose from our comprehensive, hands-on programs designed for real-world success. Each program combines expert instruction, practical training, and industry-recognized credentials.</p>
            <Link className="public-text-link" href="/courses">View All Programs <ArrowRight aria-hidden="true" size={16} /></Link>
          </div>
          <div className="public-program-card-grid">
            {programs.map((program) => (
              <Link className="public-program-card" href={program.href} key={program.href}>
                <div className="public-program-image" style={{backgroundImage: `url("${program.image}")`}} />
                <span className="public-program-icon" aria-hidden="true"><program.Icon /></span>
                <h3>{program.title}</h3>
                <p>{program.meta}</p>
                <span className="public-card-arrow" aria-hidden="true"><ArrowRight /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="public-benefits">
        <div className="public-shell public-benefit-grid">
          {[
            [PawPrint, "Hands-On Training", "Real pets. Real skills."],
            [GraduationCap, "Expert Instructors", "Industry professionals", "with real-world experience."],
            [ShieldCheck, "Industry Credentials", "Earn recognized", "certifications."],
            [UsersRound, "Career Support", "Job placement, resume help,", "& ongoing guidance."],
            [Laptop, "Flexible Learning", "Online + in-person options", "to fit your life."],
          ].map(([Icon, title, ...lines]) => {
            const BenefitIcon = Icon as typeof PawPrint;
            return (
              <article key={String(title)}>
                <BenefitIcon aria-hidden="true" />
                <h3>{String(title)}</h3>
                <p>{lines.map((line, i) => <span key={String(line)}>{i > 0 && <br />}{String(line)}</span>)}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="public-launchpad public-section">
        <div className="public-launchpad-image" role="img" aria-label="A dog and cat representing professional animal care">
          <p className="public-handwritten launchpad-script">Every<br />animal<br />deserves<br />a great<br />caregiver.</p>
        </div>
        <div className="public-launchpad-copy">
          <p className="public-eyebrow dark">WHY LEASHED?</p>
          <h2>More Than a Program.<br />It&apos;s a Launchpad.</h2>
          <p>LEASHED isn&apos;t just about education — it&apos;s about creating opportunities. Our programs are built to give you the practical skills, professional credentials, and ongoing support you need to build a career you love.</p>
          <Link className="public-peach-button" href="/about">Learn More About LEASHED <ArrowRight aria-hidden="true" size={16} /></Link>
        </div>
        <ul className="public-launchpad-list">
          {[
            ["Flexible Learning Options", "Fit your goals and schedule."],
            ["Comprehensive Curriculum", "Taught by industry experts."],
            ["Real-World Experience", "Work with real animals, in real settings."],
            ["Career Placement Support", "Get connected with employers."],
            ["Lifetime Access to Resources", "Continue learning, anytime."],
          ].map(([title, text]) => (
            <li key={title}><span><Check aria-hidden="true" /></span><div><strong>{title}</strong><small>{text}</small></div></li>
          ))}
        </ul>
      </section>

      <section className="public-advantage">
        <div className="public-shell public-advantage-grid">
          <div className="public-advantage-copy">
            <p className="public-eyebrow dark">THE LEASHED ADVANTAGE</p>
            <h2>Build the Skills.<br />Create the Life You Want.</h2>
            <p>Our programs give you more than technical skills — they give you confidence, community, and a clear path to a rewarding career in the pet care industry.</p>
            <Link className="public-green-button" href="/courses">Explore All Programs <ArrowRight aria-hidden="true" size={16} /></Link>
          </div>
          <div className="public-stats">
            {[
              [PawPrint, "4", "Career-Focused", "Programs"],
              [GraduationCap, "155", "Total Modules", "(Across All Programs)"],
              [Clock3, "1,112", "Total Clock Hours", "(Program Hours)"],
              [UsersRound, "100%", "Focused on", "Your Success"],
            ].map(([Icon, value, l1, l2]) => {
              const StatIcon = Icon as typeof PawPrint;
              return <article key={String(value)}><StatIcon aria-hidden="true" /><strong>{String(value)}</strong><p>{String(l1)}<br />{String(l2)}</p></article>;
            })}
          </div>
          <div className="public-advantage-image" aria-hidden="true" />
        </div>
      </section>

      <section className="public-success">
        <div className="public-success-bg" />
        <blockquote>
          “LEASHED gave me the skills and confidence to turn my passion for animals into a career. The support and training are unmatched.”
          <cite>— SARAH M. &nbsp; | &nbsp; PPC GRADUATE</cite>
        </blockquote>
        <Link className="public-dark-outline" href="/about#stories">Read More Success Stories <ArrowRight aria-hidden="true" size={16} /></Link>
      </section>

      <PublicFooter />
    </main>
  );
}