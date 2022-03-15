"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("artists", {
      nickname: {
        type: Sequelize.STRING,
      },
      auction_right: {
        type: Sequelize.TINYINT,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("artists");
  },
};
