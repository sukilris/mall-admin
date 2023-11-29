"use client";

import FacebookIcon from "@/components/base/svg/FacebookIcon";
import GithubIcon from "@/components/base/svg/GithubIcon";
import GoogleIcon from "@/components/base/svg/GoogleIcon";
import {
  Button,
  IconButton,
  OutlinedInput,
  Switch,
  TextField,
} from "@mui/material";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const login = () => {
    router.replace("/");
  };
  return (
    <div
      className="h-screen relative bg-[url('/img/login-bg.jpeg')] bg-no-repeat bg-center bg-cover before:content-['']
            before:absolute
            before:inset-0
            before:block
            before:bg-[linear-gradient(195deg,rgba(66,66,74,0.6),rgba(25,25,25,0.6))]
            flex items-center justify-center"
    >
      <div className="lg:w-[25%] bg-white rounded-xl z-10">
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
        <div className="mt-10 px-6">
          <TextField label="Email" fullWidth size="small" />
          <TextField label="password" fullWidth size="small" className="mt-4" />
          <div className="h-10 mt-6 mb-8">
            <label className="cursor-pointer">
              <Switch />
              <span className="text-[rgb(123,128,154)]">Remember me</span>
            </label>
          </div>
          <Button
            fullWidth
            variant="contained"
            onClick={login}
            className="h-10 rounded-lg bg-[linear-gradient(195deg,rgb(73,163,241),rgb(26,115,232))]"
          >
            SIGN IN
          </Button>
          <div className="py-10 text-center text-[rgb(123,128,154)]">
            Don't have an account?{" "}
            <Button className="px-0 min-w-0 normal-case font-semibold">
              Sign up
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="text-white text-sm flex items-center">
          © 2023, made with
          <FavoriteRoundedIcon className="text-base mx-0.5" />
          by <span className="font-bold mx-1">luluxiu</span> for a better web.
        </div>
      </div>
    </div>
  );
};

export default Login;
