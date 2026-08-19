'use client';

import React from 'react';
import { motion } from 'framer-motion';

const FlywheelModelSection = () => {
  return (
    <section id="flywheel" className="w-full bg-[#fffafa] py-16 md:py-20 px-6 lg:px-10 flex flex-col items-center overflow-hidden">
      <div className="max-w-[100rem] w-full mx-auto flex flex-col items-center">

        {/* Section Header */}
        <div className="flex flex-col items-center w-full border-t border-border pt-8 gap-5 text-center mb-10 lg:mb-12">
          <motion.div
            className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white border border-border shadow-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-8%' }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
          >
            <span className="font-mono text-xs font-semibold tracking-widest text-brand uppercase">
              The Methodology
            </span>
          </motion.div>

          <motion.h2
            className="font-sans font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-[-0.04em] text-text-primary uppercase"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
          >
            The Aamukh <span className="editorial-italic lowercase tracking-normal text-brand">Flywheel</span>
          </motion.h2>
        </div>

        {/* --- Interactive Desktop Layout --- */}
        <div className="relative w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-center gap-12 lg:gap-8">
          
          {/* LEFT COLUMN (Discover & Re-map) */}
          <div className="order-2 lg:order-1 flex flex-col gap-12 lg:gap-0 lg:h-[420px] lg:justify-between w-full z-10">
            
            {/* Discover (Top Left) */}
            <div className="flex flex-col lg:items-end text-center lg:text-right group relative w-full lg:pr-8">
              <div className="absolute inset-0 bg-[#F59E0B]/5 blur-[40px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10">
                <span className="inline-block font-mono text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-[#F59E0B]/10 text-[#F59E0B] mb-3 border border-[#F59E0B]/20">
                  Phase 01
                </span>
                <h4 className="font-sans font-bold text-4xl lg:text-5xl tracking-tight mb-3 text-[#F59E0B] transition-transform duration-500 group-hover:-translate-x-2">
                  Discover
                </h4>
                <p className="font-sans text-base lg:text-lg text-text-secondary leading-relaxed max-w-[320px] mx-auto lg:mx-0 lg:ml-auto">
                  Sourcing high-signal founders through deep network density before they hit the consensus radar.
                </p>
              </div>
            </div>

            {/* Re-map (Bottom Left) */}
            <div className="flex flex-col lg:items-end text-center lg:text-right group relative w-full lg:pr-8">
              <div className="absolute inset-0 bg-[#EF4444]/5 blur-[40px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10">
                <span className="inline-block font-mono text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-[#EF4444]/10 text-[#EF4444] mb-3 border border-[#EF4444]/20">
                  Phase 04
                </span>
                <h4 className="font-sans font-bold text-4xl lg:text-5xl tracking-tight mb-3 text-[#EF4444] transition-transform duration-500 group-hover:-translate-x-2">
                  Re-map
                </h4>
                <p className="font-sans text-base lg:text-lg text-text-secondary leading-relaxed max-w-[320px] mx-auto lg:mx-0 lg:ml-auto">
                  Creating new ecosystem benchmarks. Once a category is won, the cycle restarts with massive systemic advantage.
                </p>
              </div>
            </div>

          </div>

          {/* CENTER GRAPHIC (Arrows & Circle) */}
          <div className="order-1 lg:order-2 relative w-[300px] h-[300px] md:w-[480px] md:h-[480px] flex items-center justify-center shrink-0 mx-auto">
            
            {/* Spinning SVG Arrow Ring */}
            <motion.div 
              className="absolute inset-0 z-20 w-full h-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
              <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl overflow-visible">
                <g id="thinner-arrow-segment">
                  <path 
                    d="M 106.3 10.2 A 90 90 0 0 1 188.6 84.4 L 194 81 L 180 102 L 161 88 L 168.9 87.8 A 70 70 0 0 0 104.9 30.2 Z" 
                  />
                </g>

                {/* Back (Brown) - Top Right */}
                <use href="#thinner-arrow-segment" fill="#92400E" transform="rotate(0 100 100)" />
                {/* Scale (Cyan) - Bottom Right */}
                <use href="#thinner-arrow-segment" fill="#00BCD4" transform="rotate(90 100 100)" />
                {/* Re-map (Red) - Bottom Left */}
                <use href="#thinner-arrow-segment" fill="#EF4444" transform="rotate(180 100 100)" />
                {/* Discover (Orange) - Top Left */}
                <use href="#thinner-arrow-segment" fill="#F59E0B" transform="rotate(270 100 100)" />
              </svg>
            </motion.div>

            {/* Central Blue Circle */}
            <div className="absolute z-40 w-[58%] h-[58%] rounded-full bg-brand shadow-[0_10px_40px_rgba(76,107,232,0.4)] flex flex-col items-center justify-center p-4 md:p-8 text-white border-[6px] md:border-[8px] border-white group">
              
              {/* Subtle inner pulse */}
              <div className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-20" style={{ animationDuration: '3s' }} />

              <div className="text-center w-full flex flex-col items-center relative z-10">
                <span className="block font-sans font-bold text-2xl md:text-[2.2rem] text-white uppercase tracking-tight w-full leading-[1.05]">
                  Aamukh <br/> Capital
                </span>
                <span className="block font-mono text-[8px] md:text-[10px] font-semibold uppercase tracking-[0.25em] text-white/80 mt-3 md:mt-4">
                  Seeds of Success
                </span>
              </div>
            </div>
            
            {/* Soft background aesthetic glow behind graphic */}
            <div className="absolute inset-0 bg-brand/10 blur-[100px] rounded-full pointer-events-none z-0 scale-90" />
          </div>

          {/* RIGHT COLUMN (Back & Scale) */}
          <div className="order-3 lg:order-3 flex flex-col gap-12 lg:gap-0 lg:h-[420px] lg:justify-between w-full z-10">
            
            {/* Back (Top Right) */}
            <div className="flex flex-col lg:items-start text-center lg:text-left group relative w-full lg:pl-8">
              <div className="absolute inset-0 bg-[#92400E]/5 blur-[40px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10">
                <span className="inline-block font-mono text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-[#92400E]/10 text-[#92400E] mb-3 border border-[#92400E]/20">
                  Phase 02
                </span>
                <h4 className="font-sans font-bold text-4xl lg:text-5xl tracking-tight mb-3 text-[#92400E] transition-transform duration-500 group-hover:translate-x-2">
                  Back
                </h4>
                <p className="font-sans text-base lg:text-lg text-text-secondary leading-relaxed max-w-[320px] mx-auto lg:mx-0">
                  Deploying high-conviction capital with intense skin-in-the-game, ensuring absolute alignment with founders.
                </p>
              </div>
            </div>

            {/* Scale (Bottom Right) */}
            <div className="flex flex-col lg:items-start text-center lg:text-left group relative w-full lg:pl-8">
              <div className="absolute inset-0 bg-[#00BCD4]/5 blur-[40px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10">
                <span className="inline-block font-mono text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-[#00BCD4]/10 text-[#00BCD4] mb-3 border border-[#00BCD4]/20">
                  Phase 03
                </span>
                <h4 className="font-sans font-bold text-4xl lg:text-5xl tracking-tight mb-3 text-[#00BCD4] transition-transform duration-500 group-hover:translate-x-2">
                  Scale
                </h4>
                <p className="font-sans text-base lg:text-lg text-text-secondary leading-relaxed max-w-[320px] mx-auto lg:mx-0">
                  Activating our operator network to eliminate friction, accelerate GTM, and recruit tier-one talent.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default FlywheelModelSection;