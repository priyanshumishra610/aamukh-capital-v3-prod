import type { Metadata } from 'next';
import NavigationSection from '@/components/NavigationSection';
import FooterSection from '@/components/FooterSection';
import CommunityOnboardingForm from '@/components/community/CommunityOnboardingForm';

export const metadata: Metadata = {
  title: 'Angel Investor Community Onboarding | Aamukh Capital',
  description:
    'Aamukh Capital is building a private community of investors and mentors backing India\'s early-stage founders. Direct cap table deals only, with no exit load. The fund co-invests up to 20% of the cheque on early-stage deals.',
};

export default function CommunityPage() {
  return (
    <main className="page-surface relative min-h-[100dvh] w-full overflow-x-clip selection:bg-brand selection:text-white">
      <NavigationSection />
      <CommunityOnboardingForm />
      <FooterSection />
    </main>
  );
}
