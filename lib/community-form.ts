export const GOOGLE_SCRIPT_URL =
  process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL ||
  'https://script.google.com/macros/s/AKfycby9Ke1BsoGMHqe1bI-U-nCkATWOVp38-IFA7P-C6hQ_lgIgNcIdGHLtOP_jKu1ixaKU/exec';

export const isGoogleScriptConfigured = () =>
  Boolean(
    GOOGLE_SCRIPT_URL &&
      !GOOGLE_SCRIPT_URL.includes('PASTE_YOUR_GOOGLE_APPS_SCRIPT') &&
      GOOGLE_SCRIPT_URL.startsWith('https://')
  );

export const YES_NO = ['Yes', 'No'] as const;

export const YES_MAYBE_NO = ['Yes', 'Maybe', 'No'] as const;

export const STARTUP_COUNT = ['1-2', '3-5', '6-10', '10+'] as const;

export const INVESTMENT_STAGES = [
  'Pre-seed',
  'Seed',
  'Pre-Series A',
  'Series A+',
  'Flexible / Open to all stages',
] as const;

export const TICKET_SIZES = [
  '₹1-5 Lakh',
  '₹5-10 Lakh',
  '₹10-25 Lakh',
  '₹25 Lakh-₹1 Crore',
  '₹1 Crore+',
  'Depends on the opportunity',
] as const;

export const INVESTMENT_SECTORS = [
  'FinTech',
  'SaaS / B2B',
  'AI / DeepTech',
  'Consumer / D2C',
  'HealthTech',
  'EdTech',
  'ClimateTech / Sustainability',
  'Agritech',
  'EV / Mobility',
  'Real Estate / PropTech',
  'FoodTech',
  'Media / Entertainment',
  'Manufacturing',
  'E-commerce',
  'Other',
] as const;

export const EXPERTISE_SECTORS = [
  'Finance & Investment',
  'Technology',
  'Sales & Business Development',
  'Marketing & Branding',
  'Operations',
  'Manufacturing',
  'Healthcare',
  'Education',
  'Real Estate',
  'Legal',
  'HR / Talent',
  'Product Management',
  'Supply Chain',
  'Strategy / Consulting',
  'Government / Public Policy',
  'Other',
] as const;

export const MENTORSHIP_INTEREST = [
  'Yes, definitely',
  'Maybe, depending on the startup',
  'No, investment only',
] as const;

export const MENTORSHIP_AREAS = [
  'Fundraising & Investor Readiness',
  'Business Strategy',
  'Finance & Financial Planning',
  'Sales & Business Development',
  'Marketing & Branding',
  'Product Development',
  'Technology',
  'Operations',
  'Hiring & Team Building',
  'Legal & Compliance',
  'Go-to-Market Strategy',
  'Corporate Partnerships',
  'International Expansion',
  'Founder Coaching',
  'Other',
] as const;

export const PARTICIPATION_ROLES = [
  'Angel Investor',
  'Startup Mentor',
  'Industry Expert',
  'Strategic Advisor',
  'Connector / Network Partner',
  'Investor + Mentor',
  'Other',
] as const;

export const EVALUATION_CRITERIA = [
  'Founding Team',
  'Market Opportunity',
  'Revenue / Traction',
  'Product',
  'Technology / IP',
  'Scalability',
  'Business Model',
  'Valuation',
  'Social / Environmental Impact',
  'Exit Potential',
] as const;

export const GEOGRAPHIES = [
  'Chhattisgarh',
  'Central India',
  'Pan India',
  'Global',
] as const;

export const HEAR_ABOUT = [
  'LinkedIn',
  'Referral',
  'Startup / Founder Network',
  'Event',
  'Aamukh Capital Team',
  'Other',
] as const;

export const FORM_SECTIONS = [
  { id: 'personal', label: 'Personal Details' },
  { id: 'investment', label: 'Investment Profile' },
  { id: 'expertise', label: 'Sector Expertise' },
  { id: 'mentorship', label: 'Startup Mentorship' },
  { id: 'community', label: 'Community' },
  { id: 'preferences', label: 'Preferences' },
  { id: 'final', label: 'Final' },
] as const;

export type CommunityFormState = {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  linkedin: string;
  designation: string;
  yearsExperience: string;
  investedBefore: string;
  startupCount: string;
  preferredStage: string;
  ticketSize: string;
  investmentSectors: string[];
  investmentSectorsOther: string;
  expertiseSectors: string[];
  expertiseSectorsOther: string;
  expertiseDescription: string;
  mentorshipInterest: string;
  mentorshipAreas: string[];
  mentorshipAreasOther: string;
  mentorshipStartupTypes: string;
  participation: string[];
  participationOther: string;
  pitchSessions: string;
  introductions: string;
  evaluationCriteria: string[];
  geographies: string[];
  communityGain: string;
  anythingElse: string;
  hearAbout: string;
  hearAboutOther: string;
  consent: boolean;
};

