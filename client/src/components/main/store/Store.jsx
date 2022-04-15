import "./Store.css"
import React, { useEffect, useState } from 'react'
import Ethers from "../../../web3/Ethers";
import { Routes, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { readMyMintedNFTList, readMyNFTList } from "../../../redux/actions/musitNFTActions";



function createTestArray (num) {
  const array = []
  for (let i = 0; i < num; i++) {
    const testData = {
			title: `title-${i}`,
			genre: `genre-${i}`,
			description: `descriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescr-${i}`,
			image: `image-${i}`,
		};
    array.push(testData)
  }
  return array
}


export const Store = () => {
	const user = useSelector((state) => state.user);
	const musitNFT = useSelector((state) => state.musitNFT);
	const selectedMusic = useSelector((state) => state.selectedMusic);
	const dispatch = useDispatch()

	

	useEffect(() => {
		loadMyNFTs()
	}, [user.loading])

	async function mintingOnClick() {
		dispatch
		const result = await Ethers.minting("https://gateway.pinata.cloud/ipfs/QmZiFY6mvGyDvBqxHojHmiU1r8HCdh7QHZeEvYTpsWzqYT");
		
		if(result.confirmations) loadMyNFTs()
	}

	async function loadMyNFTs() {
		if (!user.loading && !user.error) {
			await dispatch(readMyNFTList())
		}
	}


	async function loadItems () {
		const marketplace = Ethers.loadContracts().marketplace;
		if (marketplace) {
			const itemCount = marketplace.itemCount();
			
		}
	}

  return (
		<div className="store">
			<nav className="top-nav">
				<ul className="nav-links">
					<li>
						<Link to="/store/nfts">
							<i className="uil uil-google-play"></i>
							<span className="link-name">Ordinary Market</span>
						</Link>
					</li>
					<li>
						<Link to="/store/auction">
							<i className="uil uil-arrow-growth"></i>
							<span className="link-name">Auction Market</span>
						</Link>
					</li>
				</ul>
			</nav>
			
		</div>
	);
}
