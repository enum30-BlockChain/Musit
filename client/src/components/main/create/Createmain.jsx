import "./Createmain.css";

import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

export default function Createmain() {
  useEffect(() => {
    topNavToggle();
  }, []);

  const topNavToggle = () => {
    const links = document.querySelectorAll(".top-nav .nav-links li");
    links.forEach((link) => {
      link.addEventListener("click", () => {
        links.forEach((link) => {
          link.classList.remove("active");
        });
        link.classList.add("active");
      });
    });
  };

  return (
    <>
      <div className="createmain-page">
        <Outlet />
      </div>
    </>
  );
}
