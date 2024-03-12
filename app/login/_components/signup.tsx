import FacebookIcon from "@/components/base/svg/FacebookIcon";
import GithubIcon from "@/components/base/svg/GithubIcon";
import GoogleIcon from "@/components/base/svg/GoogleIcon";
import { Button, IconButton, Switch, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useKeyPress } from "ahooks";
import { login } from "@/http/user";

type Props = {
  toLogin: () => void;
};

const Signup = ({ toLogin }: Props) => {
  const router = useRouter();
  const { register, formState, handleSubmit } = useForm<User.UserLoginReqDto>();
  const emailField = register("email", { required: true });
  const passwordField = register("password", { required: true });
  console.log(formState);
  const loginHandle = handleSubmit(async (data) => {
    console.log(data);
    const res = await login({});
    console.log(res);
    // router.replace("/");
  });
  useKeyPress("enter", () => loginHandle());
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
      <div className="mt-8 px-6">
        <TextField
          label="Email"
          variant="standard"
          fullWidth
          size="small"
          {...emailField}
        />
        <TextField
          label="password"
          variant="standard"
          fullWidth
          size="small"
          className="mt-4"
          {...passwordField}
        />
        <div className="h-10 mt-6 mb-8">
          <label className="cursor-pointer">
            <Switch />
            <span className="text-[rgb(123,128,154)]">Remember me</span>
          </label>
        </div>
        <Button
          fullWidth
          variant="contained"
          onClick={loginHandle}
          className="h-10 rounded-lg bg-[linear-gradient(195deg,rgb(73,163,241),rgb(26,115,232))]"
        >
          SIGN IN
        </Button>
        <div className="py-10 text-center text-[rgb(123,128,154)]">
          Already have an account?{" "}
          <Button
            onClick={toLogin}
            className="px-0 min-w-0 normal-case font-semibold"
          >
            Sign up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
