import React from "react";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";

export default function Artistinfo() {
  const artist = useSelector((state) => state.artist);
  const metamask = useSelector((state) => state.metamask);

  const sliceAddress =
    metamask.accounts[0] &&
    metamask.accounts[0].substr(0, 5) +
      metamask.accounts[0].substr(metamask.accounts[0].length - 4, 4) +
      "...";

  return (
    <>
      <div className="artist-info-container">
        <div className="artist-card">
          <div className="title">
            <i className="uil uil-create-dashboard"></i>
            <span className="text">Artist Dashboard</span>
          </div>
          <div className="artist-image">
            <Avatar
              alt="Remy Sharp"
              src={artist.img}
              sx={{ width: 260, height: 260 }}
            />
          </div>
          <div className="artist-info">
            <h2 className="nickname">ArtistName</h2>
            {artist.artist_name}

            <h2 className="address">Address</h2>
            <span>{sliceAddress}</span>
          </div>
        </div>
      </div>
    </>
  );
}
