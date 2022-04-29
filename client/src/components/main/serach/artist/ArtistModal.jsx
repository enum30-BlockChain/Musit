import "./ArtistModel.css";
import React, { useEffect, useRef, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Box, Avatar, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import ArtistSongCard from "./ArtistSongCard";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Widget = styled("div")(({ theme }) => ({
  padding: 16,
  borderRadius: 16,
  width: "80%",
  maxWidth: "100%",
  margin: "auto",
  position: "absolute",
  top: "10%",
  left: "10%",
  zIndex: 1,
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.4)",
  backdropFilter: "blur(40px)",
}));

const Slider = styled("div")({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export default function ArtistModal(props) {
  const [value, setValue] = useState(0);
  const [viewMusicCard, setViewMusicCard] = useState(0);
  const TotalCount = props.artistModal.Music.map((e, i) => e.play_count) //play총합
    .reduce((prev, curr) => prev + curr, 0);

  const musics = props.artistModal.Music;
  useEffect(() => {
    if (musics.length > 3) {
      setViewMusicCard(3);
    } else {
      setViewMusicCard(musics.length);
    }
  }, []);

  const moveAhead = () => {
    value === 0
      ? setValue(-100 * (musics.length - viewMusicCard))
      : setValue(value + 100);
  };
  const moveBehind = () => {
    value === -100 * (musics.length - viewMusicCard)
      ? setValue(0)
      : setValue(value - 100);
  };

  // if (!Array.isArray(musics) || musics.length <= 0) {
  //   return null;
  // }

  return (
    <Box sx={{ width: "10%", overflow: "hidden" }}>
      <Widget>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{ ml: 5, mt: 3, width: 250, height: 250 }}
            alt="Remy Sharp"
            src={props.artistModal.img}
          />
          <Box
            sx={{
              width: "100%",
              ml: 10,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ mt: 3 }}>
              <Typography variant="h3" gutterBottom component="div">
                <b>Artist Name:{props.artistModal.artist_name}</b>
              </Typography>
              <Typography
                sx={{ mt: 5 }}
                variant="h4"
                gutterBottom
                component="div"
              >
                <b>Artist Like:{props.artistModal.ArtistLikes.length}</b>
              </Typography>

              <Typography
                sx={{ mt: 5 }}
                variant="h4"
                gutterBottom
                component="div"
              >
                <b>Upload music : {props.artistModal.Music.length}</b>
              </Typography>
              <Typography
                sx={{ mt: 5 }}
                variant="h4"
                gutterBottom
                component="div"
              >
                Total play count : {TotalCount}
              </Typography>
            </Box>
            <Box sx={{ mt: 1, mr: 3 }}>
              <CloseIcon
                sx={{ fontSize: 60, cursor: "pointer" }}
                onClick={() => {
                  props.setArtistModal("");
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* music List */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Box sx={{ mt: 8, mx: 5 }}>
            <Typography variant="h3" component="div">
              <b>Music List</b>
            </Typography>
          </Box>
          <Slider
            sx={{
              display: "flex",
              alignItems: "center",
              height: "80%",
              px: 2,
              my: 5,
              mx: "auto",
            }}
          >
            <ArrowBackIosIcon
              sx={{ fontSize: 50, cursor: "pointer" }}
              onClick={moveAhead}
            />
            <Grid
              container
              sx={{
                width: "1100px",
                m: "auto",
                display: "flex",
                flexWrap: "nowrap",
                overflow: "hidden",
              }}
            >
              {musics &&
                musics.map((music, i) => {
                  return (
                    <div
                      className="glide"
                      style={{ transform: `translateX(${value}%)` }}
                      key={i}
                    >
                      <ArtistSongCard
                        index={i}
                        music={music}
                        setmusicmodal={props.setmusicmodal}
                      />
                    </div>
                  );
                })}
            </Grid>
            <ArrowForwardIosIcon
              sx={{ fontSize: 50, cursor: "pointer" }}
              onClick={moveBehind}
            />
          </Slider>
        </Box>
      </Widget>
      {/* <WallPaper sx={{cursor:"pointer"}} 
       onClick={()=>{props.setArtistModal("");}}
       /> */}
    </Box>
  );
}
