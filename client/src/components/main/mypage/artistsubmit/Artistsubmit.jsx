import "./Artistsubmit.css";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button, Avatar } from "@mui/material";
import axios from "axios";
import { createArtistData } from "../../../../redux/actions/artistActions";

export default function Artistsubmit() {
  const [inputs, setInputs] = useState("");
  const [DBdata, setDBdata] = useState({
    cover_img_link: "",
  });
  const [albumCoverImgFile, setAlbumCoverImgFile] = useState("");

  const formData = new FormData();

  const metamask = useSelector((state) => state.metamask);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const submitOnClick = async () => {
    await postImg();
    const artistsdata = {
      user_address: metamask.accounts[0],
      artist_name: inputs,
      img: DBdata.cover_img_link,
    };
    dispatch(createArtistData(artistsdata));
  };

  const onChange = (e) => {
    setInputs(e.target.value);
  };

  const postImg = async () => {
    if (albumCoverImgFile !== "") {
      formData.append("img", albumCoverImgFile);
      await axios
        .post("http://localhost:5000/files/upload/img", formData)
        .then((res) => (DBdata.cover_img_link = res.data))
        .catch((err) => alert(err));
      return DBdata;
    } else {
      return;
    }
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
              {albumCoverImgFile === "" ? (
                <Avatar alt="Remy Sharp" sx={{ width: 128, height: 128 }} />
              ) : (
                <Avatar
                  alt="Remy Sharp"
                  src={URL.createObjectURL(albumCoverImgFile)}
                  sx={{ width: 128, height: 128 }}
                />
              )}
            </div>
            <label htmlFor="artist-register-profile">
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
}
