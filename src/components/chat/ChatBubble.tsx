import { Paper, Typography, Box, useTheme } from "@mui/material";
import * as styles from "./styles";

export interface ChatBubbleProps {
  role: "user" | "assistant";
  children: React.ReactNode;
}

import Spinner from "../Spinner";

export default function ChatBubble({ role, children }: ChatBubbleProps) {
  const isUser = role === "user";
  const theme = useTheme();

  // Show spinner if assistant is typing
  if (role === "assistant" && children === "__typing__") {
    return (
      <Box sx={styles.chatBubbleWrapper(false)}>
        <Paper elevation={0} sx={styles.chatBubblePaper(false, theme)}>
          <Spinner />
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={styles.chatBubbleWrapper(isUser)}>
      <Paper elevation={0} sx={styles.chatBubblePaper(isUser, theme)}>
        <Typography variant="body1">{children}</Typography>
      </Paper>
    </Box>
  );
}
