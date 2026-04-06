import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

import { User } from "../types/domain";

const { createJSONStorage, persist } =
  require("zustand/middleware") as typeof import("zustand/middleware");

type AuthState = {
  hydrated: boolean;
  token: string | null;
  user: User | null;
  markHydrated: () => void;
  setSession: (token: string, user: User) => void;
  setUser: (user: User) => void;
  clearSession: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      hydrated: false,
      token: null,
      user: null,
      markHydrated: () => set({ hydrated: true }),
      setSession: (token, user) => set({ token, user }),
      setUser: (user) => set({ user }),
      clearSession: () => set({ token: null, user: null })
    }),
    {
      name: "suniou-auth",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => state?.markHydrated()
    }
  )
);
