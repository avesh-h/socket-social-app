import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useGetPostsQuery } from "../../features/api/postSlice";
import Pagination from "./Pagination";
import PostCard from "./PostCard";

const PAGE_SIZE = 6;

const FeedPosts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchPosts = searchParams.get("searchPosts");
  const [pageCount, setPageCount] = useState(1);

  //Get All posts
  const {
    data: allPosts,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useGetPostsQuery({
    pageNumber: pageCount,
    searchText: searchPosts ?? "",
    pageSize: PAGE_SIZE,
  });

  // Search functionality
  useEffect(() => {
    if (searchPosts?.length) {
      setPageCount(1);
    }
  }, [searchPosts]);

  useEffect(() => {
    if (pageCount > 1) {
      setSearchParams({ pageNumber: pageCount });
    } else {
      setSearchParams({});
    }
  }, [pageCount]);

  //Pagination change page function
  const changePage = (e, page) => {
    setPageCount(page);
  };

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
          allPosts?.data.map((post) => {
            return <PostCard key={post._id} post={post} />;
          })}
      </div>
      {isError && <h2>{error.status}</h2>}
      {isSuccess && !!allPosts.data.length && (
        <Pagination
          count={Math.ceil(allPosts?.total / 6)}
          allPosts={allPosts?.data}
          pageCount={pageCount}
          setPageCount={setPageCount}
          onChange={changePage}
        />
      )}
      {/* <Pagination
        count={Math.ceil(allPosts?.total / 6)}
        allPosts={allPosts?.data}
        pageCount={pageCount}
        setPageCount={setPageCount}
        onChange={changePage}
      /> */}

      {/* <AllFeeds
        pageCount={pageCount}
        setPageCount={setPageCount}
        isSuccess={isSuccess}
        isError={isError}
        isLoading={isLoading}
        changePage={changePage}
        allPosts={allPosts}
        error={error}
      /> */}
    </div>
  );
};

export default FeedPosts;
