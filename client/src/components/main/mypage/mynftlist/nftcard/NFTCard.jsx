import React, { useState } from 'react'
import { Button, Card, CardActions, CardContent, CardMedia, Modal, Typography } from "@mui/material"
import { Box } from '@mui/system';

const NFTCard = ({data}) => {
  const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
		<>
			<div className="item-box">
				<Card className="item-card" onClick={handleOpen} sx={{ maxWidth: 345 }}>
					
					<CardMedia
						component="img"
						height="180"
						image={data.image}
						alt={data.title}
					/>

					<CardContent>
						<Typography gutterBottom variant="h5" component="div">
							{`${data.title} #${data.tokenId}`}
						</Typography>
					</CardContent>
					<CardActions>
						<Button size="medium">Sell</Button>
					</CardActions>
				</Card>
        <NFTModal open={open} handleClose={handleClose}/>
			</div>
		</>
	);
}

const NFTModal = ({open, handleClose}) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'var(--nft-modal-bg-color)',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
  
  return (
		<>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="parent-modal-title"
				aria-describedby="parent-modal-description"
			>
				<Box sx={{ ...style, width: 400 }}>
					<h2 id="parent-modal-title">Text in a modal</h2>
					<p id="parent-modal-description">
						Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
					</p>
				</Box>
			</Modal>
		</>
	);
}

export default NFTCard