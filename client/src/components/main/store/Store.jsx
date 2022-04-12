import "./Store.css"
import React, { useEffect, useState } from 'react'
import Ethers from "../../../web3/Ethers";
import { Routes, Route, Link } from "react-router-dom";
import MyNFTs from "./mynfts/MyNFTs";
import { useSelector } from "react-redux";



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
	const user = useSelector(state => state.user)

	useEffect(() => {
		if (!user.loading && !user.error) loadMyNFTs()
	}, [user.loading])

	async function mintingOnClick() {
		const result = await Ethers.minting("https://gateway.pinata.cloud/ipfs/QmZiFY6mvGyDvBqxHojHmiU1r8HCdh7QHZeEvYTpsWzqYT");

		if(result) loadMyNFTs()
	}

	async function loadMyNFTs() {
		if (user.address) {
		}
		const musitNFT = Ethers.loadContracts().musitNFT;
		const filter = musitNFT.filters.Minted(null, null, user.address)
		const myMintedList =await Promise.all((await musitNFT.queryFilter(filter)).map(async (event) => {
			const item = event.args
			const tokenURI = await musitNFT.tokenURI(item.tokenId)
			const metadata = await (await fetch(tokenURI)).json();
			const tokenId = item.tokenId.toNumber()
			
			return {
				tokenId,
				...metadata
			}
		}))
		console.log(myMintedList);
		setNftItems(myMintedList)
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
				<Route path="mynfts" element={<MyNFTs nftItems={nftItems} />} />
			</Routes>
			<div className="title">Musit NFT Store</div>
			<button onClick={mintingOnClick}>Minting</button>
		</div>
	);
}
