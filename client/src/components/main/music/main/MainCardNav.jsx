import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HeadsetIcon from "@mui/icons-material/Headset";
import { useSelector, useDispatch } from "react-redux";
import ThumbUpOffAltOutlinedIcon from "@mui/icons-material/ThumbUpOffAltOutlined";
import ThumbUpOffAltRoundedIcon from "@mui/icons-material/ThumbUpOffAltRounded";
import { toggleLikeMusic } from "../../../../redux/actions/musicActions";

export default function MainCard(props) {
  return (
    <>
      <Box
        sx={{
          m: "auto",
          mb: 3,
          height: "100%",
          width: "100%",
          borderBottom: "solid 1px ",
          color: "white",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            sx={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography sx={{ ml: 8 }} component="div" variant="h6">
              Num
            </Typography>

            <Box
              justifyContent="space-between"
              sx={{ ml: 3, display: "flex", width: "80%" }}
            >
              <Typography component="div" variant="h6" sx={{ width: "35%" }}>
                Music Title
              </Typography>
              <Typography variant="h6" component="div" sx={{ width: "25%" }}>
                Artist Name
              </Typography>
              <Typography variant="h6" component="div" sx={{ width: "40%" }}>
                Description
              </Typography>
            </Box>
          </Box>
          <Box
            justifyContent="space-between"
            sx={{ alignItems: "center", display: "flex", width: "18%" }}
          >
            <Typography variant="overline" display="block">
              like
            </Typography>
            <Typography variant="overline" display="block">
              Play Count
            </Typography>
            <Typography variant="overline" display="block">
              Duration
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}
