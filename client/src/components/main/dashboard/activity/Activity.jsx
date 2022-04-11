import React from 'react'
import "./Activity.css"

export const Activity = () => {
  return (
		<div className="activity">
			<div className="title">
				<i className="uil uil-history"></i>
				<span className="text">Recent Activity</span>
			</div>

			<div className="activity-data">
				<div className="data names">
					<span className="data-title">Name</span>
					<span className="data-list">List</span>
					<span className="data-list">List</span>
					<span className="data-list">List</span>
					<span className="data-list">List</span>
				</div>
				<div className="data email">
					<span className="data-title">Email</span>
					<span className="data-list">enum30@gmail.com</span>
					<span className="data-list">enum30@gmail.com</span>
					<span className="data-list">enum30@gmail.com</span>
					<span className="data-list">enum30@gmail.com</span>
				</div>
				<div className="data joined">
					<span className="data-title">Joined</span>
					<span className="data-list">2022-03-26</span>
					<span className="data-list">2022-03-26</span>
					<span className="data-list">2022-03-26</span>
					<span className="data-list">2022-03-26</span>
				</div>
				<div className="data type">
					<span className="data-title">Type</span>
					<span className="data-list">New</span>
					<span className="data-list">New</span>
					<span className="data-list">New</span>
					<span className="data-list">New</span>
				</div>
				<div className="data status">
					<span className="data-title">Status</span>
					<span className="data-list">Liked</span>
					<span className="data-list">Liked</span>
					<span className="data-list">Liked</span>
					<span className="data-list">Liked</span>
				</div>
			</div>
		</div>
	);
}
