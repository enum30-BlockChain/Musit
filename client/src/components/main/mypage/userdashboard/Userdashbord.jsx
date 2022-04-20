import React from "react";
import "../../artist/artistdashbord/dashbordcontent/Contentbox.css";
import Userinformation from "./../../mypage/userinformation/Userinformation";

const Userdashbord = () => {
  return (
    <>
      <Userinformation />
      <div className="contentbox">
        <div className="title">
          <i className="uil uil-create-dashboard"></i>
          <span className="text">Artist Dashboard</span>
        </div>
        <div className="boxes">
          <div className="box box1">
            {/* 아티스트가 받은 음악 좋아요 갯수 */}
            <i className="uil uil-thumbs-up"></i>
            <span className="text">Total Music Likes</span>
            <span className="number">10</span>
          </div>
          <div className="box box1">
            {/* 아티스트가 받은 좋아요 갯수 */}
            <i className="uil uil-heart"></i>
            <span className="text">Total Artist Likes</span>
            <span className="number">10</span>
          </div>
          <div className="box box1">
            {/* 아티스트 수입  */}
            <i className="uil uil-bill"></i>
            <span className="text">Income</span>
            <span className="number">3023</span>
          </div>
        </div>
        <div className="boxes">
          <div className="box box1">
            {/* 음악 재생한 시간  */}
            <i className="uil uil-hourglass"></i>
            <span className="text">Total Music Played Time</span>
            <span className="number">10</span>
          </div>
          <div className="box box1">
            {/* 내가  재생한 ㅇ */}
            <i className="uil uil-headphones-alt"></i>
            <span className="text">Total Music Likes</span>
            <span className="number">10</span>
          </div>
          <div className="box box1">
            {/* 내가 업로드한 파일 갯수 */}
            <i className="uil uil-file-upload"></i>
            <span className="text">Music Upload count</span>
            <span className="number">1</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Userdashbord;
