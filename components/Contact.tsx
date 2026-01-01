
import React from 'react';

export const Contact: React.FC = () => {
  return (
    <div className="bg-[#121212] min-h-screen py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-24 reveal active">
          <span className="text-[10px] tracking-[0.5em] uppercase text-[#c5a059] block mb-8">Brand Concierge</span>
          <h1 className="text-5xl md:text-7xl font-serif italic text-[#f5f5f0] mb-8 font-light">Inquiries</h1>
          <p className="text-white/40 font-light tracking-widest text-sm uppercase">Our specialists are available for consultation.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-start">
          <div className="space-y-12 reveal active stagger-1">
            <div className="space-y-4">
              <h4 className="text-[10px] tracking-[0.4em] uppercase text-[#c5a059]">Headquarters</h4>
              <p className="text-white/60 font-light text-sm leading-relaxed">
                Via dell'Artigianato, 12<br />
                20121 Milano, Italy
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] tracking-[0.4em] uppercase text-[#c5a059]">Digital Connect</h4>
              <p className="text-white/60 font-light text-sm">concierge@civaro.com</p>
              <p className="text-white/60 font-light text-sm">+39 02 837 4652</p>
            </div>
            <div className="pt-12 border-t border-white/5">
              <h4 className="text-[10px] tracking-[0.4em] uppercase text-white/20 mb-6 italic">Response time typically within 24 hours.</h4>
            </div>
          </div>

          <form className="space-y-12 reveal active stagger-2">
            <div className="space-y-8">
              <div className="relative group">
                <input type="text" placeholder="NAME" className="w-full bg-transparent border-b border-white/10 py-4 text-[10px] tracking-[0.3em] focus:outline-none focus:border-[#c5a059] transition-colors placeholder:text-white/20" />
              </div>
              <div className="relative group">
                <input type="email" placeholder="EMAIL" className="w-full bg-transparent border-b border-white/10 py-4 text-[10px] tracking-[0.3em] focus:outline-none focus:border-[#c5a059] transition-colors placeholder:text-white/20" />
              </div>
              <div className="relative group">
                <textarea rows={4} placeholder="YOUR MESSAGE" className="w-full bg-transparent border-b border-white/10 py-4 text-[10px] tracking-[0.3em] focus:outline-none focus:border-[#c5a059] transition-colors placeholder:text-white/20 resize-none"></textarea>
              </div>
            </div>
            <button className="w-full bg-white text-black py-6 text-[10px] tracking-[0.6em] uppercase font-bold hover:bg-[#c5a059] transition-all duration-500">
              Transmit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
