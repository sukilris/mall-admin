import { create } from "zustand";

export const useUserStore = create((set) => ({
  token: null,
  setToken: (token: string) => set({ token }),
}));
