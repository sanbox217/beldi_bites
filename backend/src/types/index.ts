export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  password: string;
  role: 'cook' | 'customer';
  avatarUrl?: string;
  language: 'ar' | 'fr';
  addresses: Address[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  id: string;
  label: string;
  street: string;
  neighborhood: string;
  notes?: string;
}

export interface Cook {
  id: string;
  userId: string;
  displayName: string;
  bio?: string;
  neighborhood: string;
  delivery: {
    enabled: boolean;
    pickupEnabled: boolean;
  };
  coverUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: 'cook' | 'customer';
  phone?: string;
  neighborhood?: string;
}

export interface AuthResponse {
  user: Omit<User, 'password'>;
  token: string;
}