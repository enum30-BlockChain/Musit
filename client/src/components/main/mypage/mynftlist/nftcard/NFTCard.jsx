import React, { useState } from 'react'
import {  Card, CardContent, CardMedia, Typography } from "@mui/material"

const NFTCard = ({data}) => {
	const cardOnClick = () => {

	}
	
  return (
		<>
			<div className="item-box">
				<Card className="item-card" sx={{ maxWidth: 345 }}>
					
					<CardMedia
						component="img"
						height="180"
						image={data.img_file}
						alt={data.title}
					/>

					<CardContent>
						<Typography gutterBottom variant="h4" component="h4">
							{data.title}
						</Typography>
						<Typography gutterBottom variant="h5" component="h5">
							{data.artist_name}
						</Typography>
					</CardContent>
				</Card>
			</div>
		</>
	);
}

export default NFTCard