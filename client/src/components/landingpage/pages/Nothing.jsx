import React from "react";
import "./Nothing.css";

const Nothing = (props) => {
  return (
		<>
			<div className="nothing">
				<span className="nothing-ex">
          <i className="uil uil-exclamation-triangle"></i>
				</span>
				<span className="nothing-message">There is no item</span>
				{props.message}
			</div>
		</>
	);
};

export default Nothing;
