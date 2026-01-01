
import React from 'react';

interface CategoryItem {
  name: string;
  image: string;
}

const CATEGORIES: CategoryItem[] = [
  { name: 'Beard', image: 'https://images.unsplash.com/photo-1594125350485-3bb334c4426b?auto=format&fit=crop&q=80&w=300' },
  { name: 'Hair', image: 'https://images.unsplash.com/photo-1626285861696-9f0bf5a49c6d?auto=format&fit=crop&q=80&w=300' },
  { name: 'Face', image: 'https://images.unsplash.com/photo-1556228515-919086f74644?auto=format&fit=crop&q=80&w=300' },
  { name: 'Fragrance', image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=300' },
  { name: 'Shave', image: 'https://images.unsplash.com/photo-1619451427882-6aaacf0cc63e?auto=format&fit=crop&q=80&w=300' },
  { name: 'Home', image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=300' },
];

export const CategoryStrip: React.FC<{ onCategoryClick: (cat: string) => void }> = ({ onCategoryClick }) => {
  return (
    <section className="py-24 bg-[#121212] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <h3 className="text-center text-[10px] tracking-[0.5em] uppercase text-[#c5a059] mb-16">Ritual Domains</h3>
        
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-16">
          {CATEGORIES.map((cat, idx) => (
            <button 
              key={cat.name}
              onClick={() => onCategoryClick(cat.name)}
              className="flex flex-col items-center group space-y-6"
            >
              <div className="relative w-24 h-24 md:w-32 md:h-32">
                {/* Gold ring hover effect */}
                <div className="absolute inset-[-4px] rounded-full border border-transparent group-hover:border-[#c5a059]/30 transition-all duration-700 scale-90 group-hover:scale-100 opacity-0 group-hover:opacity-100"></div>
                
                <div className="w-full h-full rounded-full overflow-hidden border border-white/10 shadow-xl transform transition-transform duration-500 group-hover:scale-95">
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
                    loading="lazy"
                  />
                </div>
              </div>
              <span className="text-[9px] tracking-[0.4em] uppercase text-white/40 group-hover:text-white transition-colors duration-300">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
