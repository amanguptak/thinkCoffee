import {create} from 'zustand';

import {produce} from 'immer';
import CoffeeData from '../data/CoffeeData';
import BeansData from '../data/BeansData';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Type for each price option (like S, M, L)
type PriceEntry = {
  size: string;
  price: number;
  quantity: number;
};

// Type for each cart item with multiple sizes
type CartItem = {
  id: string;
  name: string; // 👈 required!
  prices: PriceEntry[];
  [key: string]: any; // for image, category, etc.
};


// A generic utility function to convert an array of objects with `id` fields into an object map
const normalizeList = <T extends {id: string}>(list: T[]) => {
  return list.reduce((acc, item) => {
    acc[item.id] = item; // Use item's 'id' as the key, and store the full item as the value
    return acc; // Return the accumulator so it can be used in the next iteration
  }, {} as Record<string, T>); // Start with an empty object, and type it as a map of id → item
};

// [
//   { id: 'coffee_1', name: 'Latte', price: 120 },
//   { id: 'coffee_2', name: 'Espresso', price: 100 },
// ]

// convert by normalizeList final result

// {
//   coffee_1: { id: 'coffee_1', name: 'Latte', price: 120 },
//   coffee_2: { id: 'coffee_2', name: 'Espresso', price: 100 },
// }

const CoffeeMap = normalizeList(CoffeeData);
const BeanMap = normalizeList(BeansData);

// Zustand state + actions
type StoreState = {
  CoffeeList: typeof CoffeeData;
  BeanList: typeof BeansData;
  FavoritesList: any[];
  OrderHistoryList: any[];
  CartList: CartItem[];
  CartPrice: number;
  CartQuantity: number;
  CoffeeMap: Record<string, (typeof CoffeeData)[number]>; // 👈 ADD THIS
  BeanMap: Record<string, (typeof BeansData)[number]>; // 👈 ADD THIS
  // Actions
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string, size: string) => void;
  decreaseCart: (id: string, size: string) => void;
  addToFavorites: (item: any) => void;
  removeFromFavorites: (id: string) => void;
  increaseCart: (id: string, size: string) => void;

  clearCart: () => void;
  getTotals: () => void;
};

export const useMyStore = create<StoreState>()(
  persist(
    set => ({
      // Static data
      CoffeeList: CoffeeData, // ✅ still used for listing
      CoffeeMap: CoffeeMap, // ✅ new, used for detail screen
      BeanList: BeansData,
      BeanMap: BeanMap,

      // Runtime state
      FavoritesList: [],
      OrderHistoryList: [],
      CartList: [],
      CartPrice: 0,
      CartQuantity: 0,

      // ✅ Add to cart logic
    addToCart: (partialItem) =>
  set(
    produce((state: StoreState) => {
      // Auto-fetch full item from CoffeeMap or BeanMap
      const baseItem = state.CoffeeMap[partialItem.id] || state.BeanMap[partialItem.id];
      if (!baseItem) return;

      // Merge full item with passed-in price info
      const incomingPrice = partialItem.prices[0]; // assuming 1 size at a time
      const existingItem = state.CartList.find((item) => item.id === partialItem.id);

      if (existingItem) {
        const existingSize = existingItem.prices.find(
          (p) => p.size === incomingPrice.size
        );

        if (existingSize) {
          existingSize.quantity += 1;
        } else {
          existingItem.prices.push({ ...incomingPrice, quantity: 1 });
        }

        existingItem.prices.sort((a, b) => b.size.localeCompare(a.size));
      } else {
        state.CartList.push({
          ...baseItem,              // ✅ auto-filled metadata
          prices: [{ ...incomingPrice, quantity: 1 }],
        });
      }
    })
  ),


      // ❌ Remove size from cart (or entire item if last size)
      removeFromCart: (id, size) =>
        set(
          produce((state: StoreState) => {
            const item = state.CartList.find(item => item.id === id);
            if (!item) return;

            // Remove just that size
            item.prices = item.prices.filter(p => p.size !== size);

            // If no sizes left → remove the whole item
            if (item.prices.length === 0) {
              state.CartList = state.CartList.filter(i => i.id !== id);
            }
          }),
        ),

      // ➖ Decrease quantity for a size, or remove size if quantity is 1
      decreaseCart: (id, size) =>
        set(
          produce((state: StoreState) => {
            const item = state.CartList.find(item => item.id === id);
            if (!item) return;

            const price = item.prices.find(p => p.size === size);
            if (!price) return;

            if (price.quantity > 1) {
              // Just decrease quantity
              price.quantity -= 1;
            } else {
              // If quantity is 1, remove that size
              item.prices = item.prices.filter(p => p.size !== size);

              // Remove whole item if no sizes left
              if (item.prices.length === 0) {
                state.CartList = state.CartList.filter(i => i.id !== id);
              }
            }
          }),
        ),

      increaseCart: (id: string, size: string) =>
        set(
          produce((state: StoreState) => {
            const item = state.CartList.find(item => item.id === id);
            if (!item) return;

            const sizeEntry = item.prices.find(p => p.size === size);
            if (!sizeEntry) return;

            sizeEntry.quantity += 1;
          }),
        ),

      // 🗑 Clear entire cart
      clearCart: () =>
        set(
          produce((state: StoreState) => {
            state.CartList = [];
          }),
        ),
      // ⭐ Add item to favorites if not already present
      addToFavorites: (id: string) =>
        set(
          produce((state: StoreState) => {
            // 🔍 Try to get the item from CoffeeMap or BeanMap
            const item = state.CoffeeMap[id] || state.BeanMap[id];
            if (!item) return;

            // ✅ Avoid duplicate
            const alreadyExists = state.FavoritesList.some(
              fav => fav.id === id,
            );
            if (!alreadyExists) {
              state.FavoritesList.push(item);
            }

            // ✅ Set favourite = true
            item.favourite = true;
          }),
        ),

      // ❌ Remove item from favorites by ID
      removeFromFavorites: (id: string) =>
        set(
          produce((state: StoreState) => {
            state.FavoritesList = state.FavoritesList.filter(
              fav => fav.id !== id,
            );

            // ✅ Reset favourite flag
            if (state.CoffeeMap[id]) {
              state.CoffeeMap[id].favourite = false;
            } else if (state.BeanMap[id]) {
              state.BeanMap[id].favourite = false;
            }
          }),
        ),
      // ✅ Add order to history and clear cart
      addOrderToHistory: () =>
        set(
          produce((state: StoreState) => {
            if (state.CartList.length === 0) return;

            const order = {
              id: `order_${Date.now()}`, // unique ID
              items: [...state.CartList],
              date: new Date().toISOString(),
              total: state.CartPrice,
              quantity: state.CartQuantity,
            };

            state.OrderHistoryList.push(order);

            // Optionally clear the cart
            state.CartList = [];
            state.CartPrice = 0;
            state.CartQuantity = 0;
          }),
        ),

      // 🧮 Calculate total price and quantity
      getTotals: () =>
        set(
          produce((state: StoreState) => {
            let total = 0;
            let quantity = 0;

            // Loop through each item and each size
            state.CartList.forEach(item => {
              item.prices.forEach(p => {
                total += p.quantity * (p.price || 0);
                quantity += p.quantity;
              });
            });

            state.CartPrice = total;
            state.CartQuantity = quantity;
          }),
        ),
    }),

    {
      name: 'coffee-app',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
