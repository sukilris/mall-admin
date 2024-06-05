import { setToken } from "@/helper/storage";
import { getProfileInfo, getUserPermmenu } from "@/http/user";
import { create } from "zustand";

type State = {
  token: string;
};

type Action = {
  initUserInfo: (token: string) => void;
  getUserInfo: () => void;
};

export const useUserStore = create<State & Action>((set, get) => ({
  token: "",
  setToken(token: string) {
    set({ token });
  },
  async getUserInfo() {
    const [] = await Promise.all([getUserPermmenu(), getProfileInfo()]);
  },
  initUserInfo(token: string) {
    const { getUserInfo } = get();
    setToken(token);
    getUserInfo();
  },
}));
