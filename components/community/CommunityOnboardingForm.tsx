'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, Loader2 } from 'lucide-react';
import SelectMenu from '@/components/community/SelectMenu';
import {
  EVALUATION_CRITERIA,
  EXPERTISE_SECTORS,
  FORM_SECTIONS,
  GEOGRAPHIES,
  GOOGLE_SCRIPT_URL,
  HEAR_ABOUT,
  INVESTMENT_SECTORS,
  INVESTMENT_STAGES,
  MENTORSHIP_AREAS,
  MENTORSHIP_INTEREST,
  PARTICIPATION_ROLES,
  STARTUP_COUNT,
  TICKET_SIZES,
  YES_MAYBE_NO,
  YES_NO,
  communityFormToPayload,
  emptyCommunityForm,
  isGoogleScriptConfigured,
  validateCommunityForm,
  type CommunityFormErrors,
  type CommunityFormState,
} from '@/lib/community-form';

const ease = [0.19, 1, 0.22, 1] as const;

const inputClass =
  'h-14 w-full rounded-2xl border bg-white px-4 text-[15px] text-text-primary outline-none transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] placeholder:text-text-muted';

const textareaClass =
  'min-h-[120px] w-full resize-y rounded-2xl border bg-white px-4 py-3.5 text-[15px] leading-relaxed text-text-primary outline-none transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] placeholder:text-text-muted';

function fieldBorder(error?: string) {
  return error
    ? 'border-red-400 ring-2 ring-red-100'
    : 'border-[#e8e8e8] focus:border-brand focus:ring-2 focus:ring-brand/15';
}

function Field({
  id,
  label,
  required,
  hint,
  error,
  children,
}: {
  id?: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium tracking-tight text-text-primary">
        {label}
        {required && <span className="ml-1 text-brand">*</span>}
      </label>
      {hint && <p className="text-[13px] leading-relaxed text-text-secondary">{hint}</p>}
      {children}
      {error && <p className="text-[13px] text-red-600">{error}</p>}
    </div>
  );
}

