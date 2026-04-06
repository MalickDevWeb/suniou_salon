import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

import { CartItem, Product } from "../types/domain";

const { createJSONStorage, persist } =
  require("zustand/middleware") as typeof import("zustand/middleware");

type CartState = {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product) =>
        set((state) => {
          const existing = state.items.find((item) => item.productId === product.id);
          const items = existing
            ? state.items.map((item) =>
                item.productId === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              )
            : [
                ...state.items,
                {
                  productId: product.id,
                  name: product.name,
                  price: product.price,
                  quantity: 1
                }
              ];
          return { items };
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId)
        })),
      clear: () => set({ items: [] })
    }),
    {
      name: "suniou-cart",
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);
