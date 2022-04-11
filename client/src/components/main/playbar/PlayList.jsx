import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Avatar from "@mui/material/Avatar";
import { Provider, useSelector, useDispatch } from "react-redux";

export default function PlayList(props) {
  const likeMusic = useSelector((state) => state.likeMusic).data;
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
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
    console.log(index);
    props.playloadSong(song, index);
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {likeMusic &&
          likeMusic.map((song, index) => (
            <ListItem
              button
              key={song}
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
              <ListItemText
                sx={{ ml: 3, color: "text.primary" }}
                primary={`${Math.floor(song.play_time / 60)}:${
                  song.play_time % 60
                }`}
              />
            </ListItem>
          ))}
      </List>
    </Box>
  );

  return (
    <div>
      {["right", "bottom"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
