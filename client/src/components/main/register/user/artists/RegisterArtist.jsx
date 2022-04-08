import "./ArtistType.css";
import { useState } from "react";
// import ArtisType from "./ArtisType";
import { Input, Button } from "@mui/material";
import axios from "axios";

const RegisterArtist = ({ address }) => {
  const [inputs, setInputs] = useState("");
  const [DBdata, setDBdata] = useState({
    cover_img_link: "",
  });
  const [albumCoverImgFile, setAlbumCoverImgFile] = useState("");

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
      <div className="artist-nickname">
        <div className="grid">
          <div className="box">
            <div className="artist-name">
              <h1>Artist Nickname</h1>
              <Input
                required
                placeholder="Please enter your Nickname."
                inputProps={{ style: { fontSize: 30 } }}
                label="Email"
                sx={{ width: 400 }}
                variant="standard"
                name="nickname"
                onChange={onChange}
              />
            </div>
            <h1>Profile Image</h1>
            <div className="artist-register-profile-img">
              {albumCoverImgFile && (
                <img
                  src={URL.createObjectURL(albumCoverImgFile)}
                  style={{ width: "200px" }}
                ></img>
              )}
            </div>
            <label for="artist-register-profile">
              Choose your profile image
            </label>
            <input
              id="artist-register-profile"
              style={{ display: "none" }}
              name="imgUpload"
              type="file"
              accept="image/*"
              onChange={getImg}
            />
          </div>
          <Button onClick={submitOnClick}>Artist Registration</Button>
        </div>
      </div>
    </>
  );
};

export default RegisterArtist;
