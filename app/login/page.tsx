"use client";

import FacebookIcon from "@/components/base/svg/FacebookIcon";
import GithubIcon from "@/components/base/svg/GithubIcon";
import GoogleIcon from "@/components/base/svg/GoogleIcon";
import { Button, IconButton, Switch, TextField } from "@mui/material";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { useState } from "react";
import Login from "./_components/login";
import Signup from "./_components/signup";
import { useAutoAnimate } from "@formkit/auto-animate/react";

enum AuthType {
  Login,
  Signup,
}

const AuthPage = () => {
  const [authType, setAuthType] = useState(AuthType.Login);
  const [parentRef] = useAutoAnimate((el, action) => {
    let keyframes: Keyframe[] = [];
    if (action === "add") {
      keyframes = [
        { transform: "translateX(100%)" },
        { transform: "translateX(0)", opacity: 1 },
      ];
    }
    if (action === "remove") {
      keyframes = [
        { transform: "translateX(0)", opacity: 1 },
        { transform: "translateX(-100%)" },
      ];
    }
    return new KeyframeEffect(el, keyframes, {
      duration: 300,
      easing: "ease-in-out",
    });
  });
  return (
    <div
      className="h-screen relative bg-[url('/img/login-bg.jpeg')] bg-no-repeat bg-center bg-cover before:content-['']
            before:absolute
            before:inset-0
            before:block
            before:bg-[linear-gradient(195deg,rgba(66,66,74,0.6),rgba(25,25,25,0.6))]
            flex items-center justify-center"
    >
      <div className="lg:w-[25%] pt-6 overflow-hidden relative">
        <div ref={parentRef} className="bg-white rounded-xl z-10">
          {authType === AuthType.Login ? (
            <Login toSignup={() => setAuthType(AuthType.Signup)} />
          ) : (
            <Signup toLogin={() => setAuthType(AuthType.Login)} />
          )}
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

export default AuthPage;
