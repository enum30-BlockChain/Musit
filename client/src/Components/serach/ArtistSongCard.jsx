import  React ,{useState}from 'react';
import axios from "axios";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HeadsetIcon from '@mui/icons-material/Headset';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ThumbUpOffAltRoundedIcon from '@mui/icons-material/ThumbUpOffAltRounded';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function ArtistSongCard(props) {
 
  const postInfo= ()=>{
    props.setmusicmodal(props.music)
  }

  const likecountpost = async ()=>{
    await axios
    .post("http://localhost:5000/music/like", {address:props.address,audio:props.music.ipfs_hash})
    .then((res) => {})
    .catch((err) => alert("회원가입부터하세용.", err));
  }
  return (
    <Paper
      sx={{
        p: 2,
        maxWidth: 350,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 130, height: 130 }}>
            <Img alt="complex" src= {props.music.img_file} onClick={postInfo} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12}  sm container>
            <Grid item xs container
                direction="column"
                justifyContent="center"
                alignItems="flex-start">
            <div style={{ width: 170, whiteSpace: 'nowrap' }}> 
              <Typography
                sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
                gutterBottom
                variant="title"
                component="div"
              >
              {props.music.title}
              </Typography>
              </div>
              <Typography variant="body2" gutterBottom>
                {props.music.artist_name}
              </Typography>
              <Box sx={{display:"flex"}}>
                <AccessTimeIcon fontSize='small'sx={{mr:1}} />
                <Typography variant="body2" gutterBottom>
                { Math.floor(props.music.play_time/60)}:{props.music.play_time%60}
                </Typography>
              </Box>
              <Box sx={{display:"flex"}}>
                <HeadsetIcon fontSize='small'sx={{mr:1}} />
                <Typography variant="body2" gutterBottom>
                  {props.music.play_count}
                </Typography>
              </Box>

            
            </Grid>
          </Grid>
      </Grid>
    </Paper>
  );
}
