import { Button, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { readMusicData } from "../../../../redux/actions/musicActions";
import {
  readMyNFTList,
  selectedMusitNFT,
} from "../../../../redux/actions/contractActions";
import Ethers from "../../../../web3/Ethers";

import "./Enroll.css";
import Error from "../../../Error";
import SimpleBackdrop from "../../../SimpleBackdrop";

const Enroll = () => {
  let { tokenId } = useParams();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const musicData = useSelector((state) => state.music);
  const musitNFT = useSelector((state) => state.ownedMusitNFT);
  const selectedNFT = useSelector((state) => state.selectedMusitNFT);

  useEffect(() => {
    const init = async () => {
      if (userData.address) {
        await dispatch(readMyNFTList());
      }
    }
    init()
  }, [userData.loading]);

  useEffect( () => {
    const init = async () => {
      if (musitNFT.data && musitNFT.data.length > 0) {
        const thisNFT = await musitNFT.data.filter(
          (nft) => parseInt(nft.tokenId) === parseInt(tokenId)
        )[0];
        await dispatch(selectedMusitNFT(thisNFT));
        await dispatch(readMusicData(thisNFT.ipfs_hash));
      }
      // return async () => {
      // 	await dispatch(removeSelectedMusitNFT())
      // }
    }
    init()
  }, [musitNFT.loading]);

  return (musicData && musicData.loading) || (musitNFT && musitNFT.loading) ? (
    <LoadingContent />
  ) : !musitNFT || musitNFT.error ? (
    <ErrorContent />
  ) : (
    <>
      <SuccessContent nftData={selectedNFT} />
    </>
  );
};

/* 페이지 로딩 Success 화면 */
const SuccessContent = ({ nftData }) => {
  let { tokenId } = useParams();
  const musicData = useSelector((state) => state.music);
  const [isOnMarket, setIsOnMarket] = useState(true);

  useEffect( () => {
    const init = async () => {
      setIsOnMarket(await Ethers.isOnMarket(tokenId));
    }
    init()
  }, []);

  // Sell, Auction 입력창 변경
  const selectSellOnClick = () => {
    const inputContainer = document.querySelector(".input-container");
    inputContainer.classList.add("sell");
    inputContainer.classList.remove("auction");
  };
  const selectAuctionOnClick = () => {
    const inputContainer = document.querySelector(".input-container");
    inputContainer.classList.add("auction");
    inputContainer.classList.remove("sell");
  };

  return (
    <section className="enroll-container">
      {/* 이미지 박스 */}
      <div className="image-box">
        <img src={nftData.img_file} alt="" />
      </div>

      {/*** 왼쪽 컨테이너 ***/}
      <section className="left-container">
        <div className="title-box">
          <h2>Title</h2>
          <h1>{nftData.title}</h1>
        </div>
        <div className="artist-name-box">
          <h2>Artist Name</h2>
          <h1>{nftData.artist_name}</h1>
        </div>

        <div className="audio-box">
          <audio
<<<<<<< HEAD
            src={
              nftData.ipfs_hash &&
              `https://ipfs.infura.io/ipfs/${nftData.ipfs_hash}`
            }
=======
            src={nftData.ipfs_hash && `https://ipfs.infura.io/ipfs/${nftData.ipfs_hash}`}
>>>>>>> main2
            controls
          ></audio>
        </div>
      </section>

      {/*** 오른쪽 컨테이너 ***/}
      <section className="right-container">
        {/* 상세정보 컨테이너 */}
        <section className="info-container">
          <div className="total-play-time-box">
            <h2>
              <i className="uil uil-clock"></i> Total Play Time
            </h2>
            <h1>
              {Math.floor((musicData.play_time * musicData.play_count) / 60)}{" "}
              minutes
            </h1>
          </div>
          <div className="total-play-time-box">
            <h2>
              <i className="uil uil-thumbs-up"></i>Total Likes
            </h2>
            <h1>{musicData.MusicLikes ? musicData.MusicLikes.length : 0}</h1>
          </div>
          <div className="genre-box">
            <h2>
              <i className="uil uil-music"></i> Genre
            </h2>
            <h1>{nftData.genre ? nftData.genre.join(", ") : <></>}</h1>
          </div>
          <div className="description-box">
            <h2>
              <i className="uil uil-subject"></i> Description
            </h2>
            <pre>{nftData.description}</pre>
          </div>
        </section>

        {/* 입력 컨테이너 */}
        <section className="input-container sell">
          <div className="btn-group">
            <button className="sell-btn" onClick={selectSellOnClick}>
              Sell
            </button>
            <button className="auction-btn" onClick={selectAuctionOnClick}>
              Auction
            </button>
          </div>
          <div className="input-form">
            {isOnMarket ? (
              <>
                <div className="not-available-box">
                  <h2>
                    <i className="uil uil-exclamation-triangle"></i> Not
                    available
                  </h2>
                  <p>This item is already on the market.</p>
                  <p>You cannot enroll items on the market.</p>
                </div>
              </>
            ) : (
              <>
                {/* 일반 판매 */}
                <OrdinaryForm isOnMarket={isOnMarket} />
                {/* 경매 */}
                <AuctionForm isOnMarket={isOnMarket} />
              </>
            )}
          </div>
        </section>
      </section>
    </section>
  );
};

/* 일반 판매 */
const OrdinaryForm = () => {
  let { tokenId } = useParams();
  const [sellPrice, setSellPrice] = useState("0.0001");
  const [permissionLoading, setPermissionLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const navigate = useNavigate();

  useEffect( () => {
    const init = async () => {
      setIsApproved(await Ethers.checkApprovedAddress("marketplace", tokenId));
    }
    init()
  }, []);

  // Marketplace 컨트랙트에 내 NFT를 접근 권한 허용하기
  const setPermissionOnClick = async () => {
    setPermissionLoading(true);
    const result = await (
      await Ethers.approveMyNFT("marketplace", tokenId)
    ).wait();
    setPermissionLoading(false);
    if (result && result.confirmations > 0) {
      window.alert("권한 승인 요청에 성공했습니다.");
      setIsApproved(await Ethers.checkApprovedAddress("marketplace", tokenId));
    } else {
      window.alert("권한 승인 요청이 실패했습니다.");
      navigate(`/mypage/mynftlist`);
    }
  };

  // 판매 가격 입력
  const sellPriceOnChange = (e) => {
    setSellPrice(e.target.value);
  };

  // NFT 판매 등록
  const submitOnClick = async (e) => {
    e.preventDefault();
    let isFormValid = document
      .querySelector(".ordinary-form .input-box")
      .checkValidity();
    if (!isFormValid) {
      document.querySelector(".ordinary-form .input-box").reportValidity();
    } else {
      setSubmitLoading(true);
      const result = await Ethers.enrollMarketplace(tokenId, sellPrice);
      if (result && result.confirmations > 0) {
        window.alert("NFT 판매 등록에 성공했습니다.");
        navigate(`/store`);
      } else {
        window.alert("판매 등록에 실패했습니다.");
        navigate(`/mypage/mynftlist`);
      }
      setSubmitLoading(false);
    }
  };

  return (
    <>
      <div className="ordinary-form">
        <div className="notice-box">
          <h2>
            <i className="uil uil-exclamation-triangle"></i> Must Read
          </h2>
          <p>
            Before you enroll nft to marketplace, you have to give us the
            permission to access your items.
          </p>
          <p>
            Please click below button to give us permission first and then input
            sell price
          </p>
        </div>
        <div className="permission-box">
          <div className="title-box">
            <h2>Permission</h2> <h5>*</h5>
          </div>
          <button onClick={setPermissionOnClick}>Give Permission</button>
        </div>
        <form className="input-box">
          <div className="title-box">
            <h2>Sell-Price</h2> <h5>*</h5>
          </div>
          <p>Please ETH price to sell.(Unit: 0.0001 ETH)</p>
          <input
            type="number"
            defaultValue={0.0001}
            min={0.0001}
            step={0.0001}
            onChange={sellPriceOnChange}
            required
          />
          {isApproved ? (
            <button onClick={submitOnClick}>submit</button>
          ) : (
            <button disabled={true} className="disabled-btn">
              submit
            </button>
          )}
          <Button
            onClick={() => history.back()}
            sx={{
              color: "var(--black-light-color)",
              backgroundColor: "var(--box1-color)",
              ":hover": {
                background: "var(--primary-color)",
                color: "var(--text-color)",
              },
            }}
          >
            Cancle
          </Button>
        </form>
      </div>
      {submitLoading || permissionLoading ? <SimpleBackdrop /> : <></>}
    </>
  );
};

/* 경매 */
const AuctionForm = () => {
  let { tokenId } = useParams();
  const [permissionLoading, setPermissionLoading] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const navigate = useNavigate();

  useEffect( () => {
    const init = async () => {
      setIsApproved(await Ethers.checkApprovedAddress("auction", tokenId));
    }
    init()
  }, []);

  // Auction 컨트랙트에 내 NFT를 접근 권한 허용하기
  // Auction 컨트랙트에 내 NFT를 접근 권한 허용하기
  const setPermissionOnClick = async () => {
    setPermissionLoading(true);
    const result = await (await Ethers.approveMyNFT("auction", tokenId)).wait();
    setPermissionLoading(false);
    if (result && result.confirmations > 0) {
      window.alert("권한 승인 요청에 성공했습니다.");
      setIsApproved(await Ethers.checkApprovedAddress("auction", tokenId));
    } else {
      window.alert("권한 승인 요청이 실패했습니다.");
      navigate(`/mypage/mynftlist`);
    }
  };

  // 입력 최소 시간 => 현재 시간 + 5분
  const getMinDateTime = () => {
    const ms = Date.now() + 60000 * 5; // 현재 시간 + 5분
    const minDateTime = new Date(ms);
    const time = new Date(ms).toTimeString().slice(0, 5);
    let year = minDateTime.getFullYear();
    let month = ("0" + (minDateTime.getMonth() + 1)).slice(-2);
    let date = ("0" + minDateTime.getDate()).slice(-2);
    const result = `${year}-${month}-${date}T${time}`;
    return result;
  };

  // 입력 최대 시간 => 현재 시간 + 7일
  const getMaxDateTime = () => {
    const ms = Date.now() + 1000 * 60 * 60 * 24 * 7;
    const maxDateTime = new Date(ms);
    const time = new Date(ms).toTimeString().slice(0, 5);
    let year = maxDateTime.getFullYear();
    let month = ("0" + (maxDateTime.getMonth() + 1)).slice(-2);
    let date = ("0" + maxDateTime.getDate()).slice(-2);
    const result = `${year}-${month}-${date}T${time}`;
    return result;
  };

  // NFT 경매 등록
  const submitOnClick = async (e) => {
    e.preventDefault();
    let isFormValid = document
      .querySelector(".auction-form .input-box")
      .checkValidity();
    if (!isFormValid) {
      document.querySelector(".auction-form .input-box").reportValidity();
    } else {
      setSubmitLoading(true);
      const endAt = document.querySelector("#datetime-local").value;
      const sellPrice = document.querySelector("#bid-price").value;

      const result = await Ethers.enrollAuction(
        tokenId,
        sellPrice,
        new Date(endAt).getTime()
      );
      setSubmitLoading(false);

      if (result && result.confirmations > 0) {
        window.alert("경매 등록에 성공했습니다.");
        navigate(`/store/auction`);
      } else {
        window.alert("경매 등록에 실패했습니다.");
        navigate(`/mypage/mynftlist`);
      }
    }
  };

  return (
    <>
      <div className="auction-form">
        <div className="notice-box">
          <h2>
            <i className="uil uil-exclamation-triangle"></i> Must Read
          </h2>
          <p>
            Before you enroll nft to auction market, you have to give us the
            permission to access your items.
          </p>
          <p>
            Please click below button to give us permission first and then input
            sell price
          </p>
        </div>
        <div className="permission-box">
          <div className="title-box">
            <h2>Permission</h2> <h5>*</h5>
          </div>
          <button onClick={setPermissionOnClick}>Give Permission</button>
        </div>
        <form className="input-box">
          <div className="price-box">
            <div className="title-box">
              <h2>Bid-Price</h2> <h5>*</h5>
            </div>
            <p>Please ETH price to sell. (Unit : 0.0001 ETH)</p>
            <input
              id="bid-price"
              type="number"
              defaultValue={0.0001}
              min={0.0001}
              step={0.0001}
              required
            />
          </div>
          <div className="end-date-box">
            <div className="title-box">
              <h2>End-Date</h2> <h5>*</h5>
            </div>
            <input
              id="datetime-local"
              type="datetime-local"
              min={getMinDateTime()}
              max={getMaxDateTime()}
              defaultValue={getMinDateTime()}
              required
            />
          </div>
          {isApproved ? (
            <button onClick={submitOnClick}>submit</button>
          ) : (
            <button disabled={true} className="disabled-btn">
              submit
            </button>
          )}
          <Button
            onClick={() => history.back()}
            sx={{
              color: "var(--black-light-color)",
              backgroundColor: "var(--box1-color)",
              ":hover": {
                background: "var(--primary-color)",
                color: "var(--text-color)",
              },
            }}
          >
            Cancle
          </Button>
        </form>
      </div>
      {submitLoading || permissionLoading ? <SimpleBackdrop /> : <></>}
    </>
  );
};

/* Loading 화면 */
const LoadingContent = () => {
  return (
    <section className="enroll-container">
      {/* 이미지 박스 */}
      <div className="image-box">
        <Skeleton width={"100%"} height={"100%"} variant="circular" />
      </div>

      {/*** 왼쪽 컨테이너 ***/}
      <section className="left-container">
        <div className="title-box">
          <h2>Title</h2>
          <Skeleton width={"100%"} height={"100%"} variant="text" />
        </div>
        <div className="artist-name-box">
          <h2>Artist Name</h2>
          <Skeleton width={"100%"} height={"100%"} variant="text" />
        </div>
        <div>
          <Skeleton width={"100%"} height={"100%"} variant="text" />
        </div>
      </section>

      {/*** 오른쪽 컨테이너 ***/}
      <section className="right-container">
        {/* 상세정보 컨테이너 */}
        <section className="info-container">
          <div className="total-play-time-box">
            <h2>
              <i className="uil uil-clock"></i> Total Play Time
            </h2>
            <Skeleton width={"100%"} height={"100%"} variant="text" />
          </div>
          <div className="total-play-time-box">
            <h2>
              <i className="uil uil-thumbs-up"></i>Total Likes
            </h2>
            <Skeleton width={"100%"} height={"100%"} variant="text" />
          </div>
          <div className="genre-box">
            <h2>
              <i className="uil uil-music"></i> Genre
            </h2>
            <Skeleton width={"100%"} height={"100%"} variant="text" />
          </div>
          <div className="description-box">
            <h2>
              <i className="uil uil-subject"></i> Description
            </h2>
            <Skeleton width={"100%"} height={"100%"} variant="text" />
          </div>
        </section>

        {/* 입력 컨테이너 */}
        <section className="input-container sell">
          <div className="btn-group">
            <button className="sell-btn">Sell</button>
            <button className="auction-btn">Auction</button>
          </div>
          <div className="input-form"></div>
        </section>
      </section>
    </section>
  );
};

/* Error 화면 */
const ErrorContent = () => {
  return (
    <Error
      error={{ name: "Enroll Page Error", message: "Enroll page loading fail" }}
    />
  );
};

export default Enroll;
