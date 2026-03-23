import React from 'react';
import { Plus, Search, Filter, Edit2, Trash2, MoreVertical, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS, CATEGORIES } from '../constants';
import { Product } from '../types';

export const AdminProducts: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredProducts = PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold">Product Management</h1>
          <p className="text-slate-500">Manage your inventory, prices, and stock levels.</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-primary text-white px-6 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all"
        >
          <Plus size={20} /> Add New Product
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-3xl border border-black/5 shadow-sm">
        <div className="flex-1 relative group">
          <input 
            type="text" 
            placeholder="Search by name, category, or SKU..."
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
            <option>All Categories</option>
            {CATEGORIES.map(c => <option key={c.name}>{c.name}</option>)}
          </select>
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-[40px] border border-black/5 shadow-sm overflow-hidden">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                <th className="py-6 px-8">Product</th>
                <th className="py-6 px-4">Category</th>
                <th className="py-6 px-4">Price</th>
                <th className="py-6 px-4">Stock</th>
                <th className="py-6 px-4">Status</th>
                <th className="py-6 px-8 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="group hover:bg-secondary/30 transition-colors">
                  <td className="py-4 px-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-secondary rounded-xl overflow-hidden flex-shrink-0">
                        <img src={product.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-sm truncate">{product.name}</div>
                        <div className="text-xs text-slate-400">SKU: PROD-{product.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm font-medium text-slate-600">{product.category}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-bold text-sm">${product.price}</div>
                    {product.oldPrice && <div className="text-xs text-slate-400 line-through">${product.oldPrice}</div>}
                  </td>
                  <td className="py-4 px-4">
                    <div className={`text-sm font-bold ${product.stock <= 5 ? 'text-red-500' : 'text-slate-600'}`}>
                      {product.stock} in stock
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      product.stock > 0 ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {product.stock > 0 ? 'Active' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="py-4 px-8 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-primary hover:bg-white rounded-xl transition-all shadow-sm">
                        <Edit2 size={18} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-white rounded-xl transition-all shadow-sm">
                        <Trash2 size={18} />
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
        
        {/* Pagination */}
        <div className="p-6 border-t border-slate-100 flex items-center justify-between">
          <p className="text-sm text-slate-500 font-medium">Showing 1 to {filteredProducts.length} of {filteredProducts.length} products</p>
          <div className="flex gap-2">
            <button disabled className="px-4 py-2 rounded-xl border border-slate-100 text-sm font-bold text-slate-400 disabled:opacity-50">Previous</button>
            <button className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold">1</button>
            <button className="px-4 py-2 rounded-xl border border-slate-100 text-sm font-bold text-slate-600 hover:bg-secondary transition-all">Next</button>
          </div>
        </div>
      </div>

      {/* Add Product Modal (Simplified) */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden"
            >
              <div className="p-8 sm:p-12 space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-display font-bold">Add New Product</h2>
                  <button onClick={() => setIsAddModalOpen(false)} className="p-2 hover:bg-secondary rounded-xl transition-all">
                    <Trash2 size={20} className="text-slate-400" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="sm:col-span-2 space-y-2">
                    <label className="text-sm font-bold text-slate-700">Product Name</label>
                    <input type="text" className="w-full bg-secondary border-transparent focus:border-primary focus:ring-0 rounded-2xl px-4 py-3" placeholder="Enter product name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Category</label>
                    <select className="w-full bg-secondary border-transparent focus:border-primary focus:ring-0 rounded-2xl px-4 py-3">
                      {CATEGORIES.map(c => <option key={c.name}>{c.name}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Price ($)</label>
                    <input type="number" className="w-full bg-secondary border-transparent focus:border-primary focus:ring-0 rounded-2xl px-4 py-3" placeholder="0.00" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Stock Quantity</label>
                    <input type="number" className="w-full bg-secondary border-transparent focus:border-primary focus:ring-0 rounded-2xl px-4 py-3" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">SKU</label>
                    <input type="text" className="w-full bg-secondary border-transparent focus:border-primary focus:ring-0 rounded-2xl px-4 py-3" placeholder="PROD-XXXX" />
                  </div>
                  <div className="sm:col-span-2 space-y-2">
                    <label className="text-sm font-bold text-slate-700">Description</label>
                    <textarea className="w-full bg-secondary border-transparent focus:border-primary focus:ring-0 rounded-2xl px-4 py-3 min-h-[100px]" placeholder="Enter product description"></textarea>
                  </div>
                  <div className="sm:col-span-2 space-y-2">
                    <label className="text-sm font-bold text-slate-700">Product Image</label>
                    <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center space-y-2 hover:border-primary transition-colors cursor-pointer">
                      <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center mx-auto text-slate-400"><ImageIcon size={24} /></div>
                      <p className="text-sm font-bold text-slate-500">Click to upload or drag and drop</p>
                      <p className="text-xs text-slate-400">PNG, JPG up to 10MB</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button onClick={() => setIsAddModalOpen(false)} className="flex-1 py-4 bg-secondary hover:bg-slate-200 rounded-2xl font-bold transition-all">Cancel</button>
                  <button className="flex-1 py-4 bg-primary hover:bg-primary-dark text-white rounded-2xl font-bold transition-all shadow-lg shadow-primary/20">Save Product</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
