"use strict";
const { Model } = require("sequelize");
const db = require(".");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Artist, {
        foreignKey: { name: "user_address", allowNull: false },
        targetKey: "address",
      });
      User.hasMany(models.ArtistLike, {
        foreignKey: { name: "user_address", allowNull: false },
        targetKey: "address",
      });
      User.hasMany(models.MusicLike, {
        foreignKey: { name: "user_address", allowNull: false },
        targetKey: "address",
      });
    }
  }
  User.init(
    {
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      nickname: { type: DataTypes.STRING, allowNull: false, unique: true },
      nation: { type: DataTypes.STRING, allowNull: false },
      genre: { type: DataTypes.STRING, allowNull: false },
      recent_played: { type: DataTypes.STRING, allowNull: true },
      subscription: {
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: "User",
      tableName: "user",
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
  return User;
};
/*
  `address` varchar(42) NOT NULL,
  `nickname` varchar(45) NOT NULL,
  `nation` varchar(45) NOT NULL,
  `genre` varchar(45) DEFAULT NULL,
  `play_time` time NOT NULL DEFAULT '00:00:00',
  `play_count` int NOT NULL,
  `play_redo` varchar(45) NOT NULL,
  `play_music` varchar(45) NOT NULL,
  PRIMARY KEY (`address`)
   */
