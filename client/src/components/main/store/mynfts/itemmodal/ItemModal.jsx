import "./ItemModal.css";
import React, { useEffect } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";

const modalStyle = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 1000,
	height: 600,
	bgcolor: "background.paper",
	boxShadow: 24,
	p: 4,
};

const ItemModal = ({ open, handleClose, itemInfo }) => {
	useEffect(() => {
		console.log(itemInfo)
	}, []);
	
	return (
		<>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
				className="modal"
			>
				<Box className="modal-box" sx={modalStyle}>
					<Typography id="modal-modal-title" variant="h4" component="h3">
						{itemInfo.title} #{itemInfo.tokenId}
					</Typography>
					<div className="modal-content">
						<div className="image">
							<img src={itemInfo.image} alt={itemInfo.title} />
						</div>
						<div className="details">
							<div className="detail-box">
								<div className="name">Title</div>
								<span className="text">{itemInfo.title}</span>
							</div>
							<div className="detail-box">
								<div className="name">TokenId</div>
								<span className="text">{itemInfo.tokenId}</span>
							</div>
							<div className="detail-box description-box">
								<div className="name">Description</div>
								<span className="text">asdf\sadfsdafsafsdafsdafdaasdfasdfsadfsdafsdafsadfsadfsadf
								fas
								dfs
								adf
								asdf
								asdfasdfsadfasdfasddfasfsadfsadsadfasfadsfasdfffffffffffffffffffffffffffffffffffafsddddddddddddddddddddddadsffffffffffffffffffffffffffasdf</span>
							</div>
							<div className="button-group">
							</div>
						</div>
					</div>
				</Box>
			</Modal>
		</>
	);
};

export default ItemModal;
