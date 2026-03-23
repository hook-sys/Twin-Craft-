import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-display font-bold text-xl">E</div>
              <span className="font-display font-bold text-2xl tracking-tight">EcoShop</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Your one-stop destination for premium products. We deliver quality, style, and convenience right to your doorstep.
            </p>
            <div className="flex gap-4">
              <button className="w-10 h-10 bg-white/5 hover:bg-primary rounded-xl flex items-center justify-center transition-all"><Facebook size={20} /></button>
              <button className="w-10 h-10 bg-white/5 hover:bg-primary rounded-xl flex items-center justify-center transition-all"><Twitter size={20} /></button>
              <button className="w-10 h-10 bg-white/5 hover:bg-primary rounded-xl flex items-center justify-center transition-all"><Instagram size={20} /></button>
              <button className="w-10 h-10 bg-white/5 hover:bg-primary rounded-xl flex items-center justify-center transition-all"><Youtube size={20} /></button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-display font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4 text-slate-400">
              <li><button className="hover:text-primary transition-colors">About Us</button></li>
              <li><button className="hover:text-primary transition-colors">Shop Collection</button></li>
              <li><button className="hover:text-primary transition-colors">Flash Sales</button></li>
              <li><button className="hover:text-primary transition-colors">Contact Us</button></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-display font-bold mb-6">Policies</h3>
            <ul className="space-y-4 text-slate-400">
              <li><button className="hover:text-primary transition-colors">Privacy Policy</button></li>
              <li><button className="hover:text-primary transition-colors">Terms of Service</button></li>
              <li><button className="hover:text-primary transition-colors">Shipping Policy</button></li>
              <li><button className="hover:text-primary transition-colors">Return & Refund</button></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-display font-bold mb-6">Contact Info</h3>
            <ul className="space-y-4 text-slate-400">
              <li className="flex items-center gap-3"><Mail size={18} className="text-primary" /> support@ecoshop.com</li>
              <li className="flex items-center gap-3"><Phone size={18} className="text-primary" /> +880 1XXX XXXXXX</li>
              <li className="flex items-center gap-3"><MapPin size={18} className="text-primary" /> Dhaka, Bangladesh</li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 text-center text-slate-500 text-sm">
          <p>© 2026 EcoShop. All rights reserved. Designed with ❤️ for modern shopping.</p>
        </div>
      </div>
    </footer>
  );
};
