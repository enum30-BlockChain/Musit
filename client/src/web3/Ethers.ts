import {ethers} from "ethers";

const MusitNFT = require("./MusitNFT.json");
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

interface Window {
  ethereum: any;
}
declare let window: Window;

const provider = new ethers.providers.AlchemyProvider("ropsten", ALCHEMY_API_KEY);
const contract = new ethers.Contract(MusitNFT.contractAddress, MusitNFT.abi, provider);

export default class Ethers {

  static async getAccount () {
    try {
      return await provider.getSigner();
    } catch (error) {
      console.log(error)
      return ""
    }
  }

  static async setIsMintEnabled (setIsMintEnabled: boolean) {
    const data = contract
    console.log(data)
  }
}