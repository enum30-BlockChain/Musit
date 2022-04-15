import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Genre.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function Genre(props) {
  const [genreRecommend, setGenreRecommend] = useState([]);
  const musicList = useSelector((state) => state.musicList).data;
  const likeMusic = useSelector((state) => state.likeMusic).data;
  const [genre, setGenre] = useState(0);
  const [viewGenreCard, setViewGenreCard] = useState(0);

  useEffect(() => {
    const likeGenre = [...likeMusic];
    const GenreBox = [];
    likeGenre.forEach((e) => {
      GenreBox.push(...e.genre);
    });
    const result = GenreBox.reduce((accu, curr) => {
      accu[curr] = (accu[curr] || 0) + 1;
      return accu;
    }, []);

    const GenreRecommendHandler = () => {
      const topGenre = Object.entries(result)
        .sort(([, a], [, b]) => b - a)
        .reduce((r, [k]) => [...r, k], []);
      if (topGenre.length > 0) {
        console.log("best like genre : ", topGenre[0]);
        return musicList.filter((song) => song.genre.indexOf(topGenre[0]) > -1);
      } else {
        return musicList;
      }
    };
    setGenreRecommend(GenreRecommendHandler());
    if (GenreRecommendHandler().length > 6) {
      setViewGenreCard(6);
    } else {
      setViewGenreCard(GenreRecommendHandler().length);
    }
    // console.log(result.sort((a,b)=>a-b))
  }, [likeMusic]);

  const postInfo = (music) => {
    props.setmusicmodal(music);
  };

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
    <>
      <Box sx={{ height: "100%" }}>
        <Box sx={{ height: "45%", mb: 2 }}>
          <Typography variant="h4">Genre Recommend</Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              px: 2,
            }}
          >
            <ArrowBackIosIcon
              sx={{ fontSize: 65, cursor: "pointer" }}
              onClick={genreMoveLeft}
            />
            <Grid
              sx={{
                width: "1460px",
                m: "auto",
                padding: 0,
                overflow: "hidden",
                display: "flex",
                flexWrap: "nowrap",
              }}
            >
              {genreRecommend &&
                genreRecommend.map((music, index) => (
                  <div
                    key={index}
                    className="glide"
                    style={{ transform: `translateX(${genre}%)` }}
                  >
                    <Box
                      key={index}
                      sx={{ cursor: "pointer", width: 210, my: 5, m: 2 }}
                      onClick={() => {
                        postInfo(music);
                      }}
                    >
                      <img
                        style={{ width: 210, height: 150, objectFit: "cover" }}
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
                          {music.genre}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {`${music.play_count} listening `} •{" "}
                          {`${music.MusicLikes.length} like`}
                        </Typography>
                      </Box>
                    </Box>
                  </div>
                ))}
            </Grid>
            <ArrowForwardIosIcon
              sx={{ fontSize: 65, cursor: "pointer" }}
              onClick={genreMoveRigth}
            />
          </Box>
        </Box>
        <nav className="top-nav">
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
        <Box sx={{ height: "45%", mt: 1 }}>
          <Typography variant="h4">like Ranking</Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              px: 2,
            }}
          >
            <ArrowBackIosIcon sx={{ fontSize: 65, cursor: "pointer" }} />
            <Grid
              sx={{
                width: "1460px",
                m: "auto",
                padding: 0,
                overflow: "hidden",
                display: "flex",
                flexWrap: "nowrap",
              }}
            >
              {/* {  likeTopList.map((music, index) => (
            <div
              key={index}
              className="glide"
              style={{ transform: `translateX(${likeRankingValue}%)` }}>
              <Box key={index} sx={{cursor:"pointer",width: 210, my: 5,m:2 }}
              onClick={()=>{postInfo(music)}}
              > 
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
                    {music.genre}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {`${music.play_count} listening `} • {`${music.MusicLikes.length} like`}
                  </Typography>
                </Box>
            </Box>
          </div>
          ))} */}
            </Grid>
            <ArrowForwardIosIcon sx={{ fontSize: 65, cursor: "pointer" }} />
          </Box>
        </Box>
      </Box>
    </>

    // <div>
    //    <Box sx={{height:"100%"}}>
    //     <Box sx={{height:"45%"}}>
    //       <Typography variant="h4">
    //       Genre  Recommend
    //       </Typography>
    //       <Box sx={{
    //       display: "flex",
    //       alignItems: 'center',
    //       px: 2 }}>
    //       <ArrowBackIosIcon sx={{fontSize: 65,cursor:"pointer"}} onClick={genreMoveLeft}/>
    //       <Grid
    //         sx={{
    //           width: "1260px",
    //           m:"auto",
    //           padding: 0,
    //           overflow: "hidden",
    //           display: "flex", flexWrap: "nowrap"
    //         }}
    //       >
    //         {genreRecommend &&
    //           genreRecommend.map((music, index) => (
    //             <Box
    //               key={index}
    //               sx={{ cursor: "pointer", width: 210,  my: 5 }}
    //               onClick={() => { postInfo(music); }} >
    //             <div
    //             key={index}
    //             className="glide"
    //             style={{ transform: `translateX(${genre}%)` }}>
    //               <img
    //                 style={{ width: 210, height: 150, objectFit:"cover" }}
    //                 alt={music.title}
    //                 src={music.img_file}
    //               />
    //               <Box sx={{ pr: 2 }}>
    //                 <Typography gutterBottom variant="body2">
    //                   {music.title}
    //                 </Typography>
    //                 <Typography
    //                   display="block"
    //                   variant="caption"
    //                   color="text.secondary"
    //                 >
    //                   {music.artist_name}
    //                 </Typography>
    //                 <Typography
    //                   display="block"
    //                   variant="overline"
    //                   color="text.secondary"
    //                 >
    //                   {music.genre}
    //                 </Typography>
    //                 <Typography variant="caption" color="text.secondary">
    //                   {`${music.play_count} listening `} • {`${music.MusicLikes.length} like`}
    //                 </Typography>
    //               </Box>
    //               </div>
    //             </Box>
    //           ))}
    //         </Grid>
    //       <ArrowForwardIosIcon  sx={{fontSize:65, cursor:"pointer", }} onClick={genreMoveRigth}/>
    //       </Box>
    //     </Box>
    //     <nav className="top-nav">
    //     <ul className="nav-links">
    //       <li>
    //         <Link to="/music/ranking">
    //           <i className="uil uil-favorite"></i>
    //           <span className="link-name"> Ranking</span>
    //         </Link>
    //       </li>
    //       <li>
    //         <Link to="/music/genre">
    //           <i className="uil uil-play"></i>
    //           <span className="link-name"> Recommend</span>
    //         </Link>
    //       </li>
    //     </ul>
    //   </nav>
    //     <Box  sx={{height:"45%"}}>
    //       <Typography variant="h4">
    //       like  Ranking
    //       </Typography>
    //         <Box sx={{
    //         display: "flex",
    //         alignItems: 'center',
    //         px: 2 }}>
    //           <ArrowBackIosIcon sx={{fontSize: 65,cursor:"pointer"}} />
    //           <Grid
    //             sx={{
    //               width: "1280px",
    //               m:"auto",
    //               padding: 0,
    //               overflow: "hidden",
    //               display: "flex", flexWrap: "nowrap"
    //             }}>

    //         {/* {  likeTopList.map((music, index) => (
    //           <Box key={index} sx={{cursor:"pointer",width: 210,  my: 5 }}
    //           onClick={()=>{postInfo(music)}}
    //           >
    //           <div
    //             key={index}
    //             className="glide"
    //             style={{ transform: `translateX(${likeRanking}%)` }}>
    //               <img
    //                 style={{ width: 210, height: 150, objectFit:"cover"  }}
    //                 alt={music.title}
    //                 src={music.img_file}
    //               />
    //               <Box sx={{ pr: 2 }}>
    //                 <Typography gutterBottom variant="body2">
    //                   {music.title}
    //                 </Typography>
    //                 <Typography display="block" variant="caption" color="text.secondary">
    //                   {music.artist_name}
    //                 </Typography>
    //                 <Typography display="block" variant="overline" color="text.secondary">
    //                   {music.genre}
    //                 </Typography>
    //                 <Typography variant="caption" color="text.secondary">
    //                   {`${music.play_count} listening `} • {`${music.MusicLikes.length} like`}
    //                 </Typography>
    //               </Box>
    //             </div>
    //           </Box>
    //         ))} */}
    //           </Grid>
    //           <ArrowForwardIosIcon  sx={{fontSize:65, cursor:"pointer", }}  />
    //         </Box>
    //     </Box>
    //   </Box>
    // </div>
  );
}
