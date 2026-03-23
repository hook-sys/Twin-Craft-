import React from 'react';
import { Mail, Lock, Phone, ArrowRight, Github, Chrome } from 'lucide-react';
import { motion } from 'motion/react';
import { Page } from '../types';

interface AuthProps {
  onNavigate: (page: Page) => void;
  onLogin: (user: any) => void;
}

export const Auth: React.FC<AuthProps> = ({ onNavigate, onLogin }) => {
  const [mode, setMode] = React.useState<'login' | 'signup'>('login');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ name: 'John Doe', email: 'john@example.com' });
    onNavigate('home');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 sm:py-20">
      <div className="bg-white rounded-[40px] p-8 sm:p-12 border border-black/5 shadow-xl shadow-black/5 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-display font-bold">
            {mode === 'login' ? 'Welcome Back!' : 'Create Account'}
          </h1>
          <p className="text-slate-500">
            {mode === 'login' ? 'Login to access your account' : 'Join us for the best shopping experience'}
          </p>
        </div>

        <div className="flex p-1 bg-secondary rounded-2xl">
          <button 
            onClick={() => setMode('login')}
            className={`flex-1 py-3 rounded-xl font-bold transition-all ${mode === 'login' ? 'bg-white shadow-sm text-primary' : 'text-slate-500'}`}
          >
            Login
          </button>
          <button 
            onClick={() => setMode('signup')}
            className={`flex-1 py-3 rounded-xl font-bold transition-all ${mode === 'signup' ? 'bg-white shadow-sm text-primary' : 'text-slate-500'}`}
          >
            Signup
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Full Name</label>
              <div className="relative">
                <input required type="text" className="w-full bg-secondary border-transparent focus:border-primary focus:ring-0 rounded-xl pl-10 pr-4 py-3" placeholder="John Doe" />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              </div>
            </div>
          )}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Email Address</label>
            <div className="relative">
              <input required type="email" className="w-full bg-secondary border-transparent focus:border-primary focus:ring-0 rounded-xl pl-10 pr-4 py-3" placeholder="john@example.com" />
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Password</label>
            <div className="relative">
              <input required type="password" className="w-full bg-secondary border-transparent focus:border-primary focus:ring-0 rounded-xl pl-10 pr-4 py-3" placeholder="••••••••" />
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            </div>
          </div>
          {mode === 'login' && (
            <div className="text-right">
              <button type="button" className="text-sm font-bold text-primary hover:underline">Forgot Password?</button>
            </div>
          )}
          <button 
            type="submit"
            className="w-full bg-primary hover:bg-primary-dark text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20"
          >
            {mode === 'login' ? 'Login Now' : 'Create Account'} <ArrowRight size={20} />
          </button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
          <div className="relative flex justify-center text-xs uppercase font-bold text-slate-400"><span className="bg-white px-4">Or continue with</span></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 py-3 border border-slate-100 rounded-xl hover:bg-secondary transition-all font-bold text-sm">
            <Chrome size={18} /> Google
          </button>
          <button className="flex items-center justify-center gap-2 py-3 border border-slate-100 rounded-xl hover:bg-secondary transition-all font-bold text-sm">
            <Github size={18} /> Github
          </button>
        </div>
      </div>
    </div>
  );
};
