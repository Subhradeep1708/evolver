import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAppStore = create()(
    persist(
        (set) => ({
            user: { id: undefined, role: undefined },
            setUser: (newUser) =>
                set({
                    user: {
                        id: newUser.id,
                        role: newUser.role,
                    },
                }),
        }),
        { name: "userStore" }
    )
);
