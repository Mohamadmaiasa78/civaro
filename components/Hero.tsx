
import React from 'react';

interface HeroProps {
  scrollPos?: number;
}

export const Hero: React.FC<HeroProps> = ({ scrollPos = 0 }) => {
  const parallaxOffset = scrollPos * 0.4;

  return (
    <section className="relative h-[110vh] w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-black z-10 opacity-30"></div>
      <div 
        className="absolute inset-0 scale-125 transition-transform duration-100 ease-out"
        style={{
          backgroundImage: `url('/hero.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translate3d(0, ${parallaxOffset}px, 0) scale(1.2)`,
          filter: 'brightness(0.5) contrast(1.1) grayscale(0.2)'
        }}
      ></div>

      <div className="absolute top-1/2 left-12 -translate-y-1/2 hidden lg:block z-20">
        <span className="text-[9px] tracking-[0.8em] uppercase vertical-text opacity-30 select-none" style={{ writingMode: 'vertical-rl' }}>
          EDITION NO. 11 — REFINEMENT
        </span>
      </div>

      <div className="relative z-20 text-center px-6 max-w-5xl">
        <div className="mb-8 overflow-hidden">
          <span className="block text-[10px] tracking-[0.6em] uppercase opacity-60">
            Collection of the Infinite
          </span>
        </div>
        
        <h1 className="text-6xl md:text-[9rem] font-serif font-light mb-16 tracking-tighter leading-[0.85] text-white">
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
            <div className="absolute inset-0 bg-[#f5f5f0] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
            <span className="relative z-10 text-[9px] tracking-[0.5em] uppercase text-white group-hover:text-black transition-colors duration-300">
              Explore the Vault
            </span>
          </a>
          
          <p className="text-[11px] tracking-[0.2em] uppercase opacity-40 max-w-xs leading-loose font-light">
            Crafted for the few who understand that beauty is in the details of the dark.
          </p>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20">
        <div className="flex flex-col items-center gap-4">
          <div className="w-[1px] h-16 bg-gradient-to-b from-white/20 to-transparent"></div>
        </div>
      </div>
    </section>
  );
};
