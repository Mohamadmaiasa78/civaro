
import React from 'react';
import { CartItem } from '../App';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: number) => void;
  onUpdateQty: (id: number, delta: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onRemove, onUpdateQty }) => {
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/80 backdrop-blur-md z-[60] transition-opacity duration-1000 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      ></div>

      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-[#050505] z-[70] transition-transform duration-[1.2s] cubic-bezier(0.16, 1, 0.3, 1) transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full flex flex-col p-12 md:p-16">
          <div className="flex items-center justify-between mb-20">
            <h2 className="text-xl font-serif tracking-[0.2em] uppercase italic text-white/90">The Selection</h2>
            <button onClick={onClose} className="p-2 hover:opacity-50 transition-opacity">
              <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-16 scrollbar-hide">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center space-y-8 opacity-20">
                <p className="text-[9px] tracking-[0.5em] uppercase text-white italic">Cabinet is Empty</p>
                <div className="w-[1px] h-12 bg-white/20"></div>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-8 group animate-in slide-in-from-right-8 duration-1000">
                  <div className="w-20 h-28 bg-[#0a0a0a] flex-shrink-0 overflow-hidden relative">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale brightness-50 transition-transform duration-1000 group-hover:scale-110" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div className="space-y-1">
                      <h4 className="text-[10px] tracking-[0.3em] uppercase font-light text-white">{item.name}</h4>
                      <p className="text-[9px] text-white/30 tracking-widest">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6 border-b border-white/10 pb-1">
                        <button onClick={() => onUpdateQty(item.id, -1)} className="text-sm text-white/40 hover:text-white">-</button>
                        <span className="text-[10px] w-4 text-center text-white/60">{item.quantity}</span>
                        <button onClick={() => onUpdateQty(item.id, 1)} className="text-sm text-white/40 hover:text-white">+</button>
                      </div>
                      <button onClick={() => onRemove(item.id)} className="text-[8px] tracking-[0.3em] uppercase text-white/20 hover:text-white transition-colors">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="pt-16 space-y-10">
              <div className="flex justify-between items-end border-t border-white/5 pt-10">
                <span className="text-[9px] tracking-[0.5em] uppercase text-white/30">Total Value</span>
                <span className="text-xl font-serif italic text-white">${subtotal.toFixed(2)}</span>
              </div>
              <button className="w-full bg-white text-black py-6 text-[9px] tracking-[0.6em] uppercase font-bold hover:bg-black hover:text-white border border-white transition-all duration-700">
                Finalize Purchase
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
