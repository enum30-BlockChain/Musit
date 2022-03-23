var express = require("express");
const router = express.Router();

const { MusicLike, Music } = require("../../models/index");

router.post("/like", async (req, res, next) => {
  console.log(req.body.address);
  try {
    const songind_ipfs = await Music.findAll({
      include: { model: MusicLike, where: { user_address: req.body.address } },
    });
    console.log(songind_ipfs);
    res.send(songind_ipfs);
  } catch (err) {
    console.error(err);
  }
});

// router.post("/likesong", async (req, res, next) => {
//   console.log(req.body.likesong);

//   try {
//     const song = await Music.findAll({
//       where: { user_address: req.body.address },
//     });
//     res.send(song);
//   } catch (err) {
//     console.error(err);
//   }
// });

module.exports = router;
