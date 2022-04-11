"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    let artistList = [];

    for (let i = 1; i < 10; i++) {
      let art = {
        artist_name: "내이름이야",
        user_address: "123281378213",
        likes: "13213",
        nation: "대한민국",
      };
      artistList = [...artistList, art];
    }
    await queryInterface.bulkInsert("artist", artistList, {});
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
