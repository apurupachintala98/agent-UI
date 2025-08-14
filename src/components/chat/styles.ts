import type { SxProps, Theme } from "@mui/material";

// ChatArea Styles

export const chatAreaContainer: SxProps<Theme> = (theme) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  overflowY: "auto",
  scrollbarWidth: "none", // Firefox
  "&::-webkit-scrollbar": {
    display: "none", // Chrome/Safari
  },
});

export const assistantMessageContainer = (
  isAfterUser: boolean
): SxProps<Theme> => (theme) => ({
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(0.5),
  paddingBottom: theme.spacing(0.5),
  marginTop: theme.spacing(isAfterUser ? 3 : 0.5),
});

export const assistantMessageDivider: SxProps<Theme> = (theme) => ({
  height: "1px",
  backgroundColor: theme.palette.divider,
  opacity: 0.03,
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(1.5),
});

// ChatBubble Styles

export const chatBubbleWrapper = (isUser: boolean): SxProps<Theme> => (
  theme
) => ({
  display: "flex",
  justifyContent: isUser ? "flex-end" : "flex-start",
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(0.5),
  paddingBottom: theme.spacing(0.5),
});

export const chatBubblePaper = (isUser: boolean, theme: Theme): SxProps<Theme> => ({
  padding: theme.spacing(2),
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  backgroundColor: isUser
    ? 'linear-gradient(90deg, #e0eafc 0%, #cfdef3 100%)' // User: soft blue gradient
    : '#ffffff', // Assistant: soft, warm solid yellow
  color: isUser
    ? '#1a237e' // User: deep blue text
    : '#000000', // Assistant: rich brown text
  // borderRadius: theme.spacing(3),
  maxWidth: isUser ? "60vw" : "48vw",
  minWidth: isUser ? undefined : "120px",
  minHeight: isUser ? undefined : "40px",
  maxHeight: isUser ? undefined : "240px",
  overflowY: isUser ? undefined : "auto",
  whiteSpace: "pre-wrap",
  boxShadow: isUser
    ? '0 2px 8px 0 rgba(76, 110, 245, 0.08)'
    : 'none',
  // border: isUser
  //   ? '1px solid #b6c6e6'
  //   : '1px solid #ffe0a3',
  fontWeight: 500,
});

