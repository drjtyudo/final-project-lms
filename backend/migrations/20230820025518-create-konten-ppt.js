'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('konten_ppts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      judul_ppt: {
        type: Sequelize.STRING
      },
      id_sub_module: {
        type: Sequelize.INTEGER
      },
      linkGdrive: {
        type: Sequelize.STRING
      },
      ppt: {
        type: Sequelize.STRING
      },
      ppt_url: {
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
    await queryInterface.dropTable('konten_ppts');
  }
};