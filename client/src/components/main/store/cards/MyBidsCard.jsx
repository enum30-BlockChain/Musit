import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';
import "./MyBidsCard.css";

const MyBidsCard = ({data}) => {
	const navigate = useNavigate()

  const isEnd = () => {
		const distance = data.endAt * 1000 - Date.now()
		return !(distance > 0)
	}

  const bidMoreOnClick = () => {
    navigate(`/bid/${data.tokenId}`);
  }
	
  return (
		<>
			<div className="item-card">
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
							{isEnd() ? (
								<>
									<div className="btn-box">
										<button>Bid More</button>
									</div>
								</>
							) : (
								<>
									<div className="btn-box">
										<button onClick={bidMoreOnClick}>Bid More</button>
									</div>
									<div className="btn-box">
										<button>Cancel</button>
									</div>
								</>
							)}
              {/* TODO: top bidder는 취소 못하게 막아야함 */}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default MyBidsCard