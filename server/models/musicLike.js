"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MusicLike extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MusicLike.belongsTo(models.User, {
        foreignKey: { name: "user_address", allowNull: false },
        allowNull: false,
        sourceKey: "address",
      });
      MusicLike.belongsTo(models.Artist, {
        foreignKey: { name: "ipfs_hash", allowNull: false },
        allowNull: false,
        sourceKey: "ipfs_hash",
      });
    }
  }
  MusicLike.init(
    {
      Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    },
    {
      sequelize,
      timestamps: false,
      modelName: "MusicLike",
      tableName: "musiclike",
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
  return MusicLike;
};
