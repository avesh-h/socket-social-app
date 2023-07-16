import { Pagination } from "@mui/material";
import React from "react";
import PostCard from "./PostCard";

const AllFeeds = ({
  isSuccess,
  isLoading,
  allPosts,
  isError,
  pageCount,
  setPageCount,
  error,
  changePage,
}) => {
  return (
    <div>
      {isLoading && <div>...Loading</div>}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto auto",
          gap: 20,
        }}
      >
        {isSuccess &&
          allPosts.data?.map((post) => {
            return <PostCard key={post._id} post={post} />;
          })}
      </div>
      {isError && <h2>{error.status}</h2>}
      <Pagination
        count={5}
        pageCount={pageCount}
        setPageCount={setPageCount}
        onChange={changePage}
      />
    </div>
  );
};

export default AllFeeds;
