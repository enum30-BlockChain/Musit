const express = require("express");
const router = express.Router();
const { Artist } = require("../models/index");

/* GET Artist listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

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

router.get("/artistList", async (req, res, next) => {
  try {
    const findname = await Artist.findAll();
    res.send(findname);
  } catch (err) {
    console.error(err);
  }
});

router.post("/like", async (req, res, next) => {
  try {
    console.log("like을 server에 요청하였습니다.");
    console.log(req.body.likeSelect);
    const artist = await Artist.findOne({
      where: {
        artist_name: req.body.likeSelect,
      },
    });
    console.log(artist.dataValues);
    Artist.update(
      {
        likes: artist.dataValues.likes + 1,
      },
      {
        where: { artist_name: req.body.likeSelect },
      }
    );
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
