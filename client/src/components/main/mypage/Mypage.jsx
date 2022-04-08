import "./Mypage.css";
import React from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
// import Userinformation from "./../mypage/userinformation/Userinformation";

export const Mypage = () => {
  const user = useSelector((state) => state.user);
  const artist = useSelector((state) => state.artist);

  return (
    <div className="mypage">
<<<<<<< HEAD
      <div className="user-card">
        {/* 내이미지공간 */}
        <div className="user-image">
          {/* 현재 이미지 불러오기 */}
          <img
            style={{ objectFit: "cover" }}
            src={user.img}
            alt="user profile"
          />
          {/* 버튼 클릭 클릭시 setVisible로 state 변경*/}
          {visible && (
            <div>
              <button onClick={Submit}>올리기</button>
              <input
                type="file"
                name="imgUpload"
                accept="image/*"
                onChange={getImg}
              ></input>
              {albumCoverImgFile && (
                <img style={{ width: "100px" }} src={albumCoverImgFile}></img>
              )}
            </div>
          )}
        </div>
        <div className="user-info">
          <h2 className="nickname">Nickname</h2>
          {user.nickname}
          {visible && (
            <div>
              <input
                type="text"
                defaultValue={user.nickname}
                onChange={idonchange}
              ></input>
            </div>
          )}
          <h2 className="address">Address</h2>
          <span>{address}</span>
          <h2 className="subscription">Subscription</h2>
          <span>{user.subscription}월이용권 </span>
          <h2 className="Genre">Genre</h2>
          <span>{user.genre}</span>
          {visible && (
            <div>
              {genre.map((MusicType, index) => {
                return (
                  <>
                    <label>
                      {MusicType}
                      <input
                        type={"checkbox"}
                        name={"MusicType"}
                        value={MusicType}
                        onChange={(e) => {
                          changeHandler(e.currentTarget.checked, MusicType);
                        }}
                        checked={
                          checkedInputs.includes(MusicType) ? true : false
                        }
                      />
                    </label>
                  </>
                );
              })}
            </div>
          )}
        </div>
        {/* 셋팅 버튼을 눌렀을때 user에대한 새팅을 할수 있는 렌더 내용이 나와야된다. */}
        <div className="setting-btn">
          <button
            className="uil uil-setting"
            onClick={async () => {
              setVisible(!visible);
              await NickNameOnClick();
            }}
          ></button>
        </div>
      </div>

=======
>>>>>>> main
      <nav className="user-nav">
        <ul className="nav-links">
          <li>
            <Link to="/mypage/userinformation">
              <i className="uil uil-user"></i>
              <span className="link-name"> User Information</span>
            </Link>
          </li>
          <li>
            <Link to="/mypage/favorite">
              <i className="uil uil-favorite"></i>
              <span className="link-name"> Favorite</span>
            </Link>
          </li>
          <li>
            <Link to="/mypage/playlist">
              <i className="uil uil-play"></i>
              <span className="link-name"> Playlist</span>
            </Link>
          </li>
          <li>
            <Link to="/mypage/collection">
              <i className="uil uil-layers"></i>
              <span className="link-name"> Collection</span>
            </Link>
          </li>
          <li>
            <Link to="/mypage/history">
              <i className="uil uil-history"></i>
              <span className="link-name"> History</span>
            </Link>
          </li>
          <li>
            <Link to="/mypage/subscription">
              <i className="uil uil-bitcoin-sign"></i>
              <span className="link-name"> Subscription</span>
            </Link>
          </li>

          {artist.artist_name === undefined ? (
            <li>
              <Link to="/mypage/artistsubmit">
                <i className="uil uil-music"></i>
                <span className="link-name"> Arstis Submit</span>
              </Link>
            </li>
          ) : (
            <></>
          )}
        </ul>
      </nav>
      <div className="detail">
        <Outlet />
      </div>
    </div>
  );
};
