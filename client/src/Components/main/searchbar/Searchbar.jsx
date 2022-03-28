import React from 'react'
import "./Searchbar.css"
import Button from '@mui/material/Button';
import Metamask from '../../../web3/Metamask';

export const Searchbar = () => {
  const connectOnclick = () => {
    Metamask.connectWallet();
  }

  return (
		<div className="searchbar">
			<i class="uil uil-bars sidebar-toggle"></i>

			<div className="search-box">
				<i class="uil uil-search"></i>
				<input type="text" placeholder="Search here..." />
			</div>

      <div className="user-info">
        <div className="profile">
          <img src="images/profile.jpg" alt="profile" />
        </div>
        <Button
          variant="contained"
          sx={{
            color: "var(--black-light-color)",
            backgroundColor: "var(--box1-color)",
          }}
          onClick={connectOnclick}
        >
          CONNECT
        </Button>
      </div>
		</div>
	);
}
