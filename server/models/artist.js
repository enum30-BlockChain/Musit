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
        sourceKey: "address",
      });
      Artist.hasMany(models.ArtistLike, {
        foreignKey: { name: "artist_artist_name", allowNull: false },
        targetKey: "artist_name",
      });
      Artist.hasMany(models.Music, {
        foreignKey: { name: "artist_name", allowNull: false },
        targetKey: "artist_name",
      });
    }
  }
  Artist.init(
    {
      artist_name: { type: DataTypes.STRING, primaryKey: true },
      likes: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
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
