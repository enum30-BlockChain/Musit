import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";

const MyListener = ({ address }) => {
  const [response, setResponse] = useState("");
  const [song, setSong] = useState();
  const [nickname, setNickname] = useState("");

  //내가 바꾸고 싶은 닉네임 선택
  const [select, setSelect] = useState("");

  //and 연산자를 사용하기위한 useState input을 숨기기위한 조건문
  const [visible, setVisible] = useState(false);

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

  const IdOnChange = (e) => {
    setSelect(e.target.value);
    console.log(e.target.value);
  };

  const NickNameOnClick = () => {
    const url = "http://localhost:5000/users/change";
    const response = axios.post(url, { address, select }).then((res) => {
      console.log(res.data);
    });
  };

  return (
    <>
      <sidebar>
        <div>
          내사진
          <img src={response.img} style={{ width: "100" }} />
        </div>

        <div>
          나의 닉네임 : {response.nickname}
          {/* 버튼 클릭 클릭시 setVisible로 state 변경*/}
          <button
            onClick={() => {
              NickNameOnClick();
              setVisible(!visible);
            }}
          >
            {/* visible 취소나 닉네임에 따라 true false */}
            {visible ? "변경완료" : "닉네임변경"}
          </button>
          {visible && (
            <div>
              <input type="text" onChange={IdOnChange}></input>
            </div>
          )}
        </div>

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
