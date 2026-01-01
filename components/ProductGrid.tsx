
import React, { useState, useEffect, useRef } from 'react';
import { Product } from '../App';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (p: Product) => void;
  onProductClick: (id: number) => void;
  initialCategory?: string;
}

const CATEGORIES = ['All', 'Beard', 'Hair', 'Face', 'Fragrance', 'Shave', 'Home', 'Lifestyle'];

export const ProductGrid: React.FC<ProductGridProps> = ({ products, onAddToCart, onProductClick, initialCategory = 'All' }) => {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveCategory(initialCategory);
  }, [initialCategory]);

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
    <section id="shop" ref={sectionRef} className="py-24 bg-[#121212] min-h-screen relative pt-40">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col items-center text-center mb-24 space-y-12">
          <div className="reveal active">
            <span className="text-[10px] tracking-[0.5em] uppercase text-[#c5a059] mb-6 block font-medium">Specimen Catalog</span>
            <h2 className="text-5xl md:text-7xl font-serif font-light text-[#f5f5f0] italic">The Collection</h2>
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 reveal active stagger-1">
            {CATEGORIES.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[9px] tracking-[0.4em] uppercase transition-all duration-300 relative py-2 ${
                  activeCategory === cat ? 'text-[#f5f5f0]' : 'text-white/30 hover:text-white/60'
                }`}
              >
                {cat}
                {activeCategory === cat && <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#c5a059]"></div>}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-24 gap-x-12">
          {filteredProducts.map((product, index) => {
            const isWide = index % 3 === 0;
            const gridClass = isWide ? 'md:col-span-8' : 'md:col-span-4';
            const heightClass = isWide ? 'aspect-[16/9]' : 'aspect-[3/4]';

            return (
              <div key={product.id} className={`${gridClass} group reveal active stagger-${(index % 3) + 1}`}>
                <div 
                  onClick={() => onProductClick(product.id)}
                  className={`relative ${heightClass} overflow-hidden bg-[#1a1a1a] mb-8 cursor-pointer border border-white/5 shadow-2xl transition-transform duration-500 hover:-translate-y-2`}
                >
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-[1.5s] group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-all duration-700"></div>
                  
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="px-10 py-4 bg-[#f5f5f0] text-[#121212] text-[9px] tracking-[0.6em] uppercase font-bold">Details</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-start">
                  <div className="space-y-1 cursor-pointer" onClick={() => onProductClick(product.id)}>
                    <h3 className="text-lg font-serif text-[#f5f5f0]/90 font-light italic group-hover:text-[#c5a059] transition-colors">{product.name}</h3>
                    <p className="text-[9px] tracking-[0.3em] uppercase text-white/30">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-light text-[#c5a059] mb-2">${product.price.toFixed(2)}</p>
                    <button onClick={() => onAddToCart(product)} className="text-[8px] tracking-[0.2em] uppercase text-white/20 hover:text-white">Add +</button>
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
