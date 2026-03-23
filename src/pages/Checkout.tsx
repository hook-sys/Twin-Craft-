import React from 'react';
import { CreditCard, Truck, ShieldCheck, CheckCircle2, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem, Page } from '../types';

interface CheckoutProps {
  items: CartItem[];
  onNavigate: (page: Page) => void;
  onClearCart: () => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ items, onNavigate, onClearCart }) => {
  const [step, setStep] = React.useState<'form' | 'success'>('form');
  const [paymentMethod, setPaymentMethod] = React.useState<'cod' | 'card'>('cod');

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 10;
  const total = subtotal + shipping;

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
    onClearCart();
  };

  if (step === 'success') {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-8">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto"
        >
          <CheckCircle2 size={48} />
        </motion.div>
        <div className="space-y-4">
          <h2 className="text-4xl font-display font-bold">Order Confirmed!</h2>
          <p className="text-slate-500 max-w-md mx-auto">Thank you for your purchase. Your order #12345 has been placed and will be delivered within 3-5 business days.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => onNavigate('dashboard')}
            className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all"
          >
            Track Order
          </button>
          <button 
            onClick={() => onNavigate('home')}
            className="bg-secondary text-slate-900 px-8 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <button 
        onClick={() => onNavigate('cart')}
        className="flex items-center gap-2 text-slate-500 font-bold mb-8 hover:text-primary transition-colors"
      >
        <ArrowLeft size={20} /> Back to Cart
      </button>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Checkout Form */}
        <form onSubmit={handleConfirm} className="flex-1 space-y-8">
          <section className="space-y-6">
            <h2 className="text-2xl font-display font-bold flex items-center gap-3">
              <div className="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center text-sm">1</div>
              Shipping Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Full Name</label>
                <input required type="text" className="w-full bg-secondary border-transparent focus:border-primary focus:ring-0 rounded-xl px-4 py-3" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Phone Number</label>
                <input required type="tel" className="w-full bg-secondary border-transparent focus:border-primary focus:ring-0 rounded-xl px-4 py-3" placeholder="+880 1XXX XXXXXX" />
              </div>
              <div className="sm:col-span-2 space-y-2">
                <label className="text-sm font-bold text-slate-700">Address</label>
                <input required type="text" className="w-full bg-secondary border-transparent focus:border-primary focus:ring-0 rounded-xl px-4 py-3" placeholder="Street address, apartment, suite, etc." />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">District / Area</label>
                <input required type="text" className="w-full bg-secondary border-transparent focus:border-primary focus:ring-0 rounded-xl px-4 py-3" placeholder="Dhaka" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Postal Code</label>
                <input required type="text" className="w-full bg-secondary border-transparent focus:border-primary focus:ring-0 rounded-xl px-4 py-3" placeholder="1212" />
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-display font-bold flex items-center gap-3">
              <div className="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center text-sm">2</div>
              Payment Method
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button 
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-6 rounded-3xl border-2 text-left space-y-2 transition-all ${paymentMethod === 'cod' ? 'border-primary bg-primary/5' : 'border-slate-100 hover:border-slate-200'}`}
              >
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600"><Truck size={24} /></div>
                <div className="font-bold">Cash on Delivery</div>
                <div className="text-xs text-slate-500">Pay when you receive the package</div>
              </button>
              <button 
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-6 rounded-3xl border-2 text-left space-y-2 transition-all ${paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-slate-100 hover:border-slate-200'}`}
              >
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600"><CreditCard size={24} /></div>
                <div className="font-bold">Online Payment</div>
                <div className="text-xs text-slate-500">Secure payment via SSLCommerz</div>
              </button>
            </div>
          </section>

          <button 
            type="submit"
            className="w-full bg-primary hover:bg-primary-dark text-white py-5 rounded-2xl font-bold text-lg shadow-lg shadow-primary/20 transition-all"
          >
            Confirm Order (${total})
          </button>
        </form>

        {/* Order Summary */}
        <aside className="w-full lg:w-96">
          <div className="bg-secondary rounded-[32px] p-8 space-y-6 sticky top-32">
            <h2 className="text-2xl font-display font-bold">Order Summary</h2>
            <div className="space-y-4 max-h-60 overflow-y-auto pr-2 no-scrollbar">
              {items.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-16 bg-white rounded-xl overflow-hidden flex-shrink-0">
                    <img src={item.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-sm line-clamp-1">{item.name}</div>
                    <div className="text-xs text-slate-500">Qty: {item.quantity}</div>
                    <div className="font-bold text-primary">${item.price * item.quantity}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="h-px bg-slate-200"></div>
            <div className="space-y-3 text-sm font-medium">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span className="text-slate-900">${subtotal}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Shipping</span>
                <span className="text-slate-900">${shipping}</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2">
                <span>Total</span>
                <span className="text-primary">${total}</span>
              </div>
            </div>
            <div className="bg-white/50 p-4 rounded-2xl flex items-center gap-3 text-xs text-slate-500">
              <ShieldCheck size={20} className="text-green-500" />
              Your payment information is encrypted and secure.
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
