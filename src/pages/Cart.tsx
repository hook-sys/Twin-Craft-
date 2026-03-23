import React from 'react';
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';
import { CartItem, Page } from '../types';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onNavigate: (page: Page) => void;
}

export const Cart: React.FC<CartProps> = ({ items, onUpdateQuantity, onRemove, onNavigate }) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 10 : 0;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto text-slate-300">
          <ShoppingBag size={48} />
        </div>
        <h2 className="text-3xl font-display font-bold">Your cart is empty</h2>
        <p className="text-slate-500 max-w-md mx-auto">Looks like you haven't added anything to your cart yet. Start shopping to find amazing deals!</p>
        <button 
          onClick={() => onNavigate('listing')}
          className="bg-primary text-white px-8 py-4 rounded-2xl font-bold hover:bg-primary-dark transition-all"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h1 className="text-3xl sm:text-4xl font-display font-bold mb-8">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Items List */}
        <div className="flex-1 space-y-6">
          {items.map(item => (
            <motion.div 
              key={item.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl p-4 sm:p-6 border border-black/5 flex gap-4 sm:gap-6"
            >
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-secondary rounded-2xl overflow-hidden flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between gap-4">
                  <div>
                    <h3 className="font-display font-bold text-lg sm:text-xl">{item.name}</h3>
                    <p className="text-sm text-slate-500">
                      {item.selectedColor && `Color: ${item.selectedColor}`}
                      {item.selectedColor && item.selectedSize && ' | '}
                      {item.selectedSize && `Size: ${item.selectedSize}`}
                    </p>
                  </div>
                  <button 
                    onClick={() => onRemove(item.id)}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all h-fit"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center bg-secondary rounded-xl p-1">
                    <button 
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="p-1.5 hover:bg-white rounded-lg transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center font-bold">{item.quantity}</span>
                    <button 
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="p-1.5 hover:bg-white rounded-lg transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <span className="text-xl font-bold text-slate-900">${item.price * item.quantity}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary */}
        <aside className="w-full lg:w-96 space-y-6">
          <div className="bg-slate-900 text-white rounded-[32px] p-8 space-y-6">
            <h2 className="text-2xl font-display font-bold">Order Summary</h2>
            <div className="space-y-4 text-slate-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white font-bold">${subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-white font-bold">${shipping}</span>
              </div>
              <div className="h-px bg-white/10"></div>
              <div className="flex justify-between text-xl">
                <span className="text-white">Total</span>
                <span className="text-primary font-bold">${total}</span>
              </div>
            </div>
            <button 
              onClick={() => onNavigate('checkout')}
              className="w-full bg-primary hover:bg-primary-dark text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all"
            >
              Checkout Now <ArrowRight size={20} />
            </button>
          </div>
          
          <div className="bg-secondary rounded-3xl p-6 space-y-4">
            <h3 className="font-bold text-slate-800">Promo Code</h3>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Enter code"
                className="flex-1 bg-white border-transparent focus:border-primary focus:ring-0 rounded-xl px-4 py-2 text-sm"
              />
              <button className="bg-slate-800 text-white px-4 py-2 rounded-xl font-bold text-sm">Apply</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
