import React, { useEffect, useState } from "react";
import "./Searchbar.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { connectMetamask } from "../../../redux/actions/metamaskActions";
import { searchingReducer } from "../../../redux/actions/searchingAction";
import { Drawer } from "@mui/material";
import UserDrawer from "./userdrawer/UserDrawer";

export const Searchbar = () => {
  const [searching, setseraching] = useState("");
  const metamask = useSelector((state) => state.metamask);
  const navigate = useNavigate(); //페이지이동하면서 정보담아서 옮길수있따
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const connectOnclick = () => {
    dispatch(connectMetamask());
  };

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
  const getsSearchWord = (e) => {
    dispatch(searchingReducer(e.target.value));
    setseraching(e.target.value);
  };
  //////////////////////////////////////////////////////

  return (
    <>
      <div className="searchbar">
        <i className="uil uil-bars sidebar-toggle"></i>
        <div className="search-box">
          <i className="uil uil-search"></i>
          <input
            type="text"
            placeholder="Search here..."
            onKeyPress={changehandler}
            onChange={getsSearchWord}
          />
        </div>

        <div className="searchbar-right-box">
          {sliceAddress ? (
            <div
              className="user-info"
              onClick={() => {
                setOpen(true);
              }}
            >
              <div className="profile"></div>
              <div className="address">
                <p>{sliceAddress}</p>
              </div>
            </div>
          ) : (
            <Button
              variant="contained"
              sx={{
                color: "var(--black-light-color)",
                backgroundColor: "var(--box1-color)",
                ":hover": {
                  background: "var(--primary-color)",
                  color: "var(--text-color)",
                },
              }}
              onClick={connectOnclick}
            >
              Connect
            </Button>
          )}
        </div>
        <Drawer
          anchor="right"
          open={open}
          onClose={() => {
            setOpen(false);
          }}
          onOpen={() => {
            setOpen(true);
          }}
          PaperProps={{ style: { backgroundColor: "rgba(225,225,225,0.8)" } }}
        >
          <UserDrawer />
        </Drawer>
      </div>
    </>
  );
};
