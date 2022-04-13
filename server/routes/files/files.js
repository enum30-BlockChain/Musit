const express = require("express");
const multer = require("multer");
const ipfsClient = require("./ipfs");
const { imgUpload, audioUpload } = require("./s3upload");
const files = express.Router();

files.post("/upload/img", (req, res, next) => {
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

files.post("/upload/audio", (req, res, next) => {
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

files.post("/upload/metadata", async (req, res, next) => {
  try {
    console.log(1111);
    const ipfs = ipfsClient();
    const metadata = JSON.stringify(req.body)
    console.log(metadata);
    const result = await ipfs.add(metadata);
    console.log(result);
    return res.send(result);
  } catch (error) {
    res.send(500, "Upload audio failed");
  }
});



module.exports = files;
