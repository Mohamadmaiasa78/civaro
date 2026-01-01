
import React from 'react';
import { ViewState } from '../App';

export const Footer: React.FC<{ onNavigate: (v: ViewState) => void }> = ({ onNavigate }) => {
  const year = new Date().getFullYear();

  return (
    <footer className="pt-24 pb-12 px-6 md:px-12 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-12 mb-24">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-3xl font-serif tracking-[0.3em] mb-8 text-white">CIVARO</h2>
            <p className="text-white/40 text-xs tracking-widest leading-loose max-w-xs uppercase">
              Defining the modern standard of masculine elegance through raw ingredients and sophisticated design.
            </p>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-[10px] tracking-[0.4em] uppercase font-semibold text-[#c5a059]">Discovery</h4>
            <ul className="space-y-4">
              <li><button onClick={() => onNavigate('shop')} className="text-xs text-white/40 hover:text-white transition-colors uppercase">Catalog</button></li>
              <li><button onClick={() => onNavigate('about')} className="text-xs text-white/40 hover:text-white transition-colors uppercase">Manifesto</button></li>
              <li><button onClick={() => onNavigate('contact')} className="text-xs text-white/40 hover:text-white transition-colors uppercase">Concierge</button></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] tracking-[0.4em] uppercase font-semibold text-[#c5a059]">Legal</h4>
            <ul className="space-y-4 text-xs text-white/40 uppercase">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Shipping Policy</li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          <div className="text-[9px] tracking-[0.3em] uppercase text-white/20">
            &copy; {year} CIVARO INTERNATIONAL. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </footer>
  );
};
