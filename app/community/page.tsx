import type { Metadata } from 'next';
import NavigationSection from '@/components/NavigationSection';
import FooterSection from '@/components/FooterSection';
import CommunityOnboardingForm from '@/components/community/CommunityOnboardingForm';

export const metadata: Metadata = {
  title: 'Angel Investor Community Onboarding | Aamukh Capital',
  description:
    'Join the Aamukh Capital community of angel investors, founders, operators, and industry experts. Share your investment experience, sector expertise, and interest in mentoring startups.',
};

export default function CommunityPage() {
  return (
    <main className="relative min-h-[100dvh] w-full overflow-x-clip bg-snow selection:bg-brand selection:text-white">
      <NavigationSection />
      <CommunityOnboardingForm />
      <FooterSection />
    </main>
  );
}
