"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id_user: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        type: Sequelize.STRING,
      },
      fullname: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      password: {
        type: Sequelize.TEXT,
      },
      nomor_telp: {
        type: Sequelize.STRING,
      },
      tggl_lahir: {
        type: Sequelize.DATE,
      },
      negara: {
        type: Sequelize.STRING,
      },
      domisili: {
        type: Sequelize.STRING,
      },
      profile_image: {
        type: Sequelize.TEXT,
      },
      url_image: {
        type: Sequelize.TEXT,
      },
      id_google: {
        type: Sequelize.STRING,
      },
      id_facebook: {
        type: Sequelize.STRING,
      },
      refresh_token: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
