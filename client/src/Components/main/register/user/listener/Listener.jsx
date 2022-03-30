import React, { useEffect, useState } from "react";
import CountryType from "./CountryType.jsx";
import ListenerType from "./ListenerType.jsx";
import axios from "axios";
import "./Listener.css";
import { Outlet } from "react-router-dom";

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

  const UserHandleOnClick = async () => {
    await postImg();
    const userdata = {
      address: address,
      genre: genre[selected],
      nation: option,
      nickname: nickname,
      img: DBdata.cover_img_link,
    };
    console.log(userdata);
    const url = "http://localhost:5000/users/signup";
    const response = await axios.post(url, userdata);
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
          <p>Address</p>
          <div>
            <p>{address}</p>
            <button type="button" className="">
              Vrify your Metamask Address
            </button>
          </div>
          <p>albumCoverImg</p>
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
            <label>닉네임</label>
            <li>
              <input
                type="text"
                placeholder="닉네임"
                onChange={onChangeNick}
              ></input>
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
          <button className="submit" onClick={UserHandleOnClick}>
            회원가입
          </button>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Listener;
