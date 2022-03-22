import React, { useState } from "react";
import ListenerType from "./ListenerType";
import CountryType from "./CountryType";
import axios from "axios";

const Listener = ({ address }) => {
  const [genre, setgenre] = useState(["Pop", "k-pop", "Trot"]);
  const [nation, setNation] = useState([""]);
  const [user, setUser] = useState({});
  const [selected, setSelected] = useState("");
  const [option, setOption] = useState("");
  const [nickname, setNickname] = useState("");

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

  const UserHandleOnClick = async () => {
    const url = "http://localhost:5000/users/signup";
    const response = await axios.post(url, user);
    console.log(response.data);
  };

  return (
    <div>
      <div className="music-type">
        <div>좋아하는장르</div>
        <div className="MusicTypeName">장르명</div>
      </div>
      {genre.map((MusicType, index) => (
        <ListenerType
          id={index + 1}
          key={index}
          name={MusicType}
          setSelected={setSelected}
        />
      ))}
      {nation.map((nation, index) => (
        <CountryType
          id={index + 1}
          key={index}
          name={nation}
          setOption={setOption}
        />
      ))}
      <div>
        <p>
          닉네임<input type="text" onChange={onChangeNick}></input>
        </p>
      </div>
      <button onClick={handleOnclick}>확정</button>
      <button onClick={UserHandleOnClick}>회원가입</button>
    </div>
  );
};

export default Listener;
