import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileNav } from './components/MobileNav';
import { AdminSidebar } from './components/AdminSidebar';
import { Home } from './pages/Home';
import { ProductListing } from './pages/ProductListing';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Auth } from './pages/Auth';
import { Dashboard } from './pages/Dashboard';
import { Wishlist } from './pages/Wishlist';
import { Search } from './pages/Search';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminProducts } from './pages/AdminProducts';
import { AdminOrders } from './pages/AdminOrders';
import { AdminCustomers } from './pages/AdminCustomers';
import { AdminCategories } from './pages/AdminCategories';
import { AdminReviews } from './pages/AdminReviews';
import { AdminSettings } from './pages/AdminSettings';
import { Page, Product, CartItem } from './types';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [user, setUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, selectedProduct]);

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    setSelectedProduct(null);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('detail');
  };

  const handleAddToCart = (product: Product, quantity: number = 1, size?: string, color?: string) => {
    setCart(prev => {
      const existing = prev.find(item => 
        item.id === product.id && 
        item.selectedSize === size && 
        item.selectedColor === color
      );
      if (existing) {
        return prev.map(item => 
          item === existing ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity, selectedSize: size, selectedColor: color }];
    });
  };

  const handleUpdateCartQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) return prev.filter(p => p.id !== product.id);
      return [...prev, product];
    });
  };

  const isAdminPage = currentPage.startsWith('admin-');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home 
          onNavigate={handleNavigate} 
          onProductClick={handleProductClick}
          onAddToCart={(p) => handleAddToCart(p, 1)}
          onToggleWishlist={handleToggleWishlist}
          wishlist={wishlist}
        />;
      case 'listing':
        return <ProductListing 
          onProductClick={handleProductClick}
          onAddToCart={(p) => handleAddToCart(p, 1)}
          onToggleWishlist={handleToggleWishlist}
          wishlist={wishlist}
        />;
      case 'detail':
        return selectedProduct ? (
          <ProductDetail 
            product={selectedProduct}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            onProductClick={handleProductClick}
            wishlist={wishlist}
          />
        ) : <Home onNavigate={handleNavigate} onProductClick={handleProductClick} onAddToCart={(p) => handleAddToCart(p, 1)} onToggleWishlist={handleToggleWishlist} wishlist={wishlist} />;
      case 'cart':
        return <Cart items={cart} onUpdateQuantity={handleUpdateCartQuantity} onRemove={handleRemoveFromCart} onNavigate={handleNavigate} />;
      case 'checkout':
        return <Checkout items={cart} onNavigate={handleNavigate} onClearCart={() => setCart([])} />;
      case 'auth':
        return <Auth onNavigate={handleNavigate} onLogin={setUser} />;
      case 'dashboard':
        return <Dashboard user={user} onLogout={() => setUser(null)} onNavigate={handleNavigate} />;
      case 'wishlist':
        return <Wishlist items={wishlist} onToggleWishlist={handleToggleWishlist} onAddToCart={(p) => handleAddToCart(p, 1)} onProductClick={handleProductClick} onNavigate={handleNavigate} />;
      case 'search':
        return <Search query={searchQuery} onProductClick={handleProductClick} onAddToCart={(p) => handleAddToCart(p, 1)} onToggleWishlist={handleToggleWishlist} wishlist={wishlist} />;
      
      // Admin Pages
      case 'admin-dashboard':
        return <AdminDashboard onNavigate={handleNavigate} />;
      case 'admin-products':
        return <AdminProducts />;
      case 'admin-orders':
        return <AdminOrders />;
      case 'admin-customers':
        return <AdminCustomers />;
      case 'admin-categories':
        return <AdminCategories />;
      case 'admin-coupons':
        return <div className="p-8"><h1 className="text-3xl font-bold">Coupon Management</h1><p className="mt-4">Coming soon...</p></div>;
      case 'admin-reviews':
        return <AdminReviews />;
      case 'admin-analytics':
        return <div className="p-8"><h1 className="text-3xl font-bold">Advanced Analytics</h1><p className="mt-4">Coming soon...</p></div>;
      case 'admin-settings':
        return <AdminSettings />;
      
      default:
        return <Home onNavigate={handleNavigate} onProductClick={handleProductClick} onAddToCart={(p) => handleAddToCart(p, 1)} onToggleWishlist={handleToggleWishlist} wishlist={wishlist} />;
    }
  };

  if (isAdminPage) {
    return (
      <div className="flex min-h-screen bg-secondary/30">
        <AdminSidebar 
          activePage={currentPage} 
          onNavigate={handleNavigate} 
          onLogout={() => handleNavigate('home')} 
        />
        <main className="flex-1 p-8 sm:p-12 overflow-y-auto max-h-screen no-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header 
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)} 
        wishlistCount={wishlist.length}
        onNavigate={handleNavigate}
        onSearch={setSearchQuery}
      />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage + (selectedProduct?.id || '')}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      
      <MobileNav 
        activePage={currentPage} 
        onNavigate={handleNavigate}
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
      />

      {/* Admin Toggle (Hidden in production, for demo purposes) */}
      <button 
        onClick={() => handleNavigate('admin-dashboard')}
        className="fixed bottom-10 left-10 w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity z-50"
      >
        A
      </button>

      {/* WhatsApp Floating Button */}
      <button className="fixed bottom-24 right-6 sm:bottom-10 sm:right-10 w-14 h-14 bg-green-500 text-white rounded-full shadow-lg shadow-green-500/30 flex items-center justify-center hover:scale-110 transition-transform z-40">
        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </button>
    </div>
  );
}
