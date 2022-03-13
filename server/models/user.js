"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init(
    {
      address: DataTypes.STRING,
      nation: DataTypes.STRING,
      myfavorite: DataTypes.STRING,
      action_right: DataTypes.TINYINT,
      play_time: DataTypes.TIME,
      play_count: DataTypes.INTEGER,
      play_redo: DataTypes.STRING,
      play_music: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
