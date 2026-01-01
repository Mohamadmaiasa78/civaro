
import React from 'react';

interface CategoryItem {
  name: string;
  image: string;
}

const CATEGORIES: CategoryItem[] = [
  { name: 'Face', image: 'https://images.unsplash.com/photo-1556228515-919086f74644?auto=format&fit=crop&q=80&w=300' },
  { name: 'Cleansing', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=300' },
  { name: 'Body', image: 'https://images.unsplash.com/photo-1631730359585-38a4935ccbb2?auto=format&fit=crop&q=80&w=300' },
  { name: 'Multi-use', image: 'https://images.unsplash.com/photo-1603006905393-d2325372338c?auto=format&fit=crop&q=80&w=300' },
  { name: 'Deodorant', image: 'https://images.unsplash.com/photo-1594125350485-3bb334c4426b?auto=format&fit=crop&q=80&w=300' },
  { name: 'Specimen', image: 'https://images.unsplash.com/photo-1503706652255-ff3a58d63748?auto=format&fit=crop&q=80&w=300' },
];

export const CategoryStrip: React.FC<{ onCategoryClick: (cat: string) => void }> = ({ onCategoryClick }) => {
  return (
    <section className="py-24 bg-[#121212] overflow-hidden border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <h3 className="text-center text-[10px] tracking-[0.5em] uppercase text-[#c5a059] mb-20 font-medium">Explore the Selection</h3>
        
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-16 md:gap-x-16">
          {CATEGORIES.map((cat) => (
            <button 
              key={cat.name}
              onClick={() => onCategoryClick(cat.name === 'Specimen' ? 'Lifestyle' : cat.name)}
              className="flex flex-col items-center group space-y-6"
            >
              <div className="relative w-28 h-28 md:w-36 md:h-36 flex items-center justify-center">
                {/* Visual Backdrop Circle (Reference: Blue tint) */}
                <div className="absolute inset-0 rounded-full bg-[#1a2233]/40 group-hover:bg-[#c5a059]/10 transition-colors duration-700"></div>
                
                {/* Gold ring accent */}
                <div className="absolute inset-[-6px] rounded-full border border-white/5 group-hover:border-[#c5a059]/40 transition-all duration-700 scale-95 group-hover:scale-100 opacity-0 group-hover:opacity-100"></div>
                
                <div className="relative w-[85%] h-[85%] rounded-full overflow-hidden shadow-2xl transform transition-all duration-500 group-hover:scale-105">
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
                    loading="lazy"
                  />
                </div>
              </div>
              <span className="text-[10px] tracking-[0.4em] uppercase text-white/30 group-hover:text-[#c5a059] transition-colors duration-300 font-medium">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
