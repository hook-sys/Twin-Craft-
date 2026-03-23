import React from 'react';
import { ShoppingCart, Heart, Star, ShieldCheck, Truck, RotateCcw, Minus, Plus, Share2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Product, Page } from '../types';
import { PRODUCTS } from '../constants';
import { ProductCard } from '../components/ProductCard';

interface ProductDetailProps {
  product: Product;
  onAddToCart: (p: Product, qty: number, size?: string, color?: string) => void;
  onToggleWishlist: (p: Product) => void;
  onProductClick: (p: Product) => void;
  wishlist: Product[];
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product, onAddToCart, onToggleWishlist, onProductClick, wishlist }) => {
  const [quantity, setQuantity] = React.useState(1);
  const [selectedSize, setSelectedSize] = React.useState(product.sizes?.[0]);
  const [selectedColor, setSelectedColor] = React.useState(product.colors?.[0]);
  const [activeImage, setActiveImage] = React.useState(product.image);

  const isWishlisted = wishlist.some(w => w.id === product.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 sm:space-y-20">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Image Gallery */}
        <div className="flex-1 space-y-4">
          <div className="aspect-square rounded-[40px] overflow-hidden bg-secondary relative group">
            <img 
              src={activeImage} 
              alt={product.name} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            {product.discount && (
              <div className="absolute top-6 left-6 bg-primary text-white font-bold px-4 py-2 rounded-2xl">
                -{product.discount}% OFF
              </div>
            )}
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
            {[product.image, 'https://picsum.photos/seed/alt1/600/600', 'https://picsum.photos/seed/alt2/600/600'].map((img, i) => (
              <button 
                key={i}
                onClick={() => setActiveImage(img)}
                className={`w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden border-2 transition-all ${activeImage === img ? 'border-primary' : 'border-transparent opacity-60'}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-primary uppercase tracking-widest">{product.category}</span>
              <button className="p-2 hover:bg-secondary rounded-xl transition-colors"><Share2 size={20} /></button>
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-bold leading-tight">{product.name}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-slate-200'} />
                ))}
              </div>
              <span className="text-sm font-medium text-slate-500">{product.rating} ({product.reviews} Reviews)</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold text-slate-900">${product.price}</span>
              {product.oldPrice && (
                <span className="text-xl text-slate-400 line-through">${product.oldPrice}</span>
              )}
            </div>
            <p className="text-slate-600 leading-relaxed">{product.description}</p>
          </div>

          <div className="space-y-6">
            {/* Options */}
            {product.colors && (
              <div className="space-y-3">
                <h3 className="font-bold text-slate-800">Color: <span className="text-slate-500 font-medium">{selectedColor}</span></h3>
                <div className="flex gap-3">
                  {product.colors.map(color => (
                    <button 
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${selectedColor === color ? 'border-primary scale-110' : 'border-transparent'}`}
                      style={{ backgroundColor: color.toLowerCase() }}
                    />
                  ))}
                </div>
              </div>
            )}

            {product.sizes && (
              <div className="space-y-3">
                <h3 className="font-bold text-slate-800">Size: <span className="text-slate-500 font-medium">{selectedSize}</span></h3>
                <div className="flex gap-3">
                  {product.sizes.map(size => (
                    <button 
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-xl border-2 font-bold transition-all ${selectedSize === size ? 'border-primary bg-primary/5 text-primary' : 'border-slate-100 text-slate-600 hover:border-slate-300'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center bg-secondary rounded-2xl p-1">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-white rounded-xl transition-colors"
                >
                  <Minus size={20} />
                </button>
                <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-white rounded-xl transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>
              <button 
                onClick={() => onAddToCart(product, quantity, selectedSize, selectedColor)}
                className="flex-1 bg-slate-900 hover:bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all"
              >
                <ShoppingCart size={22} /> Add to Cart
              </button>
              <button 
                onClick={() => onToggleWishlist(product)}
                className={`p-4 rounded-2xl border-2 transition-all ${isWishlisted ? 'border-primary bg-primary/5 text-primary' : 'border-slate-100 text-slate-400 hover:border-slate-300'}`}
              >
                <Heart size={24} fill={isWishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>
            
            <button className="w-full bg-primary hover:bg-primary-dark text-white py-4 rounded-2xl font-bold transition-all">
              Buy It Now
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center"><Truck size={20} /></div>
              <div className="text-xs font-bold uppercase tracking-wider">Free Delivery</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center"><RotateCcw size={20} /></div>
              <div className="text-xs font-bold uppercase tracking-wider">30 Days Return</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center"><ShieldCheck size={20} /></div>
              <div className="text-xs font-bold uppercase tracking-wider">Secure Payment</div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section className="space-y-8">
        <h2 className="text-2xl sm:text-3xl font-display font-bold">Related Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
          {PRODUCTS.slice(0, 4).map(p => (
            <ProductCard 
              key={p.id} 
              product={p} 
              onAddToCart={(prod) => onAddToCart(prod, 1)}
              onToggleWishlist={onToggleWishlist}
              onClick={onProductClick}
              isWishlisted={wishlist.some(w => w.id === p.id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
