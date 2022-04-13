import React from "react";
import Grid from "@mui/material/Grid";

import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import Skeleton from '@mui/material/Skeleton';
import ThumbUpOffAltRoundedIcon from "@mui/icons-material/ThumbUpOffAltRounded";
import { Box } from "@mui/material";

export default function ArtistCardSkeleton() {
  return (
    <Box
      sx={{
        alignItems: "center",
        p: 2,
        m: 1.5,
        maxWidth: 160,
      }}
    >
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128, borderRadius: "50%" }}>
            <Skeleton variant="rectangular" width={128} height={128} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid
              item
              xs
              container
              direction="column"
              justifyContent="center"
              alignItems="flex-start"
            >
              <div style={{ width: 150, whiteSpace: "nowrap" }}>
                <Typography
                  sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
                  gutterBottom
                  variant="title"
                  component="div"
                >
                  <Skeleton  width="70%"/>
                </Typography>
              </div>
            </Grid>
            <Grid item>
              <Typography
                sx={{ cursor: "pointer" }}
                variant="body2"
              ></Typography>
            </Grid>
          </Grid>
          <Grid item>
              <Box sx={{ display: "flex" }}>
                 <Skeleton  width={25}/>
              </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
