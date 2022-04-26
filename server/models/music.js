"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Music extends Model {
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
			img_file: { type: DataTypes.STRING, allowNull: false },
			genre: {
				type: DataTypes.STRING,
				allowNull: false,
				get() {
					const rawValue = this.getDataValue("genre");
					return rawValue ? rawValue.split(",") : null;
				},
				set(val) {
					this.setDataValue("genre", val.join(","));
				},
			},
			description: { type: DataTypes.TEXT, allowNull: true },
			play_time: { type: DataTypes.INTEGER, allowNull: false },
			play_count: {
				type: DataTypes.INTEGER,
				allowNull: true,
				defaultValue: 0,
			},
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
