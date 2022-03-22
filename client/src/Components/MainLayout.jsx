import React, { useState } from "react";
import { Link } from "react-router-dom";
import Metamask from "../web3/Matamask";
import axios from "axios";
import Button from "./styledComponents/Button.styled";
import Hoveringcard from "./contents/Hoveringcard";
// import FileUpload from "./fileupload/FileUpload";

export const MainLayout = ({ address, setAddress }) => {
  const [nickname, setNickname] = useState("");

  const LoginOnClick = async () => {
    const url = "http://localhost:5000/users/signin";
    const response = await axios.post(url, { address });
    // console.log(response.data);
    console.log(response.data);
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
      <Link to="/MyPageLayout">
        <button>MyPage</button>
      </Link>
      <div>
        {address ? (
          <p>내지갑 주소는 : {address}</p>
        ) : (
          <Button onClick={connectOnClick}>Connect</Button>
        )}
        <div>
          <div>내 닉네임 :{nickname.nickname}</div>
          <button onClick={LoginOnClick}>내정보확인</button>
        </div>
      </div>
      <div>메인페이지입니다.</div>
      {/* <FileUpload /> */}
      <Hoveringcard />
    </>
  );
};

export default MainLayout;
