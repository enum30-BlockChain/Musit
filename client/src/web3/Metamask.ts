/**
 * Interface declaration
 */
interface Window {
  ethereum: any;
  web3: any;
  location: any;
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
			network = "Ropsten";
			break;
		case ChainId.RINKEBY:
			network = "Rinkeby";
			break;
		case ChainId.GOERLI:
			network = "Goerli";
			break;
		case ChainId.KOVAN:
			network = "Kovan";
			break;
		default:
			network = "Unknown";
			break;
	}
	return network;
};

const shortAddress = (address: string): string => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

/**
 * Class declaration
 */
class Response<T> {
  public data: T;
  public message: string;

  constructor(data: T, message: string) {
    this.data = data;
    this.message = message;
  }
}

export default class Metamask {
	// 연결된 지갑 디앱 실행하기
	static connectWallet = async (setAddress?: Function): Promise<ResponseType<string[]>> => {
		const provider = window.ethereum;
		let accounts: string[];
		if (provider) {
			try {
				accounts = await provider.request({
					method: "eth_requestAccounts",
				});
				if(setAddress) setAddress(accounts[0])

        const message: string = `🦊Metamask is enabled.\n(Address: ${shortAddress(
          accounts[0]
        )})`;
        console.log(message);
        return new Response(accounts, message);
      } catch (error: any) {
        const message: string = "🤬 " + error.message;
        console.log(message);
        return new Response([], message);
      }
    } else {
      const message: string = "🤬You must install Metamask.";
      console.log(message);
      return new Response([], message);
    }
  };

	// 연결된 지갑 주소 배열 불러오기
	static getAccounts = async (setAddress?: Function): Promise<ResponseType<string[]>> => {
		const provider = window.ethereum;
		let accounts: string[];
		if (provider) {
			try {
				accounts = await provider.request({
					method: "eth_accounts",
				});
				if(setAddress) setAddress(accounts[0])
				if (accounts.length > 0) {
					const message: string
            = `🦊Metamask is connected.\n(Address: ${shortAddress(accounts[0])})`;
					console.log(message);
					return new Response(accounts, message);
				} else {
					const message: string = "🤬Metamask is not connected.";
					console.log(message);
					return new Response([], message);
				}
			} catch (error: any) {
				const message: string = "🤬 " + error.message;
				console.log(message);
				return new Response([], message);
			}
		} else {
			const message: string = "🤬You must install Metamask.";
			console.log(message);
			return new Response([], message);
		}
	};

  // 연결된 네트워크 아이디 불러오기
  static getNetwork = async (): Promise<ResponseType<string>> => {
    const provider = window.ethereum;
    let network: string;
    if (provider) {
      try {
        const chainId = await provider.request({
          method: "eth_chainId"
        });
        network = chainIdToNetworkName(chainId);
        const cannotFindMsg =
          "😓Cannot find network!\nMetamask might be not connected.";
        const connectedMsg = `${network} is connected`;
        let message: string =
          network === "unknown" || "" ? cannotFindMsg : connectedMsg;
        console.log(message);
        return new Response(network, message);
      } catch (error: any) {
        const message: string = "🤬 " + error.message;
        console.log(message);
        return new Response("", message);
      }
    } else {
      const message: string = "🤬You must install Metamask.";
      console.log(message);
      return new Response("", message);
    }
  };

	static walletListener = async (setAddress?: Function): Promise<ResponseType<string>> => {
		const provider = window.ethereum;
		if (provider) {
			provider.on("accountsChanged", (accounts: string[]) => {
				if(setAddress) setAddress(accounts[0])
				if(accounts.length > 0) {
					const message: string 
						= `📗Selected account is changed.\n(Address: ${shortAddress(accounts[0])})`;;
					console.log(message);
					return new Response(accounts[0], message);
				} else {
					const message: string 
						= "😖Wallet is disconnected.";;
					console.log(message);
					return new Response("", message);
				}
			});

      provider.on("chainChanged", (chainId: string) => {
        if (chainId) {
          const network = chainIdToNetworkName(chainId);
          const message: string = `🌏Network is changed.\n(New network: ${network})`;
          console.log(message);
          window.location.reload();
          return new Response(network, message);
        }
      });

      const message: string = "🌈Listening on wallet status.";
      console.log(message);
      return new Response("", message);
    } else {
      const message: string = "🤬You must install Metamask.";
      return new Response("", message);
    }
  };
}