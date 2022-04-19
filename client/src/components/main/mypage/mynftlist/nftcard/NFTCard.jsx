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
					<div className="content-box">
						<h2 className="title">Title</h2>
						<h1 className="content">{data.title}</h1>
					</div>
					<div className="content-box">
						<h2 className="title">Artist</h2>
						<h1 className="content">{data.artist_name}</h1>
					</div>
				</div>
			</div>
		</>
	);
}

export default NFTCard