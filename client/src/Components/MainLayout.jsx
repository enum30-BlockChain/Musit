import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
<<<<<<< HEAD
import Metamask from "../web3/metamask";
import axios from "axios";
=======
import Navbar from "./navBar/Navbar.jsx";
import Footer from "./footer/Footer.jsx";
>>>>>>> fac8408e8471a46dbdd4cd42aa96f63335c23581

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
      <Navbar />
      <Link to="/Register">
        <button>Register</button>
      </Link>
      <Link to="/MyPageLayout">
        <button>MyPage</button>
      </Link>
      <div>내지갑 주소는 : {address}</div>
      <button onClick={LoginOnClick}>내정보확인</button>
      <div>메인페이지입니다.</div>
      <Footer />
    </>
  );
};

export default MainLayout;
