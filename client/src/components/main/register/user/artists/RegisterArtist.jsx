import React, { useEffect, useState } from "react";

import "./ArtistType.css";
import ArtisType from "./ArtisType";
import axios from "axios";

const RegisterArtist = ({ address }) => {
  const [inputs, setInputs] = useState("");

  const submitOnClick = async () => {
    await postImg();
    const artistsdata = {
      address,
      nickname: inputs,
      img: DBdata.cover_img_link,
    };
    console.log(artistsdata);
    const url = "http://localhost:5000/artists/signup";
    const response = await axios.post(url, artistsdata);
    console.log(response.data);
  };

  const onChange = (e) => {
    setInputs(e.target.value);
  };

  ///////////////////////////////////////////////////////////

  const [DBdata, setDBdata] = useState({
    cover_img_link: "",
  });
  const [albumCoverImgFile, setAlbumCoverImgFile] = useState("");

  const formData = new FormData();

  const postImg = async () => {
    //multer하고 s3저장후 링크가져오기
    formData.append("img", albumCoverImgFile);
    await axios
      .post("http://localhost:5000/files/imgupload", formData) //formData multer가읽을수있다.
      .then((res) => (DBdata.cover_img_link = res.data.downLoadLink))
      .catch((err) => alert(err));
    return DBdata;
  };

  const getImg = (e) => {
    setAlbumCoverImgFile(e.target.files[0]);
  };

  return (
    <>
      <div className="mypage">
        <div className="grid">
          <div className="box">
            <ArtisType onChange={onChange} />
            <h2>Profile Image</h2>
            <input
              name="imgUpload"
              type="file"
              accept="image/*"
              onChange={getImg}
            />
            {albumCoverImgFile && (
              <img
                src={URL.createObjectURL(albumCoverImgFile)}
                style={{ width: "200px" }}
              ></img>
            )}
            <button onClick={submitOnClick}>회원가입</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterArtist;
