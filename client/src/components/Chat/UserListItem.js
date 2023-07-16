import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";

const UserListItem = ({ user, handleOpenChat }) => {
  const { id } = useParams();
  return (
    <div>
      <Box
        onClick={handleOpenChat}
        sx={{
          width: "fit-content",
          display: "flex",
          alignItems: "center",
          px: 1,
          py: 1,
          mb: 2,
          borderBottomLeftRadius: "15px",
          borderBottomRightRadius: "15px",
          bgcolor: user.conversationId === id ? "rgb(20, 94, 168)" : "#E8E8E8",
          color: user.conversationId === id ? "#fff" : "#000",
          margin: "10px 0 0 15px",
          "&:hover": {
            bgcolor: "rgb(20, 94, 168)",
            color: "white",
          },
          cursor: "pointer",
        }}
      >
        <Avatar
          sx={{ marginRight: 2, cursor: "pointer" }}
          name={user.chatUser.fullname}
          src={user.chatUser.pic}
        />
        <Box>
          <Typography>{user.chatUser.name}</Typography>
          <Typography>
            {user.chatUser.firstname + " " + user.chatUser.lastname}
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default UserListItem;
