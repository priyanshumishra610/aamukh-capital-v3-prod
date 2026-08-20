'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const ease = [0.19, 1, 0.22, 1] as const;

export default function CallToActionSection() {
  return (
    <section
      id="apply"
      className="page-surface w-full py-16 md:py-24 border-t border-border/50"
    >
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-[6vw] lg:px-[8vw]">
        <motion.h2
          className="font-geom font-medium text-4xl md:text-5xl lg:text-6xl tracking-[-0.03em] text-text-primary leading-[1.1] mb-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.48, ease }}
        >
          Two ways in
        </motion.h2>
        <motion.p
          className="font-sans text-lg text-text-secondary max-w-xl mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05, ease }}
        >
          Allocators join the syndicate. Founders write to the firm. Same desk, different door.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 border-t border-border pt-10">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.42, ease }}
            className="flex flex-col gap-5"
          >
            <h3 className="font-geom text-2xl md:text-3xl font-medium text-text-primary">Allocators</h3>
            <p className="font-sans text-base md:text-lg text-text-secondary leading-relaxed">
              Operator-led book. GP capital sits in the same deals. Onboarding is a form, not a waiting room.
            </p>
            <Link
              href="/community"
              className="inline-flex w-fit items-center gap-2 min-h-12 px-7 py-3.5 bg-[#4C6BE8] hover:bg-[#2A4ED9] text-white rounded-full text-sm font-sans font-semibold"
            >
              Join the syndicate
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.42, delay: 0.06, ease }}
            className="flex flex-col gap-5 md:border-l md:border-border md:pl-16"
          >
            <h3 className="font-geom text-2xl md:text-3xl font-medium text-text-primary">Founders</h3>
            <p className="font-sans text-base md:text-lg text-text-secondary leading-relaxed">
              Discovery is ₹5–25 lakhs. Signal is ₹1–10 Cr. Send the company to the inbox we actually read.
            </p>
            <a
              href="mailto:contact@aamukh.capital?subject=Company%20pitch"
              className="glass-panel inline-flex w-fit items-center gap-2 min-h-12 px-7 py-3.5 text-text-primary rounded-full text-sm font-sans font-semibold hover:border-brand"
            >
              Email a pitch
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
