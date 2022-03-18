import axios from 'axios'
import React ,{useState,useEffect} from 'react'
import MusicCard from './MusicCard';

function MusicSearch() {
    const [songList, setSongList] = useState("")

     const getSongList = async () => {
       axios
         .get("http://localhost:5000/files/")
         .then((res) => {
            //  console.log(res.data);
            setSongList(res.data);            
            })
         .catch((err) => alert("노래목록을 불러오지못했습니다.", err));
     };

     useEffect(() => {
         getSongList()
         console.log(songList)
        }, [])

  return (
  <>
    {songList && songList.map((song, i) => {
        return <MusicCard title={song.title} artistName={song.artist_name} img={song.img_file} audio={`https://ipfs.io/ipfs/${song.ipfs_hash}`}/>    
  })}
  </>
  )
}
export default MusicSearch;
