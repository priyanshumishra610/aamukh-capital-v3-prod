'use client';

import NavigationSection from '@/components/NavigationSection';
import HeroSection from '@/components/HeroSection';
import HomeAmbient from '@/components/HomeAmbient';
import MarqueeSection from '@/components/MarqueeSection';
import ValuePropositionSection from '@/components/ValuePropositionSection';
import MarketVisionSection from '@/components/MarketVisionSection';
import CorePhilosophySection from '@/components/CorePhilosophySection';
import BentoGrid from '@/components/BentoGrid';
import FundStructureSection from '@/components/FundStructureSection';
import InteractiveDualModel from '@/components/InteractiveDualModel';
import PipelineShowcaseSection from '@/components/PipelineShowcaseSection';
import FlywheelModelSection from '@/components/FlywheelModelSection';
import TeamExpertiseSection from '@/components/TeamExpertiseSection';
import CallToActionSection from '@/components/CallToActionSection';
import FooterSection from '@/components/FooterSection';

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-transparent selection:bg-brand selection:text-white">
      <HomeAmbient />
      <NavigationSection />

      <HeroSection />
      <MarqueeSection baseVelocity={-120} scrollSensitivity={0.9} />

      <ValuePropositionSection />
      <CorePhilosophySection />
      <BentoGrid />
      <FundStructureSection />
      <InteractiveDualModel />
      <PipelineShowcaseSection />
      <FlywheelModelSection />
      <TeamExpertiseSection />
      <MarketVisionSection />
      <CallToActionSection />

      <FooterSection />
    </main>
  );
}
