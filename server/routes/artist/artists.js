const express = require("express");
const router = express.Router();
const { Artist, ArtistLike, Music, User } = require("../../models/index");
const likesRouter = require("./likes.js");

/* Artist Likes Router */
router.use("/likes", likesRouter);

/* Create */
router.post("/", async (req, res, next) => {
  try {
    // 필수 입력 값 확인
    if (req.body.user_address.trim() === "") {
      res.send(400, "Incorrect address");
    } else if (req.body.artist_name.trim() === "") {
      res.send(400, "Empty artist name");
    } else {
      const result = await Artist.create(req.body);
      res.send(result);
    }
  } catch (err) {
    console.error(err);
    res.send(500, "Create new artist failed");
  }
});

/* Read */
router.get("/", async (req, res, next) => {
  try {
    const userList = await Artist.findAll({
      include: [{ model: ArtistLike }, { model: Music }],
    });
    res.send(userList);
  } catch (err) {
    res.send(500, "Read artist list falied");
  }
});

router.get("/:user_address", async (req, res, next) => {
  try {
    const userInfo = await Artist.findOne({
      where: { user_address: req.params.user_address },
      include: [{ model: User }, { model: ArtistLike }, { model: Music }],
    });
    res.send(userInfo);
  } catch (err) {
    res.send(500, "Read artist info failed");
  }
});

/* Update */
router.patch("/:user_address", async (req, res, next) => {
  console.log(1111111111);
  console.log(req.body);
  console.log(1111111111);
  try {
    // 입력값에 대한 유효성 검사
    if (req.body.address) {
      res.send(400, "Address is immutable");
    } else if (
      req.body.artist_name !== undefined &&
      req.body.artist_name.trim() === ""
    ) {
      res.send(400, "Empty artist_name");
    } else if (req.body.img !== undefined && req.body.img.trim() === "") {
      res.send(400, "Empty img");
    } else {
      const result = await Artist.update(req.body, {
        where: { user_address: req.params.user_address },
      });
      // Update에 잘못된 내용이 들어가면 0을 반환 => Bad request(400)
      if (result[0] === 0) {
        res.send(400, "Update failed");
      } else {
        res.send("Update artist info success");
      }
    }
  } catch (err) {
    console.error(err);
    res.send(500, "Update artist info failed");
  }
});

/* Delete */
router.delete("/:user_address", async (req, res, next) => {
  try {
    const result = await Artist.destroy({
      where: { user_address: req.params.user_address },
    });
    if (result) {
      res.send("Delete artist-like success");
    } else {
      res.send(400, "Delete artist-like failed");
    }
  } catch (err) {
    console.error(err);
    res.send(500, "Delete artist failed");
  }
});

module.exports = router;
