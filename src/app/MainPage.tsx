import { Box } from "@mui/material";
import { useChatManager } from "../hooks/useChatManager";
//import { useModelSelector } from "../hooks/useModelSelector";

import Sidebar from "../components/sidebar/SideBar";
//import Header from "../components/navbar/Header";
//import { models } from "../components/chat/models/modelConfig";
import InputBar from "../components/InputBar";
import ChatArea from "../components/chat/ChatArea";
import GreetingMessage from "../components/Greetings";


import * as styles from "./styles"; 

export default function MainPage() {
  const {
    chats,
    activeChatId,
    currentChat,
    newChat,
    sendMessage,
    setActiveChatId,
    renameChat,
    deleteChat
  } = useChatManager();

  const hasSubmitted = !!currentChat && currentChat.messages.length > 0;

  //const { selectedModel, setSelectedModel, chatTitle } = useModelSelector(models);

  const handleUserSubmit = (msg: string) => {
    sendMessage(msg);
  };

  return (
    <Box sx={styles.mainContainerStyles}>
      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        onSelectChat={setActiveChatId}
        onNewChat={newChat}
        onRenameChat={renameChat}
        onDeleteChat={deleteChat}
      />

      <Box sx={styles.contentWrapperStyles}>
        {/* <Header
          chatTitle={chatTitle}
          model={selectedModel ?? ""}
          models={models}
          onModelChange={setSelectedModel}
          avatarSrc="/path/to/avatar.png"
          onAvatarClick={() => {}}
        /> */}

        <Box sx={styles.innerContentStyles}>
          {!hasSubmitted ? (
            <Box sx={styles.greetingContainerStyles}>
              <GreetingMessage userName="Balaji" />
              <InputBar onSubmit={handleUserSubmit} />
            </Box>
          ) : (
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
              {/* Scrollable chat area */}
              <Box sx={styles.scrollableChatAreaStyles} className="hide-scrollbar">
                <Box sx={styles.contentMaxWidthStyles}>
                  <ChatArea messages={currentChat?.messages ?? []} />
                </Box>
              </Box>

              {/* Locked input bar */}
              <Box sx={styles.inputBarContainerStyles}>
                <Box sx={styles.contentMaxWidthStyles}>
                  <InputBar onSubmit={handleUserSubmit} />
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
