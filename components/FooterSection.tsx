'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const ease = [0.19, 1, 0.22, 1] as const;

const FooterSection = () => {
  return (
    <footer className="w-full bg-white pt-16 md:pt-20 pb-12 px-6 lg:px-10 flex flex-col items-center border-t border-border">
      <div className="max-w-[100rem] w-full mx-auto flex flex-col items-center gap-12">

        <motion.div
          className="w-full flex flex-col md:flex-row justify-between gap-12 md:gap-8 pb-10 border-b border-border/60"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-5%' }}
          transition={{ duration: 0.8, ease }}
        >
          <motion.div
            className="flex flex-col gap-6 w-full md:w-1/3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
          >
            <a href="/" className="relative h-10 w-48 z-10 block transition-transform hover:scale-105 duration-300">
              <Image
                src="/logo.png"
                alt="Aamukh Capital Logo"
                fill
                className="object-contain object-left mix-blend-multiply"
              />
            </a>

            <p className="font-sans text-[15px] leading-relaxed text-text-secondary pr-8 w-5/6 md:w-3/4">
              The 1% Angel Collective. Operator-led capital for founders building generational companies.
            </p>
            <a
              href="mailto:contact@aamukh.capital"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-[#0A1128] text-white rounded-full text-sm font-sans font-medium hover:bg-[#4C6BE8] transition-colors duration-300 w-fit mt-2 shadow-sm"
            >
              contact@aamukh.capital
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </motion.div>

          <motion.div
            className="flex flex-col gap-6 w-full md:w-1/6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
          >
            <h4 className="font-sans text-sm font-bold tracking-wide text-text-primary border-b border-border/80 pb-3">Platforms</h4>
            <ul className="flex flex-col gap-3 font-mono text-xs uppercase tracking-wider">
              <li><a href="#" className="inline-block text-text-secondary hover:text-[#4C6BE8] transition-all">Twitter // X</a></li>
              <li><a href="#" className="inline-block text-text-secondary hover:text-[#4C6BE8] transition-all">LinkedIn</a></li>
              <li><a href="#" className="inline-block text-text-secondary hover:text-[#4C6BE8] transition-all">Substack</a></li>
              <li><a href="#" className="inline-block text-text-secondary hover:text-[#4C6BE8] transition-all">AngelList</a></li>
            </ul>
          </motion.div>

          <motion.div
            className="flex flex-col gap-6 w-full md:w-1/6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease }}
          >
            <h4 className="font-sans text-sm font-bold tracking-wide text-text-primary border-b border-border/80 pb-3">Entity</h4>
            <ul className="flex flex-col gap-3 font-sans text-[15px] font-medium tracking-tight">
              <li><a href="/#thesis" className="inline-block text-text-secondary hover:text-[#4C6BE8] transition-all">Thesis</a></li>
              <li><a href="/#portfolio" className="inline-block text-text-secondary hover:text-[#4C6BE8] transition-all">Portfolio</a></li>
              <li><a href="/#team" className="inline-block text-text-secondary hover:text-[#4C6BE8] transition-all">Principals</a></li>
              <li><a href="/community" className="inline-block text-text-secondary hover:text-[#4C6BE8] transition-all">Join Community</a></li>
            </ul>
          </motion.div>

          <motion.div
            className="flex flex-col gap-6 w-full md:w-1/4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease }}
          >
            <h4 className="font-sans text-sm font-bold tracking-wide text-text-primary border-b border-border/80 pb-3">Headquarters</h4>
            <p className="font-mono text-xs text-text-secondary leading-relaxed uppercase tracking-wider">
              Bangalore, India <br />
              The Global Hub for Technical Innovation.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="w-full flex flex-col md:flex-row justify-between items-center gap-6 mt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
        >
          <div className="flex items-center gap-2 w-full md:w-auto justify-center md:justify-start">
            <p className="font-sans font-medium text-sm text-text-muted cursor-default">
              © {new Date().getFullYear()} Aamukh Capital. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-6 w-full md:w-auto justify-center md:justify-end">
            <a href="#" className="font-sans text-sm font-medium text-text-muted hover:text-text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="font-sans text-sm font-medium text-text-muted hover:text-text-primary transition-colors">Terms of Service</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection;
