// import { useEffect, useState, type JSX } from "react";
// import { v4 as uuidv4 } from "uuid";
// import { sendToAgent } from "../api/api";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

// import type { ChatSession, Message as BaseMessage } from "../types/chat";

// type Message = {
//   id: string;
//   role: "user" | "assistant";
//   text?: string; // used for simple strings
//   content?: string | JSX.Element; // used for JSX (like YAML-highlighted blocks)
// };


// export function useChatManager() {
//   const [chats, setChats] = useState<ChatSession[]>([]);
//   const [activeChatId, setActiveChatId] = useState<string | null>(null);

//   // Initialize default chat on mount
//   useEffect(() => {
//     if (chats.length === 0) {
//       const defaultChat: ChatSession = {
//         id: uuidv4(),
//         title: "Untitled Chat",
//         messages: [],
//         session_id: uuidv4().replace(/-/g, "").substring(0, 6),
//       };
//       setChats([defaultChat]);
//       setActiveChatId(defaultChat.id);
//     }
//   }, []);

//   // Create a new chat
//   const newChat = () => {
//     const chat: ChatSession = {
//       id: uuidv4(),
//       title: "New Chat",
//       messages: [],
//       session_id: uuidv4().replace(/-/g, "").substring(0, 6),
//     };
//     setChats((prev) => [chat, ...prev]);
//     setActiveChatId(chat.id);
//     return chat.id;
//   };

//   const sendMessage = async (text: string) => {
//   if (!activeChatId) return;

//   const userMsg: Message = {
//     id: uuidv4(),
//     role: "user",
//     text,
//   };

//   const typingMsg: Message = {
//     id: uuidv4(),
//     role: "assistant",
//     text: "__typing__",
//   };

//   let currentSessionId = "";
//    let isFirstMessage = false;

//   setChats((prevChats) =>
//     prevChats.map((chat) => {
//       if (chat.id !== activeChatId) return chat;
      
//       const isFirstMessage = chat.messages.length === 0;
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
//     const chat = chats.find((c:any) => c.id === activeChatId);
//     currentSessionId = chat?.session_id || "";
//     const response = await sendToAgent(text, isFirstMessage ? "" : currentSessionId);
//     console.log("Agent API response:", response);

//     let replyContent: string | JSX.Element = "Agent did not return a valid reply.";

//     if (typeof response === "string") {
//       const yamlMatch = response.match(/```yaml([\s\S]*?)```/i);

//       if (yamlMatch) {
//         const yamlCode = yamlMatch[1].trim();
//         const restText = response.replace(yamlMatch[0], "").trim();

//         replyContent = (
//           <div>
//             <div>
//               <strong>YAML Output:</strong>
//               <SyntaxHighlighter language="yaml" style={vscDarkPlus}>
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
//         replyContent = <div style={{ whiteSpace: "pre-wrap" }}>{response}</div>;
//       }
//     }

//     let session_id_from_response = "";
//     if (typeof response === "object" && "session_id" in response) {
//       session_id_from_response = response.session_id;
//     }

//     const assistantMsg: Message = {
//       id: uuidv4(),
//       role: "assistant",
//       content: replyContent,
//     };

//     setChats((prevChats) =>
//       prevChats.map((chat) => {
//         if (chat.id !== activeChatId) return chat;
//         const updatedMessages = chat.messages.map((m) =>
//           m.text === "__typing__" ? assistantMsg : m
//         );
//         return {
//           ...chat,
//           messages: updatedMessages,
//           session_id: session_id_from_response || chat.session_id,
//         };
//       })
//     );
//   } catch (err) {
//     console.error("Failed to fetch agent response", err);
//     setChats((prevChats) =>
//       prevChats.map((chat) => {
//         if (chat.id !== activeChatId) return chat;
//         const updatedMessages = chat.messages.map((m) =>
//           m.text === "__typing__"
//             ? { ...m, text: "Agent failed to respond." }
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


//   const renameChat = (updatedChat: ChatSession) => {
//     setChats((prevChats) =>
//       prevChats.map((chat) =>
//         chat.id === updatedChat.id ? { ...chat, title: updatedChat.title } : chat
//       )
//     );
//   };

//   const deleteChat = (chatToDelete: ChatSession) => {
//     setChats((prev) => prev.filter((c) => c.id !== chatToDelete.id));
//     if (chatToDelete.id === activeChatId) {
//       setActiveChatId((prev) => {
//         const remaining = chats.filter((c) => c.id !== chatToDelete.id);
//         return remaining.length > 0 ? remaining[0].id : null;
//       });
//     }
//   };

//   const currentChat = chats.find((chat) => chat.id === activeChatId) || null;

//   return {
//     chats,
//     activeChatId,
//     currentChat,
//     newChat,
//     sendMessage,
//     setActiveChatId,
//     renameChat,
//     deleteChat,
//   };
// }


import { useEffect, useState, type JSX } from "react";
import { sendToAgent } from "../api/api";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

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

  const sendMessage = async (text: string) => {
    if (!activeChatId) return;

    const userMsg: Message = {
      role: "user",
      text,
    };

    const typingMsg: Message = {
  role: "assistant",
  content: "__typing__",
};

    let isFirstMessage = false;

    // Add user's message and typing indicator
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

  let replyContent: string | JSX.Element = "Agent did not return a valid reply.";
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

      replyContent = (
        <div>
          <div>
            <strong>YAML Output:</strong>
            <SyntaxHighlighter language="yaml" style={vscDarkPlus}>
              {yamlCode}
            </SyntaxHighlighter>
          </div>
          {restText && (
            <div style={{ whiteSpace: "pre-wrap", marginTop: "1rem" }}>
              {restText}
            </div>
          )}
        </div>
      );
    } else {
      replyContent = <div style={{ whiteSpace: "pre-wrap" }}>{result}</div>;
    }
  }

  const assistantMsg: Message = {
    role: "assistant",
    content: replyContent,
  };

  setChats((prevChats) =>
    prevChats.map((chat) => {
      if (chat.id !== activeChatId) return chat;
      const updatedMessages = chat.messages.map((m) =>
        m.role === "assistant" && m.content === "__typing__" ? assistantMsg : m
      );
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
          ? { ...m, content: "Agent failed to respond." }
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