export default function CommunityOnboardingForm() {
  const [form, setForm] = useState<CommunityFormState>(emptyCommunityForm);
  const [errors, setErrors] = useState<CommunityFormErrors>({});
  const [activeSection, setActiveSection] = useState('personal');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const setField = <K extends keyof CommunityFormState>(key: K, value: CommunityFormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const wantsMentorship =
    form.mentorshipInterest === 'Yes, definitely' ||
    form.mentorshipInterest === 'Maybe, depending on the startup';

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActiveSection(visible[0].target.id);
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: [0.15, 0.35, 0.6] }
    );

    FORM_SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const progress = useMemo(() => {
    const checks = [
      form.fullName,
      form.email,
      form.phone,
      form.city,
      form.designation,
      form.investedBefore,
      form.investmentSectors.length,
      form.expertiseSectors.length,
      form.mentorshipInterest,
      form.participation.length,
      form.consent,
    ];
    return Math.round((checks.filter(Boolean).length / checks.length) * 100);
  }, [form]);

  const scrollToError = (nextErrors: CommunityFormErrors) => {
    const firstKey = Object.keys(nextErrors)[0];
    if (!firstKey) return;
    const el = document.getElementById(`field-${firstKey}`);
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors = validateCommunityForm(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      scrollToError(nextErrors);
      return;
    }

    if (!isGoogleScriptConfigured()) {
      setStatus('error');
      setSubmitMessage(
        'The form endpoint is not configured yet. Paste your deployed Apps Script web app URL into NEXT_PUBLIC_GOOGLE_SCRIPT_URL or lib/community-form.ts.'
      );
      return;
    }

    setStatus('submitting');
    setSubmitMessage('');
    const payload = communityFormToPayload(form);

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      setStatus('success');
    } catch {
      try {
        await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload),
        });
        setStatus('success');
      } catch {
        setStatus('error');
        setSubmitMessage('We could not send your response. Please try again in a moment.');
      }
    }
  };

  if (status === 'success') {
    return (
      <section className="mx-auto w-full max-w-[1100px] px-4 pb-24 pt-32 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="rounded-[2rem] bg-black/[0.03] p-1.5"
        >
          <div className="flex min-h-[420px] flex-col items-start justify-center rounded-[calc(2rem-0.375rem)] bg-white px-8 py-16 md:px-16">
            <CheckCircle2 className="mb-6 h-10 w-10 text-brand" strokeWidth={1.75} />
            <h2 className="max-w-2xl font-sans text-4xl font-extrabold tracking-tight text-text-primary md:text-5xl">
              Welcome to the <span className="editorial-italic text-brand">collective.</span>
            </h2>
            <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-text-secondary">
              Thank you, {form.fullName.split(' ')[0] || 'there'}. Your onboarding details are with the Aamukh Capital team. We will write to {form.email} with next steps.
            </p>
            <a
              href="/"
              className="group mt-10 inline-flex items-center gap-2 rounded-full bg-[#0A1128] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand"
            >
              Back to Aamukh Capital
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </motion.div>
      </section>
    );
  }

  const renderSectionNav = (compact: boolean) => (
    <div className={compact ? '' : 'pr-2'}>
      <div className={`${compact ? 'mb-2' : 'mb-5'} h-[3px] overflow-hidden rounded-full bg-[#ececec]`}>
        <div
          className="h-full rounded-full bg-brand transition-[width] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
          style={{ width: `${progress}%` }}
        />
      </div>
      <nav
        className={
          compact
            ? 'flex gap-1.5 overflow-x-auto pb-0.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden'
            : 'flex flex-col'
        }
      >
        {FORM_SECTIONS.map((section) => {
          const active = activeSection === section.id;
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={
                compact
                  ? `shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] transition-colors ${
                      active ? 'bg-brand text-white' : 'bg-white text-text-secondary ring-1 ring-[#ececec]'
                    }`
                  : `rounded-xl px-3 py-2.5 text-sm transition-colors ${
                      active ? 'bg-brand/[0.07] font-medium text-brand' : 'text-text-secondary hover:bg-black/[0.03] hover:text-text-primary'
                    }`
              }
            >
              {section.label}
            </a>
          );
        })}
      </nav>
    </div>
  );

  return (
    <div className="mx-auto w-full max-w-[1120px] px-4 pb-24 pt-28 md:px-8">
      <div className="grid grid-cols-1 [grid-template-areas:'header'_'nav'_'form'] lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-x-16 lg:[grid-template-areas:'nav_header'_'nav_form']">
        <aside className="sticky top-24 z-30 [grid-area:nav] -mx-4 mt-2 self-start border-y border-[#ececec] bg-snow px-4 py-3 lg:top-28 lg:mx-0 lg:mt-0 lg:border-0 lg:bg-transparent lg:px-0 lg:py-0">
          <div className="lg:hidden">{renderSectionNav(true)}</div>
          <div className="hidden lg:block">{renderSectionNav(false)}</div>
        </aside>

        <motion.header
          className="mb-5 max-w-2xl [grid-area:header] lg:mb-6"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          <h1 className="font-sans text-[clamp(1.85rem,4.2vw,3.15rem)] font-extrabold leading-[1.08] tracking-[-0.04em] text-text-primary">
            Angel Investor & Startup Community{' '}
            <span className="editorial-italic tracking-normal text-brand">Onboarding</span>
          </h1>
          <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-text-secondary md:text-[17px]">
            Aamukh Capital is building a community of angel investors, founders, operators, and industry experts who want to participate in the early-stage startup ecosystem. This form will help us understand your investment experience, sector expertise, investment interests, and potential interest in mentoring startups.
          </p>
          <p className="mt-3 text-sm text-text-muted">About 6 minutes to complete.</p>
        </motion.header>

        <form
          onSubmit={handleSubmit}
          className="min-w-0 [grid-area:form] rounded-[1.75rem] bg-white px-5 py-6 ring-1 ring-[#ececec] sm:px-8 sm:py-7 md:px-10"
          noValidate
        >
            <section id="personal" className="scroll-mt-36 lg:scroll-mt-28">
              <h2 className="font-sans text-xl font-bold tracking-tight text-text-primary md:text-2xl">Personal Details</h2>
              <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                <div id="field-fullName">
                  <Field id="fullName" label="Full Name" required error={errors.fullName}>
                    <input
                      id="fullName"
                      value={form.fullName}
                      onChange={(e) => setField('fullName', e.target.value)}
                      autoComplete="name"
                      className={`${inputClass} ${fieldBorder(errors.fullName)}`}
                    />
                  </Field>
                </div>
                <div id="field-email">
                  <Field id="email" label="Email Address" required error={errors.email}>
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setField('email', e.target.value)}
                      autoComplete="email"
                      className={`${inputClass} ${fieldBorder(errors.email)}`}
                    />
                  </Field>
                </div>
                <div id="field-phone">
                  <Field id="phone" label="Phone Number" required error={errors.phone}>
                    <input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setField('phone', e.target.value)}
                      autoComplete="tel"
                      className={`${inputClass} ${fieldBorder(errors.phone)}`}
                    />
                  </Field>
                </div>
                <div id="field-city">
                  <Field id="city" label="City" required error={errors.city}>
                    <input
                      id="city"
                      value={form.city}
                      onChange={(e) => setField('city', e.target.value)}
                      autoComplete="address-level2"
                      className={`${inputClass} ${fieldBorder(errors.city)}`}
                    />
                  </Field>
                </div>
                <Field id="linkedin" label="LinkedIn Profile">
                  <input
                    id="linkedin"
                    type="url"
                    value={form.linkedin}
                    onChange={(e) => setField('linkedin', e.target.value)}
                    placeholder="https://linkedin.com/in/..."
                    className={`${inputClass} ${fieldBorder()}`}
                  />
                </Field>
                <div id="field-designation">
                  <Field id="designation" label="Current Designation / Organization" required error={errors.designation}>
                    <input
                      id="designation"
                      value={form.designation}
                      onChange={(e) => setField('designation', e.target.value)}
                      className={`${inputClass} ${fieldBorder(errors.designation)}`}
                    />
                  </Field>
                </div>
                <Field id="yearsExperience" label="Years of Professional Experience">
                  <input
                    id="yearsExperience"
                    type="number"
                    min={0}
                    max={70}
                    value={form.yearsExperience}
                    onChange={(e) => setField('yearsExperience', e.target.value)}
                    className={`${inputClass} ${fieldBorder()}`}
                  />
                </Field>
              </div>
            </section>

            <hr className="my-5 border-[#f0f0f0]" />

            <section id="investment" className="scroll-mt-36 lg:scroll-mt-28">
              <h2 className="font-sans text-xl font-bold tracking-tight text-text-primary md:text-2xl">Investment Profile</h2>
              <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                <div id="field-investedBefore">
                  <Field id="investedBefore" label="Have you invested in startups before?" required error={errors.investedBefore}>
                    <SelectMenu
                      id="investedBefore"
                      options={YES_NO}
                      value={form.investedBefore}
                      onChange={(value) => {
                        setField('investedBefore', value as string);
                        if (value !== 'Yes') setField('startupCount', '');
                      }}
                      error={errors.investedBefore}
                    />
                  </Field>
                </div>

                <AnimatePresence>
                  {form.investedBefore === 'Yes' && (
                    <motion.div
                      key="startup-count"
                      id="field-startupCount"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                    >
                      <Field
                        id="startupCount"
                        label="If yes, approximately how many startups have you invested in?"
                        error={errors.startupCount}
                      >
                        <SelectMenu
                          id="startupCount"
                          options={STARTUP_COUNT}
                          value={form.startupCount}
                          onChange={(value) => setField('startupCount', value as string)}
                          error={errors.startupCount}
                        />
                      </Field>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Field id="preferredStage" label="What stage of startups do you prefer investing in?">
                  <SelectMenu
                    id="preferredStage"
                    options={INVESTMENT_STAGES}
                    value={form.preferredStage}
                    onChange={(value) => setField('preferredStage', value as string)}
                  />
                </Field>

                <Field id="ticketSize" label="What is your typical investment ticket size?">
                  <SelectMenu
                    id="ticketSize"
                    options={TICKET_SIZES}
                    value={form.ticketSize}
                    onChange={(value) => setField('ticketSize', value as string)}
                  />
                </Field>

                <div id="field-investmentSectors" className="md:col-span-2">
                  <Field
                    id="investmentSectors"
                    label="Which sectors are you interested in investing in?"
                    required
                    hint="Select all that apply."
                    error={errors.investmentSectors}
                  >
                    <SelectMenu
                      id="investmentSectors"
                      multiple
                      searchable
                      options={INVESTMENT_SECTORS}
                      value={form.investmentSectors}
                      onChange={(value) => setField('investmentSectors', value as string[])}
                      error={errors.investmentSectors}
                    />
                  </Field>
                </div>

                {form.investmentSectors.includes('Other') && (
                  <div id="field-investmentSectorsOther" className="md:col-span-2">
                    <Field
                      id="investmentSectorsOther"
                      label="Other investment sector"
                      required
                      error={errors.investmentSectorsOther}
                    >
                      <input
                        id="investmentSectorsOther"
                        value={form.investmentSectorsOther}
                        onChange={(e) => setField('investmentSectorsOther', e.target.value)}
                        className={`${inputClass} ${fieldBorder(errors.investmentSectorsOther)}`}
                      />
                    </Field>
                  </div>
                )}
              </div>
            </section>

            <hr className="my-5 border-[#f0f0f0]" />

            <section id="expertise" className="scroll-mt-36 lg:scroll-mt-28">
              <h2 className="font-sans text-xl font-bold tracking-tight text-text-primary md:text-2xl">
                Sector & Professional Expertise
              </h2>
              <div className="mt-5 grid grid-cols-1 gap-5">
                <div id="field-expertiseSectors">
                  <Field
                    id="expertiseSectors"
                    label="Which sectors best represent your professional expertise?"
                    required
                    hint="Select all that apply."
                    error={errors.expertiseSectors}
                  >
                    <SelectMenu
                      id="expertiseSectors"
                      multiple
                      searchable
                      options={EXPERTISE_SECTORS}
                      value={form.expertiseSectors}
                      onChange={(value) => setField('expertiseSectors', value as string[])}
                      error={errors.expertiseSectors}
                    />
                  </Field>
                </div>

                {form.expertiseSectors.includes('Other') && (
                  <div id="field-expertiseSectorsOther">
                    <Field
                      id="expertiseSectorsOther"
                      label="Other area of expertise"
                      required
                      error={errors.expertiseSectorsOther}
                    >
                      <input
                        id="expertiseSectorsOther"
                        value={form.expertiseSectorsOther}
                        onChange={(e) => setField('expertiseSectorsOther', e.target.value)}
                        className={`${inputClass} ${fieldBorder(errors.expertiseSectorsOther)}`}
                      />
                    </Field>
                  </div>
                )}

                <Field id="expertiseDescription" label="Briefly describe your professional expertise and experience.">
                  <textarea
                    id="expertiseDescription"
                    value={form.expertiseDescription}
                    onChange={(e) => setField('expertiseDescription', e.target.value)}
                    className={`${textareaClass} ${fieldBorder()}`}
                  />
                </Field>
              </div>
            </section>

            <hr className="my-5 border-[#f0f0f0]" />

            <section id="mentorship" className="scroll-mt-36 lg:scroll-mt-28">
              <h2 className="font-sans text-xl font-bold tracking-tight text-text-primary md:text-2xl">Startup Mentorship</h2>
              <div className="mt-5 grid grid-cols-1 gap-5">
                <div id="field-mentorshipInterest">
                  <Field
                    id="mentorshipInterest"
                    label="Apart from investment, would you be interested in mentoring startups in the Aamukh Capital community?"
                    required
                    error={errors.mentorshipInterest}
                  >
                    <SelectMenu
                      id="mentorshipInterest"
                      options={MENTORSHIP_INTEREST}
                      value={form.mentorshipInterest}
                      onChange={(value) => {
                        const next = value as string;
                        setField('mentorshipInterest', next);
                        if (next === 'No, investment only') {
                          setField('mentorshipAreas', []);
                          setField('mentorshipAreasOther', '');
                          setField('mentorshipStartupTypes', '');
                        }
                      }}
                      error={errors.mentorshipInterest}
                    />
                  </Field>
                </div>

                {wantsMentorship && (
                  <>
                    <Field
                      id="mentorshipAreas"
                      label="If yes, which areas can you mentor startups in?"
                      hint="Select all that apply."
                    >
                      <SelectMenu
                        id="mentorshipAreas"
                        multiple
                        searchable
                        options={MENTORSHIP_AREAS}
                        value={form.mentorshipAreas}
                        onChange={(value) => setField('mentorshipAreas', value as string[])}
                      />
                    </Field>

                    {form.mentorshipAreas.includes('Other') && (
                      <div id="field-mentorshipAreasOther">
                        <Field
                          id="mentorshipAreasOther"
                          label="Other mentorship area"
                          required
                          error={errors.mentorshipAreasOther}
                        >
                          <input
                            id="mentorshipAreasOther"
                            value={form.mentorshipAreasOther}
                            onChange={(e) => setField('mentorshipAreasOther', e.target.value)}
                            className={`${inputClass} ${fieldBorder(errors.mentorshipAreasOther)}`}
                          />
                        </Field>
                      </div>
                    )}

                    <Field
                      id="mentorshipStartupTypes"
                      label="What type of startups would you be most interested in mentoring?"
                    >
                      <textarea
                        id="mentorshipStartupTypes"
                        value={form.mentorshipStartupTypes}
                        onChange={(e) => setField('mentorshipStartupTypes', e.target.value)}
                        className={`${textareaClass} ${fieldBorder()}`}
                      />
                    </Field>
                  </>
                )}
              </div>
            </section>

            <hr className="my-5 border-[#f0f0f0]" />

            <section id="community" className="scroll-mt-36 lg:scroll-mt-28">
              <h2 className="font-sans text-xl font-bold tracking-tight text-text-primary md:text-2xl">Community Participation</h2>
              <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                <div id="field-participation" className="md:col-span-2">
                  <Field
                    id="participation"
                    label="How would you like to participate in the Aamukh Capital community?"
                    required
                    error={errors.participation}
                  >
                    <SelectMenu
                      id="participation"
                      multiple
                      options={PARTICIPATION_ROLES}
                      value={form.participation}
                      onChange={(value) => setField('participation', value as string[])}
                      error={errors.participation}
                    />
                  </Field>
                </div>

                {form.participation.includes('Other') && (
                  <div id="field-participationOther" className="md:col-span-2">
                    <Field
                      id="participationOther"
                      label="Other participation role"
                      required
                      error={errors.participationOther}
                    >
                      <input
                        id="participationOther"
                        value={form.participationOther}
                        onChange={(e) => setField('participationOther', e.target.value)}
                        className={`${inputClass} ${fieldBorder(errors.participationOther)}`}
                      />
                    </Field>
                  </div>
                )}

                <Field id="pitchSessions" label="Would you be open to participating in startup pitch sessions / demo days?">
                  <SelectMenu
                    id="pitchSessions"
                    options={YES_MAYBE_NO}
                    value={form.pitchSessions}
                    onChange={(value) => setField('pitchSessions', value as string)}
                  />
                </Field>

                <Field
                  id="introductions"
                  label="Would you be open to making introductions to relevant investors, customers, partners, or industry experts when appropriate?"
                >
                  <SelectMenu
                    id="introductions"
                    options={YES_MAYBE_NO}
                    value={form.introductions}
                    onChange={(value) => setField('introductions', value as string)}
                  />
                </Field>
              </div>
            </section>

            <hr className="my-5 border-[#f0f0f0]" />

            <section id="preferences" className="scroll-mt-36 lg:scroll-mt-28">
              <h2 className="font-sans text-xl font-bold tracking-tight text-text-primary md:text-2xl">Investment Preferences</h2>
              <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                <div id="field-evaluationCriteria" className="md:col-span-2">
                  <Field
                    id="evaluationCriteria"
                    label="What are you primarily looking for when evaluating a startup?"
                    hint="Select up to 3."
                    error={errors.evaluationCriteria}
                  >
                    <SelectMenu
                      id="evaluationCriteria"
                      multiple
                      max={3}
                      options={EVALUATION_CRITERIA}
                      value={form.evaluationCriteria}
                      onChange={(value) => setField('evaluationCriteria', value as string[])}
                      error={errors.evaluationCriteria}
                    />
                  </Field>
                </div>

                <div className="md:col-span-2">
                  <Field id="geographies" label="What geographies are you open to investing in?">
                    <SelectMenu
                      id="geographies"
                      multiple
                      options={GEOGRAPHIES}
                      value={form.geographies}
                      onChange={(value) => setField('geographies', value as string[])}
                    />
                  </Field>
                </div>
              </div>
            </section>

            <hr className="my-5 border-[#f0f0f0]" />

            <section id="final" className="scroll-mt-36 lg:scroll-mt-28">
              <h2 className="font-sans text-xl font-bold tracking-tight text-text-primary md:text-2xl">Final</h2>
              <div className="mt-5 grid grid-cols-1 gap-5">
                <Field id="communityGain" label="What would you like to gain from joining the Aamukh Capital community?">
                  <textarea
                    id="communityGain"
                    value={form.communityGain}
                    onChange={(e) => setField('communityGain', e.target.value)}
                    className={`${textareaClass} ${fieldBorder()}`}
                  />
                </Field>

                <Field
                  id="anythingElse"
                  label="Is there anything else you would like us to know about your investment interests, expertise, or expectations?"
                >
                  <textarea
                    id="anythingElse"
                    value={form.anythingElse}
                    onChange={(e) => setField('anythingElse', e.target.value)}
                    className={`${textareaClass} ${fieldBorder()}`}
                  />
                </Field>

                <Field id="hearAbout" label="How did you hear about Aamukh Capital?">
                  <SelectMenu
                    id="hearAbout"
                    options={HEAR_ABOUT}
                    value={form.hearAbout}
                    onChange={(value) => setField('hearAbout', value as string)}
                  />
                </Field>

                {form.hearAbout === 'Other' && (
                  <div id="field-hearAboutOther">
                    <Field id="hearAboutOther" label="Please specify" required error={errors.hearAboutOther}>
                      <input
                        id="hearAboutOther"
                        value={form.hearAboutOther}
                        onChange={(e) => setField('hearAboutOther', e.target.value)}
                        className={`${inputClass} ${fieldBorder(errors.hearAboutOther)}`}
                      />
                    </Field>
                  </div>
                )}

                <div id="field-consent" className="pt-2">
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={form.consent}
                      onChange={(e) => setField('consent', e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-[#cfcfcf] text-brand focus:ring-brand"
                    />
                    <span className="text-sm leading-relaxed text-text-secondary">
                      I agree to be contacted by Aamukh Capital regarding investment opportunities, startup pitches, mentorship opportunities, community events, and relevant ecosystem initiatives.
                      <span className="ml-1 text-brand">*</span>
                    </span>
                  </label>
                  {errors.consent && <p className="mt-2 text-[13px] text-red-600">{errors.consent}</p>}
                </div>
              </div>
            </section>

            {status === 'error' && submitMessage && (
              <p className="mt-8 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{submitMessage}</p>
            )}

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[13px] text-text-muted">Required fields are marked with *</p>
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#0A1128] px-8 text-sm font-semibold text-white transition-all hover:bg-brand active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending
                  </>
                ) : (
                  <>
                    Submit onboarding
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </>
                )}
              </button>
            </div>
        </form>
      </div>
    </div>
  );
}
