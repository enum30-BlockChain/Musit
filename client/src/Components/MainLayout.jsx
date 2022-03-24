import React, { useState } from "react";
import { Link } from "react-router-dom";
import Metamask from "../web3/Metamask";
import axios from "axios";
import Hoveringcard from "./hoverCard/Hoveringcard";

export const MainLayout = ({ address, setAddress }) => {
  const [nickname, setNickname] = useState("");

  const LoginOnClick = async () => {
    const url = "http://localhost:5000/users/signin";
    const response = await axios.post(url, { address });
    // console.log(response.data);
    setNickname({
      nickname: response.data.nickname,
    });
  };

  const connectOnClick = async () => {
    const { data } = await Metamask.connectWallet();
    setAddress(data[0]);
  };

  return (
    <>
      <Link to="/Register">
        <button>Register</button>
      </Link>
      <div>메인페이지입니다.</div>
      {/* <FileUpload /> */}
      <Hoveringcard />
    </>
  );
};

export default MainLayout;
