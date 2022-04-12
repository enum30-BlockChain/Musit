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
import { useSelector, useDispatch } from "react-redux";
// import { fetchArtistLikeData } from "../../../redux/artist/artistAction";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function ArtistCard(props) {
  const [artist, setArtist] = useState(props.artist);
  //파업창 띄워주는 것
  const postInfo = () => {
    props.setArtistModal(props.artist);
  };
  ////////////////////////////////////////////

  useEffect(() => {
    setArtistlike();
  }, []);

  const [artistlike, setArtistlike] = useState("");

  const artistList = useSelector((state) => state.artistList);
  const dispatch = useDispatch();

  // const likeOnclick = () => {
  //   dispatch(fetchArtistLikeData(props.address, props.artist.artist_name));
  // };

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
            {/* 프롭스를 통한 아티스트 이미지 */}
            <Avatar
              onClick={postInfo}
              alt="Remy Sharp"
              src={props.artist.img}
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
                  {/* 프롭스를 통한 아티스트 이름 */}
                  {props.artist.artist_name}
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
            <FavoriteBorderIcon
              sx={{ color: pink[300] }}
              cursor="pointer"
              fontSize="large"
              value={props.artist.artist_name}
              onClick={() => {
                likeOnclick();
              }}
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
