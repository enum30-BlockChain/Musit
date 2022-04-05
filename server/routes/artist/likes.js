const express = require("express");
const router = express.Router();

const { ArtistLike, Artist } = require("../../models/index");

/* GET ArtistLike listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/list", async (req, res, next) => {
  console.log("artists/likes/like");
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

router.post("/list/detail", async (req, res, next) => {
  try {
    const artistdetail = await Artist.findAll({
      include: { model: ArtistLike, where: { user_address: req.body.address } },
    });
    res.send(artistdetail);
  } catch (err) {
    console.error(err);
  }
});

router.post("/like", async (req, res, next) => {
  console.log(11111111111111);
  console.log(req.body);
  console.log(11111111111111);
  try {
    const artist = await ArtistLike.findOne({
      where: {
        artist_artist_name: req.body.selected,
        user_address: req.body.address,
      },
    });
    if (artist == null) {
      const artist = await ArtistLike.create({
        Id: req.body.likeSelect,
        artist_artist_name: req.body.likeSelect,
        user_address: req.body.address,
      });
      const artistlike = await ArtistLike.findAll({
        include: {
          model: Artist,
          where: { artist_name: req.body.likeSelect },
        },
      });
      const likesup = await Artist.update(
        {
          likes: artistlike.length,
        },
        {
          where: {
            artist_name: req.body.likeSelect,
          },
        }
      );
    } else {
      var artistdelete = await ArtistLike.destroy({
        where: {
          artist_artist_name: req.body.likeSelect,
          user_address: req.body.address,
        },
      });
      const artistlike = await ArtistLike.findAll({
        include: {
          model: Artist,
          where: { artist_name: req.body.likeSelect },
        },
      });
      var artistdowndate = await Artist.update(
        {
          likes: artistlike.length,
        },
        {
          where: {
            artist_name: req.body.likeSelect,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
