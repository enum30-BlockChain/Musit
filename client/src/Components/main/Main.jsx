import React, { useEffect } from "react";
import { Searchbar } from "./searchbar/Searchbar";
import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./dashboard/Dashboard";
import "./Main.css";
import { Cardslider } from "../cardslider/Cardslider";

export const Main = () => {
	useEffect(() => {
		const sidebarToggle = document.querySelector(".sidebar-toggle");
		const sidebar = document.querySelector("nav");

		let getMenuStatus = localStorage.getItem("menu_status");
		if (getMenuStatus && getMenuStatus === "close") {
			sidebar.classList.toggle("close");
		}

		sidebarToggle.addEventListener("click", () => {
			sidebar.classList.toggle("close");
			if (sidebar.classList.contains("close")) {
				localStorage.setItem("menu_status", "close");
			} else {
				localStorage.setItem("menu_status", "open");
			}
		});
	}, []);

	return (
		<section className="main">
			<Searchbar />
			<Routes>
				<Route path="/">
					<Route index element={<Dashboard />} />
					<Route path="dashboard" element={<Dashboard />} />
					<Route path="content" element={<Cardslider />} />
				</Route>
			</Routes>
		</section>
	);
};
