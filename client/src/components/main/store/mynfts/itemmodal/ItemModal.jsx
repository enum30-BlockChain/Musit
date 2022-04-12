import "./ItemModal.css";
import React, { useEffect } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";


const ItemModal = ({ open, handleClose, itemInfo }) => {
	
	return (
		<>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
				className="modal"
			>
				<Box className="modal-box" >
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
								<span className="text"></span>
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
