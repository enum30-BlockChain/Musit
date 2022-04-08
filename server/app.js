//모듈 install
const express = require("express");
const path = require("path");
//morgan에다가 error 로그...
const logger = require("morgan");
const cors = require("cors");

//각 모델 라우터
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const filesRouter = require("./routes/files/files.js");
const musicRouter = require("./routes/music/music");
const artistsRouter = require("./routes/artist/artists");
const models = require("./models/index");

const app = express();
//모듈 실행
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//라우터 실행
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/files", filesRouter);
app.use("/music", musicRouter);
app.use("/artists", artistsRouter);

//mysql table 생성해줌
models.sequelize
  .sync()
  .then(() => {
    console.log(" DB 연결 성공");
  })
  .catch((err) => {
    console.log("연결 실패");
    console.log(err);
  });

module.exports = app;
