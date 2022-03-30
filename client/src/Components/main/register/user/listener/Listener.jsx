import React, { useEffect, useState } from "react";
import CountryType from "./CountryType.jsx";
import ListenerType from "./ListenerType.jsx";
import axios from "axios";
import "./Listener.css";
import { Outlet } from "react-router-dom";
import { Input, Button } from "@mui/material";

const Listener = ({ address }) => {
  useEffect(() => {
    alert("회원가입하세요");
  }, []);

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
  const [user, setUser] = useState({});
  const [selected, setSelected] = useState("");
  const [option, setOption] = useState("");
  const [nickname, setNickname] = useState("");
  const [img, setImg] = useState("");
  const [albumCoverImgFile, setAlbumCoverImgFile] = useState("");
  const [DBdata, setDBdata] = useState({
    cover_img_link: "",
  });

  const formData = new FormData();

  const onChangeNick = (e) => {
    setNickname(e.target.value);
  };

  const handleOnclick = async () => {
    await postImg();
    setUser({
      address: address,
      genre: genre[selected],
      nation: option,
      nickname: nickname,
      img: DBdata.cover_img_link,
    });
    return user;
  };

  const UserHandleOnClick = async () => {
    const userdata = await handleOnclick();
    console.log(user);
    const url = "http://localhost:5000/users/signup";
    const response = await axios.post(url, user);
    console.log(response.data);
  };

  const getImg = (e) => {
    setAlbumCoverImgFile(e.target.files[0]);
  };

  const postImg = async () => {
    //multer하고 s3저장후 링크가져오기
    formData.append("img", albumCoverImgFile);
    await axios
      .post("http://localhost:5000/files/imgupload", formData) //formData multer가읽을수있다.
      .then((res) => (DBdata.cover_img_link = res.data.downLoadLink))
      .catch((err) => alert(err));
    return DBdata;
  };

  return (
    <div className="mypage">
      <div className="grid">
        <div className="box">
          <h2>Address</h2>
          <div>
            <p>{address}</p>
          </div>
          <h2>Profile Image</h2>
          <input
            name="imgUpload"
            type="file"
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
            <p>Nations</p>
            {nation.map((nation, index) => (
              <CountryType
                id={index + 1}
                key={index}
                name={nation}
                setOption={setOption}
              />
            ))}
          </div>
          <div className="genre">
            <p>Genre</p>
            {genre.map((MusicType, index) => (
              <ListenerType
                id={index + 1}
                key={index}
                name={MusicType}
                setSelected={setSelected}
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

export default Listener;
