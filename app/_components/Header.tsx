import { Badge, Breadcrumbs, IconButton, TextField } from "@mui/material";
import Link from "next/link";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import MenuOpenRoundedIcon from "@mui/icons-material/MenuOpenRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import { useContext, useMemo } from "react";
import { LayoutContext } from "../layout";
import { useScroll } from "ahooks";

const Header = () => {
  const { sideBarOpen, toggleSideBarOpen } = useContext(LayoutContext);
  const scroll = useScroll(
    typeof document === "undefined" ? undefined : document
  );
  const isFixed = useMemo(() => scroll && scroll.top > 16, [scroll?.top]);
  return (
    <header
      className={`h-[76px] px-4 rounded-xl flex items-center justify-between sticky top-4 left-0 transition-[box-shadow,background-color,backdrop-blur,backdrop-saturate] transition-default ${
        isFixed &&
        "z-50 shadow-[rgba(255,255,255,0.9)_0rem_0rem_0.0625rem_0.0625rem_inset,rgba(0,0,0,0.05)_0rem_1.25rem_1.6875rem_0rem] bg-[rgba(255,255,255,0.8)] backdrop-blur-[30px] backdrop-saturate-200"
      }`}
    >
      <div className="flex items-center">
        <div>
          <Breadcrumbs className="font-[inherit]">
            <Link href="/">
              <IconButton className="px-0">
                <HomeRoundedIcon className="text-base text-gray-500" />
              </IconButton>
            </Link>
            <Link
              href="/material-ui/getting-started/installation/"
              className="no-underline text-sm text-gray-500"
            >
              Dashboards Analytics
            </Link>
            <span className="text-sm text-gray-900">Analytics</span>
          </Breadcrumbs>
          <span className="text-base font-extrabold text-gray-900">
            Analytics
          </span>
        </div>
        <IconButton className="ml-8" onClick={toggleSideBarOpen}>
          {sideBarOpen ? <MenuOpenRoundedIcon /> : <MenuRoundedIcon />}
        </IconButton>
      </div>
      <div className="flex items-center">
        <TextField
          label="Search here"
          variant="outlined"
          className="mr-2"
          size="small"
        />
        <IconButton className="" onClick={toggleSideBarOpen}>
          <AccountCircleRoundedIcon />
        </IconButton>
        <IconButton className="" onClick={toggleSideBarOpen}>
          <SettingsRoundedIcon />
        </IconButton>
        <IconButton className="" onClick={toggleSideBarOpen}>
          <Badge badgeContent={4} color="secondary">
            <NotificationsRoundedIcon />
          </Badge>
        </IconButton>
      </div>
    </header>
  );
};

export default Header;
