import React from 'react';
import { Search, Filter, Eye, Printer, ChevronDown, Phone, MapPin, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ORDERS } from '../constants';
import { Order } from '../types';

export const AdminOrders: React.FC = () => {
  const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredOrders = ORDERS.filter(o => 
    o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.customerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-emerald-100 text-emerald-600';
      case 'Pending': return 'bg-amber-100 text-amber-600';
      case 'Processing': return 'bg-blue-100 text-blue-600';
      case 'Cancelled': return 'bg-red-100 text-red-600';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold">Order Management</h1>
          <p className="text-slate-500">Track and manage customer orders and fulfillment.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white p-3 rounded-xl border border-black/5 shadow-sm hover:bg-secondary transition-all"><Printer size={20} /></button>
          <button className="bg-primary text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all">Export Orders</button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-3xl border border-black/5 shadow-sm">
        <div className="flex-1 relative group">
          <input 
            type="text" 
            placeholder="Search by Order ID or Customer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-secondary rounded-2xl border-transparent focus:border-primary focus:ring-0 transition-all text-sm"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-secondary px-6 py-3 rounded-2xl font-bold text-sm hover:bg-slate-200 transition-all">
            <Filter size={18} /> Filters
          </button>
          <select className="bg-secondary border-transparent rounded-2xl px-6 py-3 font-bold text-sm focus:ring-0">
            <option>All Status</option>
            <option>Pending</option>
            <option>Confirmed</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-[40px] border border-black/5 shadow-sm overflow-hidden">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                <th className="py-6 px-8">Order ID</th>
                <th className="py-6 px-4">Customer</th>
                <th className="py-6 px-4">Date</th>
                <th className="py-6 px-4">Amount</th>
                <th className="py-6 px-4">Payment</th>
                <th className="py-6 px-4">Status</th>
                <th className="py-6 px-8 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="group hover:bg-secondary/30 transition-colors">
                  <td className="py-4 px-8 font-bold text-sm">{order.id}</td>
                  <td className="py-4 px-4">
                    <div className="font-bold text-sm">{order.customerName}</div>
                    <div className="text-xs text-slate-500">{order.phone}</div>
                  </td>
                  <td className="py-4 px-4 text-sm text-slate-600">{order.date}</td>
                  <td className="py-4 px-4 font-bold text-sm">${order.totalAmount}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                      <CreditCard size={14} /> {order.paymentMethod}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-8 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => setSelectedOrder(order)}
                        className="p-2 text-slate-400 hover:text-primary hover:bg-white rounded-xl transition-all shadow-sm"
                      >
                        <Eye size={18} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-xl transition-all shadow-sm">
                        <ChevronDown size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOrder(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-3xl bg-white rounded-[40px] shadow-2xl overflow-hidden"
            >
              <div className="p-8 sm:p-12 space-y-8 max-h-[90vh] overflow-y-auto no-scrollbar">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-display font-bold">Order Details</h2>
                    <p className="text-slate-500">ID: {selectedOrder.id} • {selectedOrder.date}</p>
                  </div>
                  <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-secondary rounded-xl transition-all">
                    <Filter size={20} className="text-slate-400 rotate-45" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-bold text-slate-800 flex items-center gap-2">
                        <Phone size={18} className="text-primary" /> Customer Info
                      </h3>
                      <div className="bg-secondary/50 p-4 rounded-2xl space-y-1">
                        <div className="font-bold">{selectedOrder.customerName}</div>
                        <div className="text-sm text-slate-600">{selectedOrder.phone}</div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-bold text-slate-800 flex items-center gap-2">
                        <MapPin size={18} className="text-primary" /> Shipping Address
                      </h3>
                      <div className="bg-secondary/50 p-4 rounded-2xl text-sm text-slate-600 leading-relaxed">
                        {selectedOrder.address}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-bold text-slate-800">Order Status</h3>
                      <div className="flex flex-wrap gap-2">
                        {['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(s => (
                          <button 
                            key={s}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                              selectedOrder.status === s 
                                ? getStatusColor(s) + ' border-2 border-current' 
                                : 'bg-secondary text-slate-400 hover:bg-slate-200'
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-4">
                      <div className="flex justify-between text-sm text-slate-400">
                        <span>Payment Method</span>
                        <span className="text-white font-bold">{selectedOrder.paymentMethod}</span>
                      </div>
                      <div className="h-px bg-white/10"></div>
                      <div className="flex justify-between text-xl font-bold">
                        <span>Total Amount</span>
                        <span className="text-primary">${selectedOrder.totalAmount}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-slate-800">Items (2)</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 p-4 bg-secondary/30 rounded-2xl">
                      <div className="w-12 h-12 bg-white rounded-xl overflow-hidden flex-shrink-0">
                        <img src="https://picsum.photos/seed/headphones/100/100" alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-sm">Premium Wireless Headphones</div>
                        <div className="text-xs text-slate-500">Qty: 1 • Color: Black</div>
                      </div>
                      <div className="font-bold text-sm">$120</div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-secondary/30 rounded-2xl">
                      <div className="w-12 h-12 bg-white rounded-xl overflow-hidden flex-shrink-0">
                        <img src="https://picsum.photos/seed/tshirt/100/100" alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-sm">Cotton Summer T-Shirt</div>
                        <div className="text-xs text-slate-500">Qty: 1 • Size: M</div>
                      </div>
                      <div className="font-bold text-sm">$25</div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button onClick={() => setSelectedOrder(null)} className="flex-1 py-4 bg-secondary hover:bg-slate-200 rounded-2xl font-bold transition-all">Close</button>
                  <button className="flex-1 py-4 bg-primary hover:bg-primary-dark text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-2">
                    <Printer size={20} /> Print Invoice
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
