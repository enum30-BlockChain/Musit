"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let userList = [];

    for (let i = 1; i < 10; i++) {
      let usr = {
        address: i,
        nation: "대한민국",
        myfavorite: "가수:이루, 제목: 흰눈",
        action_right: true,
        play_time: `${i}.03`,
        play_count: i,
        play_redo: "가수:이루, 제목:흰눈",
        play_music: "가수:이루, 제목:흰눈",
      };
      userList = [...userList, usr];
    }
    await queryInterface.bulkInsert("users", userList, {});
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
