import React from 'react';
import { Plus, Edit2, Trash2, Search, Image as ImageIcon } from 'lucide-react';
import { CATEGORIES } from '../constants';

export const AdminCategories: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredCategories = CATEGORIES.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold">Category Management</h1>
          <p className="text-slate-500">Organize your products into logical groups.</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all">
          <Plus size={20} /> Add Category
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-3xl border border-black/5 shadow-sm">
        <div className="flex-1 relative group">
          <input 
            type="text" 
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-secondary rounded-2xl border-transparent focus:border-primary focus:ring-0 transition-all text-sm"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((cat) => (
          <div key={cat.name} className="bg-white p-6 rounded-[32px] border border-black/5 shadow-sm flex items-center gap-6 group">
            <div className="w-20 h-20 bg-secondary rounded-2xl overflow-hidden flex-shrink-0">
              <img src={cat.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-display font-bold text-lg">{cat.name}</h3>
              <p className="text-xs text-slate-500">24 Products</p>
              <div className="flex gap-2 mt-3">
                <button className="p-2 text-slate-400 hover:text-primary hover:bg-secondary rounded-xl transition-all"><Edit2 size={16} /></button>
                <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-secondary rounded-xl transition-all"><Trash2 size={16} /></button>
              </div>
            </div>
          </div>
        ))}
        
        {/* Add New Placeholder */}
        <button className="bg-secondary/30 border-2 border-dashed border-slate-200 rounded-[32px] p-6 flex flex-col items-center justify-center gap-3 text-slate-400 hover:border-primary hover:text-primary transition-all group">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform"><Plus size={24} /></div>
          <span className="font-bold text-sm">Add New Category</span>
        </button>
      </div>
    </div>
  );
};
