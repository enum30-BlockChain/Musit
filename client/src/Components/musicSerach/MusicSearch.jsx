import axios from 'axios'
import React ,{useState,useEffect} from 'react'
import MusicCard from './MusicCard';

function MusicSearch() {
    const [songList, setSongList] = useState("")

     const getSongList = async () => {
       axios
         .get("http://localhost:5000/files")
         .then((res) => {
            //  console.log(res.data);
            setSongList(res.data);            
            })
         .catch((err) => alert("노래목록을 불러오지못했습니다.", err));
     };

     useEffect(() => {
         getSongList()
        }, [])

  return (
  <>
  <table  style={{margin:"auto"}}>
        <caption> 우왕 </caption>
        <thead>
          <tr>
            <th>순번 </th>
            <th>타이틀</th>
            <th>작곡가</th>
            <th>img</th>
            <th>auido</th>
            <th>play_count</th>
            <th>like</th>
            <th>수정</th>
          </tr>
        </thead>
    {songList && songList.map((song, i) => {
        return (
          <MusicCard
            id={i}
            title={song.title}
            artistName={song.artist_name}
            img={song.img_file}
            like={song.like}
            count={song.play_count}
            audio={`https://ipfs.io/ipfs/${song.ipfs_hash}`}
          />
        );    
  })}
  </table>
  </>
  )
}
export default MusicSearch;
