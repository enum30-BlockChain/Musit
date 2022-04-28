import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { selectedMusitNFT } from '../../../../redux/actions/contractActions';
import "./MyBidsCard.css";

const MyBidsCard = ({data}) => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

  const isEnd = () => {
		const distance = data.endAt * 1000 - Date.now()
		return !(distance > 0)
	}

  const bidMoreOnClick = async () => {
    navigate(`/bid/${data.itemId}`);
		await dispatch(selectedMusitNFT(data))
  }
	
  const cancelOnClick = async () => {
    navigate(`/store/mybids`);
  }
	
  return (
		<>
			<div className="item-card" onClick={bidMoreOnClick}>
				<div className="img-box">
					<img src={data.img_file} />
				</div>
				<div className="content-wrap">
					<div className={`color-box ${isEnd() && "end"}`}>
						{isEnd() && <div className="end-mark">End</div>}
					</div>
					<div className="info-wrap">
						<div className="first-box">
							<div className="price-box">
								<h2>Pending Bids</h2>
								<h1>{data.pendingBids} ETH</h1>
							</div>
							<div className="tokenid-box">
								<h2>Token Id</h2>
								<h1>{data.tokenId}</h1>
							</div>
						</div>
						<div className="second-box">
							<div className="top-bid-box">
								<h2>Top Bid</h2>
								<h1>{data.topBid} ETH</h1>
							</div>
							<div className="top-bidder-box">
								<h2>Top Bidder</h2>
								<h1>{data.topBidder}</h1>
							</div>
              {/* TODO: top bidder는 취소 못하게 막아야함 */}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default MyBidsCard