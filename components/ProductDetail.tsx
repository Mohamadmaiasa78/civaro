
import React, { useEffect, useRef } from 'react';
import { Product } from '../App';

interface ProductDetailProps {
  product: Product;
  onAddToCart: (p: Product) => void;
  onBack: () => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product, onAddToCart, onBack }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });

    const reveals = scrollRef.current?.querySelectorAll('.reveal');
    reveals?.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [product]);

  return (
    <div ref={scrollRef} className="bg-[#121212] min-h-screen pt-40 pb-32 relative">
      {/* Light leak accent */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-[#c5a059]/[0.03] blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Breadcrumb / Back */}
        <button 
          onClick={onBack}
          className="group flex items-center space-x-4 mb-20 text-[10px] tracking-[0.4em] uppercase text-[#c5a059] hover:text-[#f5f5f0] transition-colors reveal"
        >
          <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Selection</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          {/* Main Visual */}
          <div className="lg:col-span-7 reveal">
            <div className="aspect-[4/5] overflow-hidden bg-[#1a1a1a] border border-white/5 shadow-2xl">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover sepia-[0.1] brightness-90 hover:brightness-100 transition-all duration-[2000ms]"
              />
            </div>
            
            {/* Notes */}
            {product.notes && (
              <div className="mt-12 flex flex-wrap gap-x-16 gap-y-8 reveal stagger-1">
                <div className="space-y-4">
                  <h4 className="text-[10px] tracking-[0.4em] uppercase text-[#c5a059]">Scent Profile</h4>
                  <div className="flex flex-wrap gap-x-8 gap-y-4">
                    {product.notes.map(note => (
                      <span key={note} className="text-base font-serif italic text-white/70">{note}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="lg:col-span-5 space-y-16">
            <div className="reveal stagger-1">
              <span className="text-[10px] tracking-[0.4em] uppercase text-[#c5a059] block mb-6">{product.category}</span>
              <h1 className="text-5xl md:text-7xl font-serif font-light text-[#f5f5f0] mb-8 italic">{product.name}</h1>
              <p className="text-2xl font-serif text-[#c5a059]">${product.price.toFixed(2)}</p>
            </div>

            <div className="reveal stagger-2">
              <p className="text-white/50 font-light leading-loose text-base md:text-lg mb-12">
                {product.description}
              </p>
              
              <button 
                onClick={() => onAddToCart(product)}
                className="w-full bg-[#f5f5f0] text-[#121212] py-6 text-[10px] tracking-[0.6em] uppercase font-bold hover:bg-transparent hover:text-[#f5f5f0] border border-[#f5f5f0] transition-all duration-700"
              >
                Acquire Specimen
              </button>
            </div>

            {/* Technical Specifications */}
            {product.specs && (
              <div className="space-y-12 reveal stagger-3 pt-12 border-t border-white/10">
                <h4 className="text-[10px] tracking-[0.5em] uppercase text-[#c5a059]">Attributes</h4>
                <div className="space-y-6">
                  {product.specs.map(spec => (
                    <div key={spec.label} className="flex justify-between items-baseline border-b border-white/5 pb-4">
                      <span className="text-[9px] tracking-[0.3em] uppercase text-white/30">{spec.label}</span>
                      <span className="text-sm font-light text-white/60">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Ritual Instruction */}
            <div className="bg-white/[0.03] p-8 md:p-12 reveal stagger-3 border border-white/10 backdrop-blur-sm">
              <h4 className="text-[10px] tracking-[0.5em] uppercase text-[#c5a059] mb-8">Manual</h4>
              <p className="text-[13px] text-white/50 leading-relaxed font-light italic">
                Massage gently into skin under low light. Allow the botanical oils to absorb for 60 seconds. A ritual for the quiet hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
