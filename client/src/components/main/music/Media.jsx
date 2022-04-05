import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {  useSelector } from "react-redux";
import HeadsetIcon from '@mui/icons-material/Headset';

const Media = (props) => {
  const musicList = useSelector((state) => state.musicList.musicList)
  
  const postInfo= (music)=>{
    props.setmusicmodal(music)
  }
  return (
    <>
      <Typography variant="h4">
        Music Ranking
      </Typography>
    <Grid container wrap="nowrap" >
      {  musicList.map((music, index) => (
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
                {`${music.play_count} veiw`} • {`${music.MusicLikes.length} like`}
              </Typography>
            </Box>
        </Box>
      ))}
    </Grid>
    </>

  );
}


export default Media ;
 