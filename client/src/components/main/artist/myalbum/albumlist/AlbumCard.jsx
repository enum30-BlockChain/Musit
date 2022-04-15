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
import { useDispatch, useSelector } from "react-redux";
import { toggleLikeMusic } from "../../../../../redux/actions/musicActions";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function AlbumCard({ song, setmusicmodal }) {
  const [TotalLike, setTotalLike] = useState("");
  const [findlike, setFindlike] = useState("");
  const likeList = useSelector((state) => state.likeMusic);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!likeList.loading) {
      setFindlike(
        likeList.data.filter((music) => {
          return music.ipfs_hash.indexOf(song.ipfs_hash) > -1;
        })
      );
    }
  }, [likeList]);

  const postInfo = () => {
    console.log(song);
    setmusicmodal(song);
  };

  const likecountpost = async () => {
    dispatch(toggleLikeMusic({ ipfs_hash: song.ipfs_hash }));
  };

  const sellmusic = () => {};
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
              src={song.img_file}
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
            {findlike.length === 0 ? (
              <Box>
                <FavoriteBorderIcon
                  sx={{ color: pink[300] }}
                  cursor="pointer"
                  fontSize="large"
                  value={song.ipfs_hash}
                  onClick={() => {
                    likecountpost();
                    setTotalLike();
                    setFindlike(1);
                  }}
                />
                {TotalLike}
              </Box>
            ) : (
              <Box>
                <FavoriteIcon
                  sx={{ color: pink[300] }}
                  cursor="pointer"
                  fontSize="large"
                  value={song.ipfs_hash}
                  onClick={() => {
                    likecountpost();
                    setTotalLike();
                    setFindlike("");
                  }}
                />
                {TotalLike}
              </Box>
            )}
          </Grid>
          <Grid>
            <Link to="/artist/auctionupload">
              <Button
                variant="contained"
                sx={{
                  color: "var(--black-light-color)",
                  backgroundColor: "var(--box1-color)",
                  ":hover": {
                    background: "var(--primary-color)",
                    color: "var(--text-color)",
                  },
                }}
              >
                sell
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
