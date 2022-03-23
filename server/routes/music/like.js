var express = require("express");
const router = express.Router();

const { MusicLike, Music } = require("../../models/index");

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/list", async (req, res, next) => {
  console.log(req.body);
  try {
    const musictlike = await MusicLike.findAll({
      where: {
        user_address: req.body.address,
      },
    });
    res.send(musictlike);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
