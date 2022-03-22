import {ethers} from "ethers";

interface Window {
  ethereum: any;
}
declare let window: Window;

export default class Ethers {
  static provider = new ethers.providers.Web3Provider(window.ethereum);

  static async getAccounts () {
    if (window.ethereum) {
      try {
        const accounts = await this.provider.listAccounts();
        if(accounts.length > 0) {
          return accounts;
        } else {
          return []
        }
      } catch (error) {
        console.log(error);
      }
      return 
    }
  }

  static async connectMetaMask () {
    if (window.ethereum) {
      await this.provider.send("eth_requestAccounts", [])
    }
  }
}