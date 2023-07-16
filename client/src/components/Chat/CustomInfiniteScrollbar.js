import React, { useState, useEffect, useRef } from "react";

const CustomInfiniteScrollbar = ({
  fetchPreviousMessages,
  pageSize,
  children,
}) => {
  const [isFetching, setIsFetching] = useState(false);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollContainer = scrollContainerRef.current;
      const { scrollTop, clientHeight, scrollHeight } = scrollContainer;

      if (scrollTop === 0 && clientHeight === scrollHeight && !isFetching) {
        setIsFetching(true);
        fetchPreviousMessages(pageSize)
          .then(() => setIsFetching(false))
          .catch(() => setIsFetching(false));
      }
    };

    const scrollContainer = scrollContainerRef.current;
    scrollContainer.addEventListener("scroll", handleScroll);

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, [fetchPreviousMessages, isFetching, pageSize]);

  return (
    <div
      ref={scrollContainerRef}
      style={{
        height: "400px",
        overflowY: "scroll",
        border: "1px solid red",
        display: "flex",
        flexDirection: "column-reverse",
      }}
    >
      {children}
    </div>
  );
};

export default CustomInfiniteScrollbar;
