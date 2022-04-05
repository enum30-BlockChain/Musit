import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import Avatar from "@mui/material/Avatar";
import { borderRadius } from "@mui/system";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { pink } from "@mui/material/colors";
import { fetchArtistListData } from "../../../../../redux/artistlist/artistListAction";
import { useDispatch, useSelector } from "react-redux";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function ArtistCard({ Artists }) {
  const postInfo = () => {
    Artists.setArtistModal(Artists);
  };

  return (
    <Paper
      sx={{
        p: 2,
        ml: 5,
        maxWidth: 160,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
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
            <Avatar
              onClick={postInfo}
              alt="Remy Sharp"
              src={Artists.img}
              sx={{ width: 128, height: 128 }}
            />
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
                  {/* {Artists.artist_name} */}
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
          {/* 내가 좋아요 버튼과 싫어요 버튼을 눌렀을때 상태변화 */}
          <Grid item>
            <FavoriteBorderIcon
              sx={{ color: pink[300] }}
              cursor="pointer"
              fontSize="large"
            />
            {/* <FavoriteIcon
              sx={{ color: pink[300] }}
              cursor="pointer"
              fontSize="large"
            /> */}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
