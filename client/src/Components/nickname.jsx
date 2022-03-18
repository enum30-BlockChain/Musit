import React from "react";

const Nickname = ({ id, name, LoginOnClick }) => {
  return (
    <div>
      <div name="nickname" value={id - 1}>
        내 닉네임 : <button onClick={LoginOnClick}>내정보확인</button>
      </div>
    </div>
  );
};

export default Nickname;
