import React, { useState } from 'react'
import {  Card, CardContent, CardHeader, CardMedia, Typography } from "@mui/material"

const NFTCard = ({data}) => {
	const cardOnClick = () => {

	}
	
  return (
		<>
			<div className="item-card">
				<div className="img-box">
					<img src={data.img_file} />
				</div>
				<div className="content-wrap">
					<div className="color-box"></div>
					<div className="content-box">
						<div className="content">
							<h2>Title</h2>
							<h1>{data.title}</h1>
						</div>
						<div className="content">
							<h2>Artist</h2>
							<h1>{data.artist_name}</h1>
						</div>
					</div>
					<div className="audio-box">
						<audio
							src={`https://ipfs.infura.io/ipfs/${data.ipfs_hash}`}
							controls
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default NFTCard