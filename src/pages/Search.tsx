import React from 'react';
import { Search as SearchIcon, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Product, Page } from '../types';
import { PRODUCTS } from '../constants';
import { ProductCard } from '../components/ProductCard';

interface SearchProps {
  query: string;
  onProductClick: (p: Product) => void;
  onAddToCart: (p: Product) => void;
  onToggleWishlist: (p: Product) => void;
  wishlist: Product[];
}

export const Search: React.FC<SearchProps> = ({ query, onProductClick, onAddToCart, onToggleWishlist, wishlist }) => {
  const results = PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) || 
    p.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-display font-bold">Search Results</h1>
        <p className="text-slate-500">Showing {results.length} results for "<span className="text-primary font-bold">{query}</span>"</p>
      </div>

      {results.length === 0 ? (
        <div className="py-20 text-center space-y-6">
          <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto text-slate-300">
            <SearchIcon size={48} />
          </div>
          <h2 className="text-2xl font-display font-bold">No results found</h2>
          <p className="text-slate-500">Try checking your spelling or use more general keywords.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
          {results.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              onClick={onProductClick}
              isWishlisted={wishlist.some(w => w.id === product.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
