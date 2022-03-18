const express = require("express");
const multer = require("multer");
const upload = require("./s3upload");
const files = express.Router();

const { Music } = require("../../models/index.js");

files.post("/imgupload", (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return next(err);
    } else if (err) {
      return next(err);
    }
    // console.log(req.file)
    // console.log("원본파일명 : " + req.file.originalname);
    // console.log("저장파일명 : " + req.file.filename);
    // console.log("크기 : " + req.file.size);
    // console.log('경로 : ' + req.file.location) s3 업로드시 업로드 url을 가져옴
    return res.send({
      downLoadLink: req.file.location,
    });
  });
});

files.post("/create", async (req, res, next) => {
  try {
    const data = req.body;
    const artist_name = await Music.findOne({
      where: { ipfs_hash: data.music_link },
    });
    if (!artist_name) {
      //아티스트가있으면 crate
      await Music.create({
        ipfs_hash: data.music_link,
        title: data.music_title,
        play_time: data.music_duration,
        play_count: 0,
        like: 0,
        artist_name: data.artist_name,
        img_file: data.cover_img_link,
      });
      res.send({ result: 0, message: "정상등록이완료되었습니다." });
    } else {
      res.send({ result: 1, message: "이미등록된 음원입니다." });
    }
  } catch (err) {
    console.log(err)
    res.send({ result: 2, message: '에러*_* 다시해주셈'});
  }
});

module.exports = files;
