var express = require("express");
const router = express.Router();

const { MusicLike, Music } = require("../../models/index");

router.post("/like", async (req, res, next) => {
  console.log(req.body.address);
  try {
    const songind_ipfs = await Music.findAll({
      include: { model: MusicLike, where: { user_address: req.body.address } },
    });
    res.send(songind_ipfs);
  } catch (err) {
    console.error(err);
  }
});

router.post("/likedetail", async (req, res, next) => {
  console.log("server에서 likedetail 요청하였습니다.");
  console.log(req.body.select);
  try {
    const songind_ipfs = await Music.findAll({
      include: { model: MusicLike, where: { ipfs_hash: req.body.select } },
    });
    console.log(11111111);
    console.log(songind_ipfs);
    console.log(11111111);
    res.send(songind_ipfs);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
