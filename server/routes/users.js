const express = require("express");
const router = express.Router();
const { User, ArtistLike, MusicLike } = require("../models/index");


/* GET User listing. */
router.get("/", async (req, res, next) => {
	try {
		const userList = await User.findAll({});
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

/* Create */
router.post("/", async (req, res, next) => {
	try {
    const result = await User.create(req.body);
    console.log(result);
		res.send(result);
	} catch (err) {
		console.error(err);
		res.send(400, err);
	}
});

/* Update */
router.patch("/:address", async (req, res, next) => {
	try {
		const findname = await User.update({
			where: {
				address: req.params.address,
			},
		});
		res.send(findname);
	} catch (err) {
		console.error(err);
		res.send(400, err);
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
		res.send(505, err);
	}
});

/* More APIs */
router.patch("/buy", async (req, res, next) => {
	try {
		const user = await User.findOne({
			where: {
				address: req.body.address,
			},
		});
		if (user.dataValues.subscription == false) {
			User.update(
				{
					subscription: true,
				},
				{ where: { address: req.body.address } }
			);
		}
		res.send("이용권을 구매햇어요");
	} catch (err) {
		console.error(err);
	}
});

router.patch("/recent", async (req, res, next) => {
	try {
		const data = req.body;
		const lump = [data.hash, data.time, data.title].join("-");
		await User.update(
			{
				recent_played: lump,
			},
			{ where: { address: data.address } }
		);
		res.send({ result: 0, message: "recent수정이 완료" });
	} catch (err) {
		res.send({ result: 2, message: "에러*_* 다시해주셈" });
	}
});

router.patch("/played", async (req, res, next) => {
	try {
		const playname = await User.findOne({
			where: {
				address: req.body.address,
			},
		});

		const recent = playname.dataValues.recent_played.split("-");
		res.send(recent);
	} catch (err) {
		res.send(err);
	}
});

router.patch("/change", async (req, res, next) => {
	try {
		if (req.body.select == "") {
			res.send("바꿀내용을 불러주세요");
		}
		const users = await User.findOne({
			where: {
				address: req.body.address,
			},
		});
		if (req.body.select !== "" && req.body.checkedInputs !== "") {
			const users_change = await User.update(
				{
					nickname: req.body.select,
					genre: req.body.checkedInputs.join(),
				},
				{
					where: {
						address: req.body.address,
					},
				}
			);
		} else if (req.body.select !== "") {
			const users_change = await User.update(
				{
					nickname: req.body.select,
				},
				{
					where: {
						address: req.body.address,
					},
				}
			);
			res.send(users_change);
		} else if (req.body.checkedInputs !== "" && req.body.select == "") {
			const genre_change = await User.update(
				{
					genre: req.body.checkedInputs.join(),
				},
				{
					where: {
						address: req.body.address,
					},
				}
			);
			res.send(genre_change);
		}
	} catch (err) {
		console.error(err);
	}
});

router.patch("/changeimg", async (req, res, next) => {
	try {
		const users = await User.findOne({
			where: {
				address: req.body.address,
			},
		});
		const users_change = await User.update(
			{
				img: req.body.downloadLink,
			},
			{
				where: {
					address: req.body.address,
				},
			}
		);
		res.send(users_change);
	} catch (err) {
		console.error(err);
	}
});



module.exports = router;
