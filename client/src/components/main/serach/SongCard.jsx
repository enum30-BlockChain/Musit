import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HeadsetIcon from "@mui/icons-material/Headset";
import ThumbUpOffAltOutlinedIcon from "@mui/icons-material/ThumbUpOffAltOutlined";
import ThumbUpOffAltRoundedIcon from "@mui/icons-material/ThumbUpOffAltRounded";
import { Provider, useSelector, useDispatch } from "react-redux";
import { toggleLikeMusic } from "../../../redux/actions/musicActions"

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function SongCard(props) {
  const [TotalLike, setTotalLike] = useState(props.music.MusicLikes.length);
  const likeList = useSelector((state) => state.likeMusic);
  const [findlike, setFindlike] = useState("");
  const dispatch = useDispatch();
   

  useEffect(() => {
      if(!likeList.loading){
      setFindlike(
        likeList.data.filter((song) => {
          return song.ipfs_hash.indexOf(props.music.ipfs_hash) > -1;
        })
      );
    }
  }, [likeList]);

  const postInfo = () => {
    props.setmusicmodal(props.music);
  };

  const likecountpost = async () => {
    dispatch(toggleLikeMusic(props.music))
  };
  return (
    <Paper
      sx={{
        alignItems: "center",
        p: 2,
        mx: 1.5,
        maxWidth: 350,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      }}
    >
      <Grid sx={{ height: 150, display: "flex", width: "100%" }}>
        <Grid item>
          <ButtonBase sx={{ width: 130, height: 130 }}>
            <Img alt="complex" src={props.music.img_file} onClick={postInfo} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sx={{ ml: 1.5 }} sm container>
          <Grid
            item
            xs
            container
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
          >
            <div style={{ width: 170, whiteSpace: "nowrap" }}>
              <Typography
                sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
                gutterBottom
                variant="title"
                component="div"
              >
                {props.music.title}
              </Typography>
            </div>
            <Typography variant="body2" gutterBottom>
              {props.music.artist_name}
            </Typography>
            <Box sx={{ display: "flex" }}>
              <AccessTimeIcon fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="body2" gutterBottom>
                {Math.floor(props.music.play_time / 60)}:
                {props.music.play_time % 60}
              </Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
              <HeadsetIcon fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="body2" gutterBottom>
                {props.music.play_count}
              </Typography>
            </Box>

            {findlike.length === 0 ? ( //따봉
              <Box sx={{ display: "flex" }}>
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
              <Box sx={{ display: "flex" }}>
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
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
