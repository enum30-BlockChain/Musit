import "./Search.css";
import React, { useState, useEffect } from "react";
import { TextField, Typography, Box, Stack } from "@mui/material";
import MusicPlayerSlider from "./MusicPlayerSlider";
import SongCard from "./music/SongCard";
import ArtistCard from "./artist/ArtistCard";
import ArtistModal from "./artist/ArtistModal";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { readMusicList } from "../../../redux/actions/musicActions";
import { readArtistList } from "../../../redux/actions/artistActions";
import SongCardSkeleton from "./music/SongCardSkeleton";
import ArtistCardSkeleton from "./artist/ArtistCardSkeleton";
import Nothing from "../../landingpage/pages/Nothing";

function Search(props) {
  const dispatch = useDispatch();
  const [musicmodal, setmusicmodal] = useState("");
  const [artistModal, setArtistModal] = useState("");
  const [findMusic, setFindMusic] = useState("");
  const [findArtist, setFindArtist] = useState("");
  const [value, setValue] = useState(0);
  const [value2, setValue2] = useState(0);
  const [viewMusicCard, setViewMusicCard] = useState(0);
  const [viewArtistCard, setViewArtistCard] = useState(0);
  const location = useLocation();
  const content = location.state !== null || undefined ? location.state : "";

  const musicList = useSelector((state) => state.musicList);
  const artistList = useSelector((state) => state.artistList);
  const searching = useSelector((state) => state.searching).searching;

  const getmusicList = async () => {
    //처음에 뮤직검색
    let searchCount = musicList.data.filter(
      (song) => song.title.toLowerCase().indexOf(content.toLowerCase()) > -1
    );
    setFindMusic(searchCount);
    setViewMusicCard(searchCount.length);
    //카드 움직임 구해줌
    if (searchCount.length > 4) {
      setViewMusicCard(4);
    } else {
      setViewMusicCard(searchCount.length);
    }
  };

  const getUser = async () => {
    //유저검색
    let searchCount = artistList.data.filter(
      (artist) =>
        artist.artist_name.toLowerCase().indexOf(content.toLowerCase()) > -1
    );
    setFindArtist(searchCount);
    setViewArtistCard(searchCount.length);

    if (searchCount.length > 8) {
      setViewArtistCard(8);
    } else {
      setViewArtistCard(searchCount.length);
    }
  };

  useEffect(() => {
    if (!musicList.loading && artistList.loading) {
      const init = async () => {
        await getUser();
        await getmusicList();
      };
      init();
    }
  }, [musicList, artistList]);

  useEffect(() => {
    changeSearchPage();
  }, [searching]);

  useEffect(() => {
    const init = async () => {
      await dispatch(readMusicList());
      await dispatch(readArtistList());
    };
    init();
  }, []);

  const changeSearchPage = () => {
    if (musicList.data && artistList.data) {
      const searchMusicNameData = musicList.data.filter((song) => {
        return song.title.toLowerCase().indexOf(searching.toLowerCase()) > -1;
      });
      const searchAtistData = artistList.data.filter((artist) => {
        return (
          artist.artist_name.toLowerCase().indexOf(searching.toLowerCase()) > -1
        );
      });
      setFindMusic(searchMusicNameData);
      setFindArtist(searchAtistData);

      if (searchMusicNameData.length > 4) {
        setViewMusicCard(4);
        setValue(0);
      } else {
        setViewMusicCard(searchMusicNameData.length);
        setValue(0);
      }

      if (searchAtistData.length > 4) {
        setViewArtistCard(0);
        setValue2(0);
      } else {
        setViewArtistCard(searchAtistData.length);
        setValue2(0);
      }
    }
  };

  //카드이동
  const moveAhead = () => {
    value === 0
      ? setValue(-100 * (findMusic.length - viewMusicCard))
      : setValue(value + 100);
  };
  const moveBehind = () => {
    value === -100 * (findMusic.length - viewMusicCard)
      ? setValue(0)
      : setValue(value - 100);
  };

  const moveAhead2 = () => {
    value2 === 0
      ? setValue2(-100 * (findArtist.length - viewArtistCard))
      : setValue2(value2 + 100);
  };
  const moveBehind2 = () => {
    value2 === -100 * (findArtist.length - viewArtistCard)
      ? setValue2(0)
      : setValue2(value2 - 100);
  };

  return (
    <Box sx={{ height: "100%" }}>
      <div className="music-searchresult">
        <Box sx={{ height: "300px" }}>
          <div className="title">
            <i className="uil uil-search"></i>

            <span className="text"> Music Search Result</span>
          </div>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: "80%",
              px: 2,
            }}
          >
            <ArrowBackIosIcon
              sx={{ fontSize: 50, cursor: "pointer" }}
              onClick={moveAhead}
            />
            <Grid
              sx={{
                width: "1480px",
                m: "auto",
                padding: 0,
                overflow: "hidden",
              }}
            >
              <Grid
                container
                sx={{ width: "100%", display: "flex", flexWrap: "nowrap" }}
              >
                {musicList.loading ? (
                  [1, 2, 3, 4].map((music, i) => {
                    return (
                      <SongCardSkeleton
                        key={i}
                        music={music}
                        setmusicmodal={setmusicmodal}
                        address={props.address}
                      />
                    );
                  })
                ) : findMusic == "" ? (
                  <Nothing />
                ) : (
                  findMusic &&
                  findMusic.map((music, i) => {
                    return (
                      <Grid sx={{ width: "25%" }} key={i}>
                        <div
                          className="glide"
                          key={i}
                          style={{ transform: `translateX(${value}%)` }}
                        >
                          <SongCard
                            music={music}
                            setmusicmodal={setmusicmodal}
                            address={props.address}
                          />
                        </div>
                      </Grid>
                    );
                  })
                )}
              </Grid>
            </Grid>
            <ArrowForwardIosIcon
              sx={{ fontSize: 50, cursor: "pointer" }}
              onClick={moveBehind}
            />
          </Box>
        </Box>
      </div>

      <div className="music-searchresult-2">
        <Box sx={{ height: "60%" }}>
          <div className="title">
            <i className="uil uil-search"></i>
            <span className="text"> Artist Search Result</span>
          </div>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: "400px",
              px: 2,
            }}
          >
            <ArrowBackIosIcon
              sx={{ fontSize: 50, cursor: "pointer" }}
              onClick={moveAhead2}
            />
            <Grid
              sx={{
                width: "1480px",
                m: "auto",
                padding: 0,
                overflow: "hidden",
              }}
            >
              <Grid
                container
                sx={{ width: "100%", display: "flex", flexWrap: "nowrap" }}
              >
                {artistList.loading ? (
                  [1, 2, 3, 4, 5, 6, 7, 8].map((artist, i) => {
                    return (
                      <ArtistCardSkeleton
                        key={i}
                        artist={artist}
                        address={props.address}
                      />
                    );
                  })
                ) : findArtist == "" ? (
                  <Nothing />
                ) : (
                  findArtist &&
                  findArtist.map((artist, i) => {
                    return (
                      <Grid key={i}>
                        <div
                          className="glide"
                          style={{ transform: `translateX(${value2}%)` }}
                        >
                          <ArtistCard
                            artist={artist}
                            setArtistModal={setArtistModal}
                            address={props.address}
                          />
                        </div>
                      </Grid>
                    );
                  })
                )}
              </Grid>
            </Grid>
            <ArrowForwardIosIcon
              sx={{ fontSize: 50, cursor: "pointer" }}
              onClick={moveBehind2}
            />
          </Box>
        </Box>
      </div>

      {/* 모달창입니당 */}
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
          address={props.address}
          musicmodal={musicmodal}
          setmusicmodal={setmusicmodal}
        />
      )}
    </Box>
  );
}

export default Search;
