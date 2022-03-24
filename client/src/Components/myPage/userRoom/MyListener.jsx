import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";

const MyListener = ({address}) => {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const init = async () => {
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
      <Outlet context={[address, response, setResponse]} />
    </>
  );
};

export default MyListener;
