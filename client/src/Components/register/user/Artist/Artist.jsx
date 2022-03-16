import React, { useEffect, useState } from "react";

import "./ArtistType.css";
import ArtisType from "./ArtisType";
import axios from "axios";
import Metamask from "../../../../web3/matamask.ts";

const Artist = () => {
  const [inputs, setInputs] = useState("");
  const [nation, setnNation] = useState([""]);
  const [option, setOption] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const init = async () => {
      const accounts = await Metamask.getAccounts();
      setAddress(accounts[0]);
    };
    init();
    return () => {};
  }, []);

  const submitOnClick = async () => {
    const url = "http://localhost:5000/artists/signup";
    const response = await axios.post(url, inputs);
    console.log(response.data);
  };

  const onChange = (e) => {
    setInputs(e.target.value);
    console.log(inputs);
  };

  const handleOnclick = () => {
    setInputs({
      address: address,
      nickname: inputs,
    });
  };
  console.log(inputs);

  return (
    <>
      <div>
        <ArtisType onChange={onChange} />
      </div>
      <div className="Artist-type-container">
        <button onClick={handleOnclick}>확정</button>
        <button onClick={submitOnClick}>회원가입</button>
      </div>
    </>
  );
};

export default Artist;
