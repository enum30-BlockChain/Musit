const express = require("express");
const router = express.Router();
const {
  User,
  Artist,
  Music,
  ArtistLike,
  MusicLike,
} = require("../models/index");

/* Create */
router.post("/", async (req, res, next) => {
  try {
    // 필수 입력 값 확인
    if (req.body.address.trim() === "") {
      res.send(400, "Incorrect address");
    } else if (req.body.nickname.trim() === "") {
      res.send(400, "Empty nickname");
    } else if (req.body.nation.trim() === "") {
      res.send(400, "Empty nation");
    } else {
      const result = await User.create(req.body);
      res.send(result);
    }
  } catch (err) {
    console.error(err);
    res.send(500, "Create new user failed");
  }
});

/* Read */
router.get("/", async (req, res, next) => {
  try {
    const userList = await User.findAll({
      include: [{ model: ArtistLike }, { model: MusicLike }],
    });
    res.send(userList);
  } catch (err) {
    res.send(500, "Read all user list failed");
  }
});

router.get("/:address", async (req, res, next) => {
  try {
    const userInfo = await User.findOne({
      where: { address: req.params.address },
      include: [
        { model: ArtistLike, include: { model: Artist } },
        { model: MusicLike, include: { model: Music } },
      ],
    });
    res.send(userInfo);
  } catch (err) {
    res.send(500, "Read user info failed");
  }
});

/* Update */
router.patch("/:address", async (req, res, next) => {
  console.log(111111111111);
  console.log(req.body);
  console.log(111111111111);
  try {
    // 입력값에 대한 유효성 검사
    if (req.body.address) {
      res.send(400, "Address is immutable");
    } else if (
      req.body.nickname !== undefined &&
      req.body.nickname.trim() === ""
    ) {
      res.send(400, "Empty nickname");
    } else if (req.body.nation !== undefined && req.body.nation.trim() === "") {
      res.send(400, "Empty nation");
    } else if (req.body.img !== undefined && req.body.img.trim() === "") {
      res.send(400, "Empty nation");
    } else {
      const result = await User.update(req.body, {
        where: {
          address: req.params.address,
        },
      });
      console.log(result);
      // Update에 잘못된 내용이 들어가면 0을 반환 => Bad request(400)
      if (result[0] === 0) {
        res.send(400, "Update user info failed");
      } else {
        res.send("Update user info success");
      }
    }
  } catch (err) {
    console.error(err);
    res.send(500, "Update user info failed");
  }
});

/* Delete */
router.delete("/:address", async (req, res, next) => {
  try {
    const result = await User.destroy({
      where: { address: req.params.address },
    });
    if (result) {
      res.send("Delete user success");
    } else {
      res.send(400, "Delete user failed");
    }
  } catch (err) {
    console.error(err);
    res.send(500, "Delete user failed");
  }
});

module.exports = router;
