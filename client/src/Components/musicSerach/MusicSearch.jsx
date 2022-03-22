import axios from 'axios'
import React ,{useState,useEffect} from 'react'
import MusicCard from './MusicCard';

function MusicSearch(props) {
  const [songList, setSongList] = useState("");
  
  const getSongList = async () => {
     await axios
      .get("http://localhost:5000/files")
      .then((res) => {
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
        return (
          <MusicCard
            id={i}
            title={song.title}
            artistName={song.artist_name}
            img={song.img_file}
            duration={song.play_time}
            // like={song.like}  //TODO:use이펙트로 불러온다음 그값을 더해서 넣어줄꺼임
            count={song.play_count}
            audio={song.ipfs_hash}
            genre={song.Genre}
            address={props.address}
            artistAddress={song.Artist.user_address}
          />
        );    
  })}
  </table>
  </>
  )
}
export default MusicSearch;
