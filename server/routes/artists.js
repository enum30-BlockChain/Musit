const express = require("express");
const router = express.Router();
const { Artist } = require("../models/index");

/* GET Artist listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
/* POST sign-in, check DB. */

// router.post("/signin", async (req, res, next) => {
//   try {
//     const artist = await Artist.findAll({
//       where: {
//         myfavorite: "가수:이루, 제목: 흰눈",
//         nation: "대한민국",
//       },
//     });
//     res.send(artist);
//     console.log(artist);
//   } catch (err) {
//     console.error(err);
//   }
// });

router.post("/signup", async (req, res, next) => {
  try {
    console.log("signup을 server에 요청하였습니다.");
    console.log(req.body);
    console.log(111111111111);
    console.log(Artist);
    console.log(222222222222);
    const artist = await Artist.findOne({
      where: {
        user_address: req.body.address,
      },
    });
    if (req.body.address == "") {
      res.send("Artist address null");
    } else if (artist) {
      res.send("Already Existed");
    } else {
      await Artist.create({
        artist_name: req.body.nickname,
        user_address: req.body.address,
      });
      res.send("Created successfully");
    }
  } catch (err) {
    console.error(err);
  }
});

router.post("/likeList", async (req, res, next) => {
  console.log(req.body.address);
  try {
    const findname = await Artist.findOne({
      where: {
        user_address: req.body.address,
      },
    });

    res.send(findname);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
