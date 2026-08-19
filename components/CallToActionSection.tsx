'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ease = [0.19, 1, 0.22, 1] as const;

export default function CallToActionSection() {
  const [email, setEmail] = useState('');

  return (
    <section className="relative w-full bg-[#fffafa] py-16 md:py-24 overflow-hidden flex flex-col justify-center items-center border-t border-border/50">

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-[6vw] lg:px-[8vw] flex flex-col items-center text-center">

        <motion.div
          className="w-full flex flex-col items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-8%' }}
          transition={{ duration: 0.5, ease }}
        >
          <motion.div
            className="inline-flex items-center justify-center px-4 py-1.5 mb-8 rounded-full bg-white border border-[#4C6BE8]/20 shadow-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05, ease }}
          >
            <span className="font-mono text-xs font-semibold tracking-widest text-[#4C6BE8] uppercase">
              Initiate Contact
            </span>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h2
              className="font-sans font-extrabold text-[clamp(3.5rem,8.5vw,9rem)] tracking-[-0.04em] uppercase text-text-primary leading-[0.9] mb-12"
              initial={{ y: '60%', opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.1, ease }}
            >
              READY TO BUILD <br />
              <span className="editorial-italic lowercase tracking-normal text-brand">
                the impossible?
              </span>
            </motion.h2>
          </div>

          <motion.div
            className="relative w-full max-w-4xl group mt-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25, ease }}
          >
            <div className="relative flex w-full items-center rounded-full bg-white/90 border border-border shadow-sm p-2 backdrop-blur-xl">
              <div className="pl-6 md:pl-8 text-[#4C6BE8] font-mono text-xl select-none font-bold">{'>'}</div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="enter your pitch deck URL_"
                className="w-full bg-transparent px-4 py-4 md:py-6 font-mono text-sm md:text-lg text-text-primary placeholder-text-muted outline-none"
              />
              <button className="shrink-0 py-4 md:py-6 px-8 md:px-12 bg-[#4C6BE8] hover:bg-[#3a58d6] text-white rounded-[10rem] font-mono uppercase tracking-widest text-xs md:text-sm font-semibold transition-[background-color,transform] duration-200 ease-out active:scale-[0.97]">
                Execute
              </button>
            </div>
          </motion.div>

          <motion.div
            className="mt-8 flex items-center gap-2 font-mono text-xs text-text-muted uppercase tracking-widest bg-white/50 px-4 py-2 rounded-full border border-border/50"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease }}
          >
            <span className="h-2 w-2 rounded-full bg-[#4C6BE8] animate-pulse" />
            Syndicate Network Status: Operational
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
