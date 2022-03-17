import React from "react";
import UserState from "./UserState";

const MyListener = () => {
  return (
    <>
      <UserState />
      <div>총 재생시간</div>
      <div>청취 곡수</div>
      <div>Recently played</div>
      <div>My favorite</div>
      <div>나의 재생목록</div>
    </>
  );
};

export default MyListener;
