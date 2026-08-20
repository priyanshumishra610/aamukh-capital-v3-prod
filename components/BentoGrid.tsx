"use client";

import React from "react";
import { motion } from "framer-motion";
import EcosystemCard from "./BentoCards/EcosystemCard";
import FunnelCard from "./BentoCards/FunnelCard";
import Card4 from "./BentoCards/Card4";
import Card5 from "./BentoCards/Card5";

const ease = [0.19, 1, 0.22, 1] as const;

export default function BentoGrid() {
  return (
    <section className="page-surface w-full py-16 md:py-20 px-6 md:px-10 font-geom overflow-hidden flex flex-col items-center selection:bg-brand selection:text-white">

      {/* Decorative Background Glows mimicking brand style */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] -left-[10%] w-[50%] max-w-[800px] h-[50%] max-h-[800px] rounded-full bg-brand/5 blur-[120px]" />
        <div className="absolute bottom-[20%] right-[-5%] w-[40%] max-w-[600px] h-[50%] max-h-[600px] rounded-full bg-brand/10 blur-[120px]" />
      </div>

      {/* Header Area */}
      <div className="max-w-4xl text-center mb-10 z-10 flex flex-col items-center">

        <motion.h2
          className="font-geom font-medium text-4xl md:text-5xl lg:text-5xl text-text-primary mb-6 tracking-tight leading-[1.1]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.48, delay: 0.05, ease }}
        >
          Providing structured, <span className="text-brand">belief-driven</span> capital.
        </motion.h2>

        <motion.p
          className="font-geom text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed text-balance"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1, ease }}
        >
          We operate dynamically across the inception and inflection stages, deploying founder-first capital alongside our active operator network.
        </motion.p>
      </div>

      {/* Grid Container */}
      <motion.div
        className="w-full max-w-[1100px] z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-5%' }}
        transition={{ duration: 0.5, delay: 0.08, ease }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Top Left - Ecosystem Card (Spans 2 columns) */}
          <div className="lg:col-span-2">
            <EcosystemCard />
          </div>

          {/* Right Column - Funnel Card (Tall: Spans 2 rows) */}
          <div className="lg:col-span-1 lg:row-span-2 flex h-full">
            <FunnelCard />
          </div>

          {/* Bottom Left - Remaining Cards (1 column each) */}
          <div className="lg:col-span-1">
            <Card4 />
          </div>
          <div className="lg:col-span-1">
            <Card5 />
          </div>

        </div>
      </motion.div>

    </section>
  );
}