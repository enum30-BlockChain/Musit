const express = require("express");
const multer = require("multer");
const upload = require("./s3upload");
const files = express.Router();

files.post("/imgupload", (req, res, next) => {
	try {
		upload(req, res, function (err) {
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

module.exports = files;
