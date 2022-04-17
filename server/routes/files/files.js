const express = require("express");
const multer = require("multer");
const ipfsClient = require("./ipfs");
const { imgUpload, audioUpload } = require("./s3upload");
const files = express.Router();

files.post("/upload/img", (req, res, next) => {
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
    if (req.body.artist_address !== undefined && req.body.audio_ipfs_hash !== undefined) {
      const ipfs = ipfsClient();
      const metadata = JSON.stringify({
        artist_address : req.body.artist_address,
        audio_ipfs_hash : req.body.audio_ipfs_hash
      })
      const result = await ipfs.add(metadata);
      return res.send(result);
    } else {
      res.send(400, "Improper metadata");
    }
  } catch (error) {
    res.send(500, "Upload metadata failed");
  }
});



module.exports = files;
