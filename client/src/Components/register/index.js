import React from "react";
import { Link } from "react-router-dom";

const Legister = () => {
  return (
    <div>
      <Link to="/Lisener">
        <button>청취자 가입</button>
      </Link>
      <Link to="/Artist">
        <button>아티스트 가입</button>
      </Link>
    </div>
  );
};

export default Legister;
