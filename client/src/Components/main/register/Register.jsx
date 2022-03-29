import React, { useEffect, useState } from "react";
import CountryType from "./user/listener/CountryType.jsx";
import ListenerType from "./user/listener/ListenerType.jsx";
import axios from "axios";
import "./Register.css";

const Register = ({ address }) => {
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
    console.log(e.target.value);
  };

  const handleOnclick = async () => {
    await postImg();
    alert(genre[selected] + "장르를 좋아합니다.");
    setUser({
      address: address,
      genre: genre[selected],
      nation: option,
      nickname: nickname,
      img: DBdata.cover_img_link,
    });
  };

  console.log(user);
  const UserHandleOnClick = async () => {
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
    <div className="container">
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
          <label>닉네임</label>
          <input
            type="text"
            placeholder="닉네임"
            onChange={onChangeNick}
          ></input>
          <p>Nations</p>
          <div>
            {nation.map((nation, index) => (
              <CountryType
                id={index + 1}
                key={index}
                name={nation}
                setOption={setOption}
              />
            ))}
          </div>
          <div>
            <p>선호하는 장르를 선택해주세요 </p>
            <p>Genre</p>
            <div className="genre">
              {genre.map((MusicType, index) => (
                <ListenerType
                  id={index + 1}
                  key={index}
                  name={MusicType}
                  setSelected={setSelected}
                />
              ))}
              <button className="genre-set" onClick={handleOnclick}>
                장르확정
              </button>
            </div>
          </div>
          <button className="submit" onClick={UserHandleOnClick}>
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
