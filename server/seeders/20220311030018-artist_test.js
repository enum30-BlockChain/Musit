"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    let artistList = [];

    for (let i = 1; i < 10; i++) {
      let art = {
        nickname: "오늘은 번째",
        auction_right: "true",
      };
      artistList = [...artistList, art];
    }
    await queryInterface.bulkInsert("artists", artistList, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
