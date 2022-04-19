import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import Avatar from "@mui/material/Avatar";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { toggleLikeArtist } from "../../../../redux/actions/artistActions";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function LikeCard({ List, setArtistModal }) {
  const [TotalLike, setTotalLike] = useState();
  const [artistlike, setArtistlike] = useState("");
  const likeArtist = useSelector((state) => state.likeArtist).data;
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
    alert("좋아요를 취소하였습니다.");
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
              alt="Remy Sharp"
              sx={{ width: 128, height: 128 }}
              src={List.img}
              onClick={postInfo}
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
                  onClick={() => {
                    likeOnclick();
                    setTotalLike(TotalLike + 1);
                    setArtistlike(1);
                  }}
                  sx={{ mr: 0.5 }}
                  cursor="pointer"
                  fontSize="small"
                />
              </Box>
            ) : (
              <Box>
                <FavoriteIcon
                  onClick={() => {
                    likeOnclick();
                    setTotalLike(TotalLike - 1);
                    setArtistlike("");
                  }}
                  sx={{ mr: 0.5 }}
                  cursor="pointer"
                  fontSize="small"
                />
              </Box>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
