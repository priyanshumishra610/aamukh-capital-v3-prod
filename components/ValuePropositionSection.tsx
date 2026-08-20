'use client';

import React from 'react';
import { motion } from 'framer-motion';

const ease = [0.19, 1, 0.22, 1] as const;

const stats = [
  { value: '100+', label: 'Unicorns' },
  { value: '100K+', label: 'Startups' },
  { value: '$340B+', label: 'Total Valuation' },
];

const ValuePropositionSection = () => {
  return (
    <section id="context" className="page-surface w-full pt-16 pb-10 md:pt-20 md:pb-12 px-6 lg:px-10 flex flex-col items-center">
      <div className="max-w-[100rem] w-full mx-auto flex flex-col items-center">

        <motion.div
          className="w-full glass-panel rounded-card p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-10"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-8%' }}
          transition={{ duration: 0.48, ease }}
        >
          <div className="max-w-2xl">
            <motion.div
              className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-white border border-border shadow-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.06, ease }}
            >
              <span className="font-mono text-xs font-semibold tracking-widest text-brand uppercase">
                The Macro Context
              </span>
            </motion.div>

            <motion.h3
              className="font-geom font-medium text-3xl md:text-4xl tracking-[-0.02em] mb-4 text-text-primary leading-tight"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.08, ease }}
            >
              India's Unprecedented Scale
            </motion.h3>

            <motion.p
              className="font-geom text-lg text-text-secondary leading-relaxed"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.12, ease }}
            >
              We are investing in the world's most dynamic startup ecosystem at a historic inflection point. The depth of talent and ambition is driving exponential value creation.
            </motion.p>
          </div>

          <div className="flex flex-wrap md:flex-nowrap gap-4 md:gap-6 w-full lg:w-auto shrink-0">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="bg-white px-6 py-6 rounded-2xl border border-border min-w-[140px] shadow-sm transition-[transform,box-shadow] duration-200 ease-out [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-md"
                initial={{ opacity: 0, y: 16, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.42, delay: 0.12 + i * 0.06, ease }}
              >
                <div className="font-geom text-3xl md:text-4xl font-medium text-brand tracking-tight mb-1">
                  {stat.value}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ValuePropositionSection;
