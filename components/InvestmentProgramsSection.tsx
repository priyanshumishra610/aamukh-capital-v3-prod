import React from 'react';

const InvestmentProgramsSection = () => {
  return (
    <section id="collective" className="w-full bg-snow py-16 md:py-20 px-6 lg:px-10 flex flex-col items-center">
      <div className="max-w-[100rem] w-full mx-auto flex flex-col items-center gap-10 md:gap-12">

        {/* Section Intro */}
        <div className="flex flex-col items-center w-full border-t border-border pt-8 gap-5">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white border border-border shadow-sm">
            <span className="font-mono text-xs font-semibold tracking-widest text-[#4C6BE8] uppercase">
              The Collective
            </span>
          </div>

          <h2 className="font-geom font-medium text-4xl md:text-5xl lg:text-6xl text-center leading-[1.1] tracking-[-0.04em] text-text-primary text-balance max-w-4xl">
            A New Standard for Value Creation.
          </h2>
          <p className="font-geom text-lg md:text-xl text-text-secondary text-center max-w-[45rem] mt-2 leading-relaxed">
            We are operators, founders, and domain experts pooling capital and intellect to accelerate the next generation of category-defining companies.
          </p>
        </div>

        {/* Advisory Network Modules */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white rounded-card p-10 flex flex-col gap-8 shadow-sm border border-border/50 transition-all hover:-translate-y-2 hover:shadow-xl hover:border-[#4C6BE8]/30 duration-300">
            <div className="w-16 h-16 rounded-2xl bg-background-secondary flex items-center justify-center">
              <span className="text-3xl text-[#4C6BE8] font-geom">🎯</span>
            </div>
            <h3 className="font-geom font-medium text-2xl tracking-[-0.02em] text-text-primary">
              Tactical Advisory
            </h3>
            <p className="font-geom text-lg text-text-secondary leading-relaxed flex-grow">
              Direct access to seasoned founders who have scaled from zero to IPO. We match portfolio companies with operators who have solved their specific friction points before.
            </p>
          </div>

          <div className="bg-white rounded-card p-10 flex flex-col gap-8 shadow-sm border border-border/50 transition-all hover:-translate-y-2 hover:shadow-xl hover:border-[#4C6BE8]/30 duration-300">
             <div className="w-16 h-16 rounded-2xl bg-background-secondary flex items-center justify-center">
              <span className="text-3xl text-[#4C6BE8] font-geom">🧲</span>
            </div>
            <h3 className="font-geom font-medium text-2xl tracking-[-0.02em] text-text-primary">
              Talent Density
            </h3>
            <p className="font-geom text-lg text-text-secondary leading-relaxed flex-grow">
              Leveraging the collective's network to attract outlier engineering, product, and growth talent into our early-stage bets. Capital is abundant; talent is the real bottleneck.
            </p>
          </div>

          <div className="bg-white rounded-card p-10 flex flex-col gap-8 shadow-sm border border-border/50 transition-all hover:-translate-y-2 hover:shadow-xl hover:border-[#4C6BE8]/30 duration-300">
             <div className="w-16 h-16 rounded-2xl bg-background-secondary flex items-center justify-center">
              <span className="text-3xl text-[#4C6BE8] font-geom">🚀</span>
            </div>
            <h3 className="font-geom font-medium text-2xl tracking-[-0.02em] text-text-primary">
              Subsequent Funding
            </h3>
            <p className="font-geom text-lg text-text-secondary leading-relaxed flex-grow">
              Seamlessly bridging inception rounds to crucial Series A/B milestones. Our ecosystem acts as a signal for top-tier institutional funds when companies are ready to break out.
            </p>
          </div>

        </div>

        {/* Application CTA Banner */}
        <div className="w-full relative mt-16 rounded-[2rem] overflow-hidden bg-[#0A1128] px-8 py-20 md:py-32 flex flex-col items-center justify-center text-center">
          
          {/* Subtle Accent Glows */}
          <div className="absolute top-0 left-0 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-[#4C6BE8]/20 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-[#4C6BE8]/10 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center max-w-3xl">
            <h3 className="font-geom font-medium text-4xl md:text-6xl tracking-[-0.03em] mb-6 text-white leading-tight">
              Ready to scale with unyielding support?
            </h3>
            <p className="font-geom text-lg md:text-xl text-[#A0AEE4] max-w-2xl leading-relaxed mb-12">
              We exclusively back ambitious founders building category-defining companies. If that describes your vision, we want to hear from you.
            </p>
            
            <a 
              href="#apply" 
              className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white text-[#0A1128] rounded-full text-lg font-medium hover:bg-gray-100 transition-all duration-300 shadow-xl shadow-black/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              Submit Your Pitch
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default InvestmentProgramsSection;