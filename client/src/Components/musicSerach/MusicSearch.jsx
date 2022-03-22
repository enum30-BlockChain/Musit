import axios from 'axios'
import React ,{useState,useEffect} from 'react'
import MusicCard from './MusicCard';

function MusicSearch(props) {
  const [songList, setSongList] = useState("");
  
  const getSongList = async () => {
     await axios
      .get("http://localhost:5000/files")
      .then((res) => {
        console.log(res.data)
        setSongList(res.data);
      })
      .catch((err) => alert("노래목록을 불러오지못했습니다.", err));
  };

  useEffect(() => {
    const init = async () => {
      await getSongList();
    }
    init();
  }, []);

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
            <th>genre</th>
            <th>수정</th>
          </tr>
        </thead>
    {songList && songList.map((song, i) => {
      const findLike = song.MusicLikes.find(
        (like) => like.user_address === props.address
      );
        return (
          <MusicCard
            id={i}
            title={song.title}
            artistName={song.artist_name}
            img={song.img_file}
            duration={song.play_time}
            like={song.MusicLikes.length} 
            count={song.play_count}
            audio={song.ipfs_hash}
            genre={song.Genre}
            address={props.address}
            artistAddress={song.Artist.user_address}
            checkBox={findLike}
          />
        );    
  })}
  </table>
  </>
  )
}
export default MusicSearch;
