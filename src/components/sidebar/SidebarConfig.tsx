import type { ReactNode } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import edit_square from "../../assets/edit_square.svg"; 
import chat_bubble from "../../assets/chat_bubble.svg";
import login_icon from "../../assets/login_icon.svg";
export interface SidebarUserItem {
  key: "login";
  label: string;
  render: ReactNode;
}

export const sidebarUserItems: SidebarUserItem[] = [
  {
    key: "login",
    label: "Login",
    render: (
      <img
        src={login_icon}
        alt="Login"
        style={{
          width: 22,
          height: 22,
          objectFit: "contain",
          verticalAlign: "middle",
          filter: "drop-shadow(0 2px 6px #4a90e2aa)"
        }}
      />
    ),
  },
];
export interface SidebarNavItem {
  key: "chats";
  label: string;
  render: ReactNode;
}

export const sidebarNavItems: SidebarNavItem[] = [
  {
    key: "chats",
    label: "Chats",
    render: (
      <img
        src={chat_bubble}
        alt="Chats"
        style={{
          width: 22,
          height: 22,
          objectFit: "contain",
          verticalAlign: "middle",
          filter: "drop-shadow(0 2px 6px #4a90e2aa)"
        }}
      />
    ),
  },
];

const iconStyle = { fontSize: 24, color: "#4a90e2" }; // blue for sidebar icons

export interface SidebarTopItem {
  key: "menu" | "search";
  render: ReactNode;
}

export interface SidebarActionItem {
  key: "newChat";
  label: string;
  render: ReactNode;
}

export const sidebarTopItems: SidebarTopItem[] = [
  {
    key: "menu",
    render: <MenuIcon sx={iconStyle} />,
  },
  {
    key: "search",
    render: <SearchIcon sx={iconStyle} />,
  },
];

export const sidebarActions: SidebarActionItem[] = [
  {
    key: "newChat",
    label: "New chat",
    render: (
      <img
        src={edit_square}
        alt="New chat"
        style={{
          width: 22,
          height: 22,
          objectFit: "contain",
          verticalAlign: "middle",
          filter: "invert(41%) sepia(98%) saturate(749%) hue-rotate(181deg) brightness(95%) contrast(92%)" // blue tint
        }}
      />
    ),
  },
];
