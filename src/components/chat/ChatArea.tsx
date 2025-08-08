import { useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";

import Spinner from "../Spinner";
import ChatBubble from "./ChatBubble";
import * as styles from "./styles";
import userIcon from "../../assets/user_icon.svg";
import assistantIcon from "../../assets/assistant_icon.svg";
import AnimatedAssistantIcon from "./AnimatedAssistantIcon";

export interface Message {
  id: string;
  role: "user" | "assistant";
  text?: string;
  content?: string | JSX.Element; // NEW: for assistant messages
}


export interface ChatAreaProps {
  messages: Message[];
}

export default function ChatArea({ messages }: ChatAreaProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box sx={styles.chatAreaContainer}>
      {messages.map((m, i) => {
        const prev = messages[i - 1];
        const isAfterUser = prev?.role === "user";

        if (m.role === "assistant" && m.content === "__typing__") {
          return (
            <Box key={m.id} sx={{ display: "flex", alignItems: "flex-end", justifyContent: "flex-start", gap: 1 }}>
              <AnimatedAssistantIcon />
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Spinner />
              </Box>
            </Box>
          );
        }

        if (m.role === "user") {
          return (
            <Box key={m.id} sx={{ display: "flex", alignItems: "flex-end", justifyContent: "flex-end", gap: 1 }}>
              <ChatBubble role="user">{m.text}</ChatBubble>
              <img src={userIcon} alt="User" style={{ width: 28, height: 28, marginLeft: 4 }} />
            </Box>
          );
        }

        // Assistant response in a visually appealing bubble
        return (
          <Box key={m.id} sx={{ display: "flex", alignItems: "flex-end", justifyContent: "flex-start", gap: 1 }}>
            <img src={assistantIcon} alt="Assistant" style={{ width: 28, height: 28, marginRight: 4 }} />
            <ChatBubble role="assistant">
               {typeof m.content === "string"
          ? <Typography sx={{ whiteSpace: "pre-wrap" }}>{m.content}</Typography>
          : m.content ?? <Typography sx={{ whiteSpace: "pre-wrap" }}>{m.text}</Typography>}
            </ChatBubble>
          </Box>
        );

      })}
      <div ref={scrollRef} />
    </Box>
  );
}
