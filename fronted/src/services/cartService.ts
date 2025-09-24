import { Cart, CartItem } from '../types';

class CartService {
  private cart: Cart = {
    id: 'default',
    items: [],
    totalMAD: 0,
    deliveryFeesByCook: {},
    notesByItem: {},
  };

  private delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  private saveToStorage() {
    localStorage.setItem('mamanat_cart', JSON.stringify(this.cart));
  }

  private loadFromStorage() {
    const stored = localStorage.getItem('mamanat_cart');
    if (stored) {
      try {
        this.cart = JSON.parse(stored);
      } catch (e) {
        console.error('Failed to load cart from storage:', e);
      }
    }
  }

  private calculateTotal() {
    const itemsTotal = this.cart.items.reduce((sum, item) => sum + (item.qty * item.unitPriceMAD), 0);
    const deliveryTotal = Object.values(this.cart.deliveryFeesByCook).reduce((sum, fee) => sum + fee, 0);
    this.cart.totalMAD = itemsTotal + deliveryTotal;
  }

  constructor() {
    this.loadFromStorage();
    this.calculateTotal();
  }

  async getCart(): Promise<Cart> {
    await this.delay(100);
    return { ...this.cart };
  }

  async addItem(productId: string, cookId: string, qty: number, unitPriceMAD: number, notes?: string): Promise<Cart> {
    await this.delay(200);
    
    const existingItemIndex = this.cart.items.findIndex(item => item.productId === productId);
    
    if (existingItemIndex >= 0) {
      // Update existing item
      this.cart.items[existingItemIndex].qty += qty;
      if (notes) {
        this.cart.notesByItem = this.cart.notesByItem || {};
        this.cart.notesByItem[productId] = notes;
      }
    } else {
      // Add new item
      const newItem: CartItem = {
        productId,
        cookId,
        qty,
        unitPriceMAD,
        notes
      };
      this.cart.items.push(newItem);
      
      if (notes) {
        this.cart.notesByItem = this.cart.notesByItem || {};
        this.cart.notesByItem[productId] = notes;
      }
    }

    // Set default delivery fee for new cook (will be calculated properly later)
    if (!this.cart.deliveryFeesByCook[cookId]) {
      this.cart.deliveryFeesByCook[cookId] = 10; // Default fee
    }

    this.calculateTotal();
    this.saveToStorage();
    
    return { ...this.cart };
  }

  async updateQty(productId: string, qty: number): Promise<Cart> {
    await this.delay(150);
    
    const itemIndex = this.cart.items.findIndex(item => item.productId === productId);
    if (itemIndex >= 0) {
      if (qty <= 0) {
        // Remove item
        const cookId = this.cart.items[itemIndex].cookId;
        this.cart.items.splice(itemIndex, 1);
        
        // Remove delivery fee if no items from this cook
        const hasItemsFromCook = this.cart.items.some(item => item.cookId === cookId);
        if (!hasItemsFromCook) {
          delete this.cart.deliveryFeesByCook[cookId];
        }
        
        // Remove notes
        if (this.cart.notesByItem && this.cart.notesByItem[productId]) {
          delete this.cart.notesByItem[productId];
        }
      } else {
        this.cart.items[itemIndex].qty = qty;
      }
      
      this.calculateTotal();
      this.saveToStorage();
    }
    
    return { ...this.cart };
  }

  async removeItem(productId: string): Promise<Cart> {
    return this.updateQty(productId, 0);
  }

  async clear(): Promise<Cart> {
    await this.delay(100);
    
    this.cart = {
      id: 'default',
      items: [],
      totalMAD: 0,
      deliveryFeesByCook: {},
      notesByItem: {},
    };
    
    this.saveToStorage();
    return { ...this.cart };
  }

  async setTimeslot(dateISO: string, window: 'morning' | 'afternoon' | 'evening'): Promise<Cart> {
    await this.delay(100);
    
    this.cart.timeslot = { dateISO, window };
    this.saveToStorage();
    
    return { ...this.cart };
  }

  async setDeliveryFee(cookId: string, feeMAD: number): Promise<Cart> {
    await this.delay(100);
    
    this.cart.deliveryFeesByCook[cookId] = feeMAD;
    this.calculateTotal();
    this.saveToStorage();
    
    return { ...this.cart };
  }

  getItemCount(): number {
    return this.cart.items.reduce((total, item) => total + item.qty, 0);
  }
}

export const cartService = new CartService();