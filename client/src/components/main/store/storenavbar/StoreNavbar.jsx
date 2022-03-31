import "./StoreNavbar.css"
import React from 'react'
import { Outlet } from 'react-router'
import { Link } from 'react-router-dom'
const StoreNavbar = () => {
  return (
    <>
      <nav className="store-nav">
        <ul className="nav-links">
          <li>
            <Link to="/store/mynfts">
              <i class="uil uil-headphones"></i>
              <span className="link-name"> MyNFTs</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="detail">
        <Outlet />
      </div>
    </>
  )
}

export default StoreNavbar