const ipfsAPI = require("ipfs-api");

const fs = require('fs')
const options = {
	host: "ipfs.infura.io",
	port: 5001,
	protocol: "https",
};

const ipfs = ipfsAPI(options)

let testFile = fs.readFileSync("ipfs_upload_testfile.txt", "utf-8")

let testBuffer = Buffer.from(testFile)

ipfs.add(testBuffer, (err, file) => {
  if(err) {
    console.log(err)
  }
  console.log(file)
})

// ipfs.files.add(testFile, (err, file) => {
//   if(err) {
//     console.log(err)
//   }
//   console.log(file)
// })