import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Button,
  Drawer,
  ListItemButton,
} from "@mui/material";
// import Button from "@mui/material-next/Button";
import Link from "next/link";
import { ReactNode, useContext, useMemo, useState } from "react";
import ApiRoundedIcon from "@mui/icons-material/ApiRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";
import TocRoundedIcon from "@mui/icons-material/TocRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import { useUserStore } from "@/store/useUserStore";
import { useShallow } from "zustand/react/shallow";

const menus = [
  {
    name: "Dashboards",
    Icon: DashboardRoundedIcon,
    children: [
      {
        Icon: AssessmentRoundedIcon,
        name: "Analytick",
        path: "/",
      },
      {
        Icon: TocRoundedIcon,
        name: "Table",
        path: "/table",
      },
    ],
  },
  {
    name: "Test1",
    path: "/test1",
    Icon: AutoAwesomeRoundedIcon,
  },
  {
    name: "Dashboards",
    Icon: DashboardRoundedIcon,
    children: [
      {
        Icon: AssessmentRoundedIcon,
        name: "Analytick",
        path: "/",
      },
      {
        Icon: TocRoundedIcon,
        name: "Table",
        path: "/table",
      },
    ],
  },
  {
    name: "Test1",
    path: "/test1",
    Icon: AutoAwesomeRoundedIcon,
  },
  {
    name: "Dashboards",
    Icon: DashboardRoundedIcon,
    children: [
      {
        Icon: AssessmentRoundedIcon,
        name: "Analytick",
        path: "/",
      },
      {
        Icon: TocRoundedIcon,
        name: "Table",
        path: "/table",
      },
    ],
  },
  {
    name: "Test1",
    path: "/test1",
    Icon: AutoAwesomeRoundedIcon,
  },
];

const line = (
  <hr
    style={{
      flexShrink: 0,
      borderTop: "0px solid rgba(0, 0, 0, 0.08)",
      borderRight: "0px solid rgba(0, 0, 0, 0.08)",
      borderLeft: "0px solid rgba(0, 0, 0, 0.08)",
      height: "0.0625rem",
      margin: "1rem 0px",
      borderBottom: "none",
      opacity: 0.25,
      /* background-color: transparent, */
      backgroundImage:
        "linear-gradient(to right, rgba(255, 255, 255, 0), rgb(255, 255, 255), rgba(255, 255, 255, 0)) !important",
    }}
  />
);

type Props = {
  open: boolean;
  toggleSideBar: () => void;
};

type Menu = User.UserPermRespItemDto & {
  children?: User.UserPermRespItemDto[];
};

