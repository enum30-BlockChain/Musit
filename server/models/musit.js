"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class musit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  musit.init(
    {
      id: DataTypes.INTEGER,
      neckname: DataTypes.STRING,
      nation: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "musit",
    }
  );
  return musit;
};
