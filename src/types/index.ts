export interface Product {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  price: number;
  comparePrice?: number;
  cost: number;
  stock: number;
  images: ProductImage[];
  tags: string[];
  published: boolean;
  featured: boolean;
  trendScore: number;
  supplierUrl?: string;
  affiliateUrl?: string;
  supplierName?: string;
  metaTitle?: string;
  metaDescription?: string;
  benefits: string[];
  salesArguments: string[];
  marketingAngle?: string;
  estimatedMargin?: number;
  faqJson?: { question: string; answer: string }[] | null;
  trendData?: TrendScore;
  category?: Category;
  reviews?: Review[];
  createdAt: Date;
}

export interface ProductImage {
  id: string;
  url: string;
  alt?: string;
  position: number;
}

export interface TrendScore {
  score: number;
  popularity: number;
  tiktokTrend: number;
  searchVolume: number;
  margin: number;
  competition: number;
  viralPotential: number;
  safetyRisk: number;
  seasonality: number;
  seoPotential: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerEmail: string;
  customerName: string;
  items: OrderItem[];
  status: string;
  total: number;
  shippingAddress: ShippingAddress;
  trackingNumber?: string;
  createdAt: Date;
}

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface ShippingAddress {
  line1: string;
  line2?: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  createdAt: Date;
}
