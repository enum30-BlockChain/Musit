import React, { useState, useEffect } from "react";
import { TextField,Typography,Box,Stack} from '@mui/material'
import axios from "axios";
import MusicPlayerSlider from "./MusicPlayerSlider";
import SongCard from "./SongCard";
import ArtistCard from "./ArtistCard";
import ArtistModal from "./ArtistModal";
import { useNavigate, useLocation  } from "react-router-dom";
import {Provider, useSelector, useDispatch} from 'react-redux';
import Grid from '@mui/material/Grid';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
function Search(props) {
  const [musicmodal,setmusicmodal] = useState("");
  const [artistModal,setArtistModal] = useState("");
  const [musicList, setmusicList] = useState("");
  const [artistList, setArtistList] = useState("");
  const [findMusic,setFindMusic] = useState("");
  const [findArtist,setFindArtist] = useState("");
  const [value, setValue] = useState(0);
  const [viewMusicCard,setViewMusicCard] = useState(0);

  // const searching = useSelector((state)=>{return state.searchWord}); 
  const searching = useSelector((state) => state.searching.searching)

  const location = useLocation();
  const content = location.state !== null || undefined ? location.state : null;

  const getmusicList = async () => {   //뮤직검색
    await axios
      .get("http://localhost:5000/files")
      .then((res) => {
        let searchCount = res.data.filter((song) => song.title.indexOf(content) > -1)
        setmusicList(res.data);
        setFindMusic(searchCount);
        setViewMusicCard(searchCount.length)
      })
      .catch((err) => alert("노래목록을 불러오지못했습니다.", err));
  };
  const getUser = async ()=>{   //유저검색
      await axios
        .get("http://localhost:5000/artists/list")
        .then((res) => {
          let searchCount = res.data.filter((a) => a.artist_name.indexOf(content) > -1)
          setArtistList(res.data);
          setFindArtist(searchCount);
        })
        .catch((err) => alert("errrrrrrr.", err));
    }

  useEffect(() => {
    const init = async () => {
      await getUser(content);
      await getmusicList(content);
    };
    init();
  }, []);

  useEffect(() => {
    changeSearchPage()
  },[searching]);


  const changeSearchPage= ()=>{
    if (musicList && artistList) {
      const searchMusicNameData = musicList.filter((song) => {
        return song.title.indexOf(searching) > -1;
      });
      const searchAtistData = artistList.filter((a) => {
        return a.artist_name.indexOf(searching) > -1;
      });
      setFindMusic(searchMusicNameData);
      setFindArtist(searchAtistData);
      if(searchMusicNameData.length > 4){
        setViewMusicCard(4)
        setValue(0)
      }else{
        setViewMusicCard(searchMusicNameData.length)
        setValue(0)
      }
    }
  }
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
    <>
      <Typography variant="h4" gutterBottom>
        Music
      </Typography>
      <Box sx={{
        display: "flex",
        alignItems: 'center',
        px: 2
      }}>
        
        <ArrowBackIosIcon sx={{fontSize: 70,cursor:"pointer", m:2}}onClick={moveAhead}></ArrowBackIosIcon>
        <Grid
          sx={{
            alignItems:"center",
            width: "1450px",
            m:"auto",
            padding: 0,
            overflow: "hidden",
          }}
        >
          <Grid container sx={{width: "100%", display: "flex", flexWrap: "nowrap" }}>
            {findMusic &&
              findMusic.map((music, i) => {
                return (
                  <Grid xs={{width:"25%"}}>
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
        <ArrowForwardIosIcon  sx={{fontSize:70, cursor:"pointer", m:2}}onClick={moveBehind}></ArrowForwardIosIcon>
      </Box>


      <Typography variant="h4" gutterBottom>
        Artist
      </Typography>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={2}
      >
        {findArtist &&
          findArtist.map((artist) => {
            return (
              <ArtistCard artist={artist} setArtistModal={setArtistModal} />
            );
          })}
      </Stack>
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
    </>
  );
}
export default Search;