import React from 'react'
import "./Searchbar.css"
import Button from '@mui/material/Button';
import Metamask from '../../../web3/Metamask';

export const Searchbar = ({address}) => {
  const connectOnclick = () => {
    Metamask.connectWallet();
  }

  return (
		<div className="searchbar">
			<i className="uil uil-bars sidebar-toggle"></i>

			<div className="search-box">
				<i className="uil uil-search"></i>
				<input type="text" placeholder="Search here..." />
			</div>

      <div className="user-info">
        <div className="profile">
          <img src="/images/profile.jpg" alt="profile" />
        </div>
        {address ? "address" : <Button
          variant="contained"
          sx={{
            color: "var(--black-light-color)",
            backgroundColor: "var(--box1-color)",
          }}
          onClick={connectOnclick}
        >
          CONNECT
        </Button>}
        
      </div>
		</div>
	);
}
