import type { Metadata } from 'next';
import NavigationSection from '@/components/NavigationSection';
import FooterSection from '@/components/FooterSection';
import MentorOnboardingForm from '@/components/mentor/MentorOnboardingForm';

export const metadata: Metadata = {
  title: 'Become a Mentor | Aamukh Capital',
  description:
    'Mentor onboarding for Aamukh Capital. Takes under 90 seconds. Tick-box for most questions. Operators who sit with founders, not above them.',
};

export default function MentorPage() {
  return (
    <main className="page-surface relative min-h-[100dvh] w-full overflow-x-clip selection:bg-brand selection:text-white">
      <NavigationSection />
      <MentorOnboardingForm />
      <FooterSection />
    </main>
  );
}
