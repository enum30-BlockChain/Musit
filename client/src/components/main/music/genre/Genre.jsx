import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArtistCard from "../../serach/artist/ArtistCard";
import ArtistModal from "../../serach/artist/ArtistModal";
import MusicPlayerSlider from "../../serach/MusicPlayerSlider";

import "./Genre.css";
import SimpleBackdrop from "../../../SimpleBackdrop";

const fakeFetch = (delay = 500) => new Promise((res) => setTimeout(res, delay));

export default function Genre() {
  const [lodingState, setLoadingState] = useState(true);
  const [genreRecommend, setGenreRecommend] = useState([]);
  const [artistRecommend, setArtistRecommend] = useState([]);
  const musicList = useSelector((state) => state.musicList).data;
  const artistList = useSelector((state) => state.artistList).data;
  const likeMusic = useSelector((state) => state.likeMusic).data;
  const [genre, setGenre] = useState(0);
  const [viewGenreCard, setViewGenreCard] = useState(0);
  const [likeTopGenre, setLikeTopGenre] = useState("");
  const [artistModal, setArtistModal] = useState("");
  const [musicmodal, setmusicmodal] = useState("");
  const [value, setValue] = useState(0);
  const [viewArtistCard, setViewArtistCard] = useState(0);
  useEffect(async () => {
    await fakeFetch();
    setLoadingState(false);
  }, []);
  useEffect(() => {
    const likeGenre = [...likeMusic];
    const GenreBox = [];
    likeGenre.forEach((e) => {
      GenreBox.push(...e.genre);
    });
    const result = GenreBox.reduce((accu, curr) => {
      accu[curr] = (accu[curr] || 0) + 1;
      return accu;
    }, []);
    const GenreRecommendHandler = () => {
      const topGenre = Object.entries(result)
        .sort(([, a], [, b]) => b - a)
        .reduce((r, [k]) => [...r, k], []);
      if (topGenre.length > 0) {
        setLikeTopGenre(topGenre[0]);
        return musicList.filter((song) => song.genre.indexOf(topGenre[0]) > -1);
      } else {
        return musicList;
      }
    };
    setGenreRecommend(GenreRecommendHandler());
    if (GenreRecommendHandler().length > 6) {
      setViewGenreCard(6);
    } else {
      setViewGenreCard(GenreRecommendHandler().length);
    }
  }, [likeMusic]);

  useEffect(() => {
    //아티스트가 올린 노래 장르 종합해서 아티스트 추천 목록에 아티스트 넣어줌
    const likeGenre = [...artistList];
    const artistRecommendBox = [];
    likeGenre.forEach((e) => {
      const aritstGenreBox = [];
      e.Music.forEach((a) => {
        aritstGenreBox.push(...a.genre);
      });
      const result = aritstGenreBox.reduce((accu, curr) => {
        accu[curr] = (accu[curr] || 0) + 1;
        return accu;
      }, []);
      const topGenre = Object.entries(result)
        .sort(([, a], [, b]) => b - a)
        .reduce((r, [k]) => [...r, k], []);
      if (
        topGenre.indexOf(likeTopGenre) <= 3 &&
        topGenre.indexOf(likeTopGenre) > -1
      ) {
        artistRecommendBox.push(e);
      }
    });
    if (artistRecommendBox.length === 0) {
      setArtistRecommend(artistList);
      if (artistList.length > 8) {
        setViewArtistCard(8);
      } else {
        setViewArtistCard(artistList.length);
      }
    } else {
      setArtistRecommend(artistRecommendBox);
      if (artistRecommendBox.length > 8) {
        setViewArtistCard(8);
      } else {
        setViewArtistCard(artistRecommendBox.length);
      }
    }
  }, [artistList, likeTopGenre]);

  const postInfo = (music) => {
    setmusicmodal(music);
  };

  const genreMoveLeft = () => {
    genre === 0
      ? setGenre(-100 * (genreRecommend.length - viewGenreCard))
      : setGenre(genre + 100);
  };
  const genreMoveRigth = () => {
    genre === -100 * (genreRecommend.length - viewGenreCard)
      ? setGenre(0)
      : setGenre(genre - 100);
  };
  const moveAhead = () => {
    value === 0
      ? setValue(-100 * (artistRecommend.length - viewArtistCard))
      : setValue(value + 100);
  };
  const moveBehind = () => {
    value === -100 * (artistRecommend.length - viewArtistCard)
      ? setValue(0)
      : setValue(value - 100);
  };
  return (
    <>
      {lodingState ? (
        <SimpleBackdrop />
      ) : (
        <Box sx={{ height: "100%" }}>
          <Box sx={{ height: "40%", mb: 2 }}>
            <div className="Recommend-layout">
              <div className="Recommend-title">
                <i className="uil uil-headphones-alt"></i>
                <span className="Recommend-title-text">Music Recommend</span>
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
                  onClick={genreMoveLeft}
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
                  {genreRecommend &&
                    genreRecommend.map((music, index) => (
                      <div
                        key={index}
                        className="glide"
                        style={{ transform: `translateX(${genre}%)` }}
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
                              {music.title}
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
                  onClick={genreMoveRigth}
                />
              </Box>
            </div>
          </Box>

          <Box sx={{ height: "45%", mt: 1 }}>
            <div className="Genre-layout">
              <div className="Recommend-title">
                <i className="uil uil-headphones-alt"></i>
                <span className="Recommend-title-text"> Artist Recommend</span>
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
                  onClick={moveAhead}
                />
                <Grid
                  sx={{
                    width: "1460px",
                    m: "auto",
                    padding: 0,
                    overflow: "hidden",
                    display: "flex",
                    flexWrap: "nowrap",
                  }}
                >
                  {artistRecommend &&
                    artistRecommend.map((artist, i) => {
                      return (
                        <Grid key={i}>
                          <div
                            className="glide"
                            style={{ transform: `translateX(${value}%)` }}
                          >
                            <ArtistCard
                              artist={artist}
                              setArtistModal={setArtistModal}
                            />
                          </div>
                        </Grid>
                      );
                    })}
                </Grid>
                <ArrowForwardIosIcon
                  sx={{ fontSize: 50, cursor: "pointer" }}
                  onClick={moveBehind}
                />
              </Box>
            </div>
          </Box>
        </Box>
      )}

      {artistModal && (
        <ArtistModal
          sx={{ display: "block" }}
          artistModal={artistModal}
          setArtistModal={setArtistModal}
          setmusicmodal={setmusicmodal}
        />
      )}
      {musicmodal && (
        <MusicPlayerSlider
          sx={{ display: "block" }}
          musicmodal={musicmodal}
          setmusicmodal={setmusicmodal}
        />
      )}
    </>
  );
}
