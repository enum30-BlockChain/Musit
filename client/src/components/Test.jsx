import React, { useEffect, useState } from "react";
import axios from "axios";
import Error from "./Error";

export const Test = () => {
  const [err, setErr] = useState(null);
  useEffect(async () => {
    try {
      await axios.post("localhostasdfasdf");
    } catch (error) {
      // console.log(error.state);
      setErr(error);
    }
  }, []);
  return <div>{err && <Error error={err} />}</div>;
};
