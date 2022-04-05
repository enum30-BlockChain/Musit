import React,{useEffect,useState} from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {  useSelector } from "react-redux";
import HeadsetIcon from '@mui/icons-material/Headset';

const Media = (props) => {
  const [genreRecommend, setGenreRecommend] = useState([])
  const musicList = useSelector((state) => state.musicList.musicList)
  const listeningTopList = [...musicList].sort((a,b)=>b.play_count-a.play_count);  //랭킹만들기
  const likeTopList = [...musicList].sort((a,b)=>b.MusicLikes.length-a.MusicLikes.length);  //랭킹만들기
  
  const likeList = useSelector((state) => state.likeList.likeList);
  
 


  
 useEffect(() => {
   const likeGenre = [...likeList];
   const GenreBox =[]
   likeGenre.forEach((e) => {
     GenreBox.push(...e.Genre.split(","));
   });
  const result = GenreBox.reduce((accu, curr) => { 
    accu[curr] = (accu[curr] || 0)+1; 
    return accu;
  }, {});

  const GenreRecommendHandler =()=>{
    const topGenre = Object.entries(result)
        .sort(([,a],[,b]) => b-a)
        .reduce((r, [k ]) => ([...r, k]), []);
        if(topGenre.length > 0){
          return musicList.filter((song) => song.Genre.indexOf(topGenre[0]) > -1);
        }else{
          return musicList ;
        }
  }
  setGenreRecommend(GenreRecommendHandler())
  
  // console.log(result.sort((a,b)=>a-b))

 }, [props])
 


  const postInfo= (music)=>{
    props.setmusicmodal(music)
  }
  return (
    <>
      <Typography variant="h4">
      Listening  Ranking
      </Typography>
      <Grid container wrap="nowrap" >
        {  listeningTopList.map((music, index) => (
          <Box key={index} sx={{cursor:"pointer",width: 210, marginRight: 0.5, my: 5 }}
          onClick={()=>{postInfo(music)}}
          >
              <img
                style={{ width: 210, height: 118 }}
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
          </Box>
        ))}
      </Grid>
      <Typography variant="h4">
      like  Ranking
      </Typography>
      <Grid container wrap="nowrap" >
        {  likeTopList.map((music, index) => (
          <Box key={index} sx={{cursor:"pointer",width: 210, marginRight: 0.5, my: 5 }}
          onClick={()=>{postInfo(music)}}
          >
              <img
                style={{ width: 210, height: 118 }}
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
          </Box>
        ))}
      </Grid>
      <Typography variant="h4">
      Genre recommend
      </Typography>
      <Grid container wrap="nowrap" >
        {genreRecommend &&  genreRecommend.map((music, index) => (
          <Box key={index} sx={{cursor:"pointer",width: 210, marginRight: 0.5, my: 5 }}
          onClick={()=>{postInfo(music)}}
          >
              <img
                style={{ width: 210, height: 118 }}
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
          </Box>
        ))}
      </Grid>
    </>

  );
}


export default Media ;
 