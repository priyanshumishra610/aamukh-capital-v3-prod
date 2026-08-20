"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { Search, PhoneCall, CheckCircle, Microscope, FileText, Presentation } from 'lucide-react';

const stagesData = [
  { Icon: Search, title: 'Initial screening' },
  { Icon: PhoneCall, title: 'Deep live call' },
  { Icon: CheckCircle, title: 'Early validation' },
  { Icon: Microscope, title: 'Deep Research' },
  { Icon: FileText, title: 'Investment memo' },
  { Icon: Presentation, title: 'Investor Showcase' },
];

const ANIMATION_INTERVAL = 7000;

const FunnelCard = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const [animationKey, setAnimationKey] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  const [containerHeight, setContainerHeight] = useState(500);
  const [containerWidth, setContainerWidth] = useState(300);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateDimensions = () => {
      if (contentRef.current) {
        setContainerHeight(contentRef.current.offsetHeight);
        setContainerWidth(contentRef.current.offsetWidth);
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      setAnimationKey(prevKey => prevKey + 1);
      if (contentRef.current) {
        setContainerHeight(contentRef.current.offsetHeight);
        setContainerWidth(contentRef.current.offsetWidth);
      }
    }
  }, [isInView, hasAnimated]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (hasAnimated) {
      interval = setInterval(() => {
        setAnimationKey(prevKey => prevKey + 1);
      }, ANIMATION_INTERVAL);
    }
    return () => clearInterval(interval);
  }, [hasAnimated]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
  };

  const pathVariants: Variants = {
    hidden: { pathLength: 0 },
    visible: { pathLength: 1, transition: { duration: 2, ease: 'easeInOut' } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 15 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const controlPoint1Y = containerHeight * 0.3;
  const controlPoint2Y = containerHeight * 0.7;
  const pathData = `M ${containerWidth / 2} 0 C ${-containerWidth / 2} ${controlPoint1Y}, ${containerWidth * 1.5} ${controlPoint2Y}, ${containerWidth / 2} ${containerHeight}`;

  return (
    <div ref={ref} className="w-full h-full min-h-[550px] glass-panel rounded-card md:rounded-[2rem] p-6 md:p-8 flex flex-col font-sans relative overflow-hidden group">
      
      {/* Background Decor - Increased opacity for more context */}
      <div className="absolute top-[-50px] right-[-50px] w-[200px] h-[200px] bg-brand/10 rounded-full blur-[40px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-50px] w-[150px] h-[150px] bg-brand/5 rounded-full blur-[50px] pointer-events-none" />

      {/* Header */}
      <div className="mb-6 text-center relative z-20 shrink-0">
        <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-2 tracking-tight">Investment Funnel</h3>
        <p className="text-[14px] text-text-secondary leading-relaxed mx-auto max-w-[200px]">
          Finding the signal in the noise.
        </p>
      </div>

      <div ref={contentRef} className="flex-1 w-full relative flex flex-col justify-center z-10 px-0">
        {hasAnimated && (
          <motion.div
            key={animationKey}
            className="absolute inset-0"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Base Line SVG - Darkened from #f3f3f3 to #e8ecfb for contrast */}
            <div className="absolute inset-0 z-0">
              <svg className="w-full h-full" fill="none" viewBox={`0 0 ${containerWidth} ${containerHeight}`} preserveAspectRatio="none">
                <motion.path
                  d={pathData}
                  stroke="#E8ECFB" 
                  strokeWidth="3"
                  strokeLinecap="round"
                  variants={pathVariants}
                />
              </svg>
            </div>

            {/* Particles over line */}
            <div className="absolute inset-0 z-0">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={`noise-${i}`}
                  className="absolute w-1.5 h-1.5 bg-brand-300 rounded-full"
                  style={{ offsetPath: `path("${pathData}")` }}
                  initial={{ offsetDistance: "0%", opacity: 0.8 }}
                  animate={{ offsetDistance: `${Math.random() * 80 + 10}%`, opacity: 0 }}
                  transition={{ duration: 2 + Math.random() * 2, delay: 0.5 + Math.random(), ease: 'linear' }}
                />
              ))}
              <motion.div
                className="absolute w-3 h-3 bg-brand rounded-full shadow-[0_0_12px_rgba(76,107,232,0.6)]"
                style={{ offsetPath: `path("${pathData}")` }}
                initial={{ offsetDistance: "0%" }}
                animate={{ offsetDistance: "100%" }}
                transition={{ duration: 4, delay: 1, ease: 'easeInOut' }}
              />
            </div>

            {/* Stages Overlay (High Contrast Pills) */}
            <motion.div className="absolute inset-0 flex flex-col justify-between py-6 z-10" variants={containerVariants}>
              {stagesData.map((stage) => (
                <motion.div 
                  key={stage.title} 
                  variants={itemVariants} 
                  className="mx-auto flex items-center gap-3 bg-brand-50/90 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-brand/20 shadow-[0_4px_20px_-4px_rgba(76,107,232,0.2)] hover:bg-white transition-all duration-300 hover:shadow-xl hover:border-brand/40 group/item"
                >
                  <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm border border-brand/5 group-hover/item:bg-brand group-hover/item:text-white transition-colors duration-300">
                    <stage.Icon className="w-4 h-4 text-brand group-hover/item:text-white transition-colors" />
                  </div>
                  <h4 className="text-[12px] font-bold text-text-primary whitespace-nowrap tracking-tight">
                    {stage.title}
                  </h4>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </div>

    </div>
  );
};

export default FunnelCard;