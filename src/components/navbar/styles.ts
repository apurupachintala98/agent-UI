// styles.ts
import type { SxProps, Theme } from "@mui/material";

// Main header container
export const headerContainer: SxProps<Theme> = (theme) => ({
  display: "flex",
  alignItems: "center",
  height: `calc(${theme.spacing(8)} + 0px)`, // 64px using theme spacing
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  borderColor: theme.palette.divider,
  backgroundColor: theme.palette.background.paper,
});

// Typography for the chat title
export const selectedMenuItem: SxProps<Theme> = {
  '&.Mui-selected': {
    backgroundColor: 'action.selected',
    '& .MuiTypography-root': {
      color: 'text.primary',
    },
  },
};

// Model switcher button
export const modelButton: SxProps<Theme> = (theme) => ({
  textTransform: "none",
  borderRadius: 2, 
  minHeight: "auto",
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(0.5),
  paddingBottom: theme.spacing(0.5),
  gap: theme.spacing(1),
  fontSize: theme.typography.body1.fontSize,
  color: theme.palette.text.primary,
  backgroundColor: "transparent",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
});

// Menu paper
export const modelMenu: SxProps<Theme> = (theme) => ({
  "& .MuiPaper-root": {
    borderRadius: 2,
    width: theme.spacing(37.5), // 300px
    maxWidth: "90vw",
  },
});


// Typography inside menu header
export const menuHeader: SxProps<Theme> = (theme) => ({
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(0.5),
  color: theme.palette.text.secondary,
});

// Avatar icon button
export const avatarIcon: SxProps<Theme> = (theme) => ({
  padding: theme.spacing(0.5),
});

// Avatar image size
export const avatarImage: SxProps<Theme> = (theme) => ({
  width: theme.spacing(4),  // 32px
  height: theme.spacing(4), // 32px
});
