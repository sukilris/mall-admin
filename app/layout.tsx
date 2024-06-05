"use client";

import "style/globals.css";
import Sidebar from "./_components/Sidebar";
import Header from "./_components/Header";
import ThemeStore from "@/store/ThemeStore";
import { createContext, useContext, useMemo, useState } from "react";
import Copyright from "./_components/Copyright";
import { usePathname } from "next/navigation";
import useRandomSelectionColor from "@/hooks/useRandomSelectionColor";
import { SnackbarProvider } from "notistack";

type LayoutContext = {
  sideBarOpen: boolean;
  toggleSideBarOpen: () => void;
};

const noop = () => {};

export const LayoutContext = createContext<LayoutContext>({
  sideBarOpen: false,
  toggleSideBarOpen: noop,
});

const excludePath = ["/login", "/money"];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sideBarOpen, setSidebarOpen] = useState(true);
  const toggleSideBarOpen = () => {
    setSidebarOpen((open) => !open);
  };
  const value = useMemo(
    () => ({
      sideBarOpen,
      toggleSideBarOpen,
    }),
    [sideBarOpen]
  );
  useRandomSelectionColor();
  const renderChildren = () => {
    if (excludePath.includes(pathname)) {
      return children;
    } else {
      return (
        <>
          <Sidebar open={sideBarOpen} toggleSideBar={toggleSideBarOpen} />
          <div
            className={`${
              sideBarOpen ? "ml-[282px]" : "ml-[128px]"
            } transition-[margin-left] transition-default p-4`}
          >
            <LayoutContext.Provider value={value}>
              <Header />
              <div>{children}</div>
              <Copyright />
            </LayoutContext.Provider>
          </div>
          <SnackbarProvider />
        </>
      );
    }
  };

  return (
    <ThemeStore>
      <html lang="en">
        <body>
          <div id="__next">
            <div className={`bg-[rgb(240,242,245)] font-mono`}>
              {renderChildren()}
            </div>
          </div>
        </body>
      </html>
    </ThemeStore>
  );
}
