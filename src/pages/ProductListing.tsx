import React from 'react';
import { Filter, ChevronDown, Star, LayoutGrid, List } from 'lucide-react';
import { motion } from 'motion/react';
import { Product, Page } from '../types';
import { PRODUCTS } from '../constants';
import { ProductCard } from '../components/ProductCard';

interface ProductListingProps {
  onProductClick: (p: Product) => void;
  onAddToCart: (p: Product) => void;
  onToggleWishlist: (p: Product) => void;
  wishlist: Product[];
}

export const ProductListing: React.FC<ProductListingProps> = ({ onProductClick, onAddToCart, onToggleWishlist, wishlist }) => {
  const [priceRange, setPriceRange] = React.useState(500);
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [sortBy, setSortBy] = React.useState('Popular');
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');

  const categories = ['All', 'Men', 'Women', 'Electronics', 'Health'];

  const filteredProducts = PRODUCTS.filter(p => 
    (selectedCategory === 'All' || p.category === selectedCategory) &&
    p.price <= priceRange
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar - Desktop */}
        <aside className="hidden md:block w-64 space-y-8">
          <div>
            <h3 className="text-lg font-display font-bold mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-4 py-2 rounded-xl transition-colors ${selectedCategory === cat ? 'bg-primary text-white' : 'hover:bg-secondary'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-display font-bold mb-4">Price Range</h3>
            <input 
              type="range" 
              min="0" 
              max="500" 
              value={priceRange}
              onChange={(e) => setPriceRange(parseInt(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-sm font-medium text-slate-500 mt-2">
              <span>$0</span>
              <span>${priceRange}</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-display font-bold mb-4">Rating</h3>
            <div className="space-y-2">
              {[4, 3, 2].map(rating => (
                <button key={rating} className="flex items-center gap-2 hover:text-primary transition-colors">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className={i < rating ? 'text-yellow-400 fill-current' : 'text-slate-200'} />
                    ))}
                  </div>
                  <span className="text-sm font-medium">& Up</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 space-y-6">
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-secondary/50 p-4 rounded-3xl">
            <div className="flex items-center gap-4">
              <button className="md:hidden flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-black/5 font-bold">
                <Filter size={18} /> Filters
              </button>
              <span className="text-sm font-medium text-slate-500">{filteredProducts.length} Products found</span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 bg-white p-1 rounded-xl border border-black/5">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-slate-400'}`}
                >
                  <LayoutGrid size={18} />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-primary text-white' : 'text-slate-400'}`}
                >
                  <List size={18} />
                </button>
              </div>
              <div className="relative group">
                <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-black/5 font-bold">
                  Sort by: {sortBy} <ChevronDown size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {filteredProducts.map(product => (
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
        </main>
      </div>
    </div>
  );
};
