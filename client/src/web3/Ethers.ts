import { ethers } from "ethers";
import MusitNFT from "./MusitNFT.json";


interface Window {
  ethereum: any;
}
declare let window: Window;

const ALCHEMY_API_KEY = process.env.REACT_APP_ALCHEMY_API_KEY;
const PRIVATE_KEY = process.env.REACT_APP_PRIVATE_KEY? process.env.REACT_APP_PRIVATE_KEY : "";
const network = "ropsten";
const provider = new ethers.providers.AlchemyProvider(network, ALCHEMY_API_KEY);
// const signer = new ethers.Wallet(PRIVATE_KEY, provider)

const metamask = new ethers.providers.Web3Provider(window.ethereum);
const signer = metamask.getSigner();
const contract = new ethers.Contract(
	MusitNFT.contractAddress,
	MusitNFT.abi,
	signer
);

export default class Ethers {
  static async test() {
    try {
      const options = {
        value: ethers.utils.parseEther("0.01"),
        gasLimit: 1000000,
        gasPrice: 15000000000,
      }
      return await contract.minting("tokenURI", options);
    } catch (error) {
      console.log(error);
			return "🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬";
    }
  }

  static async setIsMintEnabled(enable: boolean) {
    try {
      return await contract.setIsMintEnabled(enable)
    } catch (error) {
      console.log(error);
			return "";
    }
  }

	static async sendTx() {
		try {
      const gas_price = await signer.getGasPrice()
      const gas_limit = ethers.utils.hexlify(21000)
      const nonce = await signer.getTransactionCount()
      const value = ethers.utils.parseEther("1")
      const tx = {
        from: signer.getAddress(),
        to: "0x2Eb8c98E360d146165b8F1f819F8863d41C4Eb6D",
        value: value,
        nonce: nonce,
        gasLimit: gas_limit,
        gasPrice: gas_price,
      }
			return await signer.sendTransaction(tx)
		} catch (error) {
			console.log(error);
			return "";
		}
	}

	static async getContractAddress() {
		try {
			return contract.address;
		} catch (error) {
			console.log(error);
			return "";
		}
	}
  
	static async getTotalSupplied() {
		try {
			return parseInt(await contract.totalSupplied(), 16);
		} catch (error) {
			console.log(error);
			return "";
		}
	}

	static async getMaxMintsPerWallet() {
		try {
			return parseInt(await contract.maxMintsPerWallet(), 16);
		} catch (error) {
			console.log(error);
			return "";
		}
	}

	static async getMaxSupply() {
		try {
			return parseInt(await contract.maxSupply(), 16);
		} catch (error) {
			console.log(error);
			return "";
		}
	}

	static async getMintPrice() {
		try {
			const mintPrice = await contract.mintPrice();
			return ethers.utils.formatEther(mintPrice);
		} catch (error) {
			console.log(error);
			return "";
		}
	}

	static async getIsMintEnabled() {
    return await contract.isMintEnabled();
	}
}
