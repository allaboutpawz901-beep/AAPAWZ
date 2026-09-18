"use client";

import Link from "next/link";
import {useEffect, useMemo, useState} from "react";
import {useRouter} from "next/navigation";
import type {OnboardingRole} from "@/components/AuthExperience";
import {BrandLogo} from "@/components/BrandLogo";

type Values = Record<string, string | boolean | string[]>;

const steps: Record<OnboardingRole, string[]> = {
  learner: ["welcome", "account", "role", "goals", "profile", "consent", "review", "complete"],
  instructor: ["welcome", "account", "profile", "skills", "training", "tour", "verification", "complete"],
  organization: ["welcome", "create", "details", "locations", "team", "permissions", "programs", "billing", "review", "complete"],
};

const roleLabels: Record<OnboardingRole, string> = {
  learner: "Learner",
  instructor: "Instructor",
  organization: "Organization",
};

const programs = [
  "Professional Pet Sitter",
  "Professional Cat Groomer",
  "Dog Bather / Animal Care Assistant",
  "Professional Dog Trainer",
  "Intensive Professional Dog Groomer",
  "Complete Professional Pet Care",
];

function Logo() {
  return <BrandLogo className="onboarding-logo" />;
}

function Field({label, name, value, type = "text", placeholder, onChange}: {
  label: string;
  name: string;
  value: string;
  type?: string;
  placeholder?: string;
  onChange: (name: string, value: string) => void;
}) {
  return (
    <label className="onboarding-field">{label}
      <input name={name} type={type} value={value} placeholder={placeholder} onChange={event => onChange(name, event.target.value)} />
    </label>
  );
}

function SelectField({label, name, value, options, onChange}: {
  label: string;
  name: string;
  value: string;
  options: string[];
  onChange: (name: string, value: string) => void;
}) {
  return (
    <label className="onboarding-field">{label}
      <select name={name} value={value} onChange={event => onChange(name, event.target.value)}>
        <option value="">Select an option</option>
        {options.map(option => <option key={option}>{option}</option>)}
      </select>
    </label>
  );
}

function Choice({selected, icon, title, copy, onClick, radio = false}: {
  selected: boolean;
  icon: string;
  title: string;
  copy: string;
  onClick: () => void;
  radio?: boolean;
}) {
  return (
    <button type="button" className={`onboarding-choice ${selected ? "selected" : ""}`} onClick={onClick}>
      <span className="choice-icon">{icon}</span>
      <span><strong>{title}</strong><small>{copy}</small></span>
      <i>{selected ? "✓" : radio ? "○" : "□"}</i>
    </button>
  );
}

