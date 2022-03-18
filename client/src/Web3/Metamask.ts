interface Window {
  ethereum: any;
  web3: any;
}

interface ResponseType<T> {
  readonly data: T;
  readonly message: string;
}

declare let window: Window;

class Response <T>{
  public data: T;
  public message: string;

  constructor(data: T, message: string) {
    this.data = data;
    this.message = message;
  }
}

enum ChainId {
  MAIN,
  ROPSTEN = 3,
  RINKEBY,
  GOERLI,
  KOVAN = 42,
}

const chainIdToNetworkName = (chainId: string): string => {
  let network: string;
  switch (parseInt(chainId, 16)) {
    case ChainId.MAIN:
      network = "Mainnet";
      break;
    case ChainId.ROPSTEN:
      network = "Ropsten_Test_Network";
      break;
    case ChainId.RINKEBY:
      network = "Ropsten_Test_Network";
      break;
    case ChainId.GOERLI:
      network = "Goerli_Test_Network";
      break;
    case ChainId.KOVAN:
      network = "Kovan_Test_Network";
      break;
    default:
      network = "";
      break;
  }
  return network;
}

class Metamask {
  // 연결된 지갑 디앱 실행하기
  static enableEthereum = async (): Promise<ResponseType<string>> => {
    const provider = window.ethereum;
    let accountList: string[];
    if (provider) {
      try {
        accountList = await provider.request({
          method: "eth_requestAccounts",
        });
        const message: string = `Metamask🦊 is enabled and connected with ${accountList[0]}`;

        return new Response(accountList[0], message);
      } catch (error: any) {
        const message = "😥 " + error.message;
        return new Response("", message);
      }
    } else {
      const message: string =
        "You must install Metamask🦊, a virtual Ethereum wallet, in your browser.";
      return new Response("", message);
    }
  };

  // 연결된 지갑 주소 배열 불러오기
  static getAccounts = async (): Promise<ResponseType<string>> => {
    const provider = window.ethereum;
    let accountList: string[];
    if (provider) {
      try {
        accountList = await provider.request({
          method: "eth_accounts",
        });
        if (accountList.length > 0) {
          const message = "Metamask🦊 is connected. Returns connected account.";
          return new Response(accountList[0], message);
        } else {
          const message = "Metamask🦊 is not connected.";
          return new Response("", message);
        }
      } catch (error: any) {
        return new Response("", error.message);
      }
    } else {
      const message =
        "You must install Metamask🦊, a virtual Ethereum wallet, in your browser.";
      return new Response("", message);
    }
  };

  // 연결된 네트워크 아이디 불러오기
  static getChainId = async (): Promise<ResponseType<string>> => {
    const provider = window.ethereum;
    let network: string;
    if (provider) {
      try {
        const chainId = await provider.request({
          method: "eth_chainId",
        });
        network = chainIdToNetworkName(chainId);
        const failMsg =
          "Cannot find network! Metamask🦊 might be not connected.";
        const successMsg = `${network} is connected`;
        return network == ""
          ? new Response(network, failMsg)
          : new Response(network, successMsg);
      } catch (error: any) {
        return new Response("", error.message);
      }
    } else {
      const message =
        "You must install Metamask🦊, a virtual Ethereum wallet, in your browser.";
      return new Response("", message);
    }
  };

  static handlingChanges = async (): Promise<ResponseType<object>> => {
    const provider = window.ethereum;
    if (provider) {
      provider.on("accountsChanged", (accounts: string[]) => {
        const message = `Selected account is changed to ${accounts[0]}`;
        console.log(message);
        return new Response({address: accounts[0]}, message);
      });
      provider.on("chainChanged", (chainId: string) => {
        const message = `Network is changed to ${chainId}`;
        console.log(message);
        const network = chainIdToNetworkName(chainId);
        return new Response({network}, message);
      });
      const message = "Listening to changes of account/network."
      return new Response({}, message);
    } else {
      const message =
        "You must install Metamask🦊, a virtual Ethereum wallet, in your browser.";
      return new Response({}, message);
    }
  };
}

export default Metamask;
