import React from 'react';
import { Search, ShoppingCart, Heart, User, Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Page } from '../types';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onNavigate: (page: Page) => void;
  onSearch: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ cartCount, wishlistCount, onNavigate, onSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    onNavigate('search');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Logo */}
          <div 
            className="flex-shrink-0 flex items-center gap-2 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-xl flex items-center justify-center text-white font-display font-bold text-xl">E</div>
            <span className="font-display font-bold text-xl sm:text-2xl tracking-tight hidden sm:block">EcoShop</span>
          </div>

          {/* Search Bar - Desktop */}
          <form 
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-md relative group"
          >
            <input 
              type="text" 
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-secondary rounded-2xl border-transparent focus:border-primary focus:ring-0 transition-all text-sm"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
          </form>

          {/* Icons */}
          <div className="flex items-center gap-1 sm:gap-3">
            <button 
              onClick={() => onNavigate('wishlist')}
              className="p-2 text-slate-600 hover:text-primary hover:bg-primary/5 rounded-xl transition-all relative"
            >
              <Heart size={22} />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>
            <button 
              onClick={() => onNavigate('cart')}
              className="p-2 text-slate-600 hover:text-primary hover:bg-primary/5 rounded-xl transition-all relative"
            >
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button 
              onClick={() => onNavigate('auth')}
              className="p-2 text-slate-600 hover:text-primary hover:bg-primary/5 rounded-xl transition-all"
            >
              <User size={22} />
            </button>
            <button 
              className="md:hidden p-2 text-slate-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Menu - Desktop */}
      <nav className="hidden md:block border-t border-black/5 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center gap-8 h-12 text-sm font-medium text-slate-600">
            <li className="group relative">
              <button className="flex items-center gap-1 hover:text-primary transition-colors py-3">
                Categories <ChevronDown size={14} />
              </button>
              <div className="absolute top-full left-0 w-48 bg-white border border-black/5 shadow-xl rounded-b-2xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <button onClick={() => onNavigate('listing')} className="w-full text-left px-4 py-2 hover:bg-secondary hover:text-primary transition-colors">Men</button>
                <button onClick={() => onNavigate('listing')} className="w-full text-left px-4 py-2 hover:bg-secondary hover:text-primary transition-colors">Women</button>
                <button onClick={() => onNavigate('listing')} className="w-full text-left px-4 py-2 hover:bg-secondary hover:text-primary transition-colors">Electronics</button>
                <button onClick={() => onNavigate('listing')} className="w-full text-left px-4 py-2 hover:bg-secondary hover:text-primary transition-colors">Health</button>
              </div>
            </li>
            <li><button onClick={() => onNavigate('listing')} className="hover:text-primary transition-colors">New Arrivals</button></li>
            <li><button onClick={() => onNavigate('listing')} className="hover:text-primary transition-colors">Best Sellers</button></li>
            <li><button onClick={() => onNavigate('listing')} className="hover:text-primary transition-colors">Flash Sale</button></li>
          </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-black/5 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              <form onSubmit={handleSearch} className="relative">
                <input 
                  type="text" 
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-secondary rounded-2xl border-transparent focus:border-primary focus:ring-0 transition-all text-sm"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              </form>
              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => { onNavigate('listing'); setIsMenuOpen(false); }} className="p-4 bg-secondary rounded-2xl text-center font-medium">Men</button>
                <button onClick={() => { onNavigate('listing'); setIsMenuOpen(false); }} className="p-4 bg-secondary rounded-2xl text-center font-medium">Women</button>
                <button onClick={() => { onNavigate('listing'); setIsMenuOpen(false); }} className="p-4 bg-secondary rounded-2xl text-center font-medium">Electronics</button>
                <button onClick={() => { onNavigate('listing'); setIsMenuOpen(false); }} className="p-4 bg-secondary rounded-2xl text-center font-medium">Health</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
