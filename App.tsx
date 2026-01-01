
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetail } from './components/ProductDetail';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';

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

const PRODUCTS: Product[] = [
  { 
    id: 1, 
    name: 'Obsidian Beard Oil', 
    category: 'Beard', 
    price: 42.00, 
    image: 'https://images.unsplash.com/photo-1594125350485-3bb334c4426b?auto=format&fit=crop&q=80&w=1200',
    description: 'A deeply nourishing elixir distilled from volcanic minerals and cold-pressed rare oils. Designed to provide a matte finish while softening the coarsest of textures.',
    specs: [
      { label: 'Weight', value: '30ml / 1.0 fl.oz' },
      { label: 'Origin', value: 'Sicily, Italy' },
      { label: 'Finish', value: 'Natural Matte' }
    ],
    notes: ['Black Pepper', 'Vetiver', 'Burnt Cedar']
  },
  { 
    id: 2, 
    name: 'Volcanic Clay Pomade', 
    category: 'Hair', 
    price: 38.00, 
    image: 'https://images.unsplash.com/photo-1626285861696-9f0bf5a49c6d?auto=format&fit=crop&q=80&w=1200',
    description: 'High-hold styling clay infused with Etna volcanic ash. Provides industrial strength with a weightless feel, allowing for sculptural precision.',
    specs: [
      { label: 'Hold', value: 'Maximum' },
      { label: 'Shine', value: 'Zero' },
      { label: 'Washability', value: 'Water Soluble' }
    ],
    notes: ['Sage', 'Eucalyptus', 'Cold Stone']
  },
  { 
    id: 3, 
    name: 'Midnight Face Scrub', 
    category: 'Face', 
    price: 45.00, 
    image: 'https://images.unsplash.com/photo-1556228515-919086f74644?auto=format&fit=crop&q=80&w=1200',
    description: 'An exfoliating ritual that uses micro-granulated obsidian to resurface the skin. Restores clarity and prepares the canvas for refinement.',
    specs: [
      { label: 'Frequency', value: '2x Weekly' },
      { label: 'Skin Type', value: 'All Types' },
      { label: 'Key Asset', value: 'Black Silica' }
    ],
    notes: ['Bergamot', 'Charcoal', 'Rain']
  },
  { 
    id: 4, 
    name: 'Slate Body Wash', 
    category: 'Body', 
    price: 34.00, 
    image: 'https://images.unsplash.com/photo-1631730359585-38a4935ccbb2?auto=format&fit=crop&q=80&w=1200',
    description: 'A dense, low-lather gel that cleanses without stripping. Scented with the mineral aroma of coastal cliffs after a storm.',
    specs: [
      { label: 'Base', value: 'Aloe Leaf Juice' },
      { label: 'PH Balance', value: '5.5' },
      { label: 'Volume', value: '250ml' }
    ],
    notes: ['Sea Salt', 'Amalfi Lemon', 'Driftwood']
  },
  { 
    id: 5, 
    name: 'Charcoal Face Mask', 
    category: 'Face', 
    price: 48.00, 
    image: 'https://images.unsplash.com/photo-1614859324967-bdf271ec446a?auto=format&fit=crop&q=80&w=1200',
    description: 'The ultimate detoxifying ritual. Draws out impurities from the deepest pores using activated binchotan charcoal.',
    specs: [
      { label: 'Duration', value: '15 Minutes' },
      { label: 'Texture', value: 'Smooth Cream' },
      { label: 'Effect', value: 'Pore Refinement' }
    ],
    notes: ['Mint', 'Earth', 'Iron']
  },
  { 
    id: 6, 
    name: 'Obsidian Essence', 
    category: 'Fragrance', 
    price: 125.00, 
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=1200',
    description: 'The definitive scent of CIVARO. A complex architectural fragrance that transitions from sharp citrus to deep, resinous shadows.',
    specs: [
      { label: 'Concentration', value: 'Extrait de Parfum' },
      { label: 'Longevity', value: '12+ Hours' },
      { label: 'Character', value: 'Enigmatic' }
    ],
    notes: ['Oud', 'Saffron', 'Cold Air', 'Tobacco']
  },
  { 
    id: 7, 
    name: 'Basalt Shave Cream', 
    category: 'Shave', 
    price: 36.00, 
    image: 'https://images.unsplash.com/photo-1619451427882-6aaacf0cc63e?auto=format&fit=crop&q=80&w=1200',
    description: 'A non-foaming cushion for the razor. Distilled from magnesium and basalt extracts to eliminate friction and inflammation.',
    specs: [
      { label: 'Type', value: 'Non-Foaming' },
      { label: 'Protection', value: 'Ultra-High' },
      { label: 'Volume', value: '150ml' }
    ],
    notes: ['Peppermint', 'Iron', 'Steam']
  },
  { 
    id: 8, 
    name: 'Lunar Night Cream', 
    category: 'Face', 
    price: 64.00, 
    image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=1200',
    description: 'A heavy, restorative balm that works in sync with the body’s nocturnal repair cycle. Infused with night-blooming jasmine and blue tansy.',
    specs: [
      { label: 'Target', value: 'Cellular Repair' },
      { label: 'Texture', value: 'Velvet Wax' },
      { label: 'Application', value: 'Post-Ritual' }
    ],
    notes: ['Jasmine', 'Camphor', 'Damp Earth']
  },
  { 
    id: 9, 
    name: 'Ember Home Scent', 
    category: 'Home', 
    price: 55.00, 
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=1200',
    description: 'An atmospheric presence. A heavy glass diffuser that releases the scent of ancient libraries and smoldering wood.',
    specs: [
      { label: 'Longevity', value: '3 Months' },
      { label: 'Vessel', value: 'Black Cobalt Glass' },
      { label: 'Reach', value: 'Large Spaces' }
    ],
    notes: ['Old Paper', 'Leather', 'Smoke', 'Amber']
  },
  { 
    id: 10, 
    name: 'Silver Spruce Shampoo', 
    category: 'Hair', 
    price: 32.00, 
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=1200',
    description: 'A clarifying wash for the scalp. Uses silver ions and spruce needle oil to stimulate blood flow and remove environmental toxins.',
    specs: [
      { label: 'Benefit', value: 'Scalp Detox' },
      { label: 'Finish', value: 'High Shine' },
      { label: 'Active', value: 'Silver Ions' }
    ],
    notes: ['Pine', 'Frost', 'Ozone']
  },
  { 
    id: 11, 
    name: 'Mica Eye Refiner', 
    category: 'Face', 
    price: 52.00, 
    image: 'https://images.unsplash.com/photo-1570191065620-d296b97a012e?auto=format&fit=crop&q=80&w=1200',
    description: 'A cooling serum for tired eyes. Mica particles reflect light to hide fatigue while caffeine tightens the dermis.',
    specs: [
      { label: 'Effect', value: 'Instant Brightening' },
      { label: 'Cooling', value: 'Stainless Roller' },
      { label: 'Volume', value: '15ml' }
    ],
    notes: ['Green Tea', 'Cucumber', 'Steel']
  },
  { 
    id: 12, 
    name: 'Tungsten Shave Tool', 
    category: 'Lifestyle', 
    price: 185.00, 
    image: 'https://images.unsplash.com/photo-1503706652255-ff3a58d63748?auto=format&fit=crop&q=80&w=1200',
    description: 'The definitive instrument of the shave ritual. Forged from high-density tungsten with a balance point designed for effortless control.',
    specs: [
      { label: 'Material', value: 'Tungsten Alloy' },
      { label: 'Weight', value: '240g' },
      { label: 'Warranty', value: 'Lifetime' }
    ],
    notes: ['Brushed Metal', 'Industrial Design']
  }
];

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const navigateToProduct = (id: number) => {
    setSelectedProductId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goHome = () => {
    setSelectedProductId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentProduct = selectedProductId ? PRODUCTS.find(p => p.id === selectedProductId) : null;

  return (
    <div className="min-h-screen font-sans selection:bg-white selection:text-black bg-[#0a0a0a]">
      <Navbar 
        scrolled={scrolled} 
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} 
        onCartClick={() => setIsCartOpen(true)}
        onLogoClick={goHome}
      />
      <main className="transition-opacity duration-700">
        {currentProduct ? (
          <ProductDetail 
            product={currentProduct} 
            onAddToCart={addToCart} 
            onBack={goHome} 
          />
        ) : (
          <>
            <Hero />
            <About />
            <ProductGrid 
              products={PRODUCTS} 
              onAddToCart={addToCart} 
              onProductClick={navigateToProduct} 
            />
          </>
        )}
        <Newsletter />
      </main>
      <Footer />
      
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart}
        onRemove={removeFromCart}
        onUpdateQty={updateQuantity}
      />
    </div>
  );
};

export default App;
