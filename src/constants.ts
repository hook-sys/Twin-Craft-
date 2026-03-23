import { Product, Order, Customer, DashboardStats } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 120,
    oldPrice: 150,
    image: 'https://picsum.photos/seed/headphones/600/600',
    category: 'Electronics',
    rating: 4.8,
    reviews: 124,
    description: 'High-quality wireless headphones with noise cancellation and 40-hour battery life.',
    stock: 5,
    isFlashSale: true,
    discount: 20,
    colors: ['Black', 'Silver', 'Blue']
  },
  {
    id: '2',
    name: 'Cotton Summer T-Shirt',
    price: 25,
    oldPrice: 35,
    image: 'https://picsum.photos/seed/tshirt/600/600',
    category: 'Men',
    rating: 4.5,
    reviews: 89,
    description: 'Breathable 100% cotton t-shirt perfect for summer days.',
    stock: 20,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Grey']
  },
  {
    id: '3',
    name: 'Smart Watch Series 7',
    price: 299,
    oldPrice: 349,
    image: 'https://picsum.photos/seed/watch/600/600',
    category: 'Electronics',
    rating: 4.9,
    reviews: 256,
    description: 'Advanced health tracking, GPS, and water resistance up to 50m.',
    stock: 3,
    isFlashSale: true,
    discount: 15
  },
  {
    id: '4',
    name: 'Organic Face Cream',
    price: 45,
    image: 'https://picsum.photos/seed/cream/600/600',
    category: 'Health',
    rating: 4.7,
    reviews: 56,
    description: 'Natural ingredients for glowing and healthy skin.',
    stock: 15
  },
  {
    id: '5',
    name: 'Leather Handbag',
    price: 85,
    oldPrice: 110,
    image: 'https://picsum.photos/seed/handbag/600/600',
    category: 'Women',
    rating: 4.6,
    reviews: 42,
    description: 'Elegant genuine leather handbag for everyday use.',
    stock: 8,
    colors: ['Brown', 'Black', 'Tan']
  },
  {
    id: '6',
    name: 'Running Shoes Pro',
    price: 95,
    oldPrice: 130,
    image: 'https://picsum.photos/seed/shoes/600/600',
    category: 'Men',
    rating: 4.4,
    reviews: 112,
    description: 'Lightweight and durable running shoes for professional athletes.',
    stock: 12,
    sizes: ['40', '41', '42', '43', '44']
  }
];

export const CATEGORIES = [
  { name: 'Men', image: 'https://picsum.photos/seed/men/200/200' },
  { name: 'Women', image: 'https://picsum.photos/seed/women/200/200' },
  { name: 'Electronics', image: 'https://picsum.photos/seed/electronics/200/200' },
  { name: 'Health', image: 'https://picsum.photos/seed/health/200/200' },
];

export const TESTIMONIALS = [
  { id: '1', name: 'Rakib Hasan', comment: 'Excellent quality products and super fast delivery!', rating: 5, avatar: 'https://i.pravatar.cc/150?u=rakib' },
  { id: '2', name: 'Nusrat Jahan', comment: 'The customer support is very helpful. Love the watch I bought.', rating: 4, avatar: 'https://i.pravatar.cc/150?u=nusrat' },
  { id: '3', name: 'Abir Ahmed', comment: 'Best e-commerce site in Bangladesh. Highly recommended.', rating: 5, avatar: 'https://i.pravatar.cc/150?u=abir' },
];

export const ORDERS: Order[] = [
  {
    id: 'ORD-1001',
    customerName: 'John Doe',
    phone: '+880 1711 223344',
    address: 'House 12, Road 5, Dhanmondi, Dhaka',
    paymentMethod: 'COD',
    totalAmount: 145,
    status: 'Pending',
    date: '2026-03-20',
    items: []
  },
  {
    id: 'ORD-1002',
    customerName: 'Sarah Smith',
    phone: '+880 1822 334455',
    address: 'Flat 4A, Building 7, Banani, Dhaka',
    paymentMethod: 'Online',
    totalAmount: 299,
    status: 'Delivered',
    date: '2026-03-18',
    items: []
  }
];

export const CUSTOMERS: Customer[] = [
  {
    id: 'CUST-001',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+880 1711 223344',
    totalOrders: 5,
    totalSpent: 1250,
    status: 'Active',
    joinDate: '2025-10-12'
  },
  {
    id: 'CUST-002',
    name: 'Sarah Smith',
    email: 'sarah@example.com',
    phone: '+880 1822 334455',
    totalOrders: 3,
    totalSpent: 850,
    status: 'Active',
    joinDate: '2025-11-05'
  }
];

export const DASHBOARD_STATS: DashboardStats = {
  totalSales: 45280,
  totalOrders: 1240,
  totalCustomers: 850,
  pendingOrders: 45,
  revenueData: [
    { date: 'Mar 17', amount: 1200 },
    { date: 'Mar 18', amount: 1800 },
    { date: 'Mar 19', amount: 1400 },
    { date: 'Mar 20', amount: 2200 },
    { date: 'Mar 21', amount: 1900 },
    { date: 'Mar 22', amount: 2500 },
    { date: 'Mar 23', amount: 2100 },
  ]
};
