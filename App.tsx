
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetail } from './components/ProductDetail';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CategoryStrip } from './components/CategoryStrip';
import { Contact } from './components/Contact';

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description?: string;
  specs?: { label: string; value: string }[];
  notes?: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export type ViewState = 'home' | 'shop' | 'about' | 'contact' | 'product-detail';

const PRODUCTS: Product[] = [
  { id: 1, name: 'Obsidian Beard Oil', category: 'Beard', price: 42.00, image: 'https://images.unsplash.com/photo-1594125350485-3bb334c4426b?auto=format&fit=crop&q=80&w=1200', description: 'Deeply nourishing elixir from volcanic minerals.', specs: [{ label: 'Weight', value: '30ml' }], notes: ['Black Pepper', 'Vetiver'] },
  { id: 2, name: 'Volcanic Clay Pomade', category: 'Hair', price: 38.00, image: 'https://images.unsplash.com/photo-1626285861696-9f0bf5a49c6d?auto=format&fit=crop&q=80&w=1200', description: 'High-hold styling clay with Etna ash.', specs: [{ label: 'Hold', value: 'Max' }], notes: ['Sage', 'Eucalyptus'] },
  { id: 3, name: 'Midnight Face Scrub', category: 'Face', price: 45.00, image: 'https://images.unsplash.com/photo-1556228515-919086f74644?auto=format&fit=crop&q=80&w=1200', description: 'Obsidian micro-granules for skin resurfacing.', specs: [{ label: 'Frequency', value: '2x Weekly' }], notes: ['Bergamot', 'Charcoal'] },
  { id: 4, name: 'Slate Body Wash', category: 'Body', price: 34.00, image: 'https://images.unsplash.com/photo-1631730359585-38a4935ccbb2?auto=format&fit=crop&q=80&w=1200', description: 'Mineral-rich cleanser for the modern man.', specs: [{ label: 'PH', value: '5.5' }], notes: ['Sea Salt', 'Driftwood'] },
  { id: 5, name: 'Obsidian Essence', category: 'Fragrance', price: 125.00, image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=1200', description: 'Definitive scent of CIVARO.', specs: [{ label: 'Conc', value: 'Extrait' }], notes: ['Oud', 'Saffron'] },
  { id: 6, name: 'Basalt Shave Cream', category: 'Shave', price: 36.00, image: 'https://images.unsplash.com/photo-1619451427882-6aaacf0cc63e?auto=format&fit=crop&q=80&w=1200', description: 'Non-foaming cushion for precision.', specs: [{ label: 'Type', value: 'Low Lather' }], notes: ['Peppermint', 'Iron'] },
  { id: 7, name: 'Ember Home Scent', category: 'Home', price: 55.00, image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=1200', description: 'Atmospheric library and smoke aroma.', specs: [{ label: 'Longevity', value: '3 Months' }], notes: ['Leather', 'Smoke'] },
  { id: 8, name: 'Tungsten Shave Tool', category: 'Lifestyle', price: 185.00, image: 'https://images.unsplash.com/photo-1503706652255-ff3a58d63748?auto=format&fit=crop&q=80&w=1200', description: 'High-density tungsten shave instrument.', specs: [{ label: 'Weight', value: '240g' }], notes: ['Brushed Metal'] },
  { id: 9, name: 'Carbon Cleansing Gel', category: 'Face', price: 32.00, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=1200', description: 'Daily face cleansing with activated carbon.', specs: [{ label: 'Use', value: 'Daily' }], notes: ['Citrus', 'Ash'] },
  { id: 10, name: 'Mica Eye Serum', category: 'Face', price: 58.00, image: 'https://images.unsplash.com/photo-1570191065620-d296b97a012e?auto=format&fit=crop&q=80&w=1200', description: 'Brightening eye care for the sleepless.', specs: [{ label: 'Cooling', value: 'Roller' }], notes: ['Tea', 'Zinc'] },
  { id: 11, name: 'Lunar Recovery Balm', category: 'Body', price: 62.00, image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=1200', description: 'Overnight muscle and skin restoration.', specs: [{ label: 'Type', value: 'Heavy' }], notes: ['Lavender', 'Mint'] },
  { id: 12, name: 'Santal Beard Balm', category: 'Beard', price: 39.00, image: 'https://images.unsplash.com/photo-1536514498073-50e69d39c6cf?auto=format&fit=crop&q=80&w=1200', description: 'Taming balm with deep sandalwood notes.', specs: [{ label: 'Hold', value: 'Medium' }], notes: ['Sandalwood', 'Clove'] },
  { id: 13, name: 'Ironwood Deodorant', category: 'Deodorant', price: 28.00, image: 'https://images.unsplash.com/photo-1594125350485-3bb334c4426b?auto=format&fit=crop&q=80&w=1200', description: 'Aluminum-free mineral protection.', specs: [{ label: 'Last', value: '24h' }], notes: ['Oakmoss', 'Iron'] },
  { id: 14, name: 'Magnesium Multi-Bar', category: 'Multi-usage', price: 22.00, image: 'https://images.unsplash.com/photo-1603006905393-d2325372338c?auto=format&fit=crop&q=80&w=1200', description: 'Hair, face, and body solid cleansing bar.', specs: [{ label: 'Eco', value: 'Plastic Free' }], notes: ['Eucalyptus', 'Clarity'] },
  { id: 15, name: 'Aegean Sea Salt Spray', category: 'Hair', price: 30.00, image: 'https://images.unsplash.com/photo-1585751353481-0110300bb54e?auto=format&fit=crop&q=80&w=1200', description: 'Texture and volume inspired by the Mediterranean.', specs: [{ label: 'Finish', value: 'Textured' }], notes: ['Ocean', 'Lime'] },
  { id: 16, name: 'Brushed Steel Stand', category: 'Lifestyle', price: 75.00, image: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&q=80&w=1200', description: 'Solid steel display stand for the Tungsten tool.', specs: [{ label: 'Material', value: '316L Steel' }], notes: ['Brushed Finish'] }
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setScrollPos(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = useCallback((view: ViewState, category: string = 'All') => {
    setCurrentView(view);
    setFilterCategory(category);
    setSelectedProductId(null);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const navigateToProduct = useCallback((id: number) => {
    setSelectedProductId(id);
    setCurrentView('product-detail');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const addToCart = useCallback((product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  }, []);

  const currentProduct = useMemo(() => PRODUCTS.find(p => p.id === selectedProductId), [selectedProductId]);

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <>
            <Hero scrollPos={scrollPos} />
            <CategoryStrip onCategoryClick={(cat) => navigateTo('shop', cat)} />
            <About teaser onReadMore={() => navigateTo('about')} scrollPos={scrollPos} />
            <Newsletter />
          </>
        );
      case 'shop':
        return <ProductGrid products={PRODUCTS} initialCategory={filterCategory} onAddToCart={addToCart} onProductClick={navigateToProduct} />;
      case 'about':
        return <About scrollPos={scrollPos} />;
      case 'contact':
        return <Contact />;
      case 'product-detail':
        return currentProduct ? <ProductDetail product={currentProduct} onAddToCart={addToCart} onBack={() => navigateTo('shop')} /> : null;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-[#c5a059] selection:text-white bg-[#121212] overflow-x-hidden">
      <Navbar 
        scrolled={scrolled} 
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} 
        onCartClick={() => setIsCartOpen(true)}
        onNavigate={navigateTo}
      />
      
      <main className="transition-opacity duration-300">
        {renderContent()}
      </main>

      <Footer onNavigate={navigateTo} />
      
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart}
        onRemove={(id) => setCart(prev => prev.filter(i => i.id !== id))}
        onUpdateQty={(id, delta) => setCart(prev => prev.map(i => i.id === id ? {...i, quantity: Math.max(1, i.quantity + delta)} : i))}
      />
    </div>
  );
};

export default App;