export function OnboardingFlow({role, step}: {role: OnboardingRole; step: string}) {
  const router = useRouter();
  const sequence = steps[role];
  const index = Math.max(0, sequence.indexOf(step));
  const [values, setValues] = useState<Values>({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    location: "",
    bio: "",
    learnerRole: "Learner",
    goals: [],
    education: "",
    referral: "",
    under18: false,
    guardianEmail: "",
    guardianPhone: "",
    instructorRole: "Curriculum Instructor",
    expertise: ["Dog Grooming", "Dog Training", "Pet Sitting", "Animal Care", "Life Skills", "Business & Entrepreneurship"],
    organizationName: "",
    organizationType: "",
    website: "",
    organizationDescription: "",
    locationName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    team: ["Jane Smith — Organization Admin", "Mike Roberts — Instructor", "Lisa Turner — Support Navigator"],
    permissions: ["Organization Admin", "Instructor", "Support Navigator", "Learner"],
    programs: programs.slice(0, 3),
    billingMethod: "Credit / Debit Card",
    billingName: "",
    billingEmail: "",
  });

  useEffect(() => {
    const saved = window.localStorage.getItem(`leashed_onboarding_${role}`);
    if (saved) {
      try { setValues(current => ({...current, ...JSON.parse(saved)})); } catch {}
    }
    window.localStorage.setItem("leashed_role", role);
  }, [role]);

  const setValue = (name: string, value: string | boolean | string[]) => {
    setValues(current => {
      const next = {...current, [name]: value};
      window.localStorage.setItem(`leashed_onboarding_${role}`, JSON.stringify(next));
      return next;
    });
  };

  const toggleList = (name: string, item: string) => {
    const current = (values[name] as string[]) || [];
    setValue(name, current.includes(item) ? current.filter(value => value !== item) : [...current, item]);
  };

  const progress = ((index + 1) / sequence.length) * 100;
  const next = () => {
    if (index < sequence.length - 1) router.push(`/onboarding/${role}/${sequence[index + 1]}`);
    else router.push(`/dashboard/${role}`);
  };
  const back = () => {
    if (index > 0) router.push(`/onboarding/${role}/${sequence[index - 1]}`);
    else router.push("/get-started");
  };

  const title = useMemo(() => {
    const map: Record<string, string> = {
      account: "Create Your Account",
      role: "What best describes you?",
      goals: "What are your learning goals?",
      profile: role === "instructor" ? "Tell Us About You" : "Tell us about yourself",
      consent: "Guardian & Consent",
      review: role === "organization" ? "Review & Confirm" : "Review Your Information",
      skills: "Select Your Role & Skills",
      training: "Complete Your Training",
      tour: "Take a Tour",
      verification: "Verify Your Information",
      create: "Create Your Organization",
      details: "Organization Details",
      locations: "Add Your Locations",
      team: "Invite Team Members",
      permissions: "Set Up Roles & Permissions",
      programs: "Choose Your Programs",
      billing: "Billing & Payment",
    };
    return map[step] || "";
  }, [role, step]);

  if (step === "welcome") {
    const welcomeTitle = role === "learner" ? "Welcome to Leashed!" : role === "instructor" ? "Welcome to Leashed, Instructor!" : "Welcome to Leashed, Organization!";
    const welcomeCopy = role === "learner"
      ? "Your journey to a rewarding career in animal care, grooming, and business starts here."
      : role === "instructor"
        ? "You’re joining a mission-driven team that changes lives — one learner, one skill, and one pet at a time."
        : "Empower your team, support your learners, and build a stronger future for animal care.";
    const bullets = role === "learner"
      ? [["◇", "Build Real Skills", "Hands-on training + expert instructors"], ["♧", "Earn Your Credential", "Get certified and job ready"], ["♙", "Get Support", "Coaches, mentors, and a community"], ["♡", "Create Your Future", "From career to business ownership"]]
      : role === "instructor"
        ? [["◇", "Teach with Purpose", "Help build the next generation"], ["♧", "Make an Impact", "Support learners and communities"], ["♡", "Grow Your Career", "Access tools, resources, and community"]]
        : [["♙", "Manage your team", "Invite, assign roles, and track progress"], ["▣", "Track learning", "Monitor courses, certifications, credentials"], ["♧", "Drive real outcomes", "From training to employment"]];
    return (
      <main className={`onboarding-welcome onboarding-welcome-${role}`}>
        <div className="onboarding-welcome-bg" />
        <div className="onboarding-welcome-shade" />
        <div className="onboarding-welcome-content">
          <Logo />
          <span className="onboarding-count">1 of {sequence.length}</span>
          <h1>{welcomeTitle}</h1>
          <p>{welcomeCopy}</p>
          <div className="welcome-benefits">
            {bullets.map(([icon, heading, copy]) => <article key={heading}><span>{icon}</span><div><strong>{heading}</strong><small>{copy}</small></div></article>)}
          </div>
          <button className="onboarding-primary peach" onClick={next}>Let&apos;s Get Started <span>→</span></button>
        </div>
      </main>
    );
  }

  if (step === "complete") {
    return (
      <main className={`onboarding-complete onboarding-complete-${role}`}>
        <div className="complete-shade" />
        <div className="complete-card">
          <Logo />
          <div className="complete-check">✓</div>
          <h1>{role === "organization" ? "Welcome Aboard!" : role === "instructor" ? "You’re All Set!" : "You’re In!"}</h1>
          <p>{role === "organization" ? "Your organization account has been created. You’re ready to add your team, enroll learners, and build a brighter future for animal care." : `Welcome to the Leashed ${role} community. Your experience is ready.`}</p>
          <ul>
            <li>✓ Account created</li>
            <li>✓ Profile complete</li>
            <li>✓ {role === "learner" ? "Learning pathway ready" : role === "instructor" ? "Teaching workspace ready" : "Organization workspace ready"}</li>
          </ul>
          <button className="onboarding-primary" onClick={next}>Go to Dashboard <span>→</span></button>
        </div>
      </main>
    );
  }

  return (
    <main className="onboarding-page">
      <header>
        <Logo />
        <div className="onboarding-progress"><span style={{width: `${progress}%`}} /></div>
        <small>{index + 1} of {sequence.length}</small>
      </header>
      <section className="onboarding-panel">
        <button className="onboarding-back" onClick={back}>← &nbsp; Back</button>
        <h1>{title}</h1>
        <p className="onboarding-lead">{leadFor(role, step)}</p>
        <div className="onboarding-body">
          {step === "account" && <>
            <Field label="Full Name" name="fullName" value={values.fullName as string} placeholder="Jane Doe" onChange={setValue} />
            <Field label="Email Address" name="email" type="email" value={values.email as string} placeholder="you@example.com" onChange={setValue} />
            <Field label="Password" name="password" type="password" value={values.password as string} placeholder="Create a strong password" onChange={setValue} />
            <label className="onboarding-checkbox"><input type="checkbox" defaultChecked /> I agree to the Terms of Service and Privacy Policy</label>
          </>}

          {step === "role" && <div className="onboarding-choice-grid">
            {["Learner", "Instructor", "Support Navigator", "Organization Admin", "Platform Admin", "New to Leashed"].map((item, choiceIndex) =>
              <Choice key={item} selected={values.learnerRole === item} icon={["♙", "◇", "♧", "▦", "⬡", "⊕"][choiceIndex]} title={item} copy={["I’m here to take a course or earn a credential.", "I teach, mentor, or create course content.", "I help learners with guidance and support.", "I manage a program, cohort, or organization.", "I support platform operations.", "I’m exploring and want to learn more."][choiceIndex]} onClick={() => setValue("learnerRole", item)} />
            )}
          </div>}

          {step === "goals" && <div className="onboarding-list">
            {["Become a professional pet groomer", "Become a professional dog trainer", "Become a pet sitter", "Learn business and entrepreneurship", "Gain animal care knowledge", "Explore multiple career paths"].map(item =>
              <Choice key={item} selected={(values.goals as string[]).includes(item)} icon="♧" title={item} copy="" onClick={() => toggleList("goals", item)} />
            )}
          </div>}

          {step === "profile" && role === "learner" && <>
            <div className="onboarding-two"><Field label="Date of Birth" name="birthDate" type="date" value={(values.birthDate as string) || ""} onChange={setValue} /><Field label="Phone Number" name="phone" value={values.phone as string} placeholder="(555) 123-4567" onChange={setValue} /></div>
            <SelectField label="Education Level" name="education" value={values.education as string} options={["High school", "Some college", "Associate degree", "Bachelor’s degree", "Other"]} onChange={setValue} />
            <SelectField label="How did you hear about us?" name="referral" value={values.referral as string} options={["Search", "Social media", "Friend or family", "School or employer", "Other"]} onChange={setValue} />
          </>}

          {step === "consent" && <>
            <Choice selected={Boolean(values.under18)} icon="◔" title="I am under 18 years old" copy="A parent or guardian will need to complete the next step." onClick={() => setValue("under18", !values.under18)} />
            <Field label="Guardian Email Address" name="guardianEmail" type="email" value={values.guardianEmail as string} placeholder="guardian@example.com" onChange={setValue} />
            <Field label="Guardian Phone Number" name="guardianPhone" value={values.guardianPhone as string} placeholder="(555) 123-4567" onChange={setValue} />
          </>}

          {step === "profile" && role === "instructor" && <>
            <div className="profile-photo">▣ <button type="button">Add Photo</button></div>
            <Field label="Phone Number" name="phone" value={values.phone as string} placeholder="(555) 123-4567" onChange={setValue} />
            <SelectField label="Location" name="location" value={values.location as string} options={["Memphis, TN", "Nashville, TN", "Remote", "Other"]} onChange={setValue} />
            <label className="onboarding-field">Bio / About You<textarea value={values.bio as string} onChange={event => setValue("bio", event.target.value)} placeholder="Share your experience, expertise, and what you love about teaching." /></label>
          </>}

          {step === "skills" && <>
            <h2>Instructor Role</h2>
            <div className="onboarding-list">
              {["Curriculum Instructor", "Lab Instructor", "Mentor"].map(item => <Choice radio key={item} selected={values.instructorRole === item} icon="●" title={item} copy={item === "Curriculum Instructor" ? "Teach scheduled courses and modules" : item === "Lab Instructor" ? "Lead hands-on training and practicals" : "Support learners with career and personal growth"} onClick={() => setValue("instructorRole", item)} />)}
            </div>
            <h2>Areas of Expertise</h2>
            <div className="expertise-grid">
              {["Dog Grooming", "Cat Grooming", "Dog Training", "Pet Sitting", "Animal Care", "Life Skills", "Business & Entrepreneurship", "Other"].map(item => <label key={item}><input type="checkbox" checked={(values.expertise as string[]).includes(item)} onChange={() => toggleList("expertise", item)} /> {item}</label>)}
            </div>
          </>}

          {step === "training" && <div className="training-list">
            {["Instructor Training Module — Platform overview and tools", "Curriculum & Syllabus Guide — Programs, courses, and learning paths", "Assessment & Grading Guide — Rubrics, feedback, and completion requirements", "Support & Community — Help and instructor community"].map(item => <button type="button" key={item}>{item}<span>›</span></button>)}
          </div>}

          {step === "tour" && <div className="tour-card"><div className="tour-screen">▶</div><ul><li>✓ Manage your courses and cohorts</li><li>✓ Track learner progress and performance</li><li>✓ Access AI teaching tools and resources</li><li>✓ View communication and support tools</li></ul></div>}

          {step === "verification" && <div className="verification-list">
            {["Email Verification — Verified", "Identity Verification — In Progress", "Background Check — Not Started", "Instructor Certification — Not Started"].map(item => <div key={item}>{item}<span>○</span></div>)}
          </div>}

          {step === "create" && <>
            <Field label="Organization Name *" name="organizationName" value={values.organizationName as string} placeholder="Enter organization name" onChange={setValue} />
            <SelectField label="Organization Type *" name="organizationType" value={values.organizationType as string} options={["School", "Training provider", "Animal care business", "Shelter or nonprofit", "Government agency", "Other"]} onChange={setValue} />
          </>}

          {step === "details" && <>
            <Field label="Website (optional)" name="website" value={values.website as string} placeholder="https://yourwebsite.com" onChange={setValue} />
            <Field label="Phone Number *" name="phone" value={values.phone as string} placeholder="(555) 123-4567" onChange={setValue} />
            <label className="onboarding-field">Organization Description *<textarea value={values.organizationDescription as string} onChange={event => setValue("organizationDescription", event.target.value)} placeholder="Tell us about your mission and goals..." /></label>
          </>}

          {step === "locations" && <>
            <Field label="Location Name *" name="locationName" value={values.locationName as string} placeholder="e.g. Main Campus" onChange={setValue} />
            <Field label="Address *" name="address" value={values.address as string} placeholder="Street address" onChange={setValue} />
            <div className="onboarding-three"><Field label="City *" name="city" value={values.city as string} placeholder="City" onChange={setValue} /><Field label="State *" name="state" value={values.state as string} placeholder="State" onChange={setValue} /><Field label="ZIP Code *" name="zip" value={values.zip as string} placeholder="ZIP Code" onChange={setValue} /></div>
            <button className="onboarding-secondary" type="button">＋ Add Another Location</button>
          </>}

          {step === "team" && <div className="team-list">
            <button className="onboarding-secondary" type="button" onClick={() => setValue("team", [...values.team as string[], `New team member — Instructor`])}>＋ Add Team Member</button>
            {(values.team as string[]).map((item, itemIndex) => <div key={`${item}-${itemIndex}`}><span>{item.split(" ")[0][0]}{item.split(" ")[1]?.[0]}</span><strong>{item}</strong><button type="button" onClick={() => setValue("team", (values.team as string[]).filter((_, i) => i !== itemIndex))}>×</button></div>)}
          </div>}

          {step === "permissions" && <div className="onboarding-list">
            {["Organization Admin", "Instructor", "Support Navigator", "Learner"].map(item => <Choice key={item} selected={(values.permissions as string[]).includes(item)} icon="♙" title={item} copy={item === "Organization Admin" ? "Full access to organization settings, roster management, and reporting." : "Role-specific access with organization governance."} onClick={() => toggleList("permissions", item)} />)}
          </div>}

          {step === "programs" && <div className="onboarding-list">
            {programs.map(item => <Choice key={item} selected={(values.programs as string[]).includes(item)} icon="♧" title={item} copy="Organization-owned curriculum assignment" onClick={() => toggleList("programs", item)} />)}
          </div>}

          {step === "billing" && <>
            <div className="onboarding-list">
              {["Credit / Debit Card", "Bank Account (ACH)", "Purchase Order"].map(item => <Choice radio key={item} selected={values.billingMethod === item} icon="▱" title={item} copy={item === "Purchase Order" ? "For approved organizations" : "Secure and encrypted"} onClick={() => setValue("billingMethod", item)} />)}
            </div>
            <Field label="Billing Contact Name *" name="billingName" value={values.billingName as string} placeholder="Billing contact name" onChange={setValue} />
            <Field label="Billing Email *" name="billingEmail" type="email" value={values.billingEmail as string} placeholder="billing@organization.com" onChange={setValue} />
          </>}

          {step === "review" && <Review role={role} values={values} />}
        </div>
        <div className="onboarding-actions">
          <button className="onboarding-secondary" onClick={back}>← &nbsp; Back</button>
          <button className="onboarding-primary" onClick={next}>{step === "review" ? role === "organization" ? "Create Organization" : "Create My Account" : step === "training" ? "Start Training" : "Continue"} <span>→</span></button>
        </div>
      </section>
    </main>
  );
}

