const express = require("express");
const multer = require("multer");
const ipfsClient = require("./ipfs");
const { imgUpload, audioUpload } = require("./s3upload");
const files = express.Router();

files.post("/imgupload", (req, res, next) => {
  console.log(111111111111);
  console.log(req.body);
  console.log(111111111111);
  try {
    imgUpload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.send(400, "Upload img failed");
      }
      console.log(22222222222222);
      console.log(req.file.location);
      console.log(22222222222222);
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
        return res.send(400, "Upload audio failed");
      }
      const ipfs = ipfsClient();
      const result = await ipfs.add(req.file.buffer);

      return res.send(result.path);
    });
  } catch (error) {
    res.send(500, "Upload audio failed");
  }
});

module.exports = files;
