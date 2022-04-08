import React, { useEffect, useRef, useState } from "react";
import CountryType from "./CountryType.jsx";
import ListenerType from "./ListenerType.jsx";
import axios from "axios";
import "./RegisterUser.css";
import { Outlet } from "react-router-dom";
import { Input, Button } from "@mui/material";
import { useSelector } from "react-redux";

const RegisterUser = ({ address }) => {
  const [genre, setGenre] = useState([
    "Pop",
    "K-pop",
    "Classical Music",
    "Jazz",
    "Trot",
    "Hip-pop",
    "CCM",
    "Ballad",
    "Contry Music",
    "Folk Music",
    "Reggae",
    "Disco",
    "Rock",
    "Electronic",
    "Dance",
  ]);
  const [nation, setNation] = useState([""]);
  const [option, setOption] = useState("");
  const [nickname, setNickname] = useState("");
  const [albumCoverImgFile, setAlbumCoverImgFile] = useState("");
  const [DBdata, setDBdata] = useState({
    cover_img_link: "",
  });

  const formData = new FormData();

  const onChangeNick = (e) => {
    setNickname(e.target.value);
  };

  const UserHandleOnClick = async () => {
    await postImg();
    const userdata = {
      address: metamask.accounts[0],
      genre: checkedInputs,
      nation: option,
      nickname: nickname,
      img: DBdata.cover_img_link,
    };
    const url = "http://localhost:5000/users";
    const response = await axios.post(url, userdata);
  };

  const getImg = (e) => {
    if (e.target.files[0]) {
      setAlbumCoverImgFile(e.target.files[0]);
    }
  };

  const postImg = async () => {
    formData.append("img", albumCoverImgFile);
    await axios
      .post("http://localhost:5000/files/imgupload", formData)
      .then((res) => (DBdata.cover_img_link = res.data.downLoadLink))
      .catch((err) => alert(err));
    return DBdata;
  };

  const [checkedInputs, setCheckedInputs] = useState([]);

  const changeHandler = (checked, name) => {
    if (checked) {
      setCheckedInputs([...checkedInputs, name]);
    } else {
      // 체크 해제
      setCheckedInputs(checkedInputs.filter((el) => el !== name));
    }
  };

  ////////////////////////////////////////////////

  const metamask = useSelector((state) => state.metamask);

  console.log(metamask);

  if (metamask.loading) {
    return <>loding</>;
  } else {
    if (metamask.error) {
      return <>error</>;
    } else {
      return (
        <div className="mypage">
          <div className="grid">
            <div className="box">
              <h1>Your Wallet Address</h1>
              <div>
                <p>{metamask.accounts[0]}</p>
              </div>
              <h1>Profile Image</h1>

              <label for="register-fileupload">Choose your profile image</label>
              <Input
                id="register-fileupload"
                type="file"
                name="imgUpload"
                style={{ display: "none" }}
                accept="image/*"
                onChange={getImg}
              />
              {albumCoverImgFile && (
                <img
                  src={URL.createObjectURL(albumCoverImgFile)}
                  style={{ width: "200px" }}
                ></img>
              )}
              <div>
                <h1>Nickname</h1>
                <li>
                  <Input
                    type="text"
                    placeholder="Nickname"
                    sx={{ width: 400 }}
                    onChange={onChangeNick}
                  ></Input>
                </li>
              </div>
              <div>
                <h2>Nations</h2>
                {nation.map((nation, index) => (
                  <CountryType
                    id={index + 1}
                    key={index}
                    sx={{ width: 400 }}
                    name={nation}
                    setOption={setOption}
                  />
                ))}
              </div>
              <h1>Genre</h1>
              <div className="genre">
                {genre.map((MusicType, index) => (
                  <ListenerType
                    id={index + 1}
                    key={index}
                    name={MusicType}
                    changeHandler={changeHandler}
                    checkedInputs={checkedInputs}
                  />
                ))}
              </div>
              <Button className="submit" onClick={UserHandleOnClick}>
                Submit
              </Button>
            </div>
            <Outlet />
          </div>
        </div>
      );
    }
  }
};

export default RegisterUser;
