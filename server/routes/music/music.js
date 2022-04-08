var express = require("express");
const router = express.Router();
const likesRouter = require("./likes");
const { MusicLike, Music } = require("../../models/index");

/* GET home page. */
router.post("/like", async (req, res, next) => {
  console.log(req.body);
  try {
    const data = req.body;
    const overlap = await Music.findOne({
      //지금노래에서
      where: { ipfs_hash: data.ipfs_hash }, //주소목록 불러서
      include: { model: MusicLike },
    });
    const findMyAddress = overlap.MusicLikes.find(
      (like) => like.user_address === data.address
    );

    if (!findMyAddress) {
      //찾은게 없으면 생성
      await MusicLike.create({
        ipfs_hash: data.ipfs_hash,
        user_address: data.address,
      });
      return res.send("생성완료");
    } else if (findMyAddress) {
      await MusicLike.destroy({
        where: { Id: findMyAddress.Id },
      });
      return res.send("삭제완료");
    }
    res.send(findMyAddress);
  } catch (err) {
    next(err);
    console.log(err);
  }
});

router.post("/add", async (req, res, next) => {
  try {
    const data = req.body;
    await Music.update(
      {
        play_count: data.play_count + 1,
      },
      { where: { ipfs_hash: data.ipfs_hash } }
    );
    res.send("노래 카운트 +1");
  } catch (err) {
    next(err);
    console.log(err);
  }
});
router.use("/likes", likesRouter);
module.exports = router;
