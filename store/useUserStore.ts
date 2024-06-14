import { getToken, setToken } from "@/helper/storage";
import { getProfileInfo, getUserPermmenu } from "@/http/user";
import { create } from "zustand";

type State = {
  token: string;
  permmenu: User.UserPermMenuRespDto | null;
  userInfo: User.UserProfileInfoRespDto | null;
  isLoadingUserInfo: boolean;
};

type Action = {
  initUserInfo: (token: string) => void;
  getUserInfo: () => void;
};

export const useUserStore = create<State & Action>((set, get) => ({
  token: "",
  permmenu: null,
  userInfo: null,
  isLoadingUserInfo: false,
  setToken(token: string) {
    set({ token });
  },
  async getUserInfo() {
    if (getToken()) {
      set({ isLoadingUserInfo: true });
      const [permRes, userInfoRes] = await Promise.all([
        getUserPermmenu(),
        getProfileInfo(),
      ]);
      set({
        permmenu: permRes.data,
        userInfo: userInfoRes.data,
        isLoadingUserInfo: false,
      });
    }
  },
  initUserInfo(token: string) {
    const { getUserInfo } = get();
    setToken(token);
    getUserInfo();
  },
}));
