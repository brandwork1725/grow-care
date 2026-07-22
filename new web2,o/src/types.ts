export type CategoryType = 
  | "Fashion Accessories"
  | "Women's Handbags"
  | "Artificial Flowers"
  | "Earrings";

export interface Product {
  id: string;
  name: string;
  category: CategoryType;
  price: number; // in USD base
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  images: string[];
  description: string;
  specs: Record<string, string>;
  details: string[];
  colors: { name: string; hex: string }[];
  modelType: "handbag" | "earrings" | "flower" | "accessory" | "sculpture";
  isNew?: boolean;
  isTrending?: boolean;
  isBestSeller?: boolean;
  stock: number;
  discount?: number;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
  giftWrap?: boolean;
}

export interface Review {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface Address {
  id: string;
  fullName: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  taxAmount: number;
  total: number;
  currency: string;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  shippingAddress: Address;
  paymentMethod: string;
  trackingNumber: string;
  giftWrapFee?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  vipTier: "Gold Member" | "Platinum Elite" | "Black Card Connoisseur";
  points: number;
  addresses: Address[];
  orders: Order[];
}

export type CurrencyCode = "USD" | "EUR" | "GBP" | "AED" | "JPY";

export interface Currency {
  code: CurrencyCode;
  symbol: string;
  rate: number; // relative to USD
  label: string;
}

export type LanguageCode = "en" | "fr" | "ar" | "zh" | "ja";

export interface Language {
  code: LanguageCode;
  name: string;
  direction: "ltr" | "rtl";
}

export interface FilterState {
  category: string;
  minPrice: number;
  maxPrice: number;
  sort: "featured" | "price-low" | "price-high" | "rating" | "newest";
  searchQuery: string;
  inStockOnly: boolean;
}
