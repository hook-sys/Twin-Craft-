import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Layers, 
  Settings, 
  LogOut, 
  ChevronRight,
  BarChart3,
  Ticket,
  MessageSquare
} from 'lucide-react';
import { Page } from '../types';

interface AdminSidebarProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ activePage, onNavigate, onLogout }) => {
  const menuItems = [
    { id: 'admin-dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'admin-products', label: 'Products', icon: Package },
    { id: 'admin-orders', label: 'Orders', icon: ShoppingCart },
    { id: 'admin-customers', label: 'Customers', icon: Users },
    { id: 'admin-categories', label: 'Categories', icon: Layers },
    { id: 'admin-coupons', label: 'Coupons', icon: Ticket },
    { id: 'admin-reviews', label: 'Reviews', icon: MessageSquare },
    { id: 'admin-analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'admin-settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white h-screen sticky top-0 flex flex-col">
      <div className="p-6 flex items-center gap-3 border-b border-white/10">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-bold">E</div>
        <span className="font-display font-bold text-xl">Admin Panel</span>
      </div>
      
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto no-scrollbar">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as Page)}
              className={`w-full flex items-center justify-between p-3 rounded-xl transition-all group ${
                isActive 
                  ? 'bg-primary text-white' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </div>
              <ChevronRight size={16} className={`transition-transform ${isActive ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 p-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all font-medium"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};
