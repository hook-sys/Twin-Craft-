import React from 'react';
import { ShoppingCart, Heart, Star, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
  onToggleWishlist: (p: Product) => void;
  onClick: (p: Product) => void;
  isWishlisted?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart, 
  onToggleWishlist, 
  onClick,
  isWishlisted 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="group bg-white rounded-2xl border border-black/5 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className="relative aspect-square overflow-hidden bg-secondary cursor-pointer" onClick={() => onClick(product)}>
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        {product.discount && (
          <div className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded-lg">
            -{product.discount}%
          </div>
        )}
        <button 
          onClick={(e) => { e.stopPropagation(); onToggleWishlist(product); }}
          className={`absolute top-3 right-3 p-2 rounded-full shadow-sm transition-colors ${isWishlisted ? 'bg-primary text-white' : 'bg-white text-slate-400 hover:text-primary'}`}
        >
          <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>
        
        {product.stock <= 5 && (
          <div className="absolute bottom-3 left-3 bg-red-500/90 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
            Only {product.stock} left
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-center gap-1 mb-1">
          <Star size={14} className="text-yellow-400 fill-current" />
          <span className="text-xs font-medium text-slate-500">{product.rating} ({product.reviews})</span>
        </div>
        <h3 
          className="font-display font-semibold text-slate-800 mb-1 line-clamp-1 cursor-pointer hover:text-primary transition-colors"
          onClick={() => onClick(product)}
        >
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg font-bold text-slate-900">${product.price}</span>
          {product.oldPrice && (
            <span className="text-sm text-slate-400 line-through">${product.oldPrice}</span>
          )}
        </div>
        
        <button 
          onClick={() => onAddToCart(product)}
          className="w-full py-2.5 bg-slate-900 hover:bg-primary text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors group/btn"
        >
          <ShoppingCart size={18} />
          <span>Add to Cart</span>
        </button>
      </div>
    </motion.div>
  );
};
