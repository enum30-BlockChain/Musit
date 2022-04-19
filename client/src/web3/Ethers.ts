import {
	BigNumber,
	BigNumberish,
	Contract,
	ContractTransaction,
	ethers,
	EventFilter,
	Transaction,
} from "ethers";
import MusitNftJson from "./MusitNFT.json";
import MarketplaceJson from "./Marketplace.json";
import AuctionJson from "./Auction.json";
import { MusitNFT } from "./typechain/MusitNFT";
import { Marketplace } from "./typechain/Marketplace";

const gwei50 = ethers.utils.parseUnits("50", "gwei").toString();


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

const auction: ethers.Contract | Marketplace = new ethers.Contract(
	AuctionJson.contractAddress,
	AuctionJson.abi,
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

	static async minting(tokenURI: string): Promise<Transaction | null> {
		try {
			const options = {
				value: ethers.utils.parseEther("0.0001"),
				gasPrice: gwei50,
			};

			return await (await musitNFT.minting(tokenURI, options)).wait();
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	static async myNFTList(address: string): Promise<object[] | null> {
		try {
			const filter: EventFilter = musitNFT.filters.Transfer(null, address);
			const myNFTList: object[] = await Promise.all(
				(
					await musitNFT.queryFilter(filter)
				).map(async (event: ethers.Event) => {
					const item: any = event.args;
					const tokenURI = await musitNFT.tokenURI(item.tokenId);
					const metadata = await (await fetch(`https://ipfs.infura.io/ipfs/${tokenURI}`)).json();
					const tokenId = item.tokenId.toNumber();

					return {
						tokenId,
						...metadata,
					};
				})
			);
			return myNFTList;
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
		sellPrice: number | string,
	): Promise<ContractTransaction | null> {
		try {
			const result = await marketplace.enroll(musitNFT.address, tokenId, this.ethToWei(sellPrice))
			return result;
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	// Marketplace/Auction에 NFT 있는지 확인
	static async isOnMarket(
		tokenId: string | number,
	): Promise<ContractTransaction | null> {
		try {
			const result = await musitNFT.getIsOnMarket(tokenId);
			return result;
		} catch (error) {
			console.log(error);
			return null;
		}
	}

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
			};
			return result;
		} catch (error) {
			console.log(error);
			return null;
		}
	}
}
