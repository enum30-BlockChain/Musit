const express = require("express");
const multer = require("multer");
const { imgUpload, audioUpload } = require("./s3upload");
const { create } = require("ipfs-http-client");
const files = express.Router();

async function ipfsClient() {
	//ipfs 서버연결
	const ipfs = await create({
		host: "ipfs.infura.io",
		port: 5001,
		protocol: "https",
	});
	return ipfs;
}

const postAudio = async (audioFile) => {
	//multer하고 s3저장후 링크가져오기
	let ipfs = await ipfsClient();
	let result = await ipfs.add(audioFile);
	return result
};

files.post("/imgupload", (req, res, next) => {
	try {
		imgUpload(req, res, function (err) {
			if (err instanceof multer.MulterError) {
				return res.send(400, "Upload img failed");
			}
			// console.log(req.file)
			// console.log("원본파일명 : " + req.file.originalname);
			// console.log("저장파일명 : " + req.file.filename);
			// console.log("크기 : " + req.file.size);
			// console.log('경로 : ' + req.file.location) //s3 업로드시 업로드 url을 가져옴
			return res.send(req.file.location);
		});
	} catch (error) {
		res.send(500, "Upload img failed");
	}
});

files.post("/audioupload", (req, res, next) => {
	try {
		audioUpload(req, res, async (err) => {
			if (err instanceof multer.MulterError) {
				return res.send(400, "Upload audio failed")
			}
			const ipfs = await create({
				host: "ipfs.infura.io",
				port: 5001,
				protocol: "https",
			});
			const result = await ipfs.add(req.file.buffer)
			console.log(result)
			return res.send(result.path)
		})
	} catch (error) {
		res.send(500, "Upload audio failed");
	}
});

module.exports = files;
