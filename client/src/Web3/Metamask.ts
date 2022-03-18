/**
 * Interface declaration
 */
interface Window {
  ethereum: any;
  web3: any;
}

interface ResponseType<T> {
  readonly data: T;
  readonly message: string;
}

declare let window: Window;

/**
 * Enum declaration
 */

enum ChainId {
  MAIN = 1,
  ROPSTEN = 3,
  RINKEBY,
  GOERLI,
  KOVAN = 42,
}

/**
 * Function declaration
 */
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
      network = "Unknown";
      break;
  }
  return network;
}


/**
 * Class declaration
 */
class Response <T>{
  public data: T;
  public message: string;

  constructor(data: T, message: string) {
    this.data = data;
    this.message = message;
  }
}

export default class Metamask {
  // 연결된 지갑 디앱 실행하기
  static connectWallet = async (): Promise<ResponseType<string[]>> => {
    const provider = window.ethereum;
    let accountList: string[];
    if (provider) {
      try {
        accountList = await provider.request({
          method: "eth_requestAccounts",
        });
        const message: string = `🦊Metamask is enabled.\n(Address: ${accountList[0].slice(0,5)}...${accountList[0].slice(-3)})`;

        return new Response(accountList, message);
      } catch (error: any) {
        const message = "🤬 " + error.message;
        return new Response([""], message);
      }
    } else {
      const message: string =
        "🤬You must install Metamask.";
      return new Response([""], message);
    }
  };

  // 연결된 지갑 주소 배열 불러오기
  static getAccounts = async (): Promise<ResponseType<string[]>> => {
    const provider = window.ethereum;
    let accountList: string[];
    if (provider) {
      try {
        accountList = await provider.request({
          method: "eth_accounts",
        });
        if (accountList.length > 0) {
          const message = `🦊Metamask is connected.\n(Address: ${accountList[0].slice(0,5)}...${accountList[0].slice(-3)})`;
          return new Response(accountList, message);
        } else {
          const message = "🤬Metamask is not connected.";
          return new Response([""], message);
        }
      } catch (error: any) {
        return new Response([""], error.message);
      }
    } else {
      const message =
        "🤬You must install Metamask.";
      return new Response([""], message);
    }
  };

  // 연결된 네트워크 아이디 불러오기
  static getNetwork = async (): Promise<ResponseType<string>> => {
    const provider = window.ethereum;
    let network: string;
    if (provider) {
      try {
        const chainId = await provider.request({
          method: "eth_chainId",
        });
        network = chainIdToNetworkName(chainId);
        const failMsg =
          "😓Cannot find network!\nMetamask might be not connected.";
        const successMsg = `${network} is connected`;
        return network === "unknown" || ""
          ? new Response(network, failMsg)
          : new Response(network, successMsg);
      } catch (error: any) {
        return new Response("", error.message);
      }
    } else {
      const message =
        "🤬You must install Metamask.";
      return new Response("", message);
    }
  };

  static handlingChanges = async (): Promise<ResponseType<object>> => {
    const provider = window.ethereum;
    if (provider) {
      provider.on("accountsChanged", (accountList: string[]) => {
        const message = `📗Selected account is changed.\n(New address: ${accountList[0].slice(0,5)}...${accountList[0].slice(-3)})`;
        console.log(message);
        return new Response({address: accountList[0]}, message);
      });
      provider.on("chainChanged", (chainId: string) => {
        const network = chainIdToNetworkName(chainId);
        const message = `🌏Network is changed.\n(New network: ${network})`;
        console.log(message);
        return new Response({network}, message);
      });
      const message = "🌈Listening on wallet status."
      console.log(message);
      return new Response({}, message);
    } else {
      const message =
        "🤬You must install Metamask.";
      return new Response({}, message);
    }
  };
}
