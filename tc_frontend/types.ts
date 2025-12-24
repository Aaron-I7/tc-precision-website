export interface Product {
  id: string | number;
  name: string;
  sku: string;
  category: string;
  price: number;
  status: string;
  image: string;
  description: string;
  specs?: Record<string, string>;
  isFeatured?: boolean;
}

export interface Inquiry {
  id: string | number;
  name: string;
  phone: string;
  content: string;
  date: string;
  status: string;
}

export enum Page {
  Home = 'home',
  About = 'about',
  ProductCenter = 'products',
  ProductDetail = 'product-detail',
  Contact = 'contact',
  Dashboard = 'dashboard',
  Inventory = 'inventory',
  ContactManagement = 'contact-mgmt',
  Guidelines = 'guidelines'
}
