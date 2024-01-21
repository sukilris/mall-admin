import request from "@/helper/request";

export const login = (userLoginReqDto: User.UserLoginReqDto) => {
  return request("/login", { method: "POST", body: userLoginReqDto });
};
