import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import Avatar from "@mui/material/Avatar";
import { borderRadius } from "@mui/system";
import ThumbUpOffAltOutlinedIcon from "@mui/icons-material/ThumbUpOffAltOutlined";
import ThumbUpOffAltRoundedIcon from "@mui/icons-material/ThumbUpOffAltRounded";
import { useSelector, useDispatch } from "react-redux";
import { toggleLikeArtist,readLikeArtistList } from "../../../../redux/actions/artistActions";
import { Box } from "@mui/material";

export default function ArtistCard(props) {
  const [TotalLike, setTotalLike] = useState(props.artist.ArtistLikes.length);
  const likeArtist = useSelector((state) => state.likeArtist).data;
  const [artistlike, setArtistlike] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (!likeArtist.loading) {
      setArtistlike(
        likeArtist.filter((artist) => {
          return artist.artist_name.indexOf(props.artist.artist_name) > -1;
        })
      );
    }
  }, [likeArtist]);

  //파업창 띄워주는 것
  const postInfo = () => {
    props.setArtistModal(props.artist);
  };

  const likeOnclick = async () => {
    await dispatch(toggleLikeArtist(props.artist.artist_name));
    await dispatch(readLikeArtistList());
  };

  return (
    <Paper
      sx={{
        alignItems: "center",
        p: 2,
        m: 1.5,
        maxWidth: 160,
        bgcolor: "var(--box1-color)",
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
            <Grid item xs={12} sm>
              <Typography
                sx={{ cursor: "pointer" }}
                variant="body2"
              ></Typography>
            </Grid>
          </Grid>
          <Grid item>
            {artistlike.length === 0 ? (
              <Box sx={{ display: "flex" }}>
                <ThumbUpOffAltOutlinedIcon
                  onClick={() => {
                    likeOnclick();
                    setTotalLike(TotalLike + 1);
                    setArtistlike(1);
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
                    likeOnclick();
                    setTotalLike(TotalLike - 1);
                    setArtistlike("");
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
