'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { AreaChart, Area, ResponsiveContainer, XAxis, Tooltip } from 'recharts';

const data = [
  { year: '2016', value: 10 },
  { year: '2018', value: 35 },
  { year: '2020', value: 60 },
  { year: '2022', value: 110 },
  { year: '2024', value: 100 },
];

const MarketVisionSection = () => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <section className="page-surface w-full pb-16 md:pb-20 px-6 lg:px-10 flex flex-col items-center">
      <div className="max-w-[100rem] w-full mx-auto flex flex-col items-center">

        <motion.div
          className="w-full relative h-[400px] md:h-[500px] rounded-card md:rounded-[2rem] overflow-hidden shadow-sm border border-border/50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-8%' }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        >
            <Image 
              src="/vision-bg.png" 
              alt="Architecture background" 
              fill
              className="object-cover object-center z-0"
              sizes="(max-width: 768px) 100vw, 1200px"
            />
            
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-transparent z-10"></div>
            
            <div className="relative z-20 flex flex-col justify-center h-full p-8 md:p-16 max-w-3xl">
              <h3 className="font-sans font-bold text-3xl md:text-5xl tracking-[-0.03em] mb-6 text-text-primary leading-tight text-balance">
                Architecting the Future <br/> of Indian Capital.
              </h3>
              <p className="font-sans text-lg md:text-xl text-text-secondary max-w-xl leading-relaxed mb-8">
                We believe the next decade of structural wealth creation will be driven by Indian founders solving hard problems with global ambition.
              </p>
              
              <div className="h-[100px] w-full max-w-[300px] mt-auto">
                 {hasMounted && (
                   <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                      <AreaChart data={data}>
                        <defs>
                          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4C6BE8" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#4C6BE8" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="year" hide />
                        <Tooltip 
                          contentStyle={{ borderRadius: '8px', border: '1px solid #f3f3f3', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} 
                          itemStyle={{ color: '#4C6BE8', fontWeight: 600, fontFamily: 'monospace' }}
                        />
                        <Area type="monotone" dataKey="value" stroke="#4C6BE8" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                      </AreaChart>
                    </ResponsiveContainer>
                 )}
              </div>
            </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MarketVisionSection;