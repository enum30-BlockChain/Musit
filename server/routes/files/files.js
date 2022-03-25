const express = require("express");
const multer = require("multer");
const upload = require("./s3upload");
const files = express.Router();

const { Music, Artist, MusicLike, User } = require("../../models/index.js");

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
    // console.log('경로 : ' + req.file.location) //s3 업로드시 업로드 url을 가져옴
    return res.send({
      downLoadLink: req.file.location,
    });
  });
});

files.post("/create", async (req, res, next) => {
  try {
    const data = req.body;
    console.log(data);
    const ipfs_hash = await Music.findOne({
      where: { ipfs_hash: data.music_link },
    });
    if (!ipfs_hash) {
      //ipfs_hash가있으면 crate
      await Music.create({
        ipfs_hash: data.music_link,
        title: data.music_title,
        play_time: data.music_duration,
        play_count: 0,
        likes: 0,
        artist_name: data.artist_name,
        img_file: data.cover_img_link,
        Genre: data.music_genre.join(),
      });
      res.send({ result: 0, message: "정상등록이완료되었습니다." });
    } else {
      res.send({ result: 1, message: "이미등록된 음원입니다." });
    }
  } catch (err) {
    console.log(err);
    res.send({ result: 2, message: "에러*_* 다시해주셈" });
  }
});

files.post("/modify", async (req, res, next) => {
  try {
    const data = req.body;
    console.log(data);
    await Music.update(
      {
        ipfs_hash: data.music_link,
        title: data.music_title,
        play_time: data.duration,
        play_count: data.count,
        img_file: data.cover_img_link,
        Genre: data.genre.join(),
        artist_name: data.artist_name,
      },
      { where: { ipfs_hash: data.music_link } }
    );
    res.send({ result: 0, message: "수정이 완료되었습니다." });
  } catch (err) {
    console.log(err);
    res.send({ result: 2, message: "에러*_* 다시해주셈" });
  }
});

files.get("/", async (req, res, next) => {
  try {
    const songList = await Music.findAll({
      include: [
        { model: Artist },
        {
          model: MusicLike,
        },
      ],
    });
    res.send(songList);
  } catch (err) {
    next(err);
    console.log(err);
  }
});

files.post("/likesong", async (req, res, next) => {
  console.log(req.body.name);
  try {
    const songList = await Music.findAll({
      include: {
        model: Artist,
        where: {
          artist_name: req.body.name,
        },
      },
    });
    console.log(songList)
    res.send(songList);
  } catch (err) {
    next(err);
    console.log(err);
  }
});

files.post("/myplay", async (req, res, next) => {
  console.log(req.body);
  console.log(req.body.address);
  console.log(req.body.song[0]);
  try {
    const songList = await Music.findOne({
      include: [
        {
          model: MusicLike,
          where: {
            ipfs_hash: req.body.song[0],
            user_address: req.body.address,
          },
        },
      ],
    });
    console.log(songList);
    res.send(songList);
  } catch (err) {
    next(err);
    console.log(err);
  }
});

module.exports = files;
