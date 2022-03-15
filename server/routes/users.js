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
    const user = await Users.findOne({
      where: {
        address: req.body.address,
      },
    });
    if (user) {
      res.send("Already Existed");
    } else {
      await Users.create({
        address: req.body.address,
        myfavorite: req.body.myfavorite,
        nation: req.body.nation,
      });
      res.send("Created successfully");
    }
  } catch (err) {
    console.error(err);
  }
});
module.exports = router;
