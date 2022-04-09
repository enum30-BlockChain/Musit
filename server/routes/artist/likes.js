const express = require("express");
const router = express.Router();

const { ArtistLike, Artist } = require("../../models/index");

/* Create */
router.post("/", async (req, res, next) => {
  try {
    // 필수 입력 값 확인
		if (req.body.user_address.trim() === "") {
			res.send(400, "Incorrect address");
		} else if (req.body.user_address.trim() === "") {
			res.send(400, "Empty nickname");
		} else {
      const result = await ArtistLike.create(req.body)
      res.send(result)
    }
  } catch (err) {
    res.send(500, "Create new aritst-like failed")
  }
})

/* Read */
router.get("/", async (req, res, next) => {
  try {
    const artistlike = await ArtistLike.findAll();
    res.send(artistlike);
  } catch (err) {
    console.error(err);
    res.send(500, "Read artist-like list falied")
  }
});

router.get("/:artist_name", async (req, res, next) => {
  try {
    const artistlike = await ArtistLike.findAll({
			where: { artist_name: req.params.artist_name },
		});
    res.send(artistlike);
  } catch (err) {
    console.error(err);
    res.send(500, "Read artist-like list falied")
  }
});

/* Delete */
router.delete("/:artist_name", async (req, res, next) => {
  try {
    const result = await ArtistLike.destroy({
			where: { 
        artist_name: req.params.artist_name,
        user_name: req.body.user_address
      },
		});
    if(result) {
      res.send("Delete artist-like success");
    } else {
      res.send(400, "Delete artist-like failed")
    }
  } catch (err) {
    console.error(err);
    res.send(500, "Delete artist-like list falied")
  }
});

module.exports = router;
