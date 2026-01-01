
import React, { useState, useEffect, useRef } from 'react';
import { Product } from '../App';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (p: Product) => void;
  onProductClick: (id: number) => void;
}

const CATEGORIES = ['All', 'Beard', 'Hair', 'Face', 'Fragrance', 'Shave', 'Home', 'Lifestyle'];

export const ProductGrid: React.FC<ProductGridProps> = ({ products, onAddToCart, onProductClick }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });

    const reveals = sectionRef.current?.querySelectorAll('.reveal');
    reveals?.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [activeCategory]);

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <section id="shop" ref={sectionRef} className="py-32 bg-[#121212] min-h-screen relative">
      {/* Light Blur Accent */}
      <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-white/[0.02] blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-32 space-y-12">
          <div className="reveal">
            <span className="text-[10px] tracking-[0.5em] uppercase text-[#c5a059] mb-6 block font-medium">The Collection</span>
            <h2 className="text-5xl md:text-7xl font-serif font-light tracking-tight text-[#f5f5f0] italic">Curated Refinement</h2>
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 reveal stagger-1">
            {CATEGORIES.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[9px] tracking-[0.4em] uppercase transition-all duration-500 relative py-2 ${
                  activeCategory === cat ? 'text-[#f5f5f0]' : 'text-white/30 hover:text-white/60'
                }`}
              >
                {cat}
                {activeCategory === cat && <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#c5a059] transition-all"></div>}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-32 gap-x-12">
          {filteredProducts.map((product, index) => {
            const isWide = index % 3 === 0;
            const gridClass = isWide ? 'md:col-span-8' : 'md:col-span-4';
            const heightClass = isWide ? 'aspect-[16/9]' : 'aspect-[3/4]';
            const alignClass = index % 2 === 0 ? 'md:mt-24' : '';

            return (
              <div key={`${product.id}-${activeCategory}`} className={`${gridClass} ${alignClass} group reveal stagger-${(index % 3) + 1}`}>
                <div 
                  onClick={() => onProductClick(product.id)}
                  className={`relative ${heightClass} overflow-hidden bg-[#1a1a1a] mb-8 cursor-pointer border border-white/5 shadow-2xl`}
                >
                  <div 
                    className="absolute inset-0 transition-all duration-[2000ms] ease-out group-hover:scale-105"
                    style={{
                      backgroundImage: `url('${product.image}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      filter: 'sepia(0.1) brightness(0.9)'
                    }}
                  ></div>
                  
                  {/* Subtle Label Overlay */}
                  <div className="absolute top-8 left-8">
                     <span className="text-[8px] tracking-[0.3em] uppercase bg-black/60 backdrop-blur-md px-3 py-1.5 text-white/60 border border-white/10">
                       ITEM NO. {String(product.id).padStart(2, '0')}
                     </span>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 backdrop-blur-[4px] bg-black/20">
                    <div className="px-12 py-5 bg-[#f5f5f0] text-[#121212] text-[9px] tracking-[0.6em] uppercase font-bold border border-[#f5f5f0] hover:bg-transparent hover:text-[#f5f5f0] transition-all">
                      Details
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-start">
                  <div className="space-y-1 cursor-pointer" onClick={() => onProductClick(product.id)}>
                    <h3 className="text-lg md:text-xl font-serif text-[#f5f5f0]/90 font-light italic group-hover:text-[#c5a059] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-[9px] tracking-[0.3em] uppercase text-white/30 font-medium">
                      {product.category}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <p className="text-sm font-light text-[#c5a059]">${product.price.toFixed(2)}</p>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(product);
                      }}
                      className="text-[8px] tracking-[0.2em] uppercase text-white/30 hover:text-white transition-colors"
                    >
                      Quick Add +
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
