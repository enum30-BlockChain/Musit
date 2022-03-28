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
		<nav className='side-nav'>
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
						<Link to="/dashboard">
            <i class="uil uil-create-dashboard"></i>
							<span className="link-name">Dashboard</span>
						</Link>
					</li>
					<li>
						<Link to="/content">
							<i class="uil uil-files-landscapes"></i>
							<span className="link-name">Content</span>
						</Link>
					</li>
					<li>
						<Link to="#">
							<i class="uil uil-chart"></i>
							<span className="link-name">Analystics</span>
						</Link>
					</li>
					<li>
						<Link to="#">
							<i class="uil uil-thumbs-up"></i>
							<span className="link-name">Like</span>
						</Link>
					</li>
					<li>
						<Link to="#">
							<i class="uil uil-comment-dots"></i>
							<span className="link-name">Comments</span>
						</Link>
					</li>
					<li>
						<Link to="#">
							<i class="uil uil-share"></i>
							<span className="link-name">Share</span>
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
