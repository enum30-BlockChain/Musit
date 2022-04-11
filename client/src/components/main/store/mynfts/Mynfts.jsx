import "./Mynfts.css"
import React, { useEffect, useState } from 'react'
import ItemModal from "./itemmodal/ItemModal"
import { Avatar, Card, CardHeader, CardMedia, IconButton } from "@mui/material"
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useOutletContext } from "react-router";

const Mynfts = () => {
  const [address, nftItems] = useOutletContext();

  useEffect(() => {
    console.log(1);
  }, [])

  return (
    <>
      <div className="itemcard-container">
				{nftItems.map((data, index) => (
					<ItemCard
						key={index}
						tokenId={data.tokenId}
						title={data.title}
						genre={data.genre}
						image={data.image}
						description={data.description}
					/>
				))}
			</div>
    </>
  )
}

function ItemCard (props) {
  const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
			<Card className="itemCard" onClick={handleOpen}>
				<CardHeader
					title={`${props.title} #${props.tokenId}`}
					subheader={props.genre}
          height="100"
          avatar={
            <Avatar src="/images/profile.jpg"/>
          }
					action={
						<IconButton aria-label="settings">
							<FavoriteIcon />
						</IconButton>
					}
				/>
				<CardMedia
					component="img"
					height="200"
					image={props.image}
					alt={props.title}
				/>
			</Card>
      <ItemModal open={open} handleClose={handleClose} itemInfo={props} />
		</>
  )
}


export default Mynfts