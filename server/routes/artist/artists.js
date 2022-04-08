const express = require("express");
const router = express.Router();
const likesRouter = require("./likes");
const { Artist, ArtistLike, Music, User } = require("../../models/index");

router.use("/likes", likesRouter);

/* Create */
router.post("/", async (req, res, next) => {
	try {
		// 필수 요소에 대한 입력 값에 대한 유효성 검사
		if (req.body.user_address.trim() === "") {
			res.send(400, "Incorrect address");
		} else if (req.body.user_address.trim() === "") {
			res.send(400, "Empty nickname");
		} else {
			const result = await Artist.create(req.body);
			res.send(result);
		}
	} catch (err) {
		console.error(err);
		res.send(400, "Create new artist failed");
	}
});

/* Read */
router.get("/", async (req, res, next) => {
	try {
		const userList = await Artist.findAll({
			include: [{ model: ArtistLike }, { model: Music }],
		});
		res.send(userList);
	} catch (err) {
		res.send(500, "Fetch artsit list falied");
	}
});

router.get("/:user_address", async (req, res, next) => {
	try {
    console.log(req.params.user_address);
		const userInfo = await Artist.findOne({
			where: { user_address : req.params.user_address },
			include: [{ model: User }, { model: ArtistLike }, { model: Music }],
		});
		console.log(userInfo);
		res.send(userInfo);
	} catch (err) {
		res.send(500, "Fetch artist info faild");
	}
});

/* Update */
router.patch("/:user_address", async (req, res, next) => {
	try {
    // 입력값에 대한 유효성 검사
		if (req.body.address) {
			res.send(400, "Address is immutable");
		} else if (req.body.nickname && req.body.nickname.trim() === "") {
			res.send(400, "Empty nickname");
		} else if (req.body.nation && req.body.nation.trim() === "") {
			res.send(400, "Empty nation");
		} else {
      const result = await Artist.update(req.body, {
        where: { user_address : req.params.user_address },
      });
      // Update에 잘못된 내용이 들어가면 0을 반환 => Bad request(400)
      if (result[0] === 0) {
        res.send(400, "Update failed");
      } else {
        res.send("Update success");
      }
    }
	} catch (err) {
		console.error(err);
		res.send(500, "Error occurred");
	}
});

/* Delete */
router.delete("/:user_address", async (req, res, next) => {
	try {
		const result = await Artist.destroy({
			where: { user_address : req.params.user_address },
		});

		res.send(200, result);
	} catch (err) {
		console.error(err);
		res.send(500, err);
	}
});

module.exports = router;
