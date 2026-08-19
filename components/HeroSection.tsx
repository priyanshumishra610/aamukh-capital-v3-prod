'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Play } from 'lucide-react';
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import '@/app/hero-motion.css';
import { heroDisplay, heroItalic } from '@/app/fonts';

const EASE_OUT = [0.23, 1, 0.32, 1] as const;
const POINTER_SPRING = { stiffness: 140, damping: 22, mass: 0.7 };

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
      className="hero-primary-cta relative inline-flex overflow-hidden rounded-full bg-[#0A1128] px-10 py-5 text-[16px] font-sans font-semibold tracking-tight text-white shadow-xl shadow-black/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4C6BE8]"
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
  const inView = useInView(sectionRef, { amount: 0.35 });
  const interactive = Boolean(finePointer && !reduce);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const normX = useMotionValue(0.5);
  const normY = useMotionValue(0.5);
  const bgX = useSpring(pointerX, POINTER_SPRING);
  const bgY = useSpring(pointerY, POINTER_SPRING);
  const lightX = useSpring(pointerX, { stiffness: 90, damping: 20, mass: 0.9 });
  const lightY = useSpring(pointerY, { stiffness: 90, damping: 20, mass: 0.9 });
  const decoX = useSpring(pointerX, { stiffness: 55, damping: 18, mass: 0.95 });
  const decoY = useSpring(pointerY, { stiffness: 55, damping: 18, mass: 0.95 });
  const hairX = useSpring(normX, { stiffness: 90, damping: 22, mass: 0.7 });
  const hairY = useSpring(normY, { stiffness: 90, damping: 22, mass: 0.7 });

  const bgTransform = useTransform(
    [bgX, bgY],
    (latest: number[]) =>
      `translate3d(${latest[0] * 0.55}px, ${latest[1] * 0.45}px, 0) scale(1.12)`
  );
  const lightTransform = useTransform(
    [lightX, lightY],
    (latest: number[]) =>
      `translate3d(calc(-50% + ${latest[0] * 1.15}px), calc(-50% + ${latest[1] * 0.95}px), 0)`
  );
  const decoNear = useTransform(
    [decoX, decoY],
    (latest: number[]) => `translate3d(${latest[0] * 1.2}px, ${latest[1] * 1.05}px, 0)`
  );
  const decoFar = useTransform(
    [decoX, decoY],
    (latest: number[]) => `translate3d(${-latest[0] * 0.75}px, ${-latest[1] * 0.65}px, 0)`
  );
  const titleTilt = useTransform(
    [pointerX, pointerY],
    (latest: number[]) =>
      `perspective(1400px) rotateX(${-(latest[1] * 0.16)}deg) rotateY(${latest[0] * 0.2}deg)`
  );
  const crossLeft = useTransform(hairX, (value) => `${value * 100}%`);
  const crossTop = useTransform(hairY, (value) => `${value * 100}%`);

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (!interactive) return;
      const rect = event.currentTarget.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      normX.set(px);
      normY.set(py);
      pointerX.set((px - 0.5) * 36);
      pointerY.set((py - 0.5) * 28);
    },
    [interactive, pointerX, pointerY, normX, normY]
  );

  const onPointerLeave = useCallback(() => {
    pointerX.set(0);
    pointerY.set(0);
    normX.set(0.5);
    normY.set(0.5);
  }, [pointerX, pointerY, normX, normY]);

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
          transition: { duration: 0.7, delay, ease: EASE_OUT },
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
            transform: 'translateY(28px)',
          },
          animate: {
            opacity: 1,
            clipPath: 'inset(0% 0 0 0)',
            transform: 'translateY(0px)',
          },
          transition: { duration: 0.9, delay, ease: EASE_OUT },
        };

  const italicEnter = reduce
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.2, delay: 0.38, ease: EASE_OUT },
      }
    : {
        initial: {
          opacity: 0,
          filter: 'blur(8px)',
          transform: 'translateY(12px) scale(0.97)',
        },
        animate: {
          opacity: 1,
          filter: 'blur(0px)',
          transform: 'translateY(0px) scale(1)',
        },
        transition: { duration: 0.85, delay: 0.42, ease: EASE_OUT },
      };

  return (
    <section
      ref={sectionRef}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-white px-6 py-20 selection:bg-[#4C6BE8] selection:text-white"
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
          transition={{ duration: 1.05, ease: EASE_OUT }}
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
                alt="Aamukh Capital Background"
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
          transition={{ duration: 1.15, delay: 0.12, ease: EASE_OUT }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
        {interactive && (
          <motion.div
            aria-hidden
            className="absolute left-1/2 top-[42%] h-[58vmax] w-[58vmax] rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45, ease: EASE_OUT }}
            style={{
              transform: lightTransform as MotionValue<string>,
              background:
                'radial-gradient(circle at center, rgba(76,107,232,0.16), transparent 62%)',
              willChange: 'transform',
            }}
          />
        )}
      </div>

      <div aria-hidden className="hero-grain pointer-events-none absolute inset-0 z-[1]" />

      {interactive && (
        <div aria-hidden className="pointer-events-none absolute inset-0 z-[2]">
          <motion.span
            className="hero-crosshair-line absolute top-0 h-full w-px"
            style={{ left: crossLeft }}
          />
          <motion.span
            className="hero-crosshair-line absolute left-0 h-px w-full"
            style={{ top: crossTop }}
          />
          <motion.span
            className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#4C6BE8]/80"
            style={{ left: crossLeft, top: crossTop }}
          />
        </div>
      )}

      <div aria-hidden className="pointer-events-none absolute inset-5 z-[2] md:inset-8 lg:inset-10">
        <span className="hero-ornament absolute inset-3 border border-dashed border-[#0A1128]/12" />
        <span className="hero-corner hero-ornament left-0 top-0 border-l-[1.5px] border-t-[1.5px]" />
        <span className="hero-corner hero-ornament right-0 top-0 border-r-[1.5px] border-t-[1.5px]" />
        <span className="hero-corner hero-ornament bottom-0 left-0 border-b-[1.5px] border-l-[1.5px]" />
        <span className="hero-corner hero-ornament bottom-0 right-0 border-b-[1.5px] border-r-[1.5px]" />
        <span className="hero-plus hero-ornament left-1/2 top-0 -translate-x-1/2 -translate-y-1/2" />
        <span className="hero-plus hero-ornament bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2" />
        <span className="hero-plus hero-ornament left-0 top-1/2 -translate-x-1/2 -translate-y-1/2" />
        <span className="hero-plus hero-ornament right-0 top-1/2 -translate-y-1/2 translate-x-1/2" />
        {[18, 34, 50, 66, 82].map((top) => (
          <span key={`l-${top}`} className="hero-tick left-0 h-px w-2.5" style={{ top: `${top}%` }} />
        ))}
        {[18, 34, 50, 66, 82].map((top) => (
          <span key={`r-${top}`} className="hero-tick right-0 h-px w-2.5" style={{ top: `${top}%` }} />
        ))}
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[44%] z-[2] -translate-x-1/2 -translate-y-1/2"
      >
        <svg className="hero-orbit h-[min(42vmin,22rem)] w-[min(42vmin,22rem)]" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="47"
            fill="none"
            stroke="#4C6BE8"
            strokeWidth="0.35"
            strokeDasharray="1.4 3.8"
            opacity="0.38"
          />
        </svg>
        <svg
          className="hero-orbit-rev absolute inset-[-18%] h-[136%] w-[136%]"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="#0A1128"
            strokeWidth="0.22"
            strokeDasharray="0.6 5.2"
            opacity="0.22"
          />
        </svg>
      </div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2]"
        style={interactive ? { transform: decoFar, willChange: 'transform' } : undefined}
      >
        <span className="hero-ornament absolute left-[7%] top-[28%] h-1.5 w-1.5 rotate-45 bg-[#4C6BE8]/75" />
        <span className="hero-ornament absolute right-[8%] top-[24%] h-2 w-2 rounded-full border border-[#4C6BE8]/50" />
        <span className="hero-ornament absolute left-[11%] bottom-[26%] h-px w-10 bg-[#0A1128]/20" />
        <span className="hero-ornament absolute right-[12%] bottom-[30%] h-10 w-px bg-[#0A1128]/20" />
      </motion.div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2]"
        style={interactive ? { transform: decoNear, willChange: 'transform' } : undefined}
      >
        <span className="hero-ornament absolute right-[14%] top-[38%] h-1.5 w-1.5 rotate-45 bg-[#4C6BE8]" />
        <span className="hero-ornament absolute left-[16%] top-[42%] h-1 w-1 rotate-45 bg-[#0A1128]/45" />
        <span className="hero-ornament absolute right-[18%] bottom-[34%] h-1 w-1 rotate-45 bg-[#4C6BE8]/80" />
        <svg className="absolute left-[6%] top-[18%] h-16 w-16" viewBox="0 0 64 64">
          <path d="M8 56 V12 H52" fill="none" stroke="#0A1128" strokeWidth="1" opacity="0.18" />
        </svg>
        <svg className="absolute bottom-[16%] right-[6%] h-16 w-16" viewBox="0 0 64 64">
          <path d="M56 8 V52 H12" fill="none" stroke="#0A1128" strokeWidth="1" opacity="0.18" />
        </svg>
      </motion.div>

      <svg
        aria-hidden
        viewBox="0 0 1200 220"
        preserveAspectRatio="none"
        className="pointer-events-none absolute bottom-[8%] left-0 z-[2] h-[22vh] w-full"
      >
        <path
          className="hero-growth-path"
          d="M-20 160 C 180 50, 360 190, 560 100 S 920 28, 1220 130"
          fill="none"
          stroke="#4C6BE8"
          strokeWidth="1.25"
          strokeLinecap="round"
          pathLength={1}
          opacity="0.45"
        />
        <path
          className="hero-growth-path"
          d="M-20 190 C 220 90, 400 200, 620 140 S 980 70, 1220 160"
          fill="none"
          stroke="#0A1128"
          strokeWidth="0.8"
          strokeLinecap="round"
          pathLength={1}
          opacity="0.18"
          style={{ animationDelay: '0.22s' }}
        />
      </svg>

      <div className="relative z-10 flex w-full max-w-[1200px] flex-col items-center text-center">
        <motion.div
          className="w-full"
          style={interactive ? { transform: titleTilt, willChange: 'transform' } : undefined}
        >
        <h1
          className={`${heroDisplay.className} mb-5 w-full text-[clamp(2.7rem,6.6vw,6.5rem)] font-normal uppercase leading-[0.88] tracking-[0.02em] text-text-primary`}
        >
          <span className="block overflow-hidden">
            <motion.span className="block" {...lineEnter(0.34)}>
              The Future of <br className="hidden md:block" />
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span className="block" {...lineEnter(0.44)}>
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
        </motion.div>

        <motion.div
          aria-hidden
          className="mb-8 flex items-center gap-3"
          initial={reduce ? { opacity: 0 } : { opacity: 0, transform: 'scaleX(0.6)' }}
          animate={{ opacity: 1, transform: 'scaleX(1)' }}
          transition={{ duration: 0.55, delay: 0.62, ease: EASE_OUT }}
        >
          <span className="h-px w-8 bg-[#4C6BE8]/40" />
          <span className="h-1.5 w-1.5 rotate-45 bg-[#4C6BE8]" />
          <span className="h-px w-8 bg-[#4C6BE8]/40" />
        </motion.div>

        <motion.div
          {...enter(0.58)}
          className="flex w-full max-w-2xl flex-col items-center gap-12"
        >
          <p className="text-balance font-sans text-xl leading-relaxed text-text-secondary md:text-[1.375rem]">
            Aamukh Capital is the 1% Angel Collective. We deploy conviction-driven capital to India's next generation of global founders.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-5">
            <HeroCta href="/community" enabled={interactive}>
              Join Syndicate
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
                <ArrowUpRight className="hero-cta-arrow h-3.5 w-3.5" />
              </span>
            </HeroCta>

            <a
              href="#philosophy"
              className="hero-play-hit group flex items-center justify-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4C6BE8]"
            >
              <span className="relative flex h-14 w-14 items-center justify-center">
                <span
                  className="hero-play-ring pointer-events-none absolute inset-0 rounded-full border border-[#4C6BE8]/35"
                  style={{ animationPlayState: inView && !reduce ? 'running' : 'paused' }}
                />
                <span
                  className="hero-play-ring pointer-events-none absolute inset-0 rounded-full border border-[#4C6BE8]/20"
                  style={{
                    animationDelay: '0.7s',
                    animationPlayState: inView && !reduce ? 'running' : 'paused',
                  }}
                />
                <span className="hero-play-disc relative flex h-14 w-14 items-center justify-center rounded-full border border-border bg-white/90 shadow-sm backdrop-blur-sm">
                  <Play className="ml-0.5 h-5 w-5 fill-[#4C6BE8] text-[#4C6BE8]" />
                </span>
              </span>
              <span className={`${heroDisplay.className} text-[18px] font-normal uppercase tracking-[0.18em] text-text-primary`}>
                Watch Thesis
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
