"use client"
import React, { useEffect, useState } from 'react';

const Card5: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const nodes = [
    { id: 1, x: 20, y: 40, r: 8, initial: 'A' },
    { id: 2, x: 70, y: 15, r: 6, initial: 'R' },
    { id: 3, x: 130, y: 30, r: 10, initial: 'V' },
    { id: 4, x: 180, y: 25, r: 7, initial: 'M' },
    { id: 5, x: 190, y: 80, r: 9, initial: 'P' },
    { id: 6, x: 160, y: 130, r: 8, initial: 'K' },
    { id: 7, x: 110, y: 145, r: 6, initial: 'S' },
    { id: 8, x: 50, y: 125, r: 10, initial: 'D' },
    { id: 9, x: 15, y: 85, r: 7, initial: 'N' },
  ];

  const lines = [
    [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 1],
    [1, 9], [2, 5], [3, 7], [8, 3]
  ];

  return (
    <div className="w-full h-full min-h-[360px] glass-panel rounded-card md:rounded-[2rem] p-6 md:p-8 flex flex-col font-geom relative overflow-hidden group">
      
      <style>{`
        @keyframes orbitNet {
          from { transform: rotate(0deg) scale(1.0); }
          50% { transform: rotate(180deg) scale(1.05); }
          to { transform: rotate(360deg) scale(1.0); }
        }
        @keyframes orbitNetReverse {
          from { transform: rotate(360deg); }
          50% { transform: rotate(180deg); }
          to { transform: rotate(0deg); }
        }
        .anim-orbit { animation: orbitNet 50s ease-in-out infinite; }
        .anim-orbit-reverse { animation: orbitNetReverse 50s ease-in-out infinite; }
      `}</style>

      {/* Background Aura */}
      <div className="absolute inset-0 bg-gradient-to-br from-snow to-white z-0" />

      <div className="flex-1 w-full relative flex items-center justify-center mb-6 z-10 overflow-hidden">
        
        <div className={`relative w-[210px] h-[160px] flex items-center justify-center transition-opacity duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
           
           <div className="absolute inset-0 anim-orbit" style={{ transformOrigin: '105px 80px' }}>
             
             {/* Lines */}
             <svg className="absolute inset-0 w-full h-full" viewBox="0 0 210 160">
               {lines.map((l, i) => {
                 const n1 = nodes.find(n => n.id === l[0]);
                 const n2 = nodes.find(n => n.id === l[1]);
                 if(!n1 || !n2) return null;
                 return (
                   <path 
                     key={i} 
                     d={`M ${n1.x} ${n1.y} L ${n2.x} ${n2.y}`} 
                     stroke="#4C6BE8" 
                     strokeWidth="1.5" 
                     className="opacity-20 animate-pulse"
                     style={{ animationDelay: `${i * 0.2}s` }}
                   />
                 )
               })}
             </svg>

             {/* Outlying Nodes */}
             {nodes.map((n) => (
               <div 
                 key={n.id} 
                 className="absolute bg-white border border-brand/30 rounded-full flex items-center justify-center shadow-[0_2px_8px_rgba(76,107,232,0.15)] hover:bg-brand/5 hover:scale-110 transition-transform cursor-pointer"
                 style={{ 
                   left: n.x - n.r, top: n.y - n.r, width: n.r*2, height: n.r*2,
                 }}
               >
                 <span className="text-brand font-mono text-[7px] font-bold anim-orbit-reverse flex items-center justify-center w-full h-full">{n.initial}</span>
               </div>
             ))}

           </div>

           {/* Central Star Node */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-brand rounded-full shadow-[0_0_20px_rgba(76,107,232,0.5)] border-[4px] border-white flex items-center justify-center z-20 group-hover:scale-110 transition-transform duration-500">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-white" strokeLinecap="round" strokeLinejoin="round">
                 <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
           </div>
           
           {/* Connecting central lines */}
           <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 anim-orbit" viewBox="0 0 210 160" style={{ transformOrigin: '105px 80px' }}>
               {[1, 3, 5, 8].map((id, i) => {
                 const n = nodes.find(no => no.id === id);
                 if(!n) return null;
                 return (
                   <path 
                     key={i} 
                     d={`M 105 80 L ${n.x} ${n.y}`} 
                     stroke="#4C6BE8" 
                     strokeWidth="1.5" 
                     strokeDasharray="4 4"
                     className="opacity-40"
                   />
                 )
               })}
           </svg>

        </div>

      </div>

      <div className="mt-auto z-20 pt-4 border-t border-border/50 text-center">
        <h3 className="text-[19px] font-medium text-text-primary mb-2 tracking-tight">The 1% Collective</h3>
        <p className="text-[14px] text-text-secondary leading-relaxed">
          Showcasing the collective power of the 1% Angel Network.
        </p>
      </div>
    </div>
  );
};

export default Card5;