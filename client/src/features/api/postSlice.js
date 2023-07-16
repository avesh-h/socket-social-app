import { authSlice } from "../api/authSlice";

//Created the slice for the rtk query for posts
export const postSlice = authSlice.injectEndpoints({
  reducerPath: "post",
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (args) => {
        return {
          //Old technique which make url so big
          // url: `posts/get-feed-post?pageSize=6&pageNumber=${pageNum}&searchText=${searchTxt}&myPosts=${myPosts}`,
          // method: "GET",
          url: `posts/get-feed-post`,
          method: "GET",
          params: args,
        };
      },
      providesTags: ["Post"],
    }),
    createPost: builder.mutation({
      query: (postData) => ({
        url: "posts/create-post",
        method: "POST",
        body: postData,
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const { useCreatePostMutation, useGetPostsQuery } = postSlice;
