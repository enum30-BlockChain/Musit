import React, { useState } from "react";
import axios from "axios";
const { create } = require("ipfs-http-client");

function ImgUpload() {

  const [albumCoverImgFile, setAlbumCoverImgFile] = useState("");
  const [audiofile, setaudiofile] = useState("");
  const [DBdata, setDBdata] = useState({
    cover_img_link : '',
    music_link : '',
    music_title : '',
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
    await postImg();
    await postAudio();
    console.log(DBdata);
    await axios
      .post("http://localhost:5000/files/create",DBdata)
      .then(res => DBdata.cover_img_link = res.data.downLoadLink)
      .catch(err => alert(err));
  }

  return (
    <>
      <p>albumCoverImg</p>
      <input name="imgUpload" type="file" accept="image/*" onChange={getImg} />
      <p>music</p>
      <input type="file" accept="audio/*" onChange={getAudio} />
      <p>title</p>
      <input onChange={getTitle} />
      <p>artist</p>
      <input onChange={getArtist} />
      {/* <audio src="" autoplay loop controls>오디오 지원되지 않는 브라우저</audio> */}
      <p/>
      <button onClick={submit}> submit </button>
    </>
  );
}
export default ImgUpload;
