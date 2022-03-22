const express = require("express");
const router = express.Router();
const { ArtistLike, Artist } = require("../models/index");

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
      const artistlike = await ArtistLike.findAll({
        include: {
          model: Artist,
          where: { artist_name: req.body.likeSelect },
        },
      });
      console.log(artistlike);
      console.log(11111111111111111);
      console.log(artistlike.length);
      console.log(11111111111111111);
      const likes = await Artist.findAll({
        where: {
          artist_name: req.body.likeSelect,
        },
      });
      const likesup = await Artist.update(
        {
          likes: artistlike.length++,
        },
        {
          where: {
            artist_name: req.body.likeSelect,
          },
        }
      );
      console.log(likesup);
    }
    // else if (artist !== null) {
    //   const artistdelete = await ArtistLike.destroy(
    //     {
    //       artist_artist_name: req.body.likeSelect,
    //     },
    //     { where: { artist_name: req.body.likeSelect }, truncate: true }
    //   );
    // }
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
