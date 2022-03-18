interface Window {
  ethereum: any;
  web3: any;
}
declare let window: Window;

interface ConnectMsg {
  address: string;
  status: string;
}

export default class Metamask {
  // 연결된 지갑 디앱 실행하기
  static enableEthereum = async (): Promise<ConnectMsg> => {
    let provider = window.ethereum;
    let accountList: string[];
    if (provider) {
      try {
        accountList = provider.request({
          method: "eth_requestAccounts",
        });
        return {
          address: accountList[0],
          status: "👆🏽 Write a message in the text-field above.",
        };
      } catch (error: any) {
        return {
          address: "",
          status: "😥 " + error.message,
        };
      }
    } else {
      return {
        address: "",
        status: "You must install Metamask🦊, a virtual Ethereum wallet, in your browser."
      }
    }
  };

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
          provider
            .request({ method: "eth_chainId" })
            .then((chainId: string) => {
              resolve(chainId);
            });
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
  };
}
