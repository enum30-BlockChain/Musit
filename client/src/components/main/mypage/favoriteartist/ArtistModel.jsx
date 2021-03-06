import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Avatar, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import "../favoriteartist/css/LikeCard.css";

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
  maxWidth: "1200px",
  margin: "auto",
  position: "absolute",
  textAlign: "center",
  top: "15%",
  left: "15%",
  zIndex: 10,
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

export default function ArtistModel(props) {
  const artistDetail = props.likeArtistDetail.data;

  return (
    <>
      <Box sx={{ width: "100%", overflow: "hidden" }}>
        <Widget>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                ml: 10,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ mt: 3 }}></Box>
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
            <Box style={{ display: "inline-flex" }}>
              <Typography
                variant="h3"
                component="div"
                style={{ display: "inline-block", marginLeft: "130px" }}
              >
                <div>
                  <h1>Artist</h1>
                  <div className="img-box">
                    {artistDetail.img === "" ? (
                      <Avatar
                        className="register-avatar"
                        alt="Remy Sharp"
                        sx={{ width: 450, height: 450 }}
                      />
                    ) : (
                      <Box
                        sx={{ width: "450px", height: "450px", mt: 3, mr: 3 }}
                      >
                        <img
                          src={artistDetail.img}
                          style={{
                            width: "450px",
                            height: "450px",
                            position: "relative",
                          }}
                        />
                      </Box>
                    )}
                  </div>
                </div>
              </Typography>
              <Typography
                variant="h3"
                component="div"
                style={{ display: "inline-block", marginTop: "auto" }}
              >
                <div style={{ padding: "20px" }}>
                  <h4>Artist Name</h4>
                  <p>{artistDetail.artist_name}</p>
                </div>
                <div style={{ padding: "20px" }}>
                  <h4>Like Count</h4>
                  <p>{artistDetail.ArtistLikes.length}</p>
                </div>
                <div style={{ padding: "20px" }}>
                  <h4>Music upload Count</h4>
                  <p>{artistDetail.Music.length}</p>
                </div>
              </Typography>
            </Box>
          </Box>
        </Widget>
        {/* <WallPaper sx={{cursor:"pointer"}} 
       onClick={()=>{props.setArtistModal("");}}
       /> */}
      </Box>
    </>
  );
}
