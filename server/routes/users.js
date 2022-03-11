const express = require("express");
const router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
/* POST sign-in, check DB. */
router.post("/signin", async (req, res, next) => {
  console.log(33333333333333);
  try {
    console.log(444444444444444);
    const user = await musits.findAll({
      where: {
        neckname: "test neckname-1",
        nation: "대한민국",
      },
    });
    res.send(user);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
