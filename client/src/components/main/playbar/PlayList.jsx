import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import { Provider, useSelector, useDispatch } from "react-redux";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CloseIcon from "@mui/icons-material/Close";
import { toggleLikeMusic } from "../../../redux/actions/musicActions";
import { height } from "@mui/system";
import "./Playlist.css";

export default function PlayList(props) {
  const dispatch = useDispatch();
  const likeMusic = useSelector((state) => state.likeMusic).data;
  const [state, setState] = useState({
    bottom: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  const playsong = (song, index) => {
    props.playloadSong(song, index);
  };

  const MinusLikelist = (song) => {
    dispatch(toggleLikeMusic(song));
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List sx={{maxHeight:"600px"}}>
        {likeMusic &&
          likeMusic.map((song, index) => (
            <ListItem button key={index} sx={{height:"70px"}}>
              <ListItem
                sx={{ width: "100%" }}
                onClick={() => {
                  playsong(song, index);
                }}
              >
                <Avatar
                  alt="Remy Sharp"
                  src={song.img_file}
                  sx={{ width: 50, height: 50 }}
                />
                <Typography variant="h6" sx={{ color: "black", ml: 3 }}>
                  {song.title} - {song.artist_name}
                </Typography>
                <AccessTimeIcon sx={{ ml: 2 }} />
                <ListItemText
                  sx={{ m: 0.5, color: "text.primary" }}
                  primary={`${Math.floor(song.play_time / 60)}:${
                    song.play_time % 60
                  }`}
                />
              </ListItem>
              <CloseIcon
                fontSize="large"
                onClick={() => {
                  MinusLikelist(song);
                }}
              />
            </ListItem>
          ))}
      </List>
    </Box>
  );

  return (
    <div className="playlist-btn">
      {["bottom"].map((anchor) => (
        <React.Fragment key={anchor}>
          <div
            className="playlist-btn-inner"
            sx={{ color: "black", m: 2 }}
            onClick={toggleDrawer(anchor, true)}
          >
            <i className="uil uil-angle-up"></i>
          </div>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            sx={{
              position: "fixed",
              bottom: "100px",
              height: "calc(100vh-100px)",
            }}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
