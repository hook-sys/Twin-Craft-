import React from 'react';
import { Package, User, MapPin, Heart, LogOut, ChevronRight, Settings, CreditCard } from 'lucide-react';
import { motion } from 'motion/react';
import { Page } from '../types';

interface DashboardProps {
  user: any;
  onLogout: () => void;
  onNavigate: (page: Page) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, onLogout, onNavigate }) => {
  const [activeTab, setActiveTab] = React.useState('orders');

  const orders = [
    { id: '#ORD-12345', date: 'Mar 20, 2026', total: 145, status: 'Processing' },
    { id: '#ORD-12344', date: 'Mar 15, 2026', total: 85, status: 'Delivered' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-80 space-y-6">
          <div className="bg-white rounded-[32px] p-8 border border-black/5 shadow-sm text-center space-y-4">
            <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto text-3xl font-bold">
              {user?.name?.[0] || 'U'}
            </div>
            <div>
              <h2 className="text-xl font-display font-bold">{user?.name || 'User Name'}</h2>
              <p className="text-sm text-slate-500">{user?.email || 'user@example.com'}</p>
            </div>
            <button className="w-full py-2.5 bg-secondary hover:bg-slate-200 rounded-xl font-bold text-sm transition-all">Edit Profile</button>
          </div>

          <div className="bg-white rounded-[32px] p-4 border border-black/5 shadow-sm space-y-1">
            <button 
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${activeTab === 'orders' ? 'bg-primary text-white' : 'hover:bg-secondary'}`}
            >
              <div className="flex items-center gap-3">
                <Package size={20} />
                <span className="font-bold">My Orders</span>
              </div>
              <ChevronRight size={18} />
            </button>
            <button 
              onClick={() => setActiveTab('address')}
              className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${activeTab === 'address' ? 'bg-primary text-white' : 'hover:bg-secondary'}`}
            >
              <div className="flex items-center gap-3">
                <MapPin size={20} />
                <span className="font-bold">Address Book</span>
              </div>
              <ChevronRight size={18} />
            </button>
            <button 
              onClick={() => onNavigate('wishlist')}
              className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-secondary transition-all"
            >
              <div className="flex items-center gap-3">
                <Heart size={20} />
                <span className="font-bold">Wishlist</span>
              </div>
              <ChevronRight size={18} />
            </button>
            <button 
              onClick={() => setActiveTab('payment')}
              className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${activeTab === 'payment' ? 'bg-primary text-white' : 'hover:bg-secondary'}`}
            >
              <div className="flex items-center gap-3">
                <CreditCard size={20} />
                <span className="font-bold">Payment Methods</span>
              </div>
              <ChevronRight size={18} />
            </button>
            <button 
              onClick={onLogout}
              className="w-full flex items-center gap-3 p-4 rounded-2xl hover:bg-red-50 text-red-500 transition-all"
            >
              <LogOut size={20} />
              <span className="font-bold">Logout</span>
            </button>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 space-y-8">
          <div className="bg-white rounded-[40px] p-8 sm:p-12 border border-black/5 shadow-sm min-h-[600px]">
            {activeTab === 'orders' && (
              <div className="space-y-8">
                <h2 className="text-2xl font-display font-bold">Recent Orders</h2>
                <div className="space-y-4">
                  {orders.map(order => (
                    <div key={order.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-secondary/50 rounded-3xl gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary"><Package size={24} /></div>
                        <div>
                          <div className="font-bold text-lg">{order.id}</div>
                          <div className="text-sm text-slate-500">{order.date}</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end gap-8">
                        <div>
                          <div className="text-xs font-bold uppercase text-slate-400">Total</div>
                          <div className="font-bold">${order.total}</div>
                        </div>
                        <div className={`px-4 py-1.5 rounded-full text-xs font-bold ${order.status === 'Delivered' ? 'bg-green-100 text-green-600' : 'bg-primary/10 text-primary'}`}>
                          {order.status}
                        </div>
                        <button className="p-2 hover:bg-white rounded-xl transition-all"><ChevronRight size={20} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'address' && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-display font-bold">Address Book</h2>
                  <button className="bg-primary text-white px-4 py-2 rounded-xl font-bold text-sm">Add New</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="p-6 border-2 border-primary bg-primary/5 rounded-3xl space-y-2 relative">
                    <div className="absolute top-6 right-6 text-primary"><MapPin size={20} fill="currentColor" /></div>
                    <div className="font-bold text-lg">Home</div>
                    <p className="text-sm text-slate-600 leading-relaxed">123 Street Name, Apartment 4B<br/>Dhaka, Bangladesh 1212</p>
                    <div className="text-sm font-bold pt-2">+880 1XXX XXXXXX</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
