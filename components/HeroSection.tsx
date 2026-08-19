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

const LOADER_EXIT = 2.4;
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
      className="hero-primary-cta relative inline-flex overflow-hidden rounded-full bg-[#0A1128] px-10 py-5 text-[15px] font-sans font-semibold tracking-tight text-white shadow-xl shadow-black/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4C6BE8]"
    >
      {enabled && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: shine }}
        />
      )}
      <span className="hero-primary-cta-inner relative z-10 inline-flex items-center gap-2">
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
  const bgX = useSpring(pointerX, POINTER_SPRING);
  const bgY = useSpring(pointerY, POINTER_SPRING);
  const lightX = useSpring(pointerX, { stiffness: 90, damping: 20, mass: 0.9 });
  const lightY = useSpring(pointerY, { stiffness: 90, damping: 20, mass: 0.9 });

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

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (!interactive) return;
      const rect = event.currentTarget.getBoundingClientRect();
      const nx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      pointerX.set(nx * 18);
      pointerY.set(ny * 14);
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
          transition: { duration: 0.2, delay: LOADER_EXIT, ease: EASE_OUT },
        }
      : {
          initial: { opacity: 0, transform: 'translateY(14px)' },
          animate: { opacity: 1, transform: 'translateY(0px)' },
          transition: { duration: 0.7, delay: LOADER_EXIT + delay, ease: EASE_OUT },
        };

  const lineEnter = (delay: number) =>
    reduce
      ? {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.2, delay: LOADER_EXIT, ease: EASE_OUT },
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
          transition: { duration: 0.8, delay: LOADER_EXIT + delay, ease: EASE_OUT },
        };

  const italicEnter = reduce
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.2, delay: LOADER_EXIT, ease: EASE_OUT },
      }
    : {
        initial: {
          opacity: 0,
          filter: 'blur(6px)',
          transform: 'translateY(10px) scale(0.97)',
        },
        animate: {
          opacity: 1,
          filter: 'blur(0px)',
          transform: 'translateY(0px) scale(1)',
        },
        transition: { duration: 0.75, delay: LOADER_EXIT + 0.22, ease: EASE_OUT },
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
          className="absolute -inset-[8%]"
          style={
            interactive
              ? { transform: bgTransform as MotionValue<string>, willChange: 'transform' }
              : undefined
          }
        >
          <Image
            src="/bg.jpeg"
            alt="Aamukh Capital Background"
            fill
            priority
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-white/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
        {interactive && (
          <motion.div
            aria-hidden
            className="absolute left-1/2 top-[42%] h-[58vmax] w-[58vmax] rounded-full"
            style={{
              transform: lightTransform as MotionValue<string>,
              background:
                'radial-gradient(circle at center, rgba(76,107,232,0.16), transparent 62%)',
              willChange: 'transform',
            }}
          />
        )}
      </div>

      <div className="relative z-10 flex w-full max-w-[1200px] flex-col items-center text-center">
        <motion.div
          {...enter(0)}
          className="hero-badge mb-10 inline-flex items-center gap-2 rounded-full border border-border bg-white/80 px-4 py-2 shadow-sm backdrop-blur-md"
        >
          <span className="hero-live-dot h-2 w-2 rounded-full bg-[#4C6BE8]" />
          <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-text-muted">
            Built in Bharat // <span className="text-[#4C6BE8]">For the world</span>
          </span>
        </motion.div>

        <h1 className="mb-10 w-full font-sans text-[clamp(2.6rem,6.5vw,7rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.04em] text-text-primary drop-shadow-sm">
          <span className="block overflow-hidden">
            <motion.span className="block" {...lineEnter(0.06)}>
              The Future of <br className="hidden md:block" />
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span className="block" {...lineEnter(0.14)}>
              Smarter{' '}
              <motion.span
                {...italicEnter}
                className="hero-italic-underline editorial-italic inline-block pb-1 lowercase leading-[1.1] tracking-normal text-[#4C6BE8]"
              >
                investing.
              </motion.span>
            </motion.span>
          </span>
        </h1>

        <motion.div
          {...enter(0.28)}
          className="flex w-full max-w-2xl flex-col items-center gap-12"
        >
          <p className="text-balance font-sans text-lg leading-relaxed text-text-secondary md:text-xl">
            Aamukh Capital is the 1% Angel Collective. We deploy conviction-driven capital to India's next generation of global founders.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-5">
            <HeroCta href="/community" enabled={interactive}>
              Join Syndicate
              <ArrowUpRight className="hero-cta-arrow h-4 w-4" />
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
              <span className="font-mono text-[13px] font-bold uppercase tracking-widest text-text-primary">
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
