const express = require("express");
const router = express.Router();

const { Artist, ArtistLike, Music } = require("../../models/index");

/* Create */
router.post("/", async (req, res, next) => {
  try {
    // 필수 입력 값 확인
    if (req.body.user_address.trim() === "") {
      res.send(400, "Incorrect address");
    } else if (req.body.artist_name.trim() === "") {
      res.send(400, "Incorrect nickname");
    } else {
      const result = await ArtistLike.create(req.body);
      res.send(result);
    }
  } catch (err) {
    res.send(500, "Create new artist-like failed");
  }
});

/* Read */
router.get("/", async (req, res, next) => {
  try {
    const artistLike = await ArtistLike.findAll();
    res.send(artistLike);
  } catch (err) {
    console.error(err);
    res.send(500, "Read artist-like list falied");
  }
});

router.get("/:user_address", async (req, res, next) => {
  try {
    const artist = await Artist.findAll({
      include: [
        {
          model: ArtistLike,
          where: { user_address: req.params.user_address },
        },
        { model: Music },
      ],
    });
    res.send(artist);
  } catch (err) {
    console.error(err);
    res.send(500, "Read artist-like list falied");
  }
});

/* Delete */
router.delete("/:artist_name", async (req, res, next) => {
  console.log(222222222222222);
  console.log(req.body);
  console.log(222222222222222);
  try {
    const result = await ArtistLike.destroy({
      where: {
        artist_name: req.params.artist_name,
        user_address: req.body.user_address,
      },
    });
    if (result) {
      res.send("Delete artist-like success");
    } else {
      res.send(400, "Delete artist-like failed");
    }
  } catch (err) {
    console.error(err);
    res.send(500, "Delete artist-like list falied");
  }
});

module.exports = router;
