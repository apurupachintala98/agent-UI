// src/components/sidebar/Sidebar.tsx
import React, { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import ChatSidebarItem from "./ChatSidebarItem";
import SidebarItem from "./SidebarItem";
import { sidebarTopItems, sidebarActions } from "./SidebarConfig";
import type { SidebarTopItem, SidebarActionItem } from "./SidebarConfig";
import type { ChatSession } from "../../types/chat";
import logo from "../../assets/Logo";

import {
  sidebarContainer,
  sidebarToggleWrapper,
  sidebarHeaderStack,
  sidebarFullWidthWrapper,
  sectionHeaderWrapper,
  sectionCaption,
  chatListWrapper,
} from "./styles";

interface SidebarProps {
  chats: ChatSession[];
  activeChatId: string | null;
  onSelectChat: (id: string) => void;
  onNewChat: () => void;
  onRenameChat: (chat: ChatSession) => void;
  onDeleteChat: (chat: ChatSession) => void;
}

export default function Sidebar({
  chats,
  activeChatId,
  onSelectChat,
  onNewChat,
  onRenameChat,
  onDeleteChat,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => setCollapsed((c) => !c);

  const menuItem = sidebarTopItems.find((i) => i.key === "menu")! as SidebarTopItem;
  const searchItem = sidebarTopItems.find((i) => i.key === "search")! as SidebarTopItem;
  const newChatAction = sidebarActions.find((a) => a.key === "newChat")! as SidebarActionItem;

  const handleShareChat = (chat: ChatSession) => {
    console.log("Share chat:", chat);
  };
  const handleArchiveChat = (chat: ChatSession) => {
    console.log("Archived chat:", chat);
  };

  return (
    <Box
      sx={{
        ...sidebarContainer,
        width: collapsed ? 70 : 320,
        minWidth: collapsed ? 70 : 240,
        maxWidth: collapsed ? 70 : 360,
        alignItems: collapsed ? "center" : "flex-start",
      }}
    >
      {/* top toggle */}
      {/* {collapsed ? (
        <Box sx={sidebarToggleWrapper}>
          <SidebarItem icon={menuItem.render} onClick={toggle} />
        </Box>
      ) : (
        <Stack sx={sidebarHeaderStack} spacing={1}>
          <SidebarItem icon={menuItem.render} onClick={toggle} />
        </Stack>
      )} */}

      {collapsed ? (
  <Box sx={sidebarToggleWrapper}>
    <SidebarItem icon={menuItem.render} onClick={toggle} />
  </Box>
) : (
  <Stack
    direction="row"
    alignItems="center"
    spacing={1}
    sx={sidebarHeaderStack}
  >
    <SidebarItem icon={menuItem.render} onClick={toggle} />
    <Box component="img" src={logo} alt="Logo" sx={{ height: 32 }} />
  </Stack>
)}

      {/* new chat */}
      <Box sx={{ ...sidebarFullWidthWrapper, mt: collapsed ? 2 : 3 }}>
        <SidebarItem
          icon={newChatAction.render}
          label={collapsed ? undefined : newChatAction.label}
          fullWidth={!collapsed}
          onClick={onNewChat}
        />
      </Box>

      {/* search */}
      <Box sx={sidebarFullWidthWrapper}>
        <SidebarItem
          icon={searchItem.render}
          label={collapsed ? undefined : "Search chats"}
          fullWidth={!collapsed}
          onClick={() => { /* search */ }}
        />
      </Box>

      {/* section header */}
      <Box
        sx={{
          ...sectionHeaderWrapper,
          mt: collapsed ? 3 : 4,
          px: collapsed ? 0 : 1.5,
        }}
      >
        {!collapsed && (
          <Typography variant="caption" sx={sectionCaption}>
            Chats
          </Typography>
        )}
      </Box>

      {/* chat list */}
      <Box sx={{ ...chatListWrapper, mt: 0.5 }}>
        {!collapsed &&
          chats.map((chat) => (
            <ChatSidebarItem
              key={chat.id}
              chat={chat}
              selected={chat.id === activeChatId}
              onClick={() => onSelectChat(chat.id)}
              onShare={handleShareChat}
              onRename={onRenameChat}
              onArchive={handleArchiveChat}
              onDelete={onDeleteChat}
            />
          ))}
      </Box>
    </Box>
  );
}
