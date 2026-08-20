'use client';

import React, { useState } from 'react';
import { ArrowRight, BrainCircuit, Users, Activity, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const philosophies = [
  {
    id: 'founders-first',
    title: 'Founders First',
    icon: Users,
    shortDesc: 'Ideas evolve. Founders endure.',
    content:
      'We back the person who will still be in the room after the plan changes. Product pivots are expected. Resilience is the underwrite.',
  },
  {
    id: 'conviction-driven',
    title: 'Conviction Driven',
    icon: BrainCircuit,
    shortDesc: 'Early and decisive capital',
    content:
      'We build the relationship before the round is crowded. Independent conviction lets us write when the signal is clear, not when the calendar says so.',
  },
  {
    id: 'light-touch',
    title: 'Light-Touch Support',
    icon: Activity,
    shortDesc: 'Help when asked',
    content:
      'Operational support is available through the Founder Command Center for GTM, hiring, and branding. We do not sit in the operating seat unless invited.',
  },
  {
    id: 'skin-in-game',
    title: 'Skin in the Game',
    icon: ShieldAlert,
    shortDesc: 'GP capital alongside yours',
    content:
      'Up to 20% GP participation on Discovery cheques and 10% on Signal cheques. Returns are shared with founders and LPs, not extracted as a fee story.',
  },
];

export default function CorePhilosophySection() {
  const [activeTab, setActiveTab] = useState(philosophies[0].id);
  const activeContent = philosophies.find((p) => p.id === activeTab);

  return (
    <section id="philosophy" className="page-surface w-full py-16 md:py-24 px-6 lg:px-10 flex flex-col items-center overflow-hidden">
      <div className="max-w-[100rem] w-full mx-auto flex flex-col items-center gap-10 md:gap-14">
        <div className="flex flex-col items-center w-full border-t border-border pt-10 gap-5">
          <motion.h2
            className="font-geom font-medium text-4xl md:text-5xl lg:text-6xl text-center leading-[1.1] tracking-[-0.04em] text-text-primary text-balance max-w-4xl"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.48, ease: [0.23, 1, 0.32, 1] }}
          >
            How we underwrite
          </motion.h2>

          <motion.p
            className="font-geom text-lg md:text-xl text-text-secondary text-center max-w-[40rem] leading-relaxed"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.06, ease: [0.23, 1, 0.32, 1] }}
          >
            Four rules. No fee-first AUM game, no delayed herd rounds, no GP sitting at zero.
          </motion.p>
        </div>

        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-7 order-2 lg:order-1 min-h-[380px]">
            <div className="glass-panel rounded-card md:rounded-[2rem] p-8 md:p-12 h-full w-full flex flex-col">
              <AnimatePresence mode="wait">
                {activeContent && (
                  <motion.div
                    key={activeContent.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                    className="flex flex-col justify-center h-full"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-background-secondary border border-border/60 flex items-center justify-center text-brand mb-8">
                      <activeContent.icon className="w-6 h-6 stroke-[1.5]" />
                    </div>

                    <h3 className="font-geom font-medium text-3xl md:text-4xl text-text-primary tracking-[-0.02em] mb-3">
                      {activeContent.title}
                    </h3>
                    <p className="font-geom text-base text-text-secondary mb-6">{activeContent.shortDesc}</p>
                    <p className="font-geom text-lg text-text-secondary leading-relaxed pt-6 border-t border-border/60">
                      {activeContent.content}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col gap-2">
            {philosophies.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`group relative flex items-center text-left w-full p-5 lg:p-6 rounded-2xl transition-[background-color,border-color] duration-200 ease-out border ${
                    isActive
                      ? 'bg-white border-border shadow-[0_8px_24px_rgba(10,17,40,0.04)]'
                      : 'bg-transparent border-transparent hover:bg-white/50 hover:border-border/50'
                  }`}
                >
                  <div className="flex items-center justify-between w-full gap-4">
                    <span
                      className={`font-geom text-xl md:text-2xl font-medium tracking-tight ${
                        isActive ? 'text-text-primary' : 'text-text-secondary'
                      }`}
                    >
                      {item.title}
                    </span>
                    <ArrowRight
                      className={`shrink-0 w-5 h-5 ${isActive ? 'text-brand opacity-100' : 'text-text-muted opacity-0 group-hover:opacity-40'}`}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
