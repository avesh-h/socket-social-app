import { createContext, useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

const ChatUserContext = createContext();

export const ChatUserProvider = ({ children }) => {
  const [chatUser, setChatUser] = useState({});

  return (
    <ChatUserContext.Provider value={{ chatUser, setChatUser }}>
      {children}
    </ChatUserContext.Provider>
  );
};

export const ChatUser = () => {
  return useContext(ChatUserContext);
};
