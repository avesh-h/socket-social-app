import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./api/authSlice";
import { postSlice } from "./api/postSlice";

export const store = configureStore({
  reducer: {
    [authSlice.reducerPath]: authSlice.reducer,
    [postSlice.reducerPath]: postSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([authSlice.middleware, postSlice.middleware]),
  // .concat(postSlice.middleware),
});
