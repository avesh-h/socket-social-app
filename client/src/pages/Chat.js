import React, { useEffect } from "react";
import ChatUI from "../components/Chat/ChatUI";

const Chat = () => {
  useEffect(() => {
    console.log("useEffect");
  }, []);

  return (
    <div>
      <ChatUI />
    </div>
  );
};

export default Chat;
