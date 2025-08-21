import { useEffect, useState, type JSX } from "react";
import { sendToAgent } from "../api/api";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

import type { ChatSession } from "../types/chat";

type Message = {
  id?: string;
  role: "user" | "assistant";
  text?: string;
  content?: string | JSX.Element;
};

export function useChatManager() {
  const [chats, setChats] = useState<ChatSession[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  // Initialize first chat session on mount
  useEffect(() => {
    if (chats.length === 0) {
      const defaultChat: ChatSession = {
        id: Date.now().toString(), // temporary local ID for tracking
        title: "Untitled Chat",
        messages: [],
        session_id: "", // initially empty
      };
      setChats([defaultChat]);
      setActiveChatId(defaultChat.id);
    }
  }, []);

  const newChat = () => {
    const chat: ChatSession = {
      id: Date.now().toString(),
      title: "New Chat",
      messages: [],
      session_id: "",
    };
    setChats((prev) => [chat, ...prev]);
    setActiveChatId(chat.id);
    return chat.id;
  };

  // const sendMessage = async (text: string) => {
  //   if (!activeChatId) return;

  //   const userMsg: Message = {
  //     id: crypto.randomUUID(),
  //     role: "user",
  //     text,
  //   };

  //   const typingMsg: Message = {
  //     id: crypto.randomUUID(),
  //     role: "assistant",
  //     content: "__typing__",
  //   };

  //   let isFirstMessage = false;

  //   setChats((prevChats) =>
  //     prevChats.map((chat) => {
  //       if (chat.id !== activeChatId) return chat;

  //       isFirstMessage = chat.messages.length === 0;
  //       const firstSentence = isFirstMessage
  //         ? text.split(/[.?!]/)[0].trim()
  //         : chat.title;

  //       return {
  //         ...chat,
  //         title: isFirstMessage ? firstSentence || "New Chat" : chat.title,
  //         messages: [...chat.messages, userMsg, typingMsg],
  //       };
  //     })
  //   );

  //   try {
  //     const chat = chats.find((c) => c.id === activeChatId);
  //     const currentSessionId = chat?.session_id || "";

  //     const response = await sendToAgent(text, isFirstMessage ? "" : currentSessionId);
  //     console.log("Agent API response:", response);

  //     let replyContent: string | JSX.Element = "Agent did not return a valid reply.";
  //     let newSessionId = "";

  //     if (
  //       typeof response === "object" &&
  //       response !== null &&
  //       "result" in response
  //     ) {
  //       const { result, session_id } = response;
  //       newSessionId = session_id;

  //       const yamlMatch = result.match(/```yaml([\s\S]*?)```/i);

  //       if (yamlMatch) {
  //         const yamlCode = yamlMatch[1].trim();
  //         const restText = result.replace(yamlMatch[0], "").trim();

  //         replyContent = (
  //           <div>
  //             <div>
  //               <strong>YAML Output:</strong>
  //               <SyntaxHighlighter language="yaml" style={oneLight}>
  //                 {yamlCode}
  //               </SyntaxHighlighter>
  //             </div>
  //             {restText && (
  //               <div style={{ whiteSpace: "pre-wrap", marginTop: "1rem" }}>
  //                 {restText}
  //               </div>
  //             )}
  //           </div>
  //         );
  //       } else {
  //         replyContent = <div style={{ whiteSpace: "pre-wrap" }}>{result}</div>;
  //       }
  //     }

  //     const assistantMsg: Message = {
  //       id: crypto.randomUUID(),
  //       role: "assistant",
  //       content: replyContent,
  //     };

  //     setChats((prevChats) =>
  //       prevChats.map((chat) => {
  //         if (chat.id !== activeChatId) return chat;
  //         const updatedMessages = chat.messages.map((m) =>
  //           m.role === "assistant" && m.content === "__typing__" ? assistantMsg : m
  //         );
  //         return {
  //           ...chat,
  //           messages: updatedMessages,
  //           session_id: newSessionId || chat.session_id,
  //         };
  //       })
  //     );
  //   } catch (err) {
  //     console.error("Failed to fetch agent response", err);
  //     setChats((prevChats) =>
  //       prevChats.map((chat) => {
  //         if (chat.id !== activeChatId) return chat;
  //         const updatedMessages = chat.messages.map((m) =>
  //           m.role === "assistant" && m.content === "__typing__"
  //             ? {
  //               ...m,
  //               id: crypto.randomUUID(),
  //               content: "Agent failed to respond.",
  //             }
  //             : m
  //         );
  //         return {
  //           ...chat,
  //           messages: updatedMessages,
  //         };
  //       })
  //     );
  //   }
  // };

  const sendMessage = async (text: string) => {
    if (!activeChatId) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      text,
    };

    const typingMsg: Message = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: "__typing__",
    };

    let isFirstMessage = false;

    setChats((prevChats) =>
      prevChats.map((chat) => {
        if (chat.id !== activeChatId) return chat;

        isFirstMessage = chat.messages.length === 0;
        const firstSentence = isFirstMessage
          ? text.split(/[.?!]/)[0].trim()
          : chat.title;

        return {
          ...chat,
          title: isFirstMessage ? firstSentence || "New Chat" : chat.title,
          messages: [...chat.messages, userMsg, typingMsg],
        };
      })
    );

    try {
      const chat = chats.find((c) => c.id === activeChatId);
      const currentSessionId = chat?.session_id || "";

      const response = await sendToAgent(text, isFirstMessage ? "" : currentSessionId);
      console.log("Agent API response:", response);

      let assistantMessages: Message[] = [];
      let newSessionId = "";

      if (
        typeof response === "object" &&
        response !== null &&
        "result" in response
      ) {
        const { result, session_id } = response;
        newSessionId = session_id;

        const yamlMatch = result.match(/```yaml([\s\S]*?)```/i);

        if (yamlMatch) {
          const yamlCode = yamlMatch[1].trim();
          const restText = result.replace(yamlMatch[0], "").trim();

          // YAML bubble
          assistantMessages.push({
            id: crypto.randomUUID(),
            role: "assistant",
            content: (
              <div
                style={{
                  borderRadius: "12px",
                  padding: "12px",
                  maxWidth: "100%",
                  overflowX: "auto",
                }}
              >
                <SyntaxHighlighter language="yaml" style={oneLight}>
                  {yamlCode}
                </SyntaxHighlighter>
              </div>
            ),
          });

          // Text bubble (if exists)
          if (restText) {
            assistantMessages.push({
              id: crypto.randomUUID(),
              role: "assistant",
              content: (
                <div
                  style={{
                    background: "#FFFDE7", // softer yellow
                    borderRadius: "12px",
                    padding: "12px",
                    maxWidth: "80%",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {restText}
                </div>
              ),
            });
          }
        } else {
          // Plain text only
          assistantMessages.push({
            id: crypto.randomUUID(),
            role: "assistant",
            content: (
              <div
                style={{
                   background: "#FFFDE7",
                  borderRadius: "12px",
                  padding: "12px",
                  maxWidth: "80%",
                  whiteSpace: "pre-wrap",
                }}
              >
                {result}
              </div>
            ),
          });
        }
      } else {
        // Fallback if API doesn’t return a valid result
        assistantMessages.push({
          id: crypto.randomUUID(),
          role: "assistant",
          content: "Agent did not return a valid reply.",
        });
      }

      // Replace typing message with new messages
      setChats((prevChats) =>
        prevChats.map((chat) => {
          if (chat.id !== activeChatId) return chat;

          const filtered = chat.messages.filter(
            (m) => !(m.role === "assistant" && m.content === "__typing__")
          );

          // add all assistant messages separately
          const updatedMessages = [...filtered, ...assistantMessages];

          return {
            ...chat,
            messages: updatedMessages,
            session_id: newSessionId || chat.session_id,
          };
        })
      );
    } catch (err) {
      console.error("Failed to fetch agent response", err);
      setChats((prevChats) =>
        prevChats.map((chat) => {
          if (chat.id !== activeChatId) return chat;
          const updatedMessages = chat.messages.map((m) =>
            m.role === "assistant" && m.content === "__typing__"
              ? {
                ...m,
                id: crypto.randomUUID(),
                content: "Agent failed to respond.",
              }
              : m
          );
          return {
            ...chat,
            messages: updatedMessages,
          };
        })
      );
    }
  };

  const renameChat = (updatedChat: ChatSession) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === updatedChat.id ? { ...chat, title: updatedChat.title } : chat
      )
    );
  };

  const deleteChat = (chatToDelete: ChatSession) => {
    setChats((prev) => prev.filter((c) => c.id !== chatToDelete.id));
    if (chatToDelete.id === activeChatId) {
      setActiveChatId((prev) => {
        const remaining = chats.filter((c) => c.id !== chatToDelete.id);
        return remaining.length > 0 ? remaining[0].id : null;
      });
    }
  };

  const currentChat = chats.find((chat) => chat.id === activeChatId) || null;

  return {
    chats,
    activeChatId,
    currentChat,
    newChat,
    sendMessage,
    setActiveChatId,
    renameChat,
    deleteChat,
  };
}

