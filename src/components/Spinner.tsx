// src/components/DotsLoading.tsx
import { Box, CircularProgress } from "@mui/material";

export default function DotsLoading() {
  return (
    <Box
      display="flex"
      justifyContent="flex-start"
      alignItems="center"
      px={2}
      py={2}
    >
      <Box
        sx={{
          animation: 'gradientFlash 2s infinite linear',
          background: 'linear-gradient(270deg, #4adede, #3cb0d8, #4adede)',
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        <CircularProgress size={32} thickness={5} color="secondary" />
      </Box>
    </Box>
  );
}
