
import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="relative h-[110vh] w-full flex items-center justify-center overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-black z-10 opacity-20"></div>
      <div 
        className="absolute inset-0 scale-110"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=2400')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.4) contrast(1.2) grayscale(0.5)'
        }}
      ></div>

      {/* Floating Elements */}
      <div className="absolute top-1/2 left-12 -translate-y-1/2 hidden lg:block z-20">
        <span className="text-[9px] tracking-[0.8em] uppercase vertical-text opacity-30 select-none" style={{ writingMode: 'vertical-rl' }}>
          EDITION NO. 11 — REFINEMENT
        </span>
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-5xl">
        <div className="mb-8 overflow-hidden">
          <span className="block text-[10px] tracking-[0.6em] uppercase opacity-60 animate-[fadeIn_2s_ease-out]">
            Collection of the Infinite
          </span>
        </div>
        
        <h1 className="text-6xl md:text-[10rem] font-serif font-light mb-16 tracking-tighter leading-[0.85] text-white">
          The Art of <br />
          <span className="italic relative inline-block">
            Rituals
            <div className="absolute -right-12 top-1/2 w-24 h-[1px] bg-white/20 hidden md:block"></div>
          </span>
        </h1>
        
        <div className="flex flex-col items-center gap-12">
          <a 
            href="#shop"
            className="group relative px-16 py-6 border border-white/10 overflow-hidden transition-all duration-700 hover:border-white/40"
          >
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out"></div>
            <span className="relative z-10 text-[9px] tracking-[0.5em] uppercase text-white group-hover:text-black transition-colors duration-500">
              Explore the Vault
            </span>
          </a>
          
          <p className="text-[11px] tracking-[0.2em] uppercase opacity-40 max-w-xs leading-loose font-light">
            Crafted for the few who understand that beauty is in the details of the dark.
          </p>
        </div>
      </div>

      {/* Scroll Hint */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20">
        <div className="flex flex-col items-center gap-4">
          <div className="w-[1px] h-16 bg-gradient-to-b from-white/20 to-transparent"></div>
        </div>
      </div>
    </section>
  );
};
