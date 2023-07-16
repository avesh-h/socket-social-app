import { Box, Skeleton } from "@mui/material";
import React from "react";

const PostLoading = () => {
  return (
    <div>
      <Skeleton variant="rectangular" width={210} height={118} />
      <Box sx={{ pt: 0.5 }}>
        <Skeleton />
        <Skeleton width="60%" />
      </Box>
    </div>
  );
};

export default PostLoading;
