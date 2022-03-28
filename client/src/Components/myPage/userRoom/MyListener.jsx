import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";

const MyListener = ({ address }) => {
  const [response, setResponse] = useState("");
  const [song, setSong] = useState();

  useEffect(() => {
    const init = async () => {
      const url = "http://localhost:5000/users/signin";
      const response = await axios.post(url, { address });
      setResponse(response.data);
    };
    init();
    return () => {};
  }, [address]);

  const MusicOnClick = () => {
    const url = "http://localhost:5000/users/played";
    const response = axios.post(url, { address }).then((res) => {
      setSong(res.data);
    });
  };

  console.log(song);
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
            <button onClick={MusicOnClick}>recentlyplayed</button>
          </Link>
        </p>
      </sidebar>
      <Outlet context={[address, response, setResponse, song]} />
    </>
  );
};

export default MyListener;
