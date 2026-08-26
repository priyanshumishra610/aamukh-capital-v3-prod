'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, Loader2, Mail, Phone } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import ChoiceGroup from '@/components/mentor/ChoiceGroup';
import {
  FUNCTIONAL_EXPERTISE,
  INVESTING_INTEREST,
  MENTOR_FORM_SECTIONS,
  MENTOR_SCRIPT_URL,
  MENTOR_SECTORS,
  MENTOR_STAGES,
  YEARS_EXPERIENCE,
  emptyMentorForm,
  isGoogleScriptConfigured,
  mentorFormToPayload,
  needsPhone,
  validateMentorForm,
  type MentorFormErrors,
  type MentorFormState,
} from '@/lib/mentor-form';

const ease = [0.19, 1, 0.22, 1] as const;

const inputClass =
  'h-14 w-full rounded-2xl border bg-white px-4 text-[15px] text-text-primary outline-none transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] placeholder:text-text-muted';

const textareaClass =
  'min-h-[96px] w-full resize-y rounded-2xl border bg-white px-4 py-3.5 text-[15px] leading-relaxed text-text-primary outline-none transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] placeholder:text-text-muted';

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
  align,
  children,
}: {
  id?: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  align?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      id={id ? `field-${id}` : undefined}
      className={
        align
          ? 'grid grid-rows-[1.5rem_3.5rem_minmax(1.25rem,auto)] gap-2'
          : 'flex flex-col gap-2'
      }
    >
      <label
        htmlFor={id}
        className="flex h-6 items-center text-sm font-medium tracking-tight text-text-primary"
      >
        {label}
        {required && <span className="ml-1 text-brand">*</span>}
      </label>
      {!align && hint && <p className="text-[13px] leading-relaxed text-text-secondary">{hint}</p>}
      {children}
      {align || error ? (
        <p className={`text-[13px] leading-5 ${error ? 'text-red-600' : 'text-text-secondary'}`}>
          {error || hint || '\u00a0'}
        </p>
      ) : null}
    </div>
  );
}

const CONTACT_META = [
  { value: 'Call', icon: Phone, label: 'Call' },
  { value: 'WhatsApp', icon: FaWhatsapp, label: 'WhatsApp' },
  { value: 'Email', icon: Mail, label: 'Email' },
] as const;

