const express = require("express");
const router = express.Router();
const { User } = require("../models/index");

/* GET User listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
/* POST sign-in, check DB. */

router.post("/signin", async (req, res, next) => {
  try {
    const user = await User.findAll({
      where: {
        myfavorite: "가수:이루, 제목: 흰눈",
        nation: "대한민국",
      },
    });
    res.send(user);
    console.log(user);
  } catch (err) {
    console.error(err);
  }
});
router.post("/signup", async (req, res, next) => {
  try {
    console.log("signup을 server에 요청하였습니다.");
    console.log(User);
    console.log(req.body);
    const user = await User.findOne({
      where: {
        address: req.body.address,
      },
    });
    if (req.body.address == "") {
      res.send("User address null");
    } else if (user) {
      res.send("Already Existed");
    } else {
      await User.create({
        nickname: req.body.nickname,
        address: req.body.address,
        genre: req.body.genre,
        nation: req.body.nation,
      });
      res.send("Created successfully");
    }
  } catch (err) {
    console.error(err);
  }
});
module.exports = router;
