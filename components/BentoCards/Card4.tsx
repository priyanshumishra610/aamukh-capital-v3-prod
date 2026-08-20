import React from 'react';

const Card4: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[360px] glass-panel rounded-card md:rounded-[2rem] p-6 md:p-8 flex flex-col font-geom relative overflow-hidden group">
      
      <div className="flex-1 w-full relative flex flex-col items-center justify-center mb-6 z-10">
        
        {/* Scale SVG Container */}
        <div className="relative w-[220px] h-[160px]">
          
          <svg className="w-full h-full stroke-[#4C6BE8] mt-4 overflow-visible" viewBox="0 0 200 120" fill="none" strokeLinecap="round" strokeLinejoin="round">
            
            {/* Base and Pillar */}
            <path d="M 100 110 L 100 20 M 80 110 L 120 110" strokeWidth="3" className="stroke-slate-200" />
            <circle cx="100" cy="20" r="4" fill="#4C6BE8" stroke="none" />
            <circle cx="100" cy="110" r="4" fill="#64748b" stroke="none" />

            {/* Scale Assembly with balanced hover rotation */}
            <g className="transition-transform duration-700 ease-out group-hover:-rotate-2" style={{ transformOrigin: '100px 20px' }}>
               {/* Crossbar */}
               <path d="M 40 20 L 160 20" strokeWidth="2.5" />
               
               {/* Left Pan Strings */}
               <g className="transition-transform duration-700 ease-out group-hover:rotate-2" style={{ transformOrigin: '40px 20px' }}>
                 <path d="M 40 20 L 15 70 M 40 20 L 65 70" strokeWidth="1.5" className="stroke-slate-300" />
                 <path d="M 10 70 L 70 70 L 60 85 L 20 85 Z" fill="#f8fafc" strokeWidth="1.5" className="stroke-slate-300" />
               </g>

               {/* Right Pan Strings */}
               <g className="transition-transform duration-700 ease-out group-hover:rotate-2" style={{ transformOrigin: '160px 20px' }}>
                 <path d="M 160 20 L 135 70 M 160 20 L 185 70" strokeWidth="1.5" className="stroke-slate-300" />
                 <path d="M 130 70 L 190 70 L 180 85 L 140 85 Z" fill="#E8ECFB" strokeWidth="1.5" />
               </g>
            </g>
          </svg>

          {/* Floating Labels */}
          <div className="absolute top-[80px] left-[15px] -translate-x-1/2">
             <div className="bg-white border border-border rounded-lg shadow-sm px-2 py-1 flex items-center gap-1 transition-transform group-hover:translate-y-1">
               <span className="font-geom text-[11px] font-medium text-text-primary whitespace-nowrap">Investors</span>
             </div>
          </div>
          <div className="absolute top-[80px] right-[-15px] -translate-x-1/2">
             <div className="bg-brand text-white border border-brand/50 rounded-lg shadow-[0_4px_10px_rgba(76,107,232,0.3)] px-2 py-1 flex items-center gap-1 transition-transform group-hover:-translate-y-1">
               <span className="font-geom text-[11px] font-medium whitespace-nowrap">Aamukh</span>
             </div>
          </div>

          {/* UI Boxes */}
          <div className="absolute top-[-10px] left-[-20px]">
             <div className="bg-white px-3 py-1.5 rounded-full border border-border shadow-md flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center">
                   <svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3" className="w-2.5 h-2.5" strokeLinecap="round" strokeLinejoin="round">
                     <path d="M20 6L9 17l-5-5"/>
                   </svg>
                </div>
                <span className="font-sans text-xs font-semibold text-text-primary">20% GP</span>
             </div>
          </div>

          <div className="absolute top-[5px] right-[-20px]">
             <div className="bg-white px-3 py-1.5 rounded-full border border-border shadow-md flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center">
                   <svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3" className="w-2.5 h-2.5" strokeLinecap="round" strokeLinejoin="round">
                     <path d="M20 6L9 17l-5-5"/>
                   </svg>
                </div>
                <span className="font-sans text-xs font-semibold text-text-primary">10% GP</span>
             </div>
          </div>

        </div>

      </div>

      <div className="mt-auto z-10 pt-4 border-t border-border/50 text-center">
        <h3 className="text-[19px] font-medium text-text-primary mb-2 tracking-tight">Aligned Interests</h3>
        <p className="text-[14px] text-text-secondary leading-relaxed max-w-[95%] mx-auto">
          We invest alongside our partners with GP capital in the same deals.
        </p>
      </div>
    </div>
  );
};

export default Card4;
