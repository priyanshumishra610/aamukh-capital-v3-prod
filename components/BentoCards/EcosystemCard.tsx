"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, Variants } from 'framer-motion';
import { Building2, Users, Compass, Rocket, Handshake, Globe } from 'lucide-react';

// Updated with the 6 strategic value propositions using elegant icons
const synergyData = [
  { id: 'industry', Icon: Building2, label: 'Industry Connect' },
  { id: 'cxo', Icon: Users, label: "CXO's Network" },
  { id: 'strategy', Icon: Compass, label: 'Strategic Advice' },
  { id: 'gtm', Icon: Rocket, label: 'Go to Market' },
  { id: 'customer', Icon: Handshake, label: 'Customer Intro' },
  { id: 'mena', Icon: Globe, label: 'Middle East Expansion' },
];

const satelliteVariants: Variants = {
  hidden: (custom: { center: number }) => ({ 
    left: custom.center, 
    top: custom.center, 
    x: "-50%", 
    y: "-50%",
    scale: 0, 
    opacity: 0 
  }),
  visible: (custom: { x: number; y: number; controlX: number; controlY: number; center: number }) => ({
    left: [custom.center, custom.controlX, custom.x],
    top: [custom.center, custom.controlY, custom.y],
    x: "-50%", 
    y: "-50%",
    scale: [0, 1.2, 1],
    opacity: [0, 1, 1],
    transition: {
      duration: 1,
      ease: [0.25, 1, 0.5, 1] as const,
      delay: 0.3,
    },
  }),
};

const centralNodeVariants: Variants = {
  hidden: { scale: 0, opacity: 0, x: "-50%", y: "-50%" },
  visible: { 
    scale: 1, 
    opacity: 1,
    x: "-50%", 
    y: "-50%",
    transition: { type: 'spring', stiffness: 100, damping: 15, delay: 0.1 }
  },
};

const EcosystemCard = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [animationKey, setAnimationKey] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  
  const [dimensions, setDimensions] = useState({ cardSize: 400, center: 200, radius: 150 });
  
  const ref = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        const height = containerRef.current.offsetHeight;
        
        const MAX_SIZE = 450; 
        const size = Math.min(width, height, MAX_SIZE); 
        
        const cardSize = Math.max(size * 0.95, 300); 
        const center = cardSize / 2;
        
        const PADDING_FROM_EDGE = 30; 
        const radius = (cardSize / 2) - PADDING_FROM_EDGE; 
        
        setDimensions({ cardSize, center, radius });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (isInView && !hasAnimated) setHasAnimated(true);
  }, [isInView, hasAnimated]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (hasAnimated) {
      interval = setInterval(() => {
        setAnimationKey(prevKey => prevKey + 1);
      }, 6000);
    }
    return () => clearInterval(interval);
  }, [hasAnimated]);

  useEffect(() => {
    setHoveredIndex(null);
  }, [animationKey]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 1.2, ease: [0.25, 1, 0.5, 1] as const, delay: 0.3 },
    },
  };

  const { cardSize, center, radius } = dimensions;
  const SWING_FACTOR = 0.5;

  return (
    <div ref={ref} className="w-full h-full min-h-[440px] glass-panel rounded-card md:rounded-[2rem] p-6 md:p-8 flex flex-col font-sans relative overflow-hidden group">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#4C6BE8]/5 blur-[50px] rounded-full pointer-events-none" />

      <div ref={containerRef} className="flex-1 w-full relative flex items-center justify-center min-h-[360px] mb-6 z-10 py-6">
        <AnimatePresence mode="wait">
          {hasAnimated && (
            <motion.div
              key={animationKey}
              className="relative"
              style={{ width: cardSize, height: cardSize }}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Connection Lines Canvas */}
              <svg className="absolute inset-0" viewBox={`0 0 ${cardSize} ${cardSize}`}>
                {synergyData.map((_, index) => {
                  const angle = (index / synergyData.length) * 2 * Math.PI - Math.PI / 2;
                  const x = center + radius * Math.cos(angle);
                  const y = center + radius * Math.sin(angle);
                  const controlPointAngle = angle + 0.5;
                  const controlX = center + (radius * SWING_FACTOR) * Math.cos(controlPointAngle);
                  const controlY = center + (radius * SWING_FACTOR) * Math.sin(controlPointAngle);
                  const pathData = `M ${center},${center} Q ${controlX},${controlY} ${x},${y}`;

                  return (
                    <motion.path
                      key={`path-${index}`}
                      d={pathData}
                      fill="none"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      className="transition-all duration-300"
                      style={{
                        stroke: hoveredIndex === null || hoveredIndex === index ? '#4C6BE8' : '#f3f3f3',
                        opacity: hoveredIndex === null || hoveredIndex === index ? 0.8 : 0.4,
                      }}
                      variants={pathVariants}
                    />
                  );
                })}
              </svg>

              {/* Satellite Nodes */}
              {synergyData.map((item, index) => {
                const angle = (index / synergyData.length) * 2 * Math.PI - Math.PI / 2;
                const x = center + radius * Math.cos(angle);
                const y = center + radius * Math.sin(angle);
                const controlPointAngle = angle + 0.5;
                const controlX = center + (radius * SWING_FACTOR) * Math.cos(controlPointAngle);
                const controlY = center + (radius * SWING_FACTOR) * Math.sin(controlPointAngle);
                
                return (
                  <motion.div
                    key={`node-${index}`}
                    className="absolute z-20 w-12 h-12 sm:w-14 sm:h-14"
                    variants={satelliteVariants}
                    custom={{ x, y, controlX, controlY, center }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    style={{ willChange: 'transform, opacity' }}
                  >
                    <motion.div
                      className="relative flex flex-col items-center justify-center cursor-pointer w-full h-full"
                      whileHover={{ scale: 1.15 }}
                      animate={{ opacity: hoveredIndex === null || hoveredIndex === index ? 1 : 0.4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-full h-full bg-white rounded-xl shadow-md border border-border flex items-center justify-center transition-colors group-hover:border-[#4C6BE8]">
                        <item.Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#4C6BE8]" strokeWidth={1.5} />
                      </div>
                      <AnimatePresence>
                        {hoveredIndex === index && (
                          <motion.span 
                            className="absolute -bottom-7 text-center font-mono text-[9px] uppercase tracking-widest text-text-primary bg-white border border-border px-2.5 py-1.5 rounded shadow-sm whitespace-nowrap z-30 font-semibold"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            {item.label}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </motion.div>
                );
              })}

              {/* Central Primary Node */}
              <motion.div
                className="absolute top-1/2 left-1/2 z-30 w-16 h-16 sm:w-20 sm:h-20 bg-[#4C6BE8] rounded-2xl shadow-[0_10px_30px_rgba(76,107,232,0.4)] border border-[#4C6BE8]/50 flex flex-col items-center justify-center text-white"
                variants={centralNodeVariants}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7 sm:w-8 sm:h-8 mb-0.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </motion.div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-auto z-10 pt-6 border-t border-border/50 text-center">
        <h3 className="text-xl md:text-2xl font-medium text-text-primary mb-2 tracking-tight">Ecosystem Synergy</h3>
        <p className="text-[15px] text-text-secondary leading-relaxed max-w-[90%] mx-auto">
          We connect founders to a curated network of strategic partners, operators, and growth channels.
        </p>
      </div>
    </div>
  );
};

export default EcosystemCard;