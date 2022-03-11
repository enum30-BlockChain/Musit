require("dotenv").config();
const User = require("./user");
const Artist = require("./artist");
const Music = require("./music");
const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";

// MYSQL Connecttion 설정 불러오기
const config = require(__dirname + "/../config/config.js")[env];
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

//db객체에 모든 테이블 넣기
const db = {};
db.sequelize = sequelize;
db.User = User;
db.Team = Artist;
db.Music = Music;

User.init(sequelize);
Artist.init(sequelize);
Music.init(sequelize);

User.associate(db);
Artist.associate(db);
Music.associate(db);

module.exports = db;
