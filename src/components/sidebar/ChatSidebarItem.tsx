import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import IosShareIcon from "@mui/icons-material/IosShare";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ConfirmDialog from "../ConfirmDialog";
import EditableText from "../EditableText";
import type { ChatSession } from "../../types/chat";
import {
  sidebarItemBox,
  chatTitleText,
  iconButton,
  menuPaper,
  menuItemContent,
  iconSize,
  deleteMenuItem,
} from "./styles";

interface ChatSidebarItemProps {
  chat: ChatSession;
  selected: boolean;
  onClick: () => void;
  onShare?: (chat: ChatSession) => void;
  onRename?: (chat: ChatSession) => void;
  onArchive?: (chat: ChatSession) => void;
  onDelete?: (chat: ChatSession) => void;
}

type MenuAction = "share" | "rename" | "archive" | "delete";

export default function ChatSidebarItem({
  chat,
  onClick,
  onShare,
  onRename,
  onArchive,
  onDelete,
}: ChatSidebarItemProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [hovered, setHovered] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuAction = (action: MenuAction) => {
    switch (action) {
      case "share":
        handleMenuClose();
        return onShare?.(chat);
      case "rename":
        setIsRenaming(true);
        handleMenuClose();
        return;
      case "archive":
        handleMenuClose();
        return onArchive?.(chat);
      case "delete":
        handleMenuClose();
        return setShowConfirmDelete(true);
    }
  };

  return (
    <Box
      // disable normal click-to-select while renaming
      onClick={isRenaming ? undefined : onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        ...sidebarItemBox,
        backgroundColor: hovered ? "#eeeeee" : "transparent",
        boxShadow: hovered ? "0px 1px 3px rgba(0, 0, 0, 0.06)" : "none",
      }}
    >
      {isRenaming ? (
        <EditableText
          key={chat.id}
          value={chat.title || ""}
          onSubmit={(newTitle) => {
            onRename?.({ ...chat, title: newTitle });
            setIsRenaming(false);
          }}
           onCancel={() => setIsRenaming(false)}
        />
      ) : (
        <Typography variant="body2" noWrap sx={chatTitleText}>
          {chat.title || "Untitled Chat"}
        </Typography>
      )}

      <Box
        sx={{
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.2s ease",
          display: "flex",
          alignItems: "center",
        }}
      >
        <IconButton
          size="small"
          onClick={handleMenuOpen}
          sx={iconButton}
        >
          <MoreHorizIcon sx={{ fontSize: iconSize }} />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          onClick={(e) => e.stopPropagation()}
          PaperProps={{ sx: menuPaper }}
          disableRestoreFocus  // stops MUI from yanking focus back
        >
          <MenuItem onClick={() => handleMenuAction("share")}>
            <Box sx={menuItemContent}>
              <IosShareIcon sx={{ fontSize: iconSize }} />
              <Typography variant="body2">Share</Typography>
            </Box>
          </MenuItem>

          <MenuItem onClick={() => handleMenuAction("rename")}>
            <Box sx={menuItemContent}>
              <EditOutlinedIcon sx={{ fontSize: iconSize }} />
              <Typography variant="body2">Rename</Typography>
            </Box>
          </MenuItem>

          <Divider />

          <MenuItem onClick={() => handleMenuAction("archive")}>
            <Box sx={menuItemContent}>
              <Inventory2OutlinedIcon sx={{ fontSize: iconSize }} />
              <Typography variant="body2">Archive</Typography>
            </Box>
          </MenuItem>

          <MenuItem
            onClick={() => handleMenuAction("delete")}
            sx={deleteMenuItem}
          >
            <Box sx={menuItemContent}>
              <DeleteOutlineIcon sx={{ fontSize: iconSize }} />
              <Typography variant="body2">Delete</Typography>
            </Box>
          </MenuItem>
        </Menu>
      </Box>

      <ConfirmDialog
        open={showConfirmDelete}
        title="Delete Chat"
        content={
          <>
            Are you sure you want to delete this chat? All messages will be{" "}
            <span style={{ textDecoration: "underline" }}>
              permanently removed
            </span>
            .
          </>
        }
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onCancel={() => setShowConfirmDelete(false)}
        onConfirm={() => {
          setShowConfirmDelete(false);
          onDelete?.(chat);
        }}
      />
    </Box>
  );
}