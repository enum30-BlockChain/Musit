import "./Store.css"
import React, { useEffect, useState } from 'react'
import Ethers from "../../../web3/Ethers";
import { Routes, Route, Link } from "react-router-dom";
import MyNFTs from "./mynfts/MyNFTs";
import { useDispatch, useSelector } from "react-redux";
import { readMyMintedNFTList } from "../../../redux/actions/musitNFTActions";



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
	const [nftItems, setNftItems] = useState([]);
	const user = useSelector((state) => state.user);
	const musitNFT = useSelector((state) => state.musitNFT);
	const dispatch = useDispatch()

	useEffect(() => {
		loadMyNFTs()
	}, [user.loading])

	async function mintingOnClick() {
		const result = await Ethers.minting("https://gateway.pinata.cloud/ipfs/QmZiFY6mvGyDvBqxHojHmiU1r8HCdh7QHZeEvYTpsWzqYT");
		
		if(result.confirmations) loadMyNFTs()
	}

	async function loadMyNFTs() {
		if (!user.loading && !user.error) {
			await dispatch(readMyMintedNFTList())
		}
		setNftItems(musitNFT.myMintedNFTList)
	}


	async function loadItems () {
		const marketplace = Ethers.loadContracts().marketplace;
		if (marketplace) {
			const itemCount = marketplace.itemCount();
			
		}
	}


  return (
		<div className="store">
			<nav className="store-nav">
				<ul className="nav-links">
					<li>
						<Link to="/store/mynfts">
							<i className="uil uil-headphones"></i>
							<span className="link-name"> MyNFTs</span>
						</Link>
					</li>
				</ul>
			</nav>
			<Routes>
				<Route path="mynfts" element={<MyNFTs />} />
			</Routes>
			<div className="title">Musit NFT Store</div>
			<button onClick={mintingOnClick}>Minting</button>
		</div>
	);
}
