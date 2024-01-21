declare namespace User {
  export type UserLoginReqDto = {
    captchaId: string;

    verifyCode: string;

    account: string;

    password: string;
  };
}
