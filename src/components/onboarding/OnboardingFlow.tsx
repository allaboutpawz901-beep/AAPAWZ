'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { LeashedLogo } from '@/components/lms-design-system/LeashedLogo';
import {
  GraduationCap,
  TrendingUp,
  Heart,
  PawPrint,
  User,
  Users,
  Building,
  ShieldCheck,
  Compass,
  ArrowRight,
  ArrowLeft,
  Check,
  Lock,
  Eye,
  EyeOff,
  Calendar,
  Phone,
  Scissors,
  Award,
  Briefcase,
  Home,
  CheckCircle2,
} from 'lucide-react';

interface OnboardingFlowProps {
  initialStep?: number;
}

export function OnboardingFlow({ initialStep = 1 }: OnboardingFlowProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(initialStep);

  // Form State
  const [fullName, setFullName] = useState('Jane Doe');
  const [email, setEmail] = useState('jane@example.com');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Step 3 Role
  const [selectedRole, setSelectedRole] = useState<string>('learner');

  // Step 4 Goals
  const [selectedGoals, setSelectedGoals] = useState<string[]>([
    'Become a professional pet groomer',
    'Learn business and entrepreneurship',
    'Gain animal care knowledge',
  ]);

  // Step 5 Details
  const [dateOfBirth, setDateOfBirth] = useState('2000-01-01');
  const [phone, setPhone] = useState('(555) 123-4567');
  const [educationLevel, setEducationLevel] = useState('Some College / Vocational');
  const [hearAboutUs, setHearAboutUs] = useState('Shelter / Vet Referral');

  // Step 6 Guardian
  const [isUnder18, setIsUnder18] = useState(false);
  const [guardianEmail, setGuardianEmail] = useState('');
  const [guardianPhone, setGuardianPhone] = useState('');

  // Toggle goal helper
  const toggleGoal = (goal: string) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter((g) => g !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  const nextStep = () => {
    if (currentStep < 8) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Step 8 complete -> Route to /classroom
      router.push('/classroom');
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push('/');
    }
  };

  const goToStep = (stepNumber: number) => {
    setCurrentStep(stepNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step metadata & photographic assets for left column
  const stepConfig: Record<
    number,
    {
      title: string;
      subtitle: string;
      image: string;
      imageAlt: string;
      tag: string;
    }
  > = {
    1: {
      tag: 'GETTING STARTED GATE',
      title: 'The Enroll Process Starts Here.',
      subtitle:
        'Your journey to a rewarding career in animal care, grooming, and business starts here. Complete our guided admissions gate in minutes.',
      image: '/images/pets_caregiver.jpg',
      imageAlt: 'Golden retriever and caregiver',
    },
    2: {
      tag: 'LEASHED ADMISSIONS',
      title: 'Real Skills. Meaningful Careers.',
      subtitle:
        'Join hundreds of students mastering professional grooming, training, and ethical pet care business operations.',
      image: '/images/laptop_learner.jpg',
      imageAlt: 'Student creating learner account',
    },
    3: {
      tag: 'ROLE PERSONALIZATION',
      title: 'Designed for Every Path.',
      subtitle:
        'Whether you are starting from zero or leading cohorts, our learning pathways adapt to your professional goals.',
      image: '/images/golden_portrait.jpg',
      imageAlt: 'Companion dog portrait',
    },
    4: {
      tag: 'VOCATIONAL CURRICULUM',
      title: 'Hands-On Mastery That Counts.',
      subtitle:
        'Select your craft. Our 160+ clock-hour modules combine live practical safety gates with industry credentials.',
      image: '/images/dog_groomer.jpg',
      imageAlt: 'Hands-on grooming practical demonstration',
    },
    5: {
      tag: 'LEARNER PROFILE',
      title: 'A Supportive Community That Cares.',
      subtitle:
        'Tell us about your background so we can connect you with dedicated mentorship and cohort advisors.',
      image: '/images/health_woman_cat.jpg',
      imageAlt: 'Caregiver with feline friend',
    },
    6: {
      tag: 'SAFETY & COMPLIANCE',
      title: 'High Standards From Day One.',
      subtitle:
        'We adhere to professional animal welfare and student safety standards across all virtual and in-person practicums.',
      image: '/images/vet_cat_checkup.jpg',
      imageAlt: 'Professional pet care safety and checkup',
    },
    7: {
      tag: 'APPLICATION REVIEW',
      title: 'Almost There! Confirm Your Details.',
      subtitle:
        'Review your enrollment profile before activating your student account and gaining access to the classroom canvas.',
      image: '/images/job_resume_desk.jpg',
      imageAlt: 'Career profile review desk',
    },
    8: {
      tag: 'ENROLLMENT CONFIRMED',
      title: "You're Ready to Begin!",
      subtitle:
        'Your profile is verified. Access your classroom portal, explore course modules, and meet your cohort.',
      image: '/images/orange_cat.jpg',
      imageAlt: 'Enrolled student mascot cat',
    },
  };

  const currentMeta = stepConfig[currentStep] || stepConfig[1];

  return (
    <div className="min-h-screen w-full bg-[#fbf9f5] text-[#141b16] flex flex-col lg:grid lg:grid-cols-2">
      {/* =========================================================================
          LEFT COLUMN: Visual Branding, Atmosphere, Core Pillars, Photography
          ========================================================================= */}
      <aside className="relative bg-[#f5f1e8] border-b lg:border-b-0 lg:border-r border-[#e5dcce] flex flex-col justify-between p-6 sm:p-10 lg:p-12 overflow-hidden order-2 lg:order-1">
        {/* Ambient background blur */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#e7dbca]/60 rounded-full blur-3xl -z-0 pointer-events-none" />

        <div className="relative z-10 space-y-6">
          {/* Logo */}
          <div>
            <Link href="/" className="inline-block focus:outline-none rounded-lg">
              <LeashedLogo variant="dark" size="md" />
            </Link>
          </div>

          {/* Heading block */}
          <div className="space-y-2 pt-2">
            <span className="inline-block text-[0.7rem] font-bold tracking-widest text-[#55695a] uppercase">
              {currentMeta.tag}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#141b16] leading-tight">
              {currentMeta.title}
            </h1>
            <p className="text-sm sm:text-base text-[#4f6054] leading-relaxed max-w-lg">
              {currentMeta.subtitle}
            </p>
          </div>

          {/* 4 Core Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
            <div className="flex items-start gap-3 p-2.5 rounded-xl bg-white/70 border border-[#e8dfd1] backdrop-blur-xs">
              <div className="w-8 h-8 rounded-full bg-[#e8efe9] text-[#2c4735] flex items-center justify-center shrink-0">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#141b16]">Learn</h4>
                <p className="text-[0.72rem] text-[#55675a] leading-snug">
                  Expert-led training &amp; hands-on practice.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-2.5 rounded-xl bg-white/70 border border-[#e8dfd1] backdrop-blur-xs">
              <div className="w-8 h-8 rounded-full bg-[#e8efe9] text-[#2c4735] flex items-center justify-center shrink-0">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#141b16]">Grow</h4>
                <p className="text-[0.72rem] text-[#55675a] leading-snug">
                  Build real-world skills and confidence.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-2.5 rounded-xl bg-white/70 border border-[#e8dfd1] backdrop-blur-xs">
              <div className="w-8 h-8 rounded-full bg-[#e8efe9] text-[#2c4735] flex items-center justify-center shrink-0">
                <Heart className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#141b16]">Belong</h4>
                <p className="text-[0.72rem] text-[#55675a] leading-snug">
                  A supportive community that cares.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-2.5 rounded-xl bg-white/70 border border-[#e8dfd1] backdrop-blur-xs">
              <div className="w-8 h-8 rounded-full bg-[#e8efe9] text-[#2c4735] flex items-center justify-center shrink-0">
                <PawPrint className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#141b16]">Build Your Future</h4>
                <p className="text-[0.72rem] text-[#55675a] leading-snug">
                  Turn your passion into a meaningful career.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Image and Signature script */}
        <div className="relative z-10 pt-6 space-y-4">
          <div className="relative h-56 sm:h-72 w-full rounded-2xl overflow-hidden shadow-md border border-[#dfd6c7] bg-[#e4ded3]">
            <Image
              src={currentMeta.image}
              alt={currentMeta.imageAlt}
              fill
              className="object-cover object-center"
              priority
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>

          {/* Cursive Handwriting Signature */}
          <div className="pt-2">
            {currentStep === 8 ? (
              <p className="font-script text-2xl sm:text-3xl text-[#2b4c37] font-bold flex items-center gap-2">
                <span>Great things start here.</span>
                <PawPrint className="w-5 h-5 text-[#2b4c37] fill-current" />
              </p>
            ) : (
              <p className="font-script text-2xl sm:text-3xl text-[#2b4c37] font-bold flex items-center gap-2">
                <span>Better People. Healthier Pets. Stronger Communities.</span>
                <PawPrint className="w-5 h-5 text-[#2b4c37] fill-current" />
              </p>
            )}
          </div>
        </div>
      </aside>

      {/* =========================================================================
          RIGHT COLUMN: Interactive Step Gates & Form Journey
          ========================================================================= */}
      <main className="flex-1 bg-[#fdfbf7] flex flex-col justify-between p-6 sm:p-10 lg:p-14 order-1 lg:order-2 overflow-y-auto">
        <div className="w-full max-w-xl mx-auto space-y-8">
          {/* Top Progress & Navigation Bar */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <button
                onClick={prevStep}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#55675a] hover:text-[#141b16] transition-colors py-1 px-2 -ml-2 rounded-lg hover:bg-[#f2ece1]"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{currentStep === 1 ? 'Back to Courses' : 'Back'}</span>
              </button>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#6a7d70] tracking-wider uppercase">
                  {currentStep} of 8
                </span>
              </div>
            </div>

            {/* Stepper Progress Bar */}
            <div className="w-full h-1.5 bg-[#eae2d3] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#234937] transition-all duration-300 rounded-full"
                style={{ width: `${(currentStep / 8) * 100}%` }}
              />
            </div>
          </div>

          {/* ===================================================================
              STEP 1: Getting Started Gate — The Enroll Process Starts Here
              =================================================================== */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.7rem] font-bold tracking-wider uppercase bg-[#e8efe9] text-[#2c4735] border border-[#d1e0d3]">
                  <PawPrint className="w-3 h-3 text-[#2c4735]" />
                  <span>Getting Started Gate</span>
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#141b16]">
                  The Enroll Process Starts Here
                </h2>
                <p className="text-xs sm:text-sm text-[#55675a] leading-relaxed">
                  Your journey to a rewarding career in animal care, grooming, and pet business begins now. Follow this seamless 8-step admissions sequence to set up your learner profile, confirm your vocational standards, and unlock your interactive Classroom Canvas.
                </p>
              </div>

              {/* 4 Feature Highlights */}
              <div className="space-y-3 pt-2">
                <div className="p-3.5 rounded-xl bg-[#f8f5ee] border border-[#e8ded0] flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-[#1b261d] text-[#ebdcc8] flex items-center justify-center shrink-0">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#141b16]">Build Real Skills</h3>
                    <p className="text-[0.72rem] text-[#55675a]">
                      Hands-on practical training with expert animal-care instructors
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#f8f5ee] border border-[#e8ded0] flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-[#1b261d] text-[#ebdcc8] flex items-center justify-center shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#141b16]">Earn Your Credential</h3>
                    <p className="text-[0.72rem] text-[#55675a]">
                      Industry-recognized certifications and job-ready competencies
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#f8f5ee] border border-[#e8ded0] flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-[#1b261d] text-[#ebdcc8] flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#141b16]">Dedicated Support</h3>
                    <p className="text-[0.72rem] text-[#55675a]">
                      1-on-1 mentorship, cohort advising &amp; interactive AI tutoring
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#f8f5ee] border border-[#e8ded0] flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-[#1b261d] text-[#ebdcc8] flex items-center justify-center shrink-0">
                    <Heart className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#141b16]">Create Your Future</h3>
                    <p className="text-[0.72rem] text-[#55675a]">
                      Direct bridge from learning to pet care career &amp; business ownership
                    </p>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 space-y-2.5">
                <button
                  onClick={nextStep}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#234937] hover:bg-[#1a382a] text-white font-bold text-sm transition-all duration-150 flex items-center justify-center gap-2 shadow-sm active:scale-[0.99]"
                >
                  <span>Let&apos;s Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-center text-[0.72rem] text-[#718578]">
                  Step 1 of 8 · Approximately 3 minutes · Unlocks Classroom Canvas
                </p>
              </div>
            </div>
          )}

          {/* ===================================================================
              STEP 2: Create Your Account
              =================================================================== */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="space-y-2">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#141b16]">
                  Create Your Account
                </h2>
                <p className="text-xs sm:text-sm text-[#55675a] leading-relaxed">
                  Tell us a little about yourself so we can personalize your learning experience.
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  nextStep();
                }}
                className="space-y-4 pt-1"
              >
                <div>
                  <label className="block text-xs font-bold text-[#3d4f43] mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#d6ccb9] bg-white text-sm text-[#141b16] focus:outline-none focus:border-[#234937] focus:ring-1 focus:ring-[#234937]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#3d4f43] mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#d6ccb9] bg-white text-sm text-[#141b16] focus:outline-none focus:border-[#234937] focus:ring-1 focus:ring-[#234937]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#3d4f43] mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a strong password"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#d6ccb9] bg-white text-sm text-[#141b16] pr-10 focus:outline-none focus:border-[#234937] focus:ring-1 focus:ring-[#234937]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#788a7d] hover:text-[#141b16]"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Terms checkbox */}
                <div className="pt-2 flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-[#234937] focus:ring-[#234937] border-[#c5baaa]"
                  />
                  <label htmlFor="terms" className="text-xs text-[#526456] leading-snug">
                    I agree to the{' '}
                    <span className="text-[#234937] font-semibold underline cursor-pointer">
                      Terms of Service
                    </span>{' '}
                    and{' '}
                    <span className="text-[#234937] font-semibold underline cursor-pointer">
                      Privacy Policy
                    </span>
                  </label>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-[#234937] hover:bg-[#1a382a] text-white font-bold text-sm transition-all duration-150 flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Create Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="pt-2 text-center text-xs text-[#6a7d70]">
                  <span>Already have an account? </span>
                  <button
                    type="button"
                    onClick={() => nextStep()}
                    className="text-[#234937] font-bold hover:underline"
                  >
                    Sign In
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ===================================================================
              STEP 3: What best describes you? (6 Role Cards)
              =================================================================== */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="space-y-2">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#141b16]">
                  What best describes you?
                </h2>
                <p className="text-xs sm:text-sm text-[#55675a] leading-relaxed">
                  Select the role that fits your current situation.
                </p>
              </div>

              {/* 6 Role Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {[
                  {
                    id: 'learner',
                    title: 'Learner',
                    desc: "I'm here to take a course, earn a credential, or build new skills.",
                    icon: User,
                  },
                  {
                    id: 'instructor',
                    title: 'Instructor',
                    desc: 'I teach, mentor, or create course content.',
                    icon: GraduationCap,
                  },
                  {
                    id: 'support_navigator',
                    title: 'Support Navigator',
                    desc: 'I help learners with guidance, resources, and support.',
                    icon: Users,
                  },
                  {
                    id: 'org_admin',
                    title: 'Organization Admin',
                    desc: 'I manage a program, cohort, or organization.',
                    icon: Building,
                  },
                  {
                    id: 'platform_admin',
                    title: 'Platform Admin',
                    desc: 'I support the platform, systems, and overall operations.',
                    icon: ShieldCheck,
                  },
                  {
                    id: 'new_to_leashed',
                    title: 'New to Leashed',
                    desc: "I'm exploring and want to learn more.",
                    icon: Compass,
                  },
                ].map((item) => {
                  const isSelected = selectedRole === item.id;
                  const IconComponent = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedRole(item.id)}
                      className={`p-4 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#234937] bg-[#f2f7f3] ring-1 ring-[#234937]'
                          : 'border-[#dfd6c8] bg-white hover:bg-[#faf7f2]'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#234937] text-white flex items-center justify-center">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                      <div className="w-8 h-8 rounded-lg bg-[#e8efe9] text-[#234937] flex items-center justify-center mb-2.5">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-[#141b16] mb-1">
                          {item.title}
                        </h3>
                        <p className="text-[0.72rem] text-[#55675a] leading-snug">
                          {item.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="pt-4">
                <button
                  onClick={nextStep}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#234937] hover:bg-[#1a382a] text-white font-bold text-sm transition-all duration-150 flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ===================================================================
              STEP 4: What are your learning goals? (Checklist)
              =================================================================== */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="space-y-2">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#141b16]">
                  What are your learning goals?
                </h2>
                <p className="text-xs sm:text-sm text-[#55675a] leading-relaxed">
                  Select all that apply. This helps us suggest the best curriculum and resources for you.
                </p>
              </div>

              {/* Multi-select Goal Options */}
              <div className="space-y-2.5 pt-1">
                {[
                  {
                    title: 'Become a professional pet groomer',
                    icon: Scissors,
                  },
                  {
                    title: 'Become a professional dog trainer',
                    icon: Award,
                  },
                  {
                    title: 'Become a pet sitter',
                    icon: Home,
                  },
                  {
                    title: 'Learn business and entrepreneurship',
                    icon: Briefcase,
                  },
                  {
                    title: 'Gain animal care knowledge',
                    icon: Heart,
                  },
                  {
                    title: 'Explore multiple career paths',
                    icon: Compass,
                  },
                ].map((goal) => {
                  const isChecked = selectedGoals.includes(goal.title);
                  const Icon = goal.icon;
                  return (
                    <button
                      key={goal.title}
                      type="button"
                      onClick={() => toggleGoal(goal.title)}
                      className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center justify-between gap-3 ${
                        isChecked
                          ? 'border-[#234937] bg-[#f2f7f3]'
                          : 'border-[#dfd6c8] bg-white hover:bg-[#faf7f2]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#e8efe9] text-[#234937] flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs sm:text-sm font-semibold text-[#141b16]">
                          {goal.title}
                        </span>
                      </div>

                      <div
                        className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
                          isChecked
                            ? 'bg-[#234937] text-white'
                            : 'border border-[#cbbea9] bg-white'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="pt-4">
                <button
                  onClick={nextStep}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#234937] hover:bg-[#1a382a] text-white font-bold text-sm transition-all duration-150 flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ===================================================================
              STEP 5: Tell us about yourself
              =================================================================== */}
          {currentStep === 5 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="space-y-2">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#141b16]">
                  Tell us about yourself
                </h2>
                <p className="text-xs sm:text-sm text-[#55675a] leading-relaxed">
                  A little more information helps us create the best experience for you.
                </p>
              </div>

              <div className="space-y-4 pt-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#3d4f43] mb-1.5">
                      Date of Birth
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#d6ccb9] bg-white text-sm text-[#141b16] focus:outline-none focus:border-[#234937]"
                      />
                      <Calendar className="w-4 h-4 text-[#788a7d] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#3d4f43] mb-1.5">
                      Phone Number
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(555) 123-4567"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#d6ccb9] bg-white text-sm text-[#141b16] focus:outline-none focus:border-[#234937]"
                      />
                      <Phone className="w-4 h-4 text-[#788a7d] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#3d4f43] mb-1.5">
                    Education Level
                  </label>
                  <select
                    value={educationLevel}
                    onChange={(e) => setEducationLevel(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#d6ccb9] bg-white text-sm text-[#141b16] focus:outline-none focus:border-[#234937]"
                  >
                    <option>High School / GED</option>
                    <option>Some College / Vocational</option>
                    <option>Associate Degree</option>
                    <option>Bachelor&apos;s Degree</option>
                    <option>Master&apos;s or Doctorate</option>
                    <option>Other Professional Background</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#3d4f43] mb-1.5">
                    How did you hear about us?
                  </label>
                  <select
                    value={hearAboutUs}
                    onChange={(e) => setHearAboutUs(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#d6ccb9] bg-white text-sm text-[#141b16] focus:outline-none focus:border-[#234937]"
                  >
                    <option>Shelter / Vet Referral</option>
                    <option>Search Engine / Online Search</option>
                    <option>Social Media (Instagram / YouTube / TikTok)</option>
                    <option>Word of Mouth / Colleague</option>
                    <option>Pet Care Industry Event</option>
                    <option>Community Organization</option>
                  </select>
                </div>

                <div className="pt-4 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="py-3.5 px-5 rounded-xl border border-[#d6ccb9] bg-white hover:bg-[#faf7f2] text-[#141b16] font-bold text-sm transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex-1 py-3.5 px-6 rounded-xl bg-[#234937] hover:bg-[#1a382a] text-white font-bold text-sm transition-all duration-150 flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ===================================================================
              STEP 6: Guardian & Consent
              =================================================================== */}
          {currentStep === 6 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="space-y-2">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#141b16]">
                  Guardian &amp; Consent
                </h2>
                <p className="text-xs sm:text-sm text-[#55675a] leading-relaxed">
                  If you&apos;re under 18, we&apos;ll need your guardian&apos;s information and consent to continue.
                </p>
              </div>

              <div className="space-y-4 pt-1">
                {/* Toggle Card */}
                <div className="p-4 rounded-xl border border-[#dcd2c1] bg-[#fbf8f2] flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <h4 className="text-xs sm:text-sm font-bold text-[#141b16]">
                      I am under 18 years old
                    </h4>
                    <p className="text-[0.72rem] text-[#647769] leading-snug">
                      If you are under 18, a parent or guardian will need to complete the next step.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsUnder18(!isUnder18)}
                    className={`w-12 h-6 rounded-full transition-colors relative shrink-0 ${
                      isUnder18 ? 'bg-[#234937]' : 'bg-[#d8cebe]'
                    }`}
                  >
                    <span
                      className={`block w-5 h-5 rounded-full bg-white shadow-sm transition-transform absolute top-0.5 ${
                        isUnder18 ? 'left-6.5' : 'left-0.5'
                      }`}
                    />
                  </button>
                </div>

                {/* Conditional Guardian Inputs */}
                <div
                  className={`space-y-4 transition-opacity ${
                    isUnder18 ? 'opacity-100' : 'opacity-40 pointer-events-none'
                  }`}
                >
                  <div>
                    <label className="block text-xs font-bold text-[#3d4f43] mb-1.5">
                      Guardian Email Address
                    </label>
                    <input
                      type="email"
                      value={guardianEmail}
                      onChange={(e) => setGuardianEmail(e.target.value)}
                      placeholder="guardian@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#d6ccb9] bg-white text-sm text-[#141b16] focus:outline-none focus:border-[#234937]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#3d4f43] mb-1.5">
                      Guardian Phone Number
                    </label>
                    <input
                      type="tel"
                      value={guardianPhone}
                      onChange={(e) => setGuardianPhone(e.target.value)}
                      placeholder="(555) 123-4567"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#d6ccb9] bg-white text-sm text-[#141b16] focus:outline-none focus:border-[#234937]"
                    />
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="py-3.5 px-5 rounded-xl border border-[#d6ccb9] bg-white hover:bg-[#faf7f2] text-[#141b16] font-bold text-sm transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex-1 py-3.5 px-6 rounded-xl bg-[#234937] hover:bg-[#1a382a] text-white font-bold text-sm transition-all duration-150 flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ===================================================================
              STEP 7: Review Your Information
              =================================================================== */}
          {currentStep === 7 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="space-y-2">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#141b16]">
                  Review Your Information
                </h2>
                <p className="text-xs sm:text-sm text-[#55675a] leading-relaxed">
                  Please confirm your details before we create your account.
                </p>
              </div>

              {/* Review Card with Edit Buttons */}
              <div className="rounded-2xl border border-[#dcd2c1] bg-white p-5 divide-y divide-[#eee5d6] space-y-3">
                <div className="flex items-center justify-between pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#f0eee6] text-[#334638] flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-[0.68rem] text-[#718276] uppercase font-bold">
                        Name
                      </span>
                      <span className="text-sm font-bold text-[#141b16]">{fullName}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => goToStep(2)}
                    className="text-xs font-bold text-[#234937] hover:underline"
                  >
                    Edit
                  </button>
                </div>

                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#f0eee6] text-[#334638] flex items-center justify-center">
                      <Lock className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-[0.68rem] text-[#718276] uppercase font-bold">
                        Email
                      </span>
                      <span className="text-sm font-bold text-[#141b16]">{email}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => goToStep(2)}
                    className="text-xs font-bold text-[#234937] hover:underline"
                  >
                    Edit
                  </button>
                </div>

                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#f0eee6] text-[#334638] flex items-center justify-center">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-[0.68rem] text-[#718276] uppercase font-bold">
                        Role
                      </span>
                      <span className="text-sm font-bold text-[#141b16] capitalize">
                        {selectedRole.replace(/_/g, ' ')}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => goToStep(3)}
                    className="text-xs font-bold text-[#234937] hover:underline"
                  >
                    Edit
                  </button>
                </div>

                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#f0eee6] text-[#334638] flex items-center justify-center">
                      <PawPrint className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-[0.68rem] text-[#718276] uppercase font-bold">
                        Learning Goals
                      </span>
                      <span className="text-xs font-bold text-[#141b16] line-clamp-1">
                        {selectedGoals.length > 0 ? selectedGoals.join(', ') : 'None selected'}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => goToStep(4)}
                    className="text-xs font-bold text-[#234937] hover:underline"
                  >
                    Edit
                  </button>
                </div>

                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#f0eee6] text-[#334638] flex items-center justify-center">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-[0.68rem] text-[#718276] uppercase font-bold">
                        Date of Birth
                      </span>
                      <span className="text-sm font-bold text-[#141b16]">{dateOfBirth}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => goToStep(5)}
                    className="text-xs font-bold text-[#234937] hover:underline"
                  >
                    Edit
                  </button>
                </div>

                <div className="flex items-center justify-between pt-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#f0eee6] text-[#334638] flex items-center justify-center">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-[0.68rem] text-[#718276] uppercase font-bold">
                        Phone
                      </span>
                      <span className="text-sm font-bold text-[#141b16]">{phone}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => goToStep(5)}
                    className="text-xs font-bold text-[#234937] hover:underline"
                  >
                    Edit
                  </button>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-3">
                <button
                  type="button"
                  onClick={prevStep}
                  className="py-3.5 px-5 rounded-xl border border-[#d6ccb9] bg-white hover:bg-[#faf7f2] text-[#141b16] font-bold text-sm transition-colors"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex-1 py-3.5 px-6 rounded-xl bg-[#234937] hover:bg-[#1a382a] text-white font-bold text-sm transition-all duration-150 flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Create My Account</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ===================================================================
              STEP 8: You're In! (Classroom Destination)
              =================================================================== */}
          {currentStep === 8 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Green Paw Badge */}
              <div className="w-16 h-16 rounded-2xl bg-[#234937] text-[#ebdcc8] flex items-center justify-center shadow-md">
                <PawPrint className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#141b16]">
                  You&apos;re In!
                </h2>
                <p className="text-xs sm:text-sm text-[#55675a] leading-relaxed">
                  Welcome to the Leashed community. Your learning journey is about to begin.
                </p>
              </div>

              {/* Status List */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#f2f7f3] border border-[#d8e6db]">
                  <CheckCircle2 className="w-5 h-5 text-[#234937] shrink-0" />
                  <span className="text-xs sm:text-sm font-bold text-[#1b3b2c]">
                    Account created
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#f2f7f3] border border-[#d8e6db]">
                  <CheckCircle2 className="w-5 h-5 text-[#234937] shrink-0" />
                  <span className="text-xs sm:text-sm font-bold text-[#1b3b2c]">
                    Profile complete
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#f2f7f3] border border-[#d8e6db]">
                  <CheckCircle2 className="w-5 h-5 text-[#234937] shrink-0" />
                  <span className="text-xs sm:text-sm font-bold text-[#1b3b2c]">
                    You&apos;re enrolled in your selected pathway
                  </span>
                </div>
              </div>

              {/* Next Step Box */}
              <div className="p-4 rounded-xl bg-[#f8f5ee] border border-[#e5dcce] flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-[#ebdcc8] text-[#141b16] flex items-center justify-center shrink-0 mt-0.5">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#141b16] mb-0.5">Next Step</h3>
                  <p className="text-[0.72rem] text-[#55675a] leading-relaxed">
                    Head to your classroom dashboard to explore your courses, track your progress, and meet your support team.
                  </p>
                </div>
              </div>

              {/* Primary Action to Classroom */}
              <div className="pt-4">
                <button
                  onClick={() => router.push('/classroom')}
                  className="w-full py-4 px-6 rounded-xl bg-[#234937] hover:bg-[#1a382a] text-white font-bold text-sm sm:text-base transition-all duration-150 flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-[0.99]"
                >
                  <span>Go to Classroom</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Bottom Security Trust Notice */}
          <div className="pt-6 border-t border-[#ece4d4] flex items-center justify-center gap-2 text-center text-[0.75rem] text-[#6f8275]">
            <Lock className="w-3.5 h-3.5 text-[#889b8d]" />
            <span>Your information is safe with us. We use industry-standard security to protect your data.</span>
          </div>
        </div>
      </main>
    </div>
  );
}
