import React from 'react';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Product, Page } from '../types';
import { ProductCard } from '../components/ProductCard';

interface WishlistProps {
  items: Product[];
  onToggleWishlist: (p: Product) => void;
  onAddToCart: (p: Product) => void;
  onProductClick: (p: Product) => void;
  onNavigate: (page: Page) => void;
}

export const Wishlist: React.FC<WishlistProps> = ({ items, onToggleWishlist, onAddToCart, onProductClick, onNavigate }) => {
  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto text-slate-300">
          <Heart size={48} />
        </div>
        <h2 className="text-3xl font-display font-bold">Your wishlist is empty</h2>
        <p className="text-slate-500 max-w-md mx-auto">Save items you love to your wishlist and they'll show up here. Start exploring our collection!</p>
        <button 
          onClick={() => onNavigate('listing')}
          className="bg-primary text-white px-8 py-4 rounded-2xl font-bold hover:bg-primary-dark transition-all"
        >
          Explore Products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h1 className="text-3xl sm:text-4xl font-display font-bold mb-8">My Wishlist</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
        {items.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={onAddToCart}
            onToggleWishlist={onToggleWishlist}
            onClick={onProductClick}
            isWishlisted={true}
          />
        ))}
      </div>
    </div>
  );
};
