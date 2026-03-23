export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  description: string;
  stock: number;
  isFlashSale?: boolean;
  discount?: number;
  sizes?: string[];
  colors?: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export type Page = 'home' | 'listing' | 'detail' | 'cart' | 'checkout' | 'auth' | 'dashboard' | 'wishlist' | 'search' | 'admin-dashboard' | 'admin-products' | 'admin-orders' | 'admin-customers' | 'admin-categories' | 'admin-coupons' | 'admin-reviews' | 'admin-analytics' | 'admin-settings';

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  paymentMethod: 'COD' | 'Online';
  totalAmount: number;
  status: 'Pending' | 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  date: string;
  items: CartItem[];
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  status: 'Active' | 'Blocked';
  joinDate: string;
}

export interface DashboardStats {
  totalSales: number;
  totalOrders: number;
  totalCustomers: number;
  pendingOrders: number;
  revenueData: { date: string; amount: number }[];
}
