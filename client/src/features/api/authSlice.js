import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Cookies } from "react-cookie";
import { getToken } from "../../utils/getToken";

//Custom interceptor for the RTK query so all the request go through this function
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_SERVER_URL,
  prepareHeaders: (headers) => {
    const token = getToken();
    if (token) {
      headers.set("Authorization", token);
    }
  },
});
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // your logic here
    const cookies = new Cookies();
    cookies.remove("token");
  }
  return result;
};

//Created Slice for Authentication
export const authSlice = createApi({
  reducerPath: "auth",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (signupData) => ({
        url: "auth/signup",
        method: "POST",
        body: signupData,
      }),
    }),
    login: builder.mutation({
      query: (loginData) => ({
        url: "auth/login",
        method: "POST",
        body: loginData,
      }),
    }),
  }),
});

export const { useSignupMutation, useLoginMutation } = authSlice;
