'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const OPERATORS = [
  {
    name: 'ANURAG SHARMA',
    role: 'CEO',
    focus: 'Ex–India Accelerator, We Founder Circle | Deals: Garuda Aerospace, iMumz',
    bio: "An early-stage investor shaping India's venture ecosystem. Formerly a key figure at We Founder Circle and India Accelerator, he combines close founder engagement with network-driven capital to scale innovative ideas.",
    image: '/anurag-sharma.png' 
  },
  {
    name: 'RAVI GUPTA',
    role: 'CHIEF ADVISOR',
    focus: 'Founder, SafeXPay | 100+ investments: Zypp, Vidyakul, Garuda Aerospace',
    bio: 'Fintech expert with a decade of experience scaling payment infrastructures globally. Founder of SafeXPay and an active investor in 100+ startups, specializing in product strategy and high-growth digital commerce.',
    image: '/ravi-gupta.png'
  },
  {
    name: 'ARJUN PRASAD',
    role: 'CHIEF ADVISOR',
    focus: 'Partner, 5TECH | Investor: Uber, Razorpay, 5ire, Delhivery',
    bio: 'Seasoned technology entrepreneur and investor with 18+ years of experience. A former AI founder who has backed unicorns like Uber and Razorpay, specializing in scaling disruptive technologies and strategic mentorship.',
    image: '/arjun-prasad.png'
  }
];

const cinematicEase = [0.19, 1, 0.22, 1] as const;

export default function TeamExpertiseSection() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section 
      id="team" 
      ref={containerRef}
      // TWEAK 1: Changed lg:px-[8vw] to lg:px-[4vw] to reduce side margins and let the layout stretch wider.
      className="relative w-full bg-snow px-[6vw] lg:px-[4vw] py-16 md:py-20 border-t border-border/50 overflow-hidden"
    >
      
      {/* Background Subtle Glows */}
      <div className="absolute top-[20%] left-[-10%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-[#4C6BE8]/5 blur-[120px] rounded-full mix-blend-multiply pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] bg-[#869CE9]/10 blur-[100px] rounded-full mix-blend-multiply pointer-events-none" />

      {/* TWEAK 2: Changed max-w-[1400px] to max-w-[1600px] so the whole block can expand wider. */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6 border-b border-border pb-8">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: cinematicEase }}
          >
            <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-white border border-[#4C6BE8]/20 shadow-sm">
              <span className="font-mono text-xs font-semibold tracking-widest text-[#4C6BE8] uppercase">
                Collective of Operators
              </span>
            </div>
            
            <h2 className="font-geom font-medium text-4xl md:text-6xl lg:text-[5rem] leading-[1.05] tracking-[-0.03em] text-text-primary">
              Built by <br />
              <span className="text-brand">
                repeat founders.
              </span>
            </h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: cinematicEase }}
            className="flex items-center gap-6"
          >
            <p className="font-geom text-text-secondary text-lg max-w-sm md:text-right leading-relaxed">
              We do not employ traditional career investors. Our partnership consists entirely of operators who have built, scaled, and exited within the ecosystem.
            </p>
            <div className="hidden md:block w-[1px] h-20 bg-border" />
          </motion.div>
        </div>

        {/* Interactive Operator List */}
        <div className="flex flex-col relative w-full group/list">
           
           <motion.div 
             className="absolute left-0 w-[3px] bg-[#4C6BE8] rounded-full z-20 hidden lg:block"
             initial={{ top: '0%', height: '0%' }}
             animate={{ 
               top: hoveredIndex !== null ? `${(hoveredIndex / OPERATORS.length) * 100}%` : '0%',
               height: hoveredIndex !== null ? `${100 / OPERATORS.length}%` : '0%'
             }}
             transition={{ duration: 0.4, ease: "easeOut" }}
           />

           {OPERATORS.map((person, index) => (
             <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + (index * 0.1), ease: cinematicEase }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative flex flex-col md:flex-row justify-between border-b border-border py-12 md:py-16 hover:bg-white/40 transition-colors duration-500 cursor-pointer px-4 lg:pl-12"
             >
                {/* Floating Image Reveal */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                  animate={
                    hoveredIndex === index 
                      ? { opacity: 1, scale: 1, rotate: 2 } 
                      : { opacity: 0, scale: 0.9, rotate: -2 }
                  }
                  transition={{ duration: 0.5, ease: cinematicEase }}
                  // TWEAK 3: Moved image from left-[42%] to left-[45%] to keep it perfectly centered in the new wider gap.
                  className="absolute top-1/2 left-[42%] z-30 pointer-events-none overflow-hidden rounded-[2rem] hidden lg:block border-[6px] border-white shadow-[0_20px_50px_rgba(76,107,232,0.15)] bg-background-secondary w-[280px] h-[360px]"
                  style={{ x: '-50%', y: '-50%' }}
                >
                  <motion.div 
                    className="w-full h-full bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-105"
                    style={{ backgroundImage: `url(${person.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#4C6BE8]/20 to-transparent mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>

                {/* Left Column (Name & Role) */}
                {/* TWEAK 4: Changed lg:w-1/3 to lg:w-[30%] to pull the left column slightly away from the center. */}
                <div className="flex flex-col lg:w-[30%] mb-6 lg:mb-0 relative z-10">
                   <div className="flex items-center gap-4 mb-3">
                     <span className="font-mono text-sm font-semibold text-text-muted group-hover:text-[#4C6BE8] transition-colors">
                       0{index + 1}
                     </span>
                     <h3 className="font-geom text-3xl lg:text-4xl font-medium tracking-tight text-text-primary group-hover:translate-x-2 transition-transform duration-500 ease-out uppercase">
                       {person.name}
                     </h3>
                   </div>
                   <span className="font-mono text-xs font-semibold tracking-widest text-[#4C6BE8] uppercase ml-8">
                     {person.role}
                   </span>
                </div>

                {/* Right Column (Description) */}
                {/* TWEAK 5: Kept lg:w-[45%] but changed max-w-md to max-w-lg on the bio so it can take advantage of the wider screen. */}
                <div className="flex flex-col lg:w-[45%] justify-center relative z-10">
                   <p className="font-geom text-xl font-medium text-text-primary mb-3 group-hover:text-[#4C6BE8] transition-colors duration-300 pr-10">
                     {person.focus}
                   </p>
                   <p className="font-geom text-text-secondary text-base leading-relaxed max-w-lg">
                     {person.bio}
                   </p>
                </div>

                {/* Arrow Icon Reveal */}
                <div className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-4 transition-all duration-500 ease-out absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-14 h-14 rounded-full bg-[#4C6BE8]/5 border border-[#4C6BE8]/20 text-[#4C6BE8] z-10 backdrop-blur-sm">
                   <ArrowUpRight className="w-6 h-6" />
                </div>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
}