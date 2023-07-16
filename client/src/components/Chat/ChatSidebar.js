import ChatIcon from "@mui/icons-material/Chat";
import React, { useEffect, useState } from "react";
import styles from "./ChatSidebar.module.css";
import UserListItem from "./UserListItem";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useGetAllUsersQuery } from "../../features/api/userSlice";
import { useGetConversationsListQuery } from "../../features/api/chatSlice";
import { useSearchParams, useNavigate, useParams } from "react-router-dom";
import { useDebounce } from "./../../hooks/useDebounce";
import { getLoggedInUser } from "../../utils/getCurrentSession";
import { ChatUser } from "../../Context/ChatUser";

const ChatSidebar = () => {
  const current_user = getLoggedInUser();
  const [searchUser, setSearchUser] = useState("");
  const debouncedValue = useDebounce(searchUser, 1000);
  const navigate = useNavigate();
  const { id } = useParams();
  const { setChatUser } = ChatUser();

  //Only if user is search
  const { data: searchedUsers, isSuccess: searchSuccess } = useGetAllUsersQuery(
    {
      searchText: debouncedValue ?? "",
    }
  );

  //isLoading state from the rtkquery is use for whenever data is loading for the firsttime

  //Default it will get chats
  const { data: chatsUsers, isSuccess: chatsSuccess } =
    useGetConversationsListQuery();

  //Function for open chat
  const handleOpenChat = (user) => {
    setChatUser(user);
    navigate(`/chats/${user.conversationId}`);
  };

  useEffect(() => {
    if (id && chatsSuccess) {
      setChatUser(chatsUsers.data.find((u) => u.conversationId === id));
    }
  }, [id, chatsSuccess]);

  return (
    <div className={styles.mainSidebar}>
      <div className={styles.heading}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            paddingTop: "7px",
            gap: "20px",
          }}
        >
          <ChatIcon />
          <TextField
            id="standard-basic"
            label="Search User"
            sx={{ width: "fit-content", paddingBottom: "15px" }}
            variant="standard"
            onChange={(e) => setSearchUser(e.target.value)}
          />
        </Box>
      </div>
      <div>
        <center>
          <h3>Chats</h3>
        </center>
        {searchUser
          ? searchSuccess &&
            searchedUsers.data
              .filter((u) => u._id !== current_user._id)
              .map((user) => {
                return (
                  <UserListItem
                    user={user}
                    key={user._id}
                    handleOpenChat={() => handleOpenChat(user)}
                  />
                );
              })
          : chatsSuccess &&
            chatsUsers.data
              .filter((u) => u.chatUser._id !== current_user._id)
              .map((user) => {
                return (
                  <UserListItem
                    user={user}
                    key={user.chatUser._id}
                    handleOpenChat={() => handleOpenChat(user)}
                  />
                );
              })}
      </div>
    </div>
  );
};

export default ChatSidebar;
