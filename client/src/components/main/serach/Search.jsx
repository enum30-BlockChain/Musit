import React, { useState, useEffect } from "react";
import { TextField,Typography,Box,Stack} from '@mui/material'
import axios from "axios";
import MusicPlayerSlider from "./MusicPlayerSlider";
import SongCard from "./SongCard";
import ArtistCard from "./ArtistCard";
import ArtistModal from "./ArtistModal";
import { useNavigate, useLocation  } from "react-router-dom";
import {Provider, useSelector, useDispatch} from 'react-redux';


function Search(props) {
  const [musicmodal,setmusicmodal] = useState("");
  const [artistModal,setArtistModal] = useState("");
  const [musicList, setmusicList] = useState("");
  const [artistList, setArtistList] = useState("");
  const [findMusic,setFindMusic] = useState("");
  const [findArtist,setFindArtist] = useState("");

  // const searching = useSelector((state)=>{return state.searchWord}); 
  const searching = useSelector((state) => state.searching.searching)

  const location = useLocation();
  const content = location.state !== null || undefined ? location.state : null;

  const getmusicList = async () => {   //뮤직검색
    await axios
      .get("http://localhost:5000/files")
      .then((res) => {
        setmusicList(res.data);
        setFindMusic( //초기에 넘겨받은 값으로 검색
          res.data.filter((song) => song.title.indexOf(content) > -1)
        );
      })
      .catch((err) => alert("노래목록을 불러오지못했습니다.", err));
  };
  const getUser = async ()=>{   //유저검색
      await axios
        .get("http://localhost:5000/artists/list")
        .then((res) => {
          setArtistList(res.data);
          setFindArtist(
            res.data.filter((a) => a.artist_name.indexOf(content) > -1)
          );
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
    }
  }
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Music
      </Typography>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={2}
      >
      {findMusic && findMusic.map((music)=>{
        return(
          <SongCard music={music} setmusicmodal={setmusicmodal} address={props.address}/>
        )
      })}
      </Stack>
      <Typography variant="h4" gutterBottom>
        Artist
      </Typography>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={2}
      >
      {findArtist && findArtist.map((artist)=>{
        return(
          <ArtistCard artist={artist} setArtistModal={setArtistModal} />
        )
      })}
      </Stack>
      {artistModal && <ArtistModal  sx={{ display: 'block' }} artistModal={artistModal} setArtistModal={setArtistModal} setmusicmodal={setmusicmodal} />}
      {musicmodal && <MusicPlayerSlider  sx={{ display: 'block' }}address={props.address} musicmodal={musicmodal} setmusicmodal={setmusicmodal} />}

      
    </>
  );
}
export default Search;