export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'cook' | 'customer';
  avatarUrl?: string;
  language: 'ar' | 'fr';
  addresses: Address[];
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  id: string;
  label: string;
  street: string;
  neighborhood: string;
  notes?: string;
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
  user: User;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}