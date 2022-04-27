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
	static connectWallet = async (): Promise<ResponseType<string[]>> => {
		const metamask = window.ethereum;
		let accounts: string[];
		if (metamask) {
			try {
				accounts = await metamask.request({
					method: "eth_requestAccounts",
				});

				const message: string = `🦊Metamask is enabled.
															\n(Address: ${shortAddress(accounts[0])})`;
				return new Response(accounts, message);
			} catch (error: any) {
				const message: string = "🤬 " + error.message;
				return new Response([], message);
			}
		} else {
			const message: string = "🤬You must install Metamask.";
			return new Response([], message);
		}
	};

	// 연결된 지갑 주소 배열 불러오기
	static getAccounts = async (): Promise<ResponseType<string[]>> => {
		const metamask = window.ethereum;
		let accounts: string[];
		if (metamask) {
			try {
				accounts = await metamask.request({
					method: "eth_accounts",
				});
				if (accounts.length > 0) {
					const message: string = `🦊Metamask is connected.
																	\n(Address: ${shortAddress(accounts[0])})`;
					return new Response(accounts, message);
				} else {
					const message: string = "🤬Metamask is not connected.";
					return new Response([], message);
				}
			} catch (error: any) {
				const message: string = "🤬 " + error.message;
				return new Response([], message);
			}
		} else {
			const message: string = "🤬You must install Metamask.";
			return new Response([], message);
		}
	};

	// 지갑 잔고 확인
	static getBalance = async (address: string): Promise<ResponseType<string[]>> => {
		const metamask = window.ethereum;
		if (metamask) {
			try {
				const balance = await metamask.request({
					method: "eth_getBalance",
					params: [
						address,
						'latest']
				});
				const message: string = `💰Your Balance is ${balance})`;
				return new Response(balance, message);
			} catch (error: any) {
				const message: string = "🤬 " + error.message;
				return new Response([], message);
			}
		} else {
			const message: string = "🤬You must install Metamask.";
			return new Response([], message);
		}
	};

	// 연결된 네트워크 아이디 불러오기
	static getNetwork = async (): Promise<ResponseType<string>> => {
		const metamask = window.ethereum;
		let network: string;
		if (metamask) {
			try {
				const chainId = await metamask.request({
					method: "eth_chainId",
				});
				network = chainIdToNetworkName(chainId);
				const cannotFindMsg =
					"😓Cannot find network!\nMetamask might be not connected.";
				const connectedMsg = `${network} is connected`;
				let message: string =
					network === "unknown" || "" ? cannotFindMsg : connectedMsg;
				return new Response(network, message);
			} catch (error: any) {
				const message: string = "🤬 " + error.message;
				return new Response("", message);
			}
		} else {
			const message: string = "🤬You must install Metamask.";
			return new Response("", message);
		}
	};

	static walletListener = (): ResponseType<string> => {
		const metamask = window.ethereum;
		if (metamask) {
			metamask.on("accountsChanged", (accounts: string[]) => {
				if (accounts.length > 0) {
					const message: string = `📗Selected account is changed.
																\n(Address: ${shortAddress(accounts[0])})`;
					window.location.reload();
					return new Response(accounts[0], message);
				} else {
					const message: string = "😖Wallet is disconnected.";
					window.location.reload();
					return new Response("", message);
				}
			});

			metamask.on("chainChanged", (chainId: string) => {
				if (chainId) {
					const network = chainIdToNetworkName(chainId);
					const message: string = `🌏Network is changed.\n(New network: ${network})`;
					window.location.reload();
					return new Response(network, message);
				}
			});

			metamask.on("message", () => {				
				window.location.reload();
			})

			const message: string = "🌈Listening on wallet status.";
			return new Response("", message);
		} else {
			const message: string = "🤬You must install Metamask.";
			return new Response("", message);
		}
	};
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
