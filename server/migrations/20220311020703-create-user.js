"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      address: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nation: {
        type: Sequelize.STRING,
      },
      myfavorite: {
        type: Sequelize.STRING,
      },
      action_right: {
        type: Sequelize.TINYINT,
      },
      play_time: {
        type: Sequelize.TIME,
      },
      play_count: {
        type: Sequelize.INTEGER,
      },
      play_redo: {
        type: Sequelize.STRING,
      },
      play_music: {
        type: Sequelize.STRING,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
