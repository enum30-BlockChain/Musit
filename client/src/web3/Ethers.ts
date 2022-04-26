import {
	BigNumber,
	BigNumberish,
	Contract,
	ContractTransaction,
	ethers,
	Event,
	EventFilter,
	Transaction,
} from "ethers";
import MusitNftJson from "./MusitNFT.json";
import MarketplaceJson from "./Marketplace.json";
import AuctionJson from "./Auction.json";
import SubscriptionJson from "./Subscription.json";
import { MusitNFT, Auction, Marketplace, Subscription } from "./typechain";

interface Window {
	ethereum: any;
}
declare let window: Window;

const metamask = new ethers.providers.Web3Provider(window.ethereum);
const signer = metamask.getSigner();

const musitNFT: ethers.Contract | MusitNFT = new ethers.Contract(
	MusitNftJson.contractAddress,
	MusitNftJson.abi,
	signer
);

const marketplace: ethers.Contract | Marketplace = new ethers.Contract(
	MarketplaceJson.contractAddress,
	MarketplaceJson.abi,
	signer
);

const auction: ethers.Contract | Auction = new ethers.Contract(
	AuctionJson.contractAddress,
	AuctionJson.abi,
	signer
);

const subscription: ethers.Contract | Subscription = new ethers.Contract(
	SubscriptionJson.contractAddress,
	SubscriptionJson.abi,
	signer
);

interface Contracts {
	musitNFT: Contract | MusitNFT;
	marketplace: Contract | Marketplace;
}

export default class Ethers {
	static ethToWei(eth: string | number): BigNumber {
		return ethers.utils.parseEther(eth.toString());
	}

	static weiToEth(wei: string | number): BigNumber {
		return ethers.utils.parseUnits(wei.toString());
	}

