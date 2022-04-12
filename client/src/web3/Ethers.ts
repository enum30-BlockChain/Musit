import { BigNumber, Contract, ethers, EventFilter, Transaction } from "ethers";
import { MusitNFT, Marketplace } from "./typechain/index";
import MusitNftJson from "./MusitNFT.json";
import MarketplaceJson from "./Marketplace.json";
import AuctionJson from "./Auction.json";
import { MintedEvent } from "./typechain/MusitNFT";

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
      };

      return await (await musitNFT.minting(tokenURI, options)).wait();
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async myNFTList(address: string): Promise<object[] | null> {
    try {
      
      return []
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async myMintedNFTList(address: string): Promise<object[] | null> {
    try {
      const filter: EventFilter = musitNFT.filters.Minted(null, null, address);
				const myMintedList: object[] = await Promise.all(
					(
						await musitNFT.queryFilter(filter)
					).map(async (event: ethers.Event) => {
						const item: any = event.args;
            console.log(item);
            
						const tokenURI = await musitNFT.tokenURI(item.tokenId);
						const metadata = await (await fetch(tokenURI)).json();
						const tokenId = item.tokenId.toNumber();

						return {
							tokenId,
							...metadata,
						};
					})
				);
      return myMintedList
    } catch (error) {
      console.log(error);
      return null;
    }
  }


  static ethToWei(eth: string): BigNumber {
    return ethers.utils.parseEther(eth);
  }

  static weiToEth(wei: string): BigNumber {
    return ethers.utils.parseUnits(wei);
  }

  // 현재 Signer의 private key를 verify하는 함수
  static async signToVerify(message?: string): Promise<boolean | string> {
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
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      return "";
    }
  }
}
