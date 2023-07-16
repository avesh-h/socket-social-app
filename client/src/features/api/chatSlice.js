import { authSlice } from "./authSlice";
import { socket } from "../../socket";
import { defaultSerializeQueryArgs } from "@reduxjs/toolkit/query/react";

// const handleSocketMessage = (message, { updateCachedData }) => {
//   console.log("rtk-get", message);
//   updateCachedData((draft) => {
//     console.log("draft", JSON.parse(JSON.stringify(draft)));
//     // draft.push(message);
//   });
// };

const chatSlice = authSlice.injectEndpoints({
  reducerPath: "chats",
  endpoints: (builder) => ({
    getConversationsList: builder.query({
      query: () => "/chats/get-conversations-list",
    }),
    getConversation: builder.query({
      query: (args) => ({
        url: "/chats/get-conversation",
        method: "GET",
        params: args,
      }),

      serializeQueryArgs: ({ queryArgs, endpointDefinition, endpointName }) => {
        return endpointName;
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems, { arg }) => {
        console.log("currentCache", JSON.parse(JSON.stringify(currentCache)));
        console.log("newItems", newItems);
        // console.log("arg", arg);
        if (
          currentCache?.data?.data.some(
            (d) => d.conversationId === arg.conversationId
          )
        ) {
          currentCache?.data?.data.push(...newItems?.data?.data);
        } else {
          currentCache.data.totalPage = newItems?.data?.totalPage;
          currentCache.data.data = newItems?.data?.data;
        }
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },

      //Try to get message logic here and push into rtk-state
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved, getState }
      ) {
        //For get all state of the rtk query for real time

        socket.on("getMessage", (msg) => {
          updateCachedData((draft) => {
            //because on every click it will send message multiple times i don't know why
            if (!draft?.data?.data.find((d) => d._id === msg.data._id)) {
              draft.data?.data?.unshift(msg.data);
            }
          });
        });
      },

      // Each query data
      // async onQueryStarted(
      //   args,
      //   { queryFulfilled, dispatch, updateCachedData }
      // ) {
      //   try {
      //     const { data } = await queryFulfilled;
      //     console.log("querystarted", data);

      //     // dispatch()
      //   } catch (error) {}
      // },
    }),
  }),
});

export const {
  useGetConversationsListQuery,
  useGetConversationQuery,
  useLazyGetConversationQuery,
} = chatSlice;
