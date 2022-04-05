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
import { useDispatch, useSelector } from "react-redux";
import { fetchArtistLikeData } from "../../../../../redux/artist/artistAction";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function ArtistLikeCard({ Artists, address }) {
  //내가좋아하는 아티스트의 카운트상태를 불러올것이다.
  const artistlist = useSelector((state) => state.artistlist);

  //위에 선언해줬고
  const dispatch = useDispatch();

  //findlike 하트버튼의 상태 ={좋아하는상태인지 싫어하는상태인지}
  const [findlike, setFindlike] = useState("");

  const likecountpost = () => {
    dispatch(fetchArtistLikeData(address, Artists.artist_name));
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
              // onClick={postInfo}
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
            {findlike.length === 0 ? (
              <FavoriteBorderIcon
                sx={{ color: pink[300] }}
                cursor="pointer"
                fontSize="large"
                value={Artists.artist_name}
                onClick={() => {
                  likecountpost();
                }}
              />
            ) : (
              <FavoriteIcon
                sx={{ color: pink[300] }}
                cursor="pointer"
                fontSize="large"
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
