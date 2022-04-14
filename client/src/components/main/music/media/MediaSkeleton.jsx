import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Skeleton from '@mui/material/Skeleton';

const MediaSkeleton = () => {
  return (
    <>
      <Box sx={{height:"100%"}}>
        <Box sx={{height:"45%",mb:2}}>
          <Typography variant="h4">
          <Skeleton  width="15%"/>
          </Typography>
          <Box sx={{
          display: "flex",
          alignItems: 'center',
          px: 2 }}>
          <ArrowBackIosIcon sx={{fontSize: 65,cursor:"pointer"}}/>
          <Grid
            sx={{
              width: "1460px",
              m:"auto",
              padding: 0,
              overflow: "hidden",
              display: "flex", flexWrap: "nowrap" 
            }}
          >
            {  [1,2,3,4,5,6].map((music, index) => (
              <div>
                <Box key={index} sx={{cursor:"pointer",width: 210, my: 5, m:2 }}>
                  <Skeleton variant="rectangular" width={210} height={150} />
                  <Box sx={{ pr: 2 }}>
                    <Skeleton width="30%" />
                    <Skeleton width="30%" />
                    <Skeleton />
                    <Skeleton width="50%" />
                  </Box>
                </Box>
              </div>
            ))}
            </Grid>
            <ArrowForwardIosIcon  sx={{fontSize:65, cursor:"pointer", }} />
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
        <Box  sx={{height:"45%",mt:1}}>
          <Typography variant="h4">
          <Skeleton width="20%" />
          </Typography>
            <Box sx={{
            display: "flex",
            alignItems: 'center',
            px: 2 }}>
              <ArrowBackIosIcon sx={{fontSize: 65,cursor:"pointer"}}/>
              <Grid
                  sx={{
                    width: "1460px",
                    m:"auto",
                    padding: 0,
                    overflow: "hidden",
                    display: "flex", flexWrap: "nowrap" 
                  }}>
            {  [1,2,3,4,5,6].map((music, index) => (
              <div>
                <Box key={index} sx={{cursor:"pointer",width: 210, my: 5, m:2 }}>
                  <Skeleton variant="rectangular" width={210} height={150} />
                  <Box sx={{ pr: 2 }}>
                    <Skeleton width="30%" />
                    <Skeleton width="30%" />
                    <Skeleton />
                    <Skeleton width="50%" />
                  </Box>
                </Box>
              </div>
            ))}
              </Grid>
              <ArrowForwardIosIcon  sx={{fontSize:65, cursor:"pointer", }} />
            </Box>
        </Box>
      </Box>
    </>

  );
}


export default MediaSkeleton ;
 