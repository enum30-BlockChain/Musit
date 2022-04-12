import React, { Fragment, useEffect, useRef, useState } from "react";
import CountryType from "./CountryType.jsx";
import axios from "axios";
import "./RegisterUser.css";
import { Outlet } from "react-router-dom";
import { Input, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createUserData } from "../../../redux/actions/userActions";

const RegisterUser = ({ address }) => {
  useEffect(() => {
    alert("회원가입하세요");
  }, []);

  const metamask = useSelector((state) => state.metamask);
  const dispatch = useDispatch(); //redux 초기값 넣어주자

  //선택한 장르를 변경해주는 값
  const [checkedInputs, setCheckedInputs] = useState([]);
  //장르의 종류
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

  //국가의 종류
  const [nation, setNation] = useState([""]);
  const [selectd, setSelected] = useState("KS");
  const [nickname, setNickname] = useState("");
  const [albumCoverImgFile, setAlbumCoverImgFile] = useState("");
  const [DBdata, setDBdata] = useState({
    cover_img_link: "",
  });
  // const connectOnclick = () => {
  //   Metamask.connectWallet();
  // };
  const formData = new FormData();

  const onChangeNick = (e) => {
    setNickname(e.target.value);
  };

  const UserHandleOnClick = async () => {
    await postImg();
    const userdata = {
      address: metamask.accounts[0],
      genre: checkedInputs,
      nation: selectd,
      nickname: nickname,
      img: DBdata.cover_img_link,
    };
    dispatch(createUserData(userdata));
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
      .then((res) => (DBdata.cover_img_link = res.data))
      .catch((err) => alert(err));
    return DBdata;
  };

  const changeHandler = (checked, name) => {
    if (checked) {
      setCheckedInputs([...checkedInputs, name]);
    } else {
      // 체크 해제
      setCheckedInputs(checkedInputs.filter((el) => el !== name));
    }
  };

  return (
    <>
      <div className="register-layout">
        <h1 className="register-user-tilte">Sign up to Enum30 Music</h1>
        <div className="register-user">
          <div className="address-and-img">
            <h1>Your Wallet Address</h1>
            <>
              {metamask.accounts[0] === undefined ? (
                <>
                  <label htmlFor="register-usernickname">
                    Bring your Wallet Address
                  </label>
                  {/* <button
                    id="register-usernickname"
                    style={{ display: "none" }}
                    onClick={connectOnclick}
                  /> */}
                </>
              ) : (
                metamask.accounts[0]
              )}
            </>

            <h1>Profile Image</h1>
            {albumCoverImgFile && (
              <img
                src={URL.createObjectURL(albumCoverImgFile)}
                style={{ width: "200px" }}
              ></img>
            )}
            <div>
              <label htmlFor="register-fileupload">
                Choose your profile image
              </label>
              <Input
                id="register-fileupload"
                type="file"
                name="imgUpload"
                style={{ display: "none" }}
                accept="image/*"
                onChange={getImg}
              />
            </div>
          </div>

          <div className="register-input">
            <h1>Nickname</h1>
            <li>
              <Input
                type="text"
                placeholder="Nickname"
                sx={{ width: 400 }}
                inputProps={{ fontSize: "30px" }}
                onChange={onChangeNick}
              ></Input>
            </li>

            <div>
              <h2>Nations</h2>
              {nation.map((country, index) => (
                <CountryType
                  id={index + 1}
                  key={index}
                  inputProps={{ width: "400px" }}
                  name={country}
                  setSelected={setSelected}
                  // style={{ display: "none" }}
                />
              ))}
            </div>
            <h1>Genre</h1>
            <div className="genre">
              {genre.map((musictype, i) => {
                return (
                  <div className="music-type-container">
                    <div className="music-type-name">{musictype}</div>
                    <div>
                      <input
                        key={i}
                        type="checkbox"
                        musictype="musicType"
                        onChange={(e) => {
                          changeHandler(e.currentTarget.checked, musictype);
                        }}
                        checked={
                          checkedInputs.includes(musictype) ? true : false
                        }
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <Button className="submit" onClick={UserHandleOnClick}>
          Submit
        </Button>
      </div>
      <Outlet />
    </>
  );
};

export default RegisterUser;

/*
 (
                <ListenerType
                  id={index + 1}
                  key={index}
                  name={MusicType}
                  changeHandler={changeHandler}
                  checkedInputs={checkedInputs}
                />
*/
