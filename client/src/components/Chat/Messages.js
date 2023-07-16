import { CircularProgress, styled } from "@mui/material";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Virtuoso } from "react-virtuoso";
import { ChatUser } from "../../Context/ChatUser";
import { useGetConversationQuery } from "../../features/api/chatSlice";
import { useGetProfileQuery } from "../../features/api/userSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import Message from "./Message";
import { useParams } from "react-router-dom";
import { useLazyGetConversationQuery } from "../../features/api/chatSlice";

const MessagesBox = styled("div")({
  border: "1px solid red",
  height: "400px",
  // overflowY: "scroll",
  scrollbarWidth: "none",
  scrollMarginTop: "10px",
  display: "flex",
  flexDirection: "column-reverse",
});

const ListItem = styled("li")({
  listStyle: "none",
  width: "fit-content",
  padding: "5px",
  marginTop: "10px",
});

const Messages = () => {
  const pageNumber = useRef(1);
  const [checkMore, setCheckMore] = useState(true);
  const scrollableDivRef = useRef(null);
  const chatBox = useRef();
  const { chatUser } = ChatUser();
  const virtuoso = useRef();
  const { id } = useParams();

  //Lazy rtk query
  const [getConversation, { data: oldMessages, isSuccess }] =
    useLazyGetConversationQuery();

  //Simple rtk query
  // const { data: oldMessages, isSuccess } = useGetConversationQuery({
  //   conversationId: chatUser?.conversationId,
  //   pageNumber,
  //   pageSize: 20,
  // });

  // console.log("keep-change", chatUser.chatUser._id);

  const {
    data: currentUser,
    isSuccess: profileSuccess,
    isLoading,
  } = useGetProfileQuery();

  //Virtuso
  // const START_INDEX = useMemo(() => {
  //   return (oldMessages?.data?.totalPage || 0) * 20;
  // }, [oldMessages?.data?.data.length]);

  //Virtuso
  // const [firstItemIndex, setFirstItemIndex] = useState(
  //   START_INDEX - oldMessages?.data?.data.length
  // );

  //Virtuso
  // useEffect(() => {
  //   const nextFirstItemIndex = START_INDEX - oldMessages?.data?.data.length;
  //   setFirstItemIndex(nextFirstItemIndex);
  // }, [oldMessages?.data?.data]);

  //Old way with react state for messages
  // useEffect(() => {
  //   if (isSuccess && oldMessages?.data?.data.length) {
  //     const myMessages = ([...oldMessages?.data?.data] || []).reverse();
  //     setMessages((prevMessages) => {
  //       if (prevMessages.length) {
  //         return [...myMessages, ...prevMessages];
  //       } else {
  //         return [...myMessages];
  //       }
  //     });
  //   } else {
  //     setMessages([]);
  //   }
  //   console.log("old", oldMessages?.data?.data);
  // }, [oldMessages?.data?.data, chatUser?.chatUser?._id]);

  //Debounce effect for Scroll event whenever user scroll
  // const debounceFunc = (method, e) => {
  //   if (timeout) {
  //     clearTimeout(timeout);
  //   }
  //   timeout = setTimeout(() => method(e), 700);
  // };

  //Scroll called
  // const scrollHandler = (e) => {
  //   if (pageNumber < oldMessages.data.totalPage) {
  //     setPageNumber((prevState) => prevState + 1);
  //   }
  // };

  //virtuso
  // const followOutput = useCallback((isAtBottom) => {
  //   return isAtBottom ? "smooth" : false;
  // }, []);

  //Virtuso
  // const itemContent = useCallback(
  //   (index, msg) => {
  //     return (
  //       <div
  //         style={{
  //           display: "flex",
  //           width: "100%",
  //           justifyContent:
  //             currentUser?.data?._id === msg.senderId
  //               ? "flex-start"
  //               : "flex-end",
  //         }}
  //       >
  //         <ListItem
  //           sx={{
  //             borderRadius:
  //               currentUser?.data?._id === msg.senderId
  //                 ? "8px 8px 8px 0px"
  //                 : "8px 0px 8px 8px",
  //             marginRight: currentUser?.data?._id === msg.senderId ? 0 : "30px",
  //             marginLeft:
  //               currentUser?.data?._id === msg.senderId ? "30px" : "0px",
  //             backgroundColor:
  //               currentUser?.data?._id === msg.senderId
  //                 ? "rgb(20, 94, 168)"
  //                 : "#E8E8E8",
  //           }}
  //         >
  //           {msg.content}
  //         </ListItem>
  //       </div>
  //     );
  //   },
  //   [currentUser]
  // );

  useEffect(() => {
    if (id) {
      pageNumber.current = 1;
      //To get back scroller position at bottom whenever id param change
      const scrollableDiv = scrollableDivRef.current;
      scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
      getConversation({
        conversationId: id,
        pageNumber: pageNumber.current,
        pageSize: 20,
      });
    }
  }, [getConversation, id]);

  //infinite-scroller
  const fetchData = () => {
    if (oldMessages?.data?.totalPage > pageNumber.current) {
      pageNumber.current++;
      getConversation({
        conversationId: id,
        pageNumber: pageNumber.current,
        pageSize: 20,
      });
    }
  };

  useEffect(() => {
    if (oldMessages?.data?.totalPage > pageNumber.current) {
      const check = oldMessages?.data?.totalPage > pageNumber.current;
      setCheckMore(check);
    } else {
      setCheckMore(false);
    }
  }, [oldMessages?.data?.data.length, oldMessages?.data.totalPage]);

  return (
    <>
      {/* Virtuso */}
      {/* <MessagesBox ref={chatBox} id="yourScrollElementId">
      <Virtuoso
        ref={virtuoso}
        initialTopMostItemIndex={oldMessages?.data?.data.length - 1}
        firstItemIndex={Math.max(0, firstItemIndex)}
        itemContent={itemContent}
        data={oldMessages?.data?.data}
        startReached={scrollHandler}
        followOutput={followOutput}
        style={{
          flex: "1 1 auto",
          overscrollBehavior: "contain",
        }}
      />
    </MessagesBox> */}

      <ul
        id="scrollableDiv"
        ref={scrollableDivRef}
        style={{
          height: "400px",
          overflow: "auto",
          display: "flex",
          flexDirection: "column-reverse",
        }}
      >
        {isSuccess && (
          <InfiniteScroll
            dataLength={oldMessages?.data?.data.length}
            next={fetchData}
            hasMore={checkMore}
            loader={<CircularProgress />}
            // height={window.innerHeight - 197}
            inverse
            style={{
              display: "flex",
              flexDirection: "column-reverse",
              overflow: "none",
            }}
            scrollableTarget="scrollableDiv"
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
            refreshFunction={fetchData}
            pullDownToRefresh={true}
            pullDownToRefreshThreshold={50}
          >
            {oldMessages?.data?.data.map((msg) => {
              const style = {
                display: "flex",
                justifyContent:
                  currentUser?.data?._id === msg.senderId
                    ? "flex-start"
                    : "flex-end",
              };
              return (
                <Message
                  key={msg._id}
                  message={msg}
                  style={style}
                  currentUser={currentUser}
                />
              );
            })}
          </InfiniteScroll>
        )}
      </ul>
    </>
  );
};

export default Messages;
