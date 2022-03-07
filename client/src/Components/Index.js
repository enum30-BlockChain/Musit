import React from "react";
import { Link } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Lisener from "./register/user/Lisener";
import Artist from "./register/user/Artist";

export const LegisterLayout = () => {
  return (
    <>
      <Link to="/Legister">
        <button>Legister</button>
      </Link>
      <div>메인페이지입니다.</div>
      <Routes>
        <Route path="Lisener" element={<Lisener />}></Route>
        <Route path="Artist" element={<Artist />}></Route>
      </Routes>
    </>
  );
};

export default LegisterLayout;
