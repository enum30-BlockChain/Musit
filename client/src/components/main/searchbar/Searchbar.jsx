import React, { useEffect, useState } from "react";
import "./Searchbar.css";
import Button from "@mui/material/Button";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Provider, useSelector, useDispatch } from "react-redux";
import { readMetamaskData } from "../../../redux/actions/metamaskAction";

export const Searchbar = () => {
  const navigate = useNavigate(); //페이지이동하면서 정보담아서 옮길수있따
  const dispatch = useDispatch();

  const metamask = useSelector((state) => state.metamask);

  useEffect(() => {
    dispatch(readMetamaskData());
  }, []);

  const connectOnclick = () => {};

  //[] 변하면 다시한번더 렌더링한다. uesEffect안의 함수 재실행

  const sliceAddress =
    metamask.accounts[0] &&
    metamask.accounts[0].substr(0, 5) +
      "..." +
      metamask.accounts[0].substr(metamask.accounts[0].length - 4, 4);

  const changehandler = (e) => {
    if (e.key == "Enter") {
      navigate("/search", { state: searching });
    }
  };
  //////////////////////////////////////////////////////

  return (
    <div className="searchbar">
      <i className="uil uil-bars sidebar-toggle"></i>
      <div className="search-box">
        <i className="uil uil-search"></i>
        <input
          type="text"
          placeholder="Search here..."
          onKeyPress={changehandler}
        />
      </div>

      <div className="user-info">
        <div className="searchbar-address">
          {sliceAddress ? (
            <>
              <div className="profile">
                <Link to=""></Link>
              </div>
              <div className="searchbar-nick"></div>
              <p>{sliceAddress}</p>
            </>
          ) : (
            <Button
              variant="contained"
              sx={{
                color: "var(--black-light-color)",
                backgroundColor: "var(--box1-color)",
              }}
              onClick={connectOnclick}
            >
              Connect
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
