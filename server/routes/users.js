const express = require("express");
const router = express.Router();
const { User, ArtistLike, MusicLike } = require("../models/index");


/* Create */
router.post("/", async (req, res, next) => {
	try {
		// 필수 요소에 대한 입력 값에 대한 유효성 검사
		if (req.body.address.trim() === "") {
			res.send(400, "Incorrect address");
		} else if (req.body.nickname.trim() === "") {
			res.send(400, "Empty nickname");
		} else if (req.body.nation.trim() === "") {
			res.send(400, "Empty nation");
		} else {
			const result = await User.create(req.body);
			res.send(result);
		}
	} catch (err) {
		console.error(err);
		res.send(400, "Create new user failed");
	}
});


/* Read */
router.get("/", async (req, res, next) => {
	try {
		const userList = await User.findAll({include: [{ model: ArtistLike }, { model: MusicLike }],});
		res.send(userList);
	} catch (err) {
		res.send(500, err);
	}
});

router.get("/:address", async (req, res, next) => {
	try {
		const userInfo = await User.findOne({
			where: { address: req.params.address },
			include: [{ model: ArtistLike }, { model: MusicLike }],
		});
		res.send(userInfo);
	} catch (err) {
		res.send(500, err);
	}
});

/* Update */
router.patch("/:address", async (req, res, next) => {
	try {
		// 입력값에 대한 유효성 검사
		if (req.body.address) {
			res.send(400, "Address is immutable");
		} else if (req.body.nickname && req.body.nickname.trim() === "") {
			res.send(400, "Empty nickname");
		} else if (req.body.nation && req.body.nation.trim() === "") {
			res.send(400, "Empty nation");
		} else {
			const result = await User.update(req.body, {
				where: {
					address: req.params.address,
				},
			});
			
			// Update에 잘못된 내용이 들어가면 0을 반환 => Bad request(400) 
			if (result[0] === 0) {
				res.send(400, "Update failed")
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
router.delete("/:address", async (req, res, next) => {
	try {
    console.log(req.params.address);
		const result = await User.destroy({
			where: { address: req.params.address },
		});
    
		res.send(200, result);
	} catch (err) {
		console.error(err);
		res.send(500, err);
	}
});

module.exports = router;