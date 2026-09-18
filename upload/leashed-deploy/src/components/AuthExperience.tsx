"use client";

import Link from "next/link";
import {FormEvent, useState} from "react";
import {useRouter} from "next/navigation";
import {BrandLogo} from "@/components/BrandLogo";

export type OnboardingRole = "learner" | "instructor" | "organization";

const roleDestinations: Record<OnboardingRole, string> = {
  learner: "/dashboard/learner",
  instructor: "/dashboard/instructor",
  organization: "/dashboard/organization",
};

function AuthLogo({light = false}: {light?: boolean}) {
  return <BrandLogo light={light} className="auth-logo" />;
}

export function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function submit(event: FormEvent) {
    event.preventDefault();
    const role = (window.localStorage.getItem("leashed_role") || "learner") as OnboardingRole;
    if (remember) window.localStorage.setItem("leashed_email", email);
    router.push(roleDestinations[role] || roleDestinations.learner);
  }

  return (
    <main className="auth-split login-page">
      <section className="login-story" aria-label="Leashed learning">
        <div className="login-story-overlay" />
        <AuthLogo light />
        <div className="login-story-copy">
          <h1>Learn Today.<br />Build Tomorrow.</h1>
          <p>Access your courses, track your progress, and become the skilled professional animals and families can count on.</p>
        </div>
        <div className="login-benefits">
          {[
            ["◇", "Expert-Led", "Training"],
            ["♧", "Hands-On", "Skills"],
            ["▱", "Flexible", "Learning"],
            ["♡", "Support", "When You Need It"],
          ].map(([icon, a, b]) => <div key={a}><span>{icon}</span><strong>{a}<br />{b}</strong></div>)}
        </div>
      </section>
      <section className="auth-form-side">
        <Link className="auth-help" href="/support">♬ &nbsp; Need Help? &nbsp; →</Link>
        <form className="login-form" onSubmit={submit}>
          <AuthLogo />
          <h1>Welcome Back</h1>
          <p className="auth-lead">Sign in to your account to continue your<br />learning journey.</p>
          <label>Email Address
            <span className="auth-input"><i>✉</i><input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" /></span>
          </label>
          <label>Password
            <span className="auth-input"><i>▢</i><input type={showPassword ? "text" : "password"} required value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" /><button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "Hide password" : "Show password"}>◉</button></span>
          </label>
          <div className="auth-form-row">
            <label className="auth-check"><input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} /> Remember me</label>
            <Link href="/support">Forgot your password?</Link>
          </div>
          <button className="auth-primary" type="submit">Sign In <span>→</span></button>
          <div className="auth-divider"><span>or</span></div>
          <button className="auth-google" type="button" onClick={() => router.push(roleDestinations.learner)}><b>G</b> Continue with Google</button>
          <p className="auth-account-link">Don&apos;t have an account? <Link href="/get-started">Create your account &nbsp; →</Link></p>
          <p className="auth-security">♢ &nbsp; Your data is safe with us. We use industry-leading<br />security to protect your information.</p>
        </form>
      </section>
    </main>
  );
}

const roles: Array<{id: OnboardingRole; icon: string; title: string; copy: string}> = [
  {id: "learner", icon: "♙", title: "Learner", copy: "I’m here to take a course, earn a credential, or build new skills."},
  {id: "instructor", icon: "◇", title: "Instructor", copy: "I teach, mentor, or create course content."},
  {id: "organization", icon: "▦", title: "Organization Admin", copy: "I manage a program, cohort, or organization."},
];

export function GetStartedPage() {
  const router = useRouter();
  const [role, setRole] = useState<OnboardingRole>("learner");

  function continueJourney() {
    window.localStorage.setItem("leashed_role", role);
    router.push(`/onboarding/${role}/welcome`);
  }

  return (
    <main className="auth-split get-started-page">
      <section className="journey-story">
        <AuthLogo />
        <Link className="back-login" href="/login">← &nbsp; Back to Login</Link>
        <div className="journey-copy">
          <p className="auth-eyebrow">WELCOME TO LEASHED</p>
          <h1>Your Journey<br />Starts Here.</h1>
          <p>Choose your role to get started. We&apos;ll personalize your experience, resources, and support based on your goals.</p>
          <ul>
            <li><span>◇</span><div><strong>Learn</strong><small>Expert-led training and hands-on practice.</small></div></li>
            <li><span>▥</span><div><strong>Grow</strong><small>Build real-world skills and confidence.</small></div></li>
            <li><span>♡</span><div><strong>Belong</strong><small>A supportive community that cares.</small></div></li>
            <li><span>♧</span><div><strong>Build Your Future</strong><small>Turn your passion for animals into a meaningful career.</small></div></li>
          </ul>
        </div>
        <p className="journey-script">Better People.<br />Healthier Pets.<br />Stronger Communities.</p>
      </section>
      <section className="role-select">
        <ProgressSteps labels={["Role", "Account", "Profile", "Complete"]} active={0} />
        <div className="role-select-content">
          <h1>Which best describes you?</h1>
          <p>Tell us who you are so we can set up the right<br />experience for you.</p>
          <div className="role-card-grid">
            {roles.map(item => (
              <button key={item.id} className={role === item.id ? "selected" : ""} onClick={() => setRole(item.id)}>
                <span>{item.icon}</span>
                <strong>{item.title}</strong>
                <small>{item.copy}</small>
                {role === item.id && <i>✓</i>}
              </button>
            ))}
          </div>
          <button className="auth-primary" onClick={continueJourney}>Continue <span>→</span></button>
          <p className="auth-security">♢ &nbsp; Your information is safe with us. We use industry-standard<br />security to protect your data.</p>
        </div>
      </section>
    </main>
  );
}

export function ProgressSteps({labels, active}: {labels: string[]; active: number}) {
  return (
    <ol className="auth-progress" aria-label={`Step ${active + 1} of ${labels.length}`}>
      {labels.map((label, index) => (
        <li key={label} className={index <= active ? "active" : ""}>
          <span>{index + 1}</span><small>{label}</small>
        </li>
      ))}
    </ol>
  );
}