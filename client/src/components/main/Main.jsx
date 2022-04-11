//CSS
import "./Main.css";

//REACT FUCNTION , REDUX , ETC
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./dashboard/Dashboard";
import { Searchbar } from "./searchbar/Searchbar";
import { Mypage } from "./mypage/Mypage";
import Userinformation from "./mypage/userinformation/Userinformation";
import {  useSelector } from "react-redux";
import { Playbar } from "./playbar/Playbar";

export const Main = () => {
  const user = useSelector((state) => state.user);

  return (
    <section className="main">
      <Searchbar />
      <div className="main-content">
        <Routes>
          <Route path="/">
            <Route index element={<Dashboard />} />
            <Route path="mypage" element={<Mypage path="userinformation" />}>
              <Route path="userinformation" element={<Userinformation />} />
            </Route>
          </Route>
        </Routes>
        {user.loading === true ? <></> : <Playbar />}
      </div>
    </section>
  );
};
