import React from 'react';
import { Settings, Shield, CreditCard, Truck, Bell, Globe, Save } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const [activeSection, setActiveSection] = React.useState('general');

  const sections = [
    { id: 'general', label: 'General Settings', icon: Globe },
    { id: 'payment', label: 'Payment Methods', icon: CreditCard },
    { id: 'shipping', label: 'Shipping & Delivery', icon: Truck },
    { id: 'security', label: 'Security & Access', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold">System Settings</h1>
        <p className="text-slate-500">Configure your store's general settings and integrations.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-72 space-y-2">
          {sections.map(section => {
            const Icon = section.icon;
            return (
              <button 
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 p-4 rounded-2xl font-bold transition-all ${
                  activeSection === section.id ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white text-slate-500 hover:bg-secondary border border-black/5'
                }`}
              >
                <Icon size={20} />
                <span>{section.label}</span>
              </button>
            );
          })}
        </aside>

        {/* Content */}
        <main className="flex-1 bg-white rounded-[40px] border border-black/5 shadow-sm p-8 sm:p-12">
          {activeSection === 'general' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-display font-bold">General Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Site Name</label>
                  <input type="text" defaultValue="EcoShop" className="w-full bg-secondary border-transparent focus:border-primary focus:ring-0 rounded-2xl px-4 py-3" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Support Email</label>
                  <input type="email" defaultValue="support@ecoshop.com" className="w-full bg-secondary border-transparent focus:border-primary focus:ring-0 rounded-2xl px-4 py-3" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Phone Number</label>
                  <input type="tel" defaultValue="+880 1XXX XXXXXX" className="w-full bg-secondary border-transparent focus:border-primary focus:ring-0 rounded-2xl px-4 py-3" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Currency</label>
                  <select className="w-full bg-secondary border-transparent focus:border-primary focus:ring-0 rounded-2xl px-4 py-3">
                    <option>USD ($)</option>
                    <option>BDT (৳)</option>
                    <option>EUR (€)</option>
                  </select>
                </div>
                <div className="sm:col-span-2 space-y-2">
                  <label className="text-sm font-bold text-slate-700">Store Address</label>
                  <textarea defaultValue="Dhaka, Bangladesh" className="w-full bg-secondary border-transparent focus:border-primary focus:ring-0 rounded-2xl px-4 py-3 min-h-[100px]"></textarea>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'payment' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-display font-bold">Payment Gateways</h2>
              <div className="space-y-6">
                <div className="p-6 bg-secondary/50 rounded-3xl flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary font-bold">b</div>
                    <div>
                      <div className="font-bold">bKash Payment</div>
                      <div className="text-xs text-slate-500">Accept mobile payments via bKash</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold text-emerald-500 bg-emerald-100 px-3 py-1 rounded-full uppercase">Active</span>
                    <button className="text-sm font-bold text-primary hover:underline">Configure</button>
                  </div>
                </div>
                <div className="p-6 bg-secondary/50 rounded-3xl flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-slate-400"><CreditCard size={24} /></div>
                    <div>
                      <div className="font-bold">SSLCommerz</div>
                      <div className="text-xs text-slate-500">Accept cards and net banking</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold text-slate-400 bg-slate-200 px-3 py-1 rounded-full uppercase">Inactive</span>
                    <button className="text-sm font-bold text-primary hover:underline">Setup</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-12 pt-8 border-t border-slate-100 flex justify-end">
            <button className="bg-primary text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all">
              <Save size={20} /> Save Changes
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};
