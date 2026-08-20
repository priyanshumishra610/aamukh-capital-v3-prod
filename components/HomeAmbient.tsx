'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';

export default function HomeAmbient() {
  const reduce = useReducedMotion();
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine)');
    const sync = () => setFine(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const sx = useSpring(x, { stiffness: 140, damping: 24, mass: 0.65 });
  const sy = useSpring(y, { stiffness: 140, damping: 24, mass: 0.65 });
  const background = useTransform(
    [sx, sy],
    (latest: number[]) =>
      `radial-gradient(36rem circle at ${latest[0] * 100}% ${latest[1] * 100}%, rgba(76,107,232,0.16), transparent 62%)`
  );

  const onMove = useCallback(
    (event: PointerEvent) => {
      x.set(event.clientX / window.innerWidth);
      y.set(event.clientY / window.innerHeight);
    },
    [x, y]
  );

  useEffect(() => {
    if (!fine || reduce) return;
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [fine, reduce, onMove]);

  if (!fine || reduce) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[30]"
      style={{ backgroundImage: background, mixBlendMode: 'soft-light' }}
    />
  );
}
