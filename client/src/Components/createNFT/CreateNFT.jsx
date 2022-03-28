import React, {useState}from 'react'
import { Box, Stack, Button, Typography, Card,CardActionArea,CardMedia,CardContent } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { display } from '@mui/system';


function CreateNFT() {
  const [albumCoverImgFile, setAlbumCoverImgFile] = useState()
  const [text, setText] = useState("이미지를 넣어주세요")
  const handleChangeImage = (e)=>{
    setAlbumCoverImgFile(e.target.files[0])
  }
  
  return (
    <Stack
      sx={{ display: "flex" }}
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      spacing={0.5}
    >
      <Box sx={{ mx: "auto", mt: 3, p: 0 }}>
        <Typography variant="h3">Responsive h3</Typography>
        <Box>
          <Typography sx={{ mt: 3 }} variant="h5">
            Image, Video, Audio, or 3D Model
          </Typography>
        </Box>
        <Box sx={{mt:3,}}>
          <Button component="label">
          <Box sx={{ height:345,width:345, p: 2, border: "4px dashed grey" }}>
        {albumCoverImgFile ? '' : <CloudUploadIcon sx={{color:'gray', height:"100%",width:"100%",  }} />}
          {albumCoverImgFile && (
            <img
              src={URL.createObjectURL(albumCoverImgFile)}
              style={{ width: "100%",height:"100%" }}
            ></img>
          )}
            <input
              id={"file-input"}
              style={{ display: "none" }}
              type="file"
              name="imageFile"
              onChange={(e) => handleChangeImage(e)}
            />
          </Box><p/>
          </Button>
        </Box>
        <Box>
          <div>createNFT</div>
        </Box>
        <Box>
          <div>createNFT</div>
        </Box>
      </Box>
    </Stack>
  );
}
export default CreateNFT