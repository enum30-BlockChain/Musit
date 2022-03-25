const express = require("express");
const router = express.Router();
const { User } = require("../models/index");

/* GET User listing. */
router.get("/", async (req, res, next) => {
  try {
    const userList = await User.findAll({});
    res.send(userList);
  } catch (err) {
    next(err);
    console.log(err);
  }
});
/* Nickname client mainLayout response data send. */
router.post("/signin", async (req, res, next) => {
  console.log(req.body.address);
  try {
    const findname = await User.findOne({
      where: {
        address: req.body.address,
      },
    });
    res.send(findname);
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

router.post("/buy", async (req, res, next) => {
  try {
    console.log("Buy server에 요청하였습니다.");
    console.log(User);
    console.log(req.body);
    const user = await User.findOne({
      where: {
        address: req.body.address,
      },
    });
    console.log(user);
    // console.log(user.dataValues.subscription);
    if (user.dataValues.subscription == false) {
      User.update(
        {
          subscription: true,
        },
        { where: { address: req.body.address } }
      );
    }
    res.send("이용권을 구매햇어요");
  } catch (err) {
    console.error(err);
  }
});

router.post("/recent", async (req, res, next) => {
  try {
    const data = req.body;
    const lump = [data.hash, data.title, data.time].join("-");
    await User.update(
      {
        recent_played: lump,
      },
      { where: { address: data.address } }
    );
    res.send({ result: 0, message: "recent수정이 완료" });
  } catch (err) {
    console.log(err);
    res.send({ result: 2, message: "에러*_* 다시해주셈" });
  }
});

router.post("/played", async (req, res, next) => {
  console.log(111111111111);
  console.log(req.body.address);
  console.log(111111111111);
  try {
    const playname = await User.findOne({
      where: {
        address: req.body.address,
      },
    });
    console.log(222222222222);
    console.log(playname);
    console.log(222222222222);
    console.log(333333333333);
    console.log(playname.dataValues);
    console.log(333333333333);
    console.log(4444444444444);
    console.log(playname.dataValues.recent_played);
    console.log(4444444444444);

    const recent = playname.dataValues.recent_played.split("-");
    console.log(5555555555555);
    console.log(recent);
    console.log(5555555555555);
    console.log(6666666666666);
    console.log(recent[0]);
    console.log(6666666666666);
    res.send(recent);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

module.exports = router;
