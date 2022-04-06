import React,{useEffect,useState} from 'react'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {  useSelector } from "react-redux";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import "./Genre.css";

export default function Genre(props) {
    const [genreRecommend, setGenreRecommend] = useState([])
    const musicList = useSelector((state) => state.musicList.musicList);
    const likeList = useSelector((state) => state.likeList.likeList);
    const [value, setValue] = useState(0);
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

       const moveleft = () => {
        value === 0
          ? setValue(-100 * (likeList.length - 5))
          : setValue(value + 100);
      };
      const moveBehind = () => {
        value === -100 * (likeList.length - 5)
          ? setValue(0)
          : setValue(value - 100);
      };
  return (
    <div>
      <Box>
        <Typography variant="h4">Genre recommend</Typography>
        <Grid container wrap="nowrap">
          <ArrowBackIosIcon sx={{fontSize: 65,cursor:"pointer"}}onClick={moveleft}/>
          {genreRecommend &&
            genreRecommend.map((music, index) => (
              <Box
                key={index}
                sx={{ cursor: "pointer", width: 210, marginRight: 0.5, my: 5 }}
                onClick={() => {
                  postInfo(music);
                }}
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
                  <Typography
                    display="block"
                    variant="caption"
                    color="text.secondary"
                  >
                    {music.artist_name}
                  </Typography>
                  <Typography
                    display="block"
                    variant="overline"
                    color="text.secondary"
                  >
                    {music.Genre}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {`${music.play_count} listening `} •{" "}
                    {`${music.MusicLikes.length} like`}
                  </Typography>
                </Box>
              </Box>
            ))}
        </Grid>
      </Box>
    </div>
  );
}
