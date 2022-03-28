import React from 'react'
import { Box, Stack, Typography } from '@mui/material'

function CreateNFT() {
  return (
    <Stack
      sx={{ display: "flex" }}
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      spacing={0.5}
    >
      <Box sx={{mx:"auto",p:0}}>
        <Typography variant="h3">Responsive h3</Typography>
        <Box>
          <div>createNFT</div>
        </Box>
        <Box>
          <div>createNFT</div>
        </Box>
        <Box>
          <div>createNFT</div>
        </Box>
        <Box>
          <div>createNFT</div>
        </Box>
      </Box>
    </Stack>
  );
}
export default CreateNFT