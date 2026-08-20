"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Lightbulb, TrendingUp, ArrowRight, Pause, Play } from 'lucide-react';

const CYCLE_MS = 5000;

const trackData = [
  {
    id: 'discovery',
    IconComponent: Lightbulb,
    title: 'Discovery Program',
    stage: 'Idea, student, pre-PMF',
    details: [
      { label: 'Stage', value: 'Idea, student, pre-PMF' },
      { label: 'Cheque size', value: '₹5–25 lakhs' },
      { label: 'Equity', value: 'Minimum dilution' },
      { label: 'Why', value: 'In before the crowded round' },
    ],
  },
  {
    id: 'signal',
    IconComponent: TrendingUp,
    title: 'Signal Series',
    stage: 'Post-PMF, early scale',
    details: [
      { label: 'Stage', value: 'Post-PMF, early scale' },
      { label: 'Cheque size', value: '₹1–10 Cr' },
      { label: 'Equity', value: 'Standard co-investment' },
      { label: 'Why', value: 'In at the inflection' },
    ],
  },
] as const;

type TrackId = (typeof trackData)[number]['id'];

export default function InteractiveDualModel() {
  const reduce = useReducedMotion();
  const [activeTrackId, setActiveTrackId] = useState<TrackId>('discovery');
  const [paused, setPaused] = useState(false);
  const activeTrack = trackData.find((t) => t.id === activeTrackId) || trackData[0];
  const isDiscovery = activeTrackId === 'discovery';
  const autoplay = !paused && !reduce;

  useEffect(() => {
    if (!autoplay) return;

    const tick = () => {
      if (document.visibilityState === 'hidden') return;
      setActiveTrackId((prev) => (prev === 'discovery' ? 'signal' : 'discovery'));
    };

    const id = window.setInterval(tick, CYCLE_MS);
    return () => window.clearInterval(id);
  }, [autoplay, activeTrackId]);

  const selectTrack = (id: TrackId) => {
    setActiveTrackId(id);
  };

  return (
    <section id="programs" className="page-surface py-16 md:py-24 px-6 lg:px-10 overflow-hidden border-t border-border/50">
      <div className="max-w-[100rem] mx-auto flex flex-col items-center relative z-10">
        <div className="text-center mb-12 max-w-3xl flex flex-col items-center gap-5">
          <h2 className="font-geom font-medium text-4xl md:text-5xl lg:text-6xl text-text-primary tracking-tight leading-[1.1]">
            Two cheque sizes
          </h2>
          {!reduce && (
            <button
              type="button"
              onClick={() => setPaused((value) => !value)}
              aria-pressed={paused}
              aria-label={paused ? 'Resume Discovery and Signal rotation' : 'Pause Discovery and Signal rotation'}
              className="inline-flex min-h-10 items-center gap-2 rounded-full border border-border bg-white px-3.5 py-2 text-sm font-sans font-medium text-text-primary hover:border-brand/40"
            >
              {paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
              {paused ? 'Play' : 'Pause'}
            </button>
          )}
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-24 w-full max-w-5xl px-8 md:px-12">
          <div className="relative w-[260px] h-[260px] md:w-[340px] md:h-[340px] shrink-0">
            <div className="absolute inset-8 rounded-full border-[3px] border-slate-100 z-0" />
            <div className="absolute inset-0 rounded-full border-[3px] border-dashed border-slate-200/70 z-0" />

            <div className="absolute top-1/2 left-0 w-full h-[3px] -translate-y-1/2 z-10 pointer-events-none">
              <div
                className="absolute left-0 w-1/2 h-full border-t-[3px] border-dashed"
                style={{ borderColor: isDiscovery ? '#4C6BE8' : '#e2e8f0', opacity: isDiscovery ? 1 : 0.25 }}
              />
              <div
                className="absolute right-0 w-1/2 h-full border-t-[3px] border-dashed"
                style={{ borderColor: !isDiscovery ? '#152873' : '#e2e8f0', opacity: !isDiscovery ? 1 : 0.25 }}
              />
            </div>

            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-32 h-32 md:w-40 md:h-40 rounded-full border-[8px] border-white shadow-[0_12px_32px_rgba(10,17,40,0.12)] flex items-center justify-center overflow-hidden"
              style={{ backgroundColor: isDiscovery ? '#4C6BE8' : '#152873' }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTrackId}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                  className="text-white"
                >
                  <activeTrack.IconComponent size={40} strokeWidth={2} />
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              type="button"
              onClick={() => selectTrack('discovery')}
              aria-pressed={isDiscovery}
              className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 z-30 w-24 h-24 md:w-28 md:h-28 rounded-full bg-white flex items-center justify-center shadow-[0_8px_20px_rgba(10,17,40,0.08)] border-[3px]"
              style={{ borderColor: isDiscovery ? '#4C6BE8' : '#f1f5f9' }}
            >
              <span className={`font-sans text-sm font-semibold ${isDiscovery ? 'text-[#4C6BE8]' : 'text-slate-400'}`}>
                Discovery
              </span>
            </button>

            <button
              type="button"
              onClick={() => selectTrack('signal')}
              aria-pressed={!isDiscovery}
              className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 z-30 w-24 h-24 md:w-28 md:h-28 rounded-full bg-white flex items-center justify-center shadow-[0_8px_20px_rgba(10,17,40,0.08)] border-[3px]"
              style={{ borderColor: !isDiscovery ? '#152873' : '#f1f5f9' }}
            >
              <span className={`font-sans text-sm font-semibold ${!isDiscovery ? 'text-[#152873]' : 'text-slate-400'}`}>
                Signal
              </span>
            </button>
          </div>

          <div className="w-full max-w-md">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTrackId}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                className="w-full glass-panel p-8 md:p-10 rounded-[2rem] flex flex-col"
              >
                <p className="font-sans text-sm text-text-muted mb-3">{activeTrack.stage}</p>
                <h3 className="font-geom text-2xl md:text-3xl font-medium text-text-primary mb-6">{activeTrack.title}</h3>

                <div className="space-y-4 flex-grow">
                  {activeTrack.details.map((detail) => (
                    <div key={detail.label} className="flex justify-between items-start border-t border-border/60 pt-3 gap-4">
                      <span className="font-sans text-sm text-text-muted whitespace-nowrap">{detail.label}</span>
                      <span className="font-geom font-medium text-text-primary text-[15px] text-right leading-tight">
                        {detail.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-col gap-3">
                  <a
                    href="mailto:contact@aamukh.capital?subject=Company%20pitch"
                    className="flex items-center justify-between w-full p-4 min-h-12 bg-snow border border-border rounded-xl group hover:border-brand/30"
                  >
                    <span className="font-geom font-medium text-sm">Pitch this program</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                  <Link href="/community" className="font-sans text-sm text-text-muted hover:text-brand">
                    Allocators: join the syndicate
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
