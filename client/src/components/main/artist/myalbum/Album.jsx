import "./css/Album.css";
import React, { useEffect, useState } from "react";
// import AlbumList from "./albumlist/AlbumList";
import { useSelector } from "react-redux";

const Album = ({ address }) => {
  const [nickname, setNickname] = useState("");
  const artist = useSelector((state) => state.artist);

  useEffect(() => {
    setNickname(artist.artist_name);
  }, []);

  return (
    <>
      <h1>
        아티스트가 올린 nft 등록한 음원 / NFT 조회 / 곡별 재생시간과 라이크수/
        옥션 참가 버튼이 있어 해당 버튼을 클릭하면 artistpage-auctionupload
        페이지로 이동되면서 선택한 음악의 타이틀/ 앨범커버값을 받아와 디폴트로
        노출된다
      </h1>
      <div className="Album">
        <div className="list">
          <h2>Album List</h2>
          {/* <AlbumList
            sx={{ width: "50%" }}
            address={address}
            nickname={nickname}
          /> */}
        </div>
      </div>
    </>
  );
};

export default Album;
