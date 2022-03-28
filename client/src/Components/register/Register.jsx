import React, { useEffect, useState } from "react";
import CountryType from "./user/listener/CountryType.jsx";
import ListenerType from "./user/listener/ListenerType.jsx";
import axios from "axios";
import Metamask from "../../web3/Metamask";
import "./Register.css";

const Register = ({ address, setAddress }) => {
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

  const onChangeNick = (e) => {
    setNickname(e.target.value);
    console.log(e.target.value);
  };

  const connectOnClick = async () => {
    const { data } = await Metamask.connectWallet();
    setAddress(data[0]);
  };

  const handleOnclick = () => {
    alert(genre[selected] + "장르를 좋아합니다.");
    setUser({
      address: address,
      genre: genre[selected],
      nation: option,
      nickname: nickname,
    });
  };
  console.log(user);
  const UserHandleOnClick = async () => {
    const url = "http://localhost:5000/users/signup";
    const response = await axios.post(url, user);
    console.log(response.data);
  };

  return (
    <div className="container">
      <div className="grid">
        <h2>Register</h2>

        <h3>Adress</h3>
        <p>
          {address ? (
            <p>{address}</p>
          ) : (
            <button onClick={connectOnClick}>Connect</button>
          )}
        </p>

        <h3>Nickname</h3>
        <input
          type="text"
          placeholder="Nickname"
          onChange={onChangeNick}
        ></input>
        {/* 닉네임 검증 필요함  */}
        <h3>Nations</h3>

        {nation.map((nation, index) => (
          <CountryType
            id={index + 1}
            key={index}
            name={nation}
            setOption={setOption}
          />
        ))}

        <p>선호하는 장르를 선택해주세요 </p>
        <h3>Genre</h3>
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
        <button className="submit" onClick={UserHandleOnClick}>
          회원가입
        </button>
      </div>
    </div>
  );
};

export default Register;
