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

export default function SongCard(props) {
  const [TotalLike, setTotalLike] = useState(props.music.MusicLikes.length);
  const [findlike,setFindlike] = useState(
    props.music.MusicLikes
      .filter((song)=>{
        return (song.user_address.indexOf(props.address)>-1);
        }));
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
        ml: 5,
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

              {findlike.length === 0  //따봉
              ?(
              <Box sx={{display:"flex"}}>
                <ThumbUpOffAltOutlinedIcon
                   onClick={()=>{
                    likecountpost();
                    setTotalLike(TotalLike+1);
                    setFindlike(1);
                  }}
                  sx={{ mr:0.5}}
                  cursor="pointer"
                  fontSize="small"
                />{TotalLike}
              </Box>
              )
              :(
                <Box sx={{display:"flex"}}>
                  <ThumbUpOffAltRoundedIcon
                    onClick={()=>{
                      likecountpost();
                      setTotalLike(TotalLike-1);
                      setFindlike("");
                    }}
                    sx={{ mr:0.5}}
                    cursor="pointer"
                    fontSize="small"
                  />{TotalLike}
                </Box>
                )
              }
            </Grid>
          </Grid>
      </Grid>
    </Paper>
  );
}