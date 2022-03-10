"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("musits", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id: {
        type: Sequelize.INTEGER,
      },
      neckname: {
        type: Sequelize.STRING,
      },
      nation: {
        type: Sequelize.STRING,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("musits");
  },
};
