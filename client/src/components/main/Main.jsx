//CSS
import "./Main.css";

import Userinformation from "./mypage/userinformation/Userinformation";
import { Subscription } from "./mypage/subscription/Subscription";
import { History } from "./mypage/history/History";
import { Mypage } from "./mypage/Mypage";
import { Collection } from "./mypage/collection/Collection";
import { Favorite } from "./mypage/favorite/Favorite";

import { Dashboard } from "./dashboard/Dashboard";
import { Searchbar } from "./searchbar/Searchbar";

//REACT FUCNTION , REDUX , ETC
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

export const Main = () => {
  return (
    <section className="main">
      <Searchbar />
      <div className="main-content">
        <Routes>
          <Route path="/">
            <Route index element={<Dashboard />} />
            <Route path="mypage" element={<Mypage path="userinformation" />}>
              <Route path="userinformation" element={<Userinformation />} />
              <Route path="subscription" element={<Subscription />} />
              <Route path="history" element={<History />} />
              <Route path="collection" element={<Collection />} />
              <Route path="favorite" element={<Favorite />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </section>
  );
};
