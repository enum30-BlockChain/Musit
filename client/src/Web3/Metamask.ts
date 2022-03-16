import Web3 from "web3";
interface Window {
  ethereum: any;
  web3: any;
}
declare let window: Window;

export default class Metamask {
  // 연결된 지갑 디앱 실행하기
  static enableEthereum = () =>
    new Promise((resolve, reject) => {
      let provider;
      let selectedAccount: string;
      let currentChainId: string;
      try {
        // modern web3
        if (window.ethereum) {
          console.log("Modern web3 is installed");
          provider = window.ethereum;
          provider
            .request({ method: "eth_requestAccounts" }) // enable web3
            .then((accounts: string[]) => {
              selectedAccount = accounts[0];
              console.log(`Selected account is ${selectedAccount}`);
            });
          provider
            .request({ method: "eth_chainId" })
            .then((chainId: string) => {
              currentChainId = chainId;
              console.log(`Current Network: ${currentChainId}`);
            });
          
          this.handlingChanges();
        }
        // legacy web3
        else if (window.web3) {
          console.log("Legacy web3 is installed");
          provider = window.web3;
        }
        // Test network
        else {
          console.log("Web3 test network");
          provider = new Web3.providers.HttpProvider("http://localhost:8545");
        }
        const web3 = new Web3(provider);
        resolve(web3);
      } catch (error) {
        reject(error);
      }
    });

  // 연결된 지갑 주소 배열 불러오기
  static getAccounts = () =>
    new Promise((resolve, reject) => {
      try {
        if (window.ethereum) {
          const provider = window.ethereum;
          let accounts;
          provider
            .request({ method: "eth_requestAccounts" })
            .then((response: string[]) => {
              accounts = response;
              resolve(accounts);
            });
        } else {
          resolve(undefined);
        }
      } catch (error) {
        reject(error);
      }
    });

  // 연결된 네트워크 아이디 불러오기
  static getChainId = () =>
    new Promise((resolve, reject) => {
      try {
        if (window.ethereum) {
          const provider = window.ethereum;
          provider.request({method: "eth_chainId"}).then((chainId: string) => {
            resolve(chainId);
          })
        }
      } catch (error) {
        reject(error);
      }
    });

  static handlingChanges = () => {
    if (window.ethereum) {
      const provider = window.ethereum;
      provider.on("accountsChanged", (accounts: string[]) => {
        console.log(`Selected account is changed to ${accounts[0]}`);
      });
      provider.on("chainChanged", (chainId: string) => {
        console.log(`Network is changed to ${chainId}`);
      });
    }
  }
}

