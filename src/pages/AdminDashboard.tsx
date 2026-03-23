import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingBag, 
  Users, 
  Clock,
  ArrowUpRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { DASHBOARD_STATS, ORDERS, PRODUCTS } from '../constants';
import { Page } from '../types';

interface AdminDashboardProps {
  onNavigate: (page: Page) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const stats = [
    { label: 'Total Sales', value: `$${DASHBOARD_STATS.totalSales.toLocaleString()}`, icon: DollarSign, color: 'bg-emerald-500', trend: '+12.5%', isUp: true },
    { label: 'Total Orders', value: DASHBOARD_STATS.totalOrders.toLocaleString(), icon: ShoppingBag, color: 'bg-blue-500', trend: '+8.2%', isUp: true },
    { label: 'Total Customers', value: DASHBOARD_STATS.totalCustomers.toLocaleString(), icon: Users, color: 'bg-purple-500', trend: '+5.4%', isUp: true },
    { label: 'Pending Orders', value: DASHBOARD_STATS.pendingOrders.toLocaleString(), icon: Clock, color: 'bg-amber-500', trend: '-2.1%', isUp: false },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-display font-bold">Dashboard Overview</h1>
        <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
          <span>Last updated: Mar 23, 2026</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-[32px] border border-black/5 shadow-sm space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className={`w-12 h-12 ${stat.color} text-white rounded-2xl flex items-center justify-center shadow-lg shadow-black/5`}>
                <stat.icon size={24} />
              </div>
              <div className={`flex items-center gap-1 text-sm font-bold ${stat.isUp ? 'text-emerald-500' : 'text-red-500'}`}>
                {stat.isUp ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                {stat.trend}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <h3 className="text-2xl font-display font-bold">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart Placeholder */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[40px] border border-black/5 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-display font-bold">Revenue Analytics</h2>
            <select className="bg-secondary border-transparent rounded-xl px-4 py-2 text-sm font-bold focus:ring-0">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-64 flex items-end justify-between gap-2">
            {DASHBOARD_STATS.revenueData.map((data, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                <div 
                  className="w-full bg-primary/10 group-hover:bg-primary rounded-t-xl transition-all relative"
                  style={{ height: `${(data.amount / 3000) * 100}%` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    ${data.amount}
                  </div>
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{data.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white p-8 rounded-[40px] border border-black/5 shadow-sm space-y-6">
          <h2 className="text-xl font-display font-bold">Top Selling</h2>
          <div className="space-y-4">
            {PRODUCTS.slice(0, 5).map((product, i) => (
              <div key={product.id} className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 bg-secondary rounded-xl overflow-hidden flex-shrink-0">
                  <img src={product.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm truncate">{product.name}</h4>
                  <p className="text-xs text-slate-500">{product.category}</p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-sm">${product.price}</div>
                  <div className="text-[10px] font-bold text-emerald-500">84 Sold</div>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => onNavigate('admin-products')}
            className="w-full py-3 bg-secondary hover:bg-slate-200 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2"
          >
            View All Products <ArrowUpRight size={16} />
          </button>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white p-8 rounded-[40px] border border-black/5 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-display font-bold">Recent Orders</h2>
          <button 
            onClick={() => onNavigate('admin-orders')}
            className="text-primary font-bold text-sm hover:underline"
          >
            View All
          </button>
        </div>
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                <th className="pb-4 px-4">Order ID</th>
                <th className="pb-4 px-4">Customer</th>
                <th className="pb-4 px-4">Date</th>
                <th className="pb-4 px-4">Amount</th>
                <th className="pb-4 px-4">Status</th>
                <th className="pb-4 px-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {ORDERS.map((order) => (
                <tr key={order.id} className="group hover:bg-secondary/30 transition-colors">
                  <td className="py-4 px-4 font-bold text-sm">{order.id}</td>
                  <td className="py-4 px-4">
                    <div className="font-bold text-sm">{order.customerName}</div>
                    <div className="text-xs text-slate-500">{order.phone}</div>
                  </td>
                  <td className="py-4 px-4 text-sm text-slate-600">{order.date}</td>
                  <td className="py-4 px-4 font-bold text-sm">${order.totalAmount}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <button className="p-2 hover:bg-white rounded-xl transition-all"><ArrowUpRight size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
