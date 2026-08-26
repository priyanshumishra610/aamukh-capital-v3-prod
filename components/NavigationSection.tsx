'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const LINKS = [
  { label: 'Thesis', id: 'philosophy' },
  { label: 'Programs', id: 'programs' },
  { label: 'Portfolio', id: 'portfolio' },
  { label: 'Team', id: 'team' },
] as const;

const NavigationSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';
  const isFormPage = pathname === '/community' || pathname === '/mentor';
  const sectionHref = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-3 mt-4 lg:px-6"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.42, delay: isHome ? 0.08 : 0.04, ease: [0.23, 1, 0.32, 1] }}
      >
        <nav className="glass-panel relative flex items-center justify-between w-full max-w-6xl rounded-full p-[0.3rem] pl-[0.9rem]">
          <a href="/" className="relative h-9 w-40 block shrink-0">
            <Image
              src="/logo.png"
              alt="Aamukh Capital"
              fill
              priority
              className="object-contain object-left mix-blend-multiply"
            />
          </a>

          <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {LINKS.map((link) => (
              <a
                key={link.id}
                href={sectionHref(link.id)}
                className="text-sm font-sans font-medium text-text-secondary hover:text-brand transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={isFormPage ? '/' : '/mentor'}
              className="hidden md:flex items-center justify-center gap-2 px-5 py-2.5 h-10 bg-[#4C6BE8] text-white rounded-full text-sm font-sans font-semibold hover:bg-brand-600 transition-all active:scale-95 group"
            >
              {isFormPage ? 'Back home' : 'Become a Mentor'}
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden flex items-center justify-center w-11 h-11 rounded-full bg-background-secondary text-text-primary hover:bg-border transition-colors"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </motion.div>

      {isOpen && (
        <div className="fixed inset-0 z-40 bg-white/95 backdrop-blur-lg flex flex-col items-center justify-center pb-20 px-6">
          <div className="flex flex-col items-center gap-6 w-full max-w-sm">
            {LINKS.map((link) => (
              <a
                key={link.id}
                href={sectionHref(link.id)}
                onClick={() => setIsOpen(false)}
                className="text-4xl font-sans font-bold tracking-tight text-text-primary hover:text-brand transition-colors w-full text-center py-2"
              >
                {link.label}
              </a>
            ))}
            <a
              href={isFormPage ? '/' : '/mentor'}
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full max-w-[240px] mt-4 px-8 py-5 bg-[#4C6BE8] text-white rounded-full text-lg font-sans font-bold"
            >
              {isFormPage ? 'Back home' : 'Become a Mentor'}
            </a>
            <a
              href="mailto:contact@aamukh.capital?subject=Company%20pitch"
              onClick={() => setIsOpen(false)}
              className="text-base font-sans font-medium text-text-secondary"
            >
              Pitch a company
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default NavigationSection;
