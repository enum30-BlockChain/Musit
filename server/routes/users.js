const express = require("express");
const router = express.Router();
const { Users } = require("../models/index");

/* GET Users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
/* POST sign-in, check DB. */

router.post("/signin", async (req, res, next) => {
  try {
    const user = await Users.findAll({
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
    console.log(req.body);
    console.log(11111111111111111111111111111);
    const myfavorite = req.body.myfavorite;
    const nation = req.body.nation;
    const user = await Users.findOne({
      where: {
        myfavorite: myfavorite,
        nation: nation,
      },
    });
    if (user) {
      res.send("Already Existed");
    } else {
      await Users.create({
        myfavorite: myfavorite,
        nation: nation,
      });
      res.send("Created successfully");
    }
  } catch (err) {
    console.error(err);
  }
});
module.exports = router;
