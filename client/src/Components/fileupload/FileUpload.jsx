import React, { useEffect, useState } from "react";
import axios from "axios";
const { create } = require("ipfs-http-client");

function FileUpload() {

  const [albumCoverImgFile, setAlbumCoverImgFile] = useState("");
  const [audiofile, setaudiofile] = useState("");
  const [duration, setDuration] = useState("")
  const [currentTime, setCurrentTime] = useState("")    //TODO : 나중에 스트리밍할때쓸려고나둠
  const [DBdata, setDBdata] = useState({
    cover_img_link : '',
    music_link : '',
    music_title : '',
    music_duration : '',
    artist_name : '',

    });

  const formData = new FormData();  //server로 img파일 보내기위해 사용
 
  async function ipfsClient() {    //ipfs 서버연결
    const ipfs = await create({
      host: "ipfs.infura.io",
      port: 5001,
      protocol: "https",
    });
    return ipfs;
  }

  const getImg = (e) => {
    setAlbumCoverImgFile(e.target.files[0]);
  };
  const getAudio = (e) => {
    setaudiofile(e.target.files[0]);
  };
  const getTitle = (e) => {
    DBdata.music_title =  e.target.value;
  };
  const getArtist = (e) => {
    DBdata.artist_name = e.target.value;
  };

  const postImg = async() => {              //multer하고 s3저장후 링크가져오기
    formData.append("img", albumCoverImgFile);
    await axios
      .post("http://localhost:5000/files/imgupload", formData) //formData multer가읽을수있다.
      .then(res => DBdata.cover_img_link = res.data.downLoadLink)
      .catch(err => alert(err));
    return DBdata
  };

  const postAudio = async() => {              //multer하고 s3저장후 링크가져오기
    let ipfs = await ipfsClient();
    let result = await ipfs.add(audiofile)
     DBdata.music_link = result.path;
  };
  const submit = async() => {
    DBdata.music_duration = duration;
    await postImg();
    await postAudio();
    console.log(DBdata);
    //TODO : 아티스트 이름은 useEffect로 처음에 불러와서 보낼꺼니깐있는거어서 상관 x
    //TODO : 지금은 안불러와서 있는 아티스트 이름넣어줘야 db저장가능
    
    await axios
      .post("http://localhost:5000/files/create", DBdata)
      .then((res) => {
        if ((res.data.result= 0)) {
          alert(res.data.message);
        } else if ((res.data.result = 1)) {
          alert(res.data.message);
        }else if ((res.data.result = 2)) {
          alert(res.data.message);
      }})
      .catch((err) => alert(err));
      //실행후 초기화
      setAlbumCoverImgFile("")
      setaudiofile("")
      setDBdata({
        cover_img_link : '',
        music_link : '',
        music_title : '',
        music_duration : '',
        artist_name : '',
        })
  }

  return (
    <>
      <p>albumCoverImg</p>
      <input name="imgUpload" type="file" accept="image/*" onChange={getImg} />
      {albumCoverImgFile && (
      <img src={URL.createObjectURL(albumCoverImgFile)}></img>)}
      <p>music</p>
      <input type="file" accept="audio/*" onChange={getAudio} />
      {audiofile && (
        <audio
          src={URL.createObjectURL(audiofile)}
          onLoadedData={(e) => {
            setDuration(e.currentTarget.duration);
            // console.log(e.currentTarget.duration);
          }}
          onTimeUpdate= {(e) =>{
            // console.log(e.currentTarget.currentTime)
          }}
          autoplay
          loop
          controls
        >
          오디오 지원되지 않는 브라우저
        </audio>
      )}
      <p>title</p>
      <input onChange={getTitle} />
      <p>artist</p>
      <input onChange={getArtist} />
      {/* <audio src="" autoplay loop controls>오디오 지원되지 않는 브라우저</audio> */}
      <p />
      <button onClick={submit}> submit </button>
    </>
  );
}
export default FileUpload;
