import request from "@/utils/request";

export const getPermmenuList = () => {
  return request<Api.listRespon>("/perm/menu/list", {
    method: "GET",
  });
};
