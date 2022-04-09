var express = require("express");
const router = express.Router();
const { MusicLike, Music, User, Artist } = require("../../models/index");

/* Create */
router.post("/", async (req, res, next) => {
  try {
		// 필수 입력 값 확인
    if (req.body.ipfs_hash.trim() === "") {
			res.send(400, "Empty ipfs hash");
		} else if (req.body.title.trim() === "") {
			res.send(400, "Empty title");
		} else if (req.body.img_file.trim() === "") {
			res.send(400, "Empty img file");
		} else if (typeof req.body.genre !=="object" && req.body.genre.length === 0) {
			res.send(400, "Empty genre");
		} else if (req.body.artist_name.trim() === "") {
			res.send(400, "Empty artist name");
		} else {
      const result = await Music.create(req.body);
      res.send(result);
    }
  } catch (err) {
    console.log(err);
    res.send(500, "Create new music failed");
  }
});

/* Read */
router.get("/", async (req, res, next) => {
  try {
    const songList = await Music.findAll({
      include: [
        { model: Artist, include: { model: User } },
        {
          model: MusicLike,
        },
      ],
    });
    res.send(songList);
  } catch (err) {
    console.log(err);
    res.send(500, "Read music list failed");
  }
});

router.get("/:ipfs_hash", async (req, res, next) => {
  try {
    const songInfo = await Music.findOne({
			where: req.params.ipfs_hash,
			include: [{ model: MusicLike }],
		});
    console.log(songInfo);
    res.send(songInfo);
  } catch (err) {
    console.log(err);
    res.send(500, "Read music info failed");
  }
});


/* Update */
router.patch("/", async (req, res, next) => {
  try {
    const data = req.body;
    console.log(data);
    await Music.update(
      req.body,
      { where: { ipfs_hash: data.music_link } }
    );
    res.send({ result: 0, message: "수정이 완료되었습니다." });
  } catch (err) {
    console.log(err);
    res.send({ result: 2, message: "에러*_* 다시해주셈" });
  }
});

/* Delete */
router.delete("/:ipfs_hash", async (req, res, next) => {
  try {
    await Music.destroy({where: req.params.ipfs_hash})
    res.send(200, "Delete Success")
  } catch (err) {
    console.error(err);
    res.send(500, "Delete music failed")
  }
})

module.exports = router;
