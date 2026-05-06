import { create } from 'zustand';
import shopifyClient from '@/lib/shopify';

interface CartItem {
  variantId: string;
  quantity: number;
  title: string;
  price: string;
  image?: string;
  size?: string;
}

interface CartStore {
  cart: any | null;
  cartItems: CartItem[];
  isCartOpen: boolean;
  isLoading: boolean;
  
  // Actions
  createCart: () => Promise<void>;
  addToCart: (variantId: string, quantity: number) => Promise<void>;
  removeFromCart: (lineItemId: string) => Promise<void>;
  updateQuantity: (lineItemId: string, quantity: number) => Promise<void>;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  cart: null,
  cartItems: [],
  isCartOpen: false,
  isLoading: false,

  createCart: async () => {
    try {
      const checkout = await shopifyClient.checkout.create();
      set({ cart: checkout });
    } catch (error) {
      console.error('Error creating cart:', error);
    }
  },

  addToCart: async (variantId: string, quantity: number) => {
    set({ isLoading: true });
    try {
      let { cart } = get();
      
      // Create cart if it doesn't exist
      if (!cart) {
        await get().createCart();
        cart = get().cart;
      }

      const lineItemsToAdd = [{ variantId, quantity }];
      const updatedCheckout = await shopifyClient.checkout.addLineItems(
        cart.id,
        lineItemsToAdd
      );

      set({ cart: updatedCheckout, isCartOpen: true, isLoading: false });
    } catch (error) {
      console.error('Error adding to cart:', error);
      set({ isLoading: false });
    }
  },

  removeFromCart: async (lineItemId: string) => {
    set({ isLoading: true });
    try {
      const { cart } = get();
      if (!cart) return;

      const updatedCheckout = await shopifyClient.checkout.removeLineItems(
        cart.id,
        [lineItemId]
      );

      set({ cart: updatedCheckout, isLoading: false });
    } catch (error) {
      console.error('Error removing from cart:', error);
      set({ isLoading: false });
    }
  },

  updateQuantity: async (lineItemId: string, quantity: number) => {
    set({ isLoading: true });
    try {
      const { cart } = get();
      if (!cart) return;

      const lineItemsToUpdate = [{ id: lineItemId, quantity }];
      const updatedCheckout = await shopifyClient.checkout.updateLineItems(
        cart.id,
        lineItemsToUpdate
      );

      set({ cart: updatedCheckout, isLoading: false });
    } catch (error) {
      console.error('Error updating quantity:', error);
      set({ isLoading: false });
    }
  },

  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
}));
