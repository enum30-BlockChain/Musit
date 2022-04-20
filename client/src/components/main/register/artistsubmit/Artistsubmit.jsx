import "./Artistsubmit.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button, Avatar } from "@mui/material";
import axios from "axios";
import { createArtistData } from "../../../../redux/actions/artistActions";
import { Link } from "react-router-dom";

export default function Artistsubmit() {
  useEffect(() => {
    alert("아티스트 가입해주세요");
  }, []);

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
    alert("아티스트 등록이 완료되었습니다");
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
        <div className="regi-grid">
          <div className="artist-name">
            <p className="artist-infomation-regi">Artist Nickname</p>
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
          <p className="artist-infomation-regi">Profile Image</p>
          <div className="artist-register-profile-img">
            {albumCoverImgFile === "" ? (
              <Avatar alt="Remy Sharp" sx={{ width: 300, height: 300 }} />
            ) : (
              <Avatar
                alt="Remy Sharp"
                src={URL.createObjectURL(albumCoverImgFile)}
                sx={{ width: 300, height: 300 }}
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
        <Link to={"/artist"}>
          <label onClick={submitOnClick}>Artist Registration</label>
        </Link>
      </div>
    </>
  );
}
