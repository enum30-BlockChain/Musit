import "./MyNFTs.css"
import React, { useEffect, useState } from 'react'
import { Avatar, Card, CardHeader, CardMedia, IconButton } from "@mui/material"
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSelector } from "react-redux";

const MyNFTs = () => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
	const musitNFT = useSelector(state => state.musitNFT)
	const user = useSelector(state => state.user)


  useEffect(() => {
    
  }, [])

	
  return (
		<>
			<div className="item-card-container">
				{musitNFT.myNFTList.map((data, index) => (
					<div className="item-box" key= {index}>
						<Card className="itemCard" onClick={handleOpen}>
							<CardHeader
								title={`${data.title} #${data.tokenId}`}
								subheader={data.genre}
								height="100"
								avatar={<Avatar src={user.img} />}
								action={
									<IconButton aria-label="settings">
										<FavoriteIcon />
									</IconButton>
								}
							/>
							<CardMedia
								component="img"
								height="200"
								image={data.image}
								alt={data.title}
							/>
						</Card>
					</div>
				))}
			</div>
		</>
	);
}


export default MyNFTs