declare namespace User {
  export type UserLoginReqDto = {
    captchaId: string;

    verifyCode: string;

    account: string;

    password: string;
  };
  export type UserRegisterReqDto = {
    captchaId: string;

    verifyCode: string;

    account: string;

    password: string;
  };
  export type UserLoginRespDto = {
    token: string;
  };
  export type UserRegisterRespDto = {
    token: string;
  };
  export type UserLoginCaptchaReqDto = {
    width?: number;
    height?: number;
  };
  export type UserRegisterCaptchaReqDto = {
    width?: number;
    height?: number;
  };
  export type UserLoginCaptchaRespDto = {
    verifyCode: string;
    captchaId: string;
  };
  export type UserRegisterCaptchaRespDto = {
    verifyCode: string;
    captchaId: string;
  };
}
