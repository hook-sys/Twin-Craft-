import React from 'react';
import { Search, Filter, Mail, Phone, MoreVertical, Ban, CheckCircle2 } from 'lucide-react';
import { CUSTOMERS } from '../constants';

export const AdminCustomers: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredCustomers = CUSTOMERS.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold">Customer Management</h1>
          <p className="text-slate-500">View and manage your registered customers.</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all">Export Customers</button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-3xl border border-black/5 shadow-sm">
        <div className="flex-1 relative group">
          <input 
            type="text" 
            placeholder="Search by name, email, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-secondary rounded-2xl border-transparent focus:border-primary focus:ring-0 transition-all text-sm"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
        </div>
        <button className="flex items-center gap-2 bg-secondary px-6 py-3 rounded-2xl font-bold text-sm hover:bg-slate-200 transition-all">
          <Filter size={18} /> Filters
        </button>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-[40px] border border-black/5 shadow-sm overflow-hidden">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                <th className="py-6 px-8">Customer</th>
                <th className="py-6 px-4">Contact</th>
                <th className="py-6 px-4">Orders</th>
                <th className="py-6 px-4">Total Spent</th>
                <th className="py-6 px-4">Status</th>
                <th className="py-6 px-8 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="group hover:bg-secondary/30 transition-colors">
                  <td className="py-4 px-8">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold">
                        {customer.name[0]}
                      </div>
                      <div>
                        <div className="font-bold text-sm">{customer.name}</div>
                        <div className="text-xs text-slate-400">Joined: {customer.joinDate}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-600 mb-1">
                      <Mail size={12} className="text-slate-400" /> {customer.email}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                      <Phone size={12} className="text-slate-400" /> {customer.phone}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm font-bold text-slate-600">{customer.totalOrders} Orders</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm font-bold text-slate-900">${customer.totalSpent}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      customer.status === 'Active' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="py-4 px-8 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className={`p-2 rounded-xl transition-all shadow-sm ${
                        customer.status === 'Active' ? 'text-slate-400 hover:text-red-500 hover:bg-white' : 'text-emerald-500 hover:bg-white'
                      }`}>
                        {customer.status === 'Active' ? <Ban size={18} /> : <CheckCircle2 size={18} />}
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-xl transition-all shadow-sm">
                        <MoreVertical size={18} />
                      </button>
                    </div>
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
