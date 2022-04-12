var express = require("express");
const router = express.Router();
const { MusicLike, Music, User, Artist } = require("../../models/index");
const likesRouter = require("./likes.js");

/* Music Likes Router */
router.use("/likes", likesRouter);

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
    } else if (
      typeof req.body.genre !== "object" &&
      req.body.genre.length === 0
    ) {
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
router.patch("/:ipfs_hash", async (req, res, next) => {
  try {
    if (req.body.ipfs_hash) {
      res.send(400, "Cannot change music file");
    } else if (req.body.title !== undefined && req.body.title.trim() === "") {
      res.send(400, "Empty title");
    } else if (req.body.img_file !== undefined && req.body.img_file.trim() === "") {
      res.send(400, "Empty img file");
    } else if (
      req.body.genre !== undefined &&
      typeof req.body.genre !== "object" &&
      req.body.genre.length === 0
    ) {
      res.send(400, "Empty genre");
    } else if (req.body.artist_name !== undefined && req.body.artist_name.trim() === "") {
      res.send(400, "Empty artist name");
    } else {
    console.log(req.params.ipfs_hash);
    console.log(req.body);
      await Music.update(req.body, {
        where: { ipfs_hash: req.params.ipfs_hash },
      });
      res.send("Update music info success");
    }
  } catch (err) {
    console.log(err);
    res.send(500, "Update music info failed");
  }
});

/* Delete */
router.delete("/:ipfs_hash", async (req, res, next) => {
  try {
    await Music.destroy({ where: req.params.ipfs_hash });
    res.send(200, "Delete Success");
  } catch (err) {
    console.error(err);
    res.send(500, "Delete music failed");
  }
});

module.exports = router;
