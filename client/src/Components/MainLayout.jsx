import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Metamask from "../web3/metamask";
import axios from "axios";

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

  const LoginOnClick = async () => {
    const url = "http://localhost:5000/users/find";
    const response = await axios.post(url, login);
    console.log(response.data);
  };

  return (
    <>
      <Link to="/Register">
        <button>Register</button>
      </Link>
      <Link to="/MyPageLayout">
        <button>MyPage</button>
      </Link>
      <div>내지갑 주소는 : {address}</div>
      <button onClick={LoginOnClick}>내정보확인</button>
      <div>메인페이지입니다.</div>
    </>
  );
};

export default MainLayout;