	static loadContracts(): Contracts | null {
		try {
			const contracts = {
				musitNFT,
				marketplace,
				auction,
			};
			return contracts;
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	// NFT 생성
	static async minting(tokenURI: string): Promise<Transaction | null> {
		try {
			const options = {
				value: ethers.utils.parseEther("0.0001"),
			};

			return await (await musitNFT.minting(tokenURI, options)).wait();
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	// 내 NFT 리스트 검색
	static async myNFTList(address: string): Promise<object[] | null> {
		try {
			const nftBalance = await musitNFT.balanceOf(address);
			let nftList: object[] = [];
			for (let i = 0; i < nftBalance; i++) {
				const tokenId = (
					await musitNFT.tokenOfOwnerByIndex(address, i)
				).toNumber();
				const tokenURI = await musitNFT.tokenURI(tokenId);
				const metadata = await (
					await fetch(`https://ipfs.infura.io/ipfs/${tokenURI}`)
				).json();

				nftList.push({
					tokenId,
					...metadata,
				});
			}
			return nftList;
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	// Marketplace/Auction에 NFT 있는지 확인
	static async isOnMarket(
		tokenId: string | number
	): Promise<ContractTransaction | null> {
		try {
			const result = await musitNFT.getIsOnMarket(tokenId);
			return result;
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	// NFT 권한 넘기기
	static async approveMyNFT(
		contract: string,
		tokenId: string
	): Promise<ContractTransaction | null> {
		try {
			let contractAddress;
			if (contract === "marketplace") {
				contractAddress = marketplace.address;
			} else if (contract === "auction") {
				contractAddress = auction.address;
			}
			const result = await musitNFT.approve(contractAddress, tokenId);
			return result;
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	// Marketplace에 NFT 등록하기
	static async enrollMarketplace(
		tokenId: string,
		sellPrice: number | string
	): Promise<ContractTransaction | null> {
		try {
			const result = await marketplace.enroll(
				musitNFT.address,
				tokenId,
				this.ethToWei(sellPrice)
			);
			return result;
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	// Auction에 NFT 등록하기
	static async enrollAuction(
		tokenId: string,
		sellPrice: number | string,
		endAt: number
	): Promise<ContractTransaction | null> {
		try {
			const result = await auction.enroll(
				this.ethToWei(sellPrice),
				endAt,
				musitNFT.address,
				tokenId
			);
			return result;
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	// Marketplace에 등록된 NFT 구매
	static async purchaseNFT(
		itemId: number
	): Promise<ContractTransaction | null> {
		try {
			let price = (await marketplace.getTotalPrice(itemId)).toString();
			const options = {
				value: price,
			};
			const result = await marketplace.purchase(itemId, options);
			return result;
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	// Auction에 올라온 NFT 입찰하기
	static async bid(
		itemId: number,
		price: number
	): Promise<ContractTransaction | null> {
		try {
			let priceWei = ethers.utils.parseEther(String(price));
			let bidPrice = (await auction.calPriceWithFee(priceWei)).toString();
			const options = {
				value: bidPrice,
			};
			const result = await auction.bid(itemId, options);
			return result;
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	// 마켓에 올라온 NFT 리스트 검색
	static async getMarketNFTList(): Promise<object[] | null> {
		try {
			const nftBalance = await musitNFT.balanceOf(marketplace.address);
			let nftList: object[] = [];
			for (let i = 0; i < nftBalance; i++) {
				const tokenId = (
					await musitNFT.tokenOfOwnerByIndex(marketplace.address, i)
				).toNumber();
				const marketItemId = await marketplace.nftToItemId(
					musitNFT.address,
					tokenId
				);
				const marketItemInfo = await marketplace.items(marketItemId);

				const tokenURI = await musitNFT.tokenURI(tokenId);
				const metadata = await (
					await fetch(`https://ipfs.infura.io/ipfs/${tokenURI}`)
				).json();
				let price = await marketplace.getTotalPrice(marketItemId);
				nftList.push({
					itemId: marketItemId.toNumber(),
					tokenId,
					price: ethers.utils.formatEther(price),
					seller: marketItemInfo.seller,
					nft: await musitNFT.name(),
					sold: marketItemInfo.sold,
					...metadata,
				});
			}
			return nftList;
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	// 선택한 마켓 아이템 검색
	static async getMarketItem(tokenId: number): Promise<object[] | null> {
		try {
			const marketItemId = await marketplace.nftToItemId(
				musitNFT.address,
				tokenId
			);
			const marketItemInfo = await marketplace.items(marketItemId);
			let price = await marketplace.getTotalPrice(marketItemId);
			const tokenURI = await musitNFT.tokenURI(tokenId);
			const metadata = await (
				await fetch(`https://ipfs.infura.io/ipfs/${tokenURI}`)
			).json();

			const result = {
				itemId: marketItemId.toNumber(),
				tokenId,
				price: ethers.utils.formatEther(price),
				seller: marketItemInfo.seller,
				nft: await musitNFT.name(),
				sold: ethers.utils.formatEther(price) === "0.0",
				...metadata,
			};

			return result;
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	// 경매에 올라온 NFT 리스트 검색
	static async getAuctionNFTList(): Promise<object[] | null> {
		try {
			const nftBalance = await musitNFT.balanceOf(auction.address);
			let nftList: object[] = [];
			for (let i = 0; i < nftBalance; i++) {
				const tokenId = (
					await musitNFT.tokenOfOwnerByIndex(auction.address, i)
				).toNumber();
				const auctionItemId = await auction.nftToItemId(
					musitNFT.address,
					tokenId
				);
				const auctionItemInfo = await auction.items(auctionItemId);

				const tokenURI = await musitNFT.tokenURI(tokenId);
				const metadata = await (
					await fetch(`https://ipfs.infura.io/ipfs/${tokenURI}`)
				).json();

				nftList.push({
					itemId: auctionItemId.toNumber(),
					nft: await musitNFT.name(),
					startPrice: ethers.utils.formatEther(auctionItemInfo.startPrice),
					startAt: auctionItemInfo.startAt.toNumber(),
					endAt: auctionItemInfo.endAt.toNumber(),
					tokenId,
					seller: auctionItemInfo.seller,
					topBidder: auctionItemInfo.topBidder,
					topBid: ethers.utils.formatEther(auctionItemInfo.topBid),
					status: auctionItemInfo.status,
					...metadata,
				});
			}
			return nftList;
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	// 선택한 경매 아이템 검색
	static async getAuctionItem(tokenId: number): Promise<object[] | null> {
		try {
			const auctionItemId = await auction.nftToItemId(
				musitNFT.address,
				tokenId
			);
			const auctionItemInfo = await auction.items(auctionItemId);

			const tokenURI = await musitNFT.tokenURI(tokenId);
			const metadata = await (
				await fetch(`https://ipfs.infura.io/ipfs/${tokenURI}`)
			).json();

			const result = {
				itemId: auctionItemId.toNumber(),
				nft: await musitNFT.name(),
				startPrice: ethers.utils.formatEther(auctionItemInfo.startPrice),
				startAt: auctionItemInfo.startAt.toNumber(),
				endAt: auctionItemInfo.endAt.toNumber(),
				tokenId,
				seller: auctionItemInfo.seller,
				topBidder: auctionItemInfo.topBidder,
				topBid: ethers.utils.formatEther(auctionItemInfo.topBid),
				status: auctionItemInfo.status,
				...metadata,
			};
			return result;
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	//TODO: 수입 계산 함수
	// static async getIncome(address: string): Promise<boolean | null> {
	// 	try {
	// 		const boughtFilter: EventFilter = marketplace.filters.Bought(null, null, null, address, null, null)
	// 		const sellPrice: BigNumberish = await Promise.all(
	// 			(
	// 				await marketplace.queryFilter(boughtFilter)
	// 			).map(async (event: Event) => {
	// 				const boughtInfo: any = event.args;
	// 				const sellPrice = boughtInfo.sellPrice;
	// 				return sellPrice;
	// 			}).reduce((a: BigNumberish,b: BigNumberish) => a.add(b), "0")
	// 		);

	// 	} catch (error) {
	// 		console.log(error);
	// 		return null;
	// 	}
	// }

	// 현재 Signer의 private key를 verify하는 함수
	static async signToVerify(message?: string): Promise<boolean | null> {
		try {
			let result;
			if (message) {
				let messageHash = ethers.utils.solidityKeccak256(["string"], [message]);
				let arrayMessage = ethers.utils.arrayify(messageHash);
				const singedMessage = await signer.signMessage(messageHash);
				result =
					ethers.utils.verifyMessage(arrayMessage, singedMessage) ===
					(await signer.getAddress());
			} else {
				const message =
					"Verifying signer. This process doesn't cost you any gas or fee.";
				const singedMessage = await signer.signMessage(message);
				result =
					ethers.utils.verifyMessage(message, singedMessage) ===
					(await signer.getAddress());
			}
			return result;
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	// buy subscription 함수 불러오기
	static async buySubscription(plan: number): Promise<boolean | null> {
		try {
			const price = await subscription.getPrice(plan);
			const options = {
				value: price,
			};
			const result = await subscription.buy(plan, options);
			return result;
		} catch (error) {
			console.log(error);
			return null;
		}
	}
	
	// subscription EndAt 불러오기
	static async getSubscriptionEndAt(address: string): Promise<string | null> {
		try {
			const endAt = await subscription.getEndAt(address);	
			return endAt.toNumber();
		} catch (error) {
			console.log(error);
			return null;
		}
	}
}
