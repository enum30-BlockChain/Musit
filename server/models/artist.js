"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class artist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  artist.init(
    {
      nickname: DataTypes.STRING,
      auction_right: DataTypes.TINYINT,
    },
    {
      sequelize,
      timestamps: false,
      modelName: "Artist",
      tableName: "artist",
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
  return artist;
};
