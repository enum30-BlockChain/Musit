import { Skeleton } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const LikeCardSkeleton = () => {
  return (
    <>
      <Box sx={{ margin: "15px" }}>
        <Skeleton variant="rectangular" width={345} height={200} />
        <Skeleton variant="text" width={345} height={50} />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="text" width={290} height={40} />
        </Box>
      </Box>
    </>
  );
};

export default LikeCardSkeleton;
