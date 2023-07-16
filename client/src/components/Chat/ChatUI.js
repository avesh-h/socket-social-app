import { Box } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { ChatUserProvider } from "../../Context/ChatUser";
import ChatBox from "./ChatBox";
import ChatSidebar from "./ChatSidebar";

const mainUI = {
  display: "flex",
  width: "100%",
};

const ChatUI = () => {
  const { id } = useParams();

  return (
    <ChatUserProvider>
      <div style={mainUI}>
        <Box sx={{ width: "25%" }}>
          <ChatSidebar />
        </Box>
        {id ? (
          <Box sx={{ width: "75%" }}>
            <ChatBox />
          </Box>
        ) : (
          <>Select User First</>
        )}
      </div>
    </ChatUserProvider>
  );
};

export default ChatUI;
