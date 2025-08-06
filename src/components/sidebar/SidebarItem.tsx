import { Box, Typography } from "@mui/material";

export interface SidebarItemProps {
  icon?: React.ReactNode;
  label?: string;
  fullWidth?: boolean;
  selected?: boolean;
  onClick?: () => void;
}

export default function SidebarItem({
  icon,
  label,
  onClick,
  fullWidth = false,
}: SidebarItemProps) {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: label ? "flex-start" : "center",
        gap: label ? 1.5 : 0,
        px: 1,
        py: 0.75,
        width: fullWidth ? "100%" : 40,
        height: 40,
        borderRadius: 2,
        cursor: "pointer",
        transition: "background-color 0.2s ease",
        "&:hover": { backgroundColor: "#e0e0e0" },
      }}
    >
      {icon}
      {label && (
        <Typography
          variant="body2"
          noWrap
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            maxWidth: "100%",
          }}
        >
          {label}
        </Typography>
      )}
    </Box>
  );
}
