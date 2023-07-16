import { authSlice } from "./authSlice";

export const userSlice = authSlice.injectEndpoints({
  reducerPath: "user",
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => "users/get-user-profile",
      providesTags: ["User"],
    }),
    updateProfile: builder.mutation({
      query: (updatedData) => ({
        url: "users/update-user-profile",
        method: "PATCH",
        body: updatedData,
      }),
      invalidatesTags: ["User"],
    }),
    getAllUsers: builder.query({
      query: (args) => ({
        url: "/users/get-all-users",
        method: "GET",
        params: args,
      }),
      providesTags: ["User"],
    }),
    showUserProfile: builder.query({
      query: () => ({}),
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetAllUsersQuery,
} = userSlice;
