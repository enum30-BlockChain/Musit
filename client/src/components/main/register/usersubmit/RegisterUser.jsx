import "./RegisterUser.css";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import Avatar from "@mui/material/Avatar";
import CountryType from "./CountryType.jsx";
import { Box, Button, Input, Checkbox } from "@mui/material";

import { Link } from "react-router-dom";
import { createUserData } from "../../../../redux/actions/userActions";
import { connectMetamask } from "../../../../redux/actions/metamaskActions";

const RegisterUser = () => {
  const metamask = useSelector((state) => state.metamask);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch(); //redux 초기값 넣어주자

  useEffect(() => {
    alert("회원가입해주세요");
  }, []);

  //선택한 장르를 변경해주는 값
  const [checkedInputs, setCheckedInputs] = useState([]);
  //장르의 종류
  const [genre, setGenre] = useState([
    "Pop",
    "K-pop",
    "Classic",
    "Jazz",
    "Trot",
    "Hip-pop",
    "CCM",
    "Ballad",
    "Contry ",
    "Folk ",
    "Reggae",
    "Disco",
    "Rock",
    "Electronic",
    "Dance",
    "R&B",
  ]);

  //국가의 종류
  const [selectd, setSelected] = useState("KS");
  const [nickname, setNickname] = useState("");
  const [albumCoverImgFile, setAlbumCoverImgFile] = useState("");
  const [DBdata, setDBdata] = useState({
    cover_img_link: "",
  });

  //오류상태매세지
  const [nicknameMessage, setnicknameMessage] = useState("");
  const connectOnclick = () => {
    dispatch(connectMetamask());
  };

  //유효성검사
  const [isName] = useState(false);

  const formData = new FormData();

  const onChangeNick = (e) => {
    setNickname(e.target.value);
  };

  const UserHandleOnClick = async (e) => {
    if (nickname === "") {
      alert("닉네임 적어주세요");
    } else if (checkedInputs.length === 0) {
      alert("장르를 1개이상 3개이하로 체크해주세요");
    } else {
      await postImg();
      const userdata = {
        address: metamask.accounts[0],
        genre: checkedInputs,
        nation: selectd,
        nickname: nickname,
        img: DBdata.cover_img_link,
      };
      await dispatch(createUserData(userdata));
      window.location.href = "/mypage";
    }
  };

  const getImg = (e) => {
    if (e.target.files[0]) {
      setAlbumCoverImgFile(e.target.files[0]);
    }
  };

  const postImg = async () => {
    if (albumCoverImgFile !== "") {
      formData.append("img", albumCoverImgFile);
      await axios
        .post("http://54.180.145.5/files/upload/img", formData)
        .then((res) => (DBdata.cover_img_link = res.data))
        .catch((err) => alert(err));
      return DBdata;
    } else {
      return;
    }
  };

  const changeHandler = (checked, name) => {
    if (checked) {
      if ([...checkedInputs, name].length >= 4) {
        return alert("3개까지만 check 해주세요");
      }
      setCheckedInputs([...checkedInputs, name]);
    } else {
      // 체크 해제
      setCheckedInputs(checkedInputs.filter((el) => el !== name));
    }
  };

  //---------Error------

  return (
    <>
      <div className="register-layout">
        <div className="register-title">
          <i className="uil uil-upload-alt"></i>
          <span className="text"> Sign up to Enum30 Music</span>
        </div>
        <div className="register-user">
          <div className="address-and-img">
            <h1>Your Wallet Address</h1>
            <>
              {metamask.accounts[0] === undefined ? (
                <>
                  <div>
                    <a id="bringyouraddress" onClick={connectOnclick}>
                      Bring your Wallet Address
                    </a>
                  </div>
                </>
              ) : (
                metamask.accounts[0]
              )}
            </>

            <h1 className="profileimage">Profile Image</h1>
            <div className="profile-img-upload">
              {albumCoverImgFile === "" ? (
                <Avatar
                  className="register-avatar"
                  alt="Remy Sharp"
                  sx={{ width: 330, height: 330 }}
                />
              ) : (
                <Avatar
                  className="register-avatar"
                  alt="Remy Sharp"
                  src={URL.createObjectURL(albumCoverImgFile)}
                  sx={{ width: 330, height: 330 }}
                />
              )}
            </div>
            <div>
              <label htmlFor="register-fileupload">
                Choose your profile image
              </label>
              <input
                id="register-fileupload"
                name="imgUpload"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={getImg}
              />
            </div>
          </div>

          <form>
            <div className="register-input">
              <div style={{ margin: "20px" }}>
                <h1>Nickname</h1>
                <li>
                  <Input
                    required={true}
                    type="text"
                    placeholder="Nickname"
                    sx={{ width: 400 }}
                    inputProps={{ style: { fontSize: 30 } }}
                    onChange={onChangeNick}
                  ></Input>
                </li>
              </div>
              <li>
                {nickname.length > 0 && (
                  <span className={`message ${isName ? "success" : "error"}`}>
                    {nicknameMessage}
                  </span>
                )}
              </li>
              <div style={{ margin: "20px" }}>
                <h2>Nations</h2>
                <Box sx={{ ml: "35%", display: "contents" }}>
                  <CountryType
                    required
                    setSelected={setSelected}
                    // style={{ display: "none" }}
                  />
                </Box>
              </div>
              <div style={{ margin: "20px" }}>
                <h1>Genre</h1>
                <div className="genre">
                  {genre.map((MusicType, index) => {
                    return (
                      <Box sx={{ width: "33%", textAlign: "left" }}>
                        <label id={index} key={index}>
                          <Checkbox
                            className="checkbox-musicupload"
                            type={"checkbox"}
                            name={"MusicType"}
                            value={MusicType}
                            onChange={(e) => {
                              changeHandler(e.currentTarget.checked, MusicType);
                            }}
                            checked={
                              checkedInputs.includes(MusicType) ? true : false
                            }
                          />
                          {MusicType}
                        </label>
                      </Box>
                    );
                  })}
                </div>
              </div>
            </div>

            <Button
              className="submit"
              variant="contained"
              sx={{
                color: "var(--black-light-color)",
                backgroundColor: "var(--box1-color)",
                ":hover": {
                  background: "var(--primary-color)",
                  color: "var(--text-color)",
                },
              }}
              onClick={UserHandleOnClick}
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterUser;
