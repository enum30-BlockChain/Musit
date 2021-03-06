import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HeadsetIcon from "@mui/icons-material/Headset";
import { useSelector, useDispatch } from "react-redux";
import ThumbUpOffAltOutlinedIcon from "@mui/icons-material/ThumbUpOffAltOutlined";
import ThumbUpOffAltRoundedIcon from "@mui/icons-material/ThumbUpOffAltRounded";
import { toggleLikeMusic } from "../../../../redux/actions/musicActions";

export default function MainCard(props) {
  const [TotalLike, setTotalLike] = useState(props.music.MusicLikes.length);
  const [findlike, setFindlike] = useState("");
  const [playState, setPlayStete] = useState(true);
  const likeList = useSelector((state) => state.likeMusic);
  const dispatch = useDispatch();
  const slicedescription = () => {
    if (props.music.description.length > 25) {
      return props.music.description.substr(0, 25) + "...";
    } else {
      return props.music.description;
    }
  };

  useEffect(() => {
    if (!likeList.loading) {
      setFindlike(
        likeList.data.filter((song) => {
          return song.ipfs_hash.indexOf(props.music.ipfs_hash) > -1;
        })
      );
    }
  }, [likeList]);

  const likecountpost = async () => {
    dispatch(toggleLikeMusic(props.music));
  };

  function playBarPauseSong() {
    // playBar다른페이재생 정지
    const musicContainer = document.querySelector(".music-container");
    const playBtn = document.querySelector("#play");
    const audio = document.querySelector("#audio");
    if (musicContainer) {
      musicContainer.classList.remove("play");
      playBtn.querySelector("i.fas").classList.add("fa-play");
      playBtn.querySelector("i.fas").classList.remove("fa-pause");
      audio.pause();
    } else {
      throw Error("Login first")
    }
  }

  const musicCardOnClick = async () => {
    const musicContainer = document.querySelector(".music-container");
    if(musicContainer){
      const musicCard = document.querySelector(`.music-card.card-${props.id}`);
      const musicCardPlaying = document.querySelector(".music-card.playing");
      if (musicCardPlaying) musicCardPlaying.classList.remove("playing");
      musicCard.classList.toggle("playing");
      const audio = document.querySelector("#MusicCardAudio");
      const playingState = document.querySelector(` .music-card.card-${props.id}.music-card.playing`);
        if (playingState) {
          if(audio.src===`https://ipfs.infura.io/ipfs/${props.music.ipfs_hash}` && playState){//지금재생하는 노래랑 같다면 정지
            musicCardPlaying.classList.remove("playing");  
            audio.pause();
            setPlayStete(false);
          }else{
            audio.src = `https://ipfs.infura.io/ipfs/${props.music.ipfs_hash}`;
            await playBarPauseSong();
            audio.play();
            setPlayStete(true);
          }
      } else {
        audio.pause();
      }
    }
  };

  const palyCountAdd = async () => {
    const content = { play_count: props.music.play_count + 1 };
    await axios.patch(
      `http://54.180.145.5/music/${props.music.ipfs_hash}`,
      content
    );
    const musicCardPlaying = document.querySelector(" .music-card.playing");
    if (musicCardPlaying) musicCardPlaying.classList.remove("playing");
  };
  return (
    <>
      <Box
        className={`music-card card-${props.id}`}
        sx={{ m: "auto", width: "100%" }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            onClick={musicCardOnClick}
            sx={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <audio
              id="MusicCardAudio"
              onEnded={() => {
                palyCountAdd();
              }}
            />

            <CardMedia
              component="img"
              sx={{ m: 1, width: 40, height: 40 }}
              image={props.music.img_file}
              alt="Live from space album cover"
            />
            <Box
              justifyContent="center"
              sx={{ mx: 1, display: "flex", width: 40 }}
            >
              <Typography component="div" variant="h7">
                {props.id + 1}
              </Typography>
            </Box>

            <Box
              justifyContent="space-between"
              sx={{ ml: 3, display: "flex", width: "80%" }}
            >
              <Typography component="div" variant="h6" sx={{ width: "35%" }}>
                {props.music.title}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
                sx={{ width: "25%" }}
              >
                {props.music.artist_name}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
                sx={{ width: "40%" }}
              >
                {slicedescription()}
              </Typography>
            </Box>
          </Box>
          <Box
            justifyContent="space-between"
            sx={{ alignItems: "center", display: "flex", width: "18%" }}
          >
            {findlike.length === 0 ? ( //따봉
              <Box sx={{ display: "flex", width: "0%" }}>
                <ThumbUpOffAltOutlinedIcon
                  onClick={() => {
                    likecountpost();
                    setTotalLike(TotalLike + 1);
                    setFindlike(1);
                  }}
                  sx={{ mr: 0.5 }}
                  cursor="pointer"
                  fontSize="small"
                />
                {TotalLike}
              </Box>
            ) : (
              <Box sx={{ display: "flex", width: "0%" }}>
                <ThumbUpOffAltRoundedIcon
                  onClick={() => {
                    likecountpost();
                    setTotalLike(TotalLike - 1);
                    setFindlike("");
                  }}
                  sx={{ mr: 0.5 }}
                  cursor="pointer"
                  fontSize="small"
                />
                {TotalLike}
              </Box>
            )}
            <Box sx={{ display: "flex", alignItems: "center", width: "0%" }}>
              <HeadsetIcon fontSize="small" />
              <Typography variant="overline" display="block">
                {props.music.play_count}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", width: "30%" }}>
              <AccessTimeIcon fontSize="small" />
              <Typography variant="overline" display="block">
                {Math.floor(props.music.play_time / 60)}:
                {props.music.play_time % 60}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider />
      </Box>
    </>
  );
}
