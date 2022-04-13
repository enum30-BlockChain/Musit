import "./Createmain.css";

import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function Createmain() {
  return (
    <>
      <div className="createmain-page">
        <nav className="createmain-nav">
          <ul className="createmain-links">
            <li>
              <Link to="/create/musicupload">
                <i className="uil uil-headphones-alt"></i>
                <span className="createmain-link-name">Music file upload</span>
              </Link>
            </li>
            <li>
              <Link to="/create/musicuploadlist">
                <i className="uil uil-headphones-alt"></i>
                <spen className="createmain-link-name">Upload Musiclist</spen>
              </Link>
            </li>
            <li>
              <Link to="/create/nftuplaod">
                <i className="uil uil-headphones-alt"></i>
                <span className="createmain-link-name">NFT Upload</span>
              </Link>
            </li>
            <li>
              <Link to="/create/uploadnftlist">
                <i className="uil uil-headphones-alt"></i>
                <span className="createmain-link-name">Upload NFT list</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="createmain-details">
          <Outlet />
        </div>
      </div>
    </>
  );
}
