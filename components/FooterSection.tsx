'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const firmLinks = [
  { href: '/#philosophy', label: 'Thesis' },
  { href: '/#programs', label: 'Programs' },
  { href: '/#portfolio', label: 'Portfolio' },
  { href: '/#team', label: 'Team' },
];

const linkClass =
  'text-[15px] leading-7 text-white/70 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white';

const FooterSection = () => {
  return (
    <footer className="relative z-[1] w-full bg-[#0A1128] text-white">
      <div className="mx-auto w-full max-w-[100rem] px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <a
              href="/"
              className="mb-6 inline-flex h-14 items-center rounded-md bg-white px-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <Image
                src="/logo.png"
                alt="Aamukh Capital"
                width={200}
                height={48}
                className="h-9 w-auto object-contain object-left"
              />
            </a>
            <p className="max-w-sm font-sans text-[15px] leading-relaxed text-white/70">
              The 1% Angel Collective. Operator-led capital for Indian founders, from Bangalore.
            </p>
          </div>

          <div className="lg:col-span-2">
            <p className="mb-4 font-sans text-[13px] font-medium text-white">Firm</p>
            <ul className="flex flex-col">
              {firmLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={linkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="mb-4 font-sans text-[13px] font-medium text-white">Capital</p>
            <ul className="flex flex-col">
              <li>
                <Link href="/mentor" className={linkClass}>
                  Become a Mentor
                </Link>
              </li>
              <li>
                <Link href="/community" className={linkClass}>
                  Join the syndicate
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="mb-4 font-sans text-[13px] font-medium text-white">Contact</p>
            <ul className="flex flex-col">
              <li>
                <a href="mailto:contact@aamukh.capital" className={linkClass}>
                  contact@aamukh.capital
                </a>
              </li>
              <li className="text-[15px] leading-7 text-white/70">Bangalore, India</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-6">
          <p className="font-sans text-[13px] text-white/50">
            © {new Date().getFullYear()} Aamukh Capital. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
