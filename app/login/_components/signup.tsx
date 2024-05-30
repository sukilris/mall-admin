import FacebookIcon from "@/components/base/svg/FacebookIcon";
import GithubIcon from "@/components/base/svg/GithubIcon";
import GoogleIcon from "@/components/base/svg/GoogleIcon";
import { Button, IconButton, Switch, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { register as signup, registerCaptcha } from "@/http/user";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ScaleLoader } from "react-spinners";

type Props = {
  toLogin: () => void;
};

const Signup = ({ toLogin }: Props) => {
  const router = useRouter();
  const [captcha, setCaptcha] = useState<User.UserRegisterCaptchaRespDto>();
  const [registerLoading, setRegisterLoading] = useState(false);
  const { register, formState, handleSubmit } =
    useForm<User.UserRegisterReqDto>();
  const accountField = register("account", { required: true });
  const passwordField = register("password", { required: true });
  const verifyCodeField = register("verifyCode", { required: true });
  const registerHandle = handleSubmit(async (data) => {
    setRegisterLoading(true);
    const res = await signup({ ...data, captchaId: captcha!.captchaId });
    setRegisterLoading(false);
    console.log(res.data?.token);
    // router.replace("/");
  });
  const getRegisterCaptcha = () => {
    registerCaptcha().then((res) => {
      setCaptcha(res.data);
    });
  };
  useEffect(() => {
    getRegisterCaptcha();
  }, []);
  return (
    <div>
      <div className="px-4">
        <div className="h-[153px] relative -top-6 flex flex-col items-center justify-center rounded-lg bg-[linear-gradient(195deg,rgb(73,163,241),rgb(26,115,232))] shadow-[rgba(0,0,0,0.14)_0rem_0.25rem_1.25rem_0rem,rgba(0,187,212,0.4)_0rem_0.4375rem_0.625rem_-0.3125rem]">
          <span className="text-2xl font-semibold text-white">
            Join us today
          </span>
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
      <form onSubmit={registerHandle} className="mt-8 px-6">
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
                onClick={getRegisterCaptcha}
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
          disabled={registerLoading}
          type="submit"
          variant="contained"
          className="h-10 rounded-lg bg-[linear-gradient(195deg,rgb(73,163,241),rgb(26,115,232))]"
        >
          {registerLoading ? (
            <ScaleLoader
              className="mr-4 text-white"
              color="white"
              width={4}
              height={24}
            />
          ) : (
            "Sign up"
          )}
        </Button>
        <div className="py-10 text-center text-[rgb(123,128,154)]">
          Already have an account?{" "}
          <Button
            onClick={toLogin}
            className="px-0 min-w-0 normal-case font-semibold"
          >
            Sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
