import { ethers, Signer } from "ethers";
import MusitNFT from "./MusitNFT.json";

interface Window {
  ethereum: any;
}
declare let window: Window;

const network = "ropsten"
const alchemy = new ethers.providers.AlchemyProvider(network, process.env.REACT_APP_ALCHEMY_API_KEY)
const metamask = new ethers.providers.Web3Provider(window.ethereum);
const signer = metamask.getSigner();
const musitNFT = new ethers.Contract(
	MusitNFT.contractAddress,
	MusitNFT.abi,
	signer
);

export default class Ethers {
  static async test() {
    try {
			// const result = await musitNFT.mintsPerWallet()
			// console.log(result);
			
			// console.log(ethers.utils.formatUnits(mintingEstGas));
			// console.log(ethers.utils.formatUnits(gasPrice));
			
      const options = {
        value: ethers.utils.parseEther("0.01"),
      }
      console.log (await musitNFT.minting("tokenURI", options));
			
    } catch (error) {
      console.log(error);
			return "🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬";
    }
  }
	
	static async signToVerify (message: string): Promise<boolean | string >{
		try {
			let messageHash = ethers.utils.solidityKeccak256(['string'], [message]);
			let arrayMessage = ethers.utils.arrayify(messageHash);
			const singedMessage = await signer.signMessage(messageHash);
			const result = ethers.utils.verifyMessage(arrayMessage, singedMessage) === await signer.getAddress();
			console.log(result);
			return result;
		} catch (error) {
			console.log(error);
			return ""
		}
	}

  static async minting(tokenURI: string) {
    try {
			const mintingEstGas = await musitNFT.estimateGas.minting(tokenURI, {value: musitNFT.mintPrice()})
			const gasPrice = await signer.getGasPrice() 
			
			// console.log(ethers.utils.formatUnits(mintingEstGas));
			// console.log(ethers.utils.formatUnits(gasPrice));
			
      const options = {
        value: ethers.utils.parseEther("0.01"),
        gasPrice: gasPrice,
      }
      return await musitNFT.minting("tokenURI", options);
    } catch (error) {
      console.log(error);
			return "";
    }
  }

	// static async sendTx(recieverAddress: string, amountEth: number) {
	// 	try {
  //     const gas_price = await signer.getGasPrice()
  //     const gas_limit = ethers.utils.hexlify(21000)
  //     const nonce = await signer.getTransactionCount()
  //     const value = ethers.utils.parseEther(String(amountEth))
  //     const tx = {
  //       from: signer.getAddress(),
  //       to: recieverAddress,
  //       value: value,
  //       nonce: nonce,
  //       gasLimit: gas_limit,
  //       gasPrice: gas_price,
  //     }
	// 		return await signer.sendTransaction(tx)
	// 	} catch (error) {
	// 		console.log(error);
	// 		return "";
	// 	}
	// }

	static async getContractAddress() {
		try {
			return musitNFT.address;
		} catch (error) {
			console.log(error);
			return "";
		}
	}
  
	static async getTotalSupplied() {
		try {
			return await musitNFT.totalSupplied();
		} catch (error) {
			console.log(error);
			return "";
		}
	}

	static async getMaxMintsPerWallet() {
		try {
			return parseInt(await musitNFT.maxMintsPerWallet(), 16);
		} catch (error) {
			console.log(error);
			return "";
		}
	}

	static async getMaxSupply() {
		try {
			return parseInt(await musitNFT.maxSupply(), 16);
		} catch (error) {
			console.log(error);
			return "";
		}
	}

	static async getMintPrice() {
		try {
			const mintPrice = await musitNFT.mintPrice();
			return ethers.utils.formatEther(mintPrice);
		} catch (error) {
			console.log(error);
			return "";
		}
	}
}
