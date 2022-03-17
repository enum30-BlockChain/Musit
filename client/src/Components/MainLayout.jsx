import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Metamask from "../web3/metamask";
import axios from "axios";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer.jsx";

export { default as Register } from "./register/Register";
export { default as MyPageLayout } from "./myPage/MyPage";

export const MainLayout = () => {
  useEffect(() => {
    const init = async () => {
      const accounts = await Metamask.getAccounts();
      setAddress(accounts[0]);
    };
    init();
    return () => {};
  }, []);

  const [address, setAddress] = useState("");
  const [login, setLogin] = useState("");
  const [nickname, setNickname] = useState("");

  const CheckOnClick = () => {
    setLogin({
      address: address,
    });
    console.log(address);
  };

  const LoginOnClick = async () => {
    const url = "http://localhost:5000/users/signin";
    const response = await axios.post(url, login);
    // console.log(response.data);
    console.log(response.data.nickname);
    setNickname({
      nickname: response.data.nickname,
    });
  };
  return (
    <>
      <Navbar />
      <Link to="/Register">
        <button>Register</button>
      </Link>
      <Link to="/MyPageLayout">
        <button>MyPage</button>
      </Link>
      <div>
        <p>
          내지갑 주소는 : {address}
          <button onClick={CheckOnClick}>주소확인</button>
        </p>
        <div>
          <div>내 닉네임 :{nickname.nickname}</div>
          <button onClick={LoginOnClick}>내정보확인</button>
        </div>
      </div>
      <div>메인페이지입니다.</div>
      <Footer />
    </>
  );
};

export default MainLayout;
