import React from "react";
import { Link } from "react-router-dom";
const MyPage = () => {
  return (
    <>
      <Link to="/MyListener">
        <button>청취자 페이지</button>
      </Link>
      <Link to="/MyArtist">
        <button>아티스트 페이지</button>
      </Link>
    </>
  );
};

export default MyPage;
