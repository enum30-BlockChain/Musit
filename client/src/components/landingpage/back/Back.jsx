import React from "react";
import "./Back.css";

function Back() {
  return (
    <>
      <div className="header">
        <div>
          <svg
            className="waves"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shape-rendering="auto"
          >
            <defs>
              <path
                id="gentle-wave"
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              />
            </defs>
            <g className="parallax">
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="0"
                fill="rgba(255,255,255,0.7)"
              />
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="3"
                fill="rgba(255,255,255,0.5)"
              />
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="5"
                background="linear-gradient( to top, yellow, red )"
                // fill="linear-gradient( to top, yellow, red )"
                // fill="linear-gradient( to top, yellow , red  )"
                // // fill="rgba( to top, 255,255,255,0.3} 2)"

                boder-shadow=" 0 0 0 transparent, 0 0 10px #ee05f2,
                0 0 20px rgba(255, 0, 60, 0.5), 0 0 40px #ee05f2, 0 0 100px #ee05f2,
                0 0 200px #ee05f2, 0 0 300px #ee05f2, 0 0 500px #ee05f2,
                0 0 1000px #ee05f2;"
              />
              <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
            </g>
          </svg>
        </div>
      </div>
    </>
  );
}

export default Back;
