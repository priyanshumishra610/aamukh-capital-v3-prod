"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, TrendingUp, ArrowRight } from 'lucide-react';

const trackData = [
  {
    id: 'discovery',
    IconComponent: Lightbulb,
    title: 'Discovery Program',
    badge: 'Inception Stage',
    details: [
      { label: 'Stage', value: 'Idea, student, pre-PMF' },
      { label: 'Cheque Size', value: '₹5–25 lakhs' },
      { label: 'Equity', value: 'Minimum dilution' },
      { label: 'Why it matters', value: 'We get in before the crowd' },
    ],
  },
  {
    id: 'signal',
    IconComponent: TrendingUp,
    title: 'Signal Series',
    badge: 'Inflection Stage',
    details: [
      { label: 'Stage', value: 'Post-PMF, early scale' },
      { label: 'Cheque Size', value: '₹1–10 Cr' },
      { label: 'Equity', value: 'Standard Co-investment' },
      { label: 'Why it matters', value: 'We join at the inflection' },
    ],
  },
];

export default function InteractiveDualModel() {
  const [activeTrackId, setActiveTrackId] = useState('discovery');
  const activeTrack = trackData.find(t => t.id === activeTrackId) || trackData[0];
  const isDiscovery = activeTrackId === 'discovery';

  return (
    <section className="bg-snow py-16 md:py-20 px-6 lg:px-10 overflow-hidden relative border-t border-border/50">
      
      {/* Background Ambience (Subtle Bottom Glow Only) */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-brand/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-brand-300/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[100rem] mx-auto flex flex-col items-center relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-border shadow-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
            <span className="font-mono text-[11px] font-bold tracking-widest text-brand uppercase">Thesis Architecture</span>
          </div>
          <h2 className="font-geom font-medium text-4xl md:text-5xl lg:text-6xl text-text-primary tracking-tight leading-[1.1]">
            The <span className="text-brand">Dual Model.</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-32 w-full max-w-5xl">
          
          {/* --- THE GRAPHIC --- */}
          <div className="relative w-[300px] h-[300px] md:w-[380px] md:h-[380px] shrink-0">
            
            {/* 1. Orbit Lines (4px thickness) */}
            <div className="absolute inset-8 rounded-full border-[4px] border-slate-100/80 z-0" /> {/* Inner Solid */}
            <motion.div 
              className="absolute inset-0 rounded-full border-[4px] border-dashed border-slate-200/60 z-0" 
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            />

            {/* 2. Connection Lines (4px dashed lines behind nodes) */}
            <div className="absolute top-1/2 left-0 w-full h-[4px] -translate-y-1/2 z-10 pointer-events-none">
              <div className="relative w-full h-full">
                {/* Left Line */}
                <motion.div 
                  className="absolute left-0 w-1/2 h-full border-t-[4px] border-dashed"
                  animate={{ borderColor: isDiscovery ? '#4C6BE8' : '#e2e8f0', opacity: isDiscovery ? 1 : 0.2 }}
                />
                {/* Right Line */}
                <motion.div 
                  className="absolute right-0 w-1/2 h-full border-t-[4px] border-dashed"
                  animate={{ borderColor: !isDiscovery ? '#152873' : '#e2e8f0', opacity: !isDiscovery ? 1 : 0.2 }}
                />
              </div>
            </div>

            {/* 3. Center Node (Thick White Frame, Opaque Core) */}
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-36 h-36 md:w-44 md:h-44 rounded-full border-[10px] border-white shadow-2xl flex items-center justify-center overflow-hidden bg-white"
              animate={{ backgroundColor: isDiscovery ? '#4C6BE8' : '#152873' }}
              transition={{ duration: 0.5 }}
            >
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeTrackId} 
                  initial={{ opacity: 0, rotate: -180, scale: 0.5 }} 
                  animate={{ opacity: 1, rotate: 0, scale: 1 }} 
                  exit={{ opacity: 0, rotate: 180, scale: 0.5 }}
                  transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                  className="text-white"
                >
                  <activeTrack.IconComponent size={48} strokeWidth={2.5} />
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* 4. Interactive Small Nodes */}
            <button 
              onClick={() => setActiveTrackId('discovery')}
              className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 z-30 w-24 h-24 md:w-28 md:h-28 rounded-full bg-white flex items-center justify-center shadow-lg border-[3px] transition-all duration-300 hover:scale-105"
              style={{ borderColor: isDiscovery ? '#4C6BE8' : '#f1f5f9' }}
            >
              <span className={`font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-widest transition-colors duration-300 ${isDiscovery ? 'text-[#4C6BE8]' : 'text-slate-400'}`}>Discovery</span>
            </button>

            <button 
              onClick={() => setActiveTrackId('signal')}
              className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 z-30 w-24 h-24 md:w-28 md:h-28 rounded-full bg-white flex items-center justify-center shadow-lg border-[3px] transition-all duration-300 hover:scale-105"
              style={{ borderColor: !isDiscovery ? '#152873' : '#f1f5f9' }}
            >
              <span className={`font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-widest transition-colors duration-300 ${!isDiscovery ? 'text-[#152873]' : 'text-slate-400'}`}>Signal</span>
            </button>
          </div>

          {/* --- CONTENT PANEL --- */}
          <div className="w-full max-w-md grid [grid-template-areas:'stack'] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTrackId}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="[grid-area:stack] w-full bg-white p-8 md:p-10 rounded-[2rem] border border-border shadow-sm flex flex-col"
              >
                <div className="inline-flex mb-6">
                  <span className={`font-mono text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full ${isDiscovery ? 'bg-brand/5 text-brand' : 'bg-slate-100 text-slate-700'}`}>
                    {activeTrack.badge}
                  </span>
                </div>
                
                <h3 className="font-geom text-2xl md:text-3xl font-medium text-text-primary mb-6">{activeTrack.title}</h3>
                
                {/* Details List */}
                <div className="space-y-4 flex-grow">
                  {activeTrack.details.map((detail) => (
                    <div key={detail.label} className="flex justify-between items-start border-t border-slate-50 pt-3 gap-4">
                      <span className="font-mono text-[10px] uppercase text-text-muted mt-1 whitespace-nowrap">{detail.label}</span>
                      <span className="font-geom font-medium text-text-primary text-[15px] text-right leading-tight">{detail.value}</span>
                    </div>
                  ))}
                </div>

                {/* Call to action */}
                <a href="#apply" className="mt-8 flex items-center justify-between w-full p-4 bg-snow border border-border rounded-xl group transition-colors hover:border-brand/30">
                  <span className="font-geom font-medium text-sm">Initiate Process</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}