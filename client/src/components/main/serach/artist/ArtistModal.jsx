import React, { useRef, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Box, Avatar } from "@mui/material";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import ArtistSongCard from "./ArtistSongCard";

const WallPaper = styled("div")({
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  overflow: "hidden",
  background: "linear-gradient(rgb(255, 38, 142) 0%, rgb(255, 105, 79) 100%)",
  transition: "all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s",
  "&:before": {
    content: '""',
    width: "140%",
    height: "140%",
    position: "absolute",
    top: "-40%",
    right: "-50%",
    background:
      "radial-gradient(at center center, rgb(62, 79, 249) 0%, rgba(62, 79, 249, 0) 64%)",
  },
  "&:after": {
    content: '""',
    width: "140%",
    height: "140%",
    position: "absolute",
    bottom: "-50%",
    left: "-30%",
    background:
      "radial-gradient(at center center, rgb(247, 237, 225) 0%, rgba(247, 237, 225, 0) 70%)",
    transform: "rotate(30deg)",
  },
});

const Widget = styled("div")(({ theme }) => ({
  padding: 16,
  borderRadius: 16,
  width: "75%",
  maxWidth: "100%",
  margin: "auto",
  position: "absolute",
  top: "15%",
  left: "10%",
  zIndex: 1,
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.4)",
  backdropFilter: "blur(40px)",
}));

const CoverImage = styled("div")({
  width: 100,
  height: 100,
  objectFit: "cover",
  overflow: "hidden",
  flexShrink: 0,
  borderRadius: 8,
  backgroundColor: "rgba(0,0,0,0.08)",
  "& > img": {
    width: "100%",
  },
});

export default function ArtistModal(props) {
  const TotalCount = props.artistModal.Music.map((e) => e.play_count) //play총합
    .reduce((prev, curr) => prev + curr, 0);

  const musics = props.artistModal.Music;
  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
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
                <b>{props.artistModal.artist_name}</b>
              </Typography>
              <Typography
                sx={{ mt: 5 }}
                variant="h4"
                gutterBottom
                component="div"
              >
                Upload music : {props.artistModal.Music.length}
              </Typography>
              <Typography
                sx={{ mt: 5 }}
                variant="h5"
                gutterBottom
                component="div"
              >
                Total paly count : {TotalCount}
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
          <Box sx={{ mt: 4, ml: 5 }}>
            <Typography variant="h3" component="div">
              <b>Music List</b>
            </Typography>
          </Box>
          <Box sx={{ mt: 4, ml: 5, display: "flex", flexDirection: "row" }}>
            {musics.map((music) => {
              return (
                <ArtistSongCard
                  music={music}
                  setmusicmodal={props.setmusicmodal}
                />
              );
            })}
          </Box>
        </Box>
      </Widget>
      {/* <WallPaper sx={{cursor:"pointer"}} 
       onClick={()=>{props.setArtistModal("");}}
       /> */}
    </Box>
  );
}
