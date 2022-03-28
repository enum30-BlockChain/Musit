import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import "./Navbar.css"

export const Navbar = () => {
  
  useEffect(() => {
    const body = document.querySelector("body");
    const modeToggle = document.querySelector(".mode-toggle");
    
    let getDarkMode = localStorage.getItem("dark_mode");
    if (getDarkMode && getDarkMode === "on") {
      body.classList.toggle("dark");
    }
  
    modeToggle.addEventListener("click", () => {
      body.classList.toggle("dark")
      if(body.classList.contains("dark")) {
        localStorage.setItem("dark_mode", "on")
      } else {
        localStorage.setItem("dark_mode", "off")
      }
    })
  }, [])
  return (
		<nav className="side-nav">
			<Link to={"/"}>
				<div className="logo-name-container">
					<div className="logo-image">
						<img src="images/Musit_logo.png" alt="logo" />
					</div>

					<span className="logo-name nav-links">MUSIT</span>
				</div>
			</Link>

			<div className="menu-items">
				<ul className="nav-links">
					<li>
						<Link to="/mypage">
							<i class="uil uil-create-dashboard"></i>
							<span className="link-name">MYPAGE</span>
						</Link>
					</li>
					<li>
						<Link to="/music">
							<i class="uil uil-music"></i>
							<span className="link-name">MUSIC</span>
						</Link>
					</li>
					<li>
						<Link to="/store">
							<i class="uil uil-store"></i>
							<span className="link-name">STORE</span>
						</Link>
					</li>
					<li>
						<Link to="/auction">
							<i class="uil uil-arrow-growth"></i>
							<span className="link-name">AUCTION</span>
						</Link>
					</li>
					<li>
						<Link to="/artist">
							<i class="uil uil-palette"></i>
							<span className="link-name">ARTIST</span>
						</Link>
					</li>
				</ul>

				<ul className="logout-mode">
					<li>
						<Link to="#">
							<i class="uil uil-signout"></i>
							<span className="link-name">Logout</span>
						</Link>
					</li>

					<li className="mode">
						<Link to="#">
							<i class="uil uil-moon"></i>
							<span className="link-name">Dark Mode</span>
						</Link>
						<div className="mode-toggle">
							<span className="switch"></span>
						</div>
					</li>
				</ul>
			</div>
		</nav>
	);
}