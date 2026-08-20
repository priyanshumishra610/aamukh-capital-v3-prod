'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const portfolio = [
  {
    id: 'gudgudi',
    name: 'Gudgudi',
    images: ['/goodgudi1.png', '/goodgudi2.png', '/goodgudi3.png'],
    category: 'Discovery',
    type: 'D2C / Lifestyle',
    description:
      'A D2C brand built around community and high-velocity product drops in Bharat.',
    status: 'Seed',
  },
  {
    id: 'tpl',
    name: 'Tennis Premier League',
    images: ['/tpl1.png', '/tpl2.png', '/tpl3.png'],
    category: 'Signal',
    type: 'Sports and media',
    description:
      'Sports IP at the intersection of franchise tennis, media, and grassroots play.',
    status: 'Growth',
  },
];

const CompanyImageSlider = ({ images, isActive }: { images: string[]; isActive: boolean }) => {
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
          alt=""
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 z-10" />
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
    <section id="portfolio" className="page-surface w-full py-16 md:py-24 px-6 lg:px-10 flex flex-col items-center border-t border-border/50 overflow-hidden">
      <div className="max-w-[100rem] w-full mx-auto flex flex-col items-center gap-10 md:gap-14">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full gap-6 border-b border-border pb-8">
          <h2 className="font-geom font-medium text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-[-0.04em] text-text-primary">
            Companies we back
          </h2>
          <p className="font-sans text-lg md:text-xl text-text-secondary leading-relaxed max-w-md md:text-right">
            Discovery and Signal, on the ground. Two names. The rest of the book is private.
          </p>
        </div>

        <div className="relative w-full">
          <div className="absolute top-1/2 -left-4 md:-left-8 -translate-y-1/2 z-30 hidden sm:block">
            <button
              type="button"
              onClick={prevSlide}
              className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white border border-border shadow-[0_8px_24px_rgba(10,17,40,0.08)] text-text-primary hover:text-[#4C6BE8]"
              aria-label="Previous company"
            >
              <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
            </button>
          </div>

          <div className="absolute top-1/2 -right-4 md:-right-8 -translate-y-1/2 z-30 hidden sm:block">
            <button
              type="button"
              onClick={nextSlide}
              className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white border border-border shadow-[0_8px_24px_rgba(10,17,40,0.08)] text-text-primary hover:text-[#4C6BE8]"
              aria-label="Next company"
            >
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
            </button>
          </div>

          <div className="w-full glass-panel rounded-card md:rounded-[2rem] p-4 lg:p-6 min-h-[520px] flex items-center overflow-hidden relative">
            <div className="w-full h-full flex-grow relative overflow-hidden flex min-h-[480px]">
              {portfolio.map((company, index) => {
                const isActive = index === currentIndex;
                return (
                  <div
                    key={company.id}
                    className={`absolute inset-0 w-full h-full flex flex-col lg:flex-row gap-8 lg:gap-16 ${
                      isActive ? 'opacity-100 z-10' : 'opacity-0 -z-10 pointer-events-none'
                    }`}
                  >
                    <div className="w-full lg:w-[50%] h-[320px] lg:h-auto relative rounded-2xl overflow-hidden">
                      <CompanyImageSlider images={company.images} isActive={isActive} />
                      <div className="absolute top-6 left-6 z-20 flex flex-wrap gap-2">
                        <span className="font-sans text-sm font-medium text-white bg-[#4C6BE8]/85 px-3 py-1.5 rounded-full">
                          {company.category}
                        </span>
                        <span className="font-sans text-sm font-medium text-white bg-black/35 px-3 py-1.5 rounded-full">
                          {company.status}
                        </span>
                      </div>
                      <div className="absolute bottom-6 left-6 z-20">
                        <p className="font-sans text-sm text-white/80 mb-1">{company.type}</p>
                        <h3 className="font-sans text-4xl md:text-5xl font-bold text-white tracking-tight">
                          {company.name}
                        </h3>
                      </div>
                    </div>

                    <div className="w-full lg:w-[50%] flex flex-col justify-center py-4 lg:py-12 pr-2 lg:pr-6">
                      <p className="font-sans text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl">
                        {company.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center gap-3 sm:hidden">
          {portfolio.map((company, idx) => (
            <button
              key={company.id}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`h-2.5 rounded-full ${
                currentIndex === idx ? 'bg-[#4C6BE8] w-8' : 'bg-gray-300 w-2.5'
              }`}
              aria-label={`Show ${company.name}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
