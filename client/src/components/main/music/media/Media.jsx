import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import MusicPlayerSlider from "../../serach/MusicPlayerSlider";
import ArtistModel from "./ArtistModel";

import "./Media.css";
import SimpleBackdrop from "../../../SimpleBackdrop";
import { Avatar } from "@mui/material";

const fakeFetch = (delay = 500) => new Promise((res) => setTimeout(res, delay));

const Media = () => {
  const [lodingState, setLoadingState] = useState(true);

  const artistList = useSelector((state) => state.artistList).data;
  const musicList = useSelector((state) => state.musicList).data;

  const listeningTopList = [...musicList]
    .sort((a, b) => b.play_count - a.play_count)
    .slice(0, 20); //랭킹만들기

  const likeTopList = [...musicList]
    .sort((a, b) => b.MusicLikes.length - a.MusicLikes.length)
    .slice(0, 20);

  const likeArtistTopList = [...artistList]
    .sort((a, b) => b.ArtistLikes.length - a.ArtistLikes.length)
    .slice(0, 20);

  const [listenRankingvalue, setListenRankingValue] = useState(0);
  const [likeRankingValue, setLikeRankingValue] = useState(0);
  const [likeArtistRankingValue, setLikeArtistRankingValue] = useState(0);
  const [veiwCard, setVeiwCard] = useState(0);
  const [musicmodal, setmusicmodal] = useState("");
  const [artistModal, setArtistModal] = useState("");

  useEffect(async () => {
    if (musicList.length > 6) {
      setVeiwCard(6);
    } else {
      setVeiwCard(musicList.length);
    }
    await fakeFetch();
    setLoadingState(false);
  }, []);

  //ToDO: musicList.length = 6 6개이하면 오류남

  const listenRankingMoveLeft = () => {
    listenRankingvalue === 0
      ? setListenRankingValue(-100 * (listeningTopList.length - veiwCard))
      : setListenRankingValue(listenRankingvalue + 100);
  };
  const listenRankingMoveRigth = () => {
    listenRankingvalue === -100 * (listeningTopList.length - veiwCard)
      ? setListenRankingValue(0)
      : setListenRankingValue(listenRankingvalue - 100);
  };
  const likeRankingMoveLeft = () => {
    likeRankingValue === 0
      ? setLikeRankingValue(-100 * (likeTopList.length - veiwCard))
      : setLikeRankingValue(likeRankingValue + 100);
  };
  const rigthRankingMoveLeft = () => {
    likeRankingValue === -100 * (likeTopList.length - veiwCard)
      ? setLikeRankingValue(0)
      : setLikeRankingValue(likeRankingValue - 100);
  };

  const postInfo = (music) => {
    setmusicmodal(music);
  };

  const ArtistPostInfo = (e) => {
    setArtistModal(e);
  };

  const likeArtistRankingMoveLeft = () => {
    likeArtistRankingValue === 0
      ? setLikeArtistRankingValue(-100 * (likeArtistTopList.length - veiwCard))
      : setLikeArtistRankingValue(likeArtistRankingValue + 100);
  };
  const rigthArtistRankingMove = () => {
    likeArtistRankingValue === -100 * (likeArtistTopList.length - veiwCard)
      ? setLikeArtistRankingValue(0)
      : setLikeArtistRankingValue(likeArtistRankingValue - 100);
  };

  return (
    <>
      {lodingState ? (
        <SimpleBackdrop />
      ) : (
        <Box sx={{ overflow: "hidden" }}>
          <Box
            sx={{
              height: "800px",
              overflow: "auto",
            }}
          >
            <Box sx={{ height: "400px", mb: 2 }}>
              <div className="listening-layout">
                <div className="ranking-title">
                  <i className="uil uil-headphones-alt"></i>
                  <span className="ranking-title-text">
                    Listening Top20 Ranking
                  </span>
                </div>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    px: 2,
                  }}
                >
                  <ArrowBackIosIcon
                    sx={{ fontSize: 50, cursor: "pointer" }}
                    onClick={listenRankingMoveLeft}
                  />
                  <Grid
                    sx={{
                      width: "1350px",
                      m: "auto",
                      padding: 0,
                      overflow: "hidden",
                      display: "flex",
                      flexWrap: "nowrap",
                    }}
                  >
                    {listeningTopList.map((music, index) => (
                      <div
                        key={index}
                        className="glide"
                        style={{
                          transform: `translateX(${listenRankingvalue}%)`,
                        }}
                      >
                        <Box
                          key={index}
                          sx={{ cursor: "pointer", width: 210, my: 5, m: 1 }}
                          onClick={() => {
                            postInfo(music);
                          }}
                        >
                          <img
                            style={{
                              width: 210,
                              height: 150,
                              objectFit: "cover",
                            }}
                            alt={music.title}
                            src={music.img_file}
                          />
                          <Box sx={{ pr: 2 }}>
                            <Typography gutterBottom variant="body2">
                              {index + 1}. &nbsp; {music.title}
                            </Typography>
                            <Typography display="block" variant="caption">
                              {music.artist_name}
                            </Typography>
                            <Typography display="block" variant="overline">
                              {music.genre}
                            </Typography>
                            <Typography variant="caption">
                              {`${music.play_count} listening `} •{" "}
                              {`${music.MusicLikes.length} like`}
                            </Typography>
                          </Box>
                        </Box>
                      </div>
                    ))}
                  </Grid>
                  <ArrowForwardIosIcon
                    sx={{ fontSize: 50, cursor: "pointer" }}
                    onClick={listenRankingMoveRigth}
                  />
                </Box>
              </div>
            </Box>

            <Box sx={{ height: "400px", mt: 1 }}>
              <div className="listening-layout">
                <div className="like-ranking">
                  <div className="ranking-title">
                    <i className="uil uil-thumbs-up"></i>
                    <span className="ranking-title-text">
                      Like Music Top20 Ranking
                    </span>
                  </div>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      px: 2,
                    }}
                  >
                    <ArrowBackIosIcon
                      sx={{ fontSize: 50, cursor: "pointer" }}
                      onClick={likeRankingMoveLeft}
                    />
                    <Grid
                      sx={{
                        width: "1350px",
                        m: "auto",
                        padding: 0,
                        overflow: "hidden",
                        display: "flex",
                        flexWrap: "nowrap",
                      }}
                    >
                      {likeTopList.map((music, index) => (
                        <div
                          key={index}
                          className="glide"
                          style={{
                            transform: `translateX(${likeRankingValue}%)`,
                          }}
                        >
                          <Box
                            key={index}
                            sx={{ cursor: "pointer", width: 210, my: 5, m: 1 }}
                            onClick={() => {
                              postInfo(music);
                            }}
                          >
                            <img
                              style={{
                                width: 210,
                                height: 150,
                                objectFit: "cover",
                              }}
                              alt={music.title}
                              src={music.img_file}
                            />
                            <Box sx={{ pr: 1 }}>
                              <Typography gutterBottom variant="body2">
                                {index + 1}. &nbsp; {music.title}
                              </Typography>
                              <Typography display="block" variant="caption">
                                {music.artist_name}
                              </Typography>
                              <Typography display="block" variant="overline">
                                {music.genre}
                              </Typography>
                              <Typography variant="caption">
                                {`${music.play_count} listening `} •{" "}
                                {`${music.MusicLikes.length} like`}
                              </Typography>
                            </Box>
                          </Box>
                        </div>
                      ))}
                    </Grid>
                    <ArrowForwardIosIcon
                      sx={{ fontSize: 50, cursor: "pointer" }}
                      onClick={rigthRankingMoveLeft}
                    />
                  </Box>
                </div>
              </div>
            </Box>

            <Box sx={{ height: "400px", mt: 1 }}>
              <div className="like-ranking">
                <div className="ranking-title">
                  <i className="uil uil-thumbs-up"></i>
                  <span className="ranking-title-text">
                    Like Artist Top20 Ranking
                  </span>
                </div>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    px: 2,
                  }}
                >
                  <ArrowBackIosIcon
                    sx={{ fontSize: 50, cursor: "pointer" }}
                    onClick={likeArtistRankingMoveLeft}
                  />
                  <Grid
                    sx={{
                      width: "1350px",
                      m: "auto",
                      padding: 0,
                      overflow: "hidden",
                      display: "flex",
                      flexWrap: "nowrap",
                    }}
                  >
                    {likeArtistTopList.map((artist, index) => (
                      <div
                        key={index}
                        className="glide"
                        style={{
                          transform: `translateX(${likeArtistRankingValue}%)`,
                        }}
                      >
                        <Box
                          key={index}
                          sx={{ cursor: "pointer", width: 210, my: 5, m: 1 }}
                          onClick={() => {
                            ArtistPostInfo(artist);
                          }}
                        >
                          {artist.img == "" ? (
                            <Avatar
                              className="register-avatar"
                              alt="Remy Sharp"
                              sx={{ width: 210, height: 210 }}
                            />
                          ) : (
                            <img
                              style={{
                                width: 210,
                                height: 210,
                                objectFit: "cover",
                              }}
                              alt={artist.artist_name}
                              src={artist.img}
                            />
                          )}

                          <Box sx={{ pr: 1 }}>
                            <Typography
                              gutterBottom
                              variant="body2"
                            ></Typography>
                            <Typography gutterBottom variant="body2">
                              {index + 1}. &nbsp; {artist.artist_name}
                            </Typography>
                            <Typography
                              display="block"
                              variant="overline"
                            ></Typography>
                            <Typography variant="caption">
                              {`${artist.Music.length} MusicUpload `} •{" "}
                              {`${artist.ArtistLikes.length} like`}
                            </Typography>
                          </Box>
                        </Box>
                      </div>
                    ))}
                  </Grid>
                  <ArrowForwardIosIcon
                    sx={{ fontSize: 50, cursor: "pointer" }}
                    onClick={rigthArtistRankingMove}
                  />
                </Box>
              </div>
            </Box>
          </Box>
        </Box>
      )}

      {musicmodal && (
        <MusicPlayerSlider
          sx={{ display: "fixed" }}
          musicmodal={musicmodal}
          setmusicmodal={setmusicmodal}
        />
      )}

      {/* 모달창입니당 */}
      {artistModal && (
        <ArtistModel
          sx={{ display: "block" }}
          artistModal={artistModal}
          setArtistModal={setArtistModal}
        />
      )}
    </>
  );
};

export default Media;
