import request from "@/helper/request";

export const login = (userLoginReqDto: User.UserLoginReqDto) => {
  return request("/user/login", { method: "POST", body: userLoginReqDto });
};
