// src/app/styles.ts
import type { SxProps, Theme } from "@mui/material";

export const mainContainerStyles: SxProps<Theme> = {
  display: "flex",
  height: "100vh",
  overflow: "hidden",
};

export const contentWrapperStyles: SxProps<Theme> = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
};

export const innerContentStyles: SxProps<Theme> = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  px: 2,
  pt: 4,
};

export const greetingContainerStyles: SxProps<Theme> = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

export const scrollableChatAreaStyles: SxProps<Theme> = {
  flex: 1,
  overflow: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  px: 2,
  pt: 2,
};

export const inputBarContainerStyles: SxProps<Theme> = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  py: 2,
  px: 2,
  borderTop: "1px solid rgba(0,0,0,0.05)",
  backgroundColor: "background.paper",
};

export const contentMaxWidthStyles: SxProps<Theme> = {
  width: "100%",
  maxWidth: 700,
};
