const ipfsAPI = require("ipfs-api")

//read file
const fs = require('fs');

const options = {
	host: "ipfs.infura.io",
	port: 5001,
	protocol: "https"
	// auth: projectId + ":" + projectSecret,
};

//ipfs importing
const ipfs = ipfsAPI(options)

//read file
let testFile = fs.readFileSync('test.txt', 'utf8')

//input buffer
let testBuffer = Buffer.from(testFile); //new Buffer -> Buffer.from

let imgfiles = [
	{
		name: "music.jpeg",
		lastModified: 1646984136029,
		lastModifiedDate: "2022-03-11T07:35:36.029Z",
		webkitRelativePath: "",
		size: 71713,
		type: "image/jpeg",
	},
	{
		name: "picachu.jpg",
		lastModified: 1648091800925,
		lastModifiedDate: "2022-03-24T03:16:40.925Z",
		webkitRelativePath: "",
		size: 44842,
		type: "image/jpeg",
	},
	{
		name: "cat-dog.jpg",
		lastModified: 1648091849050,
		lastModifiedDate: "2022-03-24T03:17:29.050Z",
		webkitRelativePath: "",
		size: 47237,
		type: "image/jpeg",
	},
];

//upload file to ipfs
const upload = (files) => {
	const bufferedFiles = Buffer.from(files)
	ipfs.add(bufferedFiles, (err, file) => {
		if (err) {
			console.log(err);
		}
		console.log(file);
		return file
	});
};
upload(imgfiles)

const testFunc = async (CID) => {
    const bufferedContents = await (ipfs.cat(CID))
		console.log(bufferedContents)
		const stringContents = (await Buffer.from(bufferedContents)).toString();
    return stringContents
}

testFunc("Qmbc5Y9TNGqi5DtNijparBACJ35nK3akX4FrGc2EkMMbkU")