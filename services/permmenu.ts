import { WithoutPaginationResp } from "@/types/api";
import { SysPermMenuItemRespDto } from "@/types/sys";
import request from "@/utils/request";

export const getPermmenuList = () => {
  return request<WithoutPaginationResp<SysPermMenuItemRespDto>>(
    "/sys/perm/menu/list",
    {
      method: "GET",
    }
  );
};
