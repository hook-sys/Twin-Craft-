import React from 'react';
import { Home, Grid, ShoppingCart, User, Heart } from 'lucide-react';
import { Page } from '../types';

interface MobileNavProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
  cartCount: number;
}

export const MobileNav: React.FC<MobileNavProps> = ({ activePage, onNavigate, cartCount }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-black/5 px-6 py-3 z-50 flex items-center justify-between">
      <button 
        onClick={() => onNavigate('home')}
        className={`flex flex-col items-center gap-1 transition-colors ${activePage === 'home' ? 'text-primary' : 'text-slate-400'}`}
      >
        <Home size={22} />
        <span className="text-[10px] font-bold uppercase tracking-wider">Home</span>
      </button>
      <button 
        onClick={() => onNavigate('listing')}
        className={`flex flex-col items-center gap-1 transition-colors ${activePage === 'listing' ? 'text-primary' : 'text-slate-400'}`}
      >
        <Grid size={22} />
        <span className="text-[10px] font-bold uppercase tracking-wider">Shop</span>
      </button>
      <button 
        onClick={() => onNavigate('cart')}
        className={`flex flex-col items-center gap-1 transition-colors relative ${activePage === 'cart' ? 'text-primary' : 'text-slate-400'}`}
      >
        <ShoppingCart size={22} />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            {cartCount}
          </span>
        )}
        <span className="text-[10px] font-bold uppercase tracking-wider">Cart</span>
      </button>
      <button 
        onClick={() => onNavigate('wishlist')}
        className={`flex flex-col items-center gap-1 transition-colors ${activePage === 'wishlist' ? 'text-primary' : 'text-slate-400'}`}
      >
        <Heart size={22} />
        <span className="text-[10px] font-bold uppercase tracking-wider">Wishlist</span>
      </button>
      <button 
        onClick={() => onNavigate('dashboard')}
        className={`flex flex-col items-center gap-1 transition-colors ${activePage === 'dashboard' ? 'text-primary' : 'text-slate-400'}`}
      >
        <User size={22} />
        <span className="text-[10px] font-bold uppercase tracking-wider">Profile</span>
      </button>
    </div>
  );
};
