export interface Favorites {
  products: string[];
  cooks: string[];
}

class FavoritesService {
  private favorites: Favorites = {
    products: [],
    cooks: [],
  };

  private delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  private saveToStorage() {
    localStorage.setItem('mamanat_favorites', JSON.stringify(this.favorites));
  }

  private loadFromStorage() {
    const stored = localStorage.getItem('mamanat_favorites');
    if (stored) {
      try {
        this.favorites = JSON.parse(stored);
      } catch (e) {
        console.error('Failed to load favorites from storage:', e);
      }
    }
  }

  constructor() {
    this.loadFromStorage();
  }

  async getFavorites(): Promise<Favorites> {
    await this.delay(50);
    return { ...this.favorites };
  }

  async toggleProductFavorite(productId: string): Promise<{ isFavorite: boolean; favorites: Favorites }> {
    await this.delay(100);
    
    const index = this.favorites.products.indexOf(productId);
    let isFavorite: boolean;
    
    if (index >= 0) {
      this.favorites.products.splice(index, 1);
      isFavorite = false;
    } else {
      this.favorites.products.push(productId);
      isFavorite = true;
    }
    
    this.saveToStorage();
    return { isFavorite, favorites: { ...this.favorites } };
  }

  async toggleCookFavorite(cookId: string): Promise<{ isFavorite: boolean; favorites: Favorites }> {
    await this.delay(100);
    
    const index = this.favorites.cooks.indexOf(cookId);
    let isFavorite: boolean;
    
    if (index >= 0) {
      this.favorites.cooks.splice(index, 1);
      isFavorite = false;
    } else {
      this.favorites.cooks.push(cookId);
      isFavorite = true;
    }
    
    this.saveToStorage();
    return { isFavorite, favorites: { ...this.favorites } };
  }

  isProductFavorite(productId: string): boolean {
    return this.favorites.products.includes(productId);
  }

  isCookFavorite(cookId: string): boolean {
    return this.favorites.cooks.includes(cookId);
  }

  async clearAllFavorites(): Promise<Favorites> {
    await this.delay(100);
    
    this.favorites = {
      products: [],
      cooks: [],
    };
    
    this.saveToStorage();
    return { ...this.favorites };
  }
}

export const favoritesService = new FavoritesService();