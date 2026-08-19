'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle, ArrowUpRight } from 'lucide-react';

const portfolio = [
  {
    id: 'gudgudi',
    name: 'Gudgudi',
    images: [
      '/goodgudi1.png', 
      '/goodgudi2.png',
      '/goodgudi3.png'
    ],
    category: 'Discovery Program',
    type: 'D2C / Lifestyle',
    description: 'A next-generation D2C brand capturing the evolving consumer sentiment in Bharat. Leveraging deep community integration and high-velocity product drops to establish a cult following pre-launch.',
    highlights: ['Community-first approach', 'Rapid prototyping', 'Strong early traction metrics'],
    status: 'Seed Stage',
  },
  {
    id: 'tpl',
    name: 'Tennis Premier League',
    images: [
      '/tpl1.png',
      '/tpl2.png',
      '/tpl3.png', 
    ],
    category: 'Signal Series',
    type: 'SportsTech & Media',
    description: 'Revolutionizing sports IP creation in India. TPL operates at the intersection of media, franchise sports, and grassroots engagement, scaling a proven model with institutional backing.',
    highlights: ['Proven PMF', 'Scalable franchise model', 'Secured major brand partnerships'],
    status: 'Growth Phase',
  },
];

const CompanyImageSlider = ({ images, isActive }: { images: string[], isActive: boolean }) => {
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isActive, images.length]);

  return (
    <div className="absolute inset-0 w-full h-full">
      <AnimatePresence mode="wait">
        <motion.img
          key={imgIndex}
          src={images[imgIndex]}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 z-10" />
    </div>
  );
};

export default function PipelineShowcaseSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === portfolio.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? portfolio.length - 1 : prev - 1));
  };

  return (
    <section id="portfolio" className="w-full bg-snow py-16 md:py-20 px-6 lg:px-10 flex flex-col items-center border-t border-border/50 overflow-hidden relative">
      
      <div className="absolute top-[10%] right-[-5%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-[#4C6BE8]/5 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="max-w-[100rem] w-full mx-auto flex flex-col items-center gap-10 md:gap-14 z-10">
        
        {/* Header Block - Simplified */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full gap-6 border-b border-border pb-8">
          <div className="flex flex-col items-start gap-6 max-w-3xl">
            <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white border border-border shadow-sm">
              <span className="font-mono text-xs font-semibold tracking-widest text-[#4C6BE8] uppercase">
                Our Portfolio
              </span>
            </div>
            
            <h2 className="font-sans font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-[-0.04em] text-text-primary uppercase">
              Executing The <br className="hidden md:block"/>
              <span className="editorial-italic lowercase tracking-normal text-brand">
                Flywheel.
              </span>
            </h2>
          </div>

          <p className="font-sans text-lg md:text-xl text-text-secondary leading-relaxed max-w-md md:text-right">
            We invest across sectors, looking for conviction where others see risk. These are the founders we back.
          </p>
        </div>

        {/* Showcase Area - With Obvious Side Navigation */}
        <div className="relative w-full group">
          
          {/* Obvious Navigation Arrows - Positioned on edges */}
          <div className="absolute top-1/2 -left-4 md:-left-8 -translate-y-1/2 z-30 hidden sm:block">
            <button 
              onClick={prevSlide} 
              className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-white border border-border shadow-xl text-text-primary hover:text-[#4C6BE8] hover:scale-110 transition-all active:scale-95 group/btn"
              aria-label="Previous portfolio company"
            >
              <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 group-hover/btn:-translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="absolute top-1/2 -right-4 md:-right-8 -translate-y-1/2 z-30 hidden sm:block">
            <button 
              onClick={nextSlide} 
              className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-white border border-border shadow-xl text-text-primary hover:text-[#4C6BE8] hover:scale-110 transition-all active:scale-95 group/btn"
              aria-label="Next portfolio company"
            >
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8 group-hover/btn:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Main Card Container */}
          <div className="w-full bg-white rounded-card md:rounded-[2rem] p-4 lg:p-6 border border-border/80 shadow-sm min-h-[600px] flex items-center overflow-hidden relative">
            
            <div className="w-full h-full flex-grow relative overflow-hidden flex min-h-[550px]">
              {portfolio.map((company, index) => {
                const isActive = index === currentIndex;
                
                return (
                  <div 
                    key={company.id}
                    className={`absolute inset-0 w-full h-full flex flex-col lg:flex-row gap-8 lg:gap-16 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]
                      ${isActive ? "opacity-100 translate-x-0 z-10" : "opacity-0 translate-x-12 -z-10"}
                    `}
                  >
                    
                    {/* LEFT SIDE: Image Slider */}
                    <div className="w-full lg:w-[50%] h-[350px] lg:h-auto relative rounded-2xl overflow-hidden shadow-inner group">
                      <CompanyImageSlider images={company.images} isActive={isActive} />

                      <div className="absolute top-8 left-8 z-20 flex gap-3">
                        <span className="font-mono text-[10px] font-bold text-white uppercase tracking-widest bg-[#4C6BE8]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                          {company.category}
                        </span>
                        <span className="font-mono text-[10px] font-bold text-white uppercase tracking-widest bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                          {company.status}
                        </span>
                      </div>

                      <div className="absolute bottom-8 left-8 z-20">
                        <p className="font-mono text-xs text-[#4C6BE8] font-bold uppercase tracking-widest mb-2 drop-shadow-md">
                          {company.type}
                        </p>
                        <h3 className="font-sans text-4xl md:text-5xl font-bold text-white tracking-tight drop-shadow-lg">
                          {company.name}
                        </h3>
                      </div>
                    </div>

                    {/* RIGHT SIDE: Content */}
                    <div className="w-full lg:w-[50%] flex flex-col justify-center py-4 lg:py-12 pr-6">
                      <p className="font-sans text-lg md:text-xl text-text-secondary leading-relaxed mb-10 max-w-2xl border-b border-border/60 pb-10">
                        {company.description}
                      </p>

                      <div className="mb-12">
                        <h4 className="font-mono text-xs font-semibold tracking-widest text-[#4C6BE8] uppercase mb-6">
                          Traction & Execution
                        </h4>
                        <ul className="grid gap-4">
                          {company.highlights.map((highlight, i) => (
                            <li key={i} className="flex items-start gap-4">
                              <CheckCircle className="w-5 h-5 text-[#4C6BE8] shrink-0 mt-0.5" />
                              <span className="font-sans text-[1.1rem] text-text-primary font-medium">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-auto">
                        <a href={`#case-study-${company.id}`} className="inline-flex items-center gap-2 font-mono text-sm font-semibold uppercase tracking-wider text-[#4C6BE8] group">
                          View Complete Case Study
                          <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* PAGINATION DOTS */}
        <div className="flex justify-center items-center gap-3">
          {portfolio.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-500 ease-out ${
                currentIndex === idx 
                  ? "bg-[#4C6BE8] w-10 shadow-sm shadow-[#4C6BE8]/40" 
                  : "bg-gray-300 hover:bg-gray-400 w-3"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}