'use client';

import React from 'react';
import { motion } from 'framer-motion';

const phases = [
  {
    id: 'discover',
    step: '01',
    title: 'Discover',
    copy: 'Sourcing high-signal founders through deep network density before they hit the consensus radar.',
    color: '#F59E0B',
    align: 'left',
    className:
      'order-2 lg:order-none lg:col-start-1 lg:row-start-1 lg:items-end lg:text-right lg:pr-8',
  },
  {
    id: 'back',
    step: '02',
    title: 'Back',
    copy: 'Deploying high-conviction capital with intense skin-in-the-game, ensuring absolute alignment with founders.',
    color: '#92400E',
    align: 'right',
    className:
      'order-3 lg:order-none lg:col-start-3 lg:row-start-1 lg:items-start lg:text-left lg:pl-8',
  },
  {
    id: 'scale',
    step: '03',
    title: 'Scale',
    copy: 'Activating our operator network to eliminate friction, accelerate GTM, and recruit tier-one talent.',
    color: '#00BCD4',
    align: 'right',
    className:
      'order-4 lg:order-none lg:col-start-3 lg:row-start-2 lg:items-start lg:text-left lg:pl-8 lg:self-end',
  },
  {
    id: 'remap',
    step: '04',
    title: 'Re-map',
    copy: 'Creating new ecosystem benchmarks. Once a category is won, the cycle restarts with massive systemic advantage.',
    color: '#EF4444',
    align: 'left',
    className:
      'order-5 lg:order-none lg:col-start-1 lg:row-start-2 lg:items-end lg:text-right lg:pr-8 lg:self-end',
  },
] as const;

const FlywheelModelSection = () => {
  return (
    <section id="flywheel" className="page-surface w-full py-16 md:py-20 px-6 lg:px-10 flex flex-col items-center overflow-hidden">
      <div className="max-w-[100rem] w-full mx-auto flex flex-col items-center">
        <div className="flex flex-col items-center w-full border-t border-border pt-8 gap-5 text-center mb-10 lg:mb-12">
          <motion.div
            className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white border border-border shadow-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-8%' }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            <span className="font-mono text-xs font-semibold tracking-widest text-brand uppercase">
              The Methodology
            </span>
          </motion.div>

          <motion.h2
            className="font-sans font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-[-0.04em] text-text-primary uppercase"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.48, delay: 0.05, ease: [0.23, 1, 0.32, 1] }}
          >
            The Aamukh <span className="editorial-italic lowercase tracking-normal text-brand">Flywheel</span>
          </motion.h2>
        </div>

        <div className="relative w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] lg:grid-rows-2 items-center gap-10 lg:gap-x-8 lg:gap-y-0 lg:h-[520px]">
          {phases.map((phase) => (
            <div
              key={phase.id}
              className={`flex flex-col text-center group relative w-full ${phase.className}`}
            >
              <div
                className="absolute inset-0 blur-[40px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{ backgroundColor: `${phase.color}0D` }}
              />
              <div className="relative z-10">
                <span
                  className="inline-block font-sans text-xs font-semibold uppercase tracking-widest px-2.5 py-1 rounded mb-3 border"
                  style={{
                    backgroundColor: `${phase.color}1A`,
                    color: phase.color,
                    borderColor: `${phase.color}33`,
                  }}
                >
                  Phase {phase.step}
                </span>
                <h3
                  className={`font-sans font-bold text-4xl lg:text-5xl tracking-tight mb-3 transition-transform duration-500 ${
                    phase.align === 'left' ? 'group-hover:-translate-x-2' : 'group-hover:translate-x-2'
                  }`}
                  style={{ color: phase.color }}
                >
                  {phase.title}
                </h3>
                <p
                  className={`font-sans text-base lg:text-lg text-text-secondary leading-relaxed max-w-[320px] mx-auto ${
                    phase.align === 'left' ? 'lg:mx-0 lg:ml-auto' : 'lg:mx-0'
                  }`}
                >
                  {phase.copy}
                </p>
              </div>
            </div>
          ))}

          <div className="order-1 lg:order-none lg:col-start-2 lg:row-start-1 lg:row-span-2 relative w-[300px] h-[300px] md:w-[480px] md:h-[480px] flex items-center justify-center shrink-0 mx-auto">
            <motion.div
              className="absolute inset-0 z-20 w-full h-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            >
              <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl overflow-visible">
                <g id="thinner-arrow-segment">
                  <path d="M 106.3 10.2 A 90 90 0 0 1 188.6 84.4 L 194 81 L 180 102 L 161 88 L 168.9 87.8 A 70 70 0 0 0 104.9 30.2 Z" />
                </g>
                <use href="#thinner-arrow-segment" fill="#92400E" transform="rotate(0 100 100)" />
                <use href="#thinner-arrow-segment" fill="#00BCD4" transform="rotate(90 100 100)" />
                <use href="#thinner-arrow-segment" fill="#EF4444" transform="rotate(180 100 100)" />
                <use href="#thinner-arrow-segment" fill="#F59E0B" transform="rotate(270 100 100)" />
              </svg>
            </motion.div>

            <div className="absolute z-40 w-[58%] h-[58%] rounded-full bg-brand shadow-[0_10px_40px_rgba(76,107,232,0.4)] flex flex-col items-center justify-center p-4 md:p-8 text-white border-[6px] md:border-[8px] border-white">
              <div className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-20" style={{ animationDuration: '3s' }} />
              <div className="text-center w-full flex flex-col items-center relative z-10">
                <span className="block font-sans font-bold text-2xl md:text-[2.2rem] text-white uppercase tracking-tight w-full leading-[1.05]">
                  Aamukh <br /> Capital
                </span>
                <span className="block font-sans text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] text-white/80 mt-3 md:mt-4">
                  Seeds of Success
                </span>
              </div>
            </div>

            <div className="absolute inset-0 bg-brand/10 blur-[100px] rounded-full pointer-events-none z-0 scale-90" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlywheelModelSection;
