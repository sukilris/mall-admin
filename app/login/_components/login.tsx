import FacebookIcon from "@/components/base/svg/FacebookIcon";
import GithubIcon from "@/components/base/svg/GithubIcon";
import GoogleIcon from "@/components/base/svg/GoogleIcon";
import { Button, IconButton, Switch, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { login, loginCaptcha } from "http/user";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ClockLoader, PacmanLoader, ScaleLoader } from "react-spinners";
import { useUserStore } from "@/store/useUserStore";
import { useShallow } from "zustand/react/shallow";

type Props = {
  toSignup: () => void;
};

const Login = ({ toSignup }: Props) => {
  const router = useRouter();
  const { initUserInfo } = useUserStore(
    useShallow(({ initUserInfo }) => ({ initUserInfo }))
  );
  const [captcha, setCaptcha] = useState<User.UserLoginCaptchaRespDto>();
  const [loginLoading, setLoginLoading] = useState(false);
  const { register, formState, handleSubmit } = useForm<User.UserLoginReqDto>();
  const accountField = register("account", { required: true });
  const passwordField = register("password", { required: true });
  const verifyCodeField = register("verifyCode", { required: true });
  const loginHandle = handleSubmit(async (data) => {
    setLoginLoading(true);
    const res = await login({ ...data, captchaId: captcha!.captchaId });
    setLoginLoading(false);
    initUserInfo(res.data!.token);
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
          <div className="w-[200px] h-[60px]">
            {captcha?.verifyCode && (
              <Image
                className="cursor-pointer w-full h-full"
                onClick={getLoginCaptcha}
                src={captcha.verifyCode}
                width={0}
                height={0}
                alt=""
              />
            )}
          </div>
        </div>
        <div className="h-10 mt-6 mb-8">
          <label className="cursor-pointer">
            <Switch />
            <span className="text-[rgb(123,128,154)]">Remember me</span>
          </label>
        </div>
        <Button
          fullWidth
          disabled={loginLoading}
          type="submit"
          variant="contained"
          className="h-10 rounded-lg bg-[linear-gradient(195deg,rgb(73,163,241),rgb(26,115,232))]"
        >
          {loginLoading ? (
            <ScaleLoader
              className="mr-4 text-white"
              color="white"
              width={4}
              height={24}
            />
          ) : (
            "Sign in"
          )}
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
