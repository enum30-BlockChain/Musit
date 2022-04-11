const express = require("express");
const multer = require("multer");
const ipfsClient = require("./ipfs");
const { imgUpload, audioUpload } = require("./s3upload");
const files = express.Router();

files.post("/imgupload", (req, res, next) => {
  try {
    imgUpload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.send(400, "Upload img failed");
      }
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
