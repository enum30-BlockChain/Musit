"use strict";
const { Model } = require("sequelize");
const db = require(".");
module.exports = (sequelize, DataTypes) => {
  class Music extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Music.belongsTo(models.Artist, {
        foreignKey: { name: "artist_name", allowNull: false },
        sourceKey: "artist_name",
      });
      Music.hasMany(models.MusicLike, {
        foreignKey: { name: "ipfs_hash", allowNull: false },
        sourceKey: "ipfs_hash",
      });
    }
  }
  Music.init(
    {
      ipfs_hash: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      title: { type: DataTypes.STRING, allowNull: false },
      play_time: { type: DataTypes.TIME, allowNull: false },
      play_count: { type: DataTypes.INTEGER, allowNull: false },
      like: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      timestamps: false,
      modelName: "Music",
      tableName: "music",
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
  return Music;
};
