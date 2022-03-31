import React, { useEffect, useState } from "react";
import "./Searchbar.css";
import Button from "@mui/material/Button";
import Metamask from "../../../web3/Metamask";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {Provider, useSelector, useDispatch} from 'react-redux';

export const Searchbar = ({ address }) => {
  const [guest, setGuest] = useState("");
  const [searching, setseraching] = useState("");
  const navigate = useNavigate();           //페이지이동하면서 정보담아서 옮길수있따
  const dispatch = useDispatch();                               //redux 초기값 넣어주자
  
  useEffect(() => {
    user();
  }, [address]);
  //[] 변하면 다시한번더 렌더링한다. uesEffect안의 함수 재실행

  async function user() {
    const url = "http://localhost:5000/users/" + address;
    const response = await axios.get(url);
    setGuest(response.data);
    return response.data;
  }

  const connectOnclick = () => {
    Metamask.connectWallet();
  };

  const changehandler= (e)=>{
    if(e.key == 'Enter') {
      navigate(
        '/search',
        {state :searching}
      )
    }
  }
  const getsSearchWord = (e)=>{
    dispatch({type:'SEARCHING', payload:e.target.value});
    setseraching(e.target.value)

  }

  return (
    <div className="searchbar">
      <i className="uil uil-bars sidebar-toggle"  ></i>
      <div className="search-box">
        <i className="uil uil-search"></i>
        <input type="text" placeholder="Search here..." onKeyPress={changehandler} onChange={getsSearchWord}/>
      </div>

      <div className="user-info">
        <div className="profile">
          <p>
            <Link to="">
              <img src={guest.img} style={{ width: "100" }} />
            </Link>
          </p>
          <p>{guest.nickname}</p>
        </div>
        {address ? (
          address
        ) : (
          <Button
            variant="contained"
            sx={{
              color: "var(--black-light-color)",
              backgroundColor: "var(--box1-color)",
            }}
            onClick={connectOnclick}
          >
            CONNECT
          </Button>
        )}
      </div>
    </div>
  );
};
