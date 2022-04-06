import React,{useEffect,useState} from 'react'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {  useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import "./Genre.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


export default function Genre(props) {
    const [genreRecommend, setGenreRecommend] = useState([])
    const musicList = useSelector((state) => state.musicList.musicList);
    const likeList = useSelector((state) => state.likeList.likeList);
    const [genre, setGenre] = useState(0);
    const [viewGenreCard, setViewGenreCard] = useState(0);

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
       if(GenreRecommendHandler().length > 6){
        setViewGenreCard(6)
       }else{
        setViewGenreCard(GenreRecommendHandler().length)
       }
       // console.log(result.sort((a,b)=>a-b))
      }, [props])
      
       const postInfo= (music)=>{
         props.setmusicmodal(music)
       }

       const genreMoveLeft = () => {
        genre === 0
          ? setGenre(-100 * (genreRecommend.length - viewGenreCard))
          : setGenre(genre + 100);
      };
      const genreMoveRigth = () => {
        genre === -100 * (genreRecommend.length - viewGenreCard)
          ? setGenre(0)
          : setGenre(genre - 100);
      };
  return (
    <div>
       <Box sx={{height:"100%"}}>
        <Box sx={{height:"45%"}}>
          <Typography variant="h4">
          Genre  Recommend
          </Typography>
          <Box sx={{
          display: "flex",
          alignItems: 'center',
          px: 2 }}>
          <ArrowBackIosIcon sx={{fontSize: 65,cursor:"pointer"}} onClick={genreMoveLeft}/>
          <Grid
            sx={{
              width: "1280px",
              m:"auto",
              padding: 0,
              overflow: "hidden",
              display: "flex", flexWrap: "nowrap" 
            }}
          >
            {genreRecommend &&
              genreRecommend.map((music, index) => (
                <Box
                  key={index}
                  sx={{ cursor: "pointer", width: 210, marginRight: 0.5, my: 5 }}
                  onClick={() => { postInfo(music); }} > 
                <div
                key={index}
                className="glide"
                style={{ transform: `translateX(${genre}%)` }}>
                  <img
                    style={{ width: 210, height: 150, objectFit:"cover" }}
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
                      {`${music.play_count} listening `} • {`${music.MusicLikes.length} like`}
                    </Typography>
                  </Box>
                  </div>
                </Box>
              ))}
            </Grid>
          <ArrowForwardIosIcon  sx={{fontSize:65, cursor:"pointer", }} onClick={genreMoveRigth}/>
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
              <ArrowBackIosIcon sx={{fontSize: 65,cursor:"pointer"}} />
              <Grid
                sx={{
                  width: "1280px",
                  m:"auto",
                  padding: 0,
                  overflow: "hidden",
                  display: "flex", flexWrap: "nowrap" 
                }}>

            
            {/* {  likeTopList.map((music, index) => (
              <Box key={index} sx={{cursor:"pointer",width: 210, marginRight: 0.5, my: 5 }}
              onClick={()=>{postInfo(music)}}
              > 
              <div
                key={index}
                className="glide"
                style={{ transform: `translateX(${likeRanking}%)` }}>
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
            ))} */}
              </Grid>
              <ArrowForwardIosIcon  sx={{fontSize:65, cursor:"pointer", }}  />
            </Box>
        </Box>
      </Box>
    </div>
 
  );
}
