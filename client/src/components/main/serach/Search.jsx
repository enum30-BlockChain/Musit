import React, { useState, useEffect } from "react";
import { TextField, Typography, Box, Stack } from "@mui/material";
import axios from "axios";
import MusicPlayerSlider from "./MusicPlayerSlider";
import SongCard from "./SongCard";
import ArtistCard from "./ArtistCard";
import ArtistModal from "./ArtistModal";
import { useNavigate, useLocation } from "react-router-dom";
import { Provider, useSelector, useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Divider from "@mui/material/Divider";
import { readMusicList } from "../../../redux/actions/musicActions";
import { dnsEncode } from "ethers/lib/utils";

function Search(props) {
  const [musicmodal, setmusicmodal] = useState("");
  const [artistModal, setArtistModal] = useState("");
  const [findMusic, setFindMusic] = useState("");
  const [findArtist, setFindArtist] = useState("");
  const [value, setValue] = useState(0);
  const [viewMusicCard, setViewMusicCard] = useState(0);
  const dispatch = useDispatch();
  const location = useLocation();
  const content = location.state !== null || undefined ? location.state : null;

  const musicList = useSelector((state) => state.musicList);
  const artistList = useSelector((state) => state.musicList);
  const searching = useSelector((state) => state.searching).searching;

  const getmusicList = async () => {
    //처음에 뮤직검색
    let searchCount = musicList.data.filter(
      (song) => song.title.indexOf(content) > -1
      );
      setFindMusic(searchCount);
      setViewMusicCard(searchCount.length);
  };
  const getUser = async () => {
    //유저검색
    let searchCount = artistList.data.filter(
            (a) => a.artist_name.indexOf(content) > -1
          );
      setFindArtist(searchCount);
  };
  useEffect(() => {
    if(!musicList.loading){
    const init = async () => {
        await getUser(content);
        await getmusicList(content);
      };
      init();
    }
    }, [musicList])
    

  useEffect(() => {
    changeSearchPage();
  }, [searching]);

  const changeSearchPage = () => {
    if (musicList.data && artistList.data) {
      console.log(artistList.data)
      const searchMusicNameData = musicList.data.filter((song) => {
        return song.title.indexOf(searching) > -1;
      });
      const searchAtistData = artistList.data.filter((a) => {
        return a.artist_name.indexOf(searching) > -1;
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
  return (
    <Box sx={{ height: "100%" }}>
      <Box sx={{ height: "40%" }}>
        <Typography variant="h4" gutterBottom>
          Music
        </Typography>
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
              {findMusic &&
                findMusic.map((music, i) => {
                  return (
                    <Grid xs={{ width: "25%" }}>
                      <div
                        key={i}
                        className="glide"
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
                })}
            </Grid>
          </Grid>
          <ArrowForwardIosIcon
            sx={{ fontSize: 65, cursor: "pointer" }}
            onClick={moveBehind}
          />
        </Box>
      </Box>
      <Divider sx={{ my: 5 }} />
      <Box sx={{ height: "60%" }}>
        <Typography variant="h4" gutterBottom>
          Artist
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: "70%",
            px: 2,
          }}
        >
          <ArrowBackIosIcon sx={{ fontSize: 65, cursor: "pointer" }} />
          <Grid
            sx={{
              alignItems: "center",
              width: "1450px",
              m: "auto",
              padding: 0,
              overflow: "hidden",
            }}
          >
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
              spacing={2}
            >
              {findArtist &&
                findArtist.map((artist) => {
                  return (
                    <ArtistCard
                      artist={artist}
                      setArtistModal={setArtistModal}
                      address={props.address}
                    />
                  );
                })}
            </Stack>
          </Grid>
          <ArrowForwardIosIcon sx={{ fontSize: 65, cursor: "pointer" }} />
        </Box>
      </Box>
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
