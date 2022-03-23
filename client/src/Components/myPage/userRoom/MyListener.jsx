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
          <Link to="/MyListener/UserSubscription">UserSubscription</Link>
        </p>
        <p>
          <Link to="/MyListener/UserList">UserList</Link>
        </p>
        <p>
          <Link to="/MyListener/myplaylist">MyPlayList</Link>
        </p>
      </sidebar>
      <Outlet context={[address, response, setResponse]} />
    </>
  );
};

export default MyListener;
