import { Product, Cook, Category } from '../types';
import { mockProducts, mockCooks, mockCategories } from './mockData';

export interface ProductFilters {
  query?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  availableToday?: boolean;
  cookId?: string;
  tags?: string[];
}

export interface ProductListResponse {
  products: Product[];
  total: number;
  page: number;
  hasMore: boolean;
}

class CatalogService {
  private delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  async listProducts(filters: ProductFilters & { page?: number; limit?: number }): Promise<ProductListResponse> {
    await this.delay(300); // Simulate network delay
    
    let filtered = [...mockProducts];
    const { page = 1, limit = 10 } = filters;

    // Apply filters
    if (filters.query) {
      const query = filters.query.toLowerCase();
      filtered = filtered.filter(p => 
        p.nameAr.toLowerCase().includes(query) ||
        p.nameFr.toLowerCase().includes(query) ||
        p.ingredientsAr?.toLowerCase().includes(query) ||
        p.ingredientsFr?.toLowerCase().includes(query)
      );
    }

    if (filters.category) {
      filtered = filtered.filter(p => p.category === filters.category);
    }

    if (filters.minPrice !== undefined) {
      filtered = filtered.filter(p => p.priceMAD >= filters.minPrice!);
    }

    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter(p => p.priceMAD <= filters.maxPrice!);
    }

    if (filters.availableToday !== undefined) {
      filtered = filtered.filter(p => p.availableToday === filters.availableToday);
    }

    if (filters.cookId) {
      filtered = filtered.filter(p => p.cookId === filters.cookId);
    }

    if (filters.tags && filters.tags.length > 0) {
      filtered = filtered.filter(p => 
        filters.tags!.some(tag => p.tags.includes(tag))
      );
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filtered.slice(startIndex, endIndex);
    
    return {
      products: paginatedProducts,
      total: filtered.length,
      page,
      hasMore: endIndex < filtered.length
    };
  }

  async getProduct(id: string): Promise<Product | null> {
    await this.delay(200);
    return mockProducts.find(p => p.id === id) || null;
  }

  async listCooks(): Promise<Cook[]> {
    await this.delay(250);
    return [...mockCooks];
  }

  async getCook(id: string): Promise<Cook | null> {
    await this.delay(200);
    return mockCooks.find(c => c.id === id) || null;
  }

  async getCategories(): Promise<Category[]> {
    await this.delay(100);
    return [...mockCategories];
  }

  async getFeaturedCooks(): Promise<Cook[]> {
    await this.delay(200);
    return mockCooks.filter(cook => cook.badges.includes('bestseller')).slice(0, 5);
  }

  async getFeaturedProducts(): Promise<Product[]> {
    await this.delay(200);
    return mockProducts.filter(product => product.tags.includes('bestseller')).slice(0, 8);
  }
}

export const catalogService = new CatalogService();