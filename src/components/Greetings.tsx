import { Typography } from "@mui/material";
import { useMemo } from "react";

interface GreetingMessageProps {
  userName?: string;
}

export default function GreetingMessage({ userName = "friend" }: GreetingMessageProps) {
  const greetings = useMemo(() => [
    "Where should we begin?",
    "Ready when you are.",
    "What's on the agenda today?",
    "What's on your mind today?",
    `Good to see you, ${userName}.`,
    `How can I help, ${userName}?`,
  ], [userName]);

  const message = useMemo(() => {
    const index = Math.floor(Math.random() * greetings.length);
    return greetings[index];
  }, [greetings]);

  return (
  <Typography
    variant="h4"
    mb={4}
    className="gradient-fill-text"
    sx={{
      fontSize: 40,
      fontWeight: 600,
    }}
  >
    {message}
  </Typography>
);

}
