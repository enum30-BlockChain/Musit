import React, { useState, useEffect } from "react";
import { TextField,Typography,Box,Stack} from '@mui/material'
import axios from "axios";
import MusicPlayerSlider from "./MusicPlayerSlider";
import SongCard from "./SongCard";
import ArtistCard from "./ArtistCard";
import ArtistModal from "./ArtistModal";
 

function Search(props) {
  const [musicmodal,setmusicmodal] = useState("");
  const [artistModal,setArtistModal] = useState("");
  
  const [songList, setSongList] = useState("");
  const [artistList, setArtistList] = useState("");
  const [findMusic,setFindMusic] = useState("");
  const [findArtist,setFindArtist] = useState("");

  const getSongList = async () => {
    await axios
      .get("http://localhost:5000/files")
      .then((res) => {
        setSongList(res.data);
        setFindMusic(res.data);
      })
      .catch((err) => alert("노래목록을 불러오지못했습니다.", err));
  };
  const getUser = async ()=>{
      await axios
        .get("http://localhost:5000/artists/list")
        .then((res) => {
          setFindArtist(res.data); 
          setArtistList(res.data);
        })
        .catch((err) => alert("errrrrrrr.", err));
    }

  useEffect(() => {
    const init = async () => {
      await getUser();
      await getSongList();
    };
    init();
  }, []);

  const searchWord = (e)=>{
    const searchMusicNameData = songList.filter((song)=>{
     return song.title.indexOf(e.target.value)>-1;
    }) 
    const searchAtistData = artistList.filter((a)=>{
     return a.artist_name.indexOf(e.target.value)>-1;
    }) 
    setFindMusic(searchMusicNameData);
    setFindArtist(searchAtistData);
  }
  
  return (
    <>
      <TextField
        variant="outlined"
        placeholder="Music Title"
        onChange={searchWord}
        sx={{ width: "100%" }}
      />
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
          <SongCard music={music} setmusicmodal={setmusicmodal} />
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
          <ArtistCard artist={artist} setArtistModal={setArtistModal}/>
        )
      })}
      </Stack>
      {musicmodal && <MusicPlayerSlider  sx={{ display: 'block' }} musicmodal={musicmodal} setmusicmodal={setmusicmodal} />}
      {artistModal && <ArtistModal  sx={{ display: 'block' }} artistModal={artistModal} setArtistModal={setArtistModal} />}

      
    </>
  );
}
export default Search;