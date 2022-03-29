import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { pink } from '@mui/material/colors';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function SongCard(props) {
  const postInfo= ()=>{
    props.setartistModal(props.music)
  }
  return (
    <Paper
      sx={{
        p: 2,
        ml: 5,
        maxWidth: 350,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="complex" src= {props.music.img_file} onClick={postInfo} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs container
                direction="column"
                justifyContent="center"
                alignItems="flex-start">
            <div style={{ width: 150, whiteSpace: 'nowrap' }}> 
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
                {/* <FavoriteBorderIcon
                      sx={{ color: pink[300] }}
                      cursor="pointer"
                      fontSize="large"
                    /> */}
                  <FavoriteIcon
                    sx={{ color: pink[300] }}
                    cursor="pointer"
                    fontSize="large"
                  />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
