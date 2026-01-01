
import React, { useState, useEffect, useMemo } from 'react';
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
  { 
    id: 1, 
    name: 'Obsidian Beard Oil', 
    category: 'Beard', 
    price: 42.00, 
    image: 'https://images.unsplash.com/photo-1594125350485-3bb334c4426b?auto=format&fit=crop&q=80&w=1200',
    description: 'A deeply nourishing elixir distilled from volcanic minerals and cold-pressed rare oils.',
    specs: [{ label: 'Weight', value: '30ml' }, { label: 'Origin', value: 'Sicily' }],
    notes: ['Black Pepper', 'Vetiver']
  },
  { 
    id: 2, 
    name: 'Volcanic Clay Pomade', 
    category: 'Hair', 
    price: 38.00, 
    image: 'https://images.unsplash.com/photo-1626285861696-9f0bf5a49c6d?auto=format&fit=crop&q=80&w=1200',
    description: 'High-hold styling clay infused with Etna volcanic ash.',
    specs: [{ label: 'Hold', value: 'Maximum' }, { label: 'Shine', value: 'Zero' }],
    notes: ['Sage', 'Eucalyptus']
  },
  { 
    id: 3, 
    name: 'Midnight Face Scrub', 
    category: 'Face', 
    price: 45.00, 
    image: 'https://images.unsplash.com/photo-1556228515-919086f74644?auto=format&fit=crop&q=80&w=1200',
    description: 'Exfoliating ritual using micro-granulated obsidian.',
    specs: [{ label: 'Frequency', value: '2x Weekly' }],
    notes: ['Bergamot', 'Charcoal']
  },
  { 
    id: 4, 
    name: 'Slate Body Wash', 
    category: 'Body', 
    price: 34.00, 
    image: 'https://images.unsplash.com/photo-1631730359585-38a4935ccbb2?auto=format&fit=crop&q=80&w=1200',
    description: 'Dense, low-lather gel that cleanses without stripping.',
    specs: [{ label: 'PH Balance', value: '5.5' }],
    notes: ['Sea Salt', 'Driftwood']
  },
  { 
    id: 6, 
    name: 'Obsidian Essence', 
    category: 'Fragrance', 
    price: 125.00, 
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=1200',
    description: 'The definitive architectural fragrance of CIVARO.',
    specs: [{ label: 'Concentration', value: 'Extrait' }],
    notes: ['Oud', 'Saffron']
  },
  { 
    id: 7, 
    name: 'Basalt Shave Cream', 
    category: 'Shave', 
    price: 36.00, 
    image: 'https://images.unsplash.com/photo-1619451427882-6aaacf0cc63e?auto=format&fit=crop&q=80&w=1200',
    description: 'A non-foaming cushion for the razor ritual.',
    specs: [{ label: 'Type', value: 'Non-Foaming' }],
    notes: ['Peppermint', 'Iron']
  },
  { 
    id: 9, 
    name: 'Ember Home Scent', 
    category: 'Home', 
    price: 55.00, 
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=1200',
    description: 'Atmospheric presence for large living spaces.',
    specs: [{ label: 'Vessel', value: 'Cobalt Glass' }],
    notes: ['Leather', 'Smoke']
  },
  { 
    id: 12, 
    name: 'Tungsten Shave Tool', 
    category: 'Lifestyle', 
    price: 185.00, 
    image: 'https://images.unsplash.com/photo-1503706652255-ff3a58d63748?auto=format&fit=crop&q=80&w=1200',
    description: 'The definitive instrument for the shave ritual.',
    specs: [{ label: 'Material', value: 'Tungsten' }],
    notes: ['Brushed Metal']
  }
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (view: ViewState, category: string = 'All') => {
    setCurrentView(view);
    setFilterCategory(category);
    setSelectedProductId(null);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const navigateToProduct = (id: number) => {
    setSelectedProductId(id);
    setCurrentView('product-detail');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const currentProduct = useMemo(() => PRODUCTS.find(p => p.id === selectedProductId), [selectedProductId]);

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <>
            <Hero />
            <CategoryStrip onCategoryClick={(cat) => navigateTo('shop', cat)} />
            <About teaser onReadMore={() => navigateTo('about')} />
            <Newsletter />
          </>
        );
      case 'shop':
        return <ProductGrid products={PRODUCTS} initialCategory={filterCategory} onAddToCart={addToCart} onProductClick={navigateToProduct} />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      case 'product-detail':
        return currentProduct ? <ProductDetail product={currentProduct} onAddToCart={addToCart} onBack={() => navigateTo('shop')} /> : null;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-white selection:text-black bg-[#121212]">
      <Navbar 
        scrolled={scrolled} 
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} 
        onCartClick={() => setIsCartOpen(true)}
        onNavigate={navigateTo}
      />
      
      <main className="pt-20 transition-opacity duration-300">
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
