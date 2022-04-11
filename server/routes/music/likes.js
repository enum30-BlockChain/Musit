var express = require("express");
const router = express.Router();

const { Music, MusicLike } = require("../../models/index");

/* Create */
router.post("/", async (req, res, next) => {
	try {
		// 필수 입력 값 확인
		if (req.body.user_address.trim() === "") {
			res.send(400, "Incorrect address");
		} else if (req.body.ipfs_hash.trim() === "") {
			res.send(400, "Incorrect ipfs_hash");
		} else {
			const result = await MusicLike.create(req.body);
			res.send(result);
		}
	} catch (err) {
		res.send(500, "Create new music-like failed");
	}
});

/* Read */
router.get("/", async (req, res, next) => {
	try {
		const musicLike = await MusicLike.findAll();
		res.send(musicLike);
	} catch (err) {
		console.error(err);
		res.send(500, "Read music-like list falied");
	}
});

router.get("/:user_address", async (req, res, next) => {
	try {
		const music = await Music.findAll({
			include: {
				model: MusicLike,
				where: { user_address: req.params.user_address },
			},
		});
		res.send(music);
	} catch (err) {
		console.error(err);
		res.send(500, "Read music-like list falied");
	}
});

/* Delete */
router.delete("/:ipfs_hash", async (req, res, next) => {
	try {
		const result = await MusicLike.destroy({
			where: {
				ipfs_hash: req.params.ipfs_hash,
				user_address: req.body.user_address,
			},
		});
		if (result) {
			res.send("Delete music-like success");
		} else {
			res.send(400, "Delete music-like failed");
		}
	} catch (err) {
		console.error(err);
		res.send(500, "Delete music-like list falied");
	}
});

module.exports = router;
