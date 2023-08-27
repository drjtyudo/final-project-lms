'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('konten_videos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      judul_video: {
        type: Sequelize.STRING
      },
      id_sub_module: {
        type: Sequelize.INTEGER
      },
      link_youtube: {
        type: Sequelize.STRING
      },
      video: {
        type: Sequelize.STRING
      },
      video_url: {
        type: Sequelize.STRING
      },
      durasi: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('konten_videos');
  }
};