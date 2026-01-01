
import React, { useEffect, useRef } from 'react';

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.2 });

    const reveals = sectionRef.current?.querySelectorAll('.reveal');
    reveals?.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-32 md:py-64 px-6 md:px-12 bg-[#121212] relative overflow-hidden">
      {/* Background Decorative Text - Softer Contrast */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[20vw] font-serif font-bold text-white/[0.015] select-none pointer-events-none whitespace-nowrap">
        HERITAGE
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 items-center">
        {/* Editorial Image Block - Less Grayscale, More Depth */}
        <div className="md:col-span-7 relative reveal">
          <div className="aspect-[4/5] overflow-hidden group border border-white/5">
            <div 
              className="absolute inset-0 transition-transform duration-[4000ms] group-hover:scale-105"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=1200')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'sepia(0.2) brightness(0.8)'
              }}
            ></div>
          </div>
          {/* Accent Image with warmer border */}
          <div className="absolute -bottom-16 -right-8 w-48 h-64 hidden lg:block overflow-hidden border-[12px] border-[#1a1a1a] shadow-2xl reveal stagger-2">
            <img 
              src="https://images.unsplash.com/photo-1626285861696-9f0bf5a49c6d?auto=format&fit=crop&q=80&w=400" 
              className="w-full h-full object-cover sepia-[0.3] brightness-75"
              alt="Detail"
            />
          </div>
        </div>

        {/* Narrative Block */}
        <div className="md:col-span-5 md:pl-16 space-y-12 relative z-10">
          <div className="reveal">
            <span className="text-[10px] tracking-[0.5em] uppercase text-[#c5a059] mb-8 block font-medium">Est. 2024</span>
            <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-[1.1] text-[#f5f5f0]">
              Alchemy <br />
              <span className="italic font-light">meets Ritual.</span>
            </h2>
          </div>
          
          <div className="reveal stagger-1">
            <p className="text-white/60 font-light leading-relaxed text-base md:text-lg mb-8 italic">
              "A balance between the raw strength of the earth and the refined precision of modern craft."
            </p>
            <p className="text-white/40 font-light leading-loose text-sm md:text-base">
              CIVARO emerges from the conviction that grooming is not a chore, but a transition. We use botanical essences and volcanic minerals to create a sensory experience that grounds you. Our vessels are weighted glass and brushed metal—objects built to last.
            </p>
          </div>

          <div className="pt-12 grid grid-cols-2 gap-12 border-t border-white/10 reveal stagger-2">
            <div className="space-y-2">
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#c5a059]">Mineral Base</p>
              <p className="text-[11px] text-white/40 leading-relaxed tracking-wider">Tuscan clay and obsidian extracts.</p>
            </div>
            <div className="space-y-2">
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#c5a059]">Refined Craft</p>
              <p className="text-[11px] text-white/40 leading-relaxed tracking-wider">Hand-finished in small batches.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
