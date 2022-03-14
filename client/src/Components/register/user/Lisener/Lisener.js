import React, { useEffect, useState } from "react";
import LisenerType from "./LisenerType";
import CountryType from "./CountryType";

const Lisener = () => {
  const [MusicTypes, setMusicTypes] = useState(["Pop", "k-pop", "Trot"]);
  const [Country, setCountry] = useState([""]);
  const [User, setUser] = useState([]);
  const [selected, setSelected] = useState("");
  const [Option, setOption] = useState("");

  useEffect(() => {
    console.log(User);
  }, [User]);

  const handleOnclick = (e) => {
    alert(MusicTypes[selected] + "장르를 좋아합니다.");
    setUser((User) => [
      ...User,
      "장르 : " + MusicTypes[selected],
      "국가 : " + Option,
    ]);
  };

  return (
    <div>
      <div className="music-type">
        <div>좋아하는장르</div>
        <div className="MusicTypeName">장르명</div>
      </div>
      {MusicTypes.map((MusicType, index) => (
        <LisenerType
          id={index + 1}
          key={index}
          name={MusicType}
          setSelected={setSelected}
        />
      ))}
      {Country.map((Country, index) => (
        <CountryType
          id={index + 1}
          key={index}
          name={Country}
          setOption={setOption}
        />
      ))}
      <button onClick={handleOnclick}>회원가입</button>
    </div>
  );
};

export default Lisener;
