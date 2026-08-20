'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const ease = [0.19, 1, 0.22, 1] as const;

const cards = [
  {
    label: 'Discovery GP commitment',
    value: '20%',
    valueClass: 'text-5xl font-medium tracking-tight text-[#4C6BE8]',
    desc: 'Personal GP capital on inception cheques. Alignment is a number, not a slogan.',
  },
  {
    label: 'Signal GP commitment',
    value: '10%',
    valueClass: 'text-5xl font-medium tracking-tight text-[#4C6BE8]',
    desc: 'Direct personal capital alongside syndicate members on growth-stage cheques.',
  },
  {
    label: 'Sector focus',
    value: 'Agnostic',
    valueClass: 'text-3xl font-medium tracking-tight text-text-primary',
    desc: 'Exceptional founders first. Category follows the person, not the other way around.',
  },
];

const FundStructureSection = () => {
  return (
    <section id="structure" className="page-surface w-full py-16 md:py-24 px-6 lg:px-10 flex flex-col items-center">
      <div className="max-w-[100rem] w-full mx-auto flex flex-col items-center gap-10 md:gap-12">
        <div className="flex flex-col items-center w-full border-t border-border pt-10 gap-5">
          <motion.h2
            className="font-geom font-medium text-4xl md:text-5xl lg:text-6xl text-center leading-[1.1] tracking-[-0.04em] text-text-primary text-balance max-w-4xl"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.48, ease }}
          >
            GP capital in the deal
          </motion.h2>

          <motion.p
            className="font-geom text-lg md:text-xl text-text-secondary text-center max-w-[42rem] leading-relaxed"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.06, ease }}
          >
            These are GP commitments, not carry. We write alongside LPs instead of collecting a fee on empty alignment.
          </motion.p>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.label}
              className="glass-panel rounded-card p-10 flex flex-col gap-4"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5%' }}
              transition={{ duration: 0.45, delay: i * 0.06, ease }}
            >
              <div className="font-sans text-sm text-text-muted mb-2">{card.label}</div>
              <div className={`font-geom ${card.valueClass}`}>{card.value}</div>
              <p className="font-geom text-sm text-text-secondary leading-relaxed mt-4 pt-4 border-t border-border/60">
                {card.desc}
              </p>
            </motion.div>
          ))}

          <motion.div
            className="bg-[#0A1128] rounded-card p-10 flex flex-col gap-4 border border-[#152873]"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-5%' }}
            transition={{ duration: 0.45, delay: 0.16, ease }}
          >
            <div className="font-sans text-sm text-[#c5d0f5] mb-2">Allocators</div>
            <div className="font-geom text-3xl font-medium tracking-tight text-white mb-4">Join the book</div>
            <Link
              href="/community"
              className="mt-auto w-full flex items-center justify-between gap-2 px-6 py-4 min-h-12 bg-[#4C6BE8] hover:bg-[#2A4ED9] text-white rounded-xl text-sm font-medium"
            >
              Join the syndicate
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FundStructureSection;
