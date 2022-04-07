import React, { useEffect, useRef, useState } from "react";
import CountryType from "./CountryType.jsx";
import ListenerType from "./ListenerType.jsx";
import axios from "axios";
import "./RegisterUser.css";
import { Outlet } from "react-router-dom";
import { Input, Button } from "@mui/material";

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

  /////////////////////////////////////////////

  // const [image, setImage] = useState("")
  // const [preview, setPreview] = useState("")
  // const [previewURL, setPreviewURL] = useState("")
  // const fileRef= useRef();

  // useEffect(() => {
  //   alert("회원가입하세요");
  //   if(image !== ""){
  //     setPreview(<img className="img_preview">{previewURL}</img>)
  //   }
  // }, []);

  return (
    <div className="mypage">
      <div className="grid">
        <div className="box">
          <h2>Address</h2>
          <div>
            <p>{address}</p>
          </div>
          <h2>Profile Image</h2>
          {albumCoverImgFile && (
            <img
              src={URL.createObjectURL(albumCoverImgFile)}
              style={{ width: "200px" }}
            ></img>
          )}
          <div>
            <input
              name="imgUpload"
              type="file"
              accept="image/*"
              onChange={getImg}
            />
            <h2>Nickname</h2>
            <li>
              <Input
                type="text"
                placeholder="Nickname"
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
                name={nation}
                setOption={setOption}
              />
            ))}
          </div>
          <h2>Genre</h2>
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
