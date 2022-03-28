import React, {useState,useEffect}from 'react'
import { Box, Stack, Button, Typography, TextField,} from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import axios from "axios";
const { create } = require("ipfs-http-client");

function CreateNFT({address}) {
  const formData = new FormData();
  const [artistList, setartistList] = useState("");
  const [albumCoverImgFile, setAlbumCoverImgFile] = useState("")
  const [audioFile, setAudioFile] = useState("")
  const [audioText, setAudioText] = useState("파일을 넣어주세요")
  const [form, setForm] = useState({
    img:"",
    ipfs:"",
    atistName:"",
    title:"",
    Description:"",
  })
  async function ipfsClient() {
    //ipfs 서버연결
    const ipfs = await create({
      host: "ipfs.infura.io",
      port: 5001,
      protocol: "https",
    });
    return ipfs;
  }
  const postAudio = async () => {
    //multer하고 s3저장후 링크가져오기
    let ipfs = await ipfsClient();
    let result = await ipfs.add(audioFile);
    form.ipfs = result.path;
  };

  const findArtist = async () => {
    artistList.map((a) => {
      if (a.user_address === address) {
        form.atistName = a.artist_name;
        return form;
      }
    });
  };

  const postImg = async () => {
    //multer하고 s3저장후 링크가져오기
    formData.append("img", albumCoverImgFile);
    await axios
      .post("http://localhost:5000/files/imgupload", formData) //formData multer가읽을수있다.
      .then((res) => (form.img = res.data.downLoadLink))
      .catch((err) => alert(err));
    return form;
  };
 

  const getArtist = async () => {
    await axios
      .get("http://localhost:5000/artists/list") //formData multer가읽을수있다.
      .then((res) => {
        setartistList(res.data);
      })
      .catch((err) => alert(err));
  };

  const handleChangeImage = (e)=>{
    setAlbumCoverImgFile(e.target.files[0])
  }
  const handleChangeAudio = (e)=>{
    setAudioText(e.target.files[0].name)
    setAudioFile(e.target.files[0])
  }
  const getTitle = (e)=>{
    form.title =e.target.value
    console.log(form)
  }
  const getDescription = (e)=>{
    form.Description =e.target.value
    console.log(form)
  }
  const isValidDBdata = () => {
    if (form.atistName === "") {
      alert("로그인을 해주세요");
      return false;
    } else if (albumCoverImgFile === "") {
      alert("앨범파일 넣어주세요");
      return false;
    } else if (audioFile === "") {
      alert("오디오파일 넣어주세요");
      return false;
    } else if (form.title === "") {
      alert("노래제목을 넣어주세요");
      return false;
    } else if (form.Description === "") {
      alert("Description 넣어주세요");
      return false;
    } 
    return true;
  };
  const submit = async () => {
     await findArtist();
    if (isValidDBdata()) {
      await postImg();
      await postAudio();
      console.log(form);
      alert("잘됨?")
    }
  };
  
  useEffect(() => {
    const init = async () => {
      await getArtist();
    };
    init();
  }, []);
  return (
    <>
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={0.5}
    >
      <Box id="left" >
        <Box sx={{ mr: 5, mt: 3, }}>
          <Typography variant="h3">Album Cover🙀</Typography>
          <Box>
            <Typography sx={{ mt: 3 }} variant="h5">
              Image, Video, Audio, or 3D Model
            </Typography>
          </Box>
          <Box sx={{ mt: 3 }}>
            <Button component="label">
              <Box
                sx={{
                  height: 500,
                  width: 500,
                  p: 2,
                  border: "4px dashed grey",
                }}
              >
                {albumCoverImgFile ? (
                  <img
                    src={URL.createObjectURL(albumCoverImgFile)}
                    style={{ width: "100%", height: "100%" }}
                  ></img>
                ) : (
                  <CloudUploadIcon
                    sx={{ color: "gray", height: "100%", width: "100%" }}
                  />
                )}
                <input
                  id={"file-input"}
                  style={{ display: "none" }}
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChangeImage}
                />
              </Box>
              <p />
            </Button>
          </Box>
        </Box>
      </Box>  

      <Box  id="right" sx={{ width:500 }}>
        <Box sx={{ ml: "auto", width: "100%", mt: 3}}>
          <Typography variant="h4" sx={{ mt: 2 }}>
            Music
          </Typography>
          <Button component="label">
            <input
              id={"file-input"}
              style={{ display: "none" }}
              type="file"
              name="image"
              onChange={handleChangeAudio}
              accept="audio/*"
            />
            <Card sx={{ display: "flex" }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    {audioText}
                  </Typography>
                </CardContent>
                {audioFile && (
                  <Box
                    sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
                  >
                    <audio src={URL.createObjectURL(audioFile)} controls>
                      오디오 지원되지 않는 브라우저
                    </audio>

                  </Box>
                )}
              </Box>
            </Card>
          </Button>
        </Box>
     
        <Box sx={{ mr: "auto", width: "100%", mt: 3, p: 0 }}>
          <Typography variant="h4" sx={{ mt: 2 }}>
            Title
          </Typography>
          <TextField
            variant="outlined"
            placeholder="Music Title"
            onChange={getTitle}
            sx={{ width: "100%" }}
          />
        </Box>
        <Box sx={{ mr: "auto", width: "100%", mt: 3, p: 0 }}>
          <Typography variant="h4" sx={{ mt: 2 }}>
           Description
          </Typography>
          <TextField
            variant="outlined"
            placeholder="provide a detailed description of your Music"
            onChange={getDescription}
            sx={{ width: "100%" }}
          />
        </Box>

        {/* <Box>
          <div>createNFT</div>
        </Box> */}
      </Box>
    </Stack>
      <Button variant="outlined" sx={{color:"black", mx:"auto",display:"flex",}} onClick={submit}>          
      <Typography  variant="h1" sx={{ mt: 2 }}>
            submit
          </Typography></Button>
    
      </>
  );
}
export default CreateNFT