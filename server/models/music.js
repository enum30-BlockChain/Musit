const Sequelize = require("sequelize");

module.exports = class Music extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        user_id: {
          primaryKey: true,
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        user_password: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        user_name: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        user_age: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        user_area: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        user_gender: {
          type: Sequelize.STRING(45),
          allowNull: true,
        },
        user_mail: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        user_position: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        user_team: {
          type: Sequelize.STRING(45),
          allowNull: true,
        },
        user_aboutMe: {
          type: Sequelize.STRING(45),
          allowNull: true,
        },
        user_grade: {
          type: Sequelize.STRING(45),
          allowNull: true,
        },
        salt: {
          type: Sequelize.STRING(45),
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: "Music",
        tableName: "users",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {}
};
