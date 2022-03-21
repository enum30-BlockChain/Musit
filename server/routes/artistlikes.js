const express = require("express");
const router = express.Router();
const { ArtistLike } = require("../models/index");

/* GET ArtistLike listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/list", async (req, res, next) => {
  console.log(req.body);
  try {
    const artistlike = await ArtistLike.findAll({
      where: {
        user_address: req.body.address,
      },
    });
    res.send(artistlike);
  } catch (err) {
    console.error(err);
  }
});

router.post("/like", async (req, res, next) => {
  try {
    console.log("like을 server에 요청하였습니다.");
    console.log(req.body);
    console.log(req.body.likeSelect);
    const artist = await ArtistLike.findOne({
      where: {
        artist_artist_name: req.body.likeSelect,
        user_address: req.body.address,
      },
    });
    res.send(artist);
    if (artist == null) {
      const artist = await ArtistLike.create({
        Id: req.body.likeSelect,
        artist_artist_name: req.body.likeSelect,
        user_address: req.body.address,
        likes: req.body.likes,
      });
      const like = await ArtistLike.update(
        {
          likes: artist.dataValues.likes + 1,
        },
        {
          where: {
            artist_artist_name: req.body.likeSelect,
            user_address: req.body.address,
          },
        }
      );
    } else if (artist.dataValues.likes >= 1) {
      const like = await ArtistLike.update(
        {
          likes: artist.dataValues.likes - 1,
        },
        {
          where: {
            artist_artist_name: req.body.likeSelect,
            user_address: req.body.address,
          },
        }
      );
    } else {
      const like = await ArtistLike.update(
        {
          likes: artist.dataValues.likes + 1,
        },
        {
          where: {
            artist_artist_name: req.body.likeSelect,
            user_address: req.body.address,
          },
        }
      );
      res.send(like);
      console.log(like);
    }
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
