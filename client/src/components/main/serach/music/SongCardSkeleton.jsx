import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import Skeleton from '@mui/material/Skeleton';
const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function SongCardSkeleton() {
  return (
    <Box
      sx={{
        alignItems: "center",
        p: 2,
        mx: 1.5,
        maxWidth: 350,
      }}
    >
      <Grid sx={{ height: 150, display: "flex", width: "100%" }}>
        <Grid item>
          <ButtonBase sx={{ width: 130, height: 130 }}>
            <Skeleton variant="rectangular" width={210} height={118} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sx={{ ml: 1.5 }} sm container>
          <Grid
            item
            xs
            container
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
          >
            <div style={{ width: 170, whiteSpace: "nowrap" }}>
              <Typography
                sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
                gutterBottom
                variant="title"
                component="div"
              > 
              <Skeleton variant="rectangular" width="90%" />
              </Typography>
            <Typography variant="body2" gutterBottom>
              <Skeleton variant="rectangular" width="40%" />
            </Typography>
            <Typography variant="body2" gutterBottom>
              <Skeleton variant="rectangular" width="40%" />
            </Typography>
            <Typography variant="body2" gutterBottom>
              <Skeleton variant="rectangular" width="40%" />
            </Typography>
            <Typography variant="body2" gutterBottom>
              <Skeleton variant="rectangular" width="40%" />
            </Typography>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
