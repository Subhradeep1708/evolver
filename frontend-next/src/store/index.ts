import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id?: string;
  role?: string;
  isLoggedIn?: boolean;
}

interface AppState {
  user: User;
  setUser: (newUser: User) => void;
}

export const useAppStore = create<AppState>()(
    persist(
        (set) => ({
            user: { id: undefined, role: undefined, isLoggedIn: undefined},
            setUser: (newUser) =>
                set({
                    user: {
                        id: newUser.id,
                        role: newUser.role,
                        isLoggedIn:newUser.isLoggedIn
                    },
                }),
        }),
        { name: "userStore" }
    )
);
