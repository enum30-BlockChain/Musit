//CSS
import "./Main.css";

//REACT FUCNTION , REDUX , ETC
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./dashboard/Dashboard";
import { Searchbar } from "./searchbar/Searchbar";
import { Mypage } from "./mypage/Mypage";
import Userinformation from "./mypage/userinformation/Userinformation";

export const Main = () => {
  useEffect(() => {
    sidebarToggle();
  }, [])

  const sidebarToggle = () => {
    const sidebarToggle = document.querySelector(".sidebar-toggle");
    const sidebar = document.querySelector("nav");

    let getMenuStatus = localStorage.getItem("menu_status");
    if (getMenuStatus && getMenuStatus === "close") {
      sidebar.classList.toggle("close");
    }

    sidebarToggle.addEventListener("click", () => {
      sidebar.classList.toggle("close");
      if (sidebar.classList.contains("close")) {
        localStorage.setItem("menu_status", "close");
      } else {
        localStorage.setItem("menu_status", "open");
      }
    });
  }

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
      </div>
    </section>
  );
};
