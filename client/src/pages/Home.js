import React, { useState } from "react";
import FeedPosts from "../components/Post/FeedPosts";
import CreatePost from "../components/Post/CreatePost";
import AddIcon from "@mui/icons-material/Add";

const addButtonStyle = {
  position: "absolute",
  bottom: "15px",
  right: "15px",
  background: "rgb(20, 94, 168)",
  cursor: "pointer",
};

const Home = () => {
  const [create, setCreate] = useState(false);
  return (
    <>
      <FeedPosts />
      <CreatePost create={create} setCreate={setCreate} />
      <button
        title="Create Post"
        style={addButtonStyle}
        onClick={() => setCreate(true)}
      >
        <AddIcon />
      </button>
    </>
  );
};

export default Home;
