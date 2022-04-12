import React, { useEffect, useRef, useState } from "react";
import CountryType from "./CountryType.jsx";
import ListenerType from "./ListenerType.jsx";
import axios from "axios";
import "./RegisterUser.css";
import { Outlet } from "react-router-dom";
import { Input, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createUserData } from "../../../../redux/actions/userActions.js";

const RegisterUser = ({ address }) => {
  useEffect(() => {
    alert("회원가입하세요");
  }, []);

  const user = useSelector((state) => state.user);
  const metamask = useSelector((state) => state.metamask);
  const dispatch = useDispatch(); //redux 초기값 넣어주자

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
      nation: option,
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

  const [checkedInputs, setCheckedInputs] = useState([]);

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
              {nation.map((nation, index) => (
                <CountryType
                  id={index + 1}
                  key={index}
                  inputProps={{ width: "400px" }}
                  name={nation}
                  setOption={setOption}
                  // style={{ display: "none" }}
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
