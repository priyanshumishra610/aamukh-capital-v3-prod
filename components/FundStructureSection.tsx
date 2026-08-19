'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const ease = [0.19, 1, 0.22, 1] as const;

const cards = [
  {
    label: 'Discovery Program Commitment',
    value: '20%',
    valueClass: 'text-5xl font-medium tracking-tight text-[#4C6BE8]',
    desc: 'GP capital commitment for early-stage inception checks. Ensuring massive alignment.',
    dark: false,
  },
  {
    label: 'Signal Series Commitment',
    value: '10%',
    valueClass: 'text-5xl font-medium tracking-tight text-[#4C6BE8]',
    desc: 'Direct personal capital deployed alongside syndicate members for growth-stage checks.',
    dark: false,
  },
  {
    label: 'Sector Focus',
    value: 'Agnostic',
    valueClass: 'text-3xl font-medium tracking-tight text-text-primary',
    desc: 'We back exceptional founders, regardless of category. Thesis-driven, not trend-following.',
    dark: false,
  },
];

const FundStructureSection = () => {
  return (
    <section id="structure" className="w-full bg-snow py-16 md:py-20 px-6 lg:px-10 flex flex-col items-center">
      <div className="max-w-[100rem] w-full mx-auto flex flex-col items-center gap-10 md:gap-12">

        {/* Section Header */}
        <div className="flex flex-col items-center w-full border-t border-border pt-8 gap-5">
          <motion.div
            className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white border border-border shadow-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-8%' }}
            transition={{ duration: 0.5, ease }}
          >
            <span className="font-mono text-xs font-semibold tracking-widest text-[#4C6BE8] uppercase">
              The Architecture
            </span>
          </motion.div>

          <motion.h2
            className="font-geom font-medium text-4xl md:text-5xl lg:text-6xl text-center leading-[1.1] tracking-[-0.04em] text-text-primary text-balance max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
          >
            Structuring Alignment.
          </motion.h2>

          <motion.p
            className="font-geom text-lg md:text-xl text-text-secondary text-center max-w-[45rem] mt-2 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
          >
            We reject the industry standard of minimal GP commitment. Our structure is designed entirely around extreme skin in the game and shared upside with our LPs and founders.
          </motion.p>
        </div>

        {/* Data Cards Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.label}
              className="bg-white rounded-card p-10 flex flex-col gap-4 shadow-sm border border-border/50 hover:border-[#4C6BE8]/30 transition-colors"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5%' }}
              transition={{ duration: 0.65, delay: i * 0.1, ease }}
            >
              <div className="font-mono text-xs text-text-muted uppercase tracking-wider mb-2">{card.label}</div>
              <div className={`font-geom ${card.valueClass}`}>{card.value}</div>
              <p className="font-geom text-sm text-text-secondary leading-relaxed mt-4 pt-4 border-t border-border/60">
                {card.desc}
              </p>
            </motion.div>
          ))}

          {/* Dark CTA card */}
          <motion.div
            className="bg-[#0A1128] rounded-card p-10 flex flex-col gap-4 shadow-lg border border-[#152873] relative overflow-hidden group"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-5%' }}
            transition={{ duration: 0.65, delay: 0.3, ease }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#4C6BE8]/20 blur-[40px] rounded-full pointer-events-none" />
            <div className="font-mono text-xs text-[#869CE9] uppercase tracking-wider mb-2 z-10">Application Status</div>
            <div className="font-geom text-3xl font-medium tracking-tight text-white mb-4 z-10">Open</div>
            <a
              href="#apply"
              className="mt-auto z-10 w-full group flex items-center justify-between gap-2 px-6 py-4 bg-[#4C6BE8] hover:bg-[#2A4ED9] text-white rounded-xl text-sm font-medium transition-all duration-300"
            >
              Submit Thesis
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        {/* Closing Thesis Statement */}
        <motion.div
          className="w-full max-w-4xl mx-auto text-center mt-12 bg-background-secondary p-12 md:p-16 rounded-[2rem] border border-border"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-5%' }}
          transition={{ duration: 0.8, ease }}
        >
          <h3 className="font-geom font-medium text-2xl md:text-4xl tracking-[-0.02em] leading-tight text-text-primary mb-6">
            "We are not asset allocators. We are company builders deploying capital as a tool for acceleration."
          </h3>
          <p className="font-mono text-sm tracking-widest text-[#4C6BE8] uppercase">Aamukh Capital Thesis</p>
        </motion.div>

      </div>
    </section>
  );
};

export default FundStructureSection;
