import {create} from "zustand";
import { createAuthSlice } from "./auth_slice";

export const useAppStore = create((...a) => ({
    ...createAuthSlice(...a),
  }));
  