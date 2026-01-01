
import React, { useEffect, useRef } from 'react';

interface AboutProps {
  teaser?: boolean;
  onReadMore?: () => void;
  scrollPos?: number;
}

export const About: React.FC<AboutProps> = ({ teaser, onReadMore, scrollPos = 0 }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });

    const reveals = sectionRef.current?.querySelectorAll('.reveal');
    reveals?.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Subtle parallax for the main editorial image
  const parallaxValue = Math.max(0, (scrollPos - (sectionRef.current?.offsetTop || 0) + 500) * 0.1);

  return (
    <section ref={sectionRef} className={`py-32 md:py-64 px-6 md:px-12 bg-[#121212] relative overflow-hidden ${!teaser ? 'pt-48' : ''}`}>
      <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[20vw] font-serif font-bold text-white/[0.015] select-none pointer-events-none whitespace-nowrap">
        MANIFESTO
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-7 relative reveal">
          <div className="aspect-[4/5] overflow-hidden group border border-white/5 relative shadow-2xl">
            <div 
              className="absolute inset-0 transition-transform duration-[100ms] ease-out scale-110"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=1200')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transform: `translate3d(0, ${-parallaxValue}px, 0) scale(1.1)`,
                filter: 'sepia(0.2) brightness(0.8)'
              }}
            ></div>
          </div>
        </div>

        <div className="md:col-span-5 md:pl-16 space-y-12 relative z-10">
          <div className="reveal">
            <span className="text-[10px] tracking-[0.5em] uppercase text-[#c5a059] mb-8 block font-medium">Est. 2024</span>
            <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-[1.1] text-[#f5f5f0]">
              The Alchemy <br />
              <span className="italic font-light">of Silence.</span>
            </h2>
          </div>
          
          <div className="reveal stagger-1">
            <p className="text-white/60 font-light leading-relaxed text-base md:text-lg mb-8 italic">
              "A balance between the raw strength of the earth and the refined precision of modern craft."
            </p>
            <p className="text-white/40 font-light leading-loose text-sm md:text-base">
              CIVARO emerges from the conviction that grooming is not a chore, but a transition. We use botanical essences and volcanic minerals to create a sensory experience that grounds you.
            </p>
            {teaser && (
              <button 
                onClick={onReadMore}
                className="mt-10 text-[9px] tracking-[0.5em] uppercase text-[#c5a059] border-b border-[#c5a059]/30 pb-2 hover:text-white hover:border-white transition-all"
              >
                Our Story
              </button>
            )}
          </div>

          {!teaser && (
            <div className="pt-12 grid grid-cols-1 gap-12 border-t border-white/10 reveal stagger-2">
              <div className="space-y-4">
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#c5a059]">The Vision</p>
                <p className="text-sm text-white/40 leading-relaxed font-light">
                  To provide the modern man with a moment of absolute presence. Our products are the tools for that transformation. Hand-finished in Milan, tested by the elements.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
