var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", async (req, res, next) => {
  try {
    res.render("main");
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
