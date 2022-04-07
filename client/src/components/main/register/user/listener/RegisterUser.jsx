import React, { useEffect, useState } from "react";
import CountryType from "./CountryType.jsx";
import ListenerType from "./ListenerType.jsx";
import axios from "axios";
import "./RegisterUser.css";
import { Outlet } from "react-router-dom";
import { Input, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import Metamask from "./../../../../../web3/Metamask";

const RegisterUser = ({ address }) => {
  useEffect(() => {
    alert("회원가입하세요");
  }, []);

  // const user = useSelector((state) => state.user);
  // const dispatch = useDispatch(); //redux 초기값 넣어주자

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
  const [img, setImg] = useState("");
  const [albumCoverImgFile, setAlbumCoverImgFile] = useState("");
  const [DBdata, setDBdata] = useState({
    cover_img_link: "",
  });
  const connectOnclick = () => {
    Metamask.connectWallet();
  };
  const formData = new FormData();

  const onChangeNick = (e) => {
    setNickname(e.target.value);
  };

  const UserHandleOnClick = async () => {
    await postImg();
    const userdata = {
      address: address,
      genre: checkedInputs,
      nation: option,
      nickname: nickname,
      img: DBdata.cover_img_link,
    };
    const url = "http://localhost:5000/users/signup";
    const response = await axios.post(url, userdata);
  };

  const getImg = (e) => {
    setAlbumCoverImgFile(e.target.files[0]);
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

  console.log(11111);
  console.log(address);
  return (
    <div className="mypage">
      <div className="grid">
        <div className="box">
          <h1>Your Wallet Address</h1>
          <div>
            <p>
              {address === undefined ? (
                <Button onClick={connectOnclick}>
                  Bring your Wallet Address
                </Button>
              ) : (
                address
              )}
            </p>
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
};

export default RegisterUser;
