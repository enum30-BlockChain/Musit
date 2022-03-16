import React, { useEffect, useState } from "react";

import "./ArtistType.css";
import ArtisType from "./ArtisType";
import axios from "axios";
import Metamask from "../../../../Web3/Metamask";
import CountryType from "./CountryType";

const Artist = () => {
  const [inputs, setInputs] = useState("");
  const [nation, setnNation] = useState([""]);
  const [option, setOption] = useState("");
  const [address, setAddress] = useState("");
  const [signinResult, setSigninResult] = useState({
    type: "info",
    text: `Please fill out the forms and press the SUBMIT.`,
  });

  useEffect(() => {
    const init = async () => {
      const accounts = await Metamask.getAccounts();
      setAddress(accounts[0]);
    };
    init();
    return () => {};
  }, []);

  const submitOnClick = async () => {
    const url = "http://localhost:5000/users/signup";
    const response = await axios.post(url, inputs);
    // console.log(response.data);
    if (response.data.includes("success")) {
      setSigninResult({
        type: "success",
        text: `Account was created successfully!. Reload automatically in few seconds`,
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else if (response.data.includes("Existed")) {
      setSigninResult({
        type: "warning",
        text: "This Email is already used.",
      });
    }
  };

  const onChange = (e) => {
    setInputs(e.target.value);
    console.log(inputs);
  };

  const handleOnclick = () => {
    setInputs({
      address: address,
      nation: option,
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
        {nation.map((nation, index) => (
          <CountryType
            id={index + 1}
            key={index}
            name={nation}
            setOption={setOption}
          />
        ))}
        <button onClick={handleOnclick}>확정</button>
        <button onClick={submitOnClick}>회원가입</button>
      </div>
    </>
  );
};

export default Artist;
