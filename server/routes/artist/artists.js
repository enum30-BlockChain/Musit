const express = require("express");
const router = express.Router();
const likesRouter = require("./likes");
const { Artist, ArtistLike, Music } = require("../../models/index");

router.use("/likes", likesRouter);

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

//아티스트가 본인 좋아요 수 확인하기 위한 api
router.post("/like", async (req, res, next) => {
  console.log(req.body.address);
  try {
    console.log("http://localhost:5000/artists/like 요청함");
    const artist = await ArtistLike.findAll({
      include: { model: Artist, where: { user_address: req.body.address } },
    });
    // console.log(artist);
    console.log(artist.length);
    res.send(artist);
    const likes = await Artist.findAll({
      where: {
        user_address: req.body.address,
      },
    });
    console.log(likes);
    const likesup = await Artist.update(
      {
        likes: artist.length,
      },
      {
        where: {
          user_address: req.body.address,
        },
      }
    );
    console.log(likesup);
  } catch (err) {
    console.error(err);
  }
});

//아티스트 회원 가입
router.post("/signup", async (req, res, next) => {
  try {
    console.log("signup을 server에 요청하였습니다.");
    const artist = await Artist.findOne({
      where: {
        user_address: req.body.address,
      },
    });
    if (req.body.address == "") {
      res.send("Artist address null");
    } else if (artist) {
      res.send("Already Existed");
    } else {
      await Artist.create({
        artist_name: req.body.nickname,
        user_address: req.body.address,
      });
      res.send("Created successfully");
    }
  } catch (err) {
    console.error(err);
  }
});

//아티스트 회원가입내용 조회
router.get("/list", async (req, res, next) => {
  try {
    const findname = await Artist.findAll();
    res.send(findname);
  } catch (err) {
    console.error(err);
  }
});

//아티스트 signin 과 list 합치는거 여부 체크
router.post("/signin", async (req, res, next) => {
  console.log(req.body.address);
  try {
    console.log("signin을 server에 요청하였습니다.");
    const artist = await Artist.findOne({
      where: {
        user_address: req.body.address,
      },
    });
    res.send(artist);
  } catch (err) {
    console.error(err);
  }
});

router.post("/music", async (req, res, next) => {
  console.log(req.body);
  try {
    const music = await Music.findOne({
      where: {
        artist_name: req.body.nickname,
      },
    });
    res.send(music);
  } catch (err) {
    console.error(err);
  }
});
/* GET Artist listing. */

module.exports = router;
