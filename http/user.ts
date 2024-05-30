import request from "@/helper/request";

export const login = (userLoginReqDto: User.UserLoginReqDto) => {
  return request<User.UserLoginRespDto>("/user/login", {
    method: "POST",
    body: userLoginReqDto,
  });
};
export const loginCaptcha = (loginCaptcha?: User.UserLoginCaptchaReqDto) => {
  return request<User.UserLoginCaptchaRespDto>(
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
export const register = (userRegisterReqDto: User.UserRegisterReqDto) => {
  return request<User.UserRegisterRespDto>("/user/register", {
    method: "POST",
    body: userRegisterReqDto,
  });
};
export const registerCaptcha = (
  loginCaptcha?: User.UserRegisterCaptchaReqDto
) => {
  return request<User.UserRegisterCaptchaRespDto>(
    `/user/register/captcha${
      loginCaptcha?.width && loginCaptcha.height
        ? `?width=${loginCaptcha.width}&height=${loginCaptcha.height}`
        : ""
    }`,
    {
      method: "GET",
    }
  );
};
