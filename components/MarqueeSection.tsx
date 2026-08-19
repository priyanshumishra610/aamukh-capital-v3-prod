// website4/components/MarqueeSection.tsx
"use client";

import React, { useRef, useState, useLayoutEffect, memo, useEffect } from 'react';
import { useScroll, useVelocity } from 'framer-motion';

interface MarqueeProps {
  children: React.ReactNode;
  baseVelocity: number;
  scrollSensitivity?: number;
  className?: string;
}

const useMarqueeAnimation = (
  trackRef: React.RefObject<HTMLDivElement | null>,
  seqWidth: number,
  baseVelocity: number,
  scrollSensitivity: number
) => {
  const rafRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || seqWidth === 0) return;

    const animate = (timestamp: number) => {
      if (lastTimestampRef.current === null) {
        lastTimestampRef.current = timestamp;
      }

      const deltaTime = (timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;

      const currentScrollVelocity = scrollVelocity.get();
      let scrollInducedVelocity = 0;
      if (currentScrollVelocity < 0) {
        scrollInducedVelocity = -baseVelocity * 3 * scrollSensitivity;
      } else if (currentScrollVelocity > 0) {
        scrollInducedVelocity = -baseVelocity * 0.5 * scrollSensitivity;
      }
      
      const targetVelocity = baseVelocity + scrollInducedVelocity;
      const easingFactor = 1 - Math.exp(-deltaTime / 0.25);
      velocityRef.current += (targetVelocity - velocityRef.current) * easingFactor;

      let nextOffset = offsetRef.current + velocityRef.current * deltaTime;
      const wrapAround = (val: number, max: number) => ((val % max) + max) % max;
      offsetRef.current = wrapAround(nextOffset, seqWidth);

      track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      lastTimestampRef.current = null;
    };
  }, [trackRef, seqWidth, baseVelocity, scrollSensitivity, scrollVelocity]);
};

const MarqueeSection = ({
  baseVelocity = -50,
  scrollSensitivity = 0.5,
  className = '',
}: Omit<MarqueeProps, 'children'>) => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const seqRef = useRef<HTMLSpanElement | null>(null);
  const [seqWidth, setSeqWidth] = useState(0);

  const marqueeContent = (
    <div className="flex items-center gap-10 font-geom text-[clamp(2.5rem,6vw,5rem)] font-medium tracking-tight uppercase text-text-primary px-5">
      <span>Founder-First</span>
      <span className="text-brand text-4xl">✦</span>
      <span>India's Supercycle</span>
      <span className="text-brand text-4xl">✦</span>
      <span className="text-brand">Conviction Capital</span>
      <span className="text-brand text-4xl">✦</span>
      <span>Dual Engine</span>
      <span className="text-brand text-4xl">✦</span>
    </div>
  );

  useLayoutEffect(() => {
    if (seqRef.current) {
      const style = window.getComputedStyle(seqRef.current);
      const marginRight = parseFloat(style.marginRight || '0');
      setSeqWidth(seqRef.current.offsetWidth + marginRight);
    }
  }, []);

  useMarqueeAnimation(trackRef, seqWidth, baseVelocity, scrollSensitivity);

  return (
    <section className={`w-full overflow-hidden py-8 md:py-10 bg-snow border-y border-border/60 ${className}`}>
      <div
        ref={trackRef}
        className="flex whitespace-nowrap will-change-transform"
      >
        <span ref={seqRef} className="block">{marqueeContent}</span>
        <span className="block">{marqueeContent}</span>
        <span className="block">{marqueeContent}</span>
        <span className="block">{marqueeContent}</span>
      </div>
    </section>
  );
};

export default memo(MarqueeSection);