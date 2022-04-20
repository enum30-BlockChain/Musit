const { create } = require("ipfs-http-client");

function ipfsClient() {
	//ipfs 서버연결
	const ipfs = create({
		host: "ipfs.infura.io",
		port: 5001,
		protocol: "https",
	});
	return ipfs;
}

module.exports = ipfsClient;
