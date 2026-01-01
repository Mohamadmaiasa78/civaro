
import React from 'react';
import { ViewState } from '../App';

interface NavbarProps {
  scrolled: boolean;
  cartCount: number;
  onCartClick: () => void;
  onNavigate: (view: ViewState) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ scrolled, cartCount, onCartClick, onNavigate }) => {
  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
      scrolled ? 'py-4' : 'py-10'
    }`}>
      <div className={`max-w-[1400px] mx-auto px-8 md:px-16 flex items-center justify-between transition-all duration-700 ${
        scrolled ? 'bg-[#1a1a1a]/90 backdrop-blur-2xl border border-white/5 py-4 px-12 rounded-full mt-4 max-w-[90%] shadow-2xl' : 'bg-transparent'
      }`}>
        <div className="hidden md:flex space-x-12">
          <button onClick={() => onNavigate('shop')} className="text-[9px] tracking-[0.4em] uppercase text-white/40 hover:text-[#c5a059] transition-colors">Shop</button>
          <button onClick={() => onNavigate('about')} className="text-[9px] tracking-[0.4em] uppercase text-white/40 hover:text-[#c5a059] transition-colors">About</button>
          <button onClick={() => onNavigate('contact')} className="text-[9px] tracking-[0.4em] uppercase text-white/40 hover:text-[#c5a059] transition-colors">Contact</button>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2">
          <button onClick={() => onNavigate('home')} className="text-xl md:text-2xl font-serif tracking-[0.5em] font-light text-[#f5f5f0] focus:outline-none">CIVARO</button>
        </div>

        <div className="flex items-center space-x-10">
          <button onClick={onCartClick} className="flex items-center group relative">
            <div className="relative">
              <svg className="w-5 h-5 text-white/60 group-hover:text-[#c5a059] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#c5a059] text-[#121212] text-[7px] w-3 h-3 flex items-center justify-center rounded-full font-bold">
                  {cartCount}
                </span>
              )}
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};
