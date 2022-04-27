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
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function AlbumCard({ song, setmusicmodal }) {
  const [TotalLike, setTotalLike] = useState(song.MusicLikes.length);
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
    setmusicmodal(song);
  };

  const likecountpost = async () => {
    dispatch(toggleLikeMusic({ ipfs_hash: song.ipfs_hash }));
    setTotalLike(likeList);
  };

  return (
    <Paper
      sx={{
        width: 250,
        height:150,
        bgcolor:"var(--box1-color)"
      }}

    >
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{p:1}}
      >
        <Grid item>
          <ButtonBase sx={{ borderRadius: "50%" }}>
            <Avatar
              alt="Remy Sharp"
              sx={{ width: 128, height: 128 }}
              src={song.img_file}
              onClick={postInfo}
            />
          </ButtonBase>
        </Grid>

        <Grid 
         direction="column"
         justifyContent="space-between"
         alignItems="center"
         >
          <Grid direction="column">
            <Grid
              direction="column"
              justifyContent="center"
              alignItems="flex-start"
            >
              <div style={{  whiteSpace: "nowrap" }}>
                <Typography
                  sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
                  gutterBottom
                  variant="title"
                  component="div"
                ></Typography>
              </div>
            </Grid>
            <Grid >
              <Typography
                sx={{ cursor: "pointer" }}
                variant="body2"
              ></Typography>
            </Grid>
          </Grid>
          {/* 내가 좋아요 버튼과 싫어요 버튼을 눌렀을때 상태변화 */}
          <Grid >
            {findlike.length === 0 ? (
              <Box style={{ display: "flex" }}>
                <FavoriteBorderIcon
                  sx={{ color: pink[300] }}
                  cursor="pointer"
                  fontSize="large"
                  value={song.ipfs_hash}
                  onClick={() => {
                    likecountpost();
                    setTotalLike(TotalLike + 1);
                    setFindlike(1);
                  }}
                />
                <h1>{TotalLike}</h1>
              </Box>
            ) : (
              <Box style={{ display: "flex" }}>
                <FavoriteIcon
                  sx={{ color: pink[300] }}
                  cursor="pointer"
                  fontSize="large"
                  value={song.ipfs_hash}
                  onClick={() => {
                    likecountpost();
                    setTotalLike(TotalLike - 1);
                    setFindlike("");
                  }}
                />
                <h1>{TotalLike}</h1>
              </Box>
            )}
          </Grid>

          <Grid>
            <Link to={`/create/nft/${song.ipfs_hash}`}>
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
                Mint
              </Button>
            </Link>
          </Grid>

        </Grid>
      </Grid>
    </Paper>
  );
}
