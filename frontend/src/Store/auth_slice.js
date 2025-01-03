import {persist} from 'zustand/middleware'
export const createAuthSlice = (set) =>
    persist(
      (set) => ({
        user: undefined,
        setUser: (user) => set({ user }),
      }),
      {
        name: "auth-storage", // Key for localStorage
        getStorage: () => localStorage, // You can switch to sessionStorage if needed
      }
    );