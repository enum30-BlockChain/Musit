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
      Artist.belongsTo(models.User, {
        foreignKey: { name: "user_address", allowNull: false },
        allowNull: false,
        sourceKey: "address",
      });
    }
  }
  Artist.init(
    {
      artist_name: { type: DataTypes.STRING, primaryKey: true },
      likes: { type: DataTypes.INTEGER, allowNull: true },
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
