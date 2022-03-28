import "./Mypage.css"
import React from 'react'
import { Link } from "react-router-dom";


export const Mypage = () => {
  //TODO: user info(address, nickname, myfavorite, ...),  
  return (
		<div className="mypage">
			<div className="user-card">
				<div className="user-image">
					<img src="/images/profile.jpg" alt="user profile" />
				</div>
				<div className="user-info">
					<span className="nickname">nickname</span>
					<span className="address">0x123u1298398ausdfoj</span>
					<span className="subscription">1 month</span>
          <i class="uil uil-setting"></i>
				</div>
			</div>
			
			<nav className="user-nav">
				<ul className="nav-links">
					<li>
						<Link to="/favorite">
              <i class="uil uil-favorite"></i>
							<span className="link-name"> Favorite</span>
						</Link>
					</li>
					<li>
						<Link to="/playlist">
              <i class="uil uil-play"></i>
							<span className="link-name"> Playlist</span>
						</Link>
					</li>
					<li>
						<Link to="/collection">
              <i class="uil uil-layers"></i>
							<span className="link-name"> Collection</span>
						</Link>
					</li>
					<li>
						<Link to="/history">
              <i class="uil uil-history"></i>
							<span className="link-name"> History</span>
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
}
