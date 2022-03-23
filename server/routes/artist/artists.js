const express = require("express");
const router = express.Router();
const likesRouter = require("./likes");
const { Artist, ArtistLike } = require("../../models/index");

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/like", async (req, res, next) => {
  console.log(req.body.address);
  try {
    console.log("signin을 server에 요청하였습니다.");
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

router.use("/likes", likesRouter);
/* GET Artist listing. */

module.exports = router;
