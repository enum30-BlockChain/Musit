import React, { useEffect, useState } from "react";
import Metamask from "./../../web3/Matamask";
import axios from "axios";
import UserState from "./userRoom/page/UserSubscription";
import "./Sidebar.scss";

const Sidebar = () => {
  const [address, setAddress] = useState("");
  const [response, setResponse] = useState("");

  useEffect(() => {
    const init = async () => {
      const metamaskResponse = await Metamask.getAccounts();
      setAddress(metamaskResponse.data[0]);
      const url = "http://localhost:5000/users/signin";
      const response = await axios.post(url, { address });
      setResponse(response.data);
    };
    init();
    return () => {};
  }, [address]);

  return (
    <div className="sidenav">
      <div className="user">
        <span className="user-state"></span>
        <div>나의 주소는 : {address}</div>
        <UserState
          address={address}
          response={response}
          setResponse={setResponse}
        />
      </div>
      <div className="side-menu">
        {/* -----------------아티스트 노출------------------ */}
        <ul>
          <li>
            {/* 파일 업로드 */}
            <span>Music Upload</span>
          </li>
        </ul>
        <ul>
          <li>
            {/* 옥션참가 */}
            <span>Put up for Auction</span>
          </li>
        </ul>
        <ul>
          <li>
            {/* 수익 확인 */}
            <span>Income</span>
          </li>
        </ul>
        {/* -----------------일반유저 노출------------------ */}
        <ul>
          <li>
            <span>My play List</span>
          </li>
          <li>
            <span>Recently Played</span>
          </li>
          <li>
            <span>My Favorite</span>
          </li>
          <li>
            <span>회원 정보수정</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
