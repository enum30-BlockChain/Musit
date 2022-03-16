"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Artist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Artist.init(
    {
      artist_name: { type: DataTypes.STRING, primaryKey: true },
      user_address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      likes: { type: DataTypes.INTEGER, allowNull: true },
      nation: { type: DataTypes.STRING, allowNull: false },
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
  return Artist;
};