export const emptyCommunityForm = (): CommunityFormState => ({
  fullName: '',
  email: '',
  phone: '',
  city: '',
  linkedin: '',
  designation: '',
  yearsExperience: '',
  investedBefore: '',
  startupCount: '',
  preferredStage: '',
  ticketSize: '',
  investmentSectors: [],
  investmentSectorsOther: '',
  expertiseSectors: [],
  expertiseSectorsOther: '',
  expertiseDescription: '',
  mentorshipInterest: '',
  mentorshipAreas: [],
  mentorshipAreasOther: '',
  mentorshipStartupTypes: '',
  participation: [],
  participationOther: '',
  pitchSessions: '',
  introductions: '',
  evaluationCriteria: [],
  geographies: [],
  communityGain: '',
  anythingElse: '',
  hearAbout: '',
  hearAboutOther: '',
  consent: false,
});

export type CommunityFormErrors = Partial<Record<keyof CommunityFormState, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateCommunityForm(form: CommunityFormState): CommunityFormErrors {
  const errors: CommunityFormErrors = {};

  if (!form.fullName.trim()) errors.fullName = 'Enter your full name.';
  if (!form.email.trim()) errors.email = 'Enter your email address.';
  else if (!EMAIL_PATTERN.test(form.email.trim())) errors.email = 'Enter a valid email address.';
  if (!form.phone.trim()) errors.phone = 'Enter your phone number.';
  if (!form.city.trim()) errors.city = 'Enter your city.';
  if (!form.designation.trim()) errors.designation = 'Enter your designation or organization.';

  if (!form.investedBefore) errors.investedBefore = 'Select whether you have invested before.';
  if (form.investedBefore === 'Yes' && !form.startupCount) {
    errors.startupCount = 'Select how many startups you have invested in.';
  }

  if (form.investmentSectors.length === 0) {
    errors.investmentSectors = 'Select at least one investment sector.';
  }
  if (form.investmentSectors.includes('Other') && !form.investmentSectorsOther.trim()) {
    errors.investmentSectorsOther = 'Specify the other investment sector.';
  }

  if (form.expertiseSectors.length === 0) {
    errors.expertiseSectors = 'Select at least one area of professional expertise.';
  }
  if (form.expertiseSectors.includes('Other') && !form.expertiseSectorsOther.trim()) {
    errors.expertiseSectorsOther = 'Specify the other area of expertise.';
  }

  if (!form.mentorshipInterest) {
    errors.mentorshipInterest = 'Select your interest in mentoring startups.';
  }
  if (
    form.mentorshipInterest !== '' &&
    form.mentorshipInterest !== 'No, investment only' &&
    form.mentorshipAreas.includes('Other') &&
    !form.mentorshipAreasOther.trim()
  ) {
    errors.mentorshipAreasOther = 'Specify the other mentorship area.';
  }

  if (form.participation.length === 0) {
    errors.participation = 'Select how you would like to participate.';
  }
  if (form.participation.includes('Other') && !form.participationOther.trim()) {
    errors.participationOther = 'Specify how you would like to participate.';
  }

  if (form.evaluationCriteria.length > 3) {
    errors.evaluationCriteria = 'Select up to 3 evaluation criteria.';
  }

  if (form.hearAbout === 'Other' && !form.hearAboutOther.trim()) {
    errors.hearAboutOther = 'Tell us how you heard about Aamukh Capital.';
  }

  if (!form.consent) {
    errors.consent = 'Consent is required to submit this form.';
  }

  return errors;
}

export function communityFormToPayload(form: CommunityFormState) {
  const join = (values: string[]) => values.join('; ');

  return {
    timestamp: new Date().toISOString(),
    fullName: form.fullName.trim(),
    email: form.email.trim(),
    phone: form.phone.trim(),
    city: form.city.trim(),
    linkedin: form.linkedin.trim(),
    designation: form.designation.trim(),
    yearsExperience: form.yearsExperience.trim(),
    investedBefore: form.investedBefore,
    startupCount: form.investedBefore === 'Yes' ? form.startupCount : '',
    preferredStage: form.preferredStage,
    ticketSize: form.ticketSize,
    investmentSectors: join(form.investmentSectors),
    investmentSectorsOther: form.investmentSectors.includes('Other')
      ? form.investmentSectorsOther.trim()
      : '',
    expertiseSectors: join(form.expertiseSectors),
    expertiseSectorsOther: form.expertiseSectors.includes('Other')
      ? form.expertiseSectorsOther.trim()
      : '',
    expertiseDescription: form.expertiseDescription.trim(),
    mentorshipInterest: form.mentorshipInterest,
    mentorshipAreas:
      form.mentorshipInterest === 'No, investment only' ? '' : join(form.mentorshipAreas),
    mentorshipAreasOther:
      form.mentorshipInterest !== 'No, investment only' && form.mentorshipAreas.includes('Other')
        ? form.mentorshipAreasOther.trim()
        : '',
    mentorshipStartupTypes:
      form.mentorshipInterest === 'No, investment only' ? '' : form.mentorshipStartupTypes.trim(),
    participation: join(form.participation),
    participationOther: form.participation.includes('Other') ? form.participationOther.trim() : '',
    pitchSessions: form.pitchSessions,
    introductions: form.introductions,
    evaluationCriteria: join(form.evaluationCriteria),
    geographies: join(form.geographies),
    communityGain: form.communityGain.trim(),
    anythingElse: form.anythingElse.trim(),
    hearAbout: form.hearAbout,
    hearAboutOther: form.hearAbout === 'Other' ? form.hearAboutOther.trim() : '',
    consent: form.consent ? 'Yes' : 'No',
    source: 'aamukh-capital-website',
  };
}
