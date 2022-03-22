import React, { useEffect, useState } from "react";
import CountryType from "./../register/user/listener/CountryType.jsx";
import ListenerType from "./../register/user/listener/ListenerType.jsx";
import Metamask from "./../../web3/Matamask";
import axios from "axios";
import "./Register.css";

const Register = () => {
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
  const [address, setAddress] = useState("");
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    const init = async () => {
      const accounts = await Metamask.getAccounts();
      setAddress(accounts[0]);
    };
    init();
    return () => {};
  }, []);

  const onChangeNick = (e) => {
    setNickname(e.target.value);
    console.log(e.target.value);
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
    <div class="container">
      <div class="grid">
        <div class="box">
          <p>Adress</p>
          <div>
            <p>0xlaijf3234</p>
            <button type="button" class="">
              Vrify your Metamask Address
            </button>
          </div>
          <label>닉네임</label>
          <input type="text" onChange={onChangeNick}></input>
          <p>Nations</p>
          <div>
            {" "}
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
            <div class="genre">
              {genre.map((MusicType, index) => (
                <ListenerType
                  id={index + 1}
                  key={index}
                  name={MusicType}
                  setSelected={setSelected}
                />
              ))}
            </div>
            <button onClick={handleOnclick}>장르확정</button>
          </div>
          <button onClick={UserHandleOnClick}>회원가입</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
