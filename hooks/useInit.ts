import { useUserStore } from "@/store/useUserStore";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

export const useInit = () => {
  const { getUserInfo } = useUserStore(
    useShallow(({ getUserInfo }) => ({ getUserInfo }))
  );
  useEffect(() => {
    getUserInfo();
  }, []);
};
