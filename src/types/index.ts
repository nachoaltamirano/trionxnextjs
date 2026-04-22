export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  category: 'natacion' | 'ciclismo' | 'running' | 'accesorios';
  images: string[];
  sizes: string[];
  stock: Record<string, number>;
  featured?: boolean;
  badge?: 'new' | 'top';
}

export interface CartItem {
  productId: string;
  quantity: number;
  size: string;
  price: number;
  name: string;
  image: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'approved' | 'rejected';
  preferenceId?: string;
  createdAt: Date;
}

export interface StockData {
  [productId: string]: Record<string, number>;
}
