import React from "react";
import { Link } from "react-router-dom";

export const LegisterLayout = () => {
  return (
    <>
      <Link to="/Legister">
        <button>Legister</button>
      </Link>
      <div>메인페이지입니다.</div>
    </>
  );
};

export default LegisterLayout;
