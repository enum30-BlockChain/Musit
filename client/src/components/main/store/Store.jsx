import "./Store.css"
import React, { useEffect, useState } from 'react'
import ItemCard from "./itemcard/ItemCard"
import Ethers from "../../../web3/Ethers";
import StoreNavbar from "./storenavbar/StoreNavbar";


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


export const Store = ({address}) => {
	const [nftItems, setNftItems] = useState([]);

	useEffect(() => {
		if (address) loadMyNFTs()
	}, [address])

	async function mintingOnClick() {
		const result = await Ethers.minting("https://gateway.pinata.cloud/ipfs/QmZiFY6mvGyDvBqxHojHmiU1r8HCdh7QHZeEvYTpsWzqYT");

		console.log(result.confirmations);
		if(result.confirmations) loadMyNFTs()
	}

	async function loadMyNFTs() {
		if (address) {
			const musitNFT = Ethers.loadContracts().musitNFT;
			const filter = musitNFT.filters.Minted(null, null, address)
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
	}
	
	function card (e) {
		e.preventDefault()
		console.log(e.target)
	}

	async function loadItems () {
		const marketplace = Ethers.loadContracts().marketplace;
		if (marketplace) {
			const itemCount = marketplace.itemCount();
			
		}
	}


  return (
		<div className="store">
			<StoreNavbar/>
			<div className="title">Musit NFT Store</div>
			<button onClick={mintingOnClick}>Minting</button>
			<div className="itemcard-container">
				{nftItems.map((data, index) => (
					<div className={card-`${index}`} onClick={card} >
						<ItemCard
							key={index}
							tokenId={data.tokenId}
							title={data.title}
							genre={data.genre}
							image={data.image}
							description={data.description}
						/>
					</div>
				))}
			</div>
		</div>
	);
}
