import "./Store.css";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Error from "../../Error";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";

export const Store = () => {
  const market = useSelector((state) => state.market);
  const auction = useSelector((state) => state.auction);

  return !market || market.error || !auction || auction.error ? (
    <ErrorContent />
  ) : (
    <>
      <SuccessContent />
    </>
  );
};

const SuccessContent = () => {
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
    <section className="store">
      <nav className="top-nav">
        <ul className="nav-links">
          <li className="ordinary-market active">
            <Link to="/store">
              <i className="uil uil-shopping-cart"></i>
              <span className="link-name"> Ordinary Market</span>
            </Link>
          </li>
          <li className="auction-market">
            <Link to="/store/auction">
              <i className="uil uil-arrow-growth"></i>
              <span className="link-name"> Auction Market</span>
            </Link>
          </li>
          <li className="my-bids">
            <Link to="/store/mybids">
              <i className="uil uil-transaction"></i>
              <span className="link-name"> My Bids</span>
            </Link>
          </li>
        </ul>
      </nav>
      <section className="content-container">
        <Outlet />
      </section>
    </section>
  );
};

/* Error 화면 */
const ErrorContent = () => {
  return (
    <Error error={{ name: "Page Error", message: "Error page loading fail" }} />
  );
};