export default function MentorOnboardingForm() {
  const reduce = useReducedMotion();
  const [form, setForm] = useState<MentorFormState>(emptyMentorForm);
  const [errors, setErrors] = useState<MentorFormErrors>({});
  const [activeSection, setActiveSection] = useState('about');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const setField = <K extends keyof MentorFormState>(key: K, value: MentorFormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

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

    MENTOR_FORM_SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const requiredDone = useMemo(() => {
    const checks = [
      form.fullName.trim(),
      form.email.trim(),
      form.sectors.length > 0,
      form.contactPreference,
      needsPhone(form.contactPreference) ? form.phone.trim() : true,
    ];
    return checks.filter(Boolean).length;
  }, [form]);

  const requiredTotal = needsPhone(form.contactPreference) ? 5 : 4;
  const progress = Math.round((requiredDone / requiredTotal) * 100);

  const scrollToError = (nextErrors: MentorFormErrors) => {
    const firstKey = Object.keys(nextErrors)[0];
    if (!firstKey) return;
    const el = document.getElementById(`field-${firstKey}`);
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors = validateMentorForm(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      scrollToError(nextErrors);
      return;
    }

    if (!isGoogleScriptConfigured()) {
      setStatus('error');
      setSubmitMessage(
        'The form endpoint is not configured yet. Paste your deployed Apps Script web app URL into NEXT_PUBLIC_GOOGLE_SCRIPT_URL.'
      );
      return;
    }

    setStatus('submitting');
    setSubmitMessage('');
    const payload = mentorFormToPayload(form);

    try {
      const response = await fetch(MENTOR_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Request failed');
      setStatus('success');
    } catch {
      try {
        await fetch(MENTOR_SCRIPT_URL, {
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

  const sectionComplete = (id: string) => {
    if (id === 'about') return Boolean(form.fullName.trim() && form.email.trim());
    if (id === 'value') return form.sectors.length > 0;
    if (id === 'reach') {
      return Boolean(form.contactPreference) && (!needsPhone(form.contactPreference) || form.phone.trim());
    }
    if (id === 'investing') return Boolean(form.investingInterest);
    if (id === 'optional') return Boolean(form.notes.trim());
    return false;
  };

  if (status === 'success') {
    return (
      <section className="mx-auto w-full max-w-[1100px] px-4 pb-24 pt-32 md:px-8">
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="rounded-[2rem] bg-black/[0.03] p-1.5"
        >
          <div className="flex min-h-[420px] flex-col items-start justify-center rounded-[calc(2rem-0.375rem)] glass-panel px-8 py-16 md:px-16">
            <CheckCircle2 className="mb-6 h-10 w-10 text-brand" strokeWidth={1.75} />
            <h2 className="max-w-2xl font-sans text-4xl font-extrabold tracking-tight text-text-primary md:text-5xl">
              You are on the <span className="editorial-italic text-brand">mentor desk.</span>
            </h2>
            <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-text-secondary">
              Thank you, {form.fullName.split(' ')[0] || 'there'}. We have your profile. The Aamukh team will
              reach you
              {form.contactPreference === 'Email' ? ` at ${form.email}` : ' on the number you shared'}.
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
    <div className={compact ? '' : 'flex h-full flex-col'}>
      {!compact && (
        <>
          <p className="text-[13px] font-medium text-white/55">Mentor desk</p>
          <h2 className="mt-3 font-sans text-[1.85rem] font-extrabold leading-[1.12] tracking-[-0.04em] text-white">
            Sit with founders, not above them.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-white/70">
            Takes under 90 seconds. Most questions are tick-box.
          </p>
        </>
      )}

      <div className={`${compact ? 'mb-2' : 'mt-8 mb-5'} h-[3px] overflow-hidden rounded-full ${compact ? 'bg-[#ececec]' : 'bg-white/15'}`}>
        <div
          className={`h-full rounded-full transition-[width] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${compact ? 'bg-brand' : 'bg-white'}`}
          style={{ width: `${progress}%` }}
        />
      </div>

      <nav
        className={
          compact
            ? 'flex gap-1.5 overflow-x-auto pb-0.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden'
            : 'flex flex-col gap-0.5'
        }
      >
        {MENTOR_FORM_SECTIONS.map((section) => {
          const active = activeSection === section.id;
          const done = sectionComplete(section.id);
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={
                compact
                  ? `shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] transition-colors ${
                      active ? 'bg-brand text-white' : 'bg-white text-text-secondary ring-1 ring-[#ececec]'
                    }`
                  : `flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-colors ${
                      active ? 'bg-white/12 font-medium text-white' : 'text-white/65 hover:bg-white/8 hover:text-white'
                    }`
              }
            >
              {section.label}
              {!compact && done && <CheckCircle2 className="h-4 w-4 text-white/80" strokeWidth={1.8} />}
            </a>
          );
        })}
      </nav>

      {!compact && (
        <p className="mt-auto pt-10 text-[13px] leading-relaxed text-white/45">
          Sector-agnostic. Conviction-driven. Founder-first.
        </p>
      )}
    </div>
  );

  return (
    <div className="mx-auto w-full max-w-[1120px] px-4 pb-24 pt-28 md:px-8">
      <div className="grid grid-cols-1 [grid-template-areas:'header'_'nav'_'form'] lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-x-10 lg:[grid-template-areas:'rail_header'_'rail_form']">
        <aside className="sticky top-24 z-30 [grid-area:nav] -mx-4 mt-2 self-start border-y border-[#ececec] bg-snow px-4 py-3 lg:hidden">
          {renderSectionNav(true)}
        </aside>

        <aside className="sticky top-28 hidden h-[calc(100dvh-8rem)] [grid-area:rail] self-start lg:block">
          <div className="flex h-full flex-col rounded-[2rem] bg-[#0A1128] p-7 text-white shadow-[0_20px_50px_rgba(10,17,40,0.18)]">
            {renderSectionNav(false)}
          </div>
        </aside>

        <motion.header
          className="mb-5 max-w-2xl [grid-area:header] lg:mb-6"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          <h1 className="font-sans text-[clamp(1.85rem,4.2vw,3.15rem)] font-extrabold leading-[1.08] tracking-[-0.04em] text-text-primary">
            Mentor <span className="editorial-italic tracking-normal text-brand">onboarding</span>
          </h1>
          <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-text-secondary md:text-[17px]">
            Takes under 90 seconds. Most questions are tick-box. Only name, email, sector and contact preference
            are mandatory.
          </p>
        </motion.header>

        <div className="min-w-0 [grid-area:form]">
          <div className="rounded-[2rem] bg-black/[0.03] p-1.5">
            <form
              onSubmit={handleSubmit}
              className="glass-panel rounded-[calc(2rem-0.375rem)] px-5 py-6 sm:px-8 sm:py-8 md:px-10"
              noValidate
            >
              <section id="about" className="scroll-mt-36 lg:scroll-mt-28">
                <h2 className="font-sans text-xl font-bold tracking-tight text-text-primary md:text-2xl">
                  About you
                </h2>
                <div className="mt-5 grid grid-cols-1 gap-x-5 gap-y-5 md:grid-cols-2">
                  <Field id="fullName" label="Full name" required align error={errors.fullName}>
                    <input
                      id="fullName"
                      value={form.fullName}
                      onChange={(e) => setField('fullName', e.target.value)}
                      autoComplete="name"
                      className={`${inputClass} ${fieldBorder(errors.fullName)}`}
                    />
                  </Field>
                  <Field id="email" label="Email" required align error={errors.email}>
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setField('email', e.target.value)}
                      autoComplete="email"
                      className={`${inputClass} ${fieldBorder(errors.email)}`}
                    />
                  </Field>
                  <Field id="linkedin" label="LinkedIn profile" align error={errors.linkedin}>
                    <input
                      id="linkedin"
                      type="url"
                      value={form.linkedin}
                      onChange={(e) => setField('linkedin', e.target.value)}
                      placeholder="https://linkedin.com/in/..."
                      className={`${inputClass} ${fieldBorder(errors.linkedin)}`}
                    />
                  </Field>
                  <Field id="currentRole" label="Current role" align>
                    <input
                      id="currentRole"
                      value={form.currentRole}
                      onChange={(e) => setField('currentRole', e.target.value)}
                      placeholder="Founder, CXO, Partner, Consultant"
                      className={`${inputClass} ${fieldBorder()}`}
                    />
                  </Field>
                  <div className="md:col-span-2">
                    <Field id="yearsExperience" label="Years of experience" hint="Pick one.">
                      <ChoiceGroup
                        name="Years of experience"
                        variant="bar"
                        options={YEARS_EXPERIENCE}
                        value={form.yearsExperience}
                        onChange={(value) => setField('yearsExperience', value as string)}
                      />
                    </Field>
                  </div>
                </div>
              </section>

              <hr className="my-8 border-[#f0f0f0]" />

              <section id="value" className="scroll-mt-36 lg:scroll-mt-28">
                <h2 className="font-sans text-xl font-bold tracking-tight text-text-primary md:text-2xl">
                  Where you can add value
                </h2>
                <div className="mt-5 grid grid-cols-1 gap-7">
                  <div id="field-sectors">
                    <Field
                      id="sectors"
                      label="Sectors you can mentor in"
                      required
                      hint={`Pick up to three. ${form.sectors.length} of 3 selected.`}
                      error={errors.sectors}
                    >
                      <ChoiceGroup
                        name="Sectors"
                        variant="slots"
                        multiple
                        max={3}
                        slotLabel="Sector"
                        options={MENTOR_SECTORS}
                        value={form.sectors}
                        onChange={(value) => setField('sectors', value as string[])}
                        error={errors.sectors}
                      />
                    </Field>
                  </div>

                  <div id="field-functionalExpertise">
                    <Field
                      id="functionalExpertise"
                      label="Functional expertise you would bring"
                      hint={`Pick up to three. ${form.functionalExpertise.length} of 3 selected.`}
                      error={errors.functionalExpertise}
                    >
                      <ChoiceGroup
                        name="Functional expertise"
                        variant="slots"
                        multiple
                        max={3}
                        slotLabel="Expertise"
                        options={FUNCTIONAL_EXPERTISE}
                        value={form.functionalExpertise}
                        onChange={(value) => setField('functionalExpertise', value as string[])}
                        error={errors.functionalExpertise}
                      />
                    </Field>
                  </div>

                  <Field id="stage" label="Stage you are most useful at" hint="Pick one.">
                    <ChoiceGroup
                      name="Stage"
                      variant="rows"
                      options={MENTOR_STAGES}
                      value={form.stage}
                      onChange={(value) => setField('stage', value as string)}
                    />
                  </Field>
                </div>
              </section>

              <hr className="my-8 border-[#f0f0f0]" />

              <section id="reach" className="scroll-mt-36 lg:scroll-mt-28">
                <h2 className="font-sans text-xl font-bold tracking-tight text-text-primary md:text-2xl">
                  How we reach you
                </h2>
                <div className="mt-5 grid grid-cols-1 gap-5">
                  <div id="field-contactPreference">
                    <Field
                      id="contactPreference"
                      label="Preferred format to contact you"
                      required
                      hint="Pick one."
                      error={errors.contactPreference}
                    >
                      <div
                        role="radiogroup"
                        aria-label="Preferred format to contact you"
                        className={`grid grid-cols-3 overflow-hidden rounded-2xl border bg-white ${
                          errors.contactPreference ? 'border-red-400 ring-2 ring-red-100' : 'border-[#e8e8e8]'
                        }`}
                      >
                        {CONTACT_META.map((option, index) => {
                          const active = form.contactPreference === option.value;
                          const Icon = option.icon;
                          return (
                            <button
                              key={option.value}
                              type="button"
                              aria-pressed={active}
                              onClick={() => {
                                setField('contactPreference', option.value);
                                if (option.value === 'Email') setField('phone', '');
                              }}
                              className={`flex h-[92px] flex-col items-center justify-center gap-2 transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                                index < CONTACT_META.length - 1 ? 'border-r border-[#f0f0f0]' : ''
                              } ${
                                active
                                  ? 'bg-[#0A1128] text-white'
                                  : 'text-text-primary hover:bg-black/[0.03]'
                              }`}
                            >
                              <Icon className="h-5 w-5" />
                              <span className="text-[14px] font-medium">{option.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </Field>
                  </div>

                  <AnimatePresence>
                    {needsPhone(form.contactPreference) && (
                      <motion.div
                        key="phone"
                        id="field-phone"
                        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
                      >
                        <Field
                          id="phone"
                          label="Contact number"
                          required
                          hint="Only if you picked call or WhatsApp."
                          error={errors.phone}
                        >
                          <input
                            id="phone"
                            type="tel"
                            value={form.phone}
                            onChange={(e) => setField('phone', e.target.value)}
                            autoComplete="tel"
                            className={`${inputClass} ${fieldBorder(errors.phone)}`}
                          />
                        </Field>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </section>

              <hr className="my-8 border-[#f0f0f0]" />

              <section id="investing" className="scroll-mt-36 lg:scroll-mt-28">
                <h2 className="font-sans text-xl font-bold tracking-tight text-text-primary md:text-2xl">
                  Investing
                </h2>
                <div className="mt-5">
                  <Field
                    id="investingInterest"
                    label="Are you interested in investing in Aamukh deals?"
                    hint="Pick one."
                  >
                    <ChoiceGroup
                      name="Investing interest"
                      variant="rows"
                      options={INVESTING_INTEREST}
                      value={form.investingInterest}
                      onChange={(value) => setField('investingInterest', value as string)}
                    />
                  </Field>
                </div>
              </section>

              <hr className="my-8 border-[#f0f0f0]" />

              <section id="optional" className="scroll-mt-36 lg:scroll-mt-28">
                <h2 className="font-sans text-xl font-bold tracking-tight text-text-primary md:text-2xl">
                  Optional
                </h2>
                <div className="mt-5">
                  <Field
                    id="notes"
                    label="Anything specific you would like to work on?"
                    hint="Two lines is plenty."
                  >
                    <textarea
                      id="notes"
                      rows={2}
                      value={form.notes}
                      onChange={(e) => setField('notes', e.target.value)}
                      className={`${textareaClass} ${fieldBorder()}`}
                    />
                  </Field>
                </div>
              </section>

              {status === 'error' && submitMessage && (
                <p className="mt-8 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{submitMessage}</p>
              )}

              <div className="mt-8 flex flex-col gap-4 border-t border-[#f0f0f0] pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[13px] text-text-muted">
                  Required fields are marked with *. {requiredDone} of {requiredTotal} complete.
                </p>
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
                      Submit mentor profile
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
      </div>
    </div>
  );
}
