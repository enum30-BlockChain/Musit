"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ArtistLike extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ArtistLike.belongsTo(models.User, {
        foreignKey: { name: "user_address", allowNull: false },
        sourceKey: "address",
      });
      ArtistLike.belongsTo(models.Artist, {
        foreignKey: { name: "artist_artist_name", allowNull: false },
        sourceKey: "artist_name",
      });
    }
  }
  ArtistLike.init(
    {
      Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    },

    {
      sequelize,
      timestamps: false,
      modelName: "ArtistLike",
      tableName: "artistlike",
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
  return ArtistLike;
};
