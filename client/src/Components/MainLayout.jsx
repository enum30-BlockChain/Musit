import React from "react";
import { Link } from "react-router-dom";
import Footer from "./footer/Footer.jsx";
import Hoveringcard from "./hoveringcard/Hoveringcard.jsx";

export { default as Register } from "./register/Register";
export { default as MyPageLayout } from "./myPage/MyPage";

export const MainLayout = () => {
  return (
    <>
      <Link to="/Register">
        <button>Register</button>
      </Link>
      <Link to="/MyPageLayout">
        <button>MyPage</button>
      </Link>
      <div>메인페이지입니다.</div>
      <Hoveringcard></Hoveringcard>
      <Footer />
    </>
  );
};

export default MainLayout;
