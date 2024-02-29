"use client";

import { Button } from "@mui/material";
import html2canvas from "html2canvas";
import { useRef } from "react";

const Money = () => {
  const container = useRef<HTMLDivElement | null>(null);
  const createImage = () => {
    html2canvas(container.current!, { useCORS: true }).then((canvas) => {
      const dataURL = canvas.toDataURL("image/jpeg");
      const a = document.createElement("a");
      const event = new MouseEvent("click");
      a.download = `sosovalue.png`;
      a.href = dataURL;
      a.dispatchEvent(event);
      a.remove();
    });
  };
  const preview = () => {
    html2canvas(container.current!, { useCORS: true }).then((canvas) => {
      const dataURL = canvas.toDataURL("image/jpeg");
    });
  };
  return (
    <div className="h-screen flex items-stretch">
      <div className="flex-1 shrink-0">
        <Button onClick={createImage}>生成图片</Button>
        <Button onClick={preview}>预览</Button>
      </div>
      <div className="flex-1 shrink-0 h-full overflow-y-auto">
        <div
          ref={container}
          className="w-[1080px] scale-[0.4] origin-top-left bg-[#efefef] font-[微软雅黑]"
        >
          <div className="h-[152px] flex items-center justify-between px-[45px]">
            <span className="text-[#131313] text-[45px]">2024年2月</span>
            <span className="text-[#b9b9b9] text-[34px]">支出￥676.76</span>
          </div>
          {[1, 1, 1, 1, 1, 1, 1].map((_, i) => (
            <div
              key={i}
              className="flex items-stretch h-[217px] pl-[45px] bg-white"
            >
              <div className="flex items-center">
                <svg
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="4801"
                  width="132"
                  height="132"
                >
                  <path
                    d="M32 512c0 265.088 214.912 480 480 480 265.088 0 480-214.912 480-480 0-265.088-214.912-480-480-480C246.912 32 32 246.912 32 512z"
                    fill="#FFD306"
                    p-id="4802"
                  ></path>
                  <path
                    d="M436.224 334.4h-38.592c-7.008 20.8-9.408 29.12-9.408 29.12H237.984s-2.24-8.32-9.376-29.12H190.048v29.12H144v34.88H291.2v28.8H151.328v37.44H291.2v26.432H151.328v37.536H291.2v27.008H144v36.896H277.44s-37.568 48.128-135.008 52.576v39.296s105.824 10.304 170.752-74.24c0 0 44.224 72.736 169.024 74.368v-40.864s-83.808 2.56-132.352-51.2h132.352V555.52h-145.984v-26.944h138.976v-37.536h-139.04v-26.4h138.976V427.2h-138.976v-28.8h146.048v-34.752h-46.08l0.064-29.12v-0.096z m179.584 284.096h44.928a469.632 469.632 0 0 0 47.68-150.656h39.04v94.72c-0.64 18.848-2.72 37.696-6.208 56.192h41.408c3.104-18.56 4.704-37.376 4.8-56.224v-94.624h26.944v-36.608h-26.88v-30.4h-39.904v30.592H603.2v36.48h63.072a399.776 399.776 0 0 1-50.4 150.4v0.064l-0.064 0.064z"
                    fill="#2C2C2C"
                    p-id="4803"
                  ></path>
                  <path
                    d="M540.8 344v345.6h291.424a49.44 49.44 0 0 0 49.376-49.504V344H540.8z m302.816 296.096a12 12 0 0 1-11.936 12.064h-253.312v-271.136h265.184v259.072h0.064z"
                    fill="#2C2C2C"
                    p-id="4804"
                  ></path>
                </svg>
              </div>
              <div className="flex-1 flex flex-col justify-center ml-[45px] pr-[45px] border-0 border-b-[2px] border-solid border-[#f7f7f7]">
                <div className="flex items-center justify-between">
                  <span className="text-[#1a1a1a] text-[43px]">
                    美团平台商户
                  </span>
                  <span className="text-[#1a1a1a] text-[33px] font-semibold">
                    -298.00
                  </span>
                </div>
                <span className="text-[#b1b1b1] text-[33px] mt-3">
                  2月26日 19:39
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Money;
