import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import FastForwardRounded from "@mui/icons-material/FastForwardRounded";
import FastRewindRounded from "@mui/icons-material/FastRewindRounded";
import VolumeUpRounded from "@mui/icons-material/VolumeUpRounded";
import VolumeDownRounded from "@mui/icons-material/VolumeDownRounded";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { pink } from "@mui/material/colors";
import { Provider, useSelector, useDispatch } from "react-redux";
import { toggleLikeMusic } from "../../../redux/actions/musicActions";

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
  width: 500,
  maxWidth: "100%",
  margin: "auto",
  position: "absolute",
  top: "35%",
  left: "35%",
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

const TinyText = styled(Typography)({
  fontSize: "0.75rem",
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});

export default function MusicPlayerSlider(props) {
  const audioPlayer = useRef();
  const theme = useTheme();
  const [duration, setDuration] = useState(0); // seconds
  const [position, setPosition] = useState(0);
  const [paused, setPaused] = useState(true);
  const [findlike, setFindlike] = useState("");
  const likeList = useSelector((state) => state.likeMusic).data;

  const dispatch = useDispatch();

  useEffect(() => {
    setFindlike(
      likeList.filter(
        (song) => song.ipfs_hash.indexOf(props.musicmodal.ipfs_hash) > -1
      )
    );
  }, [props]);

  const palyCountAdd = async () => {
    const content = { play_count: props.musicmodal.play_count + 1 };
    await axios.patch(
      `http://54.180.145.5/music/${props.musicmodal.ipfs_hash}`,
      content
    );
    // .then((res) => {        console.log(res);      })
  };

  function formatDuration(value) {
    //시간 정리
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft < 9 ? `0${secondLeft}` : secondLeft}`;
  }
  const mainIconColor = theme.palette.mode === "dark" ? "#fff" : "#000";
  const lightIconColor =
    theme.palette.mode === "dark" ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)";

  const likecountpost = async () => {
    dispatch(toggleLikeMusic(props.musicmodal));
  };

  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      <Widget>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CoverImage>
            <img alt="이미지주소 넣으셈" src={props.musicmodal.img_file} style={{ height: "100%", weight: "100%", objectFit: "cover"}} />
          </CoverImage>
          <audio
            ref={audioPlayer}
            src={`https://ipfs.infura.io/ipfs/${props.musicmodal.ipfs_hash}`}
            onLoadedData={(e) => {
              setDuration(Math.floor(e.currentTarget.duration));
            }}
            onTimeUpdate={(e) => {
              setPosition(Math.floor(e.currentTarget.currentTime));
            }}
            onEnded={() => {
              palyCountAdd();
            }}
          />
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            sx={{ m: 1.5, width: "80%" }}
          >
            <Box sx={{ m: 1.5, minWidth: 0 }}>
              <Typography
                variant="caption"
                color="text.secondary"
                fontWeight={500}
              >
                Genre: {props.musicmodal.genre}
              </Typography>
              <Typography noWrap>
                <b> {props.musicmodal.title}</b>
              </Typography>
              <Typography noWrap letterSpacing={-0.25}>
                {props.musicmodal.artist_name}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CloseIcon
                cursor="pointer"
                fontSize="large"
                onClick={() => {
                  props.setmusicmodal("");
                }}
              />
              {findlike.length === 0 ? (
                <FavoriteBorderIcon
                  cursor="pointer"
                  fontSize="large"
                  onClick={() => {
                    setFindlike(1);
                    likecountpost();
                  }}
                />
              ) : (
                <FavoriteIcon
                  cursor="pointer"
                  fontSize="large"
                  onClick={() => {
                    setFindlike("");
                    likecountpost();
                  }}
                />
              )}
            </Box>
          </Stack>
        </Box>
        <Slider
          aria-label="time-indicator"
          size="small"
          value={position}
          min={0}
          step={1}
          max={duration}
          onChange={(_, value) => {
            setPosition(value);
            audioPlayer.current.currentTime = value;
          }}
          sx={{
            color: theme.palette.mode === "dark" ? "#fff" : "rgba(0,0,0,0.87)",
            height: 4,
            "& .MuiSlider-thumb": {
              width: 8,
              height: 8,
              transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
              "&:before": {
                boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
              },
              "&:hover, &.Mui-focusVisible": {
                boxShadow: `0px 0px 0px 8px ${
                  theme.palette.mode === "dark"
                    ? "rgb(255 255 255 / 16%)"
                    : "rgb(0 0 0 / 16%)"
                }`,
              },
              "&.Mui-active": {
                width: 20,
                height: 20,
              },
            },
            "& .MuiSlider-rail": {
              opacity: 0.28,
            },
          }}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: -2,
          }}
        >
          <TinyText>{formatDuration(position)}</TinyText>
          <TinyText>-{formatDuration(duration - position)}</TinyText>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: -1,
          }}
        >
          <IconButton aria-label="previous song">
            <FastRewindRounded fontSize="large" htmlColor={mainIconColor} />
          </IconButton>
          <IconButton
            aria-label={paused ? "play" : "pause"}
            onClick={() => {
              const musicContainer = document.querySelector(".music-container");
              if(musicContainer){
                setPaused(!paused);
                if (paused === true) {
                  audioPlayer.current.play();
                  const musicContainer = document.querySelector(".music-container");
                  const playBtn = document.querySelector("#play");
                  musicContainer.classList.remove("play");
                  playBtn.querySelector("i.fas").classList.add("fa-play");
                  playBtn.querySelector("i.fas").classList.remove("fa-pause");
                  audio.pause();
                } else if (paused === false) {
                  audioPlayer.current.pause();
                }
              }else {
                alert('이용권을 구매하세요')
              }
            }}
          >
            {paused ? (
              <PlayArrowRounded
                sx={{ fontSize: "3rem" }}
                htmlColor={mainIconColor}
              />
            ) : (
              <PauseRounded
                sx={{ fontSize: "3rem" }}
                htmlColor={mainIconColor}
              />
            )}
          </IconButton>
          <IconButton aria-label="next song">
            <FastForwardRounded fontSize="large" htmlColor={mainIconColor} />
          </IconButton>
        </Box>
        <Stack
          spacing={2}
          direction="row"
          sx={{ mb: 1, px: 1 }}
          alignItems="center"
        >
          <VolumeDownRounded htmlColor={lightIconColor} />

          <Slider
            aria-label="Volume"
            defaultValue={100}
            onChange={(_, value) => {
              audioPlayer.current.volume = value * 0.01;
            }}
            sx={{
              color:
                theme.palette.mode === "dark" ? "#fff" : "rgba(0,0,0,0.87)",
              "& .MuiSlider-track": {
                border: "none",
              },
              "& .MuiSlider-thumb": {
                width: 24,
                height: 24,
                backgroundColor: "#fff",
                "&:before": {
                  boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
                },
                "&:hover, &.Mui-focusVisible, &.Mui-active": {
                  boxShadow: "none",
                },
              },
            }}
          />
          <VolumeUpRounded htmlColor={lightIconColor} />
        </Stack>
      </Widget>
      {/* <WallPaper sx={{cursor:"pointer"}} onClick={()=>{props.setmusicmodal("");}} /> */}
    </Box>
  );
}
