import React,{useEffect,useState} from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {  useSelector } from "react-redux";
import HeadsetIcon from '@mui/icons-material/Headset';
import { Link } from 'react-router-dom';
import "./Media.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Media = (props) => {
  const musicList = useSelector((state) => state.musicList.musicList)
  const listeningTopList = [...musicList].sort((a,b)=>b.play_count-a.play_count);  //랭킹만들기
  const likeTopList = [...musicList].sort((a,b)=>b.MusicLikes.length-a.MusicLikes.length);  //랭킹만들기
  
  const [listenRankingvalue, setListenRankingValue] = useState(0);
  const [likeRankingValue, setLikeRankingValue] = useState(0);
  const [veiwCard, setVeiwCard] = useState(0);
  
  useEffect(() => {
    if(musicList.length > 6){
     setVeiwCard(6);
    }else{
    setVeiwCard(musicList.length);
   }

  }, [props])
  
  //ToDO: musicList.length = 6 6개이하면 오류남

  const listenRankingMoveLeft = () => {
    listenRankingvalue === 0
      ? setListenRankingValue(-100 * (musicList.length - veiwCard))
      : setListenRankingValue(listenRankingvalue + 100);
  };
  const listenRankingMoveRigth = () => {
    listenRankingvalue === -100 * (musicList.length- veiwCard)
      ? setListenRankingValue(0)
      : setListenRankingValue(listenRankingvalue - 100);
  };
  const likeRankingMoveLeft = () => {
    likeRankingValue === 0
      ? setLikeRankingValue(-100 * (musicList.length - veiwCard))
      : setLikeRankingValue(likeRankingValue + 100);
  };
  const rigthRankingMoveLeft = () => {
    likeRankingValue === -100 * (musicList.length- veiwCard)
      ? setLikeRankingValue(0)
      : setLikeRankingValue(likeRankingValue - 100);
  };

  const postInfo= (music)=>{
    props.setmusicmodal(music)
  }
  
  return (
    <>
      <Box sx={{height:"100%"}}>
        <Box sx={{height:"45%"}}>
          <Typography variant="h4">
          Listening  Ranking
          </Typography>
          <Box sx={{
          display: "flex",
          alignItems: 'center',
          px: 2 }}>
          <ArrowBackIosIcon sx={{fontSize: 65,cursor:"pointer"}}onClick={listenRankingMoveLeft}/>
          <Grid
            sx={{
              width: "1280px",
              m:"auto",
              padding: 0,
              overflow: "hidden",
              display: "flex", flexWrap: "nowrap" 
            }}
          >
            {  listeningTopList.map((music, index) => (
              <Box key={index} sx={{cursor:"pointer",width: 210, marginRight: 0.5, my: 5 }}
              onClick={()=>{postInfo(music)}}>
                <div
                key={index}
                className="glide"
                style={{ transform: `translateX(${listenRankingvalue}%)` }}>
                  <img
                    style={{ width: 210, height: 150, objectFit:"cover" }}
                    alt={music.title}
                    src={music.img_file}
                  />
                  <Box sx={{ pr: 2 }}>
                    <Typography gutterBottom variant="body2">
                      {music.title}
                    </Typography>
                    <Typography display="block" variant="caption" color="text.secondary">
                      {music.artist_name}
                    </Typography>
                    <Typography display="block" variant="overline" color="text.secondary">
                      {music.Genre}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {`${music.play_count} listening `} • {`${music.MusicLikes.length} like`}
                    </Typography>
                  </Box>
                  </div>
              </Box>
            ))}
            </Grid>
          <ArrowForwardIosIcon  sx={{fontSize:65, cursor:"pointer", }}onClick={listenRankingMoveRigth} />
          </Box>
        </Box>
        <nav className="user-nav">
        <ul className="nav-links">
          <li>
            <Link to="/music/ranking">
              <i className="uil uil-favorite"></i>
              <span className="link-name"> Ranking</span>
            </Link>
          </li>
          <li>
            <Link to="/music/genre">
              <i className="uil uil-play"></i>
              <span className="link-name"> Recommend</span>
            </Link>
          </li>
        </ul>
      </nav>
        <Box  sx={{height:"45%"}}>
          <Typography variant="h4">
          like  Ranking
          </Typography>
            <Box sx={{
            display: "flex",
            alignItems: 'center',
            px: 2 }}>
              <ArrowBackIosIcon sx={{fontSize: 65,cursor:"pointer"}}onClick={likeRankingMoveLeft}/>
              <Grid
                sx={{
                  width: "1280px",
                  m:"auto",
                  padding: 0,
                  overflow: "hidden",
                  display: "flex", flexWrap: "nowrap" 
                }}>

            
            {  likeTopList.map((music, index) => (
              <Box key={index} sx={{cursor:"pointer",width: 210, marginRight: 0.5, my: 5 }}
              onClick={()=>{postInfo(music)}}
              > 
              <div
                key={index}
                className="glide"
                style={{ transform: `translateX(${likeRankingValue}%)` }}>
                  <img
                    style={{ width: 210, height: 150, objectFit:"cover"  }}
                    alt={music.title}
                    src={music.img_file}
                  />
                  <Box sx={{ pr: 2 }}>
                    <Typography gutterBottom variant="body2">
                      {music.title}
                    </Typography>
                    <Typography display="block" variant="caption" color="text.secondary">
                      {music.artist_name}
                    </Typography>
                    <Typography display="block" variant="overline" color="text.secondary">
                      {music.Genre}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {`${music.play_count} listening `} • {`${music.MusicLikes.length} like`}
                    </Typography>
                  </Box>
                </div>
              </Box>
            ))}
              </Grid>
              <ArrowForwardIosIcon  sx={{fontSize:65, cursor:"pointer", }}onClick={rigthRankingMoveLeft} />
            </Box>
        </Box>
      </Box>
    </>

  );
}


export default Media ;
 