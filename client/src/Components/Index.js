import React from "react";
import { Link } from "react-router-dom";
import Hoveringcard from "./contents/Hoveringcard";
import Signup from "./register/signup";

export { default as Lisener } from "./register/user/Lisener";
export { default as Artist } from "./register/user/Artist";

export const LegisterLayout = () => {
  return (
    <>
      <></>
      <Link to="/Legister">
        <button>Legister</button>
      </Link>
      <div>메인페이지입니다.</div>
      <Hoveringcard></Hoveringcard>
      <Signup></Signup>
    </>
  );
};

export default LegisterLayout;
