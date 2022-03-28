import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function SongCard(props) {
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
            <Img alt="complex" src= {props.music.img_file} />
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
            </Grid>
            <Grid item>
              <Typography sx={{ cursor: "pointer" }} variant="body2">
             
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              🤍
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
