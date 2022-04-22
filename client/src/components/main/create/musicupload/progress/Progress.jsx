import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Progress() {
  return (
    <Box
      sx={{
        borderRadius: 5,
        bgcolor: "rgba(255, 255, 255, 0.5)",
        width: "98%",
        height: "98%",
        mx: 0,
        top: "0%",
        position: "absolute",
      }}
    >
      <CircularProgress
        sx={{ position: "absolute", top: "30%", left: "48%" }}
      />
    </Box>
  );
}
