const express = require("express");
const router = express.Router();

const { ArtistLike, Artist } = require("../../models/index");

/* GET ArtistLike listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/list", async (req, res, next) => {
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
    const artist = await ArtistLike.findOne({
      where: {
        artist_artist_name: req.body.likeSelect,
        user_address: req.body.address,
      },
    });
    if (artist == null) {
      const artist = await ArtistLike.create({
        Id: req.body.likeSelect,
        artist_artist_name: req.body.likeSelect,
        user_address: req.body.address,
        likes: req.body.likes,
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
      console.log(likesup);
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
      var artistupdate = await Artist.update(
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
