import React, { useEffect, useState } from "react";
import LisenerType from "./LisenerType";
import CountryType from "./CountryType";
import axios from "axios";

const Lisener = () => {
  const [myfavorite, setMyfavorite] = useState(["Pop", "k-pop", "Trot"]);
  const [nation, setnNation] = useState([""]);
  const [User, setUser] = useState([]);
  const [selected, setSelected] = useState("");
  const [Option, setOption] = useState("");

  // useEffect(() => {
  //   console.log(User);
  // }, [User]);

  const handleOnclick = async () => {
    alert(myfavorite[selected] + "장르를 좋아합니다.");
    setUser((User) => [
      ...User,
      "장르 : " + myfavorite[selected],
      "국가 : " + Option,
    ]);
    console.log(User);
    const url = "http://localhost:5000/users/signup";
    const response = await axios.post(url, User);
    console.log(response.data);
  };

  return (
    <div>
      <div className="music-type">
        <div>좋아하는장르</div>
        <div className="MusicTypeName">장르명</div>
      </div>
      {myfavorite.map((MusicType, index) => (
        <LisenerType
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
      <button onClick={handleOnclick}>회원가입</button>
    </div>
  );
};

export default Lisener;
