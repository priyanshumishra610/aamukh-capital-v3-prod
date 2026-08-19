'use client';

import React, { useState } from 'react';
import { ArrowRight, BrainCircuit, Users, Activity, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const philosophies = [
  {
    id: 'founders-first',
    title: 'Founders First',
    icon: Users,
    shortDesc: 'Ideas Evolve. Founders Endure.',
    content: "We don't just invest in a pitch deck; we invest in the grit, adaptability, and vision of the founder. When product pivots happen—and they will—it's the founder's resilience that dictates the outcome. We prioritize backing exceptional people over perfect plans.",
  },
  {
    id: 'conviction-driven',
    title: 'Conviction Driven',
    icon: BrainCircuit,
    shortDesc: 'Early & Decisive Capital',
    content: "The traditional investing model is often plagued by FOMO, leading to delayed decisions and crowded rounds. We bypass the noise. We build deep relationships early to develop independent conviction, allowing us to deploy capital swiftly when the signal is clear—long before the herd arrives.",
  },
  {
    id: 'light-touch',
    title: 'Light-Touch Support',
    icon: Activity,
    shortDesc: 'Value Beyond Capital',
    content: "We believe in empowering, not meddling. Our operational support is 'light-touch' but high-impact. Through our Founder Command Center, we plug gaps in GTM, hiring, and branding precisely when requested, avoiding the heavy-handed oversight that slows agile teams down.",
  },
  {
    id: 'skin-in-game',
    title: 'Skin in the Game',
    icon: ShieldAlert,
    shortDesc: 'Aligned Incentives',
    content: "Unlike fee-driven models that prioritize AUM over returns, we put our money where our mouth is. With up to 20% participation in discovery deals and 10% in signal deals, our success is intrinsically linked to the success of our founders and LPs. No diluted returns, just structured belief.",
  },
];

export default function CorePhilosophySection() {
  const [activeTab, setActiveTab] = useState(philosophies[0].id);

  const activeContent = philosophies.find(p => p.id === activeTab);
  const activeIndex = philosophies.findIndex(p => p.id === activeTab);

  return (
    <section id="philosophy" className="w-full bg-snow py-16 md:py-20 px-6 lg:px-10 flex flex-col items-center overflow-hidden">
      <div className="max-w-[100rem] w-full mx-auto flex flex-col items-center gap-10 md:gap-12">
        
        {/* Section Header */}
        <div className="flex flex-col items-center w-full border-t border-border pt-8 gap-5">
          <motion.div
            className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white border border-border shadow-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-8%' }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
          >
            <span className="font-mono text-xs font-semibold tracking-widest text-brand uppercase">
              The Aamukh Way
            </span>
          </motion.div>

          <motion.h2
            className="font-geom font-medium text-4xl md:text-5xl lg:text-6xl text-center leading-[1.1] tracking-[-0.04em] text-text-primary text-balance max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
          >
            Fixing the broken model of <br className="hidden md:block"/>
            <span className="text-brand">traditional investing.</span>
          </motion.h2>

          <motion.p
            className="font-geom text-lg md:text-xl text-text-secondary text-center max-w-[45rem] mt-2 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
          >
            Eliminating fee-driven motives, delayed FOMO execution, and misaligned incentives to bring structured, belief-driven capital exactly when it's needed.
          </motion.p>
        </div>

        {/* Interactive Content Block */}
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Panel - Active Content Viewer */}
          <div className="lg:col-span-7 order-2 lg:order-1 h-full min-h-[450px]">
            <div className="bg-white rounded-card md:rounded-[2rem] p-8 md:p-12 h-full w-full flex flex-col border border-border shadow-sm relative overflow-hidden group">
              
              {/* Decorative Mesh Backgrounds */}
              <div className="absolute top-[-20%] right-[-10%] w-[300px] h-[300px] bg-brand/5 blur-[80px] rounded-full pointer-events-none transition-all duration-700" />
              <div className="absolute bottom-[-10%] left-[-10%] w-[250px] h-[250px] bg-[#869CE9]/5 blur-[60px] rounded-full pointer-events-none transition-all duration-700" />

              <div className="relative z-10 flex flex-col h-full justify-center">
                <AnimatePresence mode="wait">
                  {activeContent && (
                    <motion.div
                      key={activeContent.id}
                      initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
                      transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                      className="flex flex-col"
                    >
                      {/* Icon Container */}
                      <div className="w-16 h-16 rounded-2xl bg-background-secondary border border-border/60 flex items-center justify-center text-brand mb-8 shadow-sm">
                        <activeContent.icon className="w-7 h-7 stroke-[1.5]" />
                      </div>
                      
                      <div className="mb-4 inline-flex">
                        <span className="font-mono text-[11px] font-bold tracking-widest uppercase text-brand/80 bg-brand/5 px-3 py-1 rounded border border-brand/10">
                          {activeContent.shortDesc}
                        </span>
                      </div>

                      <h3 className="font-geom font-medium text-3xl md:text-4xl text-text-primary tracking-[-0.02em] mb-6">
                        {activeContent.title}
                      </h3>
                      
                      <p className="font-geom text-lg md:text-[1.1rem] text-text-secondary leading-relaxed pt-6 border-t border-border/60">
                         {activeContent.content}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right Panel - Tab Selection */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col gap-3 relative pl-0 md:pl-4">
            
            <h4 className="font-mono text-xs font-semibold tracking-widest text-text-muted uppercase mb-4 ml-4">
              Our Principles
            </h4>
            
            <div className="flex flex-col gap-3 relative">
              {/* Desktop Vertical Progress Track */}
              <div className="hidden lg:block absolute left-0 top-4 bottom-4 w-[2px] bg-border/60 rounded-full z-0" />
              
              {/* Dynamic Active Line */}
              <div 
                className="hidden lg:block absolute left-0 w-[2px] bg-brand rounded-full transition-all duration-500 ease-out z-10"
                style={{ 
                  top: `calc(${activeIndex * 25}% + 16px)`, 
                  height: 'calc(25% - 16px)' 
                }} 
              />

              {philosophies.map((item, index) => {
                const isActive = activeTab === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`group relative flex items-center text-left w-full p-5 lg:p-6 rounded-2xl lg:ml-6 transition-all duration-300 border ${
                      isActive 
                        ? 'bg-white border-border shadow-sm ring-1 ring-border/50 translate-x-0 lg:-translate-x-2' 
                        : 'bg-transparent border-transparent hover:bg-white/40 hover:border-border/50'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-start gap-4">
                         
                         {/* Number Indicator */}
                         <span className={`mt-1 font-mono text-[10px] md:text-xs font-bold tracking-widest uppercase transition-colors duration-300 ${isActive ? 'text-brand' : 'text-text-muted group-hover:text-brand/60'}`}>
                           0{index + 1}
                         </span>

                         <div className="flex flex-col">
                           <span className={`font-geom text-xl md:text-2xl font-medium tracking-tight transition-colors duration-300 ${isActive ? 'text-text-primary' : 'text-text-secondary group-hover:text-text-primary'}`}>
                             {item.title}
                           </span>
                           
                           {/* Subtitle revelation */}
                           <span className={`font-geom text-sm transition-all duration-300 overflow-hidden ${
                             isActive 
                              ? 'text-text-secondary mt-1 max-h-10 opacity-100' 
                              : 'max-h-0 opacity-0 group-hover:max-h-10 group-hover:opacity-100 group-hover:text-text-muted mt-0'
                           }`}>
                              {item.shortDesc}
                           </span>
                         </div>
                      </div>
                      
                      {/* Arrow indicator */}
                      <ArrowRight className={`shrink-0 w-5 h-5 ml-4 transition-all duration-500 ease-out ${
                        isActive 
                          ? 'text-brand opacity-100 translate-x-0' 
                          : 'text-text-muted opacity-0 -translate-x-4 group-hover:opacity-40 group-hover:-translate-x-1'
                      }`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}