'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import '@/app/hero-motion.css';
import { heroDisplay, heroItalic } from '@/app/fonts';

const EASE_OUT = [0.23, 1, 0.32, 1] as const;
const POINTER_SPRING = { stiffness: 210, damping: 26, mass: 0.55 };

function useFinePointer() {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine)');
    const sync = () => setFine(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  return fine;
}

function HeroCta({
  href,
  children,
  enabled,
}: {
  href: string;
  children: React.ReactNode;
  enabled: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const shineX = useMotionValue(50);
  const shineY = useMotionValue(50);
  const shine = useTransform(
    [shineX, shineY],
    (latest: number[]) =>
      `radial-gradient(140px circle at ${latest[0]}% ${latest[1]}%, rgba(255,255,255,0.22), transparent 58%)`
  );

  const reset = useCallback(() => {
    shineX.set(50);
    shineY.set(50);
  }, [shineX, shineY]);

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLAnchorElement>) => {
      if (!enabled || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      shineX.set(((event.clientX - rect.left) / rect.width) * 100);
      shineY.set(((event.clientY - rect.top) / rect.height) * 100);
    },
    [enabled, shineX, shineY]
  );

  return (
    <Link
      ref={ref}
      href={href}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      className="hero-primary-cta relative inline-flex min-h-12 overflow-hidden rounded-full bg-[#0A1128] px-8 py-4 text-[16px] font-sans font-semibold tracking-tight text-white shadow-[0_8px_24px_rgba(10,17,40,0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4C6BE8]"
    >
      {enabled && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: shine }}
        />
      )}
      <span className="hero-primary-cta-inner relative z-10 inline-flex items-center gap-3">
        {children}
      </span>
    </Link>
  );
}

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const finePointer = useFinePointer();
  const interactive = Boolean(finePointer && !reduce);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const bgX = useSpring(pointerX, POINTER_SPRING);
  const bgY = useSpring(pointerY, POINTER_SPRING);

  const bgTransform = useTransform(
    [bgX, bgY],
    (latest: number[]) =>
      `translate3d(${latest[0] * 0.55}px, ${latest[1] * 0.45}px, 0) scale(1.12)`
  );

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (!interactive) return;
      const rect = event.currentTarget.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      pointerX.set((px - 0.5) * 36);
      pointerY.set((py - 0.5) * 28);
    },
    [interactive, pointerX, pointerY]
  );

  const onPointerLeave = useCallback(() => {
    pointerX.set(0);
    pointerY.set(0);
  }, [pointerX, pointerY]);

  const enter = (delay: number) =>
    reduce
      ? {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.2, delay, ease: EASE_OUT },
        }
      : {
          initial: { opacity: 0, transform: 'translateY(16px)' },
          animate: { opacity: 1, transform: 'translateY(0px)' },
          transition: { duration: 0.48, delay, ease: EASE_OUT },
        };

  const lineEnter = (delay: number) =>
    reduce
      ? {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.2, delay, ease: EASE_OUT },
        }
      : {
          initial: {
            opacity: 0,
            clipPath: 'inset(110% 0 0 0)',
            transform: 'translateY(18px)',
          },
          animate: {
            opacity: 1,
            clipPath: 'inset(0% 0 0 0)',
            transform: 'translateY(0px)',
          },
          transition: { duration: 0.62, delay, ease: EASE_OUT },
        };

  const italicEnter = reduce
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.2, delay: 0.22, ease: EASE_OUT },
      }
    : {
        initial: {
          opacity: 0,
          filter: 'blur(4px)',
          transform: 'translateY(8px) scale(0.98)',
        },
        animate: {
          opacity: 1,
          filter: 'blur(0px)',
          transform: 'translateY(0px) scale(1)',
        },
        transition: { duration: 0.55, delay: 0.28, ease: EASE_OUT },
      };

  return (
    <section
      ref={sectionRef}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="page-surface flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden px-6 py-24 selection:bg-[#4C6BE8] selection:text-white"
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 overflow-hidden"
          initial={reduce ? false : { clipPath: 'inset(100% 0 0 0)', opacity: 0.55 }}
          animate={
            reduce
              ? { opacity: 1 }
              : { clipPath: 'inset(0% 0 0 0)', opacity: 1 }
          }
          transition={{ duration: 0.72, ease: EASE_OUT }}
        >
          <motion.div
            className="absolute -inset-[8%]"
            style={
              interactive
                ? { transform: bgTransform as MotionValue<string>, willChange: 'transform' }
                : undefined
            }
          >
            <div className="hero-image-settle absolute inset-0">
              <Image
                src="/bg.jpeg"
                alt=""
                fill
                priority
                className="object-cover"
              />
            </div>
          </motion.div>
        </motion.div>
        <motion.div
          className="absolute inset-0 bg-white"
          initial={{ opacity: reduce ? 0.3 : 0.72 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 0.72, delay: 0.06, ease: EASE_OUT }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
      </div>

      <div aria-hidden className="hero-grain pointer-events-none absolute inset-0 z-[1]" />

      <div className="relative z-10 flex w-full max-w-[1200px] flex-col items-center text-center">
        <h1
          className={`${heroDisplay.className} mb-8 w-full text-[clamp(2.7rem,6.6vw,6.5rem)] font-normal uppercase leading-[0.88] tracking-[0.02em] text-text-primary`}
        >
          <span className="block overflow-hidden">
            <motion.span className="block" {...lineEnter(0.18)}>
              The Future of <br className="hidden md:block" />
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span className="block" {...lineEnter(0.26)}>
              Smarter{' '}
              <motion.span
                {...italicEnter}
                className={`${heroItalic.className} hero-italic-underline inline-block pb-1 lowercase leading-[1.15] tracking-normal text-[#4C6BE8]`}
              >
                investing.
              </motion.span>
            </motion.span>
          </span>
        </h1>

        <motion.div
          {...enter(0.38)}
          className="flex w-full max-w-2xl flex-col items-center gap-10"
        >
          <p className="text-balance font-sans text-xl leading-relaxed text-text-secondary md:text-[1.375rem]">
            Operator-led capital for Indian founders. Allocators join the syndicate. Founders send the company.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-5">
            <HeroCta href="/community" enabled={interactive}>
              Join the syndicate
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
                <ArrowUpRight className="hero-cta-arrow h-3.5 w-3.5" />
              </span>
            </HeroCta>

            <a
              href="mailto:contact@aamukh.capital?subject=Company%20pitch"
              className="glass-panel inline-flex min-h-12 items-center justify-center rounded-full px-8 py-4 font-sans text-[16px] font-semibold tracking-tight text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4C6BE8]"
            >
              Pitch a company
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
