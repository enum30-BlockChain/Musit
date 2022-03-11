const express = require("express");
const router = express.Router();
const sequelize = require("sequelize");
const Users = require("../models/user");
/* GET user listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
/* POST sign-in, check DB. */
router.get("/signin", async (req, res, next) => {
  console.log(Users(sequelize));
  try {
    const user = await Users.findAll({
      where: {
        address: 1,
        nation: "대한민국",
      },
    });
    res.send(user);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
