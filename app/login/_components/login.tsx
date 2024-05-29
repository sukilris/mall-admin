import FacebookIcon from "@/components/base/svg/FacebookIcon";
import GithubIcon from "@/components/base/svg/GithubIcon";
import GoogleIcon from "@/components/base/svg/GoogleIcon";
import { Button, IconButton, Switch, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { login, loginCaptcha } from "http/user";
import { useEffect, useState } from "react";
import { UserLoginCaptchaRespDto, UserLoginReqDto } from "@/types/User";
import Image from "next/image";

type Props = {
  toSignup: () => void;
};

const Login = ({ toSignup }: Props) => {
  const router = useRouter();
  const [captcha, setCaptcha] = useState<UserLoginCaptchaRespDto>();
  const { register, formState, handleSubmit } = useForm<UserLoginReqDto>();
  const accountField = register("account", { required: true });
  const passwordField = register("password", { required: true });
  const verifyCodeField = register("verifyCode", { required: true });
  const loginHandle = handleSubmit(async (data) => {
    const res = await login({ ...data, captchaId: captcha!.captchaId });
    console.log(res.data?.token);
    // router.replace("/");
  });
  const getLoginCaptcha = () => {
    loginCaptcha().then((res) => {
      setCaptcha(res.data);
    });
  };
  useEffect(() => {
    getLoginCaptcha();
  }, []);
  return (
    <div>
      <div className="px-4">
        <div className="h-[153px] relative -top-6 flex flex-col items-center justify-center rounded-lg bg-[linear-gradient(195deg,rgb(73,163,241),rgb(26,115,232))] shadow-[rgba(0,0,0,0.14)_0rem_0.25rem_1.25rem_0rem,rgba(0,187,212,0.4)_0rem_0.4375rem_0.625rem_-0.3125rem]">
          <span className="text-2xl font-semibold text-white">Sign in</span>
          <div className="flex gap-14 mt-6">
            <IconButton className="text-white">
              <FacebookIcon />
            </IconButton>
            <IconButton className="text-white">
              <GithubIcon className="w-5 h-5" />
            </IconButton>
            <IconButton className="text-white">
              <GoogleIcon />
            </IconButton>
          </div>
        </div>
      </div>
      <form onSubmit={loginHandle} className="mt-8 px-6">
        <TextField
          label="Account"
          variant="standard"
          fullWidth
          size="small"
          {...accountField}
        />
        <TextField
          label="Password"
          variant="standard"
          fullWidth
          size="small"
          className="mt-4"
          type="password"
          {...passwordField}
        />
        <div className="flex items-center">
          <TextField
            label="Captcha"
            variant="standard"
            fullWidth
            size="small"
            className="mt-4"
            {...verifyCodeField}
          />
          {captcha?.verifyCode && (
            <Image
              className="cursor-pointer"
              onClick={getLoginCaptcha}
              src={captcha.verifyCode}
              width={200}
              height={80}
              alt=""
            />
          )}
        </div>
        <div className="h-10 mt-6 mb-8">
          <label className="cursor-pointer">
            <Switch />
            <span className="text-[rgb(123,128,154)]">Remember me</span>
          </label>
        </div>
        <Button
          fullWidth
          type="submit"
          variant="contained"
          className="h-10 rounded-lg bg-[linear-gradient(195deg,rgb(73,163,241),rgb(26,115,232))]"
        >
          SIGN IN
        </Button>
        <div className="py-10 text-center text-[rgb(123,128,154)]">
          {"Don't have an account?"}{" "}
          <Button
            onClick={toSignup}
            className="px-0 min-w-0 normal-case font-semibold"
          >
            Sign up
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
