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
        <nav className="top-nav">
          <ul className="nav-links">
            <li>
              <Link to="/create/">
                <i className="uil uil-headphones-alt"></i>
                <span className="link-name">Music file upload</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="nav-details">
          <Outlet />
        </div>
      </div>
    </>
  );
}
