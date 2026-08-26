import { GOOGLE_SCRIPT_URL, isGoogleScriptConfigured } from '@/lib/community-form';

export { GOOGLE_SCRIPT_URL, isGoogleScriptConfigured };

export const MENTOR_SCRIPT_URL =
  process.env.NEXT_PUBLIC_MENTOR_SCRIPT_URL || GOOGLE_SCRIPT_URL;

export const YEARS_EXPERIENCE = ['1-5', '5-10', '10-15', '15-20', '20+'] as const;

export const MENTOR_SECTORS = [
  'Consumer / D2C',
  'Retail and offline commerce',
  'Fintech',
  'SaaS and B2B software',
  'AI / DeepTech',
  'Climate, energy and sustainability',
  'Healthcare and wellness',
  'Edtech',
  'Agritech and rural',
  'Mobility, EV and logistics',
  'Media, creator economy and sports',
  'Bharat-tech / tier 2-3 businesses',
  'Sector-agnostic',
] as const;

export const FUNCTIONAL_EXPERTISE = [
  'Go-to-market and sales',
  'Brand and marketing',
  'Product and design',
  'Engineering and tech architecture',
  'Fundraising and investor relations',
  'Finance, unit economics and compliance',
  'Hiring and org building',
  'Supply chain and operations',
  'Offline retail and distribution',
  'International expansion',
] as const;

export const MENTOR_STAGES = [
  'Idea and student-stage founders',
  'Pre-seed to seed',
  'Series A and beyond',
  'No preference',
] as const;

export const CONTACT_PREFERENCES = ['Call', 'WhatsApp', 'Email'] as const;

export const INVESTING_INTEREST = [
  'Yes',
  'Maybe, depends on the deal',
  'No, mentorship only',
] as const;

export const MENTOR_FORM_SECTIONS = [
  { id: 'about', label: 'About you' },
  { id: 'value', label: 'Where you add value' },
  { id: 'reach', label: 'How we reach you' },
  { id: 'investing', label: 'Investing' },
  { id: 'optional', label: 'Optional' },
] as const;

export type MentorFormState = {
  fullName: string;
  email: string;
  linkedin: string;
  currentRole: string;
  yearsExperience: string;
  sectors: string[];
  functionalExpertise: string[];
  stage: string;
  contactPreference: string;
  phone: string;
  investingInterest: string;
  notes: string;
};

export const emptyMentorForm = (): MentorFormState => ({
  fullName: '',
  email: '',
  linkedin: '',
  currentRole: '',
  yearsExperience: '',
  sectors: [],
  functionalExpertise: [],
  stage: '',
  contactPreference: '',
  phone: '',
  investingInterest: '',
  notes: '',
});

export type MentorFormErrors = Partial<Record<keyof MentorFormState, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const needsPhone = (preference: string) =>
  preference === 'Call' || preference === 'WhatsApp';

export function validateMentorForm(form: MentorFormState): MentorFormErrors {
  const errors: MentorFormErrors = {};

  if (!form.fullName.trim()) errors.fullName = 'Enter your full name.';
  if (!form.email.trim()) errors.email = 'Enter your email address.';
  else if (!EMAIL_PATTERN.test(form.email.trim())) errors.email = 'Enter a valid email address.';

  if (form.linkedin.trim() && !/linkedin\.com/i.test(form.linkedin.trim())) {
    errors.linkedin = 'Enter a valid LinkedIn URL.';
  }

  if (form.sectors.length === 0) errors.sectors = 'Pick at least one sector.';
  else if (form.sectors.length > 3) errors.sectors = 'Pick up to three sectors.';

  if (form.functionalExpertise.length > 3) {
    errors.functionalExpertise = 'Pick up to three areas of expertise.';
  }

  if (!form.contactPreference) errors.contactPreference = 'Pick how we should reach you.';
  if (needsPhone(form.contactPreference) && !form.phone.trim()) {
    errors.phone = 'Enter a contact number for call or WhatsApp.';
  }

  return errors;
}

export function mentorFormToPayload(form: MentorFormState) {
  return {
    timestamp: new Date().toISOString(),
    formType: 'mentor',
    fullName: form.fullName.trim(),
    email: form.email.trim(),
    linkedin: form.linkedin.trim(),
    currentRole: form.currentRole.trim(),
    yearsExperience: form.yearsExperience,
    sectors: form.sectors.join('; '),
    functionalExpertise: form.functionalExpertise.join('; '),
    stage: form.stage,
    contactPreference: form.contactPreference,
    phone: needsPhone(form.contactPreference) ? form.phone.trim() : '',
    investingInterest: form.investingInterest,
    notes: form.notes.trim(),
    source: 'aamukh-capital-mentor',
  };
}
