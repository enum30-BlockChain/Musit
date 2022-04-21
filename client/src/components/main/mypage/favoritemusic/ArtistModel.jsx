import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Box, Avatar, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ArtistSongCard from "./ArtistSongCard";
import SongCardSkeleton from "../../serach/music/SongCardSkeleton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

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
  const [findMusic, setFindMusic] = useState("");
  const [viewMusicCard, setViewMusicCard] = useState(0);
  const [value, setValue] = useState(0);
  const location = useLocation();
  const content = location.state !== null || undefined ? location.state : "";

  const searching = useSelector((state) => state.searching).searching;

  const artists = props.artistModal.Artist;

  const musics = props.artistModal.Artist.Music;

  const getmusicList = async () => {
    //처음에 뮤직검색
    let searchCount = musics.filter((song) => song.title.indexOf(content) > -1);
    setFindMusic(searchCount);
    setViewMusicCard(searchCount.length);
    //카드 움직임 구해줌
    if (searchCount.length > 4) {
      setViewMusicCard(4);
    } else {
      setViewMusicCard(searchCount.length);
    }
  };

  useEffect(() => {
    if (!musics.loading) {
      const init = async () => {
        await getmusicList();
      };
      init();
    }
  }, [musics]);

  useEffect(() => {
    changeSearchPage();
  }, [searching]);

  const changeSearchPage = () => {
    if (musics) {
      const searchMusicNameData = musics.filter((song) => {
        return song.title.indexOf(searching) > -1;
      });
      setFindMusic(searchMusicNameData);

      if (searchMusicNameData.length > 4) {
        setViewMusicCard(4);
        setValue(0);
      } else {
        setViewMusicCard(searchMusicNameData.length);
        setValue(0);
      }
    }
  };

  //카드이동
  const moveAhead = () => {
    value === 0
      ? setValue(-100 * (findMusic.length - viewMusicCard))
      : setValue(value + 100);
    console.log(value);
  };
  const moveBehind = () => {
    value === -100 * (findMusic.length - viewMusicCard)
      ? setValue(0)
      : setValue(value - 100);
    console.log(value);
  };

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
            <Box sx={{ mt: 4, ml: 5 }}>
              <Typography variant="h3" component="div">
                <h1>Artist</h1>
                <div>
                  <div className="img-box">
                    {artists.img === "" ? (
                      <Avatar
                        className="register-avatar"
                        alt="Remy Sharp"
                        sx={{ width: 150, height: 150 }}
                      />
                    ) : (
                      <img
                        src={artists.img}
                        style={{ width: 150, height: 150 }}
                      />
                    )}
                  </div>
                  <h4>Artist Name</h4>
                  <p>{artists.artist_name}</p>
                  <h4>Artist likes</h4>
                  <p>{artists.likes}</p>
                </div>
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                height: "80%",
                px: 2,
              }}
            >
              <ArrowBackIosIcon
                sx={{ fontSize: 65, cursor: "pointer" }}
                onClick={moveAhead}
              />
              <Grid
                sx={{
                  width: "650px",
                  padding: 0,
                  overflow: "hidden",
                }}
              >
                <Box sx={{ mt: 2, display: "flex", flexDirection: "row" }}>
                  {musics.loading
                    ? [1, 2, 3, 4].map((music, i) => {
                        return (
                          <SongCardSkeleton
                            key={i}
                            music={music}
                            setmusicmodal={setmusicmodal}
                            address={props.address}
                          />
                        );
                      })
                    : findMusic &&
                      findMusic.map((music, i) => {
                        return (
                          <Grid sx={{ width: "25%" }} key={i}>
                            <div
                              className="glide"
                              style={{ transform: `translateX(${value}%)` }}
                            >
                              <ArtistSongCard
                                music={music}
                                address={props.address}
                                setmusicmodal={props.setmusicmodal}
                              />
                            </div>
                          </Grid>
                        );
                      })}
                </Box>
              </Grid>
              <ArrowForwardIosIcon
                sx={{ fontSize: 65, cursor: "pointer" }}
                onClick={moveBehind}
              />
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
