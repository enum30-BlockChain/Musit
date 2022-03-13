const express = require("express");
const router = express.Router();
const { Users } = require("../models/index");

/* GET Users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
/* POST sign-in, check DB. */
console.log(11111111111111111111);
console.log(Users);
console.log(222222222222222222222);
router.post("/signin", async (req, res, next) => {
  console.log(33333333333333);
  try {
    console.log(444444444444444);
    console.log(Users);
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

module.exports = router;