const Sidebar = ({ open, toggleSideBar }: Props) => {
  const { permmenu } = useUserStore(
    useShallow(({ permmenu }) => ({ permmenu }))
  );
  const menuTree = useMemo(() => {
    const menuMap = permmenu?.menus.reduce<Record<string, Menu>>(
      (map, menu) => ((map[menu.id] = { ...menu }), map),
      {}
    );
    const menuTree: Menu[] = [];
    permmenu?.menus.forEach((menu) => {
      const parent = menuMap?.[menu.parentId];
      const self = menuMap?.[menu.id]!;
      if (parent) {
        if (!parent.children) {
          parent.children = [];
        }
        parent.children.push(self);
      } else {
        menuTree.push(self);
      }
    });
    return menuTree;
  }, [permmenu?.menus]);

  const renderCollapse = (children: ReactNode) => {
    return (
      <div
        className={`${
          open ? "ml-[10px] opacity-100" : "ml-0 opacity-0"
        } text-sm whitespace-nowrap w-0 overflow-hidden flex-1 shrink flex items-center transition-[margin-left,opacity] transition-default`}
      >
        {children}
      </div>
    );
  };
  const renderMenu = () => {
    return menuTree?.map(({ children, name, router, icon }, index) => {
      if (children) {
        return (
          <Accordion
            className="bg-inherit shadow-none before:hidden my-0"
            key={index}
          >
            <AccordionSummary className="min-h-0" classes={{ content: "m-0" }}>
              <ListItemButton
                component="div"
                className="text-gray-50 h-[52px] hover:bg-[rgba(255,255,255,0.2)] transition-colors transition-default rounded-md my-0.5"
              >
                <span className="w-9 flex justify-center items-center">
                  {/* <Icon /> */}
                </span>
                {renderCollapse(
                  <div className="flex items-center justify-between w-full">
                    <span>{name}</span>
                    <ExpandMoreRoundedIcon
                      className={`${open && "rotate-180"}`}
                    />
                  </div>
                )}
              </ListItemButton>
            </AccordionSummary>
            <AccordionDetails className="py-0">
              {children.map(({ name, router, icon }) => (
                <Link href={router} key={router} className="no-underline">
                  <ListItemButton
                    component="div"
                    className="text-gray-50 h-12 hover:bg-[rgba(255,255,255,0.2)] transition-colors transition-default rounded-md my-0.5"
                  >
                    <span className="w-9 flex justify-center items-center">
                      {/* <Icon /> */}
                    </span>
                    {renderCollapse(name)}
                  </ListItemButton>
                </Link>
              ))}
            </AccordionDetails>
          </Accordion>
        );
      }
      return (
        <Link href={router} className="px-4 no-underline" key={index}>
          <ListItemButton
            component="div"
            className="text-gray-50 h-[52px] hover:bg-[rgba(255,255,255,0.2)] transition-colors transition-default rounded-md my-0.5"
          >
            <span className="w-9 flex justify-center items-center">
              {/* <Icon /> */}
            </span>
            {renderCollapse(name)}
          </ListItemButton>
        </Link>
      );
    });
  };
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      open={open}
      className=""
      classes={{
        paper:
          "m-4 h-[calc(100vh-2rem)] rounded-xl border-0 bg-[linear-gradient(195deg,rgb(66,66,74),rgb(25,25,25))] shadow-[rgba(0,0,0,0.05)_0rem_1.25rem_1.6875rem_0rem]",
      }}
    >
      <div
        className={`${
          open ? "w-[250px]" : "w-24"
        } transition-[width] transition-default h-full overflow-y-auto flex flex-col items-stretch`}
      >
        <Link
          href="/"
          className="flex pt-6 justify-center h-16 shrink-0 px-8 text-xl font-bold text-gray-50 no-underline"
        >
          <span className="w-9 flex justify-center items-center shrink-0">
            <ApiRoundedIcon className="text-3xl" />
          </span>
          {renderCollapse("Mall Admin")}
        </Link>
        {line}
        <Accordion className="bg-inherit shadow-none my-0">
          <AccordionSummary className="min-h-0" classes={{ content: "m-0" }}>
            <ListItemButton
              component="div"
              className="text-gray-50 h-[52px] hover:bg-[rgba(255,255,255,0.2)] transition-colors transition-default rounded-md my-0.5"
            >
              <Avatar src="/img/alice.jpg" className="w-9 h-9 shrink-0" />
              {renderCollapse(
                <div className="flex items-center justify-between w-full">
                  <span>Brooklyn Alice</span>
                  <ExpandMoreRoundedIcon
                    className={`${open && "rotate-180"}`}
                  />
                </div>
              )}
            </ListItemButton>
          </AccordionSummary>
          <AccordionDetails className="py-0">
            <ListItemButton
              component="div"
              className="text-gray-50 h-12 hover:bg-[rgba(255,255,255,0.2)] transition-colors transition-default rounded-md my-0.5"
            >
              <span className="w-9 flex justify-center items-center">
                <AccountCircleRoundedIcon className="text-2xl" />
              </span>
              {renderCollapse(<span>My Profile</span>)}
            </ListItemButton>
            <ListItemButton
              component="div"
              className="text-gray-50 h-12 hover:bg-[rgba(255,255,255,0.2)] transition-colors transition-default rounded-md my-0.5"
            >
              <span className="w-9 flex justify-center items-center">
                <SettingsRoundedIcon className="text-2xl" />
              </span>
              {renderCollapse(<span>Settings</span>)}
            </ListItemButton>
            <ListItemButton
              component="div"
              className="text-gray-50 h-12 hover:bg-[rgba(255,255,255,0.2)] transition-colors transition-default rounded-md my-0.5"
            >
              <span className="w-9 flex justify-center items-center">
                <LogoutRoundedIcon className="text-2xl" />
              </span>
              {renderCollapse(<span>Logout</span>)}
            </ListItemButton>
          </AccordionDetails>
        </Accordion>
        {line}
        {renderMenu()}
      </div>
    </Drawer>
  );
};

export default Sidebar;
