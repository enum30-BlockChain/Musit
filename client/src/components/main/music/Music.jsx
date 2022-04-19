import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

export default function Music() {
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
      <div className="musicpage">
        <nav className="top-nav">
          <ul className="nav-links">
            <li>
              <Link to="/music/enummusic">
                <i className="uil uil-favorite"></i>
                <span className="link-name"> Enum30 x Music</span>
              </Link>
            </li>
            <li>
              <Link to="/music/ranking">
                <i className="uil uil-favorite"></i>
                <span className="link-name"> Ranking</span>
              </Link>
            </li>
            <li>
              <Link to="/music/genre">
                <i className="uil uil-play"></i>
                <span className="link-name"> Recommend</span>
              </Link>
            </li>
          </ul>
        </nav>
        
        <section className="details">
          <Outlet />
        </section>
      </div>
    </>
  );
}
