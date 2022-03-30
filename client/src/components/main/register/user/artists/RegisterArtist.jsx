import React, { useEffect, useState } from "react";

import "./ArtistType.css";
import ArtisType from "./ArtisType";
import axios from "axios";

const RegisterArtist = ({ address }) => {
  const [inputs, setInputs] = useState("");

  const submitOnClick = async () => {
    const artistsdata = {
      address,
      nickname: inputs,
    };
    console.log(artistsdata);
    const url = "http://localhost:5000/artists/signup";
    const response = await axios.post(url, artistsdata);
    console.log(response.data);
  };

  const onChange = (e) => {
    setInputs(e.target.value);
  };

  return (
    <>
      <div>
        <ArtisType onChange={onChange} />
      </div>
      <div className="Artist-type-container">
        <button onClick={submitOnClick}>회원가입</button>
      </div>
    </>
  );
};

export default RegisterArtist;
