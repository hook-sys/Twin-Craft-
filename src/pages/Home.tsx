import React from 'react';
import { ArrowRight, Clock, Star, Quote } from 'lucide-react';
import { motion } from 'motion/react';
import { Product, Page } from '../types';
import { PRODUCTS, CATEGORIES, TESTIMONIALS } from '../constants';
import { ProductCard } from '../components/ProductCard';

interface HomeProps {
  onNavigate: (page: Page) => void;
  onProductClick: (p: Product) => void;
  onAddToCart: (p: Product) => void;
  onToggleWishlist: (p: Product) => void;
  wishlist: Product[];
}

export const Home: React.FC<HomeProps> = ({ onNavigate, onProductClick, onAddToCart, onToggleWishlist, wishlist }) => {
  const flashSaleProducts = PRODUCTS.filter(p => p.isFlashSale);
  const featuredProducts = PRODUCTS.slice(0, 4);

  return (
    <div className="space-y-12 sm:space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[400px] sm:h-[600px] overflow-hidden rounded-3xl mx-4 sm:mx-0">
        <img 
          src="https://picsum.photos/seed/ecommerce/1920/1080" 
          alt="Hero"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center px-8 sm:px-20">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-xl text-white space-y-4 sm:space-y-6"
          >
            <span className="inline-block bg-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">New Season</span>
            <h1 className="text-4xl sm:text-7xl font-display font-bold leading-tight">Upgrade Your Lifestyle Today</h1>
            <p className="text-lg text-white/80 max-w-md">Discover the latest trends in electronics, fashion, and more with exclusive offers.</p>
            <button 
              onClick={() => onNavigate('listing')}
              className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-primary hover:text-white transition-all group"
            >
              Shop Now
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-display font-bold">Shop by Category</h2>
          <button onClick={() => onNavigate('listing')} className="text-primary font-bold flex items-center gap-1 hover:underline">
            View All <ArrowRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.map((cat) => (
            <motion.div 
              key={cat.name}
              whileHover={{ scale: 1.02 }}
              onClick={() => onNavigate('listing')}
              className="relative aspect-square rounded-3xl overflow-hidden cursor-pointer group"
            >
              <img 
                src={cat.image} 
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <h3 className="text-white text-xl sm:text-2xl font-display font-bold">{cat.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Flash Sale Section */}
      <section className="bg-slate-900 py-12 sm:py-20 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <h2 className="text-3xl sm:text-4xl font-display font-bold">Flash Sale</h2>
              <p className="text-slate-400">Limited time offers. Grab them before they're gone!</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center bg-white/10 px-4 py-2 rounded-2xl min-w-[70px]">
                <span className="text-2xl font-bold">08</span>
                <span className="text-[10px] uppercase font-bold text-slate-400">Hours</span>
              </div>
              <span className="text-2xl font-bold text-primary">:</span>
              <div className="flex flex-col items-center bg-white/10 px-4 py-2 rounded-2xl min-w-[70px]">
                <span className="text-2xl font-bold">45</span>
                <span className="text-[10px] uppercase font-bold text-slate-400">Mins</span>
              </div>
              <span className="text-2xl font-bold text-primary">:</span>
              <div className="flex flex-col items-center bg-white/10 px-4 py-2 rounded-2xl min-w-[70px]">
                <span className="text-2xl font-bold">12</span>
                <span className="text-[10px] uppercase font-bold text-slate-400">Secs</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {flashSaleProducts.map(product => (
              <div key={product.id} className="bg-white rounded-3xl p-4 flex gap-4 text-slate-900 group cursor-pointer" onClick={() => onProductClick(product)}>
                <div className="w-32 h-32 flex-shrink-0 rounded-2xl overflow-hidden bg-secondary">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h3 className="font-display font-bold text-lg leading-tight mb-1">{product.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-primary">${product.price}</span>
                      <span className="text-sm text-slate-400 line-through">${product.oldPrice}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: '70%' }}></div>
                    </div>
                    <div className="flex justify-between text-[10px] font-bold uppercase text-slate-500">
                      <span>Sold: 42</span>
                      <span>Stock: {product.stock}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-display font-bold">Featured Products</h2>
          <button onClick={() => onNavigate('listing')} className="text-primary font-bold flex items-center gap-1 hover:underline">
            View All <ArrowRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
          {featuredProducts.map(product => (
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
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-secondary rounded-[40px] p-8 sm:p-20 text-center space-y-12">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-display font-bold">What Our Customers Say</h2>
            <p className="text-slate-500">We take pride in delivering the best shopping experience.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-3xl shadow-sm space-y-4 text-left relative"
              >
                <Quote className="absolute top-6 right-8 text-primary/10" size={40} />
                <div className="flex gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-600 italic">"{t.comment}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-400">
                    {t.name[0]}
                  </div>
                  <span className="font-bold text-slate-800">{t.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
