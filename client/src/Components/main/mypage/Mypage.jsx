import "./Mypage.css";
import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

export const Mypage = ({address}) => {
	//TODO: user info(address, nickname, myfavorite, ...),
	useEffect(() => {
		const links = document.querySelectorAll(".user-nav .nav-links li");
		links.forEach((link) => {
			link.addEventListener("click", () => {
				// 이전에 active 된 메뉴 삭제
				links.forEach((link) => {
					link.classList.remove("active");
				});
				// 지금 클릭한 메뉴 active
				link.classList.add("active");
			});
		});
	}, []);

	function navlinkOnClick(e) {
		console.log(e.target);
	}

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
				<ul className="nav-links" onClick={navlinkOnClick}>
					<li>
						<Link to="/mypage/favorite">
							<i class="uil uil-favorite"></i>
							<span className="link-name"> Favorite</span>
						</Link>
					</li>
					<li>
						<Link to="/mypage/playlist">
							<i class="uil uil-play"></i>
							<span className="link-name"> Playlist</span>
						</Link>
					</li>
					<li>
						<Link to="/mypage/collection">
							<i class="uil uil-layers"></i>
							<span className="link-name"> Collection</span>
						</Link>
					</li>
					<li>
						<Link to="/mypage/history">
							<i class="uil uil-history"></i>
							<span className="link-name"> History</span>
						</Link>
					</li>
				</ul>
			</nav>
			<div className="detail">
				<Outlet />
			</div>
		</div>
	);
};
