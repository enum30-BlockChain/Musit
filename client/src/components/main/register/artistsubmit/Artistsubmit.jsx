import "./Artistsubmit.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button, Avatar } from "@mui/material";
import axios from "axios";
import { createArtistData } from "../../../../redux/actions/artistActions";

export default function Artistsubmit() {
  // useEffect(() => {
  //   alert("아티스트 가입해주세요");
  // }, []);

  const [inputs, setInputs] = useState("");
  const [DBdata, setDBdata] = useState({
    cover_img_link: "",
  });
  const [albumCoverImgFile, setAlbumCoverImgFile] = useState("");

  const formData = new FormData();

  const metamask = useSelector((state) => state.metamask);
  const user = useSelector((state) => state.user);
  const artist = useSelector((state) => state.artist);

  const dispatch = useDispatch();

  const submitOnClick = async (e) => {
    e.preventDefault();
		let isFormValid = document.querySelector(".artist-submit-form input").checkValidity();
    if (!isFormValid) {
			document.querySelector(".artist-submit-form input").reportValidity();
		} else {
			await postImg();
			const artistsdata = {
				user_address: metamask.accounts[0],
				artist_name: inputs,
				img: DBdata.cover_img_link,
			};
			const result = await dispatch(createArtistData(artistsdata));

			if (result !== undefined) {
				alert("아티스트 등록이 완료되었습니다.");
			} else {
        alert("아티스트 등록에 실패했습니다.");
      }
      window.location.href ="/"
		}
    
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
    <form className="artist-submit-form">
      <div className="artist-submit-container">
        <div className="content-container">
          <div className="content-box">
            <p className="artist-infomation-regi">Artist Nickname</p>
            <Input
              className="input-box"
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
          <div className="content-box">
            <p className="artist-infomation-regi">Profile Image</p>
            <div className="artist-register-profile-img">
              {albumCoverImgFile === "" ? (
                <Avatar alt="Remy Sharp" sx={{ width: 330, height: 330 }} />
              ) : (
                <Avatar
                  alt="Remy Sharp"
                  src={URL.createObjectURL(albumCoverImgFile)}
                  sx={{ width: 330, height: 330 }}
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
        </div>
        <div className="submit-container">
          <button className="submit-btn" onClick={submitOnClick}>
            Artist Submit
          </button>
        </div>
      </div>
    </form>
  );
}
