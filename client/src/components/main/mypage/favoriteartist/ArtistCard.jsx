import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import Avatar from "@mui/material/Avatar";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { pink } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { toggleLikeArtist } from "../../../../redux/actions/artistActions";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function ArtistCard({ List, setArtistModal }) {
  const [TotalLike, setTotalLike] = useState("");
  const likeArtist = useSelector((state) => state.likeArtist).data;
  const [artistlike, setArtistlike] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (!likeArtist.loading) {
      setArtistlike(
        likeArtist.filter((artist) => {
          return artist.artist_name.indexOf(List.artist_name) > -1;
        })
      );
    }
  }, [likeArtist]);

  // 파업창 띄워주는 것
  const postInfo = () => {
    console.log(List);
    setArtistModal(List);
  };

  const likeOnclick = async () => {
    dispatch(toggleLikeArtist(List.artist_name));
  };

  return (
    <Paper
      sx={{
        p: 2,
        ml: 5,
        maxWidth: 200,
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
              sx={{ width: 128, height: 128 }}
              src={List.img}
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
                ></Typography>
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
            {artistlike.length === 0 ? (
              <Box>
                <FavoriteBorderIcon
                  sx={{ color: pink[300] }}
                  cursor="pointer"
                  fontSize="large"
                  onClick={() => {
                    likeOnclick();
                    setTotalLike(TotalLike + 1);
                    setArtistlike(1);
                  }}
                />
              </Box>
            ) : (
              <Box>
                <FavoriteIcon
                  sx={{ color: pink[300] }}
                  cursor="pointer"
                  fontSize="large"
                  onClick={() => {
                    likeOnclick();
                    setTotalLike(TotalLike - 1);
                    setArtistlike("");
                  }}
                />
              </Box>
            )}
          </Grid>
          <Grid>
            <Link to="/">
              <Button
                variant="contained"
                sx={{
                  color: "var(--black-light-color)",
                  backgroundColor: "var(--box1-color)",
                  ":hover": {
                    background: "var(--primary-color)",
                    color: "var(--text-color)",
                  },
                }}
              >
                sell
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
