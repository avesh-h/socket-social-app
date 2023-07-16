import styled from "@emotion/styled";
import SendIcon from "@mui/icons-material/Send";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ChatUser } from "../../Context/ChatUser";
import { socket } from "../../socket";
import Messages from "./Messages";
import { CircularProgress } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfileBox = styled(Box)({
  height: "80px",
  backgroundColor: "#E8E8E8",
});

const InputBox = styled(Box)({
  display: "flex",
  gap: "20px",
  width: "70%",
  position: "absolute",
  bottom: 20,
  paddingLeft: "20px",
});

const ChatBox = () => {
  const [message, setMessage] = useState("");
  // const [pageNumber, setPageNumber] = useState(1);
  const [messages, setMessages] = useState([]);
  const { chatUser } = ChatUser();

  //Send messages
  const handleSendMessage = () => {
    if (message.length) {
      socket.emit("sendMessage", {
        receiverId: chatUser?.chatUser?._id,
        content: message,
      });
      setMessage("");
    } else {
      toast.error("Please enter message!");
    }
  };

  const sendMessageOnEnter = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <Box>
      {Object.keys(chatUser).length ? (
        <>
          <ProfileBox>
            <Box
              sx={{
                paddingLeft: "20px",
                height: "80px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Avatar
                sx={{ marginRight: 2, cursor: "pointer" }}
                // name={selectUser.chatUser.fullname}
                src={chatUser?.chatUser?.pic}
              />
              <Box>
                <Typography>
                  {chatUser?.chatUser?.firstname +
                    " " +
                    chatUser?.chatUser?.lastname}
                </Typography>
              </Box>
            </Box>
          </ProfileBox>
          {/* Messages will be here */}
          <Messages
            messages={messages}
            setMessages={setMessages}
            // pageNumber={pageNumber}
            // setPageNumber={setPageNumber}
          />
          <InputBox>
            <TextField
              id="standard-basic"
              label="Send Message"
              sx={{ width: "90%" }}
              variant="standard"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={sendMessageOnEnter}
            />
            <Button variant="contained" onClick={handleSendMessage}>
              <SendIcon />
            </Button>
          </InputBox>
          <ToastContainer />
        </>
      ) : (
        <>
          <CircularProgress />
        </>
      )}
    </Box>
  );
};

export default ChatBox;
