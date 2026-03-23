import React from 'react';
import { Star, Search, Trash2, CheckCircle, XCircle } from 'lucide-react';

const MOCK_REVIEWS = [
  { id: '1', product: 'Premium Wireless Headphones', customer: 'John Doe', rating: 5, comment: 'Amazing sound quality! Highly recommended.', date: '2024-03-20', status: 'approved' },
  { id: '2', product: 'Minimalist Leather Watch', customer: 'Sarah Smith', rating: 4, comment: 'Very stylish, but the strap is a bit stiff.', date: '2024-03-19', status: 'pending' },
  { id: '3', product: 'Urban Explorer Backpack', customer: 'Mike Johnson', rating: 2, comment: 'Zipper broke after a week. Disappointed.', date: '2024-03-18', status: 'rejected' },
];

export const AdminReviews: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold">Product Reviews</h1>
          <p className="text-slate-500">Manage customer feedback and ratings.</p>
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-black/5 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-black/5 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative group">
            <input 
              type="text" 
              placeholder="Search reviews..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-secondary rounded-2xl border-transparent focus:border-primary focus:ring-0 transition-all text-sm"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-secondary/50">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Rating</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Comment</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {MOCK_REVIEWS.map((review) => (
                <tr key={review.id} className="hover:bg-secondary/30 transition-colors group">
                  <td className="px-6 py-4 font-bold text-sm">{review.product}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{review.customer}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className={i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'} />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-600 line-clamp-1 max-w-xs">{review.comment}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      review.status === 'approved' ? 'bg-green-100 text-green-600' :
                      review.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-red-100 text-red-600'
                    }`}>
                      {review.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-green-500 hover:bg-green-50 rounded-xl transition-all" title="Approve"><CheckCircle size={18} /></button>
                      <button className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all" title="Reject"><XCircle size={18} /></button>
                      <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-secondary rounded-xl transition-all" title="Delete"><Trash2 size={18} /></button>
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
