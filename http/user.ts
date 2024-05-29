import request from "@/helper/request";
import {
  UserLoginCaptchaReqDto,
  UserLoginCaptchaRespDto,
  UserLoginReqDto,
  UserLoginRespDto,
} from "@/types/User";

export const login = (userLoginReqDto: UserLoginReqDto) => {
  return request<UserLoginRespDto>("/user/login", {
    method: "POST",
    body: userLoginReqDto,
  });
};
export const loginCaptcha = (loginCaptcha?: UserLoginCaptchaReqDto) => {
  return request<UserLoginCaptchaRespDto>(
    `/user/login/captcha${
      loginCaptcha?.width && loginCaptcha.height
        ? `?width=${loginCaptcha.width}&height=${loginCaptcha.height}`
        : ""
    }`,
    {
      method: "GET",
    }
  );
};
