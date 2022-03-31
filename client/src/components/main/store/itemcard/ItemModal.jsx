import React, { useEffect } from 'react'
import { Box, Modal, Typography } from "@mui/material";

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ItemModal = ({ open, handleClose, itemInfo }) => {
  useEffect(() => {
    console.log(itemInfo);
  }, []);
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h4" component="h3">
            {itemInfo.title} #{itemInfo.tokenId}
          </Typography>
          <img src={itemInfo.image} alt={itemInfo.title} />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {itemInfo.description}
          </Typography>
        </Box>
      </Modal>
    </>
  )
}

export default ItemModal