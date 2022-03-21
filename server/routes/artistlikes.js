const express = require("express");
const router = express.Router();
const { ArtistLike } = require("../models/index");

/* GET ArtistLike listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/list", async (req, res, next) => {
  try {
    const findname = await ArtistLike.findAll();
    res.send(findname);
  } catch (err) {
    console.error(err);
  }
});

router.post("/like", async (req, res, next) => {
  try {
    console.log("like을 server에 요청하였습니다.");
    console.log(req.body);
    console.log(req.body.likeSelect);
    const artistlike = await ArtistLike.findOne({
      where: {
        Id: req.body.likeSelect,
      },
    });
    console.log(artistlike);
    await ArtistLike.create({
      Id: req.body.likeSelect,
      artist_artist_name: req.body.likeSelect,
      user_address: req.body.address,
      likes: req.body.likeSelect,
    });
    if (artistlike.dataValues.likes <= 0) {
      console.log(artistlike);
    } else {
      ArtistLike.update(
        {
          likes: artistlike.dataValues.likes - 1,
        },
        {
          where: { artist_name: req.body.likeSelect },
        }
      );
      return res.send(artistlike);
    }

    ArtistLike.update(
      {
        likes: artist.dataValues.likes + 1,
      },
      {
        where: { artist_name: req.body.likeSelect },
      }
    );
    res.send(artist);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
