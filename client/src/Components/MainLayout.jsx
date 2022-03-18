import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Metamask from "../web3/metamask";
import axios from "axios";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer.jsx";

export { default as Register } from "./register/Register";
export { default as MyPageLayout } from "./myPage/MyPage";

export const MainLayout = () => {
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

  const LoginOnClick = async () => {
    const url = "http://localhost:5000/users/signin";
    const response = await axios.post(url, { address });
    // console.log(response.data);
    console.log(response.data.nickname);
    setNickname({
      nickname: response.data.nickname,
    });
  };
  console.log(nickname);
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
        <p>내지갑 주소는 : {address}</p>
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
