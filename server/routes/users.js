const express = require("express");
const router = express.Router();
const { User, ArtistLike, MusicLike } = require("../models/index");

/* Create */
router.post("/", async (req, res, next) => {
  try {
    const result = await User.create(req.body);
    res.send(result);
  } catch (err) {
    console.error(err);
    res.send(500, err);
  }
});

/* Read */
router.get("/", async (req, res, next) => {
  try {
    const userList = await User.findAll({
      include: [{ model: ArtistLike }, { model: MusicLike }],
    });
    res.send(userList, "회원가입 성공");
  } catch (err) {
    res.send(500, err);
  }
});

router.get("/:address", async (req, res, next) => {
  try {
    const userInfo = await User.findOne({
      where: { address: req.params.address },
      include: [{ model: ArtistLike }, { model: MusicLike }],
    });
    res.send(userInfo);
  } catch (err) {
    res.send(500, err);
  }
});

/* Update */
router.patch("/:address", async (req, res, next) => {
  try {
    console.log(req.body);
    const result = await User.update(req.body, {
      where: {
        address: req.params.address,
      },
    });
    console.log(result);

    // Update에 잘못된 내용이 들어가면 0을 반환 => Bad request(400)
    if (result[0] === 0) {
      res.send(400);
    } else {
      res.send("Update successfully");
    }
  } catch (err) {
    console.error(err);
    res.send(500, err);
  }
});

/* Delete */
router.delete("/:address", async (req, res, next) => {
  try {
    console.log(req.params.address);
    const result = await User.destroy({
      where: { address: req.params.address },
    });

    res.send(200, result);
  } catch (err) {
    console.error(err);
    res.send(500, err);
  }
});

module.exports = router;