function Review({role, values}: {role: OnboardingRole; values: Values}) {
  const rows = role === "organization"
    ? [["Organization", values.organizationName || "Not provided"], ["Admin Contact", values.fullName || "Primary administrator"], ["Locations", values.locationName || "No location added"], ["Team Members", `${(values.team as string[]).length} members`], ["Programs", (values.programs as string[]).join(", ")]]
    : [["Name", values.fullName || "Jane Doe"], ["Email", values.email || "jane@example.com"], ["Role", roleLabels[role]], [role === "learner" ? "Learning Goals" : "Expertise", ((role === "learner" ? values.goals : values.expertise) as string[]).join(", ")], ["Phone", values.phone || "(555) 123-4567"]];
  return <div className="review-list">{rows.map(([label, value]) => <div key={String(label)}><span>{label}</span><strong>{String(value)}</strong><button type="button">Edit</button></div>)}</div>;
}

function leadFor(role: OnboardingRole, step: string) {
  const copy: Record<string, string> = {
    account: `Tell us a little about yourself so we can personalize your ${role} experience.`,
    role: "Select the role that fits your current situation.",
    goals: "Select all that apply. This helps us suggest the best curriculum and resources for you.",
    profile: "A little more information helps us create the best experience for you.",
    consent: "If you’re under 18, we’ll need your guardian’s information and consent to continue.",
    review: "Please confirm your details before we create your account.",
    skills: "Choose how you’ll work with learners and the areas you specialize in.",
    training: "Get familiar with the platform, curriculum, and instructor resources.",
    tour: "Explore your instructor dashboard and key features.",
    verification: "We’ll confirm your identity and credentials to complete your setup.",
    create: "Tell us about your organization so we can customize your experience.",
    details: "Share a few more details about your organization.",
    locations: "Tell us where your team will be working. You can add multiple locations.",
    team: "Add your administrators and team members. You can always add more later.",
    permissions: "Choose the default roles and permissions for your team.",
    programs: "Select the training pathways and programs your organization wants to offer.",
    billing: "Set up your payment method and billing information.",
  };
  return copy[step] || "";
}