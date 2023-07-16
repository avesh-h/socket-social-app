import React, { useState } from "react";
import { useGetPostsQuery } from "../../features/api/postSlice";
import PostCard from "../../components/Post/PostCard";
import { Pagination } from "@mui/material";

const PAGE_SIZE = 6;

// This whole loggedIn user posts will depend upon the get post query
const MyFeeds = () => {
  const [pageCount, setPageCount] = useState(1);
  const {
    data: myPosts,
    isSuccess,
    isError,
    isLoading,
    error,
  } = useGetPostsQuery({
    pageNumber: pageCount,
    myPosts: true,
    pageSize: PAGE_SIZE,
  });

  //Pagination change page function
  const changePage = (e, page) => {
    setPageCount(page);
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto auto auto",
        gap: 20,
      }}
    >
      {isLoading && <div>...Loading</div>}
      {isSuccess && !!myPosts.data.length ? (
        myPosts.data.map((post, i, posts) => {
          return (
            <PostCard
              key={post._id}
              post={post}
              changePage={changePage}
              count={Math.ceil(myPosts?.total / 6)}
              pageCount={pageCount}
            />
          );
        })
      ) : (
        <>You don't have any Post yet</>
      )}
      <div>
        {isSuccess && !!myPosts.data.length && (
          <Pagination
            count={Math.ceil(myPosts?.total / 6)}
            pageCount={pageCount}
            onChange={changePage}
          />
        )}
      </div>
    </div>
  );
};

export default MyFeeds;
