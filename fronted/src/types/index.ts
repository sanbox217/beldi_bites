export interface User {
  id: string;
  role: 'client' | 'cook';
  name: string;
  phoneOrEmail: string;
  avatarUrl?: string;
  languages: string[];
  addresses: Address[];
  favorites: {
    cooks: string[];
    products: string[];
  };
}

export interface Address {
  id: string;
  label: string;
  addressText: string;
  lat: number;
  lng: number;
  notes?: string;
}

export interface Cook {
  id: string;
  displayNameAr: string;
  displayNameFr: string;
  bioAr?: string;
  bioFr?: string;
  avatarUrl?: string;
  coverUrl?: string;
  rating: number;
  reviewCount: number;
  neighborhood: string;
  location: {
    lat: number;
    lng: number;
  };
  delivery: {
    enabled: boolean;
    radiusKm: number;
    baseFeeMAD: number;
    perKmMAD?: number;
  };
  kitchenHours: WeeklySchedule;
  verified: boolean;
  badges: string[];
}

export interface WeeklySchedule {
  [key: string]: {
    open: string;
    close: string;
    enabled: boolean;
  };
}

export interface Product {
  id: string;
  cookId: string;
  nameAr: string;
  nameFr: string;
  images: string[];
  category: 'bread' | 'msemen' | 'harsha' | 'beghrir' | 'sweets' | 'savory' | string;
  priceMAD: number;
  minQty?: number;
  maxQty?: number;
  leadTimeHours?: number;
  ingredientsAr?: string;
  ingredientsFr?: string;
  allergens?: string[];
  availableToday: boolean;
  tags: string[];
}

export interface Cart {
  id: string;
  items: CartItem[];
  totalMAD: number;
  deliveryFeesByCook: Record<string, number>;
  notesByItem?: Record<string, string>;
  timeslot?: {
    dateISO: string;
    window: 'morning' | 'afternoon' | 'evening';
  };
}

export interface CartItem {
  productId: string;
  cookId: string;
  qty: number;
  unitPriceMAD: number;
  notes?: string;
}

export interface Order {
  id: string;
  userId: string;
  groups: OrderGroup[];
  totalMAD: number;
  createdAtISO: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'ready_for_pickup' | 'completed' | 'canceled';
  payment: {
    method: 'cod' | 'card';
    status: 'unpaid' | 'paid' | 'refunded';
  };
  delivery: {
    type: 'pickup' | 'delivery';
    address?: Address;
    feeMAD?: number;
    etaISO?: string;
  };
  timeline: TimelineEvent[];
}

export interface OrderGroup {
  cookId: string;
  items: CartItem[];
  subtotalMAD: number;
  deliveryFeeMAD: number;
}

export interface TimelineEvent {
  atISO: string;
  label: string;
  status: string;
}

export interface Category {
  id: string;
  nameAr: string;
  nameFr: string;
  nameEn: string;
  icon: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  images?: string[];
  createdAtISO: string;
}