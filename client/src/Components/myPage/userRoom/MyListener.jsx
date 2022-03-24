import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import Metamask from "../../../web3/Metamask";
=======
import Metamask from "../../../web3/Matamask";
import UserList from "./page/UserList";
import UserSubscription from "./page/UserSubscription";
// import Sidebar from "./../Sidebar";
>>>>>>> min1
import axios from "axios";
import { Link, Outlet } from "react-router-dom";

const MyListener = () => {
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
    <>
      <sidebar>
        <p>
          <Link to="/MyListener/UserSubscription">
            <button>UserSubscription</button>
          </Link>
        </p>
        <p>
          <Link to="/MyListener/UserList">
            <button>UserList</button>
          </Link>
        </p>
        <p>
          <Link to="/MyListener/myplaylist">
            <button>MyPlayList</button>
          </Link>
        </p>
        <p>
          <Link to="/MyListener/totalplaylist">
            <button>TotalPlayList</button>
          </Link>
        </p>
        <p>
          <Link to="/MyListener/recentlyplayed">
            <button>RecentlyPlayed</button>
          </Link>
        </p>
      </sidebar>
<<<<<<< HEAD
      <Outlet context={[address, response, setResponse]} />
=======

      <Outlet context={[address, response, setResponse]} />
      {/* <Sidebar /> */}
      {/* <div>
        <UserSubscription
          address={address}
          response={response}
          setResponse={setResponse}
        />
        <UserList address={address} />
      </div> */}
>>>>>>> min1
    </>
  );
};

export default MyListener;
